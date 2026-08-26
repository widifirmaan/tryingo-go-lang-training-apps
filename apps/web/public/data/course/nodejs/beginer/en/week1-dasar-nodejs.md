# Dasar Node.js — Dapur Warung di Terminal

> **Kategori:** Node.js | **Level:** Pemula | **Minggu 1:** Dasar Node.js

## Tujuan Pembelajaran

- Paham Node.js = **dapur yang jalan di terminal** (bukan browser) — `node -v`, `npm -v`
- Buat `package.json` `npm init -y`, `app.js` dengan `console.log` dan `process.argv`
- Jalankan `node app.js` dan `node app.js Budi 2` baca argumen
- `global`, `process`, `__dirname` — info dapur

---

## Kenapa Ini Penting Buat Kamu?

Warung butuh dapur yang bisa hitung tanpa buka browser. Node = JS di terminal, untuk hitung stok, cetak struk di kasir, nanti jadi server.

---

## Program: Dapur Node Pertama

Simpan `app.js`

```javascript
// app.js — jalan di terminal, bukan browser
console.log("Dapur Warung Node.js");
console.log("Versi Node:", process.version);
console.log("Folder:", __dirname);

// Baca argumen: node app.js Budi 2
const nama = process.argv[2] || "Tamu";
const qty = Number(process.argv[3] || 1);
console.log(`Halo ${nama}, qty: ${qty}`);

// Hitung
const harga = 62000;
console.log(`Total: Rp ${(harga * qty).toLocaleString("id-ID")}`);

// Tanpa DOM: document is not defined di Node — wajar
// console.log(typeof document); // ReferenceError
```

**Jalankan:**
```
node app.js
node app.js Budi 2
node --version
npm --version
```

Buat `package.json`: `npm init -y` → lihat `name`, `version`, `scripts`.

---

## Konsep Kunci

### Node vs Browser
- Browser punya `document`, `window`. Node punya `process`, `fs`, `http`.
- `process.argv` = antrian pesanan dari terminal.

### `npm init`
Bikin `package.json` — KTP proyek.

---

## Penjelasan untuk Pemula

### Analogi: Dapur Terminal
- **Browser = ruang makan**, **Node = dapur belakang** — tidak ada meja, hanya kompor & hitungan.

---

## Tantangan

**Kasir Terminal:** `node kasir.js Siti 3` → baca `nama` dan `qty` dari `argv`, hitung `total = 62000*qty`, cetak `Halo Siti, total Rp ...`.

---

## Ringkasan

Minggu 1: **Dapur Node** — JS di terminal. Minggu depan: **Modules & npm** — pinjam alat.
