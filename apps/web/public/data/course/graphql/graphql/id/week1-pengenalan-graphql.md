# Pengenalan GraphQL & Setup

> GraphQL | Modul 1

## Tujuan Pembelajaran

- Memahami GraphQL sebagai alternatif REST API
- Menginstall GraphQL server (Apollo Server)
- Memahami konsep schema, query, dan resolver
- Menjalankan GraphQL server dan menguji di GraphQL Playground

---

## Program: Hello GraphQL

```graphql
const { ApolloServer, gql } = require('apollo-server');

const typeDefs = gql`
  type Query {
    hello: String
  }
`;

const resolvers = {
  Query: {
    hello: () => 'Hello, GraphQL!',
  },
};

const server = new ApolloServer({ typeDefs, resolvers });
server.listen().then(({ url }) => console.log('Server ready at ' + url));
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

Modul 1 dari 16: **Pengenalan GraphQL & Setup**. GraphQL adalah bahasa query API yang fleksibel dan efisien. Minggu depan: **2. Schema Definition Language (SDL)**.
