# ES6+ Features

> **Kategori:** JavaScript | **Level:** Menengah | **Minggu 8:** ES6+ Features

## Tujuan Pembelajaran

- Destructuring: array dan object dengan rest pattern
- Classes: constructor, extends, super, method
- Optional chaining: ?. untuk akses property aman
- Nullish coalescing: ?? untuk default value
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

## Konsep Kunci

### Destructuring
`const [a, ...rest] = arr` — ekstrak array. `const { nama } = obj` — ekstrak object.

### Classes
`class` syntax di atas prototype. `extends` inheritance, `super()` parent constructor.

### Optional Chaining
`obj?.prop?.method?.()` — return undefined jika chain null/undefined, tidak throw error.

### Nullish Coalescing
`value ?? default` — default hanya jika null/undefined (bukan 0 atau "").

### Logical Assignment
`x ??= val` — assign hanya jika x nullish. `x ||= val` — assign hanya jika x falsy.

---

## Eksperimen

- Buat class hierarchy: Vehicle → Car → ElectricCar
- Coba optional chaining dengan method call
- Eksperimen ?? vs || pada berbagai value
- Buat swap variable dengan destructuring
- Coba private class fields dengan #

---

## Tantangan

Buat class Library: Book, Member, Transaction — dengan inheritance, optional chaining, dan nullish coalescing.

---

## Ringkasan

Minggu 8 dari 14: **ES6+ Features** (Level: Menengah). JavaScript modern. Minggu depan: **Modules**.
