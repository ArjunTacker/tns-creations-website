"""Auth + leads tests for TNS Creations.

Covers:
- login (success/failure/lockout)
- session cookie / /me / logout
- Google session exchange with bogus id
- Simulated Google user (mongo insert) for role gating on /api/leads
- Public lead creation regression
"""
import os
import time
import uuid
from datetime import datetime, timedelta, timezone

import httpx
import pytest
from pymongo import MongoClient

ADMIN_EMAIL = "admin@tnscreations.in"
ADMIN_PASSWORD = "TnsAdmin@2026"

MONGO_URL = os.environ.get("MONGO_URL", "mongodb://localhost:27017")
DB_NAME = os.environ.get("DB_NAME", "app")


@pytest.fixture(scope="module")
def mongo():
    m = MongoClient(MONGO_URL)
    yield m[DB_NAME]
    m.close()


@pytest.fixture(autouse=True)
def _clear_login_attempts(mongo):
    # ensure admin is never locked out before each test
    mongo.login_attempts.delete_many({})
    yield
    mongo.login_attempts.delete_many({})


# ---------- Email/password login ----------

class TestLogin:
    def test_login_success_sets_cookie(self, client):
        r = client.post("/auth/login", json={"email": ADMIN_EMAIL, "password": ADMIN_PASSWORD})
        assert r.status_code == 200, r.text
        data = r.json()
        assert data["email"] == ADMIN_EMAIL
        assert data["role"] == "admin"
        assert "session_token" in r.cookies
        # /me
        me = client.get("/auth/me", cookies={"session_token": r.cookies["session_token"]})
        assert me.status_code == 200
        assert me.json()["email"] == ADMIN_EMAIL
        # /leads
        leads = client.get("/leads", cookies={"session_token": r.cookies["session_token"]})
        assert leads.status_code == 200
        assert isinstance(leads.json(), list)
        # logout
        lo = client.post("/auth/logout", cookies={"session_token": r.cookies["session_token"]})
        assert lo.status_code == 200
        # /me after logout with same token → 401 (session removed)
        me2 = client.get("/auth/me", cookies={"session_token": r.cookies["session_token"]})
        assert me2.status_code == 401

    def test_leads_requires_auth(self, client):
        r = client.get("/leads")
        assert r.status_code == 401

    def test_login_wrong_password(self, client):
        r = client.post("/auth/login", json={"email": ADMIN_EMAIL, "password": "wrong-pass"})
        assert r.status_code == 401
        assert "Invalid" in r.json().get("detail", "")

    def test_lockout_after_5_failures(self, client, mongo):
        mongo.login_attempts.delete_many({})
        email = f"lockout-{uuid.uuid4().hex[:6]}@example.com"
        for _ in range(5):
            r = client.post("/auth/login", json={"email": email, "password": "x"})
            assert r.status_code == 401
        r6 = client.post("/auth/login", json={"email": email, "password": "x"})
        assert r6.status_code == 429


# ---------- Google session exchange ----------

class TestGoogleSession:
    def test_bogus_session_returns_401(self, client):
        r = client.post("/auth/session", json={"session_id": "definitely-not-real"})
        assert r.status_code == 401


# ---------- Simulated Google user via mongo insert ----------

class TestSimulatedGoogleUser:
    def test_non_admin_google_user(self, client, mongo):
        user_id = f"user_test_{uuid.uuid4().hex[:8]}"
        token = f"test_session_{uuid.uuid4().hex[:16]}"
        email = f"test.user.{uuid.uuid4().hex[:6]}@example.com"
        try:
            mongo.users.insert_one({
                "user_id": user_id,
                "email": email,
                "name": "Test Google User",
                "picture": None,
                "role": "user",
                "auth_provider": "google",
                "created_at": datetime.now(timezone.utc).isoformat(),
            })
            mongo.user_sessions.insert_one({
                "user_id": user_id,
                "session_token": token,
                "expires_at": datetime.now(timezone.utc) + timedelta(days=7),
                "created_at": datetime.now(timezone.utc),
            })
            headers = {"Authorization": f"Bearer {token}"}
            me = client.get("/auth/me", headers=headers)
            assert me.status_code == 200
            assert me.json()["role"] == "user"
            leads = client.get("/leads", headers=headers)
            assert leads.status_code == 403
        finally:
            mongo.users.delete_one({"user_id": user_id})
            mongo.user_sessions.delete_one({"session_token": token})


# ---------- Public lead creation ----------

class TestLeadCreatePublic:
    def test_create_lead_no_auth(self, client, mongo):
        payload = {
            "type": "trial",
            "full_name": "TEST User",
            "phone": "9999999999",
            "email": "test-lead@example.com",
            "business_name": "TEST Biz",
        }
        r = client.post("/leads", json=payload)
        assert r.status_code == 201, r.text
        lead = r.json()
        assert lead["type"] == "trial"
        assert lead["full_name"] == "TEST User"
        assert "id" in lead
        # cleanup
        mongo.leads.delete_one({"id": lead["id"]})
