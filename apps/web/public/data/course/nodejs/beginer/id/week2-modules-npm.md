# Modules & npm — Pinjam Alat Dapur Node

> **Kategori:** Node.js | **Level:** Pemula | **Minggu 2:** Modules & npm
> **Prasyarat:** Minggu 1 — **Dasar Node.js**.

## Tujuan Pembelajaran

- `require("./kasir.js")` pinjam alat tetangga, `module.exports = {...}` bagi alat (sumber: nodejs.org/api/modules)
- `npm install <paket>` pinjam dari gudang npm, `package.json` catat, `node_modules` gudang fisik (sumber: docs.npmjs.com)
- Bedakan `require` (CommonJS) vs `import` (ESM) + `"type": "module"`

---

## Kenapa Ini Penting Buat Kamu?

Tanpa modules, `app.js` 500 baris campur hitung + cetak + simpan — cari `hitungTotal` scroll 10 menit. Dengan bagi `kasir.js` (hitung) + `cetak.js` (tampil), rapi. Tanpa `npm`, tulis sendiri fungsi tanggal, warna — buang waktu, padahal 3 juta paket gratis.

---

## Program: Dapur Bagi Tugas + Pinjam Gudang

```bash
npm init -y
npm install chalk
```

```javascript
// kasir.js — alat hitung (bagi via exports)
function hitungTotal(belanja, diskon = 0) {
  const total = belanja.reduce((s, i) => s + i.harga * i.qty, 0);
  return total * (1 - diskon / 100);
}
module.exports = { hitungTotal }; // CommonJS

// app.js — pinjam + pakai
const { hitungTotal } = require("./kasir.js");
const keranjang = [{ harga: 62000, qty: 1 }, { harga: 5000, qty: 2 }];
console.log("Total:", hitungTotal(keranjang, 10));

// Paket gudang: chalk untuk warna (npm install chalk)
const chalk = require("chalk");
console.log(chalk.green("Warung buka!"));
console.log(chalk.red("Stok habis!"));
```

**ESM modern (opsional):** tambah `"type": "module"` di `package.json` → pakai `import { hitungTotal } from "./kasir.js"` + `export function hitungTotal`.

---

## Konsep Kunci

### `require` / `module.exports` (CommonJS)
- `module.exports = { hitungTotal }` bagi, `require("./kasir.js")` pinjam. Path `./` = file sendiri.

### `npm install` / `package.json`
- `npm install chalk` → unduh ke `node_modules` + catat di `package.json` dependencies.
- `npm init -y` buat KTP proyek.

### CommonJS vs ESM
- `require` = lama tapi default Node. `import` = modern, butuh `"type": "module"`.

---

## Penjelasan untuk Pemula

### Analogi: Dapur Bagi Tugas + Gudang
- **Module = bagi dapur**: `kasir.js` khusus hitung, `app.js` atur.
- **npm = gudang alat**: `chalk` obeng warna, tidak bikin sendiri.

### Langkah 0 — Siapkan Device
- Sama W1: `node -v`, folder `warung-node`, `npm init -y`.

### Cara Komputer Membaca
1. `require("./kasir.js")` → baca file → jalankan → ambil `module.exports`.
2. `require("chalk")` → cari di `node_modules/chalk`.

### 3 Istilah Wajib
1. **Module/exports**: bagi/pinjam alat
2. **npm/package.json**: gudang/KTP
3. **CommonJS/ESM**: lama/modern

---

## Eksperimen

- **Hijau:** Buat `sapa.js` export `sapa(nama)` → `require` di `app.js`?
- **Kuning:** `npm install lodash` → `_.chunk([1,2,3,4], 2)` → apa?
- **Merah:** `require("./kasir")` tanpa `.js` → tetap jalan? (Node tebak `.js`)

---

## Tantangan

**Dapur 3 File:** `produk.js` export `daftar`, `kasir.js` export `hitungTotal` + `ongkir`, `app.js` import keduanya → struk lengkap + `chalk` warna total.
- **Sambungan (Minggu 1 — Dasar Node.js):** pasang hasil tantangan ini ke alur itu; pastikan ujung-ke-ujung jalan.

---
## Glosarium Mini

- **require/exports**: pinjam/bagi
- **npm/node_modules**: gudang/fisik
- **package.json**: KTP proyek

---

## Ringkasan

Minggu 2 dari 4: **Pinjam Alat** (Level: Pemula). Bisa bagi file + gudang npm. Minggu depan: **File System** — buku kas file.
