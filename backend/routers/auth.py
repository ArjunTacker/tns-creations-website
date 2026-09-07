import httpx
from fastapi import APIRouter, Depends, HTTPException, Request, Response
from pydantic import BaseModel, Field

from lib.auth import (
    check_lockout,
    clear_failures,
    create_session,
    get_current_user,
    public_user,
    record_failure,
    upsert_user,
    verify_password,
)
from lib.db import db

router = APIRouter(prefix="/api/auth", tags=["auth"])

EMERGENT_SESSION_URL = "https://demobackend.emergentagent.com/auth/v1/env/oauth/session-data"


class LoginBody(BaseModel):
    email: str = Field(min_length=3, max_length=160)
    password: str = Field(min_length=1, max_length=200)


class SessionBody(BaseModel):
    session_id: str = Field(min_length=1)


def _client_ip(request: Request) -> str:
    fwd = request.headers.get("x-forwarded-for")
    return fwd.split(",")[0].strip() if fwd else (request.client.host if request.client else "unknown")


@router.post("/login")
async def login(body: LoginBody, request: Request, response: Response):
    email = body.email.strip().lower()
    identifier = f"{_client_ip(request)}:{email}"
    await check_lockout(identifier)
    user = await db.users.find_one({"email": email}, {"_id": 0})
    if not user or not user.get("password_hash") or not verify_password(body.password, user["password_hash"]):
        await record_failure(identifier)
        raise HTTPException(status_code=401, detail="Invalid email or password")
    await clear_failures(identifier)
    user = await upsert_user(email, None, None, "password")
    await create_session(user["user_id"], response)
    return public_user(user)


@router.post("/session")
async def exchange_session(body: SessionBody, response: Response):
    async with httpx.AsyncClient(timeout=15) as client:
        res = await client.get(EMERGENT_SESSION_URL, headers={"X-Session-ID": body.session_id})
    if res.status_code != 200:
        raise HTTPException(status_code=401, detail="Invalid or expired Google session")
    data = res.json()
    user = await upsert_user(data["email"], data.get("name"), data.get("picture"), "google")
    await create_session(user["user_id"], response, token=data.get("session_token"))
    return public_user(user)


@router.get("/me")
async def me(user: dict = Depends(get_current_user)):
    return user


@router.post("/logout")
async def logout(request: Request, response: Response):
    token = request.cookies.get("session_token")
    if token:
        await db.user_sessions.delete_one({"session_token": token})
    response.delete_cookie("session_token", path="/", secure=True, samesite="none")
    return {"ok": True}
