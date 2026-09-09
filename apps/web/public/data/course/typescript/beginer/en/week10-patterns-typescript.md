# Design Patterns TS — Neat Shop Patterns (TechPulse 2026)

> **Kategori:** TypeScript | **Level:** Complete TypeScript | **Minggu 10:** Design Patterns TS
> **Prerequisites:** Week 9 — **Testing TypeScript**.

## Learning Objectives

- `Singleton` 1 cashier, `Factory` factory `makeProduct("rice")`, `Observer` subscribers of `outOfStock` (source: TechPulse 2026 + refactoring.guru)

---

## Why This Matters (Non-IT)

Without patterns, `if (type==="rice")` duplicated 20x. With `Factory`, 1 factory for all. `Observer` for "when stock empties, notify 3 branches" without manual `if`.

---

## Program: TS Shop Patterns (TechPulse)

```typescript
// Singleton — 1 cashier (TechPulse)
class Cashier {
  private static instance: Cashier;
  private constructor(){}
  static getInstance(): Cashier {
    if(!Cashier.instance) Cashier.instance = new Cashier();
    return Cashier.instance;
  }
}
const a = Cashier.getInstance();
const b = Cashier.getInstance();
console.log(a === b); // true, same

// Factory — factory (refactoring.guru)
function makeProduct(type: "rice" | "spinach"){
  if(type === "rice") return { name: "Rice", price: 62000 };
  return { name: "Spinach", price: 5000 };
}
console.log(makeProduct("rice"));

// Observer — subscribers (TechPulse)
class Store {
  private customers: ((name:string)=>void)[] = [];
  subscribe(fn: (name:string)=>void){ this.customers.push(fn); }
  outOfStock(name: string){ this.customers.forEach(fn=>fn(name)); }
}
const store = new Store();
store.subscribe(name=>console.log(`Stock ${name} empty, restock?`));
store.outOfStock("Rice");
```

**Source:** `techpulsesite.com/typescript-design-patterns-2026` — Singleton/Factory/Observer + `refactoring.guru`.

---

## Key Concepts

### `Singleton` = 1 Cashier
`private constructor` + `static getInstance` — 1 instance.

### `Factory` = Factory
`makeProduct(type)` → object, without 20x manual `new`.

### `Observer` = Subscribers
`subscribe(fn)` + `outOfStock` → calls all.

---

## Beginner Friendly Explanation

### Analogy: Neat Shop

- **Singleton = 1 head cashier**: no 2 head cashiers.
- **Factory = box factory**: ask "rice" → factory builds rice box.
- **Observer = WA group**: stock empty → broadcast to 3 branches.

### Step 0 — Prepare Device

`npx tsc` check, `tsc --version` 5.x (done in W1).

### How the Computer Reads It
1. `getInstance()` twice → same object (`===` true).
2. `outOfStock("Rice")` → all 2 subscribers called.

### 3 Must-Know Terms

1. **Singleton/Factory/Observer**: one/factory/subscribers

---

## Experiments

- **Green:** `getInstance() === getInstance()` → true?
- **Yellow:** `makeProduct("spinach")` → spinach object?
- **Red:** `new Cashier()` directly → `private constructor` error? Use `getInstance`.

---

## Challenge

**Complete Pattern Shop:** `Cashier` Singleton + `makeProduct` Factory 3 types + `Store` Observer 2 customers subscribed to `outOfStock`.
- **Link-up (Week 9 — Testing TypeScript):** plug this challenge's result into that flow; make sure it runs end-to-end.

---
## Mini Glossary

- **Singleton/Factory/Observer**: patterns

---

## Summary

Week 10 of 12: **Neat Patterns** — Singleton, Factory, Observer. Next: **Advanced Types**.
