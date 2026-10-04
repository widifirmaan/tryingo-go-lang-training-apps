# GraphQL vs REST Philosophy: SDL, Scalars & First Query

> **Kategori:** GraphQL | **Level:** Schema Foundations & Query/Mutation Execution | **Minggu 1:** GraphQL vs REST Philosophy: SDL, Scalars & First Query
> ⏱️ **Estimated Time:** 45 Minutes (15m theory, 30m practice) | 🔗 **Pace:** Structured (Step-by-step)


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


---

## Interactive Playground Query

Run the following GraphQL query directly in the playground panel on the right to see how GraphQL returns only the exact fields requested without over-fetching:

```graphql
# Week 1: First Query - Fetching Product Catalog
query GetProductsCatalog {
  products {
    id
    name
    category
    price
    inStock
  }
}
```

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

## Visual Mental Model & Architecture Flow

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

## Syntax Reference & Practical Guide (W3Schools Style)

Here is the comprehensive breakdown of syntax signatures, parameters, return behavior, and isolated runnable examples introduced in this module:

### 1. `type Entity { id: ID! name: String! }`
- **Core Functionality:** Schema Definition Language (SDL) Tipe Entitas.
- **Parameters / Attributes:** `Field Name, Type, Non-Null Modifier (!)`.
- **System Behavior & Return:** Mendefinisikan kontrak tipe data yang dijamin oleh server kepada seluruh klien API..
- **Practical Code Example:**
```graphql
type Product {
  id: ID!
  name: String!
  price: Float!
  inStock: Boolean!
}
```
- **Expected Execution Output:**
```output
Mendefinisikan tipe Product dalam skema SDL
```

### 2. `type Query { products: [Product!]! }`
- **Core Functionality:** Root Query Type gerbang pembacaan data.
- **Parameters / Attributes:** `Field Resolver Signature`.
- **System Behavior & Return:** Menjadi pintu masuk semua operasi pembacaan data yang dapat diminta oleh klien..
- **Practical Code Example:**
```graphql
type Query {
  products(limit: Int): [Product!]!
  product(id: ID!): Product
}
```
- **Expected Execution Output:**
```output
Klien dapat meminta daftar produk dengan filter limit
```

### 3. `mutation CreateOrder($input: OrderInput!)`
- **Core Functionality:** Operation of perubahan data atomik.
- **Parameters / Attributes:** `GraphQL variables, Input Object Type`.
- **System Behavior & Return:** Mengirimkan data perubahan ke server dan meminta field balasan yang diperbarui secara atomik..
- **Practical Code Example:**
```graphql
mutation AddOrder {
  createOrder(customer: "Alex", items: [{ product: "Hub", qty: 1 }]) {
    id
    total
    status
  }
}
```
- **Expected Execution Output:**
```output
Pesanan dibuat dan ID beserta status langsung dikembalikan
```

### 4. `resolvers = { Query: { field: (parent, args, ctx) => ... } }`
- **Core Functionality:** Fungsi Resolver pemetaan data.
- **Parameters / Attributes:** `parent, args, context, info`.
- **System Behavior & Return:** Fungsi backend yang mengeksekusi pengambilan data dari database untuk setiap field skema..
- **Practical Code Example:**
```typescript
const resolvers = {
  Query: {
    product: (_, { id }, { db }) => db.products.findById(id)
  }
};
```
- **Expected Execution Output:**
```output
Resolver mengambil data dari database sesuai argumen id
```

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

You have mastered GraphQL vs REST fundamentals, authored SDL contracts with scalars and non-null modifiers, and initialized an Apollo Server 4 standalone runtime.
