# Modern Objects: Destructuring, Spread/Rest & Optional Chaining

> **Kategori:** JavaScript | **Level:** DOM, Events & Object Architecture | **Minggu 5:** Modern Objects: Destructuring, Spread/Rest & Optional Chaining
> ⏱️ **Estimated Time:** 45 Minutes (15m theory, 30m practice) | 🔗 **Pace:** Structured (Step-by-step)


## Learning Objectives

- Master object and array destructuring for concise property extraction with fallback defaults
- Deploy the Object Spread operator (...) for immutable shallow cloning and state composition
- Eliminate catastrophic "Cannot read properties of undefined" crashes using Optional Chaining (?.)
- Differentiate Nullish Coalescing (??) from Logical OR (||) when preserving zero and empty string values
- Internalize the memory architecture of Reference Types versus Primitive Values on the heap

---

## Program: Server Configuration Management with Modern Operators

```javascript
// 1. Objek Konfigurasi Bersarang
const serverConfig = {
  host: "api.nusadigital.com",
  port: 8080,
  keamanan: {
    ssl: true,
    sertifikat: {
      penerbit: "DigiCert Global CA",
      kadaluarsa: "2027-12-31"
    }
  },
  database: {
    driver: "postgres",
    koneksiPool: 20
  }
};

// 2. Destrukturisasi Objek & Nilai Default
const { host, port, protocol = "https" } = serverConfig;
console.log("Server Endpoint :", protocol + "://" + host + ":" + port);

// Destrukturisasi bersarang (Nested Destructuring)
const { keamanan: { sertifikat: { penerbit } } } = serverConfig;
console.log("Penerbit SSL    :", penerbit);

// 3. Object Spread (...): Menggabungkan & Mengkloning Immutably
const konfigurasiTambahan = {
  timeoutMs: 5000,
  modeDebug: false
};

const finalRuntimeConfig = {
  ...serverConfig,
  ...konfigurasiTambahan,
  port: 9000 // Menimpa port lama dengan aman
};
console.log("\nPort Baru Setelah Override :", finalRuntimeConfig.port);
console.log("Timeout Konfigurasi          :", finalRuntimeConfig.timeoutMs, "ms");

// 4. Optional Chaining (?.) & Nullish Coalescing (??)
const userProfile = {
  nama: "Siti Rahma",
  preferensi: {
    tema: "dark"
  }
};

// Aman: Jika objek 'kontak' tidak ada, kembalikan undefined tanpa crash!
const nomorTelepon = userProfile.kontak?.telepon;
console.log("\nNomor Telepon Pengguna :", nomorTelepon);

// Operator Nullish Coalescing (??): Hanya fallback jika null atau undefined
const bahasaPilihan = userProfile.preferensi?.bahasa ?? "Bahasa Indonesia (Default)";
console.log("Bahasa Pengguna        :", bahasaPilihan);
```

---

## Key Concepts

### Optional Chaining (?.) Eliminates Crash Loops
Accessing deeply nested properties via `user.profile.phone` when `profile` is missing throws an unhandled `TypeError: Cannot read properties of undefined`, halting JavaScript execution.
The **Optional Chaining (`?.`)** operator short-circuits evaluation upon encountering `null` or `undefined`, resolving cleanly to `undefined` rather than throwing fatal exceptions.

### Nullish Coalescing (??) vs Logical OR (||)
Logical OR (`||`) coerces all falsy primitives (`0`, `""`, `false`). If an account balance holds 0 credits, `balance || 100` incorrectly overrides 0 with 100!
**Nullish Coalescing (`??`)** restricts fallback defaults strictly to **`null` or `undefined`**, safely preserving intentional zeros and empty strings.

---

---

## Beginner Friendly Explanation

### Analogy: Secure Office Drawers
1. **Destructuring** is pulling your keys and badge out of your bag directly onto your desk without unloading the entire backpack.
2. **The Spread Operator `...`** is a high-speed photocopier: you duplicate an existing document, scribble new margin notes on the copy, and leave the original archive untouched.
3. **Optional Chaining `?.`** is knocking gently before opening a door: if locked or vacant, you politely step back rather than smashing your head into a solid wall.

