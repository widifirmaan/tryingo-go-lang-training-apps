# Generics — Racks for Any Type

> **Kategori:** TypeScript | **Level:** Complete TypeScript | **Minggu 5:** Generics

## Learning Objectives

- `function first<T>(arr: T[]): T` — rack fitting `string` or `number` depending on use
- `Cart<T>` basket for anything, `constraint` `T extends { price: number }`

---

## Why This Matters (Non-IT)

Without generics, build `firstString` and `firstNumber` 2 identical functions — duplicates. With `<T>` 1 rack for all.

---

## Program: Generic Rack

```typescript
function first<T>(arr: T[]): T | undefined {
  return arr[0];
}
console.log(first([1,2,3])); // T = number → 1
console.log(first(["a","b"])); // T = string → "a"

class Cart<T> {
  private items: T[] = [];
  add(item: T){ this.items.push(item); }
  all(): T[] { return this.items; }
}

const stringCart = new Cart<string>();
stringCart.add("Rice");
console.log(stringCart.all());

const numberCart = new Cart<number>();
numberCart.add(62000);
console.log(numberCart.all());

// Constraint — only those with price
function total<T extends { price: number }>(items: T[]): number {
  return items.reduce((s,i)=>s+i.price,0);
}
console.log(total([{price:62000},{price:5000}]));
```

---

## Key Concepts

### `<T>` = Temporary Label
`function first<T>` → when using `first([1,2])` T becomes `number`.

### `Cart<T>` = Multipurpose Rack
`Cart<string>` string-only rack, `Cart<number>` number-only rack.

### `extends` Constraint = Entry Requirement
`T extends { price: number }` → only types having `price` allowed in.

---

## Beginner Friendly Explanation

### Analogy: Adjustable Rack
- **`<T>` = adjustable divider**: set to string mode or number mode at use time.

### Step 0 — Prepare Device
- Same as W1: `generic.ts` + `npx tsc`, hover `T` in VS Code.

### How the Computer Reads It
1. `first([1,2,3])` → T locked to `number` → returns `number`.
2. `new Cart<string>()` → `add(123)` → red error.

### 3 Must-Know Terms
1. **Generic/constraint**: adjustable/requirement

---

## Experiments

- **Green:** `first(["x","y"])` → T is `string`?
- **Yellow:** `numberCart.add("rice")` → red? Must be number.
- **Red:** `total([{name:"x"}])` → no `price` → constraint error? Add price.

---

## Challenge

**Generic Shop Rack:** `class Shelf<T extends { price: number }> { add / total }` → fill 3 products → `total()` + try adding priceless item → red.

---

## Mini Glossary

- **generic/constraint**: adjustable/requirement

---

## Summary

Week 5: **Generic Rack** — 1 rack for all types. Next: **Classes**.
