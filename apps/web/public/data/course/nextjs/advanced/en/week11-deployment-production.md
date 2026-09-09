# Deployment — Open Online Branch

> **Kategori:** Next.js | **Level:** Advanced | **Minggu 11:** Deployment & Production
> **Prerequisites:** Week 10 — **Advanced Auth**.

## Learning Objectives

- `npm run build` check, `vercel --prod` opens branch at `shop.vercel.app`, `env` for `DATABASE_URL`

---

## Why This Matters (Non-IT)

Local `localhost:3000` lives only on your laptop. Vercel = renting an online shophouse in 1 click.

---

## Program: Open Branch

```bash
npm run build # check errors
vercel --prod
# Set Env at vercel.com → Settings → Environment Variables → DATABASE_URL
# Open https://shop.vercel.app/products
```

**Production checklist:** `next/image` done, `metadata` SEO, `error.js` alarm.

---

## Key Concepts

### `build` / `env` / `prod`
`npm run build` compiles + checks; `env` secrets per environment; `--prod` ships to public URL.

---

## Beginner Friendly Explanation

### Analogy: Grand Opening Online
- **`localhost` = home garage**, **Vercel = mall branch** — same shop, public address.

### Step 0 — Prepare Device
- Vercel account + GitHub-connected repo + env vars set.

### How the Computer Reads It
1. `vercel --prod` → uploads → builds → assigns URL.
2. Env missing → DB connection fails → set in dashboard → redeploy.

### 3 Must-Know Terms
1. **build/env/deploy**: check/secrets/open

---

## Experiments

- **Green:** `npm run build` passes locally → safe to ship?
- **Yellow:** Missing env on Vercel → error page? Add env + redeploy.
- **Red:** Deploy with TS error → build fails? Fix, rebuild.

---

## Challenge

**Live Shop:** Build passes + env set + `https://shop.vercel.app/products` loads + phone screenshot.
- **Link-up (Week 10 — Advanced Auth):** plug this challenge's result into that flow; make sure it runs end-to-end.

---
## Mini Glossary

- **build/deploy**: check/open

---

## Summary

Week 11: **Open Branch** — Vercel 1 click. Next: **Capstone**.
