# Keamanan GraphQL: Query Depth, Complexity & Introspection

> **Kategori:** GraphQL | **Level:** Real-Time Subscriptions, Keamanan & Federation | **Minggu 6:** Keamanan GraphQL: Query Depth, Complexity & Introspection
> ⏱️ **Estimasi Belajar:** 45 Menit (15m teori, 30m praktik) | 🔗 **Tingkat:** Terstruktur (Step-by-step)


## Tujuan Pembelajaran

- Mengidentifikasi vektor serangan khas GraphQL: Serangan Rekursi Siklus (Circular Query DoS)
- Menerapkan aturan validasi AST kustom untuk Query Depth Limiting
- Mengonfigurasi analisis kompleksitas query (Query Cost Analysis) untuk membatasi pemrosesan CPU
- Mengamankan lingkungan production: Mematikan Introspection Schema dan menonaktifkan error stack traces

---

## Program: Proteksi API GraphQL dari Serangan DoS Melalui Validasi Depth Limiting dan Cost Analysis

```typescript
import { ApolloServer } from '@apollo/server';
import { GraphQLError } from 'graphql';

// 1. Cyclic Graph Schema Vulnerable to Circular DoS Attacks:
// user -> friends -> friends -> friends -> ... (Infinite recursion crashing server!)
const typeDefs = `#graphql
  type User {
    id: ID!
    name: String!
    friends: [User!]!
  }

  type Query {
    users: [User!]!
  }
`;

// 2. Custom AST Validation Rule: Query Depth Limiting
// Traverses AST to ensure nested query depth NEVER exceeds maximum threshold (e.g. 4)
const depthLimitRule = (maxDepth: number) => {
  return (context: any) => ({
    Field: {
      enter(node: any) {
        // Compute nesting depth from AST ancestors
        const depth = context.getAncestors().filter((a: any) => a.kind === 'Field').length;
        if (depth > maxDepth) {
          context.reportError(
            new GraphQLError(`Query depth limit of ${maxDepth} exceeded! Current depth: ${depth}`, {
              nodes: [node],
              extensions: { code: 'BAD_USER_INPUT' },
            })
          );
        }
      },
    },
  });
};

// 3. Secure Production Apollo Server Configuration
const server = new ApolloServer({
  typeDefs,
  resolvers: {
    Query: { users: () => [] },
  },
  // Disable schema introspection and Apollo Sandbox in production to prevent schema leakage
  introspection: process.env.NODE_ENV !== 'production',
  validationRules: [
    depthLimitRule(4), // Reject circular queries deeper than 4 levels
  ],
});

console.log('🛡️ GraphQL Security Gateway hardened against DoS and Introspection scraping.');
export { depthLimitRule };
```

---


---

## Uji Coba Pencarian di Playground

Jalankan query pencarian kata kunci berikut di playground untuk menguji filter pencarian dan pembatasan field:

```graphql
# Week 6: Search & Selection
query SearchProductsCatalog {
  searchProducts(keyword: "keyboard") {
    id
    name
    category
    price
    tags
    inStock
  }
}
```

## Konsep Kunci

### Mengapa GraphQL Sangat Rentan Terhadap Serangan DoS?
Fleksibilitas GraphQL adalah pisau bermata dua. Pada API REST, endpoint dikunci oleh backend. Pada GraphQL, klien memiliki kendali penuh atas query yang dikirimkan.
Jika skema memiliki relasi dua arah (`User.friends: [User]`), seorang penyerang dapat mengirimkan query rekursif tak terbatas:
`query { users { friends { friends { friends { friends { ... } } } } } }`.
Query berukuran beberapa kilobyte ini akan memaksa server mengeksekusi miliaran operasi join database, menghabiskan 100% CPU, dan menumbangkan server dalam hitungan detik (**Billion Laughs / Circular DoS Attack**).

### Tiga Pilar Keamanan GraphQL
1. **Query Depth Limiting**: Memeriksa pohon AST (*Abstract Syntax Tree*) query sebelum dieksekusi. Jika kedalaman query melebihi ambang batas aman (misal 5 tingkat), query langsung ditolak mentah-mentah pada tahap validasi tanpa pernah menyentuh database.
2. **Query Cost Analysis (Complexity)**: Menetapkan skor poin pada setiap field (misal: field biasa bernilai 1, field list dengan perkalian `limit: 100` bernilai 100). Jika total skor query melebihi 500 poin, query dibatalkan.
3. **Disable Introspection di Production**: Fitur *Introspection* memungkinkan alat penyerang memetakan seluruh skema database Anda secara otomatis. Di server production, `introspection: false` wajib diaktifkan.

---

---

## Penjelasan untuk Pemula

Bayangkan Anda membuka restoran dengan peraturan: 'Pengunjung boleh memesan burger dengan lapisan apa pun sesukanya'.
Orang iseng datang dan memesan burger dengan 10.000 lapisan keju dan daging (Circular Query DoS). Dapur Anda langsung kehabisan bahan dan koki pingsan kelelahan.

Depth Limiting seperti aturan tegas di pintu masuk: 'Maksimal pesanan burger hanya boleh 4 lapisan!'. Jika memesan lebih dari itu, pelayan langsung menolak sebelum koki mulai menyalakan kompor!

## Eksperimen

- Kirim query dengan nesting 5 tingkat dan amati error Query depth limit of 4 exceeded!
- Uji perilaku introspection query: jalankan { __schema { types { name } } } saat introspection dimatikan
- Atur format error di Apollo Server untuk menyembunyikan stack trace internal database dari response klien
- Simulasikan query complexity calculator yang menghitung bobot query berdasarkan argumen pagination

---

## Tantangan

Tulis rule validasi AST GraphQL kustom yang membatasi jumlah alias (`aliasLimitRule`): tolak query jika pengguna menyertakan lebih dari 10 aliases dalam satu query untuk mencegah serangan Password Brute-Force via Aliasing.

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

Anda telah menguasai perlindungan keamanan GraphQL: pencegahan serangan DoS siklik dengan Query Depth Limiting, analisis kompleksitas query, penutupan Introspection, dan sanitasi pesan error.
