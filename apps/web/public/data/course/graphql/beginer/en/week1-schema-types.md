# Schema & Basic Types

> **Kategori:** GraphQL | **Level:** Beginner | **Minggu 1:** Schema & Basic Types

## Learning Objectives

- Understand Schema Definition Language
- Basic types: String, Int, Float, Boolean, ID
- Non-null types with !
- List types with []
- Enums and Scalars

---

## Program: First GraphQL Schema

```graphql
# Schema Definition Language (SDL)
type Query {
  # Get all products
  products: [Product!]!
  
  # Get product by ID
  product(id: ID!): Product
  
  # Search products
  searchProducts(keyword: String!): [Product!]!
  
  # Get current user
  me: User
}

type Product {
  id: ID!
  name: String!
  price: Float!
  stock: Int!
  category: Category!
  tags: [String!]
  inStock: Boolean!
}

type User {
  id: ID!
  name: String!
  email: String!
  role: UserRole!
}

type Category {
  id: ID!
  name: String!
  slug: String!
  products: [Product!]!
}

enum UserRole {
  ADMIN
  USER
  SELLER
}

scalar DateTime
```

---

## Key Concepts

### SDL
Schema Definition Language for defining data types.

### Basic Types
String, Int, Float, Boolean, ID.

### Non-null
! means required, cannot be null.

### Lists
[Type] for arrays. [Type!]! means non-null array of non-null.

### Enums
Limited set of allowed values.

---

## Experiments

- Add new types
- Create other enums
- Custom scalars
- Interfaces

---

## Challenge

E-commerce schema: Product, User, Category, Order.

---

## Summary

Week 1 of 10: **Schema & Basic Types** (Beginner).
