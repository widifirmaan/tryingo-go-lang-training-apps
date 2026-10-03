# Resolver Execution Tree & Auth Context

> **Kategori:** GraphQL | **Level:** Schema Foundations & Query/Mutation Execution | **Minggu 3:** Resolver Execution Tree & Auth Context
> ⏱️ **Estimated Time:** 45 Minutes (15m theory, 30m practice) | 🔗 **Pace:** Structured (Step-by-step)


## Learning Objectives

- Understand hierarchical tree traversal in the GraphQL Resolver Execution Tree
- Master the four universal resolver arguments: parent (root), args, context, and info
- Inject request-scoped metadata (JWT tokens, user context, databases) via GraphQL Context
- Throw standardized, structured exceptions using GraphQLError and extension codes

---

## Program: Nested Resolver Execution Tree with JWT Context Validation

```typescript
import { ApolloServer } from '@apollo/server';
import { GraphQLError } from 'graphql';

const typeDefs = `#graphql
  type User {
    id: ID!
    username: String!
    email: String!
  }

  type Review {
    id: ID!
    rating: Int!
    comment: String!
    author: User! # Nested relational field resolved independently!
  }

  type Item {
    id: ID!
    name: String!
    price: Float!
    reviews: [Review!]! # Nested array resolver
  }

  type Query {
    item(id: ID!): Item
  }
`;

// Context Interface injected per request
interface GraphQLContext {
  currentUser: { id: string; username: string; role: string } | null;
}

// 4-Tier Resolver Architecture: (parent, args, context, info)
const resolvers = {
  Query: {
    item: (_parent: unknown, args: { id: string }) => {
      // Root level query resolver fetches the Item
      return { id: args.id, name: 'Pro Wireless Keyboard', price: 890000.0 };
    },
  },
  Item: {
    // Nested resolver for Item.reviews: 'parent' is the Item object resolved above!
    reviews: (parent: { id: string }, _args: unknown, context: GraphQLContext) => {
      // Guard sensitive data with request context
      if (!context.currentUser) {
        throw new GraphQLError('Authentication required to view item reviews.', {
          extensions: { code: 'UNAUTHENTICATED', http: { status: 401 } },
        });
      }

      return [
        { id: 'rev_1', rating: 5, comment: 'Tactile switches feel incredible!', authorId: 'usr_88' },
        { id: 'rev_2', rating: 4, comment: 'Great battery life.', authorId: 'usr_99' },
      ];
    },
  },
  Review: {
    // Nested resolver for Review.author: 'parent' is the Review object!
    author: (parent: { authorId: string }) => {
      const USERS_DB: Record<string, { id: string; username: string; email: string }> = {
        usr_88: { id: 'usr_88', username: 'keyboard_enthusiast', email: 'ke@example.com' },
        usr_99: { id: 'usr_99', username: 'coder_budi', email: 'budi@example.com' },
      };
      return USERS_DB[parent.authorId];
    },
  },
};

export { typeDefs, resolvers, GraphQLContext };
```

---


---

## Interactive Playground Resolver Arguments

Run the following parameterized ID query in the playground to observe how resolver functions capture specific arguments:

```graphql
# Week 3: Resolver Arguments - Employee Profile by ID
query GetEmployeeProfile {
  employee(id: "1") {
    id
    name
    department
    salary
    skills
    active
  }
}
```

## Key Concepts

### The Four Universal Resolver Arguments
Every GraphQL resolver adheres to an immutable 4-argument signature:
1. `parent` (or `root`): The resolved payload returned by the parent node immediately above in the execution hierarchy.
2. `args`: Field arguments supplied directly by the client in the incoming query document.
3. `context`: A request-scoped mutable object instantiated per incoming HTTP connection. The canonical location for decoded JWT claims, user identities, and database clients.
4. `info`: Internal AST (Abstract Syntax Tree) execution state describing requested field selections.

### The Resolver Execution Tree Dynamics
GraphQL resolves nested graph relationships via recursive tree traversal:
1. Client requests: `item -> reviews -> author -> username`.
2. First, `Query.item` executes, resolving root item attributes `{ id, name, price }`.
3. Second, the runtime inspects the `Item.reviews` selection, invoking its nested resolver with the parent item payload passed as `parent`.
4. Third, iterating over every review entry, the runtime dispatches `Review.author`, passing the child review as `parent` to fetch user profiles.

### Context-Driven Authorization Gates
Authentication logic belongs at the transport perimeter. HTTP gateway middleware verifies incoming `Authorization: Bearer <token>` headers, decoding claims into `context.currentUser`. Any downstream resolver down the graph inspects `context.currentUser` to enforce granular role-based authorization.

