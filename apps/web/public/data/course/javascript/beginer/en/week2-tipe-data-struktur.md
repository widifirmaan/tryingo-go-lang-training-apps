# Data Types & Data Structures

> **Kategori:** JavaScript | **Level:** Beginner | **Minggu 2:** Data Types & Data Structures

## Learning Objectives

- Array: push, pop, shift, unshift, length
- Array methods: map, filter, reduce, find, some, every
- Objects: property access with dot and bracket notation
- Destructuring: extract values from arrays and objects
- Spread operator: ... for copying and merging

---

## Program: Arrays & Objects

```javascript
// Array
const buah = ["apel", "mangga", "pisang"];
console.log("Buah:", buah);
console.log("Panjang:", buah.length);
console.log("Pertama:", buah[0]);
console.log("Terakhir:", buah[buah.length - 1]);

buah.push("jeruk");
buah.pop();
buah.unshift("anggur");
console.log("Setelah modifikasi:", buah);

console.log("\n=== Array Methods ===");
const angka = [1, 2, 3, 4, 5];
const doubled = angka.map(n => n * 2);
const evens = angka.filter(n => n % 2 === 0);
const sum = angka.reduce((acc, n) => acc + n, 0);
console.log("Original:", angka);
console.log("Doubled:", doubled);
console.log("Evens:", evens);
console.log("Sum:", sum);

// Object
const mahasiswa = {
    nama: "Budi",
    umur: 20,
    jurusan: "Informatika",
    aktif: true
};
console.log("\n=== Object ===");
console.log("Nama:", mahasiswa.nama);
console.log("Umur:", mahasiswa["umur"]);

mahasiswa.semester = 4;
delete mahasiswa.aktif;
console.log("Setelah update:", mahasiswa);

// Destructuring
const { nama, jurusan } = mahasiswa;
console.log("\nDestructuring:", nama, "-", jurusan);

// Spread
const buahBaru = [...buah, "durian", "manggis"];
console.log("Spread:", buahBaru);
```

---

## Key Concepts

### Arrays
Ordered lists. `push`/`pop` at end, `shift`/`unshift` at start.

### Array Methods
`map` transform, `filter` select, `reduce` accumulate, `find` search first.

### Objects
Key-value pairs. Access: `obj.key` or `obj["key"]`.

### Destructuring
`const { nama } = obj` — extract property to variable.

### Spread
`[...arr1, ...arr2]` — merge arrays. `{...obj1, ...obj2}` — merge objects.

---

## Experiments

- Create 2D array and iterate with nested forEach
- Try reduce to calculate average
- Experiment destructuring nested objects
- Create object copy with spread vs Object.assign
- Try array method chaining: filter().map().reduce()

---

## Challenge

Build a contact management program: add, delete, search, filter by category — use array of objects.

---

## Summary

Week 2 of 14: **Data Types & Data Structures** (Level: Beginner). Data organization. Next week: **Control Flow**.
