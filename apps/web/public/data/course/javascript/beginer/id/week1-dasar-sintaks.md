# Dasar Sintaks JavaScript

> **Kategori:** JavaScript | **Level:** Pemula | **Minggu 1:** Dasar Sintaks JavaScript

## Tujuan Pembelajaran

- Mendeklarasikan variabel dengan const, let, var
- Tipe data primitif: string, number, boolean, null, undefined, symbol
- Operator aritmatika: +, -, *, /, %, **
- Template literal dengan backtick dan ekspresi ${}
- typeof operator untuk cek tipe data

---

## Program: Halo JavaScript

```javascript
// Variabel dan Tipe Data
const nama = "Budi";
let umur = 25;
const aktif = true;

console.log("Nama:", nama);
console.log("Umur:", umur);
console.log("Aktif:", aktif);
console.log("Tipe nama:", typeof nama);
console.log("Tipe umur:", typeof umur);

// Operator
const a = 10;
const b = 3;
console.log("\n=== Operator ===");
console.log("a + b =", a + b);
console.log("a - b =", a - b);
console.log("a * b =", a * b);
console.log("a / b =", a / b);
console.log("a % b =", a % b);
console.log("a ** b =", a ** b);

// Template Literal
const sapa = `Halo, ${nama}! Umur Anda ${umur} tahun.`;
console.log("\n" + sapa);

// Null & Undefined
let kosong = null;
let belumDiisi;
console.log("\nnull:", kosong);
console.log("undefined:", belumDiisi);
```

---

## Konsep Kunci

### Variabel
`const` immutable, `let` mutable, `var` (hindari - function scope).

### Tipe Data Primitif
`string`, `number`, `boolean`, `null`, `undefined`, `symbol`, `bigint`.

### Operator
Aritmatika: `+ - * / % **`. Perbandingan: `=== !== > < >= <=`.

### Template Literal
Backtick `` ` `` dengan `${expr}` untuk string interpolation.

### typeof
`typeof "hello"` = "string", `typeof 42` = "number".

---

## Eksperimen

- Ubah nilai variabel let dan const — apa yang terjadi?
- Coba operator perbandingan: 5 === "5"
- Buat template literal dengan ekspresi aritmatika
- Coba typeof pada null, array, dan object
- Eksperimen dengan operator logika && dan ||

---

## Tantangan

Buat program kalkulator sederhana: input dua angka, output semua operasi aritmatika dengan template literal.

---

## Ringkasan

Minggu 1 dari 14: **Dasar Sintaks JavaScript** (Level: Pemula). Fondasi bahasa. Minggu depan: **Tipe Data & Struktur Data**.
