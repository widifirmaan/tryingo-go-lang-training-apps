# Capstone: Toko JavaScript Lengkap

> **Kategori:** JavaScript | **Level:** Lanjutan | **Minggu 14:** Capstone
> **Prasyarat:** Minggu 13 — **Performance Optimization**.

## Tujuan Pembelajaran

- Gabung `modules` + `fetch` + `DOM` + `test` jadi toko `produk` + `keranjang` + `deploy`

---

## Kenapa Ini Penting Buat Kamu?

13 minggu terpisah — capstone buktikan gabung: modules + fetch + DOM + test + deploy jadi toko. Portfolio JS.

---

## Program: Toko JS Capstone

```javascript
// api.js
export async function getProduk(){ const res = await fetch("/api/produk"); return res.json(); }

// app.js
import { getProduk } from "./api.js";
const produk = await getProduk();
document.getElementById("daftar").innerHTML = produk.map(p=>`<li>${p.nama}</li>`).join("");
```

Deploy `Vercel` / `Netlify`.

**Tugas:** Deploy `warung-js.vercel.app`.


---

## Penjelasan untuk Pemula

### Analogi: Grand Opening Toko JS
- **13 minggu = bangun toko**: fondasi (sintaks), rak (array), telinga (event), kurir (async), pola, uji.
- **Capstone = grand opening**: modul + fetch + DOM + test + deploy JALAN BARENG + video demo. Portfolio = toko BUKAN sertifikat!

### Langkah 0 — Siapkan Device
- Sama JS W1: `node -v` / browser + `npm test` untuk W12.

### Cara Komputer Membaca
- CHECKLIST (modul + API + DOM + test + deploy) lalu URL + video.

### 3 Istilah Wajib
- 1. **Capstone/deploy**: gabung/buka

---

## Eksperimen

- **Hijau:** Buka `/api/produk` → apa yang tampil? Coba ID lain → bedanya apa?
- **Kuning:** Ubah huruf besar-kecil `produk` → masih jalan atau error?
- **Merah:** Hapus baris `import { getProduk } from "./api.js";` → error apa? Pasang lagi.

## Tantangan

**Capstone: Toko JavaScript Lengkap di Warungmu:** pakai `/api/produk` hingga benar-benar jalan, lalu kerjakan tiga tingkat ini.
- **Hijau:** Jalankan Program minggu ini apa adanya; catat output yang keluar.
- **Kuning:** Ubah 1 nilai pada `/api/produk`; tebak output SEBELUM run, lalu cocokkan.
- **Merah:** Gabungkan dengan **Performance Optimization** (Minggu 13): pasang hasilnya di alur itu, pastikan ujung-ke-ujung jalan.

## Glosarium Mini

- Lihat Istilah Wajib di atas.

## Ringkasan

Minggu 14: **Capstone JS** — toko lengkap, **Selesai JS 0→Ahli!**
