# Filosofi GraphQL vs REST: SDL, Scalar & Query Pertama

> **Kategori:** GraphQL | **Level:** Fondasi Skema & Eksekusi Query/Mutation | **Minggu 1:** Filosofi GraphQL vs REST: SDL, Scalar & Query Pertama
> ⏱️ **Estimasi Belajar:** 45 Menit (15m teori, 30m praktik) | 🔗 **Tingkat:** Terstruktur (Step-by-step)


## Tujuan Pembelajaran

- Memahami kelemahan arsitektur REST (Over-fetching dan Under-fetching) dan solusi GraphQL
- Menulis skema typeDefs menggunakan Schema Definition Language (SDL)
- Memahami sistem tipe bawaan GraphQL: Scalar (ID, String, Int, Float, Boolean) dan Non-Null modifier (!)
- Membangun server GraphQL mandiri dengan Apollo Server 4 dan fungsi resolver dasar

---

## Panduan Mulai Cepat (Quick Start): Setup & Inisialisasi Project

Sebelum mulai mendalami materi dan praktik kode di bawah, siapkan lingkungan pengembangan lokal Anda di komputer dengan langkah-langkah praktis berikut:

### 1. Persiapan Editor VS Code & Ekstensi Rekomendasi
Gunakan [Visual Studio Code](https://code.visualstudio.com/) sebagai code editor utama. Pasang ekstensi penting berikut:
- **GraphQL: Language Feature Support** (`graphql.vscode-graphql`): Syntax highlighting, validasi schema .graphql, dan autocomplete query

Atau instal semua ekstensi rekomendasi sekaligus via terminal:
```bash
code --install-extension graphql.vscode-graphql
```

---

### 2. Instalasi Runtime & Dependency (Node.js LTS (v20+))
Pastikan runtime atau SDK telah terpasang di sistem operasi Anda:

**Windows (PowerShell):**
```powershell
winget install OpenJS.NodeJS.LTS
```

**macOS (Terminal / Homebrew):**
```bash
brew install node
```

**Linux (Ubuntu/Debian / bash):**
```bash
sudo apt install nodejs npm
```

**Verifikasi Instalasi:**
Jalankan perintah berikut di terminal:
```bash
node -v && npm -v
```

Output yang diharapkan:
```output
v20.x.x
10.x.x
```

> 💡 **Tips Prasyarat:** GraphQL server dapat dibangun di atas runtime Node.js, Go, Python, maupun Java.

---

### 3. Inisialisasi Project Kosong (Scaffolding)
Buat folder dan kerangka awal project baru dengan perintah resmi:

```bash
mkdir my-graphql-api && cd my-graphql-api
npm init -y
npm install @apollo/server graphql
npm install -D typescript tsx @types/node
npx tsc --init
```
- **Keterangan:** Menyiapkan Apollo Server v4 standalone dengan eksekusi TypeScript instan.
- **Pindah ke direktori project:**
```bash
cd my-graphql-api
```

---

### 4. Menjalankan Server Lokal & File Titik Masuk Pertama
Jalankan server pengembangan lokal:

```bash
npx tsx src/index.ts
```
Akses di browser atau terminal: `http://localhost:4000`

> ℹ️ Buka http://localhost:4000 untuk mengakses Apollo Sandbox IDE.

**File Titik Masuk Utama (`src/index.ts`):**
```graphql
import { ApolloServer } from '@apollo/server';
import { startStandaloneServer } from '@apollo/server/standalone';

const typeDefs = `#graphql
  type User {
    id: ID!
    name: String!
    email: String!
  }

  type Query {
    users: [User!]!
    user(id: ID!): User
  }
`;

const resolvers = {
  Query: {
    users: () => [
      { id: '1', name: 'Alice', email: 'alice@example.com' },
      { id: '2', name: 'Bob', email: 'bob@example.com' }
    ],
    user: (_: unknown, args: { id: string }) => ({
      id: args.id,
      name: 'Alice',
      email: 'alice@example.com'
    })
  }
};

const server = new ApolloServer({ typeDefs, resolvers });
const { url } = await startStandaloneServer(server, { listen: { port: 4000 } });
console.log(`🚀 GraphQL Server siap di ${url}`);
```
Apollo Server standalone lengkap dengan typeDefs dan resolvers.

---

### 5. Struktur Direktori Proyek Baru
Struktur folder dan file standar yang dihasilkan:

```text
my-graphql-api/
├── src/
│   ├── schema.ts        # TypeDefs definisi SDL
│   ├── resolvers.ts     # Query & Mutation handlers
│   └── index.ts         # Bootstrap Apollo Server
├── tsconfig.json
└── package.json
```
Struktur modular pemisahan SDL Schema dan Resolvers.

---

### 6. Tips & Best Practice untuk Pemula
- Gunakan tag template `#graphql` agar ekstensi VS Code mengaktifkan syntax highlighting di dalam string.
- Gunakan Dataloader untuk mencegah masalah query N+1 pada resolver relasi.

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
```output
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
```output
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
```output
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
```output
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
