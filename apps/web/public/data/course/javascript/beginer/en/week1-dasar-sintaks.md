# JavaScript Basics — First Shop Calculator

> **Kategori:** JavaScript | **Level:** Beginner | **Minggu 1:** Dasar Sintaks JavaScript

## Learning Objectives

- Understand JavaScript like a shop calculator: store, calculate, show
- Store with `let` (changeable) and `const` (fixed)
- 5 basic types: text (`string`), number (`number`), yes/no (`boolean`), empty (`null`/`undefined`)
- Calculate with `+ - * / %` and join text with `` `Hello ${name}` ``
- Check type with `typeof` and show with `console.log`

---

## Why This Matters (Non-IT)

Shop, teacher, admin — all calculate. JavaScript is a **browser calculator** that can store and auto-calculate. Today you build a shop receipt, not abstract Hello World.

---

## Program: Shop Receipt

Copy to playground or VS Code → `node receipt.js`

```javascript
const shopName = "Siti's Shop";
let customer = "Budi";

const riceKg = 2;
const pricePerKg = 12500;
const eggsKg = 1;
const eggPrice = 28000;

let total = riceKg * pricePerKg + eggsKg * eggPrice;
console.log("Shop:", shopName);
console.log("Customer:", customer);
console.log("Total: Rp", total.toLocaleString("en-US"));

console.log("\n=== Check Type ===");
console.log("shopName:", typeof shopName);
console.log("riceKg:", typeof riceKg);
console.log("total:", typeof total);

const receipt = `Hello ${customer}, your total is Rp ${total.toLocaleString("en-US")}. Thanks!`;
console.log("\n" + receipt);

customer = "Siti";
total = total + 5000;
console.log("\nAfter switch & add delivery:");
console.log(`Customer: ${customer}, New total: Rp ${total.toLocaleString("en-US")}`);

let note = null;
let notYet;
console.log("\nnote:", note, "| notYet:", notYet);
console.log("typeof null:", typeof null);
```

---

## Key Concepts

### `const` vs `let` — Locked Box vs Open Box
- `const shopName` → locked, cannot reassign.
- `let customer` → open, can `customer = "Siti"`.
- Avoid `var`.

### 5 Basic Types
`string` `"Budi"`, `number` `25`, `boolean` `true/false`, `null` intentionally empty, `undefined` not yet filled.

### Arithmetic `+ - * / % **`
`%` remainder (10%3=1), `**` power (2**3=8).

### Template Literal `` ` ``
Backtick: `` `Hello ${name}, age ${age}` `` cleaner than `"Hello " + name`.

### `typeof` & `console.log`
`typeof x` checks type, `console.log()` shows output.

---

## Beginner Friendly Explanation

### Analogy: Shop Ledger

- **`let`/`const` = ledger lines**: `const pricePerKg` permanent price, `let total` changes per transaction.
- **Types = ink types**: `string` letter ink, `number` number ink.
- **Template literal = auto stamp**: `` `Total ${total}` `` auto fills number.

### How to Run on Laptop

1. Install Node.js LTS from `nodejs.org`
2. VS Code → `receipt.js`
3. Terminal → `node receipt.js`

### How Computer Reads

1. `const riceKg = 2` → store 2 in `riceKg`
2. `total = riceKg * pricePerKg` → 2 * 12500 = 25000
3. `` `Hello ${customer}` `` → fetch `customer` → embed

### 3 Must-Know Terms

1. **Variable**: labeled box
2. **const/let**: locked vs open box
3. **Template literal**: `` `text ${var}` ``

---

## Experiments

- **Green:** Change `riceKg = 5` and `customer = "Andi"` → total?
- **Yellow:** `` `10% discount = ${total * 0.1}` ``
- **Red:** `const shopName = "New"; shopName = "X"` → error `Assignment to constant`. Change to `let`.

---

## Challenge

**Shop Delivery Calculator:** Hardcode `weight = 2.5` kg and `distance = 8` km, calc `delivery = weight*5000 + distance*2000`, show with template literal: `"Weight 2.5kg, distance 8km → Rp 28,500"` + `typeof delivery`. Add `note = null` if no note.

---

## Mini Glossary

- **Variable**: storage box
- **const**: locked box
- **let**: changeable box
- **string/number/boolean**: data types
- **Template literal**: `` `text ${var}` ``

---

## Summary

Week 1 of 14: **JavaScript Basics** (Level: Beginner). You can store shop data and calc receipt. Next week: **Data Types & Structures** — list (array) and card (object).
