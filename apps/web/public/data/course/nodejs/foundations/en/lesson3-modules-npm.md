# The Module System & npm

> Node.js | Node Foundations | Lesson 3

## Learning Objectives

- Create and import local modules (CommonJS)
- Distinguish core, third-party, and local modules
- Understand package.json and semver
- Manage dependencies with npm install

---

## Program: The Module System & npm

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

## Explanation

## Three Kinds of Modules
Core modules: provided by Node (fs, path, http) - require('node:fs'). Third-party: from the npm registry (express, mongoose) - require('express'). Local: your own files - require('./utils'). Node resolves in order: core → node_modules → relative path.
## CommonJS vs ES Modules
CommonJS: require/module.exports, Node's default, synchronous. ES Modules: import/export, the modern JavaScript standard, supported by Node with .mjs extensions or "type": "module" in package.json. The 2026 industry runs both: old codebases in CommonJS, new ones in ES Modules. This bootcamp uses require (CommonJS) for consistency and clarity; you will meet import in TypeScript/Nest projects.
## package.json: The Project ID Card
npm init creates it. Key fields: name, version (semver: MAJOR.MINOR.PATCH), scripts (npm start, npm test - custom commands), dependencies (production) vs devDependencies (build/test). package-lock.json pins EXACT dependency versions - always commit this file.
## npm install & Semver
npm install adds a dependency and uses it from node_modules (never commit node_modules - .gitignore!). Semver notation: ^5.3.0 = latest 5.x.x (minor/patch may rise, major may not). This is a trade-off: flexibility vs stability. npm audit scans dependency vulnerabilities - run it regularly.

---

## Experiments

1. **Three Kinds of Modules**
2. **CommonJS vs ES Modules**
3. **package.json: The Project ID Card**
4. **npm install & Semver**

---

## Challenge

Add a second local module: a file calculator.js with kali(a,b) and bagi(a,b) functions. Import it from server.js and log the results. Then add a new dependency (e.g. "lodash" at ^4.17.21) in package.json and use one function from it. Run and record the output.

---

## Summary

Modules: core vs third-party vs local. CommonJS (require) and ES Modules (import). package.json + semver + lockfile. npm install & audit. Next: core modules fs, path, os, events.
