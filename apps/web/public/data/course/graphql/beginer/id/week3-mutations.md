# Mutations

> **Kategori:** GraphQL | **Level:** Pemula | **Minggu 3:** Mutations

## Tujuan Pembelajaran

- Mutation dasar
- Input type
- Auth mutation (register/login)
- CRUD mutation
- Multiple mutations

---

## Program: Membuat Mutation

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

## Konsep Kunci

### Mutation
Operasi tulis/ubah data.

### Input Type
Tipe khusus untuk parameter mutation.

### Auth
Register dan login return token.

### CRUD
Create, Update, Delete dalam satu type Mutation.

### Multiple
Bisa jalankan multiple mutations sekaligus.

---

## Eksperimen

- Bulk mutation
- File upload
- Optimistic response
- Error handling

---

## Tantangan

Sistem registrasi dan CRUD produk.

---

## Ringkasan

Minggu 3 dari 10: **Mutations** (Pemula).
