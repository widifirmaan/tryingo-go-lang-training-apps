# ACID Transactions, Isolation Levels & Pessimistic Locking

> **Kategori:** PostgreSQL | **Level:** Concurrency, Partitioning & Enterprise Architecture | **Minggu 5:** ACID Transactions, Isolation Levels & Pessimistic Locking
> ⏱️ **Estimated Time:** 45 Minutes (15m theory, 30m practice) | 🔗 **Pace:** Structured (Step-by-step)


## Learning Objectives

- Master the four ACID pillars (Atomicity, Consistency, Isolation, Durability) in PostgreSQL
- Compare transaction isolation levels: Read Committed, Repeatable Read, and Serializable
- Prevent concurrency race conditions (inventory overselling) with Pessimistic Locking (SELECT FOR UPDATE)
- Build resilient, lock-free background job queues using SELECT FOR UPDATE SKIP LOCKED

---

## Program: Race-Condition Proof Checkout using SELECT FOR UPDATE Row Locking

```sql
-- Demonstrate high-concurrency checkout preventing overselling
-- Transaction 1: Customer checkout workflow
BEGIN TRANSACTION ISOLATION LEVEL READ COMMITTED;

-- 1. Pessimistic Lock: Acquire exclusive row lock on the product to prevent concurrent race conditions
SELECT id, sku, title, price, stock_quantity
FROM products
WHERE id = 'a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a11'
FOR UPDATE;

-- 2. Business Logic Validation in application layer:
-- Ensure stock_quantity >= requested_quantity (e.g. requested = 2)

-- 3. Deduct inventory safely
UPDATE products
SET stock_quantity = stock_quantity - 2
WHERE id = 'a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a11'
  AND stock_quantity >= 2;

-- 4. Create Order Record
INSERT INTO orders (id, customer_id, total_amount, status, shipping_address)
VALUES (
    gen_random_uuid(),
    'b0eebc99-9c0b-4ef8-bb6d-6bb9bd380a22',
    33000000.00,
    'PROCESSING',
    '{"street": "Sudirman No. 45", "city": "Jakarta", "postal_code": "10220"}'::jsonb
);

-- Commit atomically writes inventory deduction and order creation
COMMIT;

-- Demonstration of SKIP LOCKED for high-throughput background worker queue
BEGIN;
SELECT id, order_id, status
FROM orders
WHERE status = 'PROCESSING'
ORDER BY created_at ASC
LIMIT 1
FOR UPDATE SKIP LOCKED;

-- Worker processes the order...
UPDATE orders SET status = 'SHIPPED' WHERE id = '...';
COMMIT;
```

---

## Key Concepts

### ACID Guarantees in PostgreSQL
- **Atomicity**: All operations within `BEGIN ... COMMIT` succeed atomically or roll back completely upon error (`ROLLBACK`).
- **Consistency**: Invariants and schema constraints are strictly enforced before and after state transitions.
- **Isolation**: Governs transaction visibility boundaries amidst concurrent executions.
- **Durability**: Once committed, changes are durably persisted to non-volatile disk storage via the Write-Ahead Log (WAL).

### Isolation Level Spectrum
1. `READ COMMITTED` (PostgreSQL Default): Only sees data committed before the query began. Eliminates Dirty Reads but permits Non-Repeatable Reads.
2. `REPEATABLE READ`: Freezes an immutable snapshot across the entire transaction lifespan, preventing phantom reads.
3. `SERIALIZABLE`: The strictest level. Guarantees that concurrent transactions produce identical results to strict serial execution using Serializable Snapshot Isolation (SSI).

### Concurrency Defense: SELECT FOR UPDATE
During high-traffic flash sales with remaining inventory of 1 unit, concurrent requests reading `stock = 1` simultaneously would both deduct inventory, plunging stock into negative numbers. `SELECT ... FOR UPDATE` acquires an exclusive row-level lock. Concurrent transactions attempting to inspect or modify that specific row are placed on hold until the lock-holding transaction commits.

### Non-Blocking Queues with SKIP LOCKED
When multiple background worker processes poll for pending jobs, `FOR UPDATE` causes idle workers to block on lock contention. Appending `SKIP LOCKED` instructs subsequent workers to skip currently locked rows and instantly claim the next available task, achieving zero-latency worker parallelization.

---

---

## Beginner Friendly Explanation

