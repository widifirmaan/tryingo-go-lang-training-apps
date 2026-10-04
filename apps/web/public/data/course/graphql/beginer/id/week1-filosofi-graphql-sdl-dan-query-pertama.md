# Filosofi GraphQL vs REST: SDL, Scalar & Query Pertama

> **Kategori:** GraphQL | **Level:** Fondasi Skema & Eksekusi Query/Mutation | **Minggu 1:** Filosofi GraphQL vs REST: SDL, Scalar & Query Pertama
> ⏱️ **Estimasi Belajar:** 45 Menit (15m teori, 30m praktik) | 🔗 **Tingkat:** Terstruktur (Step-by-step)


## Tujuan Pembelajaran

- Memahami kelemahan arsitektur REST (Over-fetching dan Under-fetching) dan solusi GraphQL
- Menulis skema typeDefs menggunakan Schema Definition Language (SDL)
- Memahami sistem tipe bawaan GraphQL: Scalar (ID, String, Int, Float, Boolean) dan Non-Null modifier (!)
- Membangun server GraphQL mandiri dengan Apollo Server 4 dan fungsi resolver dasar

---

## Program: Server GraphQL Mandiri dengan Apollo Server v4 dan Schema Definition Language

```typescript
import { ApolloServer } from '@apollo/server';
import { startStandaloneServer } from '@apollo/server/standalone';

// 1. Schema Definition Language (SDL) defines strict contract
const typeDefs = `#graphql
  # Enumeration of order statuses
  enum OrderStatus {
    PENDING
    PAID
    SHIPPED
    CANCELLED
  }

  # Product entity
  type Product {
    id: ID!
    sku: String!
    title: String!
    price: Float!
    inStock: Boolean!
  }

  # Customer entity
  type Customer {
    id: ID!
    email: String!
    fullName: String!
  }

  # Root Query Type - Ingress entry point for all reads
  type Query {
    products(limit: Int): [Product!]!
    product(id: ID!): Product
    me: Customer
  }
`;

// Mock database storage
const PRODUCTS_DB = [
  { id: 'prod_1', sku: 'LAP-001', title: 'ThinkBook Ultra', price: 16500000.0, inStock: true },
  { id: 'prod_2', sku: 'MOU-002', title: 'Wireless Ergonomic Mouse', price: 350000.0, inStock: false },
];

// 2. Resolvers mirror schema shape
const resolvers = {
  Query: {
    products: (_parent: unknown, args: { limit?: number }) => {
      if (args.limit) {
        return PRODUCTS_DB.slice(0, args.limit);
      }
      return PRODUCTS_DB;
    },
    product: (_parent: unknown, args: { id: string }) => {
      return PRODUCTS_DB.find((p) => p.id === args.id) || null;
    },
    me: () => ({
      id: 'cust_99',
      email: 'alex.developer@example.com',
      fullName: 'Alex Iskandar',
    }),
  },
};

// 3. Instantiate and start Apollo Server 4
const server = new ApolloServer({ typeDefs, resolvers });

const { url } = await startStandaloneServer(server, {
  listen: { port: 4000 },
});

console.log(`🚀 GraphQL Gateway ready at ${url}`);
```

---


---

## Uji Coba Query di Playground

Jalankan query GraphQL berikut langsung pada panel playground di samping untuk mengamati bagaimana GraphQL hanya mengembalikan field yang Anda minta tanpa over-fetching:

```graphql
# Week 1: Query Pertama - Mengambil Katalog Produk
query GetProductsCatalog {
  products {
    id
    name
    category
    price
    inStock
  }
}
```

## Konsep Kunci

