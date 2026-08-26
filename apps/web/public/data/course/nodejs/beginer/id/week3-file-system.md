# File System — Buku Kas di File

> **Kategori:** Node.js | **Level:** Pemula | **Minggu 3:** File System

## Tujuan Pembelajaran

- `fs.readFileSync` / `writeFileSync` — baca/tulis buku kas `produk.json`
- `fs.existsSync`, `mkdirSync` — cek & buat folder

---

## Program

```javascript
const fs = require("fs");

const produk = [{ nama: "Beras", harga: 62000 }, { nama: "Bayam", harga: 5000 }];
fs.writeFileSync("produk.json", JSON.stringify(produk, null, 2)); // tulis

const data = JSON.parse(fs.readFileSync("produk.json", "utf8")); // baca
console.log(data);

if (!fs.existsSync("backup")) fs.mkdirSync("backup");
fs.copyFileSync("produk.json", "backup/produk.json");
console.log("Backup selesai");
```

---

## Ringkasan

Minggu 3: **Buku Kas File** — tulis & baca `json` lewat `fs`. Minggu depan: **Events**.
