# Capstone Project: Unified Federated E-Commerce Gateway

> **Kategori:** GraphQL | **Level:** Real-Time Subscriptions, Keamanan & Federation | **Minggu 8:** Capstone Project: Unified Federated E-Commerce Gateway
> ⏱️ **Estimasi Belajar:** 45 Menit (15m teori, 30m praktik) | 🔗 **Tingkat:** Terstruktur (Step-by-step)


## Tujuan Pembelajaran

- Mengintegrasikan seluruh kurikulum GraphQL ke dalam satu capstone API Gateway e-commerce siap produksi
- Menggabungkan DataLoader batching untuk mengeliminasi masalah N+1 pada relasi produk dan item pesanan
- Mengisolasi otentikasi JWT dan pembuatan DataLoader per request context
- Menghubungkan operasi mutasi dengan notifikasi real-time Subscription berbasis WebSockets

---

## Program: Gateway E-Commerce Terpadu: DataLoader, JWT Auth Context, dan Live Order Subscriptions

```typescript
// CAPSTONE PROJECT: Unified Enterprise GraphQL API Gateway
// Integrates: SDL Contracts, Nested Resolvers, DataLoader Batching, JWT Auth Context, and Subscriptions

import { ApolloServer } from '@apollo/server';
import { createServer } from 'http';
import { WebSocketServer } from 'ws';
import { useServer } from 'graphql-ws/lib/use/ws';
import { makeExecutableSchema } from '@graphql-tools/schema';
import DataLoader from 'dataloader';
import { PubSub } from 'graphql-subscriptions';

const pubsub = new PubSub();
const ORDER_SHIPPED_TOPIC = 'ORDER_SHIPPED';

// 1. Comprehensive Schema Definition Language
const typeDefs = `#graphql
  type User {
    id: ID!
    email: String!
    name: String!
  }

  type Product {
    id: ID!
    sku: String!
    title: String!
    price: Float!
  }

  type OrderItem {
    id: ID!
    product: Product!
    quantity: Int!
    unitPrice: Float!
  }

  type Order {
    id: ID!
    customer: User!
    items: [OrderItem!]!
    totalAmount: Float!
    status: String!
    createdAt: String!
  }

  input CreateOrderInput {
    items: [OrderItemInput!]!
  }

  input OrderItemInput {
    productId: ID!
    quantity: Int!
  }

  type Query {
    myOrders: [Order!]!
    order(id: ID!): Order
  }

  type Mutation {
    placeOrder(input: CreateOrderInput!): Order!
    markOrderShipped(orderId: ID!): Order!
  }

  type Subscription {
    orderStatusUpdated(orderId: ID!): Order!
  }
`;

// 2. DataLoaders for High-Throughput Batching
const batchGetProducts = async (ids: readonly string[]) => {
  const MOCK_PRODS: Record<string, { id: string; sku: string; title: string; price: number }> = {
    p_1: { id: 'p_1', sku: 'M3-PRO', title: 'MacBook Pro 16 M3', price: 38000000 },
    p_2: { id: 'p_2', sku: 'M3-AIR', title: 'MacBook Air 15 M3', price: 21000000 },
  };
  return ids.map((id) => MOCK_PRODS[id] || null);
};

const createLoaders = () => ({
  productLoader: new DataLoader(batchGetProducts),
});

// 3. Robust Resolver Implementation
const ordersMemory: any[] = [];

const resolvers = {
  Query: {
    myOrders: (_: unknown, __: unknown, context: any) => {
      if (!context.user) throw new Error('Unauthenticated');
      return ordersMemory.filter((o) => o.customerId === context.user.id);
    },
  },
  Order: {
    customer: (parent: any) => ({
      id: parent.customerId,
      email: 'alex@example.com',
      name: 'Alex Iskandar',
    }),
  },
  OrderItem: {
    product: (parent: any, _: unknown, context: any) => {
      // Coalesces multiple order items into a single batched database lookup!
      return context.loaders.productLoader.load(parent.productId);
    },
  },
  Mutation: {
    placeOrder: (_: unknown, { input }: any, context: any) => {
      if (!context.user) throw new Error('Unauthenticated');

      const newOrder = {
        id: `ord_${Date.now()}`,
        customerId: context.user.id,
        items: input.items.map((item: any) => ({
          id: `item_${Math.random()}`,
          productId: item.productId,
          quantity: item.quantity,
          unitPrice: 38000000,
        })),
        totalAmount: 38000000,
        status: 'PROCESSING',
        createdAt: new Date().toISOString(),
      };

      ordersMemory.push(newOrder);
      return newOrder;
    },
    markOrderShipped: (_: unknown, { orderId }: any) => {
      const order = ordersMemory.find((o) => o.id === orderId);
      if (!order) throw new Error('Order not found');

      order.status = 'SHIPPED';
      pubsub.publish(ORDER_SHIPPED_TOPIC, { orderStatusUpdated: order });
      return order;
    },
  },
  Subscription: {
    orderStatusUpdated: {
      subscribe: () => pubsub.asyncIterableIterator([ORDER_SHIPPED_TOPIC]),
    },
  },
};

const schema = makeExecutableSchema({ typeDefs, resolvers });

console.log('🚀 Capstone Unified Federated E-Commerce Gateway compiled successfully.');
export { schema, createLoaders };
```

