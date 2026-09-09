# Deployment — Open Node Branch

> **Kategori:** Node.js | **Level:** Advanced | **Minggu 11:** Deployment
> **Prerequisites:** Week 10 — **Performance**.

## Learning Objectives

- `npm run build` + `pm2` + `Vercel`/`Railway` deploy `shop-node.vercel.app`, `env` for `DATABASE_URL`

---

## Why This Matters (Non-IT)

Local `localhost` is laptop-only. `vercel --prod` / `Railway` + `PORT` env + `DATABASE_URL` env = public URL. Without env, passwords join git (leak!).

---

## Program

```bash
npm run build # when present
pm2 start server.js --name shop
pm2 save
# Deploy Vercel: vercel --prod
# Set Env in dashboard: DATABASE_URL
```

**Checklist:** `PORT` from `process.env.PORT`, `cors` on, `helmet` safe.


---

## Beginner Friendly Explanation

### Analogy: Open Online Branch
- **`localhost` = home kitchen**: only housemates taste.
- **Deploy = rent shophouse**: `PORT` + `DATABASE_URL` from env (NEVER in git!) + `pm2 save` to revive!

### Step 0 — Prepare Device
- Same as Node W1 + this week's package (`vitest`/`pm2`/`vercel`).

### How the Computer Reads It
- `PORT=process.env.PORT` listens; env in dashboard (not files!).

### 3 Must-Know Terms
- 1. **deploy/env**: open/outside-secrets

---

## Mini Glossary

- See Must-Know Terms above.

## Summary

Week 11: **Open Branch** — deploy Node. Next: **Capstone**.
