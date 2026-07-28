# Environment & Config

> Next.js | Production & Optimization | Lesson 21

## Learning Objectives

- Manage environment variables
- Distinguish public vs secret env
- Configure next.config.ts
- Set up runtime configuration

---

## Program: Environment & Config

```tsx
import type { NextConfig } from 'next';
const nextConfig: NextConfig = {
  images: { remotePatterns: [{ protocol: 'https', hostname: '**' }] },
  experimental: { ppr: true },
};
export default nextConfig;
```

---

## Explanation

## Environment Variables
`.env.local` — local. `.env.production` — production. `NEXT_PUBLIC_*` — exposed to client. Without prefix — server only.

## next.config.ts
`images.domains` — allow domains for next/image. `redirects()` — server-side redirects. `headers()` — custom headers. `env` — public env vars.

## Runtime Config
Server Component: access `process.env.VAR` directly. Client Component: only `NEXT_PUBLIC_*` accessible. Don't put secrets in client.

## Type Safety
Create `env.ts` that validates env vars with Zod. Export typed env object. Use throughout the app. Don't access process.env directly.

---

## Experiments

1. **Environment Variables**
2. **next.config.ts**
3. **Runtime Config**
4. **Type Safety**

---

## Challenge

Set up env vars for an app: NEXT_PUBLIC_SITE_URL, DATABASE_URL, API_KEY. Create env.ts with Zod validation. Configure next.config.ts for images and redirects.

---

## Summary

NEXT_PUBLIC_ for client env. next.config.ts for images, redirects, headers. Validate env with Zod. Don't expose secrets to client.
