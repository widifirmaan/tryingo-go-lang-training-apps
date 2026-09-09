# Capstone: Toko Online Lengkap

> **Kategori:** Next.js | **Level:** Lanjutan | **Minggu 12:** Capstone: SaaS App
> **Prasyarat:** Minggu 11 — **Deployment**.

## Tujuan Pembelajaran

- Gabung semua: `prisma` gudang + `Server Actions` pesan + `auth` KTP + `deploy` cabang = toko online jadi

---

## Kenapa Ini Penting Buat Kamu?

11 minggu terpisah — capstone buktikan gabung: Prisma + Auth + deploy Vercel jadi toko online beneran. Portfolio Next.js.

---

## Program: Toko Capstone

Fitur wajib:
- `produk` CRUD (tambah/hapus) via Server Actions + Prisma
- `keranjang` via `cookies` + `auth` admin
- `deploy` Vercel

Struktur:
```
app/
  produk/page.js (Server fetch prisma)
  produk/actions.js (use server tambah)
  admin/page.js (auth)
  api/produk/route.js (opsional)
prisma/schema.prisma
```

**Tugas:** Deploy `warung-capstone.vercel.app` + video demo 2 menit (tambah produk → lihat di HP).


---

## Penjelasan untuk Pemula

### Analogi: Grand Opening Toko Online
- **11 minggu = bangun mal online**: etalase (pages), dapur (actions), gudang (Prisma), KTP (Auth).
- **Capstone = grand opening**: CRUD + login + deploy Vercel JALAN BARENG + demo tambah produk dari HP. Checklist hijau semua = buka!

### Langkah 0 — Siapkan Device
- Sama W1 track ini (lihat minggu 1 untuk install).

### Cara Komputer Membaca
- CHECKLIST (prisma + auth + deploy) lalu URL publik + video.

### 3 Istilah Wajib
- 1. **Capstone/deploy**: gabung/buka

## Eksperimen

- **Hijau:** Jalankan Program apa adanya; catat 1 baris output pertama.
- **Kuning:** Ubah 1 angka/string di Program → tebak dulu, baru run.
- **Merah:** Hapus 1 baris di Program → error pertama apa? Kembalikan.

## Tantangan

**Capstone: Toko Online Lengkap di Warungmu:** pakai `app`, `produk`, `produk` hingga benar-benar jalan, lalu kerjakan tiga tingkat ini.
- **Hijau:** Jalankan Program minggu ini apa adanya; catat output yang keluar.
- **Kuning:** Ubah 1 nilai pada `app`, `produk`, `produk`; tebak output SEBELUM run, lalu cocokkan.
- **Merah:** Gabungkan dengan **Deployment** (Minggu 11): pasang hasilnya di alur itu, pastikan ujung-ke-ujung jalan.
- **Checklist integrasi:** **Setup & Konsep Dasar** (Minggu 1) + **Routing & Navigation** (Minggu 2) + **Server & Client Components** (Minggu 3) + **Styling & Optimasi** (Minggu 4) + **Data Fetching** (Minggu 5) + **Server Actions** (Minggu 6) + **Loading & Error** (Minggu 7) + **Middleware & Auth Dasar** (Minggu 8) + **Database & ORM** (Minggu 9) + **Advanced Auth** (Minggu 10) + **Deployment** (Minggu 11) → semua bagian di atas jalan bareng saat grand opening.
## Ringkasan

Minggu 12: **Capstone** — toko online lengkap, **Selesai Next.js 0→Ahli!**
