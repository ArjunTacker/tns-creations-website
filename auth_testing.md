# Auth Testing Playbook (TNS Creations)

Sessions are opaque tokens stored in `user_sessions` (7-day expiry) and sent as httpOnly cookie `session_token` (Bearer header also accepted). Both email/password and Google flows share this.

## Step 1: Email/password login (seeded admin — see /app/memory/test_credentials.md)
```
curl -c cookies.txt -X POST "$API_URL/api/auth/login" -H "Content-Type: application/json" -d '{"email":"admin@tnscreations.in","password":"TnsAdmin@2026"}'
curl -b cookies.txt "$API_URL/api/auth/me"
curl -b cookies.txt "$API_URL/api/leads"
curl -b cookies.txt -X POST "$API_URL/api/auth/logout"
```
Expected: login returns user with role=admin and sets `session_token` cookie; /me returns same user; /leads returns array; after logout /me → 401.

## Step 2: Simulate Google user (cannot run real OAuth in tests)
```
mongosh --eval "
use('app');
var userId = 'user_test' + Date.now();
var token = 'test_session_' + Date.now();
db.users.insertOne({user_id: userId, email: 'test.user.' + Date.now() + '@example.com', name: 'Test User', picture: null, role: 'user', auth_provider: 'google', created_at: new Date().toISOString()});
db.user_sessions.insertOne({user_id: userId, session_token: token, expires_at: new Date(Date.now() + 7*24*60*60*1000), created_at: new Date()});
print('Session token: ' + token);
"
curl -H "Authorization: Bearer <token>" "$API_URL/api/auth/me"      # 200, role=user
curl -H "Authorization: Bearer <token>" "$API_URL/api/leads"        # 403
```

## Step 3: Brute force
5 wrong passwords for same email → 6th attempt returns 429.

## Step 4: Browser
- /admin unauthenticated → redirects to /login
- Login form: invalid email shows `login-email-error`; wrong password shows `login-server-error`
- Valid login → /admin with `admin-dashboard`, `leads-table`/`leads-empty`, filters `leads-filter-*`
- `admin-logout-button` → back to /login
- Cookie injection for browser: name `session_token`, httpOnly, secure, sameSite None, path /

## Clean up
```
mongosh --eval "use('app'); db.users.deleteMany({email: /test\.user\./}); db.user_sessions.deleteMany({session_token: /test_session/}); db.login_attempts.deleteMany({});"
```
