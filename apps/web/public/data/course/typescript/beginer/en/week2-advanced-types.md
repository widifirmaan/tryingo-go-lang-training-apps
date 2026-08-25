# Advanced Types — Color Labels for Status

> **Kategori:** TypeScript | **Level:** Complete TypeScript | **Minggu 2:** Advanced Types

## Learning Objectives

- `Union` for choices: `status: "inStock" | "out" | "preorder"`
- `Literal` + `type alias` for short labels
- `Intersection` (`&`) to merge cards: `Customer & Member`
- `Narrowing` with `typeof` — TS smarter after `if`
- `Discriminated union` for different stock shapes (box, sack, bottle)

---

## Why This Matters (Non-IT)

Shop status only 3 words: `inStock/out/preorder`, not free `inStOcK`. Without literal, typo passes. With `type Status = "inStock" | "out"` typo red. For different shapes (box vs sack), discriminated union prevents wrong calc.

---

## Program: Status & Product Shapes

```typescript
type Status = "inStock" | "out" | "preorder";
let s: Status = "inStock";

function label(status: Status): string {
  if (status === "inStock") return "✅ Available";
  if (status === "out") return "❌ Out";
  return "⏳ Preorder";
}
console.log(label("inStock"));

type Name = { name: string };
type Age = { age: number };
type Person = Name & Age;
const budi: Person = { name: "Budi", age: 25 };
console.log("\nPerson:", budi);

function process(id: string | number) {
  if (typeof id === "string") {
    console.log("String ID:", id.toUpperCase());
  } else {
    console.log("Number ID:", id.toFixed(0));
  }
}
process("abc123");
process(42);

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

function isString(x: unknown): x is string {
  return typeof x === "string";
}
const check: unknown = "hello";
if (isString(check)) {
  console.log("\nLength:", check.length);
}
```

---

## Key Concepts

### `type Status = "inStock" | "out"`
Only 3 valid words. Wrong → error — like special color stickers.

### `type Person = Name & Age`
`&` merge → must have all fields.

### Narrowing `typeof`
After `if (typeof id === "string")`, inside `if` TS knows `id` is `string`.

### Discriminated Union
Each variant has `kind` discriminator. `switch(p.kind)` TS knows available fields.

---

## Beginner Friendly Explanation

### Analogy

- **Literal = stamp**: only 3 stamps `inStock/out/preorder`, can't stamp `inStOcK`.
- **Intersection = combined card**: ID + Member = Person.
- **Narrowing = flashlight**: after `typeof`, dark bright.
- **Discriminated union = mixed shelf**: boxes and sacks 1 shelf, label `kind` tells counting method.

---

## Experiments

- **Green:** `type Day = "Mon"|"Fri"` → `let d: Day = "Mon"` ✅, `"Sun"` ❌?
- **Yellow:** `type A={a:string}&{b:number}` → object must have both.
- **Red:** Remove `typeof` in `process`, try `id.toUpperCase()` outside if → error?

---

## Challenge

**Order Status Machine:** `type Order = { status: "new" } | { status: "shipped", tracking: string } | { status: "done" }`. Function `info(p: Order)` → switch status, if `shipped` show `tracking`. Try `info({status:"shipped"})` without `tracking` → error, must complete.

---

## Mini Glossary

- **Union/Literal**: limited choices
- **Intersection**: merge types
- **Narrowing/Guard**: type check

---

## Summary

Week 2 of 12: **Advanced Types** (Level: Complete). Can limit choices and differentiate shapes. Next: **Typed Functions**.
