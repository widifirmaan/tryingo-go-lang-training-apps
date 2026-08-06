# Control Flow

> **Kategori:** JavaScript | **Level:** Beginner | **Minggu 3:** Control Flow

## Learning Objectives

- If/else if/else for multi-level conditions
- Ternary operator: condition ? true : false
- Switch case for multiple conditions
- Loops: for, while, do-while, for-of, for-in
- Break and continue for loop control

---

## Program: Grade System

```javascript
// If/Else
const nilai = 85;

if (nilai >= 90) {
    console.log("Grade: A");
} else if (nilai >= 80) {
    console.log("Grade: B");
} else if (nilai >= 70) {
    console.log("Grade: C");
} else {
    console.log("Grade: D");
}

// Ternary
const status = nilai >= 70 ? "Lulus" : "Tidak Lulus";
console.log("Status:", status);

// Switch
const hari = "Senin";
switch (hari) {
    case "Senin":
        console.log("Mulai kerja!");
        break;
    case "Jumat":
        console.log("Hampir weekend!");
        break;
    default:
        console.log("Hari biasa.");
}

// For Loop
console.log("\n=== For Loop ===");
for (let i = 1; i <= 5; i++) {
    console.log("Iterasi ke-" + i);
}

// For...Of (Array)
const warna = ["merah", "hijau", "biru"];
console.log("\n=== For...Of ===");
for (const w of warna) {
    console.log("Warna:", w);
}

// For...In (Object)
const user = { nama: "Budi", umur: 25 };
console.log("\n=== For...In ===");
for (const key in user) {
    console.log(key + ":", user[key]);
}

// While & Do-While
console.log("\n=== While ===");
let n = 1;
while (n <= 3) {
    console.log("While:", n);
    n++;
}

// Break & Continue
console.log("\n=== Break & Continue ===");
for (let i = 1; i <= 10; i++) {
    if (i === 5) break;
    if (i % 2 === 0) continue;
    console.log("Ganjil (sebelum 5):", i);
}
```

---

## Key Concepts

### If/Else
Multi-level conditions. Evaluates top-down, stops at first true.

### Ternary
`condition ? valueIfTrue : valueIfFalse` — shorthand for simple if/else.

### Switch
Good for many conditions with fixed values. Don't forget `break`.

### Loops
`for` classic, `while` condition first, `do-while` run first. `for-of` for iterables, `for-in` for object keys.

### Break & Continue
`break` exits loop, `continue` skips to next iteration.

---

## Experiments

- Create FizzBuzz program with for and if
- Try switch with multiple cases
- Experiment for-of on string
- Create loop with break on specific condition
- Try nested loop for multiplication table

---

## Challenge

Build a number guessing game: generate random, user guesses, hint higher/lower, limit 5 attempts.

---

## Summary

Week 3 of 14: **Control Flow** (Level: Beginner). Program logic. Next week: **Functions**.
