# Capstone: Toko JavaScript Lengkap

> **Kategori:** JavaScript | **Level:** Lanjutan | **Minggu 14:** Capstone

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
- Lihat Program: jalankan (`node`/browser), ubah 1 hal, lihat bedanya.

### Langkah 0 — Siapkan Device
- Sama JS W1: `node -v` / browser + `npm test` untuk W12.

### Cara Komputer Membaca
- CHECKLIST (modul + API + DOM + test + deploy) lalu URL + video.

### 3 Istilah Wajib
- 1. **Capstone/deploy**: gabung/buka

---

## Glosarium Mini

- Lihat Istilah Wajib di atas.

## Ringkasan

Minggu 14: **Capstone JS** — toko lengkap, **Selesai JS 0→Ahli!**
