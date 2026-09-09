# Design Patterns — Neat Shop Blueprints

> **Kategori:** JavaScript | **Level:** Advanced | **Minggu 11:** Design Patterns
> **Prerequisites:** Week 10 — **Error Handling**.

## Learning Objectives

- `Singleton` 1 cashier, `Factory` product factory, `Observer` out-of-stock subscribers, `Strategy` payment-way plug

---

## Why This Matters (Non-IT)

Without patterns, payment `if` duplicated 20x + adding a method edits 20 places. With `Strategy` add 1 class; `Singleton` 1 cashier; `Observer` broadcasts stock.

---

## Program

```javascript
// Singleton — 1 cashier
class Cashier {
  static instance = null;
  static getInstance(){ if(!Cashier.instance) Cashier.instance = new Cashier(); return Cashier.instance; }
}
const a = Cashier.getInstance();
const b = Cashier.getInstance();
console.log(a === b); // true, same

// Factory — factory
function makeProduct(type){
  if(type==="rice") return { name:"Rice", price:62000 };
  if(type==="spinach") return { name:"Spinach", price:5000 };
}
console.log(makeProduct("rice"));

// Observer — subscribers
class Store {
  constructor(){ this.customers=[]; }
  subscribe(fn){ this.customers.push(fn); }
  outOfStock(name){ this.customers.forEach(fn=>fn(name)); }
}
const store = new Store();
store.subscribe(name=>console.log(`Stock ${name} empty, when restock?`));
store.outOfStock("Rice");

// Strategy — payment-way plug (add ways without touching cashier)
class PayCashier {
  constructor(way){ this.way = way; } // plug Cash/Transfer
  checkout(total){ return this.way.pay(total); }
}
const cash = { pay: t => `Cash Rp${t}` };
const transfer = { pay: t => `Transfer Rp${t}` };
console.log(new PayCashier(cash).checkout(62000));
console.log(new PayCashier(transfer).checkout(62000));
```


---

## Beginner Friendly Explanation

### 2-Minute Class Primer (mandatory before patterns! à la freeCodeCamp Shopping Cart)
```javascript
class Product {
  constructor(name, price){ this.name = name; this.price = price; } // initial fill
  info(){ return `${this.name}: Rp${this.price}`; } // this = this card
}
class Member extends Product { // inherit + add
  constructor(name, price, points){ super(name, price); this.points = points; }
}
const b = new Member("Rice", 62000, 10);
console.log(b.info(), "| points", b.points);
```
- `class` = blueprint, `new` = print card, `this` = this card, `extends`/`super` = inherit/parent.

### Analogy: Plugs & Main Cashier JS
- **No patterns = 20 different plugs for 20 lamps**: add 1 lamp → drill 20 walls.
- **Strategy = 1 universal plug**: plug Cash/Transfer/QRIS, SAME cashier. **Singleton = 1 head cashier** (never 2!). **Observer = WA group**: empty stock → broadcast to all branches!

### Step 0 — Prepare Device
- Same as JS W1: `node -v` / browser.

### How the Computer Reads It
- `getInstance()` returns the one instance; `subscribe/emit` broadcasts.

### 3 Must-Know Terms
- 1. **Strategy/Singleton/Observer**: plug/one/broadcast

---

## Experiments

- **Green:** Run as-is, then change `makeProduct`'s value → does the output follow?
- **Yellow:** Change the case of `makeProduct` and `Cashier` → still runs or error?
- **Red:** Mistype 1 letter in `makeProduct` → what error message? Fix it.

## Challenge

**Design Patterns in Your Shop:** use `makeProduct`, `Cashier`, `Store` until it truly runs, then do these three levels.
- **Green:** Run this week's Program as-is; note the output.
- **Yellow:** Change 1 value in `makeProduct`, `Cashier`, `Store`; predict the output BEFORE running, then compare.
- **Red:** Combine with **Error Handling** (Week 10): plug the result into that flow, end-to-end must work.

## Mini Glossary

- See Must-Know Terms above.

## Summary

Week 11: **Blueprints** — Singleton, Factory, Observer. Next week: **Testing JavaScript**.
