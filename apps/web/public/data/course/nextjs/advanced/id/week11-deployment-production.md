# Deployment — Buka Cabang Online

> **Kategori:** Next.js | **Level:** Lanjutan | **Minggu 11:** Deployment & Production
> **Prasyarat:** Minggu 10 — **Advanced Auth**.

## Tujuan Pembelajaran

- `npm run build` cek, `vercel --prod` buka cabang di `warung.vercel.app`, `env` untuk `DATABASE_URL`

---

## Kenapa Ini Penting Buat Kamu?

Lokal `localhost:3000` hanya di laptop. Vercel = sewa ruko online 1 klik.

---

## Program: Buka Cabang

```bash
npm run build # cek error
vercel --prod
# Atur Env di vercel.com → Settings → Environment Variables → DATABASE_URL
# Buka https://warung.vercel.app/produk
```

**Checklist produksi:** `next/image` sudah, `metadata` SEO, `error.js` alarm.

---

## Eksperimen

- **Hijau:** Jalankan Program apa adanya; catat 1 baris output pertama.
- **Kuning:** Ubah 1 angka/string di Program → tebak dulu, baru run.
- **Merah:** Hapus 1 baris di Program → error pertama apa? Kembalikan.

## Tantangan

**Deployment di Warungmu:** pakai `npm run build`, `vercel` hingga benar-benar jalan, lalu kerjakan tiga tingkat ini.
- **Hijau:** Jalankan Program minggu ini apa adanya; catat output yang keluar.
- **Kuning:** Ubah 1 nilai pada `npm run build`, `vercel`; tebak output SEBELUM run, lalu cocokkan.
- **Merah:** Gabungkan dengan **Advanced Auth** (Minggu 10): pasang hasilnya di alur itu, pastikan ujung-ke-ujung jalan.

## Ringkasan

Minggu 11: **Buka Cabang** — Vercel 1 klik. Minggu depan: **Capstone: Toko Online Lengkap**.
