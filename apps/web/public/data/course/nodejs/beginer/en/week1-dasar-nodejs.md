# Node.js Basics — Shop Kitchen in Terminal

> **Kategori:** Node.js | **Level:** Beginner | **Minggu 1:** Dasar Node.js
> **Prerequisites:** None — start from zero.

## Learning Objectives

- Understand Node.js = **kitchen running in the terminal** (not the browser) — `node -v`, `npm -v`
- Create `package.json` via `npm init -y`, `app.js` with `console.log` and `process.argv`
- Run `node app.js` and `node app.js Budi 2` reading arguments
- `global`, `process`, `__dirname` — kitchen info

---

## Why This Matters (Non-IT)

Shops need a kitchen that computes without opening a browser. Node = JS in the terminal, for counting stock, printing cashier receipts, later becoming a server.

---

## Program: First Node Kitchen

Save `app.js`

```javascript
// app.js — runs in terminal, not browser
console.log("Node.js Shop Kitchen");
console.log("Node version:", process.version);
console.log("Folder:", __dirname);

// Read arguments: node app.js Budi 2
const name = process.argv[2] || "Guest";
const qty = Number(process.argv[3] || 1);
console.log(`Hello ${name}, qty: ${qty}`);

// Compute
const price = 62000;
console.log(`Total: Rp ${(price * qty).toLocaleString("en-US")}`);

// No DOM: document is not defined in Node — normal
// console.log(typeof document); // ReferenceError
```

**Run:**
```
node app.js
node app.js Budi 2
node --version
npm --version
```

Create `package.json`: `npm init -y` → see `name`, `version`, `scripts`.

---

## Key Concepts

### Node vs Browser
- Browsers have `document`, `window`. Node has `process`, `fs`, `http`.
- `process.argv` = order queue from terminal.

### `npm init`
Creates `package.json` — project ID card.

---

## Beginner Friendly Explanation

### Analogy: Terminal Kitchen
- **Browser = dining room**, **Node = back kitchen** — no tables, only stoves & math.

### Step 0 — Prepare Device
- Node.js LTS installed (`node -v`), folder `shop-node`, run `node app.js`.

### How the Computer Reads It
1. `node app.js Budi 2` → `argv[2]="Budi"`, `argv[3]="2"`.
2. `console.log` → prints to terminal (not a page).

### 3 Must-Know Terms
1. **Node/npm/argv**: kitchen/warehouse/orders

---

## Experiments

- **Green:** `node app.js Siti 3` → greeting + total?
- **Yellow:** No args → defaults Guest/1?
- **Red:** Use `document` in Node → ReferenceError? That's normal — browsers only.

---

## Challenge

**Terminal Cashier:** `node cashier.js Siti 3` → reads `name` and `qty` from `argv`, computes `total = 62000*qty`, prints `Hello Siti, total Rp ...`.

---

## Mini Glossary

- **node/npm/argv**: kitchen/warehouse/orders

---

## Summary

Week 1: **Node Kitchen** — JS in terminal. Next: **Modules & npm** — borrow tools.
