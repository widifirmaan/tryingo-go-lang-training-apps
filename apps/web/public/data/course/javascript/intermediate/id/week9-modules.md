# Modules — Bagi Warung Jadi File Terpisah

> **Kategori:** JavaScript | **Level:** Menengah | **Minggu 9:** Modules

## Tujuan Pembelajaran

- `export` / `import` — bagi `warung.js` jadi `produk.js` + `kasir.js` biar tidak 1 file 500 baris
- `import { hitung } from "./kasir.js"` dan `import * as Warung from "./warung.js"`
- `type="module"` di `<script>`

---

## Kenapa Ini Penting Buat Kamu?

Warung 50 fungsi di 1 file → cari `hitungTotal` scroll 10 menit. Bagi jadi `produk.js` (rak), `kasir.js` (hitung) → rapi.

---

## Program: Bagi File Warung

```javascript
// kasir.js — alat hitung
export function hitungTotal(belanja, diskon=0){
  const total = belanja.reduce((s,i)=>s+i.harga*i.qty,0);
  return total * (1 - diskon/100);
}
export const ongkir = (berat,jarak) => berat*5000 + jarak*2000;

// produk.js — daftar
export const daftar = [
  { nama: "Beras", harga: 62000 },
  { nama: "Bayam", harga: 5000 }
];

// app.js — susun
import { hitungTotal, ongkir } from "./kasir.js";
import { daftar } from "./produk.js";

console.log("Daftar:", daftar);
console.log("Total:", hitungTotal([{harga:62000,qty:1}], 10));
console.log("Ongkir:", ongkir(2,5));
```

**HTML:** `<script type="module" src="app.js"></script>` — wajib `type="module"`.

**Node:** `import` butuh `"type": "module"` di `package.json` atau pakai `require` (CommonJS).

---

## Konsep Kunci

### `export` / `import` = Bagi & Pinjam
`export function hitung` → `import { hitung } from "./kasir.js"` — seperti pinjam alat dari laci lain.

### `default` vs `named`
- `export default hitung` → `import hitung from "./kasir.js"` (1 per file)
- `export function hitung` → `import { hitung }` (banyak)

---

## Penjelasan untuk Pemula

### Analogi: Bagi Buku Kas
- **1 file 500 baris = buku tebal** → susah cari.
- **Bagi jadi 3 buku tipis** = `produk.js`, `kasir.js`, `app.js` → cari cepat.

---

## Tantangan

**Warung Modul:** `produk.js` export `daftar`, `kasir.js` export `hitungTotal` + `ongkir`, `app.js` import keduanya, hitung struk lengkap + `console.log`.

---

## Ringkasan

Minggu 9: **Bagi File** — `export/import` biar rapi. Minggu depan: **Error Handling**.
