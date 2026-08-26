# Modules & npm — Pinjam Alat Dapur

> **Kategori:** Node.js | **Level:** Pemula | **Minggu 2:** Modules & npm

## Tujuan Pembelajaran

- `require` / `import` — pinjam alat, `module.exports` — bagi alat
- `npm install` pinjam dari gudang, `package.json` catat, `node_modules` gudang fisik
- `npx` jalankan tanpa install global

---

## Program

```javascript
// math.js — alat hitung
function tambah(a,b){ return a+b; }
function kali(a,b){ return a*b; }
module.exports = { tambah, kali };

// app.js — pinjam
const { tambah, kali } = require("./math.js");
console.log(tambah(2,3)); // 5

// npm: pinjam chalk untuk warna
// npm install chalk
// const chalk = require("chalk"); console.log(chalk.green("Hijau!"))
```

**Perintah:**
```
npm install lodash
npm list
npm uninstall lodash
```

---

## Ringkasan

Minggu 2: **Pinjam Alat** — `require` dan `npm`. Minggu depan: **File System**.
