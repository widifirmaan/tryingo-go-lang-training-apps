# Async JavaScript — Delivery Orders Without Waiting at the Shop

> **Kategori:** JavaScript | **Level:** Intermediate | **Minggu 7:** Async JavaScript

## Learning Objectives

- Understand `callback` → `Promise` (promise) → `async/await` (wait for promise) — like ordering a ride
- `fetch` shop data without freezing, `then/catch` and `try/catch` for `await`
- `Promise.all` order from 3 shops at once

---

## Why This Matters (Non-IT)

Shops fetch prices from suppliers via `fetch`. Without async, the screen freezes 3 seconds. With `async`, write `await fetch(...)` like ordering a ride: order, wait, continue.

---

## Program: Fetch Supplier Prices

```javascript
// Simulated fetch without internet (using Promise)
function getPrice(name) {
  return new Promise((resolve) => {
    setTimeout(() => resolve({ name, price: name === "Rice" ? 62000 : 5000 }), 800);
  });
}

// Old way: callback hell
// getPrice("Rice", (data) => { console.log(data); });

// Modern way: async/await — like waiting for a ride
async function shop() {
  console.log("Ordering Rice...");
  try {
    const rice = await getPrice("Rice"); // wait 0.8s, no freeze
    console.log("Got:", rice);

    const spinach = await getPrice("Spinach");
    console.log("Got:", spinach);

    // 2 orders at once (faster)
    const [a, b] = await Promise.all([getPrice("Rice"), getPrice("Spinach")]);
    console.log("Together:", a, b);
  } catch (err) {
    console.log("Failed:", err);
  }
}

shop();
console.log("→ This line runs first (doesn't wait for shop)");

// Real fetch (with internet):
// async function fetchAPI() {
//   const res = await fetch("https://api.shop.com/products");
//   const data = await res.json();
//   console.log(data);
// }
```

---

## Key Concepts

### `Promise` = Ride Promise
`new Promise((resolve) => setTimeout(() => resolve(data), 800))` — promise "I'll deliver in 800ms".

### `async/await` = Wait for Promise
`async function shop(){ const data = await getPrice() }` — write like sync, but no freeze.

### `try/catch` for `await`
Failed `await` → `catch`.

### `Promise.all` = Order 3 Rides at Once
`await Promise.all([get("Rice"), get("Spinach")])` → 0.8s for 2, not 1.6s.

---

## Beginner Friendly Explanation

### Analogy: Ride-Hailing

- **`fetch` = order a ride**: you order, the driver rides 0.8s, you wait with `await`.
- **`Promise.all` = order 2 rides together**: 2 drivers ride simultaneously, arrive almost together.

### Step 0 — Prepare Device
- Node.js or browser console, paste program, watch order of logs.

### How the Computer Reads It
1. `await getPrice("Rice")` → pauses function 0.8s, other code keeps running.
2. `Promise.all([...])` → starts both, waits for both.

### 3 Must-Know Terms
1. **Promise/async/await**: promise & wait
2. **fetch**: grab data
3. **Promise.all**: together

---

## Experiments

- **Green:** `await getPrice("Rice")` → what `price`?
- **Yellow:** `Promise.all` 3 fetches → still 0.8s total?
- **Red:** Forget `await` → `rice` becomes `Promise { <pending> }`, not data.

---

## Challenge

**Async Shop:** `getStock(name)` Promise 500ms returns stock, `async shop()` `await` 3 products via `Promise.all`, compute total `price*stock`, `try/catch` if `name` missing.

---

## Mini Glossary

- **Promise/async/await**: promise & wait
- **fetch**: fetch data
- **Promise.all**: together

---

## Summary

Week 7: **Async** — order without freezing. Next: **ES6+** — short spread & destructuring.
