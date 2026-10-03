# Indexing Strategies (B-Tree, GIN, Partial) & EXPLAIN ANALYZE

> **Kategori:** PostgreSQL | **Level:** Relational Foundations & Advanced SQL | **Minggu 4:** Indexing Strategies (B-Tree, GIN, Partial) & EXPLAIN ANALYZE
> ⏱️ **Estimated Time:** 45 Minutes (15m theory, 30m practice) | 🔗 **Pace:** Structured (Step-by-step)


## Learning Objectives

- Understand internal storage mechanics of B-Tree vs GIN (Generalized Inverted Index)
- Design high-performance Composite Indexes adhering to the Leftmost Prefix rule
- Minimize disk footprint and write overhead using Partial and Expression Indexes
- Interpret and diagnose EXPLAIN (ANALYZE, BUFFERS) profiles: Seq Scan vs Index Scan vs Bitmap Heap Scan

---

## Program: B-Tree, GIN JSONB Index Implementation, and EXPLAIN ANALYZE Benchmarking

```sql
-- 1. Standard B-Tree index on foreign keys to accelerate JOIN operations
CREATE INDEX idx_orders_customer_id ON orders (customer_id);

-- 2. Composite index on status and created_at for dashboard timeline queries
CREATE INDEX idx_orders_status_created ON orders (status, created_at DESC);

-- 3. Partial Index: Index only unpaid or pending orders (saves disk space & write overhead)
CREATE INDEX idx_orders_pending_processing ON orders (created_at)
WHERE status IN ('PENDING', 'PROCESSING');

-- 4. Expression Index: Case-insensitive search on email
CREATE INDEX idx_customers_email_lower ON customers (LOWER(email));

-- 5. GIN (Generalized Inverted Index) on JSONB for lightning-fast attribute search
CREATE INDEX idx_products_attributes_gin ON products USING GIN (attributes);

-- Benchmark query performance using EXPLAIN (ANALYZE, BUFFERS, VERBOSE)
EXPLAIN (ANALYZE, BUFFERS)
SELECT 
    id, sku, title, price, attributes
FROM products
WHERE attributes @> '{"brand": "Logitech"}';

-- Benchmark Partial Index query
EXPLAIN (ANALYZE, BUFFERS)
SELECT id, total_amount, created_at
FROM orders
WHERE status = 'PENDING'
ORDER BY created_at DESC
LIMIT 10;
```

---

## Key Concepts

### B-Tree Anatomy and the Leftmost Prefix Rule
PostgreSQL defaults to **B-Tree** (Balanced Tree) indexing, storing sorted node pointers to achieve $O(\log N)$ lookup performance. When declaring a composite index `(status, created_at)`, PostgreSQL leverages it when queries match the primary key prefix (`status`) or both. If a query only filters by `created_at`, the index cannot be traversed efficiently due to the Leftmost Prefix principle.

### High-Throughput Partial Indexing
In real-world tables with tens of millions of records, 95% are historical (`COMPLETED` or `CANCELLED`). Real-time fulfillment workers only care about the 5% active workload (`PENDING`). A **Partial Index** (`WHERE status IN ('PENDING', 'PROCESSING')`) indexes strictly matching rows. It drastically shrinks memory consumption, remains cached in RAM, and completely eliminates write amplification on finished orders.

### GIN Indexes for Deep JSONB Documents
Standard B-Trees cannot index internal key paths or nested document values within a `JSONB` column. A **GIN** (*Generalized Inverted Index*) breaks down every internal JSON key-value pair into searchable inverted posting lists. Consequently, deep containment lookups like `attributes @> '{"brand": "Logitech"}'` execute in sub-milliseconds.

### Diagnosing EXPLAIN ANALYZE Execution Plans
- `Seq Scan`: Full sequential scan reading every page on disk (detrimental at scale).
- `Index Scan`: Traverses the index tree and performs random I/O reads on heap pages.
- `Bitmap Heap Scan`: Combines index pointers into an in-memory bitmap before fetching disk pages sequentially.
- `Buffers: shared hit`: Measures cache hits served directly from shared memory RAM buffers, avoiding disk latency.

---

---

## Beginner Friendly Explanation

Imagine a 2,000-page historical encyclopedia. If you search for 'Industrial Revolution' without an index, you must flip through every single page from page 1 to the end (Sequential Scan).

A B-Tree index is like the alphabetical index at the back. A Partial Index is like a pocket-sized cheat sheet indexing only the 3 exam chapters you need to review today, making it ultralight, lightning fast to consult, and easy to keep in memory.

## Experiments

- Execute EXPLAIN ANALYZE before and after creating the GIN index on products and observe the execution time variance
- Create an expression index on UPPER(sku) and verify if WHERE UPPER(sku) = 'LAPTOP-X1' uses an Index Scan
- Inspect the physical index disk footprint using pg_size_pretty(pg_relation_size('idx_products_attributes_gin'))
- Observe why the PostgreSQL query planner prefers a Sequential Scan when tables contain very few test rows

---

## Challenge

Set up a trigram index using the `pg_trgm` extension on `products.title` and use `EXPLAIN ANALYZE` to demonstrate accelerated fuzzy text matching with `ILIKE '%think%'`.

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

### 1. Sequential Table Scans on Large Tables
- **Symptom / Issue:** SELECT queries degrade in latency as table rows increase into millions.
- **Root Cause:** Common mistaken assumptions during early development.
- **Fix / Best Practice:** Add B-Tree indexes on columns used in `WHERE`, `ORDER BY`, and `JOIN` clauses.

### 2. Missing Transactions for Multi-Step Operations
- **Symptom / Issue:** Leaves data in inconsistent partial states when middle operations fail.
- **Root Cause:** Common mistaken assumptions during early development.
- **Fix / Best Practice:** Always wrap operations in `BEGIN; ... COMMIT;` or `ROLLBACK;` blocks.

### 3. Using Inexact Floating Point for Currency
- **Symptom / Issue:** Floating point rounding errors corrupt financial accounting balances.
- **Root Cause:** Common mistaken assumptions during early development.
- **Fix / Best Practice:** Always use `NUMERIC(15, 2)` or `DECIMAL` for currency amounts.

---

## Summary

You have mastered PostgreSQL indexing strategies: composite B-Trees, GIN for JSONB payloads, memory-efficient partial indexes, and execution profiling with EXPLAIN ANALYZE.
