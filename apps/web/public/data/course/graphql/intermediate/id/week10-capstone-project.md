# Capstone: E-Commerce GraphQL

> **Kategori:** GraphQL | **Level:** Menengah | **Minggu 10:** Capstone: E-Commerce GraphQL

## Tujuan Pembelajaran

- Schema lengkap
- Pagination (Connection pattern)
- Auth directive
- Subscription
- Error handling

---

## Program: API Production-Ready

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

## Konsep Kunci

### Schema Design
Query, Mutation, Subscription type.

### Connection Pattern
Pagination dengan cursor-based.

### Auth Directive
Protect fields dengan @auth.

### Subscription
Realtime updates.

### Error Handling
Typed errors dengan extensions.

---

## Eksperimen

- Federation
- Schema stitching
- File upload
- Persisted queries

---

## Tantangan

Deploy GraphQL API: schema, resolvers, auth, pagination, testing.

---

## Ringkasan

Minggu 10 dari 10: **Capstone: E-Commerce GraphQL** (Menengah). Selesai!
