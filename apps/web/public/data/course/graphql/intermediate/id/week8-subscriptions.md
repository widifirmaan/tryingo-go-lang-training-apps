# Subscriptions — Bel Live Warung GraphQL

> **Kategori:** GraphQL | **Level:** Menengah | **Minggu 8:** Subscriptions
> **Prasyarat:** Minggu 7 — **DataLoader & N+1**.

## Tujuan Pembelajaran

- `type Subscription { stokHabis: Produk }` + `pubsub.asyncIterator` — server dorong, bukan client tanya (sumber: apollographql.com/docs/apollo-server/data/subscriptions)

---

## Kenapa Ini Penting Buat Kamu?

Tanpa subscription, HP refresh tiap 5 detik cek stok (boros baterai + kuota). Dengan subscription (WebSocket), stok habis → HP bunyi detik itu juga.

---

## Program: Bel Stok Warung

```javascript
// Server
const { PubSub } = require("graphql-subscriptions");
const pubsub = new PubSub();

const typeDefs = `#graphql
  type Subscription { stokHabis: Produk }
  type Mutation { jual(id: ID!): Produk }
`;

// Saat jual sampai 0 → siar!
const resolvers = {
  Mutation: {
    jual: (_, { id }) => {
      const p = kurangiStok(id);
      if (p.stok === 0) pubsub.publish("STOK_HABIS", { stokHabis: p });
      return p;
    },
  },
  Subscription: {
    stokHabis: { subscribe: () => pubsub.asyncIterator(["STOK_HABIS"]) },
  },
};
```

```graphql
# HP (sekali, dengar terus):
subscription {
  stokHabis { nama }
}
```

---

## Konsep Kunci

### Query/Mutation/Subscription = Tanya/Tulis/Dengar
Query tarik, subscription dorong (WebSocket tetap buka).

### `publish` + `asyncIterator` = Siar + Dengar
`publish("TOPIK", data)` siar, `asyncIterator(["TOPIK"])` dengar.

---

## Penjelasan untuk Pemula

### Analogi: Bel Pintu vs Ketok Tiap Detik
- **Polling = ketok tiap 5 detik** ("ada paket?").
- **Subscription = bel pintu**: paket datang → bel bunyi.

### 3 Istilah Wajib
1. **Subscription/publish**: dengar/siar
2. **WebSocket**: telepon-tersambung

---

## Eksperimen

- **Hijau:** Buka 2 tab subscription → jual sampai 0 → keduanya bunyi?
- **Kuning:** Tanpa `publish` → sunyi? (Wajar, tidak ada siar.)
- **Merah:** Refresh tiap 5 detik (polling) vs subscription → baterai/kuota mana boros?

---

## Tantangan

**Warung Live:** `stokHabis` subscription + `jual` publish saat 0 + 2 tab dengar bareng screenshot.

---

## Glosarium Mini

- **Subscription/publish**: dengar/siar

---

## Ringkasan

Minggu 8 dari 10: **Bel Live** (Level: Menengah). Dorong, bukan tanya. Minggu depan: **Testing**.
