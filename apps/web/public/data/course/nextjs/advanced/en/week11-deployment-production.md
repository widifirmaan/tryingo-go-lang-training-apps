# Deployment & Production

> **Kategori:** Next.js | **Level:** Advanced | **Minggu 11:** Deployment & Production

## Learning Objectives

- Environment variables: .env.local, .env.production
- Deployment to Vercel: git integration, auto deploy
- Docker: multi-stage build for production
- CI/CD: GitHub Actions for test and deploy
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

## Key Concepts

### Environment Variables
.env.local for dev. NEXT_PUBLIC_ exposed to client.

### Vercel
Auto deploy on push. Preview deploys for PRs.

### Docker
Multi-stage build for smaller images.

### CI/CD
GitHub Actions: test → build → deploy.

### Monitoring
Analytics for performance, Sentry for errors.

---

## Experiments

- Setup GitHub Actions CI/CD
- Create Dockerfile for production
- Implement error tracking
- Setup preview deployments

---

## Challenge

Deploy a Next.js app to Vercel: setup env vars, custom domain, monitoring, CI/CD pipeline.

---

## Summary

Week 11 of 12: **Deployment & Production** (Level: Advanced). App is live! Next week: **Capstone Project**!
