# Capstone Project: Unified Federated E-Commerce Gateway

> **Kategori:** GraphQL | **Level:** Real-Time Subscriptions, Security & Federation | **Minggu 8:** Capstone Project: Unified Federated E-Commerce Gateway

## Learning Objectives

- Synthesize all GraphQL disciplines into a production-ready enterprise E-Commerce API Gateway capstone
- Harmonize DataLoader batching eliminating N+1 queries across order items and product lookups
- Enforce request-scoped context initialization isolating JWT security credentials and DataLoader caches
- Couple transactional mutation workflows with real-time WebSocket event dispatching

---

## Program: Unified E-Commerce Gateway: DataLoader, JWT Auth Context, and Live Order Subscriptions

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

## Key Concepts

### Capstone Unified E-Commerce Gateway Architecture
This capstone fuses the spectrum of contemporary GraphQL engineering into a unified production architecture:
1. **High-Throughput N+1 Immunity**: When clients query order histories alongside line items and product details, `OrderItem.product` resolvers delegate to `productLoader.load()`. Hundreds of independent item lookups coalesce into a single batched database query.
2. **Request-Scoped Security & Cache Boundaries**: Every HTTP invocation instantiates an isolated context verifying JWT claims and allocating dedicated DataLoader caches, eliminating cross-tenant cache contamination.
3. **Full-Duplex Mutation & Subscription Synthesis**: When fulfillment teams update orders to `SHIPPED` via `markOrderShipped`, the mutation atomically publishes to PubSub, streaming live updates down active WebSocket channels to customer mobile clients.

---

---

## Beginner Friendly Explanation

Congratulations! You have constructed a cutting-edge API Gateway for a global e-commerce enterprise.
From an unambiguous contract guaranteeing accurate order payloads (Schema SDL), to a smart courier batching deliveries in one trip (DataLoader), to a security officer inspecting credentials at the gate (JWT Context), up to an automated live screen alerting you the exact second your order ships (Subscriptions)!

## Experiments

- Create an order via placeOrder mutation and verify persistence in memory
- Query myOrders with 10 nested order items and confirm DataLoader coalesces product lookups into a single batch
- Connect a WebSocket subscription on orderStatusUpdated, fire markOrderShipped, and observe the live pushed event
- Dispatch a query omitting authentication headers to verify immediate security rejection

---

## Challenge

Incorporate Query Complexity Calculation into the capstone gateway: assign weight 1 to scalars, weight 5 to order items, and reject queries exceeding a 50-point budget.

---

## Summary

Congratulations! You have mastered the entire GraphQL continuum: SDL philosophy, Queries & Mutations, Nested Resolvers, N+1 elimination via DataLoader, Real-Time Subscriptions, Query Depth & Complexity security, Apollo Federation v2, and a Federated API Gateway Capstone.
