# Deployment & Production

> **Kategori:** Next.js | **Level:** Lanjutan | **Minggu 11:** Deployment & Production

## Tujuan Pembelajaran

- Environment variables: .env.local, .env.production
- Deployment ke Vercel: git integration, auto deploy
- Docker: multi-stage build untuk production
- CI/CD: GitHub Actions untuk test dan deploy
- Monitoring: Vercel Analytics, Sentry error tracking

---

## Program: Vercel & CI/CD

```jsx
// Deployment Next.js: Vercel, Docker, self-hosted
// CI/CD, environment variables, monitoring

// ── Environment Variables ──
// .env.local (development, gitignored)
// DATABASE_URL=postgresql://...
// NEXTAUTH_SECRET=your-secret
// NEXT_PUBLIC_API_URL=https://api.example.com

// ── next.config.js ──
/** @type {import('next').NextConfig} */
const nextConfig = {
  // Image domains untuk next/image
  images: {
    domains: ["images.unsplash.com", "avatars.githubusercontent.com"],
  },
  // Headers keamanan
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          { key: "X-Frame-Options", value: "DENY" },
          { key: "X-Content-Type-Options", value: "nosniff" },
        ],
      },
    ];
  },
  // Redirect
  async redirects() {
    return [
      { source: "/old-page", destination: "/new-page", permanent: true },
    ];
  },
};

export default nextConfig;

// ── Dockerfile ──
// FROM node:18-alpine AS builder
// WORKDIR /app
// COPY package*.json ./
// RUN npm ci
// COPY . .
// RUN npm run build
// FROM node:18-alpine AS runner
// WORKDIR /app
// COPY --from=builder /app/.next ./.next
// COPY --from=builder /app/node_modules ./node_modules
// COPY --from=builder /app/package.json ./package.json
// EXPOSE 3000
// CMD ["npm", "start"]

// ── Vercel Deployment ──
// 1. Push ke GitHub
// 2. Import project di vercel.com
// 3. Set environment variables
// 4. Deploy otomatis setiap push

// ── Monitoring ──
// Vercel Analytics, Sentry untuk error tracking

console.log("Deployment & Production siap digunakan");
```

---

## Konsep Kunci

### Environment Variables
.env.local = development. NEXT_PUBLIC_ = exposed ke client.

### Vercel
Deploy otomatis setiap push. Preview deploy untuk PR.

### Docker
Multi-stage build: build → runner. Image lebih kecil.

### CI/CD
GitHub Actions: test → build → deploy.

### Monitoring
Analytics untuk performance. Sentry untuk error tracking.

---

## Eksperimen

- Setup GitHub Actions CI/CD
- Buat Dockerfile untuk production
- Implementasikan error tracking
- Setup preview deployments

---

## Tantangan

Deploy aplikasi Next.js ke Vercel: setup env vars, custom domain, monitoring, CI/CD pipeline.

---

## Ringkasan

Minggu 11 dari 12: **Deployment & Production** (Level: Lanjutan). Aplikasi live! Minggu depan: **Capstone Project**!
