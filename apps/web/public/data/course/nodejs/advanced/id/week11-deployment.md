# Deployment — Buka Cabang Node

> **Kategori:** Node.js | **Level:** Lanjutan | **Minggu 11:** Deployment

## Tujuan Pembelajaran

- `npm run build` + `pm2` + `Vercel`/`Railway` deploy `warung-node.vercel.app`, `env` untuk `DATABASE_URL`

---

## Program

```bash
npm run build # jika ada
pm2 start server.js --name warung
pm2 save
# Deploy Vercel: vercel --prod
# Atur Env di dashboard: DATABASE_URL
```

**Checklist:** `PORT` dari `process.env.PORT`, `cors` aktif, `helmet` aman.

---

## Ringkasan

Minggu 11: **Buka Cabang** — deploy Node.
