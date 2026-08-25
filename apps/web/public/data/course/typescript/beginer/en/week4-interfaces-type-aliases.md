# Interfaces & Type Aliases — Card Blueprints

> **Kategori:** TypeScript | **Level:** Complete TypeScript | **Minggu 4:** Interfaces & Type Aliases

## Learning Objectives

- Difference `type` vs `interface` — when to use which
- Make blueprint `interface Product { name: string; price: number; stock?: number }`
- `extends` for inheritance: `Member extends Customer`
- `readonly` and optional field
- Index signature for dictionary `Record<string, number>`

---

## Why This Matters (Non-IT)

Without blueprint, each product card manually `name: string, price: number` 20x — typo `prcie` passes. With `interface Product` write once, all cards follow same sticker. Change `price` to `salePrice`, error shows everywhere you forgot — safe.

---

## Program: Blueprint Cards

```typescript
interface Product {
  readonly id: number;
  name: string;
  price: number;
  stock?: number;
  category: "staple" | "vegetable" | "protein";
}

const rice: Product = {
  id: 1,
  name: "Rice 5kg",
  price: 62000,
  category: "staple",
};
console.log("Product:", rice);
// rice.id = 2; // ❌ readonly

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

type Status = "inStock" | "out";
type Price = number;

type StockMap = { [name: string]: number };
const stock: StockMap = { rice: 10, eggs: 5 };
console.log("\nRice stock:", stock["rice"]);

function total(items: Product[]): number {
  return items.reduce((s, p) => s + p.price * (p.stock ?? 1), 0);
}
console.log("\nTotal:", total([rice, { id: 2, name: "Spinach", price: 5000, category: "vegetable", stock: 2 }]));

type Brief = Pick<Product, "name" | "price">;
const brief: Brief = { name: "Sugar", price: 15000 };
console.log("Brief:", brief);
```

---

## Key Concepts

### `interface` vs `type`
- `interface` for **objects/shapes**, can `extends` and merge.
- `type` for **alias, union, tuple, function**.
- For shop cards, **use `interface`** more idiomatic.

### `readonly` & `?`
- `readonly id` cannot change.
- `stock?: number` may be missing.

### `extends`
`Member extends Customer` → has all Customer fields + extra.

### Index Signature
`{ [key: string]: number }` free string-key dictionary.

---

## Beginner Friendly Explanation

### Analogy: Blueprints

- **Interface = house blueprint**: drawing `name`, `price`, `category` — workers (TS) check each house follows blueprint.
- **`extends` = extension blueprint**: Member house = Customer house + 2nd floor (points).
- **`readonly` = concrete foundation**: cannot move after built.
- **`?` = optional**: garage may exist or not.

---

## Experiments

- **Green:** Make `interface Book { title: string; pages: number }` → make 1 book.
- **Yellow:** `stock?: number` → make product without stock, `total` uses `?? 1`?
- **Red:** Change `rice.id = 9` → readonly error.

---

## Challenge

**Tiered Student Card:** `interface Person { name: string; age: number }`, `interface Student extends Person { id: string; score: number }`, `type Status = "pass" | "remedial"`. Make `function status(s: Student): Status { return s.score >= 70 ? "pass" : "remedial" }` and array `Student[]` average.

---

## Mini Glossary

- **interface/type**: blueprints
- **extends**: inheritance
- **readonly/?**: fixed/optional

---

## Summary

Week 4 of 12: **Interfaces** (Level: Complete). Have safe card blueprints. Foundation TS done! Next: **Generics** — blueprint for any shelf.
