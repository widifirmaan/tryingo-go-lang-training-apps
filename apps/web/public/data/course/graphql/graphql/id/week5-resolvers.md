# Resolvers & Data Sources

> GraphQL | Modul 5

## Tujuan Pembelajaran

- Memahami resolver functions
- Menghubungkan resolver ke data sources
- Menggunakan resolver chaining untuk nested data
- Memahami resolver context

---

## Program: Resolver Logic

```graphql
const resolvers = {
  Query: {
    user: (_, { id }, { dataSources }) => {
      return dataSources.userAPI.getUserById(id);
    },
  },
  User: {
    posts: (user, _, { dataSources }) => {
      return dataSources.postAPI.getPostsByUserId(user.id);
    },
  },
};
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

Modul 5 dari 16: **Resolvers & Data Sources**. GraphQL adalah bahasa query API yang fleksibel dan efisien. Minggu depan: **6. Arguments & Parameters**.
