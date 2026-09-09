# Events & Async — Node Shop Ears and Promises

> **Kategori:** Node.js | **Level:** Beginner | **Minggu 4:** Events & Async Programming
> **Prerequisites:** Week 3 — **File System**.

## Learning Objectives

- `EventEmitter`: `on` attaches ears, `emit` rings, `once` once (source: nodejs.org/api/events)
- `Promise` promises + `async/await` waits — ride orders without freezing
- `callback(err, result)` error-first rule (Node convention)

---

## Why This Matters (Non-IT)

Shops: empty stock → notify 3 cashiers at once (`emit`). 2-second supplier price fetch → screen freezes without async; with `await`, write sync-style without jamming.

---

## Program: Shop Ears & Promises

```javascript
const EventEmitter = require("events");

// 1. Ears: empty stock notifies all
class Shop extends EventEmitter {}
const shop = new Shop();

shop.on("empty", (name) => console.log(`Cashier 1: ${name} empty!`));
shop.on("empty", (name) => console.log(`Cashier 2: order ${name} from supplier!`));
shop.emit("empty", "Rice"); // ring → 2 cashiers hear

shop.once("open", () => console.log("Opens just once"));
shop.emit("open");
shop.emit("open"); // silent again

// 2. Promises: fetch prices without freezing
function getPrice(name) {
  return new Promise((resolve) => {
    setTimeout(() => resolve(name === "Rice" ? 62000 : 5000), 500);
  });
}

async function buy() {
  console.log("Ordering Rice...");
  const price = await getPrice("Rice"); // wait 0.5s
  console.log("Got price:", price);
  const [a, b] = await Promise.all([getPrice("Rice"), getPrice("Spinach")]);
  console.log("Together:", a, b);
}
buy();
console.log("→ This line runs first (doesn't wait)");
```

---

## Key Concepts

### `on` / `emit` / `once` = Ears/Ring/Once
`on("empty", fn)` attaches, `emit("empty", "Rice")` rings all, `once` only first.

### `Promise` + `async/await` = Promise + Wait
`new Promise((resolve) => ...)` promises, `await` waits without freezing, `Promise.all` together.

### Error-First Callback = Node Rule
`fs.readFile(f, (err, data) => ...)` — `err` first, then result.

---

## Beginner Friendly Explanation

### Analogy: Shop Bell & Ride
- **EventEmitter = bell**: press `emit` → all `on` listeners hear.
- **Promise = ride promise**: `await` waits for the ride.

### Step 0 — Prepare Device
- Same as W1: `node ears.js`.

### How the Computer Reads It
1. `emit("empty", "Rice")` → calls all `on("empty")` functions in order.
2. `await getPrice()` → pauses function, other work runs → resumes on `resolve`.

### 3 Must-Know Terms
1. **on/emit**: hear/ring
2. **Promise/await**: promise/wait
3. **Error-first callback**: Node rule

---

## Experiments

- **Green:** `emit("empty", "Sugar")` → 2 cashiers ring?
- **Yellow:** Forget `await` → `price` becomes `Promise {<pending>}`?
- **Red:** `once` then `emit` 2x → only 1 log?

---

## Challenge

**Complete Event Shop:** `Shop` emitter + `on("sell")` decrements stock + `Promise` `getDiscount()` 300ms → `async sell()` `await`s discount → prints total. **Beginner Node DONE!**

---

### Bonus: Debug Node (no guessing!)

`console.log` everywhere = slow. Pro way: `node --inspect sell.js` → open `chrome://inspect` in Chrome → click **inspect** → Sources → click a line number (blue breakpoint!) → code PAUSES → peek whether `await` resolved. Mysterious async instantly visible!
- **Link-up (Week 3 — File System):** plug this challenge's result into that flow; make sure it runs end-to-end.

---
## Mini Glossary

- **Emitter/on/emit**: bell/hear/ring
- **Promise/async/await**: promise/wait
- **Error-first**: err first

---

## Summary

Week 4 of 4: **Ears & Promises** (Level: Beginner). **Beginner Node DONE!** Next: **Express** (Intermediate).
