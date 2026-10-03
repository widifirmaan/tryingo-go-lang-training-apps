# Modern Arrays: Functional Pipelines with Map, Filter & Reduce

> **Kategori:** JavaScript | **Level:** Logic Fundamentals & Data Structures | **Minggu 4:** Modern Arrays: Functional Pipelines with Map, Filter & Reduce
> ⏱️ **Estimated Time:** 45 Minutes (15m theory, 30m practice) | 🔗 **Pace:** Structured (Step-by-step)


## Learning Objectives

- Embrace functional array processing tenets: immutability without mutating original source data
- Deploy Array.prototype.map() to project elements into transformed data schemas
- Deploy Array.prototype.filter() to extract items fulfilling Boolean criteria
- Master Array.prototype.reduce() to aggregate collections into scalar values, maps, or objects
- Leverage Array.prototype.find(), some(), and every() for rapid querying and boolean assertions

---

## Program: E-Commerce Sales Data Processing Pipeline

```javascript
// Kumpulan Data Produk E-Commerce
const katalog = [
  { id: 101, nama: "Mechanical Keyboard", kategori: "Aksesoris", harga: 850000, stok: 12 },
  { id: 102, nama: "Monitor UltraWide 34\"", kategori: "Display", harga: 6500000, stok: 4 },
  { id: 103, nama: "Mouse Wireless Ergonomis", kategori: "Aksesoris", harga: 450000, stok: 0 },
  { id: 104, nama: "Standing Desk Elektrik", kategori: "Furnitur", harga: 4200000, stok: 6 },
  { id: 105, nama: "USB-C Multiport Dock", kategori: "Aksesoris", harga: 750000, stok: 18 }
];

console.log("=== Pipeline Pengolahan Data Fungsional ===");

// 1. FILTER: Ambil hanya produk aksesoris yang tersedia stoknya
const aksesorisTersedia = katalog.filter((item) => {
  return item.kategori === "Aksesoris" && item.stok > 0;
});
console.log("Aksesoris Siap Kirim (Total:", aksesorisTersedia.length, "item)");

// 2. MAP: Transformasi data menjadi format ringkas untuk tampilan katalog
const kartuKatalog = aksesorisTersedia.map((item) => {
  return {
    namaProduk: item.nama,
    hargaFormat: "Rp " + item.harga.toLocaleString("id-ID"),
    statusGudang: item.stok > 10 ? "Stok Melimpah" : "Stok Terbatas"
  };
});
console.log("Format Tampilan:", kartuKatalog);

// 3. REDUCE: Hitung total nilai inventaris seluruh barang di gudang
// rumus: akumulator + (harga * stok)
const totalNilaiAsetGudang = katalog.reduce((total, item) => {
  return total + (item.harga * item.stok);
}, 0); // 0 adalah nilai awal akumulator

console.log("\nTotal Nilai Aset Gudang : Rp " + totalNilaiAsetGudang.toLocaleString("id-ID"));

// 4. FIND & SOME: Pencarian Cepat
const produkMahal = katalog.find((item) => item.harga > 5000000);
console.log("Item Premium Ditemukan  :", produkMahal ? produkMahal.nama : "Tidak ada");

const adaStokHabis = katalog.some((item) => item.stok === 0);
console.log("Apakah ada barang kosong?:", adaStokHabis ? "Ya, segera re-order!" : "Semua aman");
```

---

## Key Concepts

### Immutability in Modern Arrays
Mutating methods like \`splice()\` alter underlying data structures. Functional array methods (\`map\`, \`filter\`, \`slice\`) **produce new immutable collections**, leaving source datasets untouched. This is the structural foundation of reactive frontend architectures.

### The Big Three: Map, Filter, Reduce
1. **\`filter(predicate)\`**: Evaluates each element against a boolean condition, collecting matches into a new array.
2. **\`map(transform)\`**: Projects every element through a transformation function, preserving identical array length.
3. **\`reduce(accumulator, current, initialValue)\`**: Collapses an entire dataset into a single accumulator target (scalar sum, hashmap, grouped object).

### Querying: find vs filter
- \`filter()\` always returns an array collection (empty or populated).
- \`find()\` short-circuits upon the first match, returning the item reference directly (or \`undefined\`).

---

---

## Beginner Friendly Explanation

### Analogy: A Gourmet Coffee Roastery
1. **`filter`** is the mechanical sorter: only whole specialty beans pass the sieve; broken pebbles are filtered out.
2. **`map`** is the roasting and packaging assembly line: every raw bean is roasted and sealed into branded foil pouches.
3. **`reduce`** is the terminal shipping scale: all outgoing crates are aggregated into a single gross shipment tonnage weight.

## Experiments

- Omit the initialValue argument 0 in reduce to observe how empty array handling breaks.
- Construct a method chain: katalog.filter(...).map(...) to experience declarative stream processing.
- Update the category predicate to "Furnitur" and verify filtered outputs.
- Assert katalog.every(item => item.harga > 100000) to confirm collective validation.

---

## Challenge

Build an analytics data pipeline: compute total revenue strictly from "PAID" transactions, returning a summary object `{ totalOmset: ..., jumlahTransaksi: ..., rataRata: ... }` leveraging functional array methods.

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

You have mastered computational logic, data types, closures, and functional array pipelines. Next week we enter Level 2: direct browser DOM manipulation and interactive event architectures.
