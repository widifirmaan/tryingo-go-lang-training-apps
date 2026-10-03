# Apollo Federation v2 & Microservices Architecture

> **Kategori:** GraphQL | **Level:** Real-Time Subscriptions, Security & Federation | **Minggu 7:** Apollo Federation v2 & Microservices Architecture
> ⏱️ **Estimated Time:** 45 Minutes (15m theory, 30m practice) | 🔗 **Pace:** Structured (Step-by-step)


## Learning Objectives

- Understand the architectural shift from monolithic GraphQL to distributed Apollo Federation v2
- Define Federated Entities leveraging the `@key(fields: "...")` directive
- Implement reference resolvers via `__resolveReference` for cross-boundary entity hydration
- Extend remote subgraph entities cleanly while preserving strict service isolation

---

## Program: Federated Subgraph Declaration with @key Directives and Cross-Service Entity Extensions

```typescript
// ============================================================================
// SUBGRAPH 1: Products Service (Runs as independent Microservice on Port 4001)
// ============================================================================
import { ApolloServer } from '@apollo/server';
import { buildSubgraphSchema } from '@apollo/subgraph';
import gql from 'graphql-tag';

const productsTypeDefs = gql`
  extend schema
    @link(url: "https://specs.apollo.dev/federation/v2.0", import: ["@key", "@shareable"])

  # Product is a federated Entity keyed by its primary identifier 'id'
  type Product @key(fields: "id") {
    id: ID!
    sku: String!
    title: String!
    price: Float!
  }

  type Query {
    products: [Product!]!
  }
`;

const productsResolvers = {
  Query: {
    products: () => [
      { id: 'prod_001', sku: 'MCK-01', title: 'Mechanical Keyboard Pro', price: 1200000 },
    ],
  },
  Product: {
    // Reference Resolver: Resolves entity when queried across OTHER subgraphs!
    __resolveReference: (reference: { id: string }) => {
      return { id: reference.id, sku: 'MCK-01', title: 'Mechanical Keyboard Pro', price: 1200000 };
    },
  },
};

const productsServer = new ApolloServer({
  schema: buildSubgraphSchema({ typeDefs: productsTypeDefs, resolvers: productsResolvers }),
});

// ============================================================================
// SUBGRAPH 2: Reviews Service (Runs independently on Port 4002)
// Extends Product entity without touching Products database!
// ============================================================================
const reviewsTypeDefs = gql`
  extend schema
    @link(url: "https://specs.apollo.dev/federation/v2.0", import: ["@key"])

  # Extend Product entity by adding reviews field
  type Product @key(fields: "id") {
    id: ID!
    reviews: [Review!]!
  }

  type Review {
    id: ID!
    rating: Int!
    body: String!
  }
`;

const reviewsResolvers = {
  Product: {
    reviews: (parent: { id: string }) => {
      return [{ id: 'rev_101', rating: 5, body: 'Superb tactile feedback!' }];
    },
  },
};

export { productsTypeDefs, productsResolvers, reviewsTypeDefs, reviewsResolvers };
```

---

## Key Concepts

### Why Apollo Federation v2?
In enterprise organizations with distributed engineering teams (e.g. Core Products, Payments, Inventory, Reviews), a monolithic GraphQL server quickly becomes a deployment bottleneck: git merge collisions, uncoordinated releases, and single points of failure.
**Apollo Federation v2** decomposes monolithic graphs into autonomous microservices known as **Subgraphs**. A high-performance **Router Gateway** composes them into a unified **Supergraph**, presenting an integrated API surface to frontend clients.

### Distributed Entities and the @key Directive
In Federation, domain models transcend service boundaries:
- `@key(fields: "id")`: Flags `Product` as an **Entity**. The `id` attribute acts as the universal entity key across microservices.
- **Products Subgraph**: Authority over product core metadata (`sku, title, price`).
- **Reviews Subgraph**: Extends the `Product` entity by appending `reviews: [Review!]!`, completely decoupled from the products database.

### Gateway Orchestration and __resolveReference
When clients query: `{ products { title reviews { rating } } }`:
1. The Gateway requests product `id` and `title` from the Products Subgraph.
2. The Gateway extracts the returned entity representations and routes them to the Reviews Subgraph.
3. The Reviews Subgraph dispatches `__resolveReference` to hydrate the requested reviews against the resolved entity keys.
Orchestration plans are compiled and executed transparently by the Gateway runtime.

---

---

## Beginner Friendly Explanation

Think of Apollo Federation like an international news magazine.
The Journalism Bureau writes the lead articles (Products Subgraph). The Photography Studio supplies the visual imagery (Reviews Subgraph).
Both teams work in distinct physical headquarters without stepping on each other's toes.

Before the magazine hits the newsstand, the Managing Editor (Router Gateway) binds the writing and photography into one cohesive issue!

## Experiments

- Inspect the composed Supergraph schema using rover subgraph check and compose tooling
- Simulate __resolveReference execution by manually testing entity representation query structures
- Apply the @shareable directive to allow fields to be resolved legitimately across multiple subgraphs
- Inspect the compiled query execution plan within Apollo Router visualizing multi-subgraph dispatch

---

## Challenge

Author a 3rd subgraph: `Users Subgraph` declaring `User @key(fields: "id")`. Extend the `Review` entity in the Reviews Subgraph so `author` references the federated `User` entity.

---

## Syntax Cheatsheet & Quick Reference

| Syntax / Keyword | Purpose & Practical Pattern |
| :--- | :--- |
| **Declaration & Setup** | Initialize data structures, type constraints, and dependencies |
| **Core Processing** | Algorithm execution, control flow, and data transformation |
| **Defensive Validation** | Verify data invariants and handle errors explicitly |
| **Return / Output** | Deliver deterministic output ready for consumption |

---

## Common Pitfalls & Debugging Tips

### 1. Unbounded Query Nesting Attacks
- **Symptom / Issue:** Malicious circular queries exhaust server CPU and database resources.
- **Root Cause:** Common mistaken assumptions during early development.
- **Fix / Best Practice:** Enforce query depth limits and query complexity analysis middleware.

### 2. Resolver N+1 Database Execution
- **Symptom / Issue:** Child field resolvers fire individual database queries per parent item in an array.
- **Root Cause:** Common mistaken assumptions during early development.
- **Fix / Best Practice:** Use `DataLoader` to batch and cache database calls within a request cycle.

### 3. Exposing Internal Server Traces to Clients
- **Symptom / Issue:** Database stack traces and confidential errors surface in GraphQL error responses.
- **Root Cause:** Common mistaken assumptions during early development.
- **Fix / Best Practice:** Sanitize errors in server configuration using custom `formatError` handlers.

---

## Summary

You have mastered distributed Apollo Federation v2 architecture: entity declarations via @key, decoupled subgraph design, __resolveReference resolution, and supergraph composition.
