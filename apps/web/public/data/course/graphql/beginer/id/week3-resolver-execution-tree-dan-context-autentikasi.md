# Resolver Execution Tree & Context Autentikasi

> **Kategori:** GraphQL | **Level:** Fondasi Skema & Eksekusi Query/Mutation | **Minggu 3:** Resolver Execution Tree & Context Autentikasi
> ⏱️ **Estimasi Belajar:** 45 Menit (15m teori, 30m praktik) | 🔗 **Tingkat:** Terstruktur (Step-by-step)


## Tujuan Pembelajaran

- Memahami cara kerja pohon eksekusi resolver hierarkis (*Resolver Execution Tree*)
- Menguasai empat parameter resolver: parent (root), args, context, dan info
- Menginjeksikan metadata request (token JWT, session, connection) ke dalam GraphQL Context
- Melempar exception terstruktur dengan GraphQLError dan extension code

---

## Program: Pohon Eksekusi Resolver Bertingkat dengan Validasi JWT Context

```typescript
import { ApolloServer } from '@apollo/server';
import { GraphQLError } from 'graphql';

const typeDefs = `#graphql
  type User {
    id: ID!
    username: String!
    email: String!
  }

  type Review {
    id: ID!
    rating: Int!
    comment: String!
    author: User! # Nested relational field resolved independently!
  }

  type Item {
    id: ID!
    name: String!
    price: Float!
    reviews: [Review!]! # Nested array resolver
  }

  type Query {
    item(id: ID!): Item
  }
`;

// Context Interface injected per request
interface GraphQLContext {
  currentUser: { id: string; username: string; role: string } | null;
}

// 4-Tier Resolver Architecture: (parent, args, context, info)
const resolvers = {
  Query: {
    item: (_parent: unknown, args: { id: string }) => {
      // Root level query resolver fetches the Item
      return { id: args.id, name: 'Pro Wireless Keyboard', price: 890000.0 };
    },
  },
  Item: {
    // Nested resolver for Item.reviews: 'parent' is the Item object resolved above!
    reviews: (parent: { id: string }, _args: unknown, context: GraphQLContext) => {
      // Guard sensitive data with request context
      if (!context.currentUser) {
        throw new GraphQLError('Authentication required to view item reviews.', {
          extensions: { code: 'UNAUTHENTICATED', http: { status: 401 } },
        });
      }

      return [
        { id: 'rev_1', rating: 5, comment: 'Tactile switches feel incredible!', authorId: 'usr_88' },
        { id: 'rev_2', rating: 4, comment: 'Great battery life.', authorId: 'usr_99' },
      ];
    },
  },
  Review: {
    // Nested resolver for Review.author: 'parent' is the Review object!
    author: (parent: { authorId: string }) => {
      const USERS_DB: Record<string, { id: string; username: string; email: string }> = {
        usr_88: { id: 'usr_88', username: 'keyboard_enthusiast', email: 'ke@example.com' },
        usr_99: { id: 'usr_99', username: 'coder_budi', email: 'budi@example.com' },
      };
      return USERS_DB[parent.authorId];
    },
  },
};

export { typeDefs, resolvers, GraphQLContext };
```

---


---

## Uji Coba Resolver Parameter di Playground

Jalankan query berparameter ID berikut di playground untuk melihat bagaimana fungsi resolver menangkap argumen spesifik:

```graphql
# Week 3: Resolver Arguments - Profil Karyawan Berdasarkan ID
query GetEmployeeProfile {
  employee(id: "1") {
    id
    name
    department
    salary
    skills
    active
  }
}
```

## Konsep Kunci

### Anatomi Empat Parameter Resolver
Setiap fungsi resolver di GraphQL menerima 4 parameter universal:
1. `parent` (atau `root`): Hasil data kembalian dari resolver satu tingkat di atasnya dalam pohon query hierarkis.
2. `args`: Parameter argumen yang dikirimkan oleh klien dalam query SDL (`args: { id: "..." }`).
3. `context`: Objek bersama (*shared object*) yang dibuat baru untuk setiap permintaan HTTP masuk. Tempat ideal menyimpan informasi otentikasi token JWT, koneksi database, atau loader.
4. `info`: Metadata AST (*Abstract Syntax Tree*) internal mengenai query yang sedang dieksekusi.

### Pohon Eksekusi Resolver (Execution Tree)
Resolver di GraphQL bekerja secara bertingkat seperti struktur pohon (*tree traversal*):
1. Query meminta: `item -> reviews -> author -> username`.
2. Pertama, resolver `Query.item` dieksekusi dan mengembalikan objek `{ id, name, price }`.
3. Kedua, GraphQL mengecek apakah field `reviews` meminta data. Resolver `Item.reviews` dipanggil dengan menerima objek `item` tadi sebagai parameter `parent`.
4. Ketiga, untuk setiap review di dalam array, resolver `Review.author` dipanggil secara mandiri dengan menerima review individual sebagai `parent`.

### Keamanan Berbasis Context
Otentikasi tidak boleh di-hardcode di tiap resolver. Middleware HTTP memvalidasi header `Authorization: Bearer <jwt>`, meng-decode payload pengguna, dan menyematkannya ke dalam `context.currentUser`. Resolver mana pun dalam pohon dapat memeriksa `context.currentUser` untuk otorisasi hak akses.

---

---

## Penjelasan untuk Pemula

Bayangkan pohon eksekusi resolver seperti silsilah keluarga. 
Kakek (`Query.item`) memanggil Ayah (`Item.reviews`). Saat Ayah berbicara, ia membawa nama Kakek sebagai `parent`. Lalu Ayah memanggil Cucu (`Review.author`). 

Context seperti udara di dalam ruangan rumah: semua orang dari Kakek, Ayah, hingga Cucu bisa menghirup udara yang sama. Jika udaranya beracun (token JWT tidak sah), seluruh anggota keluarga tahu saat itu juga!

## Eksperimen

- Uji query tanpa header otentikasi dan verifikasi kemunculan error UNAUTHENTICATED
- Kirim header otentikasi valid pada Context dan amati ulasan produk berhasil dimuat
- Cetak parameter parent di console pada resolver Review.author untuk melihat data review yang diteruskan
- Periksa struktur parameter info untuk melihat field AST yang diminta klien

---

## Tantangan

Buat directive kustom `@auth(requires: ADMIN)` atau middleware context guard yang memblokir akses ke field email pengguna jika peran (`role`) di dalam JWT bukan administrator.

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

Anda telah menguasai arsitektur pohon eksekusi resolver bertingkat, empat parameter utama (parent, args, context, info), serta penegakan keamanan autentikasi melalui GraphQL Context.
