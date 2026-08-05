# Subscriptions & Realtime

> GraphQL | Modul 9

## Tujuan Pembelajaran

- Memahami GraphQL subscriptions
- Mengimplementasi WebSocket untuk real-time
- Menggunakan pub/sub untuk event broadcasting
- Membangun chat fitur real-time

---

## Program: Real-time Updates

```graphql
type Subscription {
  postAdded: Post!
  commentAdded(postId: ID!): Comment!
}

const resolvers = {
  Subscription: {
    postAdded: {
      subscribe: withFilter(
        (_, __, { pubsub }) => pubsub.asyncIterator('POST_ADDED'),
        (payload, variables) => payload.postAdded.authorId === variables.userId
      ),
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

Modul 9 dari 16: **Subscriptions & Realtime**. GraphQL adalah bahasa query API yang fleksibel dan efisien. Minggu depan: **10. Pagination & Connections**.
