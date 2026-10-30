# Queries

> **Kategori:** GraphQL | **Level:** Beginner | **Minggu 2:** Queries

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
