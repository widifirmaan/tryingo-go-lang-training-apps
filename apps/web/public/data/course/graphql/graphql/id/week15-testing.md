# Testing GraphQL APIs

> GraphQL | Modul 15

## Tujuan Pembelajaran

- Menulis test untuk GraphQL resolvers
- Menggunakan Apollo Server testing utilities
- Testing queries, mutations, dan subscriptions
- Memahami integration testing

---

## Program: Test Suite

```graphql
const { ApolloServerTestClient } = require('apollo-server-testing');

test('returns user by id', async () => {
  const result = await server.executeOperation({
    query: 'query { user(id: "1") { name } }',
  });
  expect(result.data.user.name).toBe('Budi');
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

Modul 15 dari 16: **Testing GraphQL APIs**. GraphQL adalah bahasa query API yang fleksibel dan efisien. Minggu depan: **16. Capstone: Full GraphQL API**.
