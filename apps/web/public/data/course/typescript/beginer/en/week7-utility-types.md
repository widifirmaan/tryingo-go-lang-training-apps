# Utility Types — Shop Cutting Tools (typescriptlang.org)

> **Kategori:** TypeScript | **Level:** Complete TypeScript | **Minggu 7:** Utility Types
> **Prerequisites:** Week 6 — **Classes & OOP**.

## Learning Objectives

- `Pick<Product, "name" | "price">` take 2, `Omit<Product, "stock">` drop 1, `Partial` all-optional, `Required` all-required (source: typescriptlang.org/docs/handbook/utility-types)

---

## Why This Matters (Non-IT)

Products have 5 fields, but the brief card only needs `name` + `price` — without `Pick`, rewrite `interface Brief { name, price }` duplicated. With `Pick`, 1 line.

---

## Program: Shop Cutting Tools (typescriptlang.org)

```typescript
interface Product { id: number; name: string; price: number; stock: number; category: string; }

type Brief = Pick<Product, "name" | "price">; // only name & price
const r: Brief = { name: "Rice", price: 62000 };

type NoStock = Omit<Product, "stock">; // everything except stock
type Optional = Partial<Product>; // all become ?
type Mandatory = Required<Optional>; // all required again

// Shop example: update only name
function update(product: Product, patch: Partial<Product>): Product {
  return { ...product, ...patch };
}
console.log(update({ id: 1, name: "Rice", price: 62000, stock: 10, category: "Staples" }, { price: 65000 }));
```

**Source:** `typescriptlang.org/docs/handbook/utility-types` — `Pick`, `Omit`, `Partial`.

---

## Key Concepts

### `Pick`/`Omit` = Cut
`Pick` takes, `Omit` drops.

### `Partial`/`Required` = Optional/Mandatory
`Partial` all `?`, `Required` all required.

---

## Beginner Friendly Explanation

### Analogy: Paper Cutting Tools

- **`Pick` = scissors**: cut `name` and `price` only.
- **`Omit` = discard**: drop `stock`.
- **`Partial` = light pencil**: all optional.

### Step 0 — Prepare Device

`npx tsc` check, `tsc --version` 5.x (done in W1).

### How the Computer Reads It
1. `Pick<Product, "name"|"price">` → new type with only those 2 fields.
2. `update(p, { price: 65000 })` → `Partial` allows subset → merged object still full `Product`.

### 3 Must-Know Terms

1. **Pick/Omit**: take/drop
2. **Partial/Required**: optional/mandatory

---

## Experiments

- **Green:** `Pick<Product,"name">` → object with only `name` valid?
- **Yellow:** `Omit<Product,"stock"|"category">` → drops both?
- **Red:** Full `Product` assigned to `Brief` → extra fields error? Trim.

---

## Challenge

**Complete Cutting Shop:** `Product` 5 fields → `Brief = Pick<Product, "name"|"price">` + `NoStock = Omit<Product,"stock">` + `update(product, Partial<Product>)`.

---

## Mini Glossary

- **Pick/Omit/Partial**: cut/drop/optional

---

## Summary

Week 7 of 12: **Cutting Tools** — `Pick`/`Omit`. Next: **Config**.
