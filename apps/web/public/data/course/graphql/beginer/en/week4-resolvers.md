# Resolvers — GraphQL Server Kitchen

> **Kategori:** GraphQL | **Level:** Beginner | **Minggu 4:** Resolvers
> **Prerequisites:** Week 3 — **Mutations**.

## Learning Objectives

- `resolvers = { Query: { products: () => [...] }, Mutation: { addProduct: (_, { input }) => ... } }` kitchen per field (source: apollographql.com/docs)
- `parent, args, context` = plate, order, shared kitchen

---

## Why This Matters (Non-IT)

Schema (W1) is only the menu — without resolvers, "addProduct" orders have no cook (`Cannot query field` error). Resolver = cook per menu: `Query.products` fetches the rack, `Mutation.addProduct` saves.

---

## Program: Shop Resolver Kitchen

```javascript
// db.js — rack (temporary array, real DB later)
let products = [
  { id: "1", name: "Rice", price: 62000 },
  { id: "2", name: "Spinach", price: 5000 },
];

// resolvers.js — cook per field
const resolvers = {
  Query: {
    products: () => products,                          // read all
    productById: (_, { id }) => products.find(p => p.id === id), // args = order
  },
  Mutation: {
    addProduct: (_, { input }) => {              // input = envelope
      const fresh = { id: String(Date.now()), ...input };
      products.push(fresh);
      return fresh;
    },
    deleteProduct: (_, { id }) => {
      products = products.filter(p => p.id !== id);
      return true;
    },
  },
  // Field resolver: Product.category fetches from another rack
  Product: {
    category: (parent) => parent.category || "General",
  },
};

module.exports = { resolvers };
```


```graphql
# Resolver = waiter fetching data (paste in playground → Run)
query {
  products { name price }
}
```
---

## Key Concepts

### `Query` / `Mutation` / `Product` = Menu Cooks/Cashier/Side
- `Query.products` cooks reads, `Mutation.addProduct` cooks writes.
- `Product.category` cooks a special field.

### `(parent, args, context)` = Plate/Order/Kitchen
- `parent` parent result, `args` order (`{ id }`), `context` shared (logged-in user).

---

## Beginner Friendly Explanation

### Analogy: Restaurant Kitchen
- **Schema = menu**, **resolver = cook**: every menu has a cook.
- **args = order slip**: `id: "1"`.

### Step 0 — Prepare Device
- Same as W1: `node -v`, `shop-graphql` folder (server next week).

### How the Computer Reads It
1. `query { products { name } }` → calls `Query.products()` → array → takes `name` per item.
2. `mutation { addProduct(input:...) }` → calls `Mutation.addProduct(_, { input })` → pushes → replies.

### 3 Must-Know Terms
1. **Resolver**: field cook
2. **args/context**: order/kitchen
3. **parent**: parent result

---

## Experiments

- **Green:** `Query.products()` directly in node → array of 2?
- **Yellow:** `addProduct` without `input.name` → `undefined`? Add validation `if (!input.name) throw new Error("Name required")`.
- **Red:** Delete `Mutation` → `mutation { addProduct }` `Cannot query field` error? Reattach.

---

## Challenge

**Complete Kitchen:** `Query.products` + `productsByCategory(category)` (`filter`) + `Mutation.changePrice/deleteProduct` + `Product.total = price * stock` field resolver. Test all 4 via plain `node` (no server).

---

## Mini Glossary

- **Resolver/args/context**: cook/order/kitchen
- **parent**: parent

---

## Summary

Week 4 of 5: **Server Kitchen** (Level: Beginner). Every menu has a cook. Next: **Apollo Server** — open restaurant.
