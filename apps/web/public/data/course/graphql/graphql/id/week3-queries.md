# Queries & Fetching Data

> GraphQL | Modul 3

## Tujuan Pembelajaran

- Menulis query untuk mengambil data
- Memahami field selection dan response shape
- Menggunakan aliases untuk field yang sama
- Memahami null handling dalam response

---

## Program: Read Operations

```graphql
query GetUser {
  user(id: "1") {
    name
    email
    posts {
      title
      body
    }
  }
}

query GetUsers {
  users {
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

Modul 3 dari 16: **Queries & Fetching Data**. GraphQL adalah bahasa query API yang fleksibel dan efisien. Minggu depan: **4. Mutations & Writing Data**.
