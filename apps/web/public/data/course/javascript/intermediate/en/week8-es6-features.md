# ES6+ Features — Modern Shortcut Tools

> **Kategori:** JavaScript | **Level:** Intermediate | **Minggu 8:** ES6+ Features

## Learning Objectives

- `destructuring` unpack `const {name} = customer`, `spread` photocopy `[...old, new]`, `rest` remainder
- `template` `` `Hello ${name}` ``, `default` params, short `arrow`
- `optional chaining` `customer?.address?.city` safe when empty, `nullish` `??` default

---

## Why This Matters (Non-IT)

Shop lists 10 products — writing `const name = p.name; const price = p.price` 10x is exhausting. `const {name, price} = p` 1 line.

---

## Program: Fast Unpack & Combine

```javascript
const customer = { name: "Budi", age: 25, address: { city: "Jakarta" } };
const { name, age } = customer; // unpack
console.log(name, age);

const fruits = ["apple", "mango"];
const all = [...fruits, "durian"]; // photocopy + add
console.log(all);

function total(...nums){ return nums.reduce((a,b)=>a+b,0); } // rest remainder
console.log(total(1,2,3,4));

const city = customer.address?.city ?? "None"; // safe if address null
console.log(city);

const greet = (name="Guest") => `Hello ${name}`; // arrow + default
console.log(greet());
console.log(greet("Siti"));

// Combine objects
const base = { name: "Rice", price: 62000 };
const full = { ...base, stock: 10, category: "Staples" };
console.log(full);
```

---

## Key Concepts

### Destructuring = Unpack Box
`const {name, price} = product` directly becomes variables.

### Spread/Rest `...`
- `[...old, new]` photocopy plus
- `function f(...rest)` remainder becomes array

### `?.` & `??`
`customer?.address?.city` if `address` null → no error, `??` if left null use right.

---

## Beginner Friendly Explanation

### Analogy: Unpack & Photocopy
- **Destructuring = unpack box**: take `name` and `price` directly.
- **Spread = photocopy + add**: photocopy old list plus durian.

### Step 0 — Prepare Device
- Node.js or browser console, paste each block, predict then run.

### How the Computer Reads It
1. `const {name} = customer` → looks up key `name` → binds variable.
2. `[...fruits, "durian"]` → copies array + appends.

### 3 Must-Know Terms
1. **Destructuring/spread/rest**: unpack/copy/remainder

---

## Experiments

- **Green:** `const {name, price} = p` → both variables exist?
- **Yellow:** `customer.address?.city` when `address` null → `undefined` no crash?
- **Red:** `??` vs `||` with `0` → `??` keeps `0`? Test.

---

## Challenge

**ES6 Catalog:** `const p = {name:"Rice", price:62000, stock:10}` → `const {name, price} = p`, `const fresh = {...p, discount:10}`, `const city = customer?.address?.city ?? "Jakarta"`.

---

## Mini Glossary

- **destructuring/spread/??**: unpack/copy/default

---

## Summary

Week 8: **ES6+** — fast unpack & photocopy. Next: **Modules** — split files.
