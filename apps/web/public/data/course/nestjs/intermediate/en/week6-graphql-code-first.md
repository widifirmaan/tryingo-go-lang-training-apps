# Modern GraphQL: Code-First Paradigm, Resolvers & Mutations

> **Kategori:** NestJS Enterprise Architecture | **Level:** Intermediate | **Minggu 6:** Modern GraphQL: Code-First Paradigm, Resolvers & Mutations
> ⏱️ **Estimated Time:** 45 Minutes (15m theory, 30m practice) | 🔗 **Pace:** Structured (Step-by-step)


## Learning Objectives

- Differentiate Code-First from Schema-First paradigms in NestJS GraphQL.
- Apply GraphQL decorators: `@ObjectType`, `@Field`, `@Resolver`, `@Query`, and `@Mutation`.
- Eliminate network over-fetching and under-fetching across client applications.
- Auto-generate SDL `schema.gql` schemas directly from annotated TypeScript classes.

---

## Program: GraphQL Product Resolver with FieldResolvers & Dynamic Relations

```typescript
// Menggunakan @nestjs/graphql, @apollo/server, dan graphql
// Pendekatan Code-First: Skema GraphQL digenerate otomatis dari TypeScript Classes

import { Field, ObjectType, ID, Float, Int, Resolver, Query, Mutation, Args } from '@nestjs/graphql';

// 1. GraphQL Object Type (Model Data Skema)
@ObjectType()
export class ProductType {
  @Field(() => ID)
  id!: string;

  @Field()
  sku!: string;

  @Field()
  name!: string;

  @Field(() => Float)
  price!: number;

  @Field(() => Int)
  stock!: number;

  @Field(() => Boolean)
  inStock!: boolean;
}

// 2. GraphQL Resolver (Pengganti Controller pada REST)
@Resolver(() => ProductType)
export class ProductResolver {
  private products: ProductType[] = [
    { id: '1', sku: 'SKU-001', name: 'Mechanical Keyboard RGB', price: 1250000, stock: 15, inStock: true },
    { id: '2', sku: 'SKU-002', name: 'Ultra-wide Curved Monitor', price: 6800000, stock: 0, inStock: false },
  ];

  @Query(() => [ProductType], { name: 'products', description: 'Ambil semua daftar produk katalog' })
  async getProducts(): Promise<ProductType[]> {
    return this.products;
  }

  @Query(() => ProductType, { name: 'productBySku', nullable: true })
  async getProductBySku(@Args('sku') sku: string): Promise<ProductType | undefined> {
    return this.products.find(p => p.sku === sku);
  }

  @Mutation(() => ProductType, { name: 'updateStock' })
  async updateStock(
    @Args('id', { type: () => ID }) id: string,
    @Args('newStock', { type: () => Int }) newStock: number
  ): Promise<ProductType> {
    const product = this.products.find(p => p.id === id);
    if (!product) throw new Error(`Produk dengan ID ${id} tidak ditemukan.`);

    product.stock = newStock;
    product.inStock = newStock > 0;
    return product;
  }
}

console.log('=== GRAPHQL CODE-FIRST RESOLVER TERDEFINISI ===');
console.log('Skema schema.gql digenerate otomatis saat aplikasi NestJS dinyalakan.');
```

---

## Key Concepts

In mobile e-commerce applications, REST endpoints waste client bandwidth by transmitting redundant attributes (over-fetching) or requiring three separate HTTP calls to render a single product detail screen (under-fetching). GraphQL solves this by empowering clients to request exactly the attributes they need.

### The Code-First Paradigm in NestJS
NestJS provides two GraphQL approaches:
1. **Schema-First**: Manually maintaining raw `.graphql` SDL files and matching resolvers.
2. **Code-First (Enterprise Standard)**: Authoring canonical TypeScript classes decorated with `@ObjectType()` and `@Field()`. NestJS automatically synthesizes the schema SDL (`schema.gql`) upon startup. This guarantees a Single Source of Truth with zero drift between database models, TypeScript types, and GraphQL schemas.

### Resolvers & Mutations
- `@Query()`: Designates read operations (analogous to HTTP GET).
- `@Mutation()`: Encapsulates state-mutating actions (analogous to POST, PUT, DELETE).
- `@ResolveField()`: Dynamically loads relational child entities exclusively when the client's query explicitly selects that field.


---

---

## Beginner Friendly Explanation

Imagine ordering at a restaurant. A REST API behaves like a fixed set menu: you are forced to accept soup, salad, and steak even if you only wanted the steak. A GraphQL API behaves like an à la carte buffet: you request exactly the steak on your plate, paying zero bandwidth for unneeded dishes.

