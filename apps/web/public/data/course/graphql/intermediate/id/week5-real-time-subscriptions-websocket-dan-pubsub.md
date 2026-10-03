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

Anda telah menguasai komunikasi data real-time dua arah menggunakan GraphQL Subscriptions, protokol standar graphql-ws, arsitektur PubSub, dan filtering notifikasi dengan withFilter.
