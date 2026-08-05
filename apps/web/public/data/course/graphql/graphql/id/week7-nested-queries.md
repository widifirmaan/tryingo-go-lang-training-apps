# Nested Queries & Aliases

> GraphQL | Modul 7

## Tujuan Pembelajaran

- Menulis nested queries untuk data hierarkis
- Menggunakan aliases untuk beberapa query sekaligus
- Memahami query depth dan complexity
- Mengoptimasi nested queries dengan DataLoader

---

## Program: Complex Fetching

```graphql
query GetUserWithPosts {
  user(id: "1") {
    name
    posts {
      title
      comments {
        body
        author {
          name
        }
      }
    }
  }
}

query GetUserAndName {
  userDetails: user(id: "1") {
    name
  }
  userName: user(id: "1") {
    name
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

Modul 7 dari 16: **Nested Queries & Aliases**. GraphQL adalah bahasa query API yang fleksibel dan efisien. Minggu depan: **8. Fragments & Interfaces**.
