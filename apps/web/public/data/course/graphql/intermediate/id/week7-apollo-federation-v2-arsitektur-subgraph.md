# Apollo Federation v2 & Arsitektur Microservices

> **Kategori:** GraphQL | **Level:** Real-Time Subscriptions, Keamanan & Federation | **Minggu 7:** Apollo Federation v2 & Arsitektur Microservices

## Tujuan Pembelajaran

- Memahami evolusi dari GraphQL Monolith menuju arsitektur GraphQL Terdistribusi (Apollo Federation v2)
- Mendefinisikan Federated Entities menggunakan directive `@key(fields: "...")`
- Mengimplementasikan Reference Resolver `__resolveReference` untuk resolusi entitas lintas layanan
- Memperluas entitas dari subgraph lain tanpa memicu keterikatan langsung (loose coupling)

---

## Program: Deklarasi Subgraph Federasi dengan Directive @key dan Ekstensi Entitas Lintas Layanan

```typescript
// ============================================================================
// SUBGRAPH 1: Products Service (Runs as independent Microservice on Port 4001)
// ============================================================================
import { ApolloServer } from '@apollo/server';
import { buildSubgraphSchema } from '@apollo/subgraph';
import gql from 'graphql-tag';

const productsTypeDefs = gql`
  extend schema
    @link(url: "https://specs.apollo.dev/federation/v2.0", import: ["@key", "@shareable"])

  # Product is a federated Entity keyed by its primary identifier 'id'
  type Product @key(fields: "id") {
    id: ID!
    sku: String!
    title: String!
    price: Float!
  }

  type Query {
    products: [Product!]!
  }
`;

const productsResolvers = {
  Query: {
    products: () => [
      { id: 'prod_001', sku: 'MCK-01', title: 'Mechanical Keyboard Pro', price: 1200000 },
    ],
  },
  Product: {
    // Reference Resolver: Resolves entity when queried across OTHER subgraphs!
    __resolveReference: (reference: { id: string }) => {
      return { id: reference.id, sku: 'MCK-01', title: 'Mechanical Keyboard Pro', price: 1200000 };
    },
  },
};

const productsServer = new ApolloServer({
  schema: buildSubgraphSchema({ typeDefs: productsTypeDefs, resolvers: productsResolvers }),
});

// ============================================================================
// SUBGRAPH 2: Reviews Service (Runs independently on Port 4002)
// Extends Product entity without touching Products database!
// ============================================================================
const reviewsTypeDefs = gql`
  extend schema
    @link(url: "https://specs.apollo.dev/federation/v2.0", import: ["@key"])

  # Extend Product entity by adding reviews field
  type Product @key(fields: "id") {
    id: ID!
    reviews: [Review!]!
  }

  type Review {
    id: ID!
    rating: Int!
    body: String!
  }
`;

const reviewsResolvers = {
  Product: {
    reviews: (parent: { id: string }) => {
      return [{ id: 'rev_101', rating: 5, body: 'Superb tactile feedback!' }];
    },
  },
};

export { productsTypeDefs, productsResolvers, reviewsTypeDefs, reviewsResolvers };
```

---

## Konsep Kunci

### Mengapa Apollo Federation v2?
Dalam organisasi skala besar dengan puluhan tim pengembang (misal: Tim Produk, Tim Pembayaran, Tim Ulasan), membangun satu server GraphQL monolitik raksasa menimbulkan kekacauan: konflik *merge* repositori, peluncuran deployment yang saling tergantung, dan kegagalan satu fungsi dapat melumpuhkan seluruh API.
**Apollo Federation v2** memecah skema besar menjadi layanan-layanan mikro mandiri yang disebut **Subgraphs**. Sebuah **Router Gateway** pintar menyatukan seluruh subgraph menjadi satu **Supergraph** terpadu yang tampak seperti satu API tunggal bagi klien frontend.

### Entitas Terdistribusi dan Directive @key
Di Federation, sebuah tipe data dapat dimiliki oleh satu subgraph dan diperluas oleh subgraph lainnya.
- `@key(fields: "id")`: Menandai tipe `Product` sebagai **Federated Entity**. Kunci `id` adalah pengenal unik entitas ini di seluruh ekosistem microservices.
- **Subgraph Products**: Bertanggung jawab atas data inti produk (`sku, title, price`).
- **Subgraph Reviews**: Mengembangkan tipe `Product` yang sama dengan menambahkan field `reviews`, tanpa perlu mengakses database produk secara langsung!

### Cara Kerja Gateway dan __resolveReference
Saat klien meminta: `{ products { title reviews { rating } } }`:
1. Gateway meminta `title` dan `id` produk ke Subgraph Products.
2. Gateway mengambil daftar `id` tersebut dan mengirimkannya ke Subgraph Reviews.
3. Subgraph Reviews menjalankan fungsi `__resolveReference` untuk melengkapi (*hydrate*) field ulasan berdasarkan `id` yang diterima.
Seluruh proses koordinasi jaringan ini ditangani otomatis oleh Gateway secara transparan.

---

---

## Penjelasan untuk Pemula

Bayangkan Apollo Federation seperti majalah mingguan bergengsi.
Tim Jurnalis menulis artikel utama (Subgraph Produk). Tim Fotografer menyediakan foto-foto keren (Subgraph Ulasan). 
Masing-masing tim bekerja di gedungnya sendiri-sendiri tanpa saling mengganggu.

Sebelum majalah dicetak dan sampai ke tangan pembaca, Pemimpin Redaksi (Router Gateway) menyatukan teks jurnalis dan foto fotografer ke dalam satu lembar majalah yang utuh dan indah!

## Eksperimen

- Inspeksi skema Supergraph hasil komposisi menggunakan tool rover subgraph check / compose
- Simulasikan resolver __resolveReference dengan memanggil query entity representation secara manual
- Gunakan directive @shareable agar field dapat diselesaikan oleh lebih dari satu subgraph secara sah
- Amati query execution plan di Apollo Router yang menampilkan pemecahan query ke dua subgraph terpisah

---

## Tantangan

Buat Subgraph ke-3: `Users Subgraph` yang memiliki entity `User @key(fields: "id")`. Perluas tipe `Review` di Reviews Subgraph agar field `author` merujuk ke entity `User` federasi.

---

## Ringkasan

Anda telah menguasai arsitektur GraphQL terdistribusi Apollo Federation v2: deklarasi entitas dengan @key, penyusunan subgraph mandiri, orkestrasi __resolveReference, dan komposisi supergraph.
