# Schema & Tipe Dasar

> **Kategori:** GraphQL | **Level:** Pemula | **Minggu 1:** Schema & Tipe Dasar

## Tujuan Pembelajaran

- Memahami Schema Definition Language
- Tipe dasar: String, Int, Float, Boolean, ID
- Tipe non-null dengan !
- Tipe list dengan []
- Enum dan Scalar

---

## Program: GraphQL Schema Pertama

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

## Konsep Kunci

### SDL
Schema Definition Language untuk mendefinisikan tipe data.

### Tipe Dasar
String, Int, Float, Boolean, ID.

### Non-null
! berarti wajib ada, tidak boleh null.

### List
[Type] untuk array. [Type!]! berarti array non-null berisi non-null.

### Enum
Nilai terbatas yang bisa dipilih.

---

## Eksperimen

- Tambah tipe baru
- Buat enum lain
- Scalar custom
- Interface

---

## Tantangan

Schema e-commerce: Product, User, Category, Order.

---

## Ringkasan

Minggu 1 dari 10: **Schema & Tipe Dasar** (Pemula).
