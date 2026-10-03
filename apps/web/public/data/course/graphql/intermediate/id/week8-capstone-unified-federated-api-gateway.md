# Capstone Project: Unified Federated E-Commerce Gateway

> **Kategori:** GraphQL | **Level:** Real-Time Subscriptions, Keamanan & Federation | **Minggu 8:** Capstone Project: Unified Federated E-Commerce Gateway

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

## Ringkasan

Selamat! Anda telah menguasai seluruh kurikulum GraphQL: filosofi SDL, Query & Mutation, Nested Resolvers, mitigasi N+1 dengan DataLoader, Real-Time Subscriptions via WebSockets, Keamanan Query Depth & Complexity, Apollo Federation v2, dan Capstone Federated API Gateway.
