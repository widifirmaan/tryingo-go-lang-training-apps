# Queries — Order Exactly What You Want (GraphQL)

> **Kategori:** GraphQL | **Level:** Beginner | **Minggu 2:** Queries

## Learning Objectives

- `products(category: "Staples")` filter arguments, `cheap: products(...)` double alias, `fragment Card` reusable snippets (source: graphql.org/learn/queries)
- `$category: String!` variables + JSON variables (safe, no string gluing)

---

## Why This Matters (Non-IT)

REST `/api/products` sends ALL fields (name, price, description, stock, created_at) though phone lists need name+price only → wasted data. GraphQL asks `name price` → gets just that. 1 `/graphql` endpoint for all, not 20 endpoints.

---

## Program: Exact Shop Orders

```graphql
# 1. Arguments: filter on server
query {
  products(category: "Staples") {
    name
    price
  }
}

# 2. Alias: 2 orders at once (cheap + pricey)
query Two {
  cheap: products(category: "Veggies") { name price }
  pricey: products(category: "Staples") { name price }
}

# 3. Fragment: reusable card snippet
fragment Card on Product {
  name
  price
  stock
}
query {
  products { ...Card }
}

# 4. Variables: safe (never glue strings!)
query Find($category: String!) {
  products(category: $category) {
    name
    price
  }
}
# Variables JSON: { "category": "Staples" }
```

Try at `onecompiler.com/graphql` or `GraphiQL` (`/graphql` on server).

---

## Key Concepts

### Selected Fields = Data Savings
Write only what's wanted (`name price`), server sends just that.

### Arguments/Alias/Fragment/Variables = Order Tools
- `products(category: "Staples")` filters.
- `cheap: products(...)` 2 names 1 query.
- `fragment` card snippet.
- `$category` variables + JSON (GraphQL-style injection-proof).

---

## Beginner Friendly Explanation

### Analogy: Buffet vs A La Carte
- **REST = set buffet**: order "package A" get 10 dishes (wanted 2).
- **GraphQL = a la carte**: write `name price` → get 2.

### Step 0 — Prepare Device
- Same as W1: browser `GraphiQL` (no install) or `onecompiler.com/graphql`.

### How the Computer Reads It
1. `query { products { name } }` → server checks schema → fetches `name` per product → JSON `{ data: { products: [...] } }`.
2. Always wrapped in `data` (or `errors` on failure).

### 3 Must-Know Terms
1. **Query/field**: order/column
2. **Arguments/alias**: filter/double-name
3. **Fragment/variables**: snippet/safe

---

## Experiments

- **Green:** Ask only `name` (no `price`) → JSON without price?
- **Yellow:** 1 query 2 aliases `a` + `b` different categories → 2 results?
- **Red:** Gluing `category` directly `"St" + "aples"`? Don't — use `$variables`.

---

## Challenge

**Complete Order Shop:** 1 query: `all: products { ...Card }` + `veggies: products(category:"Veggies") { name }` + `$cat` variable for 1 more. 3 results 1 request.

---

## Mini Glossary

- **Query/arguments/alias**: order/filter/double
- **Fragment/variables**: snippet/safe

---

## Summary

Week 2 of 5: **Exact Orders** (Level: Beginner). Data savings, 1 endpoint. Next: **Mutations** — write & edit.
