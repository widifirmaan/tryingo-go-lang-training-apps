# Pagination & Connections

> GraphQL | Modul 10

## Tujuan Pembelajaran

- Memahami cursor-based pagination
- Menggunakan Relay Connection specification
- Mengimplementasi pageInfo dan edges
- Membandingkan offset vs cursor pagination

---

## Program: Cursor Pagination

```graphql
type Query {
  users(first: Int!, after: String): UserConnection!
}

type UserConnection {
  edges: [UserEdge!]!
  pageInfo: PageInfo!
}

type UserEdge {
  cursor: String!
  node: User!
}

type PageInfo {
  hasNextPage: Boolean!
  endCursor: String
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

Modul 10 dari 16: **Pagination & Connections**. GraphQL adalah bahasa query API yang fleksibel dan efisien. Minggu depan: **11. Error Handling & Validation**.
