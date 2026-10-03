# Real-Time Subscriptions, WebSockets & PubSub

> **Kategori:** GraphQL | **Level:** Real-Time Subscriptions, Security & Federation | **Minggu 5:** Real-Time Subscriptions, WebSockets & PubSub

## Learning Objectives

- Understand GraphQL Subscriptions architecture over bidirectional WebSockets (graphql-ws)
- Differentiate Query (HTTP Read), Mutation (HTTP Write), and Subscription (WebSocket Push)
- Implement PubSub engines to publish and stream events via AsyncIterators
- Filter targeted subscriber events using functional predicates (withFilter)

---

## Program: GraphQL Subscriptions Implementation Using graphql-ws Protocol and PubSub Engine

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

## Key Concepts

### GraphQL Subscriptions Architecture
Unlike Queries and Mutations operating over stateless HTTP POST Request-Response lifecycles, **GraphQL Subscriptions** establish persistent, full-duplex **WebSocket** connections.
When a client registers a subscription (e.g. streaming live parcel tracking), the connection remains alive. Upon server-side state mutations, the engine actively pushes updated payloads down the socket stream in real time.

### Transport Standards: graphql-ws vs Deprecated Protocols
The legacy `subscriptions-transport-ws` protocol is formally deprecated. The contemporary industry standard is the RFC-compliant **`graphql-ws`** protocol, offering superior socket reconnection resilience, heartbeats, and resource teardown ergonomics.

### PubSub Mechanics and Targeted Filtering
- **PubSub**: Decouples event emission from socket dispatch. In-memory `PubSub` suffices for single nodes. Multi-node containerized deployments mandate **RedisPubSub** to propagate events seamlessly across independent cluster nodes.
- **withFilter**: Eliminates broadcast notification spam. Utilizing `withFilter`, the subscription engine only pushes events down sockets where client arguments match mutation payloads (`payload.orderId === args.orderId`).

---

---

## Beginner Friendly Explanation

Think of Queries like calling a pizza parlor every 60 seconds asking: 'Is my pizza out of the oven yet?' (Exhausting polling loop).

Subscriptions are like holding a restaurant buzzer pager: you relax quietly at your table. The moment the chef finishes your meal, your buzzer vibrates and lights up (instant push notification over a persistent wireless channel)!

## Experiments

- Open Apollo Sandbox and establish a WebSocket subscription connection to ws://localhost:4000/graphql
- Execute updateOrderStatus in an HTTP tab and observe instant payload arrival in the Subscription window
- Apply withFilter to restrict event delivery to a matching orderId parameter
- Sever the WebSocket connection in browser devtools to observe server cleanup handling

---

## Challenge

Build a Live Chat Room with Subscriptions: declare `messageSent(roomId: ID!): Message!` and employ `withFilter` routing messages exclusively to clients viewing that room.

---

## Summary

You have mastered real-time full-duplex communication via GraphQL Subscriptions, the standard graphql-ws protocol, PubSub architectures, and targeted notifications via withFilter.
