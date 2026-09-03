# Capstone: Toko JavaScript Lengkap

> **Kategori:** JavaScript | **Level:** Lanjutan | **Minggu 14:** Capstone

## Tujuan Pembelajaran

- Gabung `modules` + `fetch` + `DOM` + `test` jadi toko `produk` + `keranjang` + `deploy`

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

## Ringkasan

Minggu 14: **Capstone JS** — toko lengkap, **Selesai JS 0→Ahli!**
