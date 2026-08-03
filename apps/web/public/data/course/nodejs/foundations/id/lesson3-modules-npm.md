# Module System & npm

> Node.js | Fondasi Node | Pelajaran 3

## Tujuan Pembelajaran

- Membuat dan mengimpor modul lokal (CommonJS)
- Membedakan modul inti, pihak ketiga, dan lokal
- Memahami package.json dan semver
- Mengelola dependency dengan npm install

---

## Program: Module System & npm

```js
// Module system & npm
// Jalankan: node server.js

// 1) Modul lokal: import dengan require (CommonJS)
const utils = require('./utils');
console.log('Hasil tambah:', utils.tambah(5, 3));
console.log('Nama aplikasi:', utils.NAMA_APLIKASI);

// 2) Modul inti Node: tanpa install
const path = require('node:path');
console.log('Nama file ini:', path.basename(__filename));

// 3) Modul pihak ketiga: dari npm (lihat package.json)
try {
  const chalk = require('chalk');
  console.log(chalk.green('Modul npm (chalk) berhasil dipakai!'));
} catch {
  console.log('chalk belum diinstall - jalankan: npm install');
}

// 4) ES Modules (import/export) juga didukung
// (lihat file utils.mjs untuk contohnya)

console.log('\npackage.json menyimpan: nama, versi, scripts, dependencies');
console.log('Semua dependency tercatat di dependencies / devDependencies.');
```

---

## Penjelasan

## Tiga Jenis Modul
Modul inti: disediakan Node (fs, path, http) - require('node:fs'). Pihak ketiga: dari npm registry (express, mongoose) - require('express'). Lokal: file Anda sendiri - require('./utils'). Node mencari dengan urutan: inti → node_modules → path relatif.
## CommonJS vs ES Modules
CommonJS: require/module.exports, default di Node, sinkron. ES Modules: import/export, standar JavaScript modern, didukung Node dengan ekstensi .mjs atau "type": "module" di package.json. Industri 2026 berjalan dua-duanya: codebase lama CommonJS, baru ES Modules. Bootcamp ini memakai require (CommonJS) agar konsisten dan mudah dipahami; di proyek TypeScript/Nest Anda akan bertemu import.
## package.json: Kartu Identitas Proyek
npm init membuatnya. Isi penting: name, version (semver: MAJOR.MINOR.PATCH), scripts (npm start, npm test - perintah kustom), dependencies (produksi) vs devDependencies (build/test). package-lock.json mengunci versi EXAKT dependency - selalu commit file ini di git.
## npm install & Semver
npm install menambah dependency dan memakainya dari node_modules (jangan pernah commit node_modules - .gitignore!). Notasi semver: ^5.3.0 = versi 5.x.x terbaru (minor/patch boleh naik, major tidak). Ini trade-off: fleksibilitas vs stabilitas. npm audit memindai kerentanan dependency - jalankan rutin.

---

## Eksperimen

1. **Tiga Jenis Modul**
2. **CommonJS vs ES Modules**
3. **package.json: Kartu Identitas Proyek**
4. **npm install & Semver**

---

## Tantangan

Tambahkan modul lokal kedua: file kalkulator.js berisi fungsi kali(a,b) dan bagi(a,b). Impor dari server.js dan tampilkan hasilnya. Lalu tambahkan dependency baru (misalnya "lodash" versi ^4.17.21) di package.json dan pakai satu fungsi darinya. Jalankan dan catat hasilnya.

---

## Ringkasan

Modul: inti vs pihak ketiga vs lokal. CommonJS (require) dan ES Modules (import). package.json + semver + lockfile. npm install & audit. Lanjut: core modules fs, path, os, events.
