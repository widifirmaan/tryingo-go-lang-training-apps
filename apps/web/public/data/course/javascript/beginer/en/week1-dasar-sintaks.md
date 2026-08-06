# JavaScript Syntax Basics

> **Kategori:** JavaScript | **Level:** Beginner | **Minggu 1:** JavaScript Syntax Basics

## Learning Objectives

- Declare variables with const, let, var
- Primitive types: string, number, boolean, null, undefined, symbol
- Arithmetic operators: +, -, *, /, %, **
- Template literals with backtick and ${} expressions
- typeof operator to check data types

---

## Program: Hello JavaScript

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

## Key Concepts

### Variables
`const` immutable, `let` mutable, `var` (avoid - function scope).

### Primitive Types
`string`, `number`, `boolean`, `null`, `undefined`, `symbol`, `bigint`.

### Operators
Arithmetic: `+ - * / % **`. Comparison: `=== !== > < >= <=`.

### Template Literals
Backtick `` ` `` with `${expr}` for string interpolation.

### typeof
`typeof "hello"` = "string", `typeof 42` = "number".

---

## Experiments

- Change let and const values — what happens?
- Try comparison: 5 === "5"
- Create template literal with arithmetic expression
- Try typeof on null, array, and object
- Experiment with logical operators && and ||

---

## Challenge

Build a simple calculator: input two numbers, output all arithmetic operations with template literals.

---

## Summary

Week 1 of 14: **JavaScript Syntax Basics** (Level: Beginner). Language foundation. Next week: **Data Types & Data Structures**.
