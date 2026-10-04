# Mutations, Input Types, Fragments & Directives

> **Kategori:** GraphQL | **Level:** Fondasi Skema & Eksekusi Query/Mutation | **Minggu 2:** Mutations, Input Types, Fragments & Directives
> ⏱️ **Estimasi Belajar:** 45 Menit (15m teori, 30m praktik) | 🔗 **Tingkat:** Terstruktur (Step-by-step)


## Tujuan Pembelajaran

- Merancang operasi perubahan data menggunakan Root Mutation Type
- Mengelompokkan parameter masukan yang bersih dan terstruktur dengan Input Types (`input ...`)
- Menerapkan Mutation Response Payload Pattern untuk penanganan error bisnis yang elegan
- Menggunakan GraphQL Fragments untuk berbagi kumpulan field antar komponen klien dan Directives (@include, @skip)

---

## Program: Operasi Mutasi CRUD dengan Input Types Terstruktur dan Fragment Reusable

```typescript
import { ApolloServer } from '@apollo/server';

const typeDefs = `#graphql
  type Product {
    id: ID!
    sku: String!
    title: String!
    price: Float!
    stock: Int!
    createdAt: String!
  }

  # Input Types group arguments cleanly instead of long argument lists
  input CreateProductInput {
    sku: String!
    title: String!
    price: Float!
    stock: Int! = 0 # Default value
  }

  input UpdateStockInput {
    productId: ID!
    deltaQuantity: Int!
  }

  # Payload pattern: Return status and newly mutated entity
  type MutationResponse {
    code: String!
    success: Boolean!
    message: String!
    product: Product
  }

  type Query {
    products: [Product!]!
  }

  # Root Mutation Type - Ingress for state-changing write operations
  type Mutation {
    createProduct(input: CreateProductInput!): MutationResponse!
    adjustInventory(input: UpdateStockInput!): MutationResponse!
  }
`;

interface ProductRecord {
  id: string;
  sku: string;
  title: string;
  price: number;
  stock: number;
  createdAt: string;
}

const productsStore: ProductRecord[] = [];

const resolvers = {
  Query: {
    products: () => productsStore,
  },
  Mutation: {
    createProduct: (
      _parent: unknown,
      { input }: { input: { sku: string; title: string; price: number; stock: number } }
    ) => {
      if (input.price < 0) {
        return {
          code: 'INVALID_PRICE',
          success: false,
          message: 'Product price cannot be negative.',
          product: null,
        };
      }

      const newProduct: ProductRecord = {
        id: `prod_${Date.now()}`,
        sku: input.sku,
        title: input.title,
        price: input.price,
        stock: input.stock,
        createdAt: new Date().toISOString(),
      };

      productsStore.push(newProduct);

      return {
        code: '201_CREATED',
        success: true,
        message: 'Product created successfully.',
        product: newProduct,
      };
    },
    adjustInventory: (
      _parent: unknown,
      { input }: { input: { productId: string; deltaQuantity: number } }
    ) => {
      const product = productsStore.find((p) => p.id === input.productId);
      if (!product) {
        return {
          code: 'NOT_FOUND',
          success: false,
          message: 'Product does not exist.',
          product: null,
        };
      }

      product.stock += input.deltaQuantity;

      return {
        code: '200_UPDATED',
        success: true,
        message: 'Stock updated.',
        product,
      };
    },
  },
};

export { typeDefs, resolvers };
```

---


---

## Uji Coba Mutation di Playground

Jalankan operasi Mutation berikut di panel playground untuk menambahkan pesanan baru ke sistem dengan input payload terstruktur:

```graphql
# Week 2: Mutation & Payload - Membuat Pesanan Baru
mutation CreateNewOrder {
  createOrder(
    customer: "Alex Iskandar"
    items: [
      { product: "Mechanical Keyboard", qty: 1 }
      { product: "USB-C Hub", qty: 2 }
    ]
  ) {
    id
    customer
    total
    status
    date
  }
}
```

## Konsep Kunci

### Arsitektur Root Mutation Type
Jika `Query` didesain untuk operasi pembacaan yang aman tanpa efek samping (*idempotent & side-effect free*), **Mutation** didesain khusus untuk operasi tulis yang mengubah state server (`INSERT`, `UPDATE`, `DELETE`). Berbeda dengan `Query` yang resolver-nya dapat dieksekusi secara paralel, spesifikasi GraphQL mewajibkan resolver di dalam `Mutation` dieksekusi secara **berurutan (serial)** untuk mencegah race condition.

### Input Types vs Object Types
Dalam skema GraphQL, Anda dilarang menggunakan tipe `type` standar sebagai argumen input sebuah mutation. Anda wajib menggunakan keyword **`input`**. Input types hanya boleh berisi scalar types, enums, atau input types bersarang lainnya (tidak boleh berisi interface atau union).

### Mutation Response Payload Pattern
Anti-pattern umum pada mutation adalah mengembalikan entitas secara telanjang (`createProduct(...): Product!`). Jika terjadi validasi gagal (misal harga negatif), server terpaksa melempar GraphQL error tingkat protokol yang menghentikan eksekusi. **Mutation Response Payload Pattern** membungkus entitas dengan field metadata (`code`, `success`, `message`, `product`), memungkinkan klien frontend menampilkan pesan toast error yang ramah pengguna.

### Reusabilitas dengan Fragments dan Directives
- **Fragments**: Blok field yang dapat digunakan kembali (misal `fragment ProductCard on Product { id title price }`).
- **Directives**: Kondisional dinamis pada query klien, seperti `@include(if: $withStock)` atau `@skip(if: $isMobile)`.

---

---

## Penjelasan untuk Pemula

Bayangkan Query seperti melihat daftar menu di restoran (Anda hanya membaca, tidak mengubah apa-apa). 

Mutation seperti menyerahkan nota pesanan ke koki dapur (Anda mengubah state: koki mulai memasak dan bahan makanan berkurang). 
Input Type seperti formulir pemesanan rapi: Anda mengisi nama, nomor meja, dan level pedas di satu kertas formulir terlipat rapi. Sedangkan Mutation Payload seperti kasir yang mengembalikan struk pembayaran ramah: 'Pesanan berhasil dibuat, ini nomor antrean dan struk Anda!'

## Eksperimen

- Jalankan mutation createProduct dengan harga negatif dan amati payload code: INVALID_PRICE
- Buat query dengan fragment: fragment CoreInfo on Product { id title price } lalu gunakan ...CoreInfo di query
- Uji directive @include(if: true) dan amati field yang diminta muncul secara bersyarat
- Jalankan dua mutation berurutan dalam satu request dan amati eksekusi serial sesuai spesifikasi

---

## Tantangan

Buat mutation `deleteProduct(id: ID!): MutationResponse!` yang memvalidasi keberadaan produk, menghapusnya dari store, dan mengembalikan pesan konfirmasi keberhasilan.

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

Anda telah menguasai operasi penulisan data dengan Root Mutation, pengelompokan parameter dengan Input Types, Mutation Payload Pattern, serta Fragments dan Directives.
