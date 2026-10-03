# GraphQL vs REST Philosophy: SDL, Scalars & First Query

> **Kategori:** GraphQL | **Level:** Schema Foundations & Query/Mutation Execution | **Minggu 1:** GraphQL vs REST Philosophy: SDL, Scalars & First Query

## Learning Objectives

- Understand architectural REST pitfalls (Over-fetching and Under-fetching) and GraphQL solutions
- Author rigorous contracts using Schema Definition Language (SDL)
- Master built-in GraphQL types: Scalar primitives (ID, String, Int, Float, Boolean) and Non-Null modifiers (!)
- Boot an Apollo Server 4 standalone runtime bound to foundational root query resolvers

---

## Program: Standalone GraphQL Server with Apollo Server v4 and Schema Definition Language

```typescript
import { ApolloServer } from '@apollo/server';
import { startStandaloneServer } from '@apollo/server/standalone';

// 1. Schema Definition Language (SDL) defines strict contract
const typeDefs = `#graphql
  # Enumeration of order statuses
  enum OrderStatus {
    PENDING
    PAID
    SHIPPED
    CANCELLED
  }

  # Product entity
  type Product {
    id: ID!
    sku: String!
    title: String!
    price: Float!
    inStock: Boolean!
  }

  # Customer entity
  type Customer {
    id: ID!
    email: String!
    fullName: String!
  }

  # Root Query Type - Ingress entry point for all reads
  type Query {
    products(limit: Int): [Product!]!
    product(id: ID!): Product
    me: Customer
  }
`;

// Mock database storage
const PRODUCTS_DB = [
  { id: 'prod_1', sku: 'LAP-001', title: 'ThinkBook Ultra', price: 16500000.0, inStock: true },
  { id: 'prod_2', sku: 'MOU-002', title: 'Wireless Ergonomic Mouse', price: 350000.0, inStock: false },
];

// 2. Resolvers mirror schema shape
const resolvers = {
  Query: {
    products: (_parent: unknown, args: { limit?: number }) => {
      if (args.limit) {
        return PRODUCTS_DB.slice(0, args.limit);
      }
      return PRODUCTS_DB;
    },
    product: (_parent: unknown, args: { id: string }) => {
      return PRODUCTS_DB.find((p) => p.id === args.id) || null;
    },
    me: () => ({
      id: 'cust_99',
      email: 'alex.developer@example.com',
      fullName: 'Alex Iskandar',
    }),
  },
};

// 3. Instantiate and start Apollo Server 4
const server = new ApolloServer({ typeDefs, resolvers });

const { url } = await startStandaloneServer(server, {
  listen: { port: 4000 },
});

console.log(`🚀 GraphQL Gateway ready at ${url}`);
```

---

## Key Concepts

### Why GraphQL Was Born: Neutralizing Over-fetching & Under-fetching
In legacy REST paradigms:
- **Over-fetching**: A lightweight mobile app widget requesting product titles receives 50 serialized relational database attributes over `GET /api/products/1`, wasting cellular bandwidth.
- **Under-fetching (Waterfall Network Requests)**: Rendering an order detail view forces clients into sequential HTTP round trips: `GET /orders/123`, then `GET /customers/45`, then `GET /products/99`.
**GraphQL** reverses client-server power dynamics: Clients declaratively request the exact fields required in a single HTTP POST round trip, and the server returns a JSON payload mirroring the query's structural shape.

### Schema-First Contracts and SDL
GraphQL enforces strict type safety. **SDL (Schema Definition Language)** defines an unambiguous API schema agnostic of backend implementation languages.
- `ID!`: Represents a unique identifier string. The exclamation mark (`!`) denotes **Non-Nullability** (the server guarantees this value is never null).
- `[Product!]!`: Signifies a non-null array where inner product elements are likewise guaranteed non-null.

### Mapping Schema to Resolvers
Every field declared in SDL corresponds to an execution function known as a **Resolver**. Resolvers encapsulate data fetching from arbitrary sources: PostgreSQL relations, MongoDB collections, Redis caches, or upstream microservices.

---

---

## Beginner Friendly Explanation

Imagine a REST API like ordering fixed combo meals at a drive-thru: ordering Combo #1 forces you to receive a burger, fries, and large soda even if you only wanted a glass of water (Over-fetching).

GraphQL is like an à la carte buffet: you hold a plate, and the chef ladles out strictly the items you point to. Nothing is wasted, and your complete meal is served on a single plate in one unified trip!

## Experiments

- Open Apollo Studio Sandbox at http://localhost:4000 and run query { products { title price } }
- Request an undeclared field (e.g. description) and observe GraphQL compile-time validation errors
- Remove the exclamation mark ! from Float and inspect how the schema permits nullable outputs
- Execute a parameterized query: { products(limit: 1) { id title } }

---

## Challenge

Extend the SDL with a `Category` entity linked to `Product`, implementing root resolvers for `categories: [Category!]!` returning active product groupings.

---

## Summary

You have mastered GraphQL vs REST fundamentals, authored SDL contracts with scalars and non-null modifiers, and initialized an Apollo Server 4 standalone runtime.
