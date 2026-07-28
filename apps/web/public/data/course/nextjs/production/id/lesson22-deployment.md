# Deployment

> Next.js | Production & Optimization | Pelajaran 22

## Tujuan Pembelajaran

- Deploy ke Vercel
- Deploy ke platform lain (Cloudflare, Docker)
- Mengelola preview deployments
- Setup CI/CD pipeline

---

## Program: Deployment

```tsx
export default function Home() {
  return (<div><h1>Deployment Guide</h1><ol style={{lineHeight:2}}><li>Push to GitHub</li><li>Connect repo to Vercel</li><li>Configure environment variables</li><li>Deploy (automatic on push)</li><li>Set custom domain + SSL</li></ol><p>Alternative platforms: Cloudflare Pages, Netlify, Docker + AWS/GCP.</p></div>);
}
```

---

## Penjelasan

## Vercel
Platform optimal untuk Next.js. Zero-config deployment. Preview deployments untuk setiap PR. Analytics + Speed Insights built-in.

## Docker
`docker build -t my-app .` dengan official Next.js Dockerfile. `next start` untuk production. Cocok untuk self-hosting di AWS/GCP.

## Environment Variables
Vercel: set di dashboard per environment (development, preview, production). Jangan commit secrets ke git.

## CI/CD
GitHub Actions: lint → test → build. Vercel: auto-deploy di setiap push ke main. Preview untuk PR. Custom domain + SSL otomatis.

---

## Eksperimen

1. **Vercel**
2. **Docker**
3. **Environment Variables**
4. **CI/CD**

---

## Tantangan

Deploy aplikasi Next.js ke Vercel. Setup custom domain. Konfigurasi environment variables untuk production. Aktifkan Analytics.

---

## Ringkasan

Vercel = platform optimal. Docker untuk self-hosting. Preview deployments untuk PR. CI/CD dengan GitHub Actions. Environment variables per environment.
