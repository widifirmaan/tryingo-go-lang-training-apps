# Event Architecture: Bubbling, Capturing & Event Delegation

> **Kategori:** JavaScript | **Level:** DOM, Events & Object Architecture | **Minggu 7:** Event Architecture: Bubbling, Capturing & Event Delegation
> ⏱️ **Estimated Time:** 45 Minutes (15m theory, 30m practice) | 🔗 **Pace:** Structured (Step-by-step)


## Learning Objectives

- Master the three Event phases: Capturing, Target, and Bubbling
- Architect Event Delegation for maximal heap memory conservation
- Deploy Element.closest() to resolve target nodes accurately
- Halt event propagation using event.stopPropagation()
- Intercept browser defaults with event.preventDefault()

---

## Program: E-Commerce Filter Tag Board via Event Delegation Architecture

```html
<!DOCTYPE html>
<html lang="id">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Event Delegation Lab</title>
  <style>
    body { font-family: system-ui, sans-serif; background: #F8FAFC; padding: 32px; }
    .container { max-width: 600px; margin: 0 auto; background: white; padding: 24px; border-radius: 16px; border: 1px solid #E2E8F0; }
    .tag-cloud { display: flex; flex-wrap: wrap; gap: 8px; margin: 16px 0; }
    .tag-btn { background: #E2E8F0; border: none; padding: 6px 14px; border-radius: 999px; cursor: pointer; font-size: 0.85rem; font-weight: 500; transition: all 0.2s; }
    .tag-btn.active { background: #2E5B44; color: white; }
    .log-panel { background: #0F172A; color: #38BDF8; font-family: monospace; padding: 16px; border-radius: 8px; font-size: 0.8rem; min-height: 100px; }
  </style>
</head>
<body>
  <div class="container">
    <h2>Filter Tag Produk (Event Delegation)</h2>
    <div id="tag-container" class="tag-cloud">
      <button class="tag-btn" data-kategori="backend">Golang</button>
      <button class="tag-btn" data-kategori="backend">Rust</button>
      <button class="tag-btn" data-kategori="frontend">React</button>
      <button class="tag-btn" data-kategori="database">PostgreSQL</button>
    </div>
    <div class="log-panel" id="log-output">Klik salah satu tag di atas...</div>
  </div>

  <script>
    const tagContainer = document.getElementById("tag-container");
    const logOutput = document.getElementById("log-output");

    tagContainer.addEventListener("click", (event) => {
      const targetTombol = event.target.closest(".tag-btn");
      if (!targetTombol) return;

      targetTombol.classList.toggle("active");
      logOutput.textContent = "Tag: " + targetTombol.textContent + " | Status: " + (targetTombol.classList.contains("active") ? "AKTIF" : "NONAKTIF");
    });
  </script>
</body>
</html>
```

---

## Key Concepts

### Event Bubbling & Delegation
Click events bubble upward from child targets through ancestral layers. Event Delegation binds a solitary listener on the parent container, conserving heap allocations while supporting dynamic children seamlessly.

---

---

## Beginner Friendly Explanation

### Analogy: Hotel Front Desk Switchboard
Event Delegation is a central hotel switchboard: regardless of which guest rings, the alert registers at the master reception desk.

## Experiments

- Click tags to observe dynamic log changes.
- Click the empty space between tags to verify safe null checks.
- Inject a new button and confirm it works immediately via delegation.
- Test event.stopPropagation() to halt event bubbling.

---

## Challenge

Build an e-commerce table where delete buttons on all rows are managed via a single listener on `<tbody>`.

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

You have mastered browser event architectures and event delegation. Next week, we examine Object-Oriented Programming with ES6 classes.
