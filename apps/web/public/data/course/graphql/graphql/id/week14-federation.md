# Federation & Microservices

> GraphQL | Modul 14

## Tujuan Pembelajaran

- Memahami GraphQL Federation
- Menggunakan Apollo Federation untuk microservices
- Mendefinisikan federated schema
- Menggabungkan multiple subgraphs

---

## Program: Distributed Schema

```graphql
const { buildSubgraphSchema } = require('@apollo/subgraph');

const typeDefs = gql`
  extend schema @link(url: "https://specs.apollo.dev/federation/v2.0")

  type User @key(fields: "id") {
    id: ID!
    name: String!
  }
`;
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

Modul 14 dari 16: **Federation & Microservices**. GraphQL adalah bahasa query API yang fleksibel dan efisien. Minggu depan: **15. Testing GraphQL APIs**.
