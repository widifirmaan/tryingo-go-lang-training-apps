# Interfaces & Type Aliases — Card Blueprints

> **Kategori:** TypeScript | **Level:** Complete TypeScript | **Minggu 4:** Interfaces & Type Aliases

## Learning Objectives

- Distinguish `type` vs `interface` — when to use which
- Build a blueprint `interface Product { name: string; price: number; stock?: number }`
- `extends` for inheritance: `Member extends Customer`
- `readonly` and `optional` fields
- Index signatures for dictionaries `Record<string, number>`

---

## Why This Matters (Non-IT)

Without a blueprint, every product card hand-writes `name: string, price: number` 20x — typo `prcie` slips through. With `interface Product` write once, all cards share the same stickers. Rename `price` to `salePrice`, errors surface everywhere you forgot — safe.

---

## Program: Blueprinted Shop Cards

```typescript
// 1. Interface — card blueprint
interface Product {
  readonly id: number;      // forbidden to change after creation
  name: string;
  price: number;
  stock?: number;           // ? = may be missing
  category: "staples" | "veggies" | "protein";
}

const rice: Product = {
  id: 1,
  name: "Rice 5kg",
  price: 62000,
  category: "staples",
  // stock not required
};
console.log("Product:", rice);
// rice.id = 2; // ❌ readonly

// 2. Extends — inheritance
interface Customer {
  name: string;
  phone: string;
}
interface Member extends Customer {
  points: number;
  level: "silver" | "gold";
}
const member: Member = { name: "Budi", phone: "081", points: 120, level: "gold" };
console.log("\nMember:", member);

// 3. Type alias for shorthand & unions
type Status = "in" | "out";
type Price = number; // alias

// 4. Index signature — stock dictionary
type StockMap = { [name: string]: number }; // string keys, number values
const stock: StockMap = { rice: 10, eggs: 5 };
console.log("\nRice stock:", stock["rice"]);

// 5. Real example: calculate with blueprint
function cartTotal(items: Product[]): number {
  return items.reduce((s, p) => s + p.price * (p.stock ?? 1), 0);
  // p.stock ?? 1 → if stock undefined use 1
}
console.log("\nTotal:", cartTotal([rice, { id: 2, name: "Spinach", price: 5000, category: "veggies", stock: 2 }]));

// 6. Pick & Omit preview (week 7 details)
type Brief = Pick<Product, "name" | "price">; // only 2 fields
const brief: Brief = { name: "Sugar", price: 15000 };
console.log("Brief:", brief);
```

---

## Key Concepts

### `interface` vs `type`
- `interface` for **objects/shapes**, supports `extends` and merging.
- `type` for **aliases, unions, tuples, functions**.
- For shop cards, **`interface`** is more idiomatic.

### `readonly` & `?`
- `readonly id` forbidden to change.
- `stock?: number` may be missing (`number | undefined`).

### `extends`
`Member extends Customer` → has all Customer fields + extras.

### Index Signature
`{ [key: string]: number }` free dictionary with string keys.

---

## Beginner Friendly Explanation

### Analogy: Blueprints

- **Interface = house blueprint**: drawing of `name`, `price`, `category` — builder (TS) checks every house follows it.
- **`extends` = extra blueprint**: Member house = Customer house + 2nd floor (points).
- **`readonly` = poured foundation**: can't shift after set.
- **`?` = optional**: garage may or may not exist.

### Step 0 — Prepare Device
- Same as W1: `cards.ts` + `npx tsc`, try omitting a required field.

### How the Computer Reads It
1. Missing `price` in object → error lists the missing field.
2. `rice.id = 9` → readonly error before run.

### 3 Must-Know Terms

1. **Interface**: object blueprint
2. **Extends**: inheritance
3. **Optional `?`**: may be missing

---

## Experiments

- **Green:** Build `interface Book { title: string; pages: number }` → make 1 book.
- **Yellow:** `stock?: number` → make product without stock, `cartTotal` uses `?? 1`?
- **Red:** Change `rice.id = 9` → readonly error.

---

### Bonus: Enum vs Union (Enums chapter in the TypeScript Handbook!)

```typescript
// Enum: named choices + automatic numbers (0,1,2)
enum Level { Basic, Member, VIP }
let lv: Level = Level.Member; // 1
console.log(lv, Level[1]); // 1 "Member" (two-way mapping!)

// W2 union literal (pure strings, no numbers)
type Status = "new" | "ship" | "done";

// When which? Enum when numbers/codes needed (levels, roles). Union for pure text.
// const enum (thrifty, no runtime object) & string enums ("VIP" not numbers):
const enum Role { Admin = "ADMIN", Cashier = "CASHIER" }
```

---

## Challenge

**Tiered Student Cards:** `interface Person { name: string; age: number }`, `interface Student extends Person { id: string; score: number }`, `type Status = "pass" | "remedial"`. Build `function status(s: Student): Status { return s.score >= 70 ? "pass" : "remedial" }` and a `Student[]` average.

---

## Mini Glossary

- **interface/type**: blueprint
- **extends**: inheritance
- **readonly/?**: fixed/optional

---

## Summary

Week 4 of 12: **Interfaces** (Level: Complete). Safe card blueprints owned. TS foundation done! Next: **Generics** — blueprints for any rack.
