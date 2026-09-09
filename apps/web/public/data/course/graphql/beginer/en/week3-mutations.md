# Mutations — Write & Edit GraphQL Shop

> **Kategori:** GraphQL | **Level:** Beginner | **Minggu 3:** Mutations
> **Prerequisites:** Week 2 — **Queries**.

## Learning Objectives

- `mutation { addProduct(input: {...}) { id name } }` writes, `input` envelope, pick return fields (source: graphql.org/learn/mutations)
- Distinguish `query` (read) vs `mutation` (write) — writes sequential, reads may parallel

---

## Why This Matters (Non-IT)

Queries only read — adding products needs writing. Mutation = cashier writing receipts: send 1-envelope `input` → server saves → returns requested `id name` (no more). Unlike REST `POST` replying full objects.

---

## Program: Shop Writing Cashier

```graphql
# 1. Add product (input = envelope)
mutation {
  addProduct(input: { name: "Sugar", price: 15000, stock: 20 }) {
    id
    name
    price
  }
}
# Returns: { "data": { "addProduct": { "id": "4", "name": "Sugar", "price": 15000 } } }

# 2. Change price
mutation {
  changePrice(id: "4", price: 14000) {
    name
    price
  }
}

# 3. Delete (Boolean return)
mutation {
  deleteProduct(id: "4")
}
# Returns: { "data": { "deleteProduct": true } }

# 4. 2 writes at once (sequential! not parallel)
mutation Two {
  a: addProduct(input: { name: "Coffee", price: 12000, stock: 5 }) { id name }
  b: addProduct(input: { name: "Tea", price: 8000, stock: 5 }) { id name }
}
```

---

## Key Concepts

### `mutation` vs `query` = Write vs Read
`query` reads (may parallel), `mutation` writes (sequential 1-2-3).

### `input` = Envelope
`input: { name, price, stock }` 1 envelope, server opens + validates.

### Pick Returns = Savings
`{ id name }` → gets 2 fields only, not 10.

---

## Beginner Friendly Explanation

### Analogy: Cashier Writing Receipts
- **Query = view showcase**, **mutation = write receipt** (`addProduct`).
- **Input = form**: fill 1 sheet, hand over.

### Step 0 — Prepare Device
- Same as W1-W2: `GraphiQL`.

### How the Computer Reads It
1. `mutation { addProduct(input: {...}) { id } }` → resolver saves → replies `{ data: { addProduct: { id } } }`.
2. `deleteProduct` → replies `true/false`.

### 3 Must-Know Terms
1. **Mutation/input**: write/envelope
2. **Resolver**: writing waiter

---

## Experiments

- **Green:** `addProduct` without `price` → `required` error?
- **Yellow:** Ask return of only `id` → without `name`?
- **Red:** 2 `addProduct` aliases `a` + `b` → 2 different IDs?

---

## Challenge

**Complete Writing Shop:** `mutation` adds 2 products (`a`, `b`) → `query` verifies present → `mutation` edits 1 price → `query` verifies change. 4 sequential steps.
- **Link-up (Week 2 — Queries):** plug this challenge's result into that flow; make sure it runs end-to-end.

---
## Mini Glossary

- **Mutation/input/resolver**: write/envelope/waiter

---

## Summary

Week 3 of 5: **Write Shop** (Level: Beginner). Can add/edit/delete. Next: **Resolvers** — server kitchen.
