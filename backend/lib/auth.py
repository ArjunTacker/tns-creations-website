import os
import secrets
import uuid
from datetime import datetime, timedelta, timezone

import bcrypt
from fastapi import HTTPException, Request, Response

from lib.db import db

SESSION_DAYS = 7
MAX_ATTEMPTS = 5
LOCKOUT_MINUTES = 15


def hash_password(password: str) -> str:
    return bcrypt.hashpw(password.encode("utf-8"), bcrypt.gensalt()).decode("utf-8")


def verify_password(plain: str, hashed: str) -> bool:
    return bcrypt.checkpw(plain.encode("utf-8"), hashed.encode("utf-8"))


def admin_emails() -> set[str]:
    raw = os.environ.get("ADMIN_EMAILS", "")
    emails = {e.strip().lower() for e in raw.split(",") if e.strip()}
    seeded = os.environ.get("ADMIN_EMAIL", "").strip().lower()
    if seeded:
        emails.add(seeded)
    return emails


def role_for(email: str) -> str:
    return "admin" if email.lower() in admin_emails() else "user"


def public_user(doc: dict) -> dict:
    return {
        "user_id": doc["user_id"],
        "email": doc["email"],
        "name": doc.get("name") or doc["email"].split("@")[0],
        "picture": doc.get("picture"),
        "role": doc.get("role", "user"),
        "auth_provider": doc.get("auth_provider", "password"),
    }


async def upsert_user(email: str, name: str | None, picture: str | None, provider: str) -> dict:
    email = email.lower()
    existing = await db.users.find_one({"email": email}, {"_id": 0})
    if existing:
        update = {"last_login_at": datetime.now(timezone.utc).isoformat(), "role": role_for(email)}
        if name:
            update["name"] = name
        if picture:
            update["picture"] = picture
        await db.users.update_one({"email": email}, {"$set": update})
        return {**existing, **update}
    doc = {
        "user_id": f"user_{uuid.uuid4().hex[:12]}",
        "email": email,
        "name": name,
        "picture": picture,
        "role": role_for(email),
        "auth_provider": provider,
        "created_at": datetime.now(timezone.utc).isoformat(),
        "last_login_at": datetime.now(timezone.utc).isoformat(),
    }
    await db.users.insert_one(dict(doc))
    return doc


async def create_session(user_id: str, response: Response, token: str | None = None) -> str:
    token = token or secrets.token_urlsafe(48)
    await db.user_sessions.insert_one(
        {
            "user_id": user_id,
            "session_token": token,
            "expires_at": datetime.now(timezone.utc) + timedelta(days=SESSION_DAYS),
            "created_at": datetime.now(timezone.utc),
        }
    )
    response.set_cookie(
        key="session_token",
        value=token,
        httponly=True,
        secure=True,
        samesite="none",
        max_age=SESSION_DAYS * 24 * 3600,
        path="/",
    )
    return token


def _token_from(request: Request) -> str | None:
    token = request.cookies.get("session_token")
    if token:
        return token
    header = request.headers.get("Authorization", "")
    return header[7:] if header.startswith("Bearer ") else None


async def get_current_user(request: Request) -> dict:
    token = _token_from(request)
    if not token:
        raise HTTPException(status_code=401, detail="Not authenticated")
    session = await db.user_sessions.find_one({"session_token": token}, {"_id": 0})
    if not session:
        raise HTTPException(status_code=401, detail="Invalid session")
    expires_at = session["expires_at"]
    if isinstance(expires_at, str):
        expires_at = datetime.fromisoformat(expires_at)
    if expires_at.tzinfo is None:
        expires_at = expires_at.replace(tzinfo=timezone.utc)
    if expires_at < datetime.now(timezone.utc):
        await db.user_sessions.delete_one({"session_token": token})
        raise HTTPException(status_code=401, detail="Session expired")
    user = await db.users.find_one({"user_id": session["user_id"]}, {"_id": 0})
    if not user:
        raise HTTPException(status_code=401, detail="User not found")
    return public_user(user)


async def require_admin(request: Request) -> dict:
    user = await get_current_user(request)
    if user["role"] != "admin":
        raise HTTPException(status_code=403, detail="Admin access required")
    return user


async def check_lockout(identifier: str) -> None:
    doc = await db.login_attempts.find_one({"identifier": identifier}, {"_id": 0})
    if not doc or doc.get("count", 0) < MAX_ATTEMPTS:
        return
    locked_until = doc.get("locked_until")
    if isinstance(locked_until, str):
        locked_until = datetime.fromisoformat(locked_until)
    if locked_until and locked_until.tzinfo is None:
        locked_until = locked_until.replace(tzinfo=timezone.utc)
    if locked_until and locked_until > datetime.now(timezone.utc):
        minutes = int((locked_until - datetime.now(timezone.utc)).total_seconds() // 60) + 1
        raise HTTPException(status_code=429, detail=f"Too many failed attempts. Try again in {minutes} min.")
    await db.login_attempts.delete_one({"identifier": identifier})


async def record_failure(identifier: str) -> None:
    doc = await db.login_attempts.find_one_and_update(
        {"identifier": identifier},
        {"$inc": {"count": 1}, "$set": {"last_attempt": datetime.now(timezone.utc)}},
        upsert=True,
        return_document=True,
    )
    if doc and doc.get("count", 0) >= MAX_ATTEMPTS:
        await db.login_attempts.update_one(
            {"identifier": identifier},
            {"$set": {"locked_until": datetime.now(timezone.utc) + timedelta(minutes=LOCKOUT_MINUTES)}},
        )


async def clear_failures(identifier: str) -> None:
    await db.login_attempts.delete_one({"identifier": identifier})


async def seed_admin() -> None:
    email = os.environ.get("ADMIN_EMAIL", "").strip().lower()
    password = os.environ.get("ADMIN_PASSWORD", "")
    if not email or not password:
        return
    existing = await db.users.find_one({"email": email}, {"_id": 0})
    if existing is None:
        await db.users.insert_one(
            {
                "user_id": f"user_{uuid.uuid4().hex[:12]}",
                "email": email,
                "name": "TNS Admin",
                "picture": None,
                "role": "admin",
                "auth_provider": "password",
                "password_hash": hash_password(password),
                "created_at": datetime.now(timezone.utc).isoformat(),
            }
        )
    elif not existing.get("password_hash") or not verify_password(password, existing["password_hash"]):
        await db.users.update_one(
            {"email": email}, {"$set": {"password_hash": hash_password(password), "role": "admin"}}
        )
