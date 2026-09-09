# Typed Functions — Recipes with Labeled Ingredients

> **Kategori:** TypeScript | **Level:** Complete TypeScript | **Minggu 3:** Functions & Signatures
> **Prerequisites:** Week 2 — **Advanced Types**.

## Learning Objectives

- Write typed functions: `(name: string) => string`, `void` when no return
- Optional params `name?: string` and defaults `name = "Guest"`
- Typed `rest` `(...nums: number[])`
- Typed callbacks `(n: number) => number` and `readonly` arrays
- Simple overloads for `greet` with different inputs

---

## Why This Matters (Non-IT)

Recipe `calcTotal` wrongly sent a `string` → total becomes `"6210"` (text glued). With type `(price: number)` wrong sends go instantly red. Untyped `map` callbacks make `n` `any` → typos go unnoticed.

---

## Program: Typed Function Kitchen

```typescript
// 1. Basic typed function
function greet(name: string): string {
  return `Hello, ${name}`;
}
console.log(greet("Budi"));
// greet(123); // ❌

// 2. Optional & default
function greet2(name: string = "Guest", title?: string): string {
  return title ? `Hello ${title} ${name}` : `Hello ${name}`;
  // title? = may be omitted (string | undefined)
}
console.log(greet2());
console.log(greet2("Siti", "Ms"));

// 3. Typed rest
function total(...nums: number[]): number {
  return nums.reduce((a, b) => a + b, 0);
}
console.log("\nTotal:", total(1, 2, 3, 4));

// 4. Typed callback
function process(data: number[], work: (n: number) => number): number[] {
  return data.map(work);
}
console.log("Times2:", process([1, 2, 3], n => n * 2));

// 5. Readonly — don't touch others' racks
function printPrices(prices: readonly number[]) {
  console.log("Prices:", prices);
  // prices.push(999); // ❌ Error: readonly
}
printPrices([10000, 20000]);

// 6. Real shop example
type Cart = { price: number; qty: number };
function calcTotal(cart: Cart[], discount: number = 0): number {
  const subtotal = cart.reduce((s, i) => s + i.price * i.qty, 0);
  return subtotal * (1 - discount / 100);
}
const cart: Cart[] = [{ price: 62000, qty: 1 }, { price: 5000, qty: 2 }];
console.log("\nTotal:", calcTotal(cart));
console.log("10% off:", calcTotal(cart, 10));
```

---

## Key Concepts

### `(a: string): string`
Inside parens = input types, after parens = output type. `void` = no return.

### `?:` & Defaults
`title?: string` may be empty, `name = "Guest"` default fill.

### `...nums: number[]`
Rest must be a typed array. `number[]` = numbers-only rack.

### Callback `(n: number) => number`
Function types written in full. `readonly number[]` forbids `push`.

---

## Beginner Friendly Explanation

### Analogy: Labeled Recipes

- **`(name: string): string`** = labels on ingredient jar and result plate. Wrong ingredient → rejected.
- **`readonly`** = "Do Not Touch" sign.
- **Callback** = entrust "cut following this pattern" — pattern must be `(item: number) => result`.

### Step 0 — Prepare Device
- Same as W1: `receipt.ts` + `npx tsc`, hover types in VS Code.

### How the Computer Reads It
1. `calcTotal("2", 12500)` → `string` vs `number` → red before run.
2. `readonly Item[]` → `push` call → compile error.

### 3 Must-Know Terms

1. **Signature**: function shape `(a: string) => number`
2. **Optional `?:`**: may be missing
3. **Readonly**: forbidden to change

---

## Experiments

- **Green:** `function mul(a:number,b:number):number { return a*b }` → `mul(2,3)`?
- **Yellow:** `total(1,2,"3")` → error? Must be all numbers.
- **Red:** `printPrices` then `push` → readonly error.

---

## Challenge

**Typed Shop Calculator:** `type Item={price:number; qty:number}`, `function shipping(weight:number,dist:number):number`, `function receipt(items: readonly Item[], dist:number): string` returning `` `Total Rp ${calcTotal(items)}` ``. Try sending `price:"62000"` → red.

---

## Mini Glossary

- **Signature**: function type
- **void**: no return
- **readonly**: forbidden to change

---

## Summary

Week 3 of 12: **Typed Functions** (Level: Complete). Safe labeled recipes. Next: **Interfaces** — card blueprints.
