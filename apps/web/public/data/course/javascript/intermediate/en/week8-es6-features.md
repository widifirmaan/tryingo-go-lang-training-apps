# ES6+ Features

> **Kategori:** JavaScript | **Level:** Intermediate | **Minggu 8:** ES6+ Features

## Learning Objectives

- Destructuring: arrays and objects with rest pattern
- Classes: constructor, extends, super, methods
- Optional chaining: ?. for safe property access
- Nullish coalescing: ?? for default values
- Logical assignment: ||=, &&=, ??=

---

## Program: Modern JS Syntax

```javascript
// Destructuring
const [a, b, ...rest] = [1, 2, 3, 4, 5];
const { nama, umur, ...lain } = { nama: "Budi", umur: 25, kota: "Jakarta" };
console.log("Array:", a, b, rest);
console.log("Object:", nama, umur, lain);

// Default + Rename
const { nama: name, aktif: active = true } = { nama: "Siti" };
console.log("Rename:", name, active);

// Modules (simulasi)
// export const PI = 3.14;
// export function add(a, b) { return a + b; }
// export default class Calculator {}
// import Calculator, { PI, add } from "./math.js";

// Classes
class Animal {
    constructor(name) {
        this.name = name;
    }
    speak() {
        return `${this.name} makes a sound`;
    }
}

class Dog extends Animal {
    constructor(name, breed) {
        super(name);
        this.breed = breed;
    }
    speak() {
        return `${this.name} barks!`;
    }
}

const dog = new Dog("Buddy", "Labrador");
console.log("\n=== Classes ===");
console.log(dog.speak());
console.log("Breed:", dog.breed);

// Optional Chaining
const user = { profile: { email: "budi@mail.com" } };
console.log("\n=== Optional Chaining ===");
console.log("Email:", user?.profile?.email);
console.log("Phone:", user?.profile?.phone); // undefined, no error
console.log("Nested:", user?.address?.street); // undefined, no error

// Nullish Coalescing
const value1 = null ?? "default";
const value2 = 0 ?? "default";
const value3 = "" ?? "default";
console.log("\n=== Nullish Coalescing ===");
console.log("null ??", value1);
console.log("0 ??", value2); // 0 (bukan null/undefined)
console.log("empty ??", value3); // "" (bukan null/undefined)

// Logical Assignment
let x = null;
x ??= "fallback";
console.log("\n=== Logical Assignment ===");
console.log("x ??= fallback:", x);

let count = 5;
count ||= 10; // hanya jika falsy
console.log("count ||= 10:", count);
```

---

## Key Concepts

### Destructuring
`const [a, ...rest] = arr` — extract array. `const { nama } = obj` — extract object.

### Classes
`class` syntax over prototype. `extends` inheritance, `super()` parent constructor.

### Optional Chaining
`obj?.prop?.method?.()` — returns undefined if chain null/undefined, no error thrown.

### Nullish Coalescing
`value ?? default` — default only if null/undefined (not 0 or "").

### Logical Assignment
`x ??= val` — assign only if x nullish. `x ||= val` — assign only if x falsy.

---

## Experiments

- Create class hierarchy: Vehicle → Car → ElectricCar
- Try optional chaining with method calls
- Experiment ?? vs || on various values
- Create swap variables with destructuring
- Try private class fields with #

---

## Challenge

Create a Library class: Book, Member, Transaction — with inheritance, optional chaining, and nullish coalescing.

---

## Summary

Week 8 of 14: **ES6+ Features** (Level: Intermediate). Modern JavaScript. Next week: **Modules**.
