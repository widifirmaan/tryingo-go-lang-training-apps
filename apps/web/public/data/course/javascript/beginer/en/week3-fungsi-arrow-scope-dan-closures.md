# First-Class Functions, Arrow Syntax, Scope & Closures

> **Kategori:** JavaScript | **Level:** Logic Fundamentals & Data Structures | **Minggu 3:** First-Class Functions, Arrow Syntax, Scope & Closures

## Learning Objectives

- Understand functions as First-Class Citizens (assignable to variables and passable as higher-order arguments)
- Master Arrow Function syntax, default parameters, and concise implicit returns
- Grasp Lexical Scope: how inner functions query outer lexical scopes across resolution chains
- Demystify Closures: the retention of outer scope memory environments post-execution
- Construct Factory Functions for state encapsulation free of global scope pollution

---

## Program: Custom Discount Calculator Engine via Lexical Closures

```javascript
// 1. Function Declaration Tradisional vs Arrow Function Modern
function hitungTotal(harga, kuantitas = 1) {
  return harga * kuantitas;
}

// Arrow function ringkas dengan implicit return
const formatRupiah = (angka) => "Rp " + angka.toLocaleString("id-ID");

// 2. Fungsi sebagai First-Class Citizen (Bisa dijadikan argumen)
const terapkanBiayaLayanan = (subtotal, fungsiFormat, tarifAdmin = 5000) => {
  const totalAkhir = subtotal + tarifAdmin;
  return fungsiFormat(totalAkhir);
};

console.log("Total Belanja Dasar  :", formatRupiah(hitungTotal(75000, 2)));
console.log("Dengan Biaya Layanan :", terapkanBiayaLayanan(150000, formatRupiah));

// 3. Konsep Lanjutan: Lexical Scope & Closure
// Fungsi luar mengingat variabel lingkungannya meskipun sudah selesai dieksekusi!
function buatKalkulatorDiskon(persenDiskon) {
  const faktorPengali = 1 - (persenDiskon / 100);

  // Fungsi anak (closure) mempertahankan akses ke faktorPengali
  return function(hargaAsli) {
    const hargaDiskon = hargaAsli * faktorPengali;
    return formatRupiah(hargaDiskon);
  };
}

// Membuat generator diskon khusus
const diskonMemberVIP = buatKalkulatorDiskon(20); // Diskon 20%
const diskonFlashSale = buatKalkulatorDiskon(50); // Diskon 50%

console.log("\n=== Eksekusi Engine Closure ===");
const hargaLaptop = 10000000;
console.log("Harga Normal :", formatRupiah(hargaLaptop));
console.log("Member VIP   :", diskonMemberVIP(hargaLaptop)); // Memakai diskon 20%
console.log("Flash Sale   :", diskonFlashSale(hargaLaptop)); // Memakai diskon 50%
```

---

## Key Concepts

### First-Class Functions Explained
In JavaScript, functions are first-class citizens: they can be bound to identifiers, nested within arrays, assigned as object properties, and dispatched into higher-order functions as callbacks.

### Arrow Functions vs Declarations
Arrow syntax (\`() => {}\`) provides two structural advantages:
1. **Conciseness**: Single-expression bodies omit curly braces and the \`return\` keyword via implicit returns.
2. **Lexical \`this\` Binding**: Arrow functions do not bind their own execution context (\`this\`), adopting the enclosing lexical context automatically.

### The Closure Mechanism
A closure is the combination of a function bundled together with references to its surrounding lexical environment. When an inner function is declared, it **captures and preserves its outer scope's variables in heap memory**. Even after \`buatKalkulatorDiskon()\` terminates and pops from the call stack, the captured variable \`faktorPengali\` remains alive for subsequent invocations. This enables true state encapsulation.

---

---

## Beginner Friendly Explanation

### Analogy: Custom Rubber Stamp Manufacturer
1. **Standard Functions** are hand-held pocket calculators: you enter numbers, read the result, and the register clears.
2. **Closures** are ordered custom rubber stamps: you order a stamp calibrated to "20% Discount" (**`buatKalkulatorDiskon(20)`**). Whenever you stamp an invoice months later, the stamp permanently remembers its internal 20% calibration.

## Experiments

- Instantiate diskonKaryawan = buatKalkulatorDiskon(30) to verify state isolation from previous instances.
- Wrap an arrow function body in curly braces {} while omitting return to observe undefined return values.
- Attempt to log faktorPengali directly from global scope to verify lexical private encapsulation.
- Engineer an auto-incrementing ID counter factory using a closure counter variable.

---

## Challenge

Build a bank account factory `buatAkunBank(owner, initialBalance)`: retain the balance within a private closure. Return an object exposing `setor(amount)`, `tarik(amount)`, and `cekSaldo()`. Guarantee the balance cannot be modified externally.

---

## Summary

You have mastered first-class functions, arrow syntax, lexical scope, and closures. Next week, we examine functional array data manipulation with map, filter, and reduce.
