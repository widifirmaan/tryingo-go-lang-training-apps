# Modules — Split Shop into Separate Files

> **Kategori:** JavaScript | **Level:** Intermediate | **Minggu 9:** Modules

## Learning Objectives

- `export` / `import` — split `shop.js` into `products.js` + `cashier.js` so it's not 1 file of 500 lines
- `import { calc } from "./cashier.js"` and `import * as Shop from "./shop.js"`
- `type="module"` on `<script>`

---

## Why This Matters (Non-IT)

Shop with 50 functions in 1 file → finding `calcTotal` takes 10 minutes of scrolling. Split into `products.js` (racks), `cashier.js` (calc) → neat.

---

## Program: Split Shop Files

```javascript
// cashier.js — calc tools
export function calcTotal(cart, discount=0){
  const total = cart.reduce((s,i)=>s+i.price*i.qty,0);
  return total * (1 - discount/100);
}
export const shipping = (weight,dist) => weight*5000 + dist*2000;

// products.js — list
export const list = [
  { name: "Rice", price: 62000 },
  { name: "Spinach", price: 5000 }
];

// app.js — assemble
import { calcTotal, shipping } from "./cashier.js";
import { list } from "./products.js";

console.log("List:", list);
console.log("Total:", calcTotal([{price:62000,qty:1}], 10));
console.log("Shipping:", shipping(2,5));
```

**HTML:** `<script type="module" src="app.js"></script>` — `type="module"` mandatory.

**Node:** `import` needs `"type": "module"` in `package.json` or use `require` (CommonJS).

---

## Key Concepts

### `export` / `import` = Share & Borrow
`export function calc` → `import { calc } from "./cashier.js"` — like borrowing tools from another drawer.

### `default` vs `named`
- `export default calc` → `import calc from "./cashier.js"` (1 per file)
- `export function calc` → `import { calc }` (many)

---

## Beginner Friendly Explanation

### Analogy: Split Ledger Books
- **1 file 500 lines = thick book** → hard to search.
- **Split into 3 thin books** = `products.js`, `cashier.js`, `app.js` → fast search.

### Step 0 — Prepare Device
- Create 3 files in one folder + `index.html` with `type="module"`, serve via `npx serve` (modules need http).

### How the Computer Reads It
1. `app.js` imports → browser fetches `cashier.js` + `products.js`.
2. Missing file → `Failed to fetch` error in console.

### 3 Must-Know Terms
1. **export/import/module**: share/borrow/books

---

## Experiments

- **Green:** Rename export → import breaks? Fix names.
- **Yellow:** Remove `type="module"` → imports fail? Restore.
- **Red:** `import` without `./` → treated as package? Add `./`.

---

## Challenge

**Module Shop:** `products.js` exports `list`, `cashier.js` exports `calcTotal` + `shipping`, `app.js` imports both, computes full receipt + `console.log`.

---

## Mini Glossary

- **export/import**: share/borrow

---

## Summary

Week 9: **Split Files** — `export/import` for neatness. Next: **Error Handling**.
