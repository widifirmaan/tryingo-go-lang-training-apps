# Functions

> **Kategori:** JavaScript | **Level:** Beginner | **Minggu 4:** Functions

## Learning Objectives

- Function declaration vs function expression vs arrow function
- Parameters, default parameters, rest parameters
- Return values and early returns
- Callback functions as arguments
- Closures: functions that "remember" outer scope

---

## Program: Modular Calculator

```javascript
// Function Declaration
function sapa(nama) {
    return `Halo, ${nama}!`;
}
console.log(sapa("Budi"));

// Function Expression
const tambah = function(a, b) {
    return a + b;
};
console.log("Tambah:", tambah(5, 3));

// Arrow Function
const kali = (a, b) => a * b;
const bagi = (a, b) => {
    if (b === 0) return "Error: bagi nol";
    return a / b;
};
console.log("Kali:", kali(4, 3));
console.log("Bagi:", bagi(10, 2));

// Default Parameter
const sapaDefault = (nama = "Tamu") => `Halo, ${nama}!`;
console.log(sapaDefault());
console.log(sapaDefault("Siti"));

// Rest Parameter
const sumAll = (...numbers) => numbers.reduce((a, b) => a + b, 0);
console.log("Sum:", sumAll(1, 2, 3, 4, 5));

// Callback
function proses(arr, callback) {
    return arr.map(callback);
}
const hasil = proses([1, 2, 3], n => n * n);
console.log("Callback:", hasil);

// Closure
function counter() {
    let count = 0;
    return function() {
        return ++count;
    };
}
const hitung = counter();
console.log("\n=== Closure ===");
console.log("Hitung:", hitung());
console.log("Hitung:", hitung());
console.log("Hitung:", hitung());
```

---

## Key Concepts

### Function Types
`function decl()` hoisted. `const fn = function(){}` expression. `() => {}` arrow function.

### Parameters
Default: `function(x = 10)`. Rest: `function(...args)` — collect all args to array.

### Return
`return value` — exit function with value. No return = undefined.

### Callbacks
Function passed as argument to another function.

### Closures
Inner function that still accesses outer scope variables after outer completes.

---

## Experiments

- Create recursive function for factorial
- Try higher-order function: function that returns function
- Experiment closure for private counter
- Create function with async callback simulation
- Try IIFE (Immediately Invoked Function Expression)

---

## Challenge

Build a math library: add, subtract, multiply, divide, power, factorial — all with arrow functions and error handling.

---

## Summary

Week 4 of 14: **Functions** (Level: Beginner). Code modularity. Next week: **DOM Manipulation**.
