# File System — Buku Kas Tersimpan di File Node

> **Kategori:** Node.js | **Level:** Pemula | **Minggu 3:** File System

## Tujuan Pembelajaran

- `fs.writeFileSync("produk.json", JSON.stringify(...))` tulis, `fs.readFileSync` + `JSON.parse` baca (sumber: nodejs.org/api/fs)
- `fs.existsSync` cek, `fs.mkdirSync` buat folder, `path.join(__dirname, ...)` alamat aman

---

## Kenapa Ini Penting Buat Kamu?

Stok di `list` hilang saat laptop mati. Dengan tulis ke `produk.json`, tutup buka tetap ada — buku kas permanen tanpa database.

---

## Program: Buku Kas File Node

```javascript
const fs = require("fs");
const path = require("path");

const file = path.join(__dirname, "produk.json");

// Tulis (Sync = tunggu selesai, cocok belajar)
const produk = [
  { nama: "Beras", harga: 62000, stok: 10 },
  { nama: "Bayam", harga: 5000, stok: 20 },
];
fs.writeFileSync(file, JSON.stringify(produk, null, 2));
console.log("Tulis selesai →", file);

// Baca
const data = JSON.parse(fs.readFileSync(file, "utf8"));
console.log("Baca:", data.length, "produk");

// Tambah 1 lalu tulis lagi
data.push({ nama: "Telur", harga: 28000, stok: 15 });
fs.writeFileSync(file, JSON.stringify(data, null, 2));

// Backup folder
if (!fs.existsSync("backup")) fs.mkdirSync("backup");
fs.copyFileSync(file, path.join("backup", "produk.json"));
console.log("Backup selesai");
```

---

## Konsep Kunci

### `writeFileSync` / `readFileSync` = Tulis/Baca Tunggu
`Sync` blokir sampai selesai — mudah untuk belajar. Nanti ada `async` (W4).

### `JSON.stringify` / `JSON.parse` = Bungkus/Buka
`stringify(obj, null, 2)` → teks rapi, `parse(teks)` → objek lagi.

### `path.join(__dirname, ...)` = Alamat Aman
`__dirname` folder file ini. `path.join` gabung tanpa salah `/` vs `\`.

---

## Penjelasan untuk Pemula

### Analogi: Buku Kas Kertas
- **`writeFileSync` = tulis buku**, **`readFileSync` = baca buku**, **`JSON` = bahasa buku** (kurawal).
- **`backup/` = fotokopi**: `copyFileSync` salin.

### Langkah 0 — Siapkan Device
- Sama W1: folder `warung-node`, `node buku.js`.

### Cara Komputer Membaca
1. `JSON.stringify(produk, null, 2)` → objek jadi teks rapi.
2. `writeFileSync` → tulis teks ke `produk.json`.

### 3 Istilah Wajib
1. **fs/path**: alat file/alamat
2. **JSON**: bahasa data kurawal
3. **Sync**: tunggu selesai

---

## Eksperimen

- **Hijau:** Buka `produk.json` di VS Code → rapi?
- **Kuning:** Hapus `null, 2` → 1 baris panjang? Pasang lagi.
- **Merah:** Baca file yang tidak ada → error `ENOENT`? Bungkus `if (fs.existsSync(file))`.

---

### Bonus: Streams — Baca File 1GB Tanpa RAM Jebol (inti nodejs.org!)

`readFileSync` file 1GB = RAM 1GB (laptop nangis!). Stream = baca TETES demi tetes via pipa:

```javascript
const fs = require("fs");
const baca = fs.createReadStream("besar.csv", { encoding: "utf8" });
let baris = 0;
baca.on("data", (potong) => { // tiap tetes datang!
  baris += potong.split("\n").length - 1;
});
baca.on("end", () => console.log("Total baris:", baris));
baca.on("error", (e) => console.log("Gagal:", e.message));
```
- Stream = `EventEmitter` juga! (`on("data")`, `on("end")` — nyambung W4!). `pipe()` sambung baca→tulis tanpa tampung.

---

## Tantangan

**Kasir File:** `jual.js` baca `produk.json` → kurangi `stok` Beras 1 → tulis lagi → cetak sisa. Jalankan 3x → stok 10→7?

---

## Glosarium Mini

- **write/read/copyFile**: tulis/baca/salin
- **stringify/parse**: bungkus/buka
- **__dirname**: folder ini

---

## Ringkasan

Minggu 3 dari 4: **Buku Kas File** (Level: Pemula). Data tidak hilang. Minggu depan: **Events & Async** — telinga & janji.
