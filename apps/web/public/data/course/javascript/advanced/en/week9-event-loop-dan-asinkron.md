# Asynchronous Architecture: The V8 Event Loop, Stack & Queues

> **Kategori:** JavaScript | **Level:** Asynchronous, Storage & Kanban Project | **Minggu 9:** Asynchronous Architecture: The V8 Event Loop, Stack & Queues
> ⏱️ **Estimated Time:** 45 Minutes (15m theory, 30m practice) | 🔗 **Pace:** Structured (Step-by-step)


## Learning Objectives

- Understand JavaScript as a single-threaded non-blocking runtime
- Deconstruct the Event Loop: Call Stack, Microtasks, and Macrotasks
- Understand Promise microtask precedence over setTimeout macrotasks
- Prevent browser UI thread freezes with asynchronous offloading
- Leverage queueMicrotask() for explicit priority task scheduling

---

## Program: V8 Event Loop Queue Simulation (Microtasks vs Macrotasks)

```javascript
console.log("1. [Synchronous] Kode sinkron Call Stack dimulai.");

setTimeout(() => {
  console.log("4. [Macrotask - setTimeout] Berjalan di antrean macrotask.");
}, 0);

Promise.resolve().then(() => {
  console.log("3. [Microtask - Promise] Diproses sebelum Macrotask!");
});

console.log("2. [Synchronous] Kode sinkron Call Stack selesai.");
```

---

## Key Concepts

### The V8 Event Loop
JavaScript evaluates synchronous code on the Call Stack. When asynchronous tasks settle:
- **Promise** callbacks queue into the **Microtask Queue** (high priority).
- **setTimeout** callbacks queue into the **Macrotask Queue** (standard priority).
All microtasks drain to exhaustion before the next macrotask is processed.

---

---

## Beginner Friendly Explanation

### Analogy: Emergency Room Triage
The Call Stack is the physician in the examination room. Microtasks are arriving trauma cases treated immediately. Macrotasks (setTimeout) are standard clinic ticket holders waiting their turn.

## Experiments

- Run the snippet to confirm the execution sequence: 1 -> 2 -> 3 -> 4.
- Increase setTimeout delay from 0 to 500ms.
- Test queueMicrotask() to observe execution order.
- Compare synchronous versus asynchronous execution times.

---

## Challenge

Author a Promise-based `delay(ms)` helper that resolves after `ms` milliseconds via setTimeout.

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

You have mastered the V8 Event Loop. Next week, we consume live HTTP network APIs via Promises, async/await, and the Fetch API.
