# Control Flow: Logic Branching, Ternary & for...of Loops

> **Kategori:** JavaScript | **Level:** Logic Fundamentals & Data Structures | **Minggu 2:** Control Flow: Logic Branching, Ternary & for...of Loops
> ⏱️ **Estimated Time:** 45 Minutes (15m theory, 30m practice) | 🔗 **Pace:** Structured (Step-by-step)


## Learning Objectives

- Master if, else if, and else branching governed by Boolean logic operators (&&, ||, !)
- Deploy the ternary operator (? :) cleanly for concise conditional variable bindings
- Author modern for...of loops to iterate across iterable arrays with clean readability
- Structure switch-case statements with grouped conditions and mandatory default fallbacks
- Deconstruct Truthy and Falsy evaluations in JavaScript conditional contexts

---

## Program: Transaction Filtering System & Role-Based Access Verifier

```javascript
// 1. Array Data Transaksi Sederhana
const transaksi = [
  { id: "TRX-01", nominal: 450000, status: "SUCCESS" },
  { id: "TRX-02", nominal: 1200000, status: "PENDING" },
  { id: "TRX-03", nominal: 850000, status: "SUCCESS" },
  { id: "TRX-04", nominal: 2500000, status: "FAILED" },
  { id: "TRX-05", nominal: 300000, status: "SUCCESS" }
];

console.log("=== Laporan Audit Transaksi ===");

let totalPendapatan = 0;
let jumlahSukses = 0;

// 2. Perulangan Modern for...of (Bersih & Mudah Dibaca)
for (const item of transaksi) {
  // 3. Percabangan dengan Operator Logika Bersarang
  if (item.status === "SUCCESS") {
    totalPendapatan += item.nominal;
    jumlahSukses++;
    console.log("[LUNAS]  " + item.id + " : Rp " + item.nominal.toLocaleString("id-ID"));
  } else if (item.status === "PENDING") {
    console.log("[MENUNGGU] " + item.id + " : Menunggu konfirmasi gateway");
  } else {
    console.log("[GAGAL]  " + item.id + " : Transaksi ditolak bank");
  }
}

// 4. Operator Ternary Modern untuk Keputusan Cepat
const statusSistem = jumlahSukses >= 3 ? "Kondisi Sehat" : "Peringatan Anomali";
console.log("\nStatus Operasional Gateway:", statusSistem);
console.log("Total Kas Masuk           : Rp " + totalPendapatan.toLocaleString("id-ID"));

// 5. Evaluasi Hak Akses dengan Switch Case
const peranPengguna = "ADMIN";

switch (peranPengguna) {
  case "SUPERADMIN":
  case "ADMIN":
    console.log("Otorisasi: Akses penuh untuk merevisi dan menghapus transaksi.");
    break;
  case "AUDITOR":
    console.log("Otorisasi: Hak akses baca (read-only) untuk laporan keuangan.");
    break;
  default:
    console.log("Otorisasi: Akses ditolak. Silakan hubungi tim IT Security.");
    break;
}
```

---

## Key Concepts

### The Eight Falsy Primitives
When parsing \`if (condition)\`, JavaScript coerces expressions into booleans. Exactly **eight values evaluate as Falsy**:
1. \`false\`
2. \`0\` and \`-0\`
3. \`0n\` (BigInt zero)
4. \`""\` (empty string)
5. \`null\`
6. \`undefined\`
7. \`NaN\`
8. \`document.all\`
Every other value in existence—including empty arrays \`[]\` and empty objects \`{}\`—evaluates as **Truthy**!

### Ternary Expressions: Concise & Functional
Rather than imperatively assigning variables via mutable let statements:
\`\`\`javascript
const status = score >= 75 ? "Passed" : "Retake";
\`\`\`
Ternaries are expressions that return values, enabling direct \`const\` assignments.

### Why for...of Trumps Legacy Index Loops
Legacy \`for (let i = 0; i < arr.length; i++)\` loops invite off-by-one index arithmetic bugs. The modern \`for (const item of collection)\` syntax delivers immediate element binding with optimal cognitive clarity.

---

---

## Beginner Friendly Explanation

### Analogy: Automated Highway Toll Gates
1. **`if/else`** is an automated toll barrier: the RFID scanner reads your vehicle transponder. IF balance suffices, the gate lifts green. ELSE, an alert chime sounds and you divert to customer service.
2. **`for...of`** is the queue of cars passing the gate: each vehicle is processed sequentially one after another until the line clears.
3. **The Ternary Operator** is a single dashboard warning bulb: either the parking brake is engaged or disengaged.

## Experiments

- Test truthiness: run if ([]) and confirm that empty arrays evaluate as true.
- Intentionally omit a break keyword inside the switch block to witness accidental fall-through execution into adjacent cases.
- Rewrite the for...of block as a legacy index-based for loop and compare code readability.
- Flip all transaction states to FAILED to verify that the ternary flips to the anomaly alert string.

---

## Challenge

Build a student graduation grader: create an array of 5 student objects (name, math score, coding score). Use a `for...of` loop and a ternary to verify passing status (both scores $\ge 70$), compute class averages, and print honors recipients.

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

You have mastered logical branching, Truthy/Falsy evaluation, ternary expressions, and for...of iteration. Next week, we examine modern functions, arrow syntax, scope, and closures.