Imagine you and another fan simultaneously trying to book the very last seat at a concert ticket counter.

Without pessimistic locking (`SELECT FOR UPDATE`), the ticketing agent could accidentally print two tickets for the exact same seat. With `SELECT FOR UPDATE`, the moment agent #1 clicks the seat, an exclusive virtual padlock locks onto it. Agent #2 is held for 2 seconds until agent #1 finishes payment, immediately seeing that the seat is now 'Sold Out'.

## Experiments

- Open two concurrent psql sessions, run BEGIN and SELECT FOR UPDATE in session 1, then attempt updating the row in session 2 to witness lock contention
- Execute COMMIT in session 1 and observe session 2 immediately acquiring the lock and proceeding
- Test SERIALIZABLE isolation and intentionally provoke serialization failure 40001 via cross-modifications
- Simulate parallel task dispatching using concurrent FOR UPDATE SKIP LOCKED statements

---

## Challenge

Implement a bank balance transfer transaction between two customers: use `SELECT FOR UPDATE` with strictly ordered account IDs (lock smaller ID first, then larger) to mathematically eliminate deadlock hazards.

---

## Visual Mental Model & Architecture Flow

![Diagram Relasi Antar Tabel & SQL Joins](/diagrams/sql-joins.svg)

```diagram
┌────────────────────┐                 ┌────────────────────┐
│   TABLE: users     │                 │   TABLE: orders    │
├────────────────────┤                 ├────────────────────┤
│ id (PK: UUID)      │ ◄── 1-N Rel ─── │ id (PK: UUID)      │
│ email (UNIQUE)     │                 │ user_id (FK -> PK) │
│ created_at         │                 │ total_amount       │
└────────────────────┘                 └────────────────────┘
```

---

## Syntax Reference & Practical Guide (W3Schools Style)

Here is the comprehensive breakdown of syntax signatures, parameters, return behavior, and isolated runnable examples introduced in this module:

### 1. `CREATE TABLE name ( col TYPE CONSTRAINT );`
- **Core Functionality:** Relational schema definition.
- **Parameters / Attributes:** `Column names, Data types, Constraints (PK/FK/NOT NULL)`.
- **System Behavior & Return:** Constructs strongly typed database tables with guaranteed relational integrity.
- **Practical Code Example:**
```javascript
CREATE TABLE accounts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email TEXT UNIQUE NOT NULL,
  balance NUMERIC(10, 2) DEFAULT 0.00
);
```
- **Expected Execution Output:**
```text
Initializes accounts table ready for ACID transactions
```

### 2. `SELECT cols FROM tbl WHERE cond ORDER BY col LIMIT n;`
- **Core Functionality:** Declarative relational data retrieval.
- **Parameters / Attributes:** `Column list, Filter predicates, Ordering, Paging limit`.
- **System Behavior & Return:** Fetches matching database records with predictable execution plan optimization.
- **Practical Code Example:**
```javascript
SELECT id, email, balance FROM accounts WHERE balance > 0 ORDER BY balance DESC LIMIT 5;
```
- **Expected Execution Output:**
```text
Returns top 5 funded customer accounts
```

### 3. `INSERT INTO tbl (cols) VALUES (vals) RETURNING id;`
- **Core Functionality:** Atomic record insertion with immediate return.
- **Parameters / Attributes:** `Columns, Insert values, RETURNING clause`.
- **System Behavior & Return:** Persists new row data and returns computed primary keys or defaults without an extra query.
- **Practical Code Example:**
```javascript
INSERT INTO accounts (email) VALUES ('dev@tryngo.com') RETURNING id;
```
- **Expected Execution Output:**
```text
Returns newly allocated UUID primary key
```

### 4. `SELECT * FROM a INNER JOIN b ON a.id = b.a_id;`
- **Core Functionality:** Multi-table relational join.
- **Parameters / Attributes:** `Table identifiers, ON match predicate`.
- **System Behavior & Return:** Correlates rows across related tables matching foreign key references.
- **Practical Code Example:**
```javascript
SELECT a.email, t.amount FROM accounts a INNER JOIN transactions t ON a.id = t.account_id;
```
- **Expected Execution Output:**
```text
Consolidates account holders with their transaction history
```


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

You have mastered transactional concurrency: ACID foundations, isolation level nuances, race condition prevention via SELECT FOR UPDATE, and non-blocking worker pools with SKIP LOCKED.
