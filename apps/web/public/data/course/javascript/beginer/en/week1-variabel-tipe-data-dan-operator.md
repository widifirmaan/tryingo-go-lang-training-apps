# Modern Variables (const/let), 7 Primitive Types & Coercion

> **Kategori:** JavaScript | **Level:** Logic Fundamentals & Data Structures | **Minggu 1:** Modern Variables (const/let), 7 Primitive Types & Coercion
> ⏱️ **Estimated Time:** 45 Minutes (15m theory, 30m practice) | 🔗 **Pace:** Structured (Step-by-step)


## Learning Objectives

- Deprecate legacy var in favor of const by default and let only when mutation is mandatory
- Master the seven primitive JavaScript types: string, number, bigint, boolean, undefined, symbol, and null
- Understand implicit Type Coercion pitfalls and why loose equality (==) introduces production vulnerabilities
- Enforce strict equality operators (=== and !==) across all computational decision branches
- Inspect runtime data types deterministically using the typeof operator

---

## Program: Cashier Register & Primitive Type Verifier

```javascript
// 1. Deklarasi Modern: const (default) vs let (re-assignable)
const namaToko = "Nusa Tech Store";
let kuotaStok = 45;
kuotaStok = kuotaStok - 5; // Valid dengan let

// 2. Tujuh Tipe Data Primitif JavaScript
const hargaProduk = 1250000;              // number
const pajakPersen = 0.11;                 // number (float)
const namaBarang = 'Monitor 24" 100Hz';   // string
const sedangPromo = true;                 // boolean
let diskonKhusus = null;                  // null (sengaja kosong)
let catatanKasir;                         // undefined (belum diisi)
const idUnik = Symbol("id-transaksi");     // symbol (pasti unik)
const tokenBig = 9007199254740991n + 5n;  // bigint (angka raksasa)

// 3. Kalkulasi dan Pengecekan Tipe Data
const nominalPajak = hargaProduk * pajakPersen;
const totalAkhir = hargaProduk + nominalPajak;

console.log("=== Struk Transaksi " + namaToko + " ===");
console.log("Barang      : " + namaBarang);
console.log("Harga Dasar : Rp " + hargaProduk.toLocaleString("id-ID"));
console.log("Pajak (11%) : Rp " + nominalPajak.toLocaleString("id-ID"));
console.log("Total Bayar : Rp " + totalAkhir.toLocaleString("id-ID"));

// 4. Bahaya Type Coercion (Konversi Implisit) & Solusi Strict Equality (===)
console.log("\n=== Evaluasi Tipe & Strict Equality ===");
console.log("type of hargaProduk :", typeof hargaProduk); // "number"
console.log("type of namaBarang  :", typeof namaBarang);  // "string"
console.log("type of diskonKhusus:", typeof diskonKhusus); // "object" (kebiasaan historis JS)

const angka = 42;
const teks = "42";
console.log("angka == teks  (Loose equality):", angka == teks);   // true (koersi otomatis berbahaya)
console.log("angka === teks (Strict equality):", angka === teks); // false (tipe beda ditolak!)
```

---

## Key Concepts

### The Deprecation of var: const vs let
In modern ECMAScript, \`var\` is abandoned due to function-scoping leaks and silent re-declaration hazards.
- **\`const\`**: Default choice for 90% of bindings. Prevents accidental reassignment and locks reference identities.
- **\`let\`**: Reserved exclusively for bindings requiring reassignment (loop counters, accumulators).

### The Seven Primitive Memory Types
Primitives are stored directly on the execution stack as immutable values:
1. \`number\`: Double-precision 64-bit binary format IEEE 754 floats.
2. \`string\`: UTF-16 code unit text sequences.
3. \`boolean\`: Binary logical truth values: \`true\` or \`false\`.
4. \`undefined\`: State of a declared binding that has not yet been assigned a value.
5. \`null\`: Intentional representation of non-existence or absent object reference.
6. \`bigint\`: Arbitrary-precision integers exceeding \`Number.MAX_SAFE_INTEGER\` ($2^{53} - 1$).
7. \`symbol\`: Guaranteed globally unique primitive object keys.

### Strict Equality (===) vs Loose Coercion (==)
Loose equality (\`==\`) triggers implicit type coercion algorithms under the hood (e.g. \`"" == 0\` evaluates to \`true\`, and \`false == "0"\` evaluates to \`true\`). Strict equality (\`===\`) compares both type identity and value without coercion, eliminating catastrophic logical edge cases.

---

---

## Beginner Friendly Explanation

### Analogy: Sealed Glass Vaults and Pantry Jars
1. **`const`** is a sealed tempered-glass vault: you place your gold watch inside and lock it. You can inspect it, but you cannot swap the watch for a book.
2. **`let`** is a pantry snack jar: today it holds almonds; tomorrow when emptied, you refill it with pretzels.
3. **`undefined` vs `null`**: \`undefined\` is an unopened box arriving from the warehouse with unknown contents; \`null\` is an intentional placard inside the box reading: "This box is deliberately vacant".
4. **`===`** is a biometric passport scanner validating both digital RFID credentials AND facial biometric scans, refusing to accept an unverified photocopy (\`==\`).

## Experiments

- Attempt to reassign the const namaToko binding and observe the runtime TypeError: Assignment to constant variable.
- Evaluate "5" - 2 versus "5" + 2 in your console; observe how minus coerces to numeric subtraction (3) while plus concatenates string tokens ("52").
- Check typeof NaN in DevTools console and discover that its formal type classification is "number".
- Compare null == undefined (true) against null === undefined (false) to evaluate strict equality parsing.

---

## Challenge

Build a currency exchange calculator: declare `const kursUsd = 16250`. Declare an IDR balance, calculate the USD conversion, round with `Math.floor()`, and log strict type assertions using the `===` operator.

---

## Visual Mental Model & Architecture Flow

![Diagram JavaScript Event Loop & Asynchronous Architecture](/diagrams/js-event-loop.svg)

```diagram
┌──────────────┐      Call Stack Empty?      ┌────────────────┐
│  CALL STACK  │ ◄─────────────────────────  │   EVENT LOOP   │
│ (Sync Frames)│                             │  (Coordinator) │
└──────┬───────┘                             └───────▲────────┘
       │ Async Operations (Fetch / Timer)            │
       ▼                                             │