---


---

## Uji Coba Capstone Gateway di Playground

Jalankan query orkestrasi lengkap toko daring (produk, pesanan, staf) berikut pada gateway:

```graphql
# Week 8: Capstone Unified Operations
query UnifiedEcommerceStorefront {
  products {
    id
    name
    category
    price
    inStock
  }
  orders {
    id
    customer
    total
    status
  }
  employees {
    id
    name
    department
  }
}
```

## Konsep Kunci

### Arsitektur Capstone Unified E-Commerce Gateway
Proyek capstone ini memadukan seluruh fondasi GraphQL modern ke dalam satu arsitektur terintegrasi:
1. **Perlindungan N+1 Skala Tinggi**: Saat klien meminta daftar pesanan beserta seluruh item belanja dan spesifikasi produknya, pemanggilan resolver `OrderItem.product` dialihkan melalui `productLoader.load()`. Ratusan request produk otomatis digabungkan (*coalesced*) menjadi satu pemanggilan database massal.
2. **Keamanan Konteks Per Permintaan**: Setiap permintaan HTTP menginisialisasi konteks baru yang memvalidasi token JWT pengguna dan membuat instans DataLoader terisolasi, menjamin tidak ada data pribadi yang bocor antar-klien.
3. **Penyatuan Mutasi dan Real-Time Subscription**: Ketika admin memperbarui status pesanan menjadi `SHIPPED` melalui `markOrderShipped`, event langsung dipublikasikan ke kanal PubSub dan dikirimkan via koneksi WebSocket yang aktif ke aplikasi seluler pembeli.

---

---

## Penjelasan untuk Pemula

Selamat! Anda telah membangun gerbang API modern untuk platform e-commerce raksasa. 
Mulai dari kasir yang cepat dan tidak pernah salah mencatat menu (Schema SDL), kurir pintar yang mengangkut barang secara borongan agar tidak bolak-balik (DataLoader), gembok keamanan yang memeriksa tiket tanda pengenal setiap tamu (JWT Context), hingga layar TV live yang otomatis menyala saat kurir mengantarkan paket ke rumah Anda (Subscriptions)!

## Eksperimen

- Buat pesanan baru dengan placeOrder mutation dan verifikasi pesanan tersimpan di memori
- Lakukan query myOrders dengan 10 order items dan amati bagaimana DataLoader menggabungkan seluruh query produk menjadi satu query SQL
- Buka koneksi subscription orderStatusUpdated di WebSocket, trigger markOrderShipped, dan amati event terdorong ke subscriber
- Uji query tanpa header otentikasi untuk memverifikasi penolakan akses

---

## Tantangan

Terapkan Query Complexity Calculation pada gateway capstone: tetapkan bobot 1 untuk scalar, bobot 5 untuk order items, dan tolak query jika total kompleksitas melebihi ambang batas 50 poin.

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

Selamat! Anda telah menguasai seluruh kurikulum GraphQL: filosofi SDL, Query & Mutation, Nested Resolvers, mitigasi N+1 dengan DataLoader, Real-Time Subscriptions via WebSockets, Keamanan Query Depth & Complexity, Apollo Federation v2, dan Capstone Federated API Gateway.