## Experiments

- Delete the question mark from userProfile.kontak?.telepon to observe the unhandled runtime TypeError crash.
- Compare 0 || 50 (evaluates to 50) with 0 ?? 50 (evaluates to 0) to verify financial accuracy.
- Clone an object via spread, mutate a property on the duplicate, and confirm that the original object remains untouched.
- Execute array rest destructuring: const [first, second, ...rest] = [10, 20, 30, 40] and inspect the rest collection.

---

## Challenge

Build a user normalization engine `normalisasiProfil(input)`: use destructuring with defaults for name, email, and theme. Leverage `?.` and `??` to parse domicile city with a fallback of "Unassigned City", returning an immutable clean object via spread.

---

## Visual Mental Model & Architecture Flow

![Diagram JavaScript Event Loop & Asynchronous Architecture](/diagrams/js-event-loop.svg)

```diagram
┌──────────────┐     Call Stack Empty?      ┌────────────────┐
│  CALL STACK  │ ◄─────────────────────────  │   EVENT LOOP   │
│ (Sync Code)  │                             │  (Coordinator)   │
└──────┬───────┘                             └───────▲────────┘
       │ Async Operation (Fetch / Timer)               │
       ▼                                             │
┌──────────────┐                             ┌───────┴────────┐
│  WEB APIs    │ ─── Callback Ready ────►  │ TASK / PROMISE │
│  (Background)│                             │     QUEUE      │
└──────────────┘                             └────────────────┘
```

---

## Syntax Reference & Practical Guide (W3Schools Style)

Here is the comprehensive breakdown of syntax signatures, parameters, return behavior, and isolated runnable examples introduced in this module:

### 1. `const / let variabel`
- **Core Functionality:** Declaration of variabel modern lingkup blok.
- **Parameters / Attributes:** `Identifier, Initial Value`.
- **System Behavior & Return:** `const` untuk referensi konstan yang tidak diubah; `let` untuk nilai dinamis reassignable..
- **Practical Code Example:**
```javascript
const app = 'Tryngo';
let count = 0;
count += 1;
console.log(app, count);
```
- **Expected Execution Output:**
```output
Tryngo 1
```

### 2. `() => { ... } (Arrow Function)`
- **Core Functionality:** Sintaks fungsi ringkas dengan lexical this.
- **Parameters / Attributes:** `Parameters, Function Body`.
- **System Behavior & Return:** Menyederhanakan penulisan fungsi dan mempertahankan konteks `this` dari lingkup luar..
- **Practical Code Example:**
```javascript
const square = (n) => n * n;
console.log(square(7));
```
- **Expected Execution Output:**
```output
49
```

### 3. `async / await & fetch(url)`
- **Core Functionality:** Penanganan operasi asinkron linear.
- **Parameters / Attributes:** `URL string, RequestInit options`.
- **System Behavior & Return:** Membaca data HTTP API secara asinkron tanpa callback hell..
- **Practical Code Example:**
```javascript
async function loadData() {
  const res = Promise.resolve({ user: 'Alex', status: 'active' });
  return await res;
}
loadData().then(data => console.log(JSON.stringify(data)));
```
- **Expected Execution Output:**
```output
{"user":"Alex","status":"active"}
```

### 4. `Array.prototype.map() / filter()`
- **Core Functionality:** Transformasi array fungsional immutable.
- **Parameters / Attributes:** `callback(item, index)`.
- **System Behavior & Return:** `map` menghasilkan array baru dari hasil transformasi; `filter` menyaring data..
- **Practical Code Example:**
```javascript
const nums = [1, 2, 3, 4];
const evens = nums.filter(n => n % 2 === 0);
console.log(evens);
```
- **Expected Execution Output:**
```output
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

You have mastered object destructuring, spread/rest immutability, and defensive optional chaining. Next week, we examine direct browser DOM manipulation to engineer dynamic UIs.
