# Advanced Types — Color Labels for Status

> **Kategori:** TypeScript | **Level:** Complete TypeScript | **Minggu 2:** Advanced Types
> **Prerequisites:** Week 1 — **Introduction to TypeScript**.

## Learning Objectives

- `Union` for choices: `status: "in" | "out" | "preorder"`
- `Literal` + `type alias` for label shorthand
- `Intersection` (`&`) for combined cards: `Customer & Member`
- `Narrowing` with `typeof` — TypeScript gets smarter after `if`
- `Discriminated union` for differently-shaped stock (boxes, sacks, bottles)

---

## Why This Matters (Non-IT)

Shop status is only 3 words: `in/out/preorder`, not free-typed `iN`. Without literals, typos slip through. With `type Status = "in" | "out"` typos go instantly red. For differently-shaped products (box vs sack), `discriminated union` prevents stock miscounts.

---

## Program: Product Status & Shapes

```typescript
// 1. Union + Literal — special color stickers
type Status = "in" | "out" | "preorder";
let s: Status = "in";
// s = "iN"; // ❌ Error

function label(status: Status): string {
  if (status === "in") return "✅ Available";
  if (status === "out") return "❌ Out";
  return "⏳ Preorder";
}
console.log(label("in"));

// 2. Intersection — combine 2 cards
type Name = { name: string };
type Age = { age: number };
type Person = Name & Age; // must have both
const budi: Person = { name: "Budi", age: 25 };
console.log("\nPerson:", budi);

// 3. Narrowing — after checking, TS knows the type
function process(id: string | number) {
  if (typeof id === "string") {
    // here TS knows id = string → .toUpperCase() allowed
    console.log("String ID:", id.toUpperCase());
  } else {
    // here number → .toFixed() allowed
    console.log("Number ID:", id.toFixed(0));
  }
}
process("abc123");
process(42);

// 4. Discriminated Union — different shapes, 1 rack
type Product =
  | { kind: "box"; count: number; unit: "pcs" }
  | { kind: "sack"; weight: number; unit: "kg" };

function stock(p: Product): string {
  switch (p.kind) {
    case "box": return `${p.count} ${p.unit}`;
    case "sack": return `${p.weight} ${p.unit}`;
  }
}
console.log("\nBox stock:", stock({ kind: "box", count: 12, unit: "pcs" }));
console.log("Sack stock:", stock({ kind: "sack", weight: 5, unit: "kg" }));

// 5. Type Guard — inspector guard
function isString(x: unknown): x is string {
  return typeof x === "string";
}
const check: unknown = "hello";
if (isString(check)) {
  console.log("\nLength:", check.length); // safe, TS knows string
}
```

---

## Key Concepts

### `type Status = "in" | "out"`
Only 3 valid words. Typos instantly error — like special color stickers.

### `type Person = Name & Age`
`&` combines → must have all fields from both.

### Narrowing `typeof`
After `if (typeof id === "string")`, TS inside the `if` knows `id` is a `string`.

### Discriminated Union
Each variant has a distinguishing `kind`. `switch(p.kind)` TS knows which fields exist.

---

## Beginner Friendly Explanation

### Analogy

- **Literal = stamp**: only 3 stamps `in/out/preorder`, can't stamp `iN`.
- **Intersection = combined card**: ID + Member Card = Person.
- **Narrowing = flashlight**: after `typeof` flashlight, dark becomes bright.
- **Discriminated union = mixed rack**: boxes and sacks on 1 rack, but `kind` labels separate the counting.

### Step 0 — Prepare Device
- Same as W1: `types.ts` + `npx tsc`, deliberately mistype a literal.

### How the Computer Reads It
1. `s = "iN"` → not in `"in"|"out"|"preorder"` → red error.
2. `switch(p.kind)` → case `"box"` → TS only offers `count`, not `weight`.

### 3 Must-Know Terms

1. **Union `|`**: or
2. **Literal**: value as type
3. **Narrowing**: narrow type after check

---

## Experiments

- **Green:** `type Day = "Mon"|"Fri"` → `let d: Day = "Mon"` ✅, `"Sun"` ❌?
- **Yellow:** `type A={a:string}&{b:number}` → object must have both.
- **Red:** Remove `typeof` in `process`, try `id.toUpperCase()` outside if → error?

---

### Bonus: keyof — Automatic Key List (TypeScript Handbook!)

```typescript
interface Product { name: string; price: number; stock: number }
type Keys = keyof Product; // "name" | "price" | "stock" AUTOMATIC!
function take(p: Product, k: Keys) { return p[k]; } // k only real keys
console.log(take({ name: "Rice", price: 62000, stock: 10 }, "price")); // 62000
// take(p, "color") // ❌ Error: not a Product key!
// Add a discount field to the interface → Keys grows AUTOMATICALLY (no hand edits!)
```

---

## Challenge

**Order Status Machine:** `type Order = { status: "new" } | { status: "ship", receipt: string } | { status: "done" }`. Function `info(o: Order)` → switch status, if `ship` show `receipt`. Try `info({status:"ship"})` without `receipt` → error, must be complete.
- **Link-up (Week 1 — Introduction to TypeScript):** plug this challenge's result into that flow; make sure it runs end-to-end.

---
## Mini Glossary

- **Union/Literal**: limited choices
- **Intersection**: combine types
- **Narrowing/Guard**: type check

---

## Summary

Week 2 of 12: **Advanced Types** (Level: Complete). Can limit choices and distinguish shapes. Next: **Functions** with types.
