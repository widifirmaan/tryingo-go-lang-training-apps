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

# Get semua produk
query GetAllProducts {
  products {
    id
    name
    price
    inStock
  }
}

# Get produk by ID
query GetProduct($id: ID!) {
  product(id: $id) {
    id
    name
    price
    stock
    category {
      name
      slug
    }
  }
}

# Search produk
query SearchProducts($keyword: String!) {
  searchProducts(keyword: $keyword) {
    id
    name
    price
    inStock
  }
}

# Fragment untuk reuse field
fragment ProductFields on Product {
  id
  name
  price
  stock
  inStock
}

query GetProductsWithFragment {
  products {
    ...ProductFields
    category {
      name
    }
  }
}

# Variables
# {
#   "id": "1",
#   "keyword": "laptop"
# }
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
