# Real-Time Subscriptions, WebSockets & PubSub

> **Kategori:** GraphQL | **Level:** Real-Time Subscriptions, Keamanan & Federation | **Minggu 5:** Real-Time Subscriptions, WebSockets & PubSub
> ⏱️ **Estimasi Belajar:** 45 Menit (15m teori, 30m praktik) | 🔗 **Tingkat:** Terstruktur (Step-by-step)


## Tujuan Pembelajaran

- Memahami arsitektur GraphQL Subscriptions melalui protokol WebSocket dua arah (graphql-ws)
- Membedakan peran Query (Read over HTTP), Mutation (Write over HTTP), dan Subscription (Push over WS)
- Menggunakan PubSub Engine untuk mempublikasikan dan mengonsumsi event streaming (AsyncIterator)
- Menyaring notifikasi subscriber spesifik menggunakan filter helper function (withFilter)

---

## Program: Implementasi GraphQL Subscriptions Menggunakan Protokol graphql-ws dan PubSub Engine

```typescript
import { createServer } from 'http';
import { WebSocketServer } from 'ws';
import { useServer } from 'graphql-ws/lib/use/ws';
import { makeExecutableSchema } from '@graphql-tools/schema';
import { PubSub } from 'graphql-subscriptions';

// In-Memory PubSub Engine (In production, replace with RedisPubSub for multi-instance scaling)
const pubsub = new PubSub();
const ORDER_STATUS_UPDATED = 'ORDER_STATUS_UPDATED';

const typeDefs = `#graphql
  type Order {
    id: ID!
    total: Float!
    status: String!
  }

  type Query {
    activeOrders: [Order!]!
  }

  type Mutation {
    updateOrderStatus(orderId: ID!, newStatus: String!): Order!
  }

  # Root Subscription Type - Server pushes updates down WebSocket
  type Subscription {
    orderStatusChanged(orderId: ID!): Order!
  }
`;

const ordersDb = new Map<string, { id: string; total: number; status: string }>([
  ['ord_101', { id: 'ord_101', total: 450000, status: 'PROCESSING' }],
]);

const resolvers = {
  Query: {
    activeOrders: () => Array.from(ordersDb.values()),
  },
  Mutation: {
    updateOrderStatus: (_: unknown, { orderId, newStatus }: { orderId: string; newStatus: string }) => {
      const order = ordersDb.get(orderId);
      if (!order) throw new Error('Order not found');

      order.status = newStatus;

      // Publish event to topic
      pubsub.publish(ORDER_STATUS_UPDATED, {
        orderStatusChanged: order,
      });

      return order;
    },
  },
  Subscription: {
    orderStatusChanged: {
      // AsyncIterator subscribed to PubSub channel
      subscribe: () => pubsub.asyncIterableIterator([ORDER_STATUS_UPDATED]),
    },
  },
};

const schema = makeExecutableSchema({ typeDefs, resolvers });

// Setup dual HTTP + WebSocket transport server
const httpServer = createServer();
const wsServer = new WebSocketServer({
  server: httpServer,
  path: '/graphql',
});

// Bind graphql-ws protocol server
useServer({ schema }, wsServer);

httpServer.listen(4000, () => {
  console.log('🚀 HTTP & WebSocket Subscription server running on port 4000');
});
```

---


---

## Uji Coba Filter Kategori di Playground

Jalankan query penyaringan departemen berikut di playground untuk melihat pemfilteran data terarah:

```graphql
# Week 5: Filtering & Department Queries
query GetEngineeringTeam {
  employeesByDepartment(department: "Engineering") {
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

### Arsitektur GraphQL Subscriptions
Berbeda dengan Query dan Mutation yang beroperasi menggunakan siklus Request-Response standar di atas HTTP POST, **GraphQL Subscriptions** mempertahankan koneksi dua arah (*persistent bidirectional connection*) berbasis **WebSocket**. 
Ketika klien melakukan subscription (misal memantau status pesanan), koneksi tetap terbuka. Saat mutasi terjadi di server, server secara proaktif mendorong (*push*) data perubahan ke seluruh klien yang berlangganan secara real-time.

### Protokol Modern: graphql-ws vs subscriptions-transport-ws
Library lama `subscriptions-transport-ws` telah berstatus *deprecated* (usang). Standar industri modern saat ini adalah protokol **`graphql-ws`** (RFC-compliant) yang lebih aman, ringan, dan menangani terminasi soket serta reconnection ping/pong dengan jauh lebih stabil.

### PubSub Engine dan Filter Tertarget
- **PubSub**: Abstraksi kanal perantara penerbit-pelanggan. Di lingkungan development, in-memory `PubSub` sudah cukup. Di lingkungan production multi-container (Docker/Kubernetes), Anda wajib menggunakan **RedisPubSub** agar event yang dipicu di Kontainer A dapat disebarkan ke subscriber yang tersambung di Kontainer B.
- **withFilter**: Mencegah spam data ke seluruh pengguna. Dengan `withFilter`, server hanya mengirimkan event ke subscriber jika `payload.orderId === args.orderId`.

---

---

## Penjelasan untuk Pemula

Bayangkan Query seperti menelepon restoran setiap 1 menit untuk bertanya: 'Apakah pesanan saya sudah matang?' (Polling yang melelahkan).

Subscription seperti membawa pager alarm getar dari restoran: Anda duduk tenang di meja Anda. Saat makanan selesai dimasak oleh koki, pager Anda otomatis bergetar dan berbunyi (Push Notification langsung lewat kabel tak terlihat)!

## Eksperimen

- Buka Apollo Sandbox dan hubungkan ke tab Subscription dengan protokol WebSocket ws://localhost:4000/graphql
- Jalankan mutation updateOrderStatus di tab HTTP dan amati data terdorong instan ke tab Subscription
- Implementasikan withFilter agar user hanya menerima notifikasi untuk orderId tertentu
- Putuskan koneksi WebSocket di browser untuk melihat bagaimana server menangani socket disconnect

---

## Tantangan

Implementasikan sistem Live Chat Room dengan Subscriptions: schema `messageSent(roomId: ID!): Message!` dan gunakan `withFilter` agar pesan hanya terkirim ke klien yang sedang membuka ruangan chat tersebut.

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

Anda telah menguasai komunikasi data real-time dua arah menggunakan GraphQL Subscriptions, protokol standar graphql-ws, arsitektur PubSub, dan filtering notifikasi dengan withFilter.
