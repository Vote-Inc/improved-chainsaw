# vote-fe

Next.js 16 frontend for Vote Inc. All pages are server-rendered; every API call is made server-side using `API_URL` so the token cookie is never exposed to the browser beyond the `httpOnly` cookie itself.

## Project layout

```
vote-fe/
├── app/
│   ├── (identity)/login/   # Login page (public)
│   ├── (main)/             # Home page — ballot list (protected)
│   └── (vote)/vote/[slug]/ # Vote page (protected)
├── src/
│   ├── identity/           # Auth actions, service, components (login, logout, nav)
│   ├── ballot/             # Ballot service + components
│   └── vote/               # Vote actions, service, forms, components
└── components/ui/          # Shared UI primitives
```

## Local development

```bash
cp .env.example .env.local
npm install
npm run dev
```

`.env.example`:
```
API_URL=http://127.0.0.1:8080
```

Point `API_URL` at nginx if running the full stack locally, or directly at a service for isolated testing.

## Environment variables

| Variable | Description |
|----------|-------------|
| `API_URL` | Base URL for all server-side API calls. In ECS this is `http://127.0.0.1:8080` (nginx on the same task). |

## Auth flow

1. User submits the login form → `loginAction` (server action) calls `POST /api/auth/login` on Identity API.
2. Identity authenticates via Cognito and returns `{ token, expiresIn }`.
3. The access token is stored as an `httpOnly; SameSite=lax` cookie with `maxAge` set to `expiresIn`.
4. On every subsequent request nginx reads the `token` cookie, calls `GET /api/auth/validate`, and injects `X-Voter-Id` / `X-Voter-Role` headers. Requests without a valid token get a `302 → /login`.
5. Server actions that call the backend (ballots, votes) explicitly set `Cookie: token=<value>` on the server-to-server fetch so nginx's `auth_request` can read it.
6. Logout: `logoutAction` calls `POST /api/auth/logout` with `Authorization: Bearer <token>` to revoke the Cognito token, then deletes the cookie and redirects to `/login`.

## Routing & protection

Route protection is handled entirely by nginx — no Next.js middleware involved:

| Path | nginx behaviour |
|------|-----------------|
| `/login`, `/_next/*` | Public — no auth check |
| `/api/auth/*` | Forwarded to Identity directly — no auth check |
| `/api/votes/verify` | Public — rate limited (10 req/min per IP) |
| `/api/ballots`, `/api/votes` | Auth required — nginx validates token first |
| `/*` | Auth required — 302 to `/login` on failure |

## Docker image

Built by `.github/workflows/publish.yml` on push to `main`. Published to GHCR and referenced in the ECS task definition via `vote_fe_ghcr_image`.
