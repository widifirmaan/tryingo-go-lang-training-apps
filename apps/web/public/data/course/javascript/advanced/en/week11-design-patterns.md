# Design Patterns — Neat Shop Blueprints

> **Kategori:** JavaScript | **Level:** Advanced | **Minggu 11:** Design Patterns

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

### Analogy: Plugs & Main Cashier JS
- See Program: run (`node`/browser), change 1 thing, see the difference.

### Step 0 — Prepare Device
- Same as JS W1: `node -v` / browser.

### How the Computer Reads It
- `getInstance()` returns the one instance; `subscribe/emit` broadcasts.

### 3 Must-Know Terms
- 1. **Strategy/Singleton/Observer**: plug/one/broadcast

---

## Mini Glossary

- See Must-Know Terms above.

## Summary

Week 11: **Blueprints** — Singleton, Factory, Observer.
