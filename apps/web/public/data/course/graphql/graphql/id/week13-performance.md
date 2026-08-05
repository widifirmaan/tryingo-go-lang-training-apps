# Performance & Caching

> GraphQL | Modul 13

## Tujuan Pembelajaran

- Menggunakan DataLoader untuk batching
- Implementing caching layer
- Memahami N+1 query problem
- Mengoptimasi resolver performance

---

## Program: Optimization

```graphql
const DataLoader = require('dataloader');

const userLoader = new DataLoader(async (keys) => {
  const users = await db.users.findMany({ where: { id: { in: keys } } });
  return keys.map(key => users.find(u => u.id === key));
});
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

Modul 13 dari 16: **Performance & Caching**. GraphQL adalah bahasa query API yang fleksibel dan efisien. Minggu depan: **14. Federation & Microservices**.
