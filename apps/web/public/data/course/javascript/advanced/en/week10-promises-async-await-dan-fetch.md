# Promises, Async/Await & HTTP REST API Consumption via Fetch

> **Kategori:** JavaScript | **Level:** Asynchronous, Storage & Kanban Project | **Minggu 10:** Promises, Async/Await & HTTP REST API Consumption via Fetch
> ⏱️ **Estimated Time:** 45 Minutes (15m theory, 30m practice) | 🔗 **Pace:** Structured (Step-by-step)


## Learning Objectives

- Master the three Promise states: Pending, Fulfilled, and Rejected
- Deploy async/await for clear and maintainable asynchronous code
- Understand that fetch() does not reject on HTTP 404/500 errors
- Always validate response.ok before parsing JSON data
- Deploy try-catch-finally for robust network resilience

---

## Program: Resilient GitHub Public API Client with Comprehensive Error Handling

```javascript
async function ambilProfilGithub(username) {
  const url = "https://api.github.com/users/" + encodeURIComponent(username);

  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error("HTTP Gagal dengan status: " + response.status);
    }
    const data = await response.json();
    console.log("Nama Pengguna:", data.name || data.login);
    console.log("Repositori   :", data.public_repos, "repositori");
    return data;
  } catch (error) {
    console.error("[ERROR]", error.message);
    return null;
  } finally {
    console.log("[SELESAI] Request jaringan ditutup.");
  }
}

ambilProfilGithub("torvalds");
```

---

## Key Concepts

### Async/Await & Fetch API
The `async` keyword ensures a function returns a Promise, while `await` pauses execution non-blockingly until resolution.
Remember: `fetch()` only rejects on total network failure, not on HTTP 404 or 500 responses. Always verify `response.ok`!

---

---

## Beginner Friendly Explanation

### Analogy: The Coffee Pager Disc
A Promise is the wireless buzzer handed to you at a cafe: while waiting it is **Pending**, when ready it buzzes (**Fulfilled**), and if out of stock it is cancelled (**Rejected**).

## Experiments

- Query a nonexistent username to inspect the 404 error message.
- Use Promise.all to fetch two profiles in parallel.
- Disconnect network to observe TypeError in the catch block.
- Confirm that the finally block runs in all scenarios.

---

## Challenge

Build a `cariRepo(keyword)` function that retrieves top repositories from GitHub API and returns the top 3 projects.

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
```text
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
```text
49
```

### 3. `async / await & fetch(url)`
- **Core Functionality:** Penanganan operasi asinkron linear.
- **Parameters / Attributes:** `URL string, RequestInit options`.
- **System Behavior & Return:** Membaca data HTTP API secara asinkron tanpa callback hell..
- **Practical Code Example:**
```javascript
async function loadData() {
  const res = await fetch('https://api.example.com/data');
  return await res.json();
}
```
- **Expected Execution Output:**
```text
Mengembalikan data JSON dari server
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

You have mastered network API consumption with async/await and Fetch API. Next week, we examine browser local data storage.
