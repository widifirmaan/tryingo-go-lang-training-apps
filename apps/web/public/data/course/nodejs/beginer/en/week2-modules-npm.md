# Modules & NPM

> **Kategori:** Node.js | **Level:** Beginner | **Minggu 2:** Modules & NPM

## Learning Objectives

- Learn 3 module types: core, local, and npm
- CommonJS: require() and module.exports
- Core modules: fs, path, os, http, events
- NPM: init, install, package.json scripts
- ES Modules: import/export (Node.js 14+)

---

## Program: Module System

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

## Key Concepts

### CommonJS vs ES Modules
require()/module.exports vs import/export.

### Core Modules
fs, path, os, http, events.

### NPM
npm init, npm install, npm run.

---

## Experiments

- Create your own module with multiple exports
- Try path.join and path.resolve
- Create package.json with custom scripts
- Implement ES module with .mjs

---

## Challenge

Build a calculator module: add, subtract, multiply, divide, average, median. Export as object.

---

## Summary

Week 2 of 12: **Modules & NPM** (Level: Beginner). Next week: **File System & Path**.
