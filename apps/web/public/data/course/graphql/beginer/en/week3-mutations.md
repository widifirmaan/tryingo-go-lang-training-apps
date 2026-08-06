# Mutations

> **Kategori:** GraphQL | **Level:** Beginner | **Minggu 3:** Mutations

## Learning Objectives

- Basic mutations
- Input types
- Auth mutations (register/login)
- CRUD mutations
- Multiple mutations

---

## Program: Creating Mutations

```graphql
# Mutation: tulis/ubah data (POST/PUT/DELETE)

type Mutation {
  # Auth
  register(input: RegisterInput!): AuthPayload!
  login(input: LoginInput!): AuthPayload!
  
  # Product CRUD
  createProduct(input: CreateProductInput!): Product!
  updateProduct(id: ID!, input: UpdateProductInput!): Product!
  deleteProduct(id: ID!): Boolean!
  
  # Order
  createOrder(input: CreateOrderInput!): Order!
  cancelOrder(id: ID!): Order!
}

type AuthPayload {
  token: String!
  user: User!
}

input RegisterInput {
  name: String!
  email: String!
  password: String!
  role: UserRole
}

input LoginInput {
  email: String!
  password: String!
}

input CreateProductInput {
  name: String!
  price: Float!
  stock: Int!
  categoryId: ID!
  tags: [String!]
}
```

---

## Key Concepts

### Mutations
Write/modify data operations.

### Input Types
Special types for mutation parameters.

### Auth
Register and login return tokens.

### CRUD
Create, Update, Delete in one Mutation type.

### Multiple
Run multiple mutations at once.

---

## Experiments

- Bulk mutations
- File uploads
- Optimistic responses
- Error handling

---

## Challenge

Registration system and product CRUD.

---

## Summary

Week 3 of 10: **Mutations** (Beginner).
