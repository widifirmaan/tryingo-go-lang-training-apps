# Error Handling & Validation

> GraphQL | Modul 11

## Tujuan Pembelajaran

- Menangani error di GraphQL
- Menggunakan custom error types
- Implementing input validation
- Menggunakan middleware untuk error handling

---

## Program: Validation Logic

```graphql
const resolvers = {
  Query: {
    user: (_, { id }) => {
      if (!id) {
        throw new UserInputError('ID is required', { invalidArgs: ['id'] });
      }
      return getUser(id);
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

Modul 11 dari 16: **Error Handling & Validation**. GraphQL adalah bahasa query API yang fleksibel dan efisien. Minggu depan: **12. Authorization & Security**.
