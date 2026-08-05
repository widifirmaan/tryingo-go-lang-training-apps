# Authorization & Security

> GraphQL | Modul 12

## Tujuan Pembelajaran

- Mengimplementasi authentication di GraphQL
- Menggunakan context untuk user information
- Menerapkan authorization di resolver level
- Menggunakan directive untuk permission checks

---

## Program: Secure API

```graphql
const resolvers = {
  Query: {
    user: async (_, { id }, { user }) => {
      if (!user) throw new AuthenticationError('Not authenticated');
      if (user.role !== 'admin') throw new ForbiddenError('Admin only');
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

Modul 12 dari 16: **Authorization & Security**. GraphQL adalah bahasa query API yang fleksibel dan efisien. Minggu depan: **13. Performance & Caching**.
