# Subscriptions — Live GraphQL Shop Bell

> **Kategori:** GraphQL | **Level:** Intermediate | **Minggu 8:** Subscriptions
> **Prerequisites:** Week 7 — **DataLoader & N+1**.

## Learning Objectives

- `type Subscription { outOfStock: Product }` + `pubsub.asyncIterator` — server pushes, client doesn't ask (source: apollographql.com/docs/apollo-server/data/subscriptions)

---

## Why This Matters (Non-IT)

Without subscriptions, phones refresh every 5 seconds checking stock (battery + data waste). With subscriptions (WebSocket), stock empties → phone rings that very second.

---

## Program: Shop Stock Bell

```javascript
// Server
const { PubSub } = require("graphql-subscriptions");
const pubsub = new PubSub();

const typeDefs = `#graphql
  type Subscription { outOfStock: Product }
  type Mutation { sell(id: ID!): Product }
`;

// When a sale hits 0 → broadcast!
const resolvers = {
  Mutation: {
    sell: (_, { id }) => {
      const p = decrementStock(id);
      if (p.stock === 0) pubsub.publish("STOCK_EMPTY", { outOfStock: p });
      return p;
    },
  },
  Subscription: {
    outOfStock: { subscribe: () => pubsub.asyncIterator(["STOCK_EMPTY"]) },
  },
};
```

```graphql
# Phone (once, listens forever):
subscription {
  outOfStock { name }
}
```

---

## Key Concepts

### Query/Mutation/Subscription = Ask/Write/Listen
Queries pull, subscriptions push (WebSocket stays open).

### `publish` + `asyncIterator` = Broadcast + Listen
`publish("TOPIC", data)` broadcasts, `asyncIterator(["TOPIC"])` listens.

---

## Beginner Friendly Explanation

### Analogy: Doorbell vs Knocking Every Second
- **Polling = knocking every 5 seconds** ("any package?").
- **Subscription = doorbell**: package arrives → bell rings.

### Step 0 — Prepare Device
- Apollo Server from W5 + WebSocket-ready client (GraphiQL supports subscriptions).

### How the Computer Reads It
1. `sell` drops stock to 0 → `publish` fires.
2. Subscribed phones receive `{ outOfStock: {...} }` instantly.

### 3 Must-Know Terms
1. **Subscription/publish**: listen/broadcast
2. **WebSocket**: always-connected call

---

## Experiments

- **Green:** Open 2 subscription tabs → sell to 0 → both ring?
- **Yellow:** No `publish` → silence? (Normal, no broadcast.)
- **Red:** 5-second polling vs subscription → which wastes battery/data?

---

## Challenge

**Live Shop:** `outOfStock` subscription + `sell` publishing at 0 + 2 tabs listening together, screenshot.

---

## Mini Glossary

- **Subscription/publish**: listen/broadcast

---

## Summary

Week 8 of 10: **Live Bell** (Level: Intermediate). Push, don't ask. Next: **Testing**.
