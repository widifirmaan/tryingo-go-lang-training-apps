# Introduction to TypeScript — Safety Stickers for JavaScript

> **Kategori:** TypeScript | **Level:** Complete TypeScript | **Minggu 1:** Pengantar TypeScript

## Learning Objectives

- Understand TypeScript = JavaScript + **label stickers** (types) that prevent wrong deliveries
- Install TypeScript, turn `app.js` into `app.ts`, run `npx tsc` and `npx tsc --watch`
- Write basic types: `string`, `number`, `boolean` with `:`
- Let TypeScript **guess automatically** (inference) — no need to write everything
- See red errors **before running**, not after customers complain

---

## Why This Matters (Non-IT)

JavaScript lets `price = "five thousand"` (text) slip through, only erroring at calculation. The shop loses money. TypeScript = **safety sticker on the box**: `price: number` means the box only fits numbers. Wrong fill, VS Code instantly underlines red — fix before shipping.

If you understood JS last week, TS only adds **1 colon**.

---

## Program: Typed Shop Receipt

Save as `receipt.ts` → `npx tsc receipt.ts` → `node receipt.js`

```typescript
// receipt.ts — same as JS, plus :types
const shopName: string = "Siti's Shop";
const riceKg: number = 2;
const pricePerKg: number = 12500;
let customer: string = "Budi";

// Type inference — no :number written, TS already knows 0 is number
let total = riceKg * pricePerKg; // TS guesses: number
console.log(`Shop: ${shopName}, Customer: ${customer}, Total: Rp ${total}`);

// Typed function — like a recipe with labeled ingredients
function greet(name: string): string {
  return `Hello, ${name}!`;
}
console.log(greet("Budi"));
// console.log(greet(123)); // ❌ Red error: Argument of type 'number' is not assignable to 'string'

// Typed array — rack that only fits 1 kind
const priceList: number[] = [10000, 15000, 20000];
const fruits: string[] = ["apple", "mango"];
// fruits.push(123); // ❌ Error: number doesn't fit string[]

console.log("\n=== Inference ===");
const city = "Jakarta"; // TS guesses string, no :string needed
const height = 175.5;   // number
// city = 123; // ❌ Error

// Simple week-1 union — box can hold 2 things
let note: string | null = null; // may be text or empty
note = "Don't use plastic";
console.log("Note:", note);

console.log("\n✅ TypeScript checks before run — safe!");
```

**How to run (3 steps):**
1. `npm install -g typescript` or `npm install typescript --save-dev` in project
2. `npx tsc receipt.ts` → creates `receipt.js`
3. `node receipt.js` → see result. Deliberately try `greet(123)` → `npx tsc` errors red before `node`.

---

## Key Concepts

### TS = JS + Stickers
`const name: string` → sticker "text only". `const age: number` → sticker "numbers only". JS has no stickers.

### Inference = Auto Guess
`const city = "Jakarta"` TS knows `string` without `:string`. Write types only when clarity is needed.

### Typed Arrays
`number[]` or `Array<number>` — numbers-only rack. Wrong fill instantly red.

### Union `A | B`
`string | null` = may be text or empty. For optional `note`.

### Check Before Run
`tsc` compiles TS→JS and checks types. Errors appear **in VS Code** (red lines), not after deploy.

---

## Beginner Friendly Explanation

### Analogy: Warehouse Stickers

- **JS = boxes without labels**: insert rice or rocks, nobody protests.
- **TS = boxes with stickers**: `price: number` blue sticker "Numbers only". Insert text → guard (VS Code) blocks.
- **`npx tsc` = guard check**: before goods leave the warehouse, the guard checks all stickers.

### Step 0 — Install (If Needed)

```
npm install -g typescript
tsc --version  # must be 5.x
```

In your Vite/React project: `npm install typescript --save-dev`

### How the Computer Reads It

1. You write `const riceKg: number = "two"` → `tsc` sees `string` vs `number` → **error**, no `receipt.js` created.
2. You fix to `2` → `tsc` creates `receipt.js` (plain JS) → `node` runs it.

### 3 Must-Know Terms

1. **Type**: box label (`: string`)
2. **Inference**: auto guess
3. **Union**: may be A or B (`string | null`)

---

## Experiments

- **Green:** Change `riceKg: number = 2` to `"two"` → see red. Fix it.
- **Yellow:** `let points: number | string = 10; points = "ten";` — union allows switching?
- **Red:** `fruits: string[]` then `fruits.push(123)` → error. Change to `number[]`?

---

## Challenge

**Typed Receipt:** Build `function calcTotal(weight: number, price: number): number { return weight * price }`. Call `calcTotal(2, 12500)` ✅ and deliberately `calcTotal("2", 12500)` ❌ see error. Add `let discount: number | null = null` and `if (discount !== null) total -= discount`.

---

## Mini Glossary

- **TypeScript**: stickered JS
- **: string / : number**: type annotations
- **Inference**: type guessing
- **Union `|`**: or
- **tsc**: TS→JS compiler

---

## Summary

Week 1 of 12: **TypeScript Intro** (Level: Complete). You put safety stickers on JS boxes. Next: **Advanced Types** simplified — `status: "in" | "out"` not theory.
