# Dasar Node.js & Runtime

> **Kategori:** Node.js | **Level:** Pemula | **Minggu 1:** Dasar Node.js & Runtime

## Tujuan Pembelajaran

- Memahami apa itu Node.js dan perannya sebagai JavaScript runtime
- Menjalankan file JavaScript dengan node command
- Mengenal process object: version, platform, argv
- Variabel: const, let, dan tipe data dasar JavaScript
- Function declaration vs arrow function

---

## Program: Halo Node.js

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

## Konsep Kunci

### Apa Itu Node.js
Node.js adalah JavaScript runtime berbasis V8 engine.

### Process Object
process.version, process.platform, process.argv.

### Variabel
const tidak bisa di-reassign, let bisa, var hindari.

### Function
Function declaration vs arrow function.

---

## Eksperimen

- Ubah nilai variabel dan lihat perubahannya
- Tambah function baru dengan parameter berbeda
- Coba process.argv dengan argumen custom
- Buat arrow function dengan multiple parameters

---

## Tantangan

Buat program CLI sapaan: terima nama dari process.argv, output sapaan dengan timestamp.

---

## Ringkasan

Minggu 1 dari 12: **Dasar Node.js & Runtime** (Level: Pemula). Minggu depan: **Modules & NPM**.
