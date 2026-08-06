# Subscriptions

> **Kategori:** GraphQL | **Level:** Menengah | **Minggu 8:** Subscriptions

## Tujuan Pembelajaran

- PubSub untuk messaging
- Subscription resolver
- asyncIterator
- Filter subscription
- Trigger dari mutation

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

## Konsep Kunci

### PubSub
In-memory event system untuk subscriptions.

### Subscribe
Return AsyncIterator dari pubsub.

### Publish
Trigger event dari mutation.

### Filter
Filter subscription by payload/args.

### Transport
WebSocket untuk realtime communication.

---

## Eksperimen

- Redis PubSub
- Subscription auth
- Presence system
- Live queries

---

## Tantangan

Chat system: subscription untuk new message.

---

## Ringkasan

Minggu 8 dari 10: **Subscriptions** (Menengah).
