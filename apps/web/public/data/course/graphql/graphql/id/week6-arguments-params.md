# Arguments & Parameters

> GraphQL | Modul 6

## Tujuan Pembelajaran

- Menggunakan arguments pada query dan mutation
- Membuat argument dengan tipe data berbeda
- Menggunakan default values untuk arguments
- Memvalidasi arguments di resolver

---

## Program: Parameterized Queries

```graphql
type Query {
  user(id: ID!): User
  users(limit: Int = 10, offset: Int = 0): [User!]!
  searchUsers(query: String!): [User!]!
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

Modul 6 dari 16: **Arguments & Parameters**. GraphQL adalah bahasa query API yang fleksibel dan efisien. Minggu depan: **7. Nested Queries & Aliases**.