## Experiments

- Navigate to Apollo Sandbox at `http://localhost:3000/graphql`.
- Execute query `{ products { name price } }` and verify unrequested fields are omitted.
- Add a `@ResolveField(() => [ReviewType])` decorator resolving product reviews lazily.

---

## Challenge

Deploy `DataLoader` within a FieldResolver to resolve the N+1 Query Problem when retrieving categories across 50 products concurrently.

---

## Visual Mental Model & Architecture Flow

```diagram
┌──────────────┐      Call Stack Empty?      ┌────────────────┐
│  CALL STACK  │ ◄─────────────────────────  │   EVENT LOOP   │
│ (Sync Frames)│                             │  (Coordinator) │
└──────┬───────┘                             └───────▲────────┘
       │ Async Operations (Fetch / Timer)            │
       ▼                                             │
┌──────────────┐                             ┌───────┴────────┐
│  WEB APIs    │ ─── Callback Ready ──────►  │ TASK / PROMISE │
│ (Background) │                             │     QUEUE      │
└──────────────┘                             └────────────────┘
```

---

## Syntax Reference & Practical Guide (W3Schools Style)

Here is the comprehensive breakdown of syntax signatures, parameters, return behavior, and isolated runnable examples introduced in this module:

### 1. `const / let variables`
- **Core Functionality:** Modern block-scoped variable declarations.
- **Parameters / Attributes:** `Identifier, Initial Value`.
- **System Behavior & Return:** `const` defines immutable references; `let` defines reassignable state variables bounded to enclosing blocks.
- **Practical Code Example:**
```javascript
const title = 'Tryngo Learning';
let counter = 0;
counter += 1;
console.log(title, counter);
```
- **Expected Execution Output:**
```text
Tryngo Learning 1
```

### 2. `() => { ... } (Arrow Function)`
- **Core Functionality:** Compact function expression with lexical 'this'.
- **Parameters / Attributes:** `Parameters, Function Body`.
- **System Behavior & Return:** Provides concise function syntax while retaining the lexical `this` binding of the outer enclosing scope.
- **Practical Code Example:**
```javascript
const double = (n) => n * 2;
console.log(double(21));
```
- **Expected Execution Output:**
```text
42
```

### 3. `async / await & fetch(url)`
- **Core Functionality:** Linear asynchronous Promise resolution.
- **Parameters / Attributes:** `URL string, RequestInit options`.
- **System Behavior & Return:** Author asynchronous asynchronous workflows sequentially without callback pyramids.
- **Practical Code Example:**
```javascript
async function getUser(id) {
  const res = await fetch(`https://api.example.com/users/${id}`);
  return await res.json();
}
```
- **Expected Execution Output:**
```text
Returns resolved JSON object from server
```

### 4. `Array.prototype.map() / filter()`
- **Core Functionality:** Pure functional array transformation.
- **Parameters / Attributes:** `callback(item, index, array)`.
- **System Behavior & Return:** `map` returns transformed values; `filter` removes non-matching elements without mutating the original array.
- **Practical Code Example:**
```javascript
const numbers = [1, 2, 3, 4, 5];
const evens = numbers.filter(n => n % 2 === 0);
console.log(evens);
```
- **Expected Execution Output:**
```text
[2, 4]
```


---

## Common Pitfalls & Debugging Tips

### 1. Indiscriminate Request-Scoped Providers
- **Symptom / Issue:** Degrades throughput significantly by re-instantiating dependency trees per request.
- **Root Cause:** Common mistaken assumptions during early development.
- **Fix / Best Practice:** Stick to default Singleton providers unless per-request isolation is strictly required.

### 2. Missing Module Exports / Imports
- **Symptom / Issue:** Crashes on boot: `Nest can't resolve dependencies of the Service`.
- **Root Cause:** Common mistaken assumptions during early development.
- **Fix / Best Practice:** Verify that the exporting module exports the provider and the consumer imports it.

### 3. Omitting Global ValidationPipe
- **Symptom / Issue:** DTO payload properties pass into business services unvalidated.
- **Root Cause:** Common mistaken assumptions during early development.
- **Fix / Best Practice:** Configure `app.useGlobalPipes(new ValidationPipe({ whitelist: true }))` in `main.ts`.

---

## Summary

You have mastered GraphQL Code-First, Resolvers, and Mutations in NestJS. Next week we explore Distributed Caching with Redis and Interceptors.
