# GraphQL Security: Query Depth, Complexity & Introspection

> **Kategori:** GraphQL | **Level:** Real-Time Subscriptions, Security & Federation | **Minggu 6:** GraphQL Security: Query Depth, Complexity & Introspection
> ⏱️ **Estimated Time:** 45 Minutes (15m theory, 30m practice) | 🔗 **Pace:** Structured (Step-by-step)


## Learning Objectives

- Identify distinctive GraphQL attack vectors: Circular Recursive Query Denial of Service (DoS)
- Implement custom AST validation rules enforcing strict Query Depth Limiting
- Configure Query Cost Complexity Analysis to bound CPU and database execution footprints
- Harden production environments: Disable Schema Introspection and suppress leak-prone error traces

---

## Program: GraphQL API DoS Shielding via Depth Limiting and Query Cost Analysis Validation

```typescript
import { ApolloServer } from '@apollo/server';
import { GraphQLError } from 'graphql';

// 1. Cyclic Graph Schema Vulnerable to Circular DoS Attacks:
// user -> friends -> friends -> friends -> ... (Infinite recursion crashing server!)
const typeDefs = `#graphql
  type User {
    id: ID!
    name: String!
    friends: [User!]!
  }

  type Query {
    users: [User!]!
  }
`;

// 2. Custom AST Validation Rule: Query Depth Limiting
// Traverses AST to ensure nested query depth NEVER exceeds maximum threshold (e.g. 4)
const depthLimitRule = (maxDepth: number) => {
  return (context: any) => ({
    Field: {
      enter(node: any) {
        // Compute nesting depth from AST ancestors
        const depth = context.getAncestors().filter((a: any) => a.kind === 'Field').length;
        if (depth > maxDepth) {
          context.reportError(
            new GraphQLError(`Query depth limit of ${maxDepth} exceeded! Current depth: ${depth}`, {
              nodes: [node],
              extensions: { code: 'BAD_USER_INPUT' },
            })
          );
        }
      },
    },
  });
};

// 3. Secure Production Apollo Server Configuration
const server = new ApolloServer({
  typeDefs,
  resolvers: {
    Query: { users: () => [] },
  },
  // Disable schema introspection and Apollo Sandbox in production to prevent schema leakage
  introspection: process.env.NODE_ENV !== 'production',
  validationRules: [
    depthLimitRule(4), // Reject circular queries deeper than 4 levels
  ],
});

console.log('🛡️ GraphQL Security Gateway hardened against DoS and Introspection scraping.');
export { depthLimitRule };
```

---


---

## Interactive Playground Search Query

Run the following keyword search query in the playground to test catalog filtering and field restrictions:

```graphql
# Week 6: Search & Selection
query SearchProductsCatalog {
  searchProducts(keyword: "keyboard") {
    id
    name
    category
    price
    tags
    inStock
  }
}
```

## Key Concepts

### Why GraphQL is Inherently Vulnerable to DoS
GraphQL flexibility is a double-edged sword. In REST, endpoints are strictly bounded by backend implementations. In GraphQL, clients dictate graph traversal queries arbitrarily.
If a schema declares recursive relationships (`User.friends: [User]`), an attacker can dispatch a deeply nested query:
`query { users { friends { friends { friends { friends { ... } } } } } }`.
A payload under 2KB forces the database into billions of recursive joins, starving CPU and crashing backend nodes within seconds (**Circular Recursive DoS**).

### The Three Pillars of GraphQL Hardening
1. **Query Depth Limiting**: Traverses the Abstract Syntax Tree (AST) before execution. If query nesting breaches safe thresholds (e.g. depth > 5), the engine rejects the request at the validation phase before dispatching resolvers.
2. **Query Cost Complexity Analysis**: Assigns weight to attributes (e.g. scalars cost 1 point, pagination multipliers scale points by `first: 100`). If aggregate complexity breaches the ceiling, execution aborts.
3. **Disabling Introspection in Production**: Schema Introspection enables reverse-engineering tools to map your internal entities. Enforcing `introspection: false` in production is a mandatory security baseline.

---

---

## Beginner Friendly Explanation

Imagine opening a burger joint with the policy: 'Customers may customize burgers with arbitrary layers'.
A rogue patron orders a burger featuring 10,000 layers of bacon and cheese (Circular Query DoS). Your kitchen burns through all inventory and chefs collapse from exhaustion.

Depth Limiting is like putting a bold sign at the register: 'Maximum 4 toppings per burger!'. Any order violating this is rejected by the cashier before the grill is even lit!

## Experiments

- Dispatch a 5-level nested query and verify rejection: Query depth limit of 4 exceeded!
- Test introspection behavior: execute { __schema { types { name } } } when introspection is disabled
- Configure Apollo Server formatError to sanitize database stack traces from client responses
- Simulate a complexity calculator weighting query costs dynamically based on pagination bounds

---

## Challenge

Author a custom GraphQL AST validation rule bounding aliases (`aliasLimitRule`): reject payloads containing over 10 aliases to block Password Brute-Forcing via Query Aliasing.

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

You have mastered GraphQL security engineering: mitigating recursive DoS attacks with Query Depth Limiting, Query Complexity Analysis, Introspection lockdowns, and error sanitization.
