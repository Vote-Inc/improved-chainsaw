# vote-fe

Next.js 16 frontend for Vote Inc. All pages are server-rendered; API calls are made server-side using `API_URL`.

## Local development

```bash
cp .env.example .env.local
npm install
npm run dev
```

`.env.example`:
```
API_URL=http://localhost:8081
```

Point `API_URL` at whichever backend you want to hit — the Identity API directly, or through nginx if running the full stack locally.

## Environment variables

| Variable | Where set | Description |
|----------|-----------|-------------|
| `API_URL` | ECS env var / `.env.local` | Base URL for all server-side API calls (`http://127.0.0.1:80` in production) |

## Docker image

Built by `.github/workflows/publish.yml` on push to `main`. The image is published to GHCR and referenced in the ECS task definition.

## Auth flow

1. User submits login form → server action calls `POST /api/auth/login` on Identity API
2. Identity authenticates via Cognito, returns `{ token, expiresIn }`
3. Token stored as an `httpOnly` cookie with `maxAge` set to `expiresIn` (1 hour)
4. Nginx reads the cookie on every request, calls `/api/auth/validate`, and injects `X-Voter-Id` / `X-Voter-Role` headers
5. Expired tokens are caught by Next.js middleware (decodes JWT `exp` claim) and redirected to `/login`
