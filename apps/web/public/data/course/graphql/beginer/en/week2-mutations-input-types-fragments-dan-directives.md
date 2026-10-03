# Mutations, Input Types, Fragments & Directives

> **Kategori:** GraphQL | **Level:** Schema Foundations & Query/Mutation Execution | **Minggu 2:** Mutations, Input Types, Fragments & Directives
> ⏱️ **Estimated Time:** 45 Minutes (15m theory, 30m practice) | 🔗 **Pace:** Structured (Step-by-step)


## Learning Objectives

- Design state-modifying write operations using the Root Mutation Type
- Encapsulate structured argument groups cleanly using Input Types (`input ...`)
- Implement the Mutation Response Payload Pattern for graceful domain error handling
- Leverage GraphQL Fragments to eliminate duplication across client queries and apply Directives (@include, @skip)

---

## Program: CRUD Mutation Operations with Structured Input Types and Reusable Fragments

```typescript
import { ApolloServer } from '@apollo/server';

const typeDefs = `#graphql
  type Product {
    id: ID!
    sku: String!
    title: String!
    price: Float!
    stock: Int!
    createdAt: String!
  }

  # Input Types group arguments cleanly instead of long argument lists
  input CreateProductInput {
    sku: String!
    title: String!
    price: Float!
    stock: Int! = 0 # Default value
  }

  input UpdateStockInput {
    productId: ID!
    deltaQuantity: Int!
  }

  # Payload pattern: Return status and newly mutated entity
  type MutationResponse {
    code: String!
    success: Boolean!
    message: String!
    product: Product
  }

  type Query {
    products: [Product!]!
  }

  # Root Mutation Type - Ingress for state-changing write operations
  type Mutation {
    createProduct(input: CreateProductInput!): MutationResponse!
    adjustInventory(input: UpdateStockInput!): MutationResponse!
  }
`;

interface ProductRecord {
  id: string;
  sku: string;
  title: string;
  price: number;
  stock: number;
  createdAt: string;
}

const productsStore: ProductRecord[] = [];

const resolvers = {
  Query: {
    products: () => productsStore,
  },
  Mutation: {
    createProduct: (
      _parent: unknown,
      { input }: { input: { sku: string; title: string; price: number; stock: number } }
    ) => {
      if (input.price < 0) {
        return {
          code: 'INVALID_PRICE',
          success: false,
          message: 'Product price cannot be negative.',
          product: null,
        };
      }

      const newProduct: ProductRecord = {
        id: `prod_${Date.now()}`,
        sku: input.sku,
        title: input.title,
        price: input.price,
        stock: input.stock,
        createdAt: new Date().toISOString(),
      };

      productsStore.push(newProduct);

      return {
        code: '201_CREATED',
        success: true,
        message: 'Product created successfully.',
        product: newProduct,
      };
    },
    adjustInventory: (
      _parent: unknown,
      { input }: { input: { productId: string; deltaQuantity: number } }
    ) => {
      const product = productsStore.find((p) => p.id === input.productId);
      if (!product) {
        return {
          code: 'NOT_FOUND',
          success: false,
          message: 'Product does not exist.',
          product: null,
        };
      }

      product.stock += input.deltaQuantity;

      return {
        code: '200_UPDATED',
        success: true,
        message: 'Stock updated.',
        product,
      };
    },
  },
};

export { typeDefs, resolvers };
```

---

## Key Concepts

### The Root Mutation Contract
While `Query` resolvers operate idempotently with zero side effects, **Mutations** exist specifically to mutate server state (`INSERT`, `UPDATE`, `DELETE`). Crucially, while GraphQL query field resolvers may evaluate concurrently in parallel, the GraphQL specification mandates that top-level mutation fields execute **serially in strict sequential order** to prevent write race conditions.

### Input Types vs Object Types
The GraphQL specification disallows utilizing standard object `type` declarations as mutation arguments. Developers must declare specialized **`input`** types. Input types are strictly constrained to scalar primitives, enums, or nested input types (excluding interfaces and unions).

### The Mutation Response Payload Pattern
A common anti-pattern is returning domain models directly (`createProduct(...): Product!`). In the event of domain validation faults, servers revert to protocol-level GraphQL errors. The **Mutation Response Payload Pattern** wraps mutations in an envelope (`code`, `success`, `message`, `product`), allowing client applications to handle business validation gracefully.

### Reusable Fragments and Conditional Directives
- **Fragments**: Encapsulate reusable field selections across components (e.g. `fragment ProductCard on Product { id title price }`).
- **Directives**: Apply runtime client conditional logic, such as `@include(if: $withStock)` or `@skip(if: $isMobile)`.

---

---

## Beginner Friendly Explanation

Think of a Query like inspecting a restaurant menu (purely reading without changing anything).

A Mutation is like handing your order ticket to the chef (mutating server state: the chef begins cooking and inventory is depleted).
An Input Type is like a tidy order slip: you fill out name, table number, and spice level within one organized card. The Mutation Payload is like the waiter handing you a receipt: 'Success! Here is your order confirmation number and status!'

## Experiments

- Execute createProduct with a negative price and inspect the INVALID_PRICE envelope
- Author a query utilizing fragments: fragment CoreInfo on Product { id title price } and apply ...CoreInfo
- Test the @include(if: true) directive and observe fields appearing conditionally
- Send dual mutations in a single payload to verify sequential serial evaluation order

---

## Challenge

Author a `deleteProduct(id: ID!): MutationResponse!` mutation that validates entity existence, removes it from memory, and returns a graceful confirmation payload.

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

You have mastered data writing via Root Mutations, structured parameter grouping with Input Types, the Mutation Payload Pattern, Fragments, and Directives.