### Mengapa GraphQL Diciptakan? Solusi Over-fetching & Under-fetching
Pada arsitektur REST tradisional:
- **Over-fetching**: Klien seluler hanya butuh menampilkan nama produk, namun endpoint `GET /api/products/1` mengembalikan 50 field database yang boros kuota internet.
- **Under-fetching (Waterfall Network Requests)**: Untuk menampilkan halaman detail pesanan, aplikasi harus memanggil `GET /orders/123`, lalu `GET /customers/45`, lalu `GET /products/99`.
**GraphQL** membalik paradigma ini: Klien secara deklaratif meminta field persis yang mereka butuhkan dalam satu kali permintaan HTTP POST, dan server mengembalikan JSON dengan bentuk yang 100% identik dengan query klien.

### Schema-First Development dan SDL
GraphQL menganut prinsip kontrak yang ketat (*Strongly Typed*). **SDL (Schema Definition Language)** mendefinisikan bahasa kontrak universal antara frontend dan backend.
- `ID!`: Tipe pengidentifikasi unik (diserialisasi sebagai string). Tanda seru (`!`) berarti **Non-Null** (server menjamin field ini tidak akan pernah bernilai `null`).
- `[Product!]!`: Array yang tidak boleh bernilai null, dan elemen di dalamnya juga dijamin bukan null.

### Hubungan Tipe dan Resolver
Server GraphQL memetakan setiap field di dalam SDL ke sebuah fungsi eksekusi yang disebut **Resolver**. Resolver bertanggung jawab mengambil data dari sumber aslinya (database PostgreSQL, MongoDB, cache Redis, atau REST API pihak ketiga).

---

---

## Penjelasan untuk Pemula

Bayangkan REST API seperti memesan paket makanan cepat saji tetap: jika Anda memesan Paket A, Anda dipaksa menerima burger, kentang, dan minuman soda meskipun Anda hanya haus dan cuma butuh sedotan (Over-fetching).

GraphQL seperti restoran prasmanan mewah: Anda membawa piring kosong dan pelayan hanya mengambilkan apa yang Anda tunjuk dengan sendok takar yang tepat. Tidak ada makanan terbuang, dan Anda mendapatkan semua makanan di satu piring dalam satu kali jalan!

## Eksperimen

- Buka Apollo Studio Sandbox di browser pada http://localhost:4000 dan jalankan query { products { title price } }
- Coba minta field yang tidak ada di skema (misal: description) dan amati validasi error kompilasi GraphQL
- Hapus tanda seru ! dari tipe Float pada skema dan amati bagaimana skema mengizinkan nilai null
- Uji query produk dengan argumen { products(limit: 1) { id title } }

---

## Tantangan

Tambahkan tipe `Category` pada SDL dengan relasi ke `Product`, dan implementasikan resolver untuk query `categories: [Category!]!` yang mengembalikan daftar kategori produk.

---

## Model Mental & Diagram Alur Visual

![Diagram Perbandingan Arsitektur REST vs GraphQL Query Execution](/diagrams/rest-vs-graphql.svg)

```diagram
┌─────────────────────────────────────────────────────────┐
│ CLIENT: Mengirim 1 Query Deklaratif (Spesifik Field)    │
│ POST /graphql { query { user { id name orders { id } } }│
└────────────────────────────┬────────────────────────────┘
                             │
                             ▼
┌─────────────────────────────────────────────────────────┐
│ GRAPHQL SERVER: Skema SDL & Pohon Resolver              │
│ 1. Resolves Query.user -> Panggil DB Pengguna           │
│ 2. Resolves User.orders -> Panggil Service Transaksi    │
└────────────────────────────┬────────────────────────────┘
                             │
                             ▼
┌─────────────────────────────────────────────────────────┐
│ HASIL: JSON Murni Berbentuk Sama Persis dengan Query   │
│ { "data": { "user": { "name": "Alex", "orders": [...] }}}│
└─────────────────────────────────────────────────────────┘
```

---

## Panduan Sintaks & Referensi Lengkap (W3Schools Style)

Berikut adalah rincian sintaks, parameter, nilai kembalian, dan contoh penggunaan praktis yang diperkenalkan pada modul ini:

