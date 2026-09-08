# Schema & Types — Restaurant Menu

> **Kategori:** GraphQL | **Level:** Beginner | **Minggu 1:** Schema & Types

## Learning Objectives

- GraphQL = **restaurant menu**: client orders "I want name & price only", server sends just that (no more)
- `type Product { id: ID!, name: String!, price: Int! }` menu stickers
- `!` required, `[]` list, `query` fetch

---

## Why This Matters (Non-IT)

REST `/api/products` sends all fields (name, price, description, stock) though phones need only prices → wasted data. GraphQL asks exact.

---

## Program: Product Menu

```graphql
# Schema — menu
type Product {
  id: ID!
  name: String!
  price: Int!
  stock: Int
  category: String
}

type Query {
  products: [Product!]!
  productById(id: ID!): Product
}

# Query — order
query {
  products {
    name
    price
  }
}

query {
  productById(id: "1") {
    name
    price
    stock
  }
}
```

Try at `onecompiler.com/graphql` or `graphql.org/swapi-graphql`.

---

## Key Concepts

### Schema = Menu
`type Product` lists available columns.

### `!` & `[]`
`String!` required, `String` nullable. `[Product!]!` required list, required items.

### Query = Order
Ask for wanted fields, get just those.

---

## Beginner Friendly Explanation

### Analogy: Restaurant Menu
- **Schema = menu**: what can be ordered. **Query = order slip**: name + price only.

### Step 0 — Prepare Device
- Browser + `onecompiler.com/graphql` (no install) or GraphiQL.

### How the Computer Reads It
1. `query { products { name } }` → server checks schema → returns `data.products`.
2. Asking for unlisted field → `Cannot query field` error.

### 3 Must-Know Terms
1. **Schema/query/type**: menu/order/dish

---

## Experiments

- **Green:** Ask only `name` → JSON without price?
- **Yellow:** Ask unknown field → `Cannot query field` error?
- **Red:** Missing `!` → nullable accepted? Add `!` for required.

---

## Challenge

**Menu Order:** Query `products { name price }` + `productById(id:"1") { name price stock }` in GraphiQL, screenshot JSON.

---

## Mini Glossary

- **Schema/!/query**: menu/required/order

---

## Summary

Week 1: **Menu** — basic schema & query. Next: **Queries** advanced.
