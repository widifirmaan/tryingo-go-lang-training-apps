# Intro to TypeScript — Safety Stickers for JavaScript

> **Kategori:** TypeScript | **Level:** Complete TypeScript | **Minggu 1:** Pengantar TypeScript

## Learning Objectives

- Understand TypeScript = JavaScript + **label stickers** (types) preventing wrong delivery
- Install TS, change `app.js` → `app.ts`, run `npx tsc` and `watch`
- Write basic types: `string`, `number`, `boolean` with `:`
- Let TS **infer** — no need to write all
- See red error **before run**, not after customer complains

---

## Why This Matters (Non-IT)

JS allows `price = "five thousand"` (text) to pass, error only on calc. Shop loses. TS = **safety sticker on box**: `price: number` only fits number. Wrong fill, VS Code red — fix before ship.

If you know JS last week, TS only adds **one colon**.

---

## Program: Typed Shop Receipt

Save as `receipt.ts` → `npx tsc receipt.ts` → `node receipt.js`

```typescript
const shopName: string = "Siti's Shop";
const riceKg: number = 2;
const pricePerKg: number = 12500;
let customer: string = "Budi";

let total = riceKg * pricePerKg;
console.log(`Shop: ${shopName}, Customer: ${customer}, Total: Rp ${total}`);

function greet(name: string): string {
  return `Hello, ${name}!`;
}
console.log(greet("Budi"));
// greet(123); // ❌ Error

const prices: number[] = [10000, 15000, 20000];
const fruits: string[] = ["apple", "mango"];

console.log("\n=== Inference ===");
const city = "Jakarta";
const height = 175.5;

let note: string | null = null;
note = "No plastic please";
console.log("Note:", note);

console.log("\n✅ TS checks before run — safe!");
```

**Run (3 steps):**
1. `npm install -g typescript` or `npm install typescript --save-dev`
2. `npx tsc receipt.ts` → makes `receipt.js`
3. `node receipt.js` — try `greet(123)` → `npx tsc` red before `node`.

---

## Key Concepts

### TS = JS + Stickers
`const name: string` sticker "only text". JS has no stickers.

### Inference = Auto Guess
`const city = "Jakarta"` TS knows `string` without `:string`.

### Typed Array
`number[]` rack only for numbers.

### Union `A | B`
`string | null` = text or empty.

### Check Before Run
`tsc` compiles TS→JS and checks. Error at **VS Code** red, not after deploy.

---

## Beginner Friendly Explanation

### Analogy: Warehouse Stickers

- **JS = unlabeled boxes**: rice or stone, no one stops.
- **TS = stickered boxes**: `price: number` blue sticker "Numbers only". Wrong → guard (VS Code) stops.
- **`npx tsc` = guard check**: before goods leave, guard checks all stickers.

---

## Experiments

- **Green:** Change `riceKg: number = 2` to `"two"` → red. Fix.
- **Yellow:** `let points: number | string = 10; points = "ten";` — union can switch?
- **Red:** `fruits: string[]` then `fruits.push(123)` → error.

---

## Challenge

**Typed Receipt:** Make `function calcTotal(weight: number, price: number): number { return weight * price }`. Call `calcTotal(2, 12500)` ✅ and `calcTotal("2", 12500)` ❌ see error. Add `let discount: number | null = null` and `if (discount !== null) total -= discount`.

---

## Mini Glossary

- **TypeScript**: JS with stickers
- **: string / : number**: type annotation
- **Inference**: guess type
- **Union `|`**: or
- **tsc**: compiler TS→JS

---

## Summary

Week 1 of 12: **Intro TS** (Level: Complete). You put safety stickers on JS boxes. Next: **Advanced Types** simplified — `status: "inStock" | "out"` not theory.
