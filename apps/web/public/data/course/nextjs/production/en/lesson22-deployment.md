# Deployment

> Next.js | Production & Optimization | Lesson 22

## Learning Objectives

- Deploy to Vercel
- Deploy to other platforms (Cloudflare, Docker)
- Manage preview deployments
- Set up CI/CD pipeline

---

## Program: Deployment

```tsx
export default function Home() {
  return (<div><h1>Deployment Guide</h1><ol style={{lineHeight:2}}><li>Push to GitHub</li><li>Connect repo to Vercel</li><li>Configure environment variables</li><li>Deploy (automatic on push)</li><li>Set custom domain + SSL</li></ol><p>Alternative platforms: Cloudflare Pages, Netlify, Docker + AWS/GCP.</p></div>);
}
```

---

## Explanation

## Vercel
Optimal platform for Next.js. Zero-config deployment. Preview deployments for every PR. Built-in Analytics + Speed Insights.

## Docker
`docker build -t my-app .` with official Next.js Dockerfile. `next start` for production. Good for self-hosting on AWS/GCP.

## Environment Variables
Vercel: set in dashboard per environment (development, preview, production). Don't commit secrets to git.

## CI/CD
GitHub Actions: lint → test → build. Vercel: auto-deploy on every push to main. Preview for PRs. Automatic custom domain + SSL.

---

## Experiments

1. **Vercel**
2. **Docker**
3. **Environment Variables**
4. **CI/CD**

---

## Challenge

Deploy a Next.js app to Vercel. Set up a custom domain. Configure environment variables for production. Enable Analytics.

---

## Summary

Vercel = optimal platform. Docker for self-hosting. Preview deployments for PRs. CI/CD with GitHub Actions. Per-environment env vars.
