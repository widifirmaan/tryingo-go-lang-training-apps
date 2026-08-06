# Node.js Basics & Runtime

> **Kategori:** Node.js | **Level:** Beginner | **Minggu 1:** Node.js Basics & Runtime

## Learning Objectives

- Understand what Node.js is and its role as a JavaScript runtime
- Run JavaScript files with the node command
- Learn process object: version, platform, argv
- Variables: const, let, and basic JavaScript data types
- Function declarations vs arrow functions

---

## Program: Hello Node.js

```javascript
const nama = "Node.js";
console.log("Selamat datang di " + nama + "!");
console.log("Versi: " + process.version);
console.log("Platform: " + process.platform);

const umur = 25;
const tinggi = 175.5;
const aktif = true;
const hobi = ["ngoding", "baca buku", "musik"];
const profil = { nama: "Budi", kota: "Jakarta" };

console.log("Umur: " + umur + " tahun");
console.log("Hobi: " + hobi.join(", "));
console.log("Profil: " + profil.nama + " dari " + profil.kota);

function sapa(nama) { return "Halo, " + nama + "!"; }
const kali = (a, b) => a * b;

console.log(sapa("Gopher"));
console.log("5 x 3 = " + kali(5, 3));
```

---

## Key Concepts

### What is Node.js
Node.js is a JavaScript runtime powered by V8.

### Process Object
process.version, process.platform, process.argv.

### Variables
const, let, avoid var.

### Functions
Function declarations vs arrow functions.

---

## Experiments

- Change variable values and observe
- Add a new function with different parameters
- Try process.argv with custom arguments
- Create arrow function with multiple parameters

---

## Challenge

Build a CLI greeting: accept name from process.argv, output greeting with timestamp.

---

## Summary

Week 1 of 12: **Node.js Basics & Runtime** (Level: Beginner). Next week: **Modules & NPM**.
