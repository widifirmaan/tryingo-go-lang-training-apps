# Deployment — Buka Cabang Node

> **Kategori:** Node.js | **Level:** Lanjutan | **Minggu 11:** Deployment
> **Prasyarat:** Minggu 10 — **Performance**.

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
- **`localhost` = dapur rumah**: cuma serumah bisa cicip.
- **Deploy = sewa ruko**: `PORT` + `DATABASE_URL` dari env (JANGAN di git!) + `pm2 save` agar bangun lagi!

### Langkah 0 — Siapkan Device
- Sama Node W1 + paket minggu ini (`vitest`/`pm2`/`vercel`).

### Cara Komputer Membaca
- `PORT=process.env.PORT` dengar; env di dashboard (bukan file!).

### 3 Istilah Wajib
- 1. **deploy/env**: buka/rahasia-luar

---

## Tantangan

**Deployment di Warungmu:** pakai `npm run build`, `pm2 start server`, `pm2 save` hingga benar-benar jalan, lalu kerjakan tiga tingkat ini.
- **Hijau:** Jalankan Program minggu ini apa adanya; catat output yang keluar.
- **Kuning:** Ubah 1 nilai pada `npm run build`, `pm2 start server`, `pm2 save`; tebak output SEBELUM run, lalu cocokkan.
- **Merah:** Gabungkan dengan **Performance** (Minggu 10): pasang hasilnya di alur itu, pastikan ujung-ke-ujung jalan.

## Glosarium Mini

- Lihat Istilah Wajib di atas.

## Ringkasan

Minggu 11: **Buka Cabang** — deploy Node. Minggu depan: **Capstone: Toko Node Lengkap**.
