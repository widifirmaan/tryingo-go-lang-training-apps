# The N+1 Query Problem & DataLoader Batching

> **Kategori:** GraphQL | **Level:** Schema Foundations & Query/Mutation Execution | **Minggu 4:** The N+1 Query Problem & DataLoader Batching

## Learning Objectives

- Diagnose the catastrophic N+1 Query Problem inherent to GraphQL nested execution trees
- Understand event-loop microtask coalescing with the DataLoader batching library
- Enforce the strict batch contract: output arrays must match input key lengths and ordering
- Prevent cross-request data leaks by instantiating fresh DataLoader factories per HTTP Request Context

---

## Program: N+1 Problem Elimination Utilizing DataLoader Batching and In-Memory Caching

```typescript
import DataLoader from 'dataloader';

interface Author {
  id: string;
  name: string;
}

// Simulated relational database lookup function
const batchGetAuthorsFromDB = async (authorIds: readonly string[]): Promise<(Author | Error)[]> => {
  console.log(`[SQL QUERY] SELECT * FROM authors WHERE id IN (${authorIds.map((id) => `'${id}'`).join(', ')});`);

  const AUTHORS_MOCK: Record<string, Author> = {
    auth_1: { id: 'auth_1', name: 'Robert C. Martin' },
    auth_2: { id: 'auth_2', name: 'Martin Fowler' },
    auth_3: { id: 'auth_3', name: 'Kent Beck' },
  };

  // DataLoader requires: Array MUST have same length and same ordering as authorIds input!
  return authorIds.map((id) => AUTHORS_MOCK[id] || new Error(`Author ${id} not found`));
};

// 1. Factory function creating a fresh DataLoader instance PER HTTP REQUEST
export const createLoaders = () => ({
  authorLoader: new DataLoader<string, Author>((keys) => batchGetAuthorsFromDB(keys), {
    cache: true, // Request-level memoization cache
  }),
});

// 2. Demonstration: Resolving 10 books written by 2 authors
// Without DataLoader: Triggers 10 individual SQL queries! (The N+1 Problem)
// With DataLoader: Automatically batches all 10 calls into 1 single SQL query!
const simulateResolvers = async () => {
  const loaders = createLoaders();

  const books = [
    { title: 'Clean Code', authorId: 'auth_1' },
    { title: 'Clean Architecture', authorId: 'auth_1' },
    { title: 'Refactoring', authorId: 'auth_2' },
    { title: 'TDD by Example', authorId: 'auth_3' },
    { title: 'Clean Craftsmanship', authorId: 'auth_1' },
  ];

  console.log('Resolving books and authors in parallel...');

  // Concurrent resolver invocations across nested tree
  const resolvedBooks = await Promise.all(
    books.map(async (book) => ({
      title: book.title,
      author: await loaders.authorLoader.load(book.authorId), // Coalesces keys into one tick!
    }))
  );

  console.log('Successfully resolved:', resolvedBooks);
};

simulateResolvers();
```

---

## Key Concepts

### The Catastrophic N+1 Query Dilemma
The defining liability of GraphQL execution trees is uncoordinated independent resolver dispatch:
When querying 100 books alongside their author profiles:
1. `Query.books` executes 1 SQL query returning 100 records.
2. For each individual book, the runtime dispatches `Book.author` in isolation.
3. Result: The database suffers $1 + 100 = 101$ discrete network queries! Across high-traffic collections, database connection pools are saturated instantly. This is the notorious **N+1 Problem**.

### The DataLoader Solution: Event Loop Tick Coalescing
Developed by Facebook, **DataLoader** solves this via Node.js Event Loop microtask batching:
1. When a resolver invokes `authorLoader.load('auth_1')`, DataLoader defers execution.
2. It pauses across a single event loop tick, coalescing all concurrent `.load()` keys into a unified deduplicated batch array: `['auth_1', 'auth_2', 'auth_3']`.
3. It dispatches **one consolidated bulk database query**: `SELECT * FROM authors WHERE id IN (...)`.

### Two Non-Negotiable DataLoader Laws
1. **Length and Ordering Invariant**: The batch loading function must return an array of values of the exact same length and corresponding index order as the incoming array of keys.
2. **Request Scoping**: DataLoader instances **must be freshly instantiated per HTTP request** within the GraphQL context factory. Global DataLoader instances cause cross-user data leakage through memoization caching!

---

---

## Beginner Friendly Explanation

Imagine living in a dormitory with 20 roommates.
Without DataLoader (The N+1 Problem): 20 students walk one after another to the corner store to purchase the identical soda. The store handles 20 individual trips back and forth (exhausting and wasteful).

With DataLoader: The first student sets a cardboard box in the lounge for 60 seconds. Everyone needing soda drops their request note in the box. A single runner heads to the market, buys all 20 sodas in one unified batch, and distributes them on arrival!

## Experiments

- Execute the simulation script and verify console output demonstrates strictly 1 SQL query for 5 book entities
- Request auth_1 three times concurrently and confirm DataLoader deduplicates keys into a single entry
- Intentionally return a batch array with mismatched length and observe the DataLoader runtime exception
- Experiment with cache priming: invoke loader.prime(key, value) prior to calling load

---

## Challenge

Author an `ordersByCustomerLoader`: implement a DataLoader for One-to-Many relationships mapping a single customerId to an array of `Order[]` records with correct ordering.

---

## Summary

You have mastered N+1 Query problem diagnostics and remediation: event loop microtask coalescing with DataLoader, batch array invariants, and request-scoped cache isolation.
