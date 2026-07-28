# Environment & Config

> Next.js | Production & Optimization | Pelajaran 21

## Tujuan Pembelajaran

- Mengelola environment variables
- Membedakan public dan secret env
- Konfigurasi next.config.ts
- Mengatur runtime configuration

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

## Penjelasan

## Environment Variables
`.env.local` — lokal. `.env.production` — production. `NEXT_PUBLIC_*` — terekspos ke client. Tanpa prefix — hanya server.

## next.config.ts
`images.domains` — izinkan domain untuk next/image. `redirects()` — server-side redirects. `headers()` — custom headers. `env` — public env vars.

## Runtime Config
Server Component: `process.env.VAR` langsung. Client Component: hanya `NEXT_PUBLIC_*` yang bisa diakses. Jangan taruh secret di client.

## Type Safety
Buat `env.ts` yang validasi env vars dengan Zod. Export typed env object. Gunakan di seluruh app. Jangan akses process.env langsung.

---

## Eksperimen

1. **Environment Variables**
2. **next.config.ts**
3. **Runtime Config**
4. **Type Safety**

---

## Tantangan

Setup env vars untuk app: NEXT_PUBLIC_SITE_URL, DATABASE_URL, API_KEY. Buat env.ts dengan validasi Zod. Konfigurasi next.config.ts untuk images dan redirects.

---

## Ringkasan

NEXT_PUBLIC_ untuk client env. next.config.ts untuk images, redirects, headers. Validasi env dengan Zod. Jangan expose secret ke client.