┌──────────────┐                             ┌───────┴────────┐
│  WEB APIs    │ ─── Callback Ready ──────►  │ TASK / PROMISE │
│ (Background) │                             │     QUEUE      │
└──────────────┘                             └────────────────┘
```

---

## Syntax Reference & Practical Guide (W3Schools Style)

Here is the comprehensive breakdown of syntax signatures, parameters, return behavior, and isolated runnable examples introduced in this module:

### 1. `const / let variables`
- **Core Functionality:** Modern block-scoped variable declarations.
- **Parameters / Attributes:** `Identifier, Initial Value`.
- **System Behavior & Return:** `const` defines immutable references; `let` defines reassignable state variables bounded to enclosing blocks.
- **Practical Code Example:**
```javascript
const title = 'Tryngo Learning';
let counter = 0;
counter += 1;
console.log(title, counter);
```
- **Expected Execution Output:**
```text
Tryngo Learning 1
```

### 2. `() => { ... } (Arrow Function)`
- **Core Functionality:** Compact function expression with lexical 'this'.
- **Parameters / Attributes:** `Parameters, Function Body`.
- **System Behavior & Return:** Provides concise function syntax while retaining the lexical `this` binding of the outer enclosing scope.
- **Practical Code Example:**
```javascript
const double = (n) => n * 2;
console.log(double(21));
```
- **Expected Execution Output:**
```text
42
```

### 3. `async / await & fetch(url)`
- **Core Functionality:** Linear asynchronous Promise resolution.
- **Parameters / Attributes:** `URL string, RequestInit options`.
- **System Behavior & Return:** Author asynchronous asynchronous workflows sequentially without callback pyramids.
- **Practical Code Example:**
```javascript
async function getUser(id) {
  const res = await fetch(`https://api.example.com/users/${id}`);
  return await res.json();
}
```
- **Expected Execution Output:**
```text
Returns resolved JSON object from server
```

### 4. `Array.prototype.map() / filter()`
- **Core Functionality:** Pure functional array transformation.
- **Parameters / Attributes:** `callback(item, index, array)`.
- **System Behavior & Return:** `map` returns transformed values; `filter` removes non-matching elements without mutating the original array.
- **Practical Code Example:**
```javascript
const numbers = [1, 2, 3, 4, 5];
const evens = numbers.filter(n => n % 2 === 0);
console.log(evens);
```
- **Expected Execution Output:**
```text
[2, 4]
```


---

## Common Pitfalls & Debugging Tips

### 1. Loose Equality Bugs (== vs ===)
- **Symptom / Issue:** Unintended type coercion leads to subtle logic bugs (e.g. `0 == ''` is true).
- **Root Cause:** Common mistaken assumptions during early development.
- **Fix / Best Practice:** Consistently use strict equality operators (`===` and `!==`).

### 2. Direct State & Array Mutation
- **Symptom / Issue:** Prevents reactive UI frameworks from detecting updates and causes hard-to-track bugs.
- **Root Cause:** Common mistaken assumptions during early development.
- **Fix / Best Practice:** Embrace immutable updates using spread syntax (`{ ...obj }`, `[...arr]`) or `.map()` and `.filter()`.

### 3. Unhandled Asynchronous Rejections
- **Symptom / Issue:** Uncaught promise failures crash backend processes or leave user interfaces frozen.
- **Root Cause:** Common mistaken assumptions during early development.
- **Fix / Best Practice:** Wrap `await` calls in explicit `try { ... } catch (err) { ... }` blocks.

---

## Summary

You have mastered modern const/let bindings, the 7 primitive types, and eradicated implicit coercion bugs. Next week, we examine control flow branches and modern loop structures.
