# Introduction to TypeScript

> **Kategori:** TypeScript | **Level:** Complete TypeScript | **Minggu 1:** Introduction to TypeScript

## Learning Objectives

- Difference between TypeScript and JavaScript: static typing
- Basic types: string, number, boolean, arrays, tuples
- Type inference: TypeScript automatically detects types
- Enums for fixed sets of values
- Any, unknown, void, never types

---

## Program: Hello TypeScript

```typescript
// Dasar Tipe Data
const nama: string = "Budi";
const umur: number = 25;
const aktif: boolean = true;

console.log("Nama:", nama);
console.log("Umur:", umur);
console.log("Aktif:", aktif);

// Type Inference (TypeScript otomatis deteksi tipe)
const kota = "Jakarta"; // string
const tinggi = 175.5;  // number
const setuju = true;   // boolean

// Array
const angka: number[] = [1, 2, 3, 4, 5];
const buah: Array<string> = ["apel", "mangga"];

// Tuple
const koordinat: [number, number] = [106.8, -6.2];
const userTuple: [string, number, boolean] = ["Budi", 25, true];

// Enum
enum Warna {
    Merah = "red",
    Hijau = "green",
    Biru = "blue"
}
const favColor: Warna = Warna.Hijau;

// Any & Unknown
let flexible: any = "bisa apa saja";
flexible = 42;
flexible = true;

let safeUnknown: unknown = "type-safe any";
if (typeof safeUnknown === "string") {
    console.log("String length:", safeUnknown.length);
}

// Void & Never
function logMessage(msg: string): void {
    console.log(msg);
}

function throwError(msg: string): never {
    throw new Error(msg);
}

console.log("\n=== Enum ===");
console.log("Warna favorit:", favColor);
console.log("Koordinat:", koordinat);
```

---

## Key Concepts

### TypeScript vs JavaScript
TypeScript = JavaScript + Static Types. Compiled to JS. Catch errors at compile-time.

### Basic Types
`string`, `number`, `boolean`, `null`, `undefined`, `symbol`.

### Type Inference
`const x = 10` automatically `number`. Don't always need explicit types.

### Arrays & Tuples
`number[]` or `Array<number>`. Tuple `[string, number]` fixed-length.

### Enums
Named value sets: `enum Warna { Merah = "red" }`.

### Any vs Unknown
`any` bypasses type checking. `unknown` is type-safe — must check before use.

---

## Experiments

- Try assigning string to number variable — see the error
- Create enum for days of the week
- Experiment unknown with type guards
- Create tuple with 4 different elements
- Try union type: string | number

---

## Challenge

Build a temperature converter: function with typed parameters, enum for units, and type-safe output.

---

## Summary

Week 1 of 12: **Introduction to TypeScript** (Level: Complete TypeScript). Type foundation. Next week: **Advanced Types**.
