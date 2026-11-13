## Why This Matters

GraphQL replaces REST's "one endpoint, one data shape" with a single flexible query - used by GitHub, Shopify, and many payload-sensitive mobile apps. Great for products where the frontend keeps changing what data it needs.

Practice program: *"Creating Queries"*. Run the code in the Playground to examine how it works.


## Learning Objectives

- Basic queries
- Queries with parameters
- Variables ($variable)
- Fragments for reuse
- Nested queries

---

## Program: Creating Queries

```graphql
# Query: baca data (GET)

# Fragment untuk reuse field
fragment ProductFields on Product {
  id
  name
  price
  inStock
}

# Get semua produk (dengan fragment)
query GetAllProducts {
  products {
    ...ProductFields
    category
  }
}

# Get satu employee
query GetEmployee {
  employee(id: "1") {
    id
    name
    department
    skills
  }
}

# Search produk (argument)
query SearchProducts {
  searchProducts(keyword: "keyboard") {
    id
    name
    price
    inStock
  }
}

# Dengan variables (isi panel Variables):
# query GetProductById($id: ID!) {
#   product(id: $id) { id name price inStock }
# }
# { "id": "1" }
```

---

## Key Concepts

### Queries
Read data operations. Like GET in REST.

### Parameters
Queries accept typed parameters.

### Variables
Send variables separately from query.

### Fragments
Reuse sets of fields.

### Nested Queries
Query relations in one request.

---

## Experiments

- Field aliases
- Directives @skip/@include
- Multiple queries
- Inline fragments

---

## Challenge

Complete query: products with category and filter.

---

## Summary

Week 2 of 10: **Queries** (Beginner).
