# Schema Definition Language (SDL)

> GraphQL | Modul 2

## Tujuan Pembelajaran

- Memahami GraphQL SDL (Schema Definition Language)
- Mendefinisikan tipe object, query, dan mutation
- Menggunakan field types dan nullable/non-null
- Membuat schema yang valid

---

## Program: Defining Types

```graphql
type Query {
  user(id: ID!): User
  users: [User!]!
}

type User {
  id: ID!
  name: String!
  email: String!
  age: Int
  posts: [Post!]!
}

type Post {
  id: ID!
  title: String!
  body: String!
  author: User!
}
```

---

## Penjelasan

GraphQL adalah bahasa query untuk API yang memungkinkan client menentukan data yang dibutuhkan.
Schema mendefinisikan tipe data dan operasi yang tersedia.
Resolver menghubungkan field dalam schema ke data source.
GraphQL menggantikan REST dengan single endpoint dan fleksibilitas query.

---

## Eksperimen

- Ubah query dan lihat perubahan response
- Tambah tipe baru ke schema
- Coba nested query untuk data hierarkis

---

## Tantangan

Buat GraphQL API lengkap dengan query, mutation, dan subscription.
Implementasi authentication dan pagination.

---

## Ringkasan

Modul 2 dari 16: **Schema Definition Language (SDL)**. GraphQL adalah bahasa query API yang fleksibel dan efisien. Minggu depan: **3. Queries & Fetching Data**.
