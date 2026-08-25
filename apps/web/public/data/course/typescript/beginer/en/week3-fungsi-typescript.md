# Typed Functions — Recipes with Ingredient Labels

> **Kategori:** TypeScript | **Level:** Complete TypeScript | **Minggu 3:** Functions & Signatures

## Learning Objectives

- Write typed functions: `(name: string) => string`, `void` if no return
- Optional `name?: string` and default `name = "Guest"`
- Typed `Rest` `(...nums: number[])`
- Typed callback `(n: number) => number` and `readonly` array
- Simple overload for `greet` with different input

---

## Why This Matters (Non-IT)

Recipe `calcTotal` if wrongly sent `string` → total becomes `"6210"` (text join). With `(price: number)` wrong send red. Callback `map` without type, `n` becomes `any` → typo not caught.

---

## Program: Typed Kitchen Functions

```typescript
function greet(name: string): string {
  return `Hello, ${name}`;
}
console.log(greet("Budi"));

function greet2(name: string = "Guest", title?: string): string {
  return title ? `Hello ${title} ${name}` : `Hello ${name}`;
}
console.log(greet2());
console.log(greet2("Siti", "Ms."));

function total(...nums: number[]): number {
  return nums.reduce((a, b) => a + b, 0);
}
console.log("\nTotal:", total(1, 2, 3, 4));

function process(data: number[], work: (n: number) => number): number[] {
  return data.map(work);
}
console.log("Doubled:", process([1, 2, 3], n => n * 2));

function print(prices: readonly number[]) {
  console.log("Prices:", prices);
}
print([10000, 20000]);

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
Inside parentheses = input type, after = output type. `void` = no return.

### `?:` & Default
`title?: string` may be missing, `name = "Guest"` default fill.

### `...nums: number[]`
Rest must be typed array. `number[]` = rack only for numbers.

### Callback `(n: number) => number`
Full function type. `readonly number[]` cannot `push`.

---

## Beginner Friendly Explanation

### Analogy: Labeled Recipe

- **`(name: string): string`** = label on ingredient bowl and finished plate. Wrong ingredient → rejected.
- **`readonly`** = sign "Do Not Touch".
- **Callback** = delegate "cut this way" — way must be `(item: number) => result`.

---

## Experiments

- **Green:** `function mul(a:number,b:number):number { return a*b }` → `mul(2,3)`?
- **Yellow:** `total(1,2,"3")` → error? Must all numbers.
- **Red:** `print` then `push` → readonly error.

---

## Challenge

**Typed Shop Calculator:** `type Item={price:number; qty:number}`, `function delivery(weight:number,distance:number):number`, `function receipt(items: readonly Item[], distance:number): string` return `` `Total Rp ${calcTotal(items)}` ``. Try send `price:"62000"` → red.

---

## Mini Glossary

- **Signature**: function type
- **void**: no return
- **readonly**: cannot change

---

## Summary

Week 3 of 12: **Typed Functions** (Level: Complete). Safe labeled recipes. Next: **Interfaces** — card blueprints.
