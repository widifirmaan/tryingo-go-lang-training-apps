# Modules & NPM

> **Kategori:** Node.js | **Level:** Pemula | **Minggu 2:** Modules & NPM

## Tujuan Pembelajaran

- Mengenal 3 jenis module: core, local, dan npm
- CommonJS: require() dan module.exports
- Core modules: fs, path, os, http, events
- NPM: init, install, package.json scripts
- ES Modules: import/export (Node.js 14+)

---

## Program: Sistem Modul

```javascript
const fs = require("fs");
const path = require("path");
const os = require("os");

console.log("=== Core Modules ===");
console.log("CPU:", os.cpus().length + " cores");
console.log("Free memory:", Math.round(os.freemem() / 1024 / 1024) + " MB");

const math = {
  tambah: (a, b) => a + b,
  kurang: (a, b) => a - b,
  kali: (a, b) => a * b,
  bagi: (a, b) => b !== 0 ? a / b : NaN,
  rataRata: (arr) => arr.reduce((a, b) => a + b, 0) / arr.length
};

console.log("\n=== Local Module ===");
console.log("10 + 5 =", math.tambah(10, 5));
console.log("10 - 5 =", math.kurang(10, 5));
console.log("Rata-rata [10,20,30]:", math.rataRata([10, 20, 30]));

console.log("\n=== Daftar Core Modules ===");
const modules = { fs: "File system", path: "Path manipulation", os: "System info", http: "HTTP server", events: "Event emitter" };
for (const [key, val] of Object.entries(modules)) {
  console.log("  - " + key + ": " + val);
}
```

---

## Konsep Kunci

### CommonJS vs ES Modules
CommonJS: require() dan module.exports. ES Modules: import dan export.

### Core Modules
fs (file system), path (path manipulation), os (system info), http (HTTP server), events (event emitter).

### NPM
npm init, npm install <pkg>, npm run <script>.

---

## Eksperimen

- Buat module sendiri dengan exports beberapa fungsi
- Coba path.join dan path.resolve
- Buat package.json dengan scripts custom
- Implementasikan ES module dengan .mjs

---

## Tantangan

Buat module kalkulator: tambah, kurang, kali, bagi, rata-rata, median. Export sebagai object.

---

## Ringkasan

Minggu 2 dari 12: **Modules & NPM** (Level: Pemula). Minggu depan: **File System & Path**.
