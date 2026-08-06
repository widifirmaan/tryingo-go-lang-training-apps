# Subscriptions

> **Kategori:** GraphQL | **Level:** Intermediate | **Minggu 8:** Subscriptions

## Learning Objectives

- PubSub for messaging
- Subscription resolvers
- asyncIterator
- Filter subscriptions
- Trigger from mutations

---

## Program: Realtime GraphQL

```javascript
// GraphQL Subscriptions dengan WebSocket
const { ApolloServer } = require('@apollo/server');
const { WebSocketServer } = require('ws');
const { useServer } = require('graphql-ws/lib/use/ws');
const { PubSub } = require('graphql-subscriptions');

const pubsub = new PubSub();

// Schema
type Subscription {
  productCreated: Product!
  orderStatusChanged(orderId: ID!): Order!
  newMessage(roomId: ID!): Message!
}

// Resolvers
const resolvers = {
  Subscription: {
    productCreated: {
      subscribe: () => pubsub.asyncIterator(['PRODUCT_CREATED']),
    },
    orderStatusChanged: {
      subscribe: (_, { orderId }) =>
        pubsub.asyncIterator([`ORDER_STATUS_${orderId}`]),
    },
    newMessage: {
      subscribe: (_, { roomId }, context) => {
        // Auth check
        if (!context.currentUser) throw new Error('Unauthorized');
        return pubsub.asyncIterator([`MESSAGE_${roomId}`]);
      },
    },
  },
  Mutation: {
    createProduct: async (_, { input }) => {
      const product = await db.products.create(input);
      // Publish event
      await pubsub.publish('PRODUCT_CREATED', { productCreated: product });
      return product;
    },
    updateOrderStatus: async (_, { id, status }) => {
      const order = await db.orders.update(id, { status });
      await pubsub.publish(`ORDER_STATUS_${id}`, { orderStatusChanged: order });
      return order;
    },
  },
};

// Client subscription
// subscription OnProductCreated {
//   productCreated { id name price }
// }
```

---

## Key Concepts

### PubSub
In-memory event system for subscriptions.

### Subscribe
Return AsyncIterator from pubsub.

### Publish
Trigger events from mutations.

### Filters
Filter subscriptions by payload/args.

### Transport
WebSocket for realtime communication.

---

## Experiments

- Redis PubSub
- Subscription auth
- Presence systems
- Live queries

---

## Challenge

Chat system: subscriptions for new messages.

---

## Summary

Week 8 of 10: **Subscriptions** (Intermediate).
