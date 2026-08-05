# Fragments & Interfaces

> GraphQL | Modul 8

## Tujuan Pembelajaran

- Membuat fragments untuk reusable query pieces
- Menggunakan interfaces dan union types
- Memahami inline fragments
- Mengorganisir query dengan fragments

---

## Program: Reusable Queries

```graphql
fragment UserFields on User {
  id
  name
  email
}

query GetUsers {
  users {
    ...UserFields
  }
}

interface Node {
  id: ID!
}

union SearchResult = User | Post | Comment
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

Modul 8 dari 16: **Fragments & Interfaces**. GraphQL adalah bahasa query API yang fleksibel dan efisien. Minggu depan: **9. Subscriptions & Realtime**.