---

---

## Beginner Friendly Explanation

Think of the resolver execution tree like a family tree.
The Grandfather (`Query.item`) calls the Father (`Item.reviews`). When the Father speaks, he carries the Grandfather's identity as `parent`. Next, the Father calls the Grandson (`Review.author`).

The Context is like the atmosphere inside the family home: every member from Grandfather to Grandson breathes the identical air. If someone locks the front door (an unauthenticated token), every family member senses it immediately!

## Experiments

- Execute the query omitting authentication headers and verify the UNAUTHENTICATED error envelope
- Inject valid authentication credentials via Context and verify successful review retrieval
- Log the parent argument inside Review.author to inspect the incoming review entity
- Inspect the info argument to observe the compiled Abstract Syntax Tree of the requested query

---

## Challenge

Implement a custom `@auth(requires: ADMIN)` schema directive or context guard restricting user email visibility unless the decoded JWT role equals administrator.

---

## Visual Mental Model & Architecture Flow

![Diagram Perbandingan Arsitektur REST vs GraphQL Query Execution](/diagrams/rest-vs-graphql.svg)

```diagram
┌─────────────────────────────────────────────────────────┐
│ CLIENT: Sends Single Declarative Query (Exact Fields)   │
│ POST /graphql { query { user { id name orders { id } } }│
└────────────────────────────┬────────────────────────────┘
                             │
                             ▼
┌─────────────────────────────────────────────────────────┐
│ GRAPHQL SERVER: SDL Schema & Resolver Tree              │
│ 1. Resolves Query.user -> Calls Database                │
│ 2. Resolves User.orders -> Calls Payment Microservice   │
└────────────────────────────┬────────────────────────────┘
                             │
                             ▼
┌─────────────────────────────────────────────────────────┐
│ RESPONSE: Pure JSON Mirroring Query Structure           │
│ { "data": { "user": { "name": "Alex", "orders": [...] }}}│
└─────────────────────────────────────────────────────────┘
```

---

## Syntax Reference & Practical Guide (W3Schools Style)

Here is the comprehensive breakdown of syntax signatures, parameters, return behavior, and isolated runnable examples introduced in this module:

### 1. `type Entity { id: ID! field: Type! }`
- **Core Functionality:** Schema Definition Language (SDL) Entity Contract.
- **Parameters / Attributes:** `Field names, Types, Non-Null Modifier (!)`.
- **System Behavior & Return:** Defines structural schema contracts strictly guaranteed by server resolvers to API consumers.
- **Practical Code Example:**
```javascript
type Product {
  id: ID!
  title: String!
  price: Float!
  inStock: Boolean!
}
```
- **Expected Execution Output:**
```text
Declares strongly typed Product contract in SDL
```

### 2. `type Query { products: [Product!]! }`
- **Core Functionality:** Root Query Type Entry Point.
- **Parameters / Attributes:** `Field query signature`.
- **System Behavior & Return:** Acts as the single ingress door for all client data reads across the system.
- **Practical Code Example:**
```javascript
type Query {
  products(limit: Int): [Product!]!
  product(id: ID!): Product
}
```
- **Expected Execution Output:**
```text
Clients may query product catalogs with optional limit filtering
```

### 3. `mutation CreateOrder($input: OrderInput!)`
- **Core Functionality:** Atomic State Mutation Operation.
- **Parameters / Attributes:** `GraphQL variables, Input Object Type`.
- **System Behavior & Return:** Executes create, update, or delete commands and returns modified fields atomically.
- **Practical Code Example:**
```javascript
mutation {
  createOrder(customer: "Alex", items: [{ product: "Hub", qty: 1 }]) {
    id
    total
    status
  }
}
```
- **Expected Execution Output:**
```text
Persists order and immediately returns generated ID and status
```

### 4. `resolvers = { Query: { field: (parent, args, ctx) => ... } }`
- **Core Functionality:** Resolver execution mapping function.
- **Parameters / Attributes:** `parent, args, context, info`.
- **System Behavior & Return:** Maps schema fields to underlying database queries, microservice RPCs, or cache Lookups.
- **Practical Code Example:**
```javascript
const resolvers = {
  Query: {
    product: (_, { id }, { db }) => db.products.findById(id)
  }
};
```
- **Expected Execution Output:**
```text
Executes database query using supplied argument ID
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

You have mastered the hierarchical resolver execution tree, the four core resolver arguments (parent, args, context, info), and context-driven authentication guards.
