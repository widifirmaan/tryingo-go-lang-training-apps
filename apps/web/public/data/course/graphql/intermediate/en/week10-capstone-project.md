# Capstone: E-Commerce GraphQL

> **Kategori:** GraphQL | **Level:** Intermediate | **Minggu 10:** Capstone: E-Commerce GraphQL

## Learning Objectives

- Complete schema
- Pagination (Connection pattern)
- Auth directives
- Subscriptions
- Error handling

---

## Program: Production-Ready API

```graphql
# CAPSTONE: E-Commerce GraphQL API

# Schema lengkap
type Query {
  # Products
  products(
    filter: ProductFilter
    pagination: PaginationInput
    sort: SortInput
  ): ProductConnection!
  product(id: ID!): Product
  
  # Orders
  myOrders: [Order!]!
  order(id: ID!): Order
  
  # User
  me: User
}

type Mutation {
  # Auth
  register(input: RegisterInput!): AuthPayload!
  login(input: LoginInput!): AuthPayload!
  
  # Products
  createProduct(input: CreateProductInput!): Product! @auth(requires: SELLER)
  updateProduct(id: ID!, input: UpdateProductInput!): Product! @auth
  deleteProduct(id: ID!): Boolean! @auth(requires: ADMIN)
  
  # Orders
  createOrder(input: CreateOrderInput!): Order! @auth
  cancelOrder(id: ID!): Order! @auth
  
  # Cart
  addToCart(input: AddToCartInput!): Cart! @auth
  removeFromCart(productId: ID!): Cart! @auth
  checkout: Order! @auth
}

type Subscription {
  productCreated: Product!
  orderStatusChanged(orderId: ID!): Order!
}

type ProductConnection {
  edges: [Product!]!
  totalCount: Int!
  pageInfo: PageInfo!
}

type PageInfo {
  hasNextPage: Boolean!
  endCursor: String
}
```

---

## Key Concepts

### Schema Design
Query, Mutation, Subscription types.

### Connection Pattern
Cursor-based pagination.

### Auth Directives
Protect fields with @auth.

### Subscriptions
Realtime updates.

### Error Handling
Typed errors with extensions.

---

## Experiments

- Federation
- Schema stitching
- File uploads
- Persisted queries

---

## Challenge

Deploy GraphQL API: schema, resolvers, auth, pagination, testing.

---

## Summary

Week 10 of 10: **Capstone: E-Commerce GraphQL** (Intermediate). Complete!