### 1. `type Entity { id: ID! name: String! }`
- **Fungsi Utama:** Schema Definition Language (SDL) Tipe Entitas.
- **Parameter / Atribut:** `Field Name, Type, Non-Null Modifier (!)`.
- **Perilaku & Efek Sistem:** Mendefinisikan kontrak tipe data yang dijamin oleh server kepada seluruh klien API..
- **Contoh Penggunaan Praktis:**
```graphql
type Product {
  id: ID!
  name: String!
  price: Float!
  inStock: Boolean!
}
```
- **Hasil Output yang Diharapkan:**
```text
Mendefinisikan tipe Product dalam skema SDL
```

### 2. `type Query { products: [Product!]! }`
- **Fungsi Utama:** Root Query Type gerbang pembacaan data.
- **Parameter / Atribut:** `Field Resolver Signature`.
- **Perilaku & Efek Sistem:** Menjadi pintu masuk semua operasi pembacaan data yang dapat diminta oleh klien..
- **Contoh Penggunaan Praktis:**
```graphql
type Query {
  products(limit: Int): [Product!]!
  product(id: ID!): Product
}
```
- **Hasil Output yang Diharapkan:**
```text
Klien dapat meminta daftar produk dengan filter limit
```

### 3. `mutation CreateOrder($input: OrderInput!)`
- **Fungsi Utama:** Operasi perubahan data atomik.
- **Parameter / Atribut:** `GraphQL variables, Input Object Type`.
- **Perilaku & Efek Sistem:** Mengirimkan data perubahan ke server dan meminta field balasan yang diperbarui secara atomik..
- **Contoh Penggunaan Praktis:**
```graphql
mutation AddOrder {
  createOrder(customer: "Alex", items: [{ product: "Hub", qty: 1 }]) {
    id
    total
    status
  }
}
```
- **Hasil Output yang Diharapkan:**
```text
Pesanan dibuat dan ID beserta status langsung dikembalikan
```

### 4. `resolvers = { Query: { field: (parent, args, ctx) => ... } }`
- **Fungsi Utama:** Fungsi Resolver pemetaan data.
- **Parameter / Atribut:** `parent, args, context, info`.
- **Perilaku & Efek Sistem:** Fungsi backend yang mengeksekusi pengambilan data dari database untuk setiap field skema..
- **Contoh Penggunaan Praktis:**
```typescript
const resolvers = {
  Query: {
    product: (_, { id }, { db }) => db.products.findById(id)
  }
};
```
- **Hasil Output yang Diharapkan:**
```text
Resolver mengambil data dari database sesuai argumen id
```

---

## Jebakan Umum & Debugging (Common Pitfalls)

### 1. Query Bersarang Tanpa Batas (Denial of Service)
- **Gejala / Masalah:** Pengguna jahat mengirim query rekursif tak terhingga yang merubuhkan server backend.
- **Penyebab Utama:** Logika atau asumsi yang sering keliru pada tahap awal implementasi.
- **Solusi Tepat:** Terapkan middleware pembatas kedalaman (*depth limiting*) dan kalkulasi biaya query (*query complexity*).

### 2. N+1 Problem pada Resolver Lapangan
- **Gejala / Masalah:** Resolver anak memanggil database secara berulang untuk setiap objek induk dalam array.
- **Penyebab Utama:** Logika atau asumsi yang sering keliru pada tahap awal implementasi.
- **Solusi Tepat:** Gunakan pustaka `DataLoader` untuk menggabungkan (*batching*) dan menyimpan cache pemanggilan database.

### 3. Menyerahkan Seluruh Error Internal ke Klien
- **Gejala / Masalah:** Stack trace sensitif database dan password dapat terbaca oleh publik di response error.
- **Penyebab Utama:** Logika atau asumsi yang sering keliru pada tahap awal implementasi.
- **Solusi Tepat:** Filter pesan error di tingkat server formatError sebelum dikirimkan kembali ke klien.

---

## Ringkasan

Anda telah memahami perbedaan fundamental GraphQL vs REST, menulis kontrak SDL dengan scalar types dan non-null assertions, serta menjalankan server Apollo Server 4 mandiri.
