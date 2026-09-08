# Classes & OOP — TypeScript Card Factory

> **Kategori:** TypeScript | **Level:** Complete TypeScript | **Minggu 6:** Classes & OOP

## Learning Objectives

- `class Product { constructor(name: string, price: number){} }` card factory, `private`, `public`, `extends`

---

## Why This Matters (Non-IT)

50 products without a blueprint → write `name, price, stock` 50x. With `class` write once, `new` 50 cards. `private stock` blocks direct outside edits (must go through validating `discount` method). `Member extends Product` adds `points` without rewriting.

---

## Program

```typescript
class Product {
  constructor(public name: string, public price: number, private stock: number = 0){}
  info(): string { return `${this.name}: Rp${this.price} (stock ${this.stock})`; }
  discount(pct: number){ this.price -= this.price * pct/100; }
}

class Member extends Product {
  constructor(name: string, price: number, public points: number){
    super(name, price);
  }
}

const rice = new Product("Rice", 62000, 10);
console.log(rice.info());
rice.discount(10);
console.log(rice.info());
console.log(new Member("Sugar", 15000, 120).info());
```


---

## Key Concepts

### `class` + `constructor(public ...)` = Blueprint + Auto Fill
`constructor(public name: string)` directly becomes a field — no manual `this.name = name`.

### `private` vs `public` = Locked vs Open
`private stock` only in-class methods may change. `public name` free.

### `extends` + `super()` = Inheritance
`Member extends Product` inherits all + adds `points`. `super(name, price)` calls parent constructor.

---

## Beginner Friendly Explanation

### Analogy: Card Factory
- **class = blueprint**, **new = print card**, **private = safe** (only via cashier `discount`).

### Step 0 — Prepare Device
- Same as TS W1: `npx tsc file.ts && node file.js`.

### How the Computer Reads It
1. `new Product("Rice", 62000, 10)` → allocate + constructor fills 3 fields.
2. `rice.discount(10)` → `this` = rice → `price` becomes 55800.

### 3 Must-Know Terms
1. **Class/constructor**: blueprint/initial-fill
2. **private/public**: locked/open
3. **extends/super**: heir/parent

---

## Experiments

- **Green:** `new Product("Sugar", 15000)` → `info()`?
- **Yellow:** `rice.stock` from outside → `private` error? Use a method!
- **Red:** `Member` without `super(...)` → `must call super` error? Add it.

---

## Challenge

**Complete Factory:** `class Cart { items: Product[] = []; add(p: Product){...} total(): number {...} }` → fill 3 → `total()`.

---

## Mini Glossary

- **class/new/private**: blueprint/card/lock
- **extends/super**: heir/parent

---

## Summary

Week 6: **Card Factory** — `class` + `extends`. Next: **Utility Types**.
