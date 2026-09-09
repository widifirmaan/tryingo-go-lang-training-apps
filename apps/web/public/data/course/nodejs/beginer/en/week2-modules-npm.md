# Modules & npm — Borrow Node Kitchen Tools

> **Kategori:** Node.js | **Level:** Beginner | **Minggu 2:** Modules & npm
> **Prerequisites:** Week 1 — **Node.js Basics**.

## Learning Objectives

- `require("./cashier.js")` borrows neighbor tools, `module.exports = {...}` shares tools (source: nodejs.org/api/modules)
- `npm install <package>` borrows from the npm warehouse, `package.json` records, `node_modules` physical warehouse (source: docs.npmjs.com)
- Distinguish `require` (CommonJS) vs `import` (ESM) + `"type": "module"`

---

## Why This Matters (Non-IT)

Without modules, `app.js` 500 lines mixing calc + print + save — finding `calcTotal` takes 10 minutes of scrolling. Splitting `cashier.js` (calc) + `print.js` (display) stays neat. Without `npm`, hand-write date, color functions — wasted time, when 3 million packages are free.

---

## Program: Kitchen Task Split + Warehouse Borrow

```bash
npm init -y
npm install chalk
```

```javascript
// cashier.js — calc tool (shared via exports)
function calcTotal(cart, discount = 0) {
  const total = cart.reduce((s, i) => s + i.price * i.qty, 0);
  return total * (1 - discount / 100);
}
module.exports = { calcTotal }; // CommonJS

// app.js — borrow + use
const { calcTotal } = require("./cashier.js");
const cart = [{ price: 62000, qty: 1 }, { price: 5000, qty: 2 }];
console.log("Total:", calcTotal(cart, 10));

// Warehouse package: chalk for colors (npm install chalk)
const chalk = require("chalk");
console.log(chalk.green("Shop open!"));
console.log(chalk.red("Stock empty!"));
```

**Modern ESM (optional):** add `"type": "module"` in `package.json` → use `import { calcTotal } from "./cashier.js"` + `export function calcTotal`.

---

## Key Concepts

### `require` / `module.exports` (CommonJS)
- `module.exports = { calcTotal }` shares, `require("./cashier.js")` borrows. `./` path = own files.

### `npm install` / `package.json`
- `npm install chalk` → downloads to `node_modules` + records in `package.json` dependencies.
- `npm init -y` creates the project ID card.

### CommonJS vs ESM
- `require` = old but Node default. `import` = modern, needs `"type": "module"`.

---

## Beginner Friendly Explanation

### Analogy: Kitchen Task Split + Warehouse
- **Module = split kitchen**: `cashier.js` only calcs, `app.js` organizes.
- **npm = tool warehouse**: `chalk` color screwdriver, don't build your own.

### Step 0 — Prepare Device
- Same as W1: `node -v`, `shop-node` folder, `npm init -y`.

### How the Computer Reads It
1. `require("./cashier.js")` → reads file → runs → takes `module.exports`.
2. `require("chalk")` → looks in `node_modules/chalk`.

### 3 Must-Know Terms
1. **Module/exports**: split/borrow tools
2. **npm/package.json**: warehouse/ID
3. **CommonJS/ESM**: old/modern

---

## Experiments

- **Green:** Build `greet.js` exporting `greet(name)` → `require` in `app.js`?
- **Yellow:** `npm install lodash` → `_.chunk([1,2,3,4], 2)` → what?
- **Red:** `require("./cashier")` without `.js` → still runs? (Node guesses `.js`)

---

## Challenge

**3-File Kitchen:** `products.js` exports `list`, `cashier.js` exports `calcTotal` + `shipping`, `app.js` imports both → complete receipt + `chalk`-colored total.
- **Link-up (Week 1 — Node.js Basics):** plug this challenge's result into that flow; make sure it runs end-to-end.

---
## Mini Glossary

- **require/exports**: borrow/share
- **npm/node_modules**: warehouse/physical
- **package.json**: project ID

---

## Summary

Week 2 of 4: **Borrow Tools** (Level: Beginner). Can split files + npm warehouse. Next: **File System** — file ledger.
