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

## Ringkasan Sintaks & Quick Reference

| Perintah / Sintaks | Fungsi & Contoh Praktik |
| :--- | :--- |
| **Deklarasi & Inisialisasi** | Menyiapkan variabel, tipe data, atau struktur komponen awal |
| **Logika & Pemrosesan** | Menjalankan algoritma, kontrol alur, dan transformasi data |
| **Error Handling & Validasi** | Memastikan input valid dan menangani kegagalan sistem secara elegan |
| **Return / Output** | Mengembalikan hasil komputasi yang siap dikonsumsi pengguna/sistem |

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
