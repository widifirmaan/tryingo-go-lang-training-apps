# File System — Node Ledger Book Stored in Files

> **Kategori:** Node.js | **Level:** Beginner | **Minggu 3:** File System

## Learning Objectives

- `fs.writeFileSync("products.json", JSON.stringify(...))` writes, `fs.readFileSync` + `JSON.parse` reads (source: nodejs.org/api/fs)
- `fs.existsSync` checks, `fs.mkdirSync` creates folders, `path.join(__dirname, ...)` safe addresses

---

## Why This Matters (Non-IT)

Stock in a `list` vanishes when the laptop dies. Writing to `products.json` keeps it across restarts — a permanent ledger without a database.

---

## Program: Node File Ledger Book

```javascript
const fs = require("fs");
const path = require("path");

const file = path.join(__dirname, "products.json");

// Write (Sync = waits, good for learning)
const products = [
  { name: "Rice", price: 62000, stock: 10 },
  { name: "Spinach", price: 5000, stock: 20 },
];
fs.writeFileSync(file, JSON.stringify(products, null, 2));
console.log("Write done →", file);

// Read
const data = JSON.parse(fs.readFileSync(file, "utf8"));
console.log("Read:", data.length, "products");

// Add 1 then rewrite
data.push({ name: "Eggs", price: 28000, stock: 15 });
fs.writeFileSync(file, JSON.stringify(data, null, 2));

// Backup folder
if (!fs.existsSync("backup")) fs.mkdirSync("backup");
fs.copyFileSync(file, path.join("backup", "products.json"));
console.log("Backup done");
```

---

## Key Concepts

### `writeFileSync` / `readFileSync` = Blocking Write/Read
`Sync` blocks until done — easy for learning. Async variants later (W4).

### `JSON.stringify` / `JSON.parse` = Wrap/Unwrap
`stringify(obj, null, 2)` → neat text, `parse(text)` → object again.

### `path.join(__dirname, ...)` = Safe Address
`__dirname` this file's folder. `path.join` joins without `/` vs `\` mistakes.

---

## Beginner Friendly Explanation

### Analogy: Paper Ledger Book
- **`writeFileSync` = write book**, **`readFileSync` = read book**, **`JSON` = book language** (curly braces).
- **`backup/` = photocopy**: `copyFileSync` copies.

### Step 0 — Prepare Device
- Same as W1: `shop-node` folder, `node ledger.js`.

### How the Computer Reads It
1. `JSON.stringify(products, null, 2)` → object becomes neat text.
2. `writeFileSync` → writes text to `products.json`.

### 3 Must-Know Terms
1. **fs/path**: file tools/addresses
2. **JSON**: curly-brace data language
3. **Sync**: waits done

---

## Experiments

- **Green:** Open `products.json` in VS Code → neat?
- **Yellow:** Remove `null, 2` → 1 long line? Reattach.
- **Red:** Read a missing file → `ENOENT` error? Wrap with `if (fs.existsSync(file))`.

---

## Challenge

**File Cashier:** `sell.js` reads `products.json` → decrements Rice `stock` 1 → rewrites → prints remainder. Run 3x → stock 10→7?

---

## Mini Glossary

- **write/read/copyFile**: write/read/copy
- **stringify/parse**: wrap/unwrap
- **__dirname**: this folder

---

## Summary

Week 3 of 4: **File Ledger** (Level: Beginner). Data never lost. Next: **Events & Async** — ears & promises.
