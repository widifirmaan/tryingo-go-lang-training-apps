# Mutations & Writing Data

> GraphQL | Modul 4

## Tujuan Pembelajaran

- Menulis mutation untuk create, update, delete
- Memahami input types untuk mutation arguments
- Mengembalikan data yang baru dibuat/diubah
- Memahami mutation return types

---

## Program: Write Operations

```graphql
mutation CreateUser($name: String!, $email: String!) {
  createUser(name: $name, email: $email) {
    id
    name
    email
  }
}

mutation UpdateUser($id: ID!, $name: String) {
  updateUser(id: $id, name: $name) {
    id
    name
    email
  }
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

Modul 4 dari 16: **Mutations & Writing Data**. GraphQL adalah bahasa query API yang fleksibel dan efisien. Minggu depan: **5. Resolvers & Data Sources**.
