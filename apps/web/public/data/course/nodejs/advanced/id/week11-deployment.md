# Deployment — Buka Cabang Node

> **Kategori:** Node.js | **Level:** Lanjutan | **Minggu 11:** Deployment

## Tujuan Pembelajaran

- `npm run build` + `pm2` + `Vercel`/`Railway` deploy `warung-node.vercel.app`, `env` untuk `DATABASE_URL`

---

## Kenapa Ini Penting Buat Kamu?

Lokal `localhost` hanya laptop. `vercel --prod` / `Railway` + `PORT` env + `DATABASE_URL` env = URL publik. Tanpa env, password ikut git (bocor!).

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

## Penjelasan untuk Pemula

### Analogi: Buka Cabang Online
- Lihat Program: jalankan perintahnya, ubah 1 hal, lihat bedanya.

### Langkah 0 — Siapkan Device
- Sama Node W1 + paket minggu ini (`vitest`/`pm2`/`vercel`).

### Cara Komputer Membaca
- `PORT=process.env.PORT` dengar; env di dashboard (bukan file!).

### 3 Istilah Wajib
- 1. **deploy/env**: buka/rahasia-luar

---

## Glosarium Mini

- Lihat Istilah Wajib di atas.

## Ringkasan

Minggu 11: **Buka Cabang** — deploy Node.
