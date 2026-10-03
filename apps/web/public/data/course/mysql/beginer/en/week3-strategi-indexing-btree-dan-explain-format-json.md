# B+Tree Indexing, Composite Index & EXPLAIN FORMAT=JSON

> **Kategori:** MySQL | **Level:** Relational Foundations & InnoDB Engine | **Minggu 3:** B+Tree Indexing, Composite Index & EXPLAIN FORMAT=JSON
> ⏱️ **Estimated Time:** 45 Minutes (15m theory, 30m practice) | 🔗 **Pace:** Structured (Step-by-step)


## Learning Objectives

- Understand InnoDB internal B+Tree architecture: Root, Internal Nodes, and Leaf Pages
- Implement Covering Indexes to eliminate secondary table lookups to the Clustered Index
- Profile detailed query execution plans with EXPLAIN FORMAT=JSON (query_cost, attached_condition)
- Prevent index invalidation anti-patterns (wrapping columns in functions, leading wildcards)

---

## Program: Covering Index Optimization and EXPLAIN FORMAT=JSON Profiling in MySQL 8

```sql
-- 1. Create realistic e-commerce audit logs table
CREATE TABLE security_audit_events (
    id BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
    user_id BIGINT UNSIGNED NOT NULL,
    ip_address VARCHAR(45) NOT NULL,
    event_type VARCHAR(50) NOT NULL,
    risk_score TINYINT UNSIGNED NOT NULL DEFAULT 0,
    created_at DATETIME NOT NULL,
    PRIMARY KEY (id),
    -- Composite index designed for: WHERE user_id = ? AND event_type = ? ORDER BY created_at DESC
    KEY idx_user_event_time (user_id, event_type, created_at DESC),
    -- Covering index: includes all columns requested by security monitoring queries
    KEY idx_covering_alert (risk_score, created_at, user_id, ip_address)
) ENGINE=InnoDB;

-- 2. Analyze Execution Plan with JSON Format to inspect internal costs
EXPLAIN FORMAT=JSON
SELECT user_id, ip_address, created_at
FROM security_audit_events
WHERE risk_score >= 80
ORDER BY created_at DESC
LIMIT 50;

-- 3. Demonstration of Covering Index (Using index in Extra column)
EXPLAIN
SELECT risk_score, created_at, user_id, ip_address
FROM security_audit_events
WHERE risk_score = 90
ORDER BY created_at DESC;

-- 4. Check index usage statistics and cardinality
SHOW INDEX FROM security_audit_events;
```

---

## Key Concepts

### InnoDB B+Tree and Secondary Index Architecture
In InnoDB, every **Secondary Index** leaf node stores the indexed key values paired with the record's Clustered Index Primary Key. When MySQL queries records via a secondary index, it traverses the secondary tree to resolve the Primary Key, and subsequently performs a second traversal into the primary Clustered Index to retrieve remaining table columns (known as a *Bookmark Lookup*).

### The Power of Covering Indexes
If an executed query requests strictly attributes already residing inside the secondary index tree, MySQL bypasses the primary Clustered Index traversal entirely. In `EXPLAIN` output, this manifests as `Using index` in the `Extra` column. A **Covering Index** delivers 10x-100x performance gains because the dataset is satisfied directly from index pages in memory.

### Deep Profiling with EXPLAIN FORMAT=JSON
Standard tabular `EXPLAIN` output often obscures algorithmic optimizer decisions. `EXPLAIN FORMAT=JSON` reveals detailed diagnostic metrics:
- `query_cost`: Precise estimated computational cost balancing CPU cycles and disk page accesses.
- `used_columns`: Columns ingested during each execution phase.
- `attached_condition`: Exact predicate filters evaluated at storage engine level.
- `using_filesort`: Signals that index ordering was insufficient, forcing an explicit in-memory or temporary disk sort pass.

---

---

## Beginner Friendly Explanation

Imagine a university library. The physical books reside on the primary shelves (Clustered Index). You search for titles using an author card catalog (Secondary Index).

If the catalog card only lists the book call number, you must physically walk over to the shelf to inspect its page count and publisher (Bookmark Lookup). But if the catalog card already lists the call number, publisher, and year (Covering Index), you answer your query instantly at the front desk without taking a single step toward the back shelves!

## Experiments

- Compare EXPLAIN outputs between a Covering Index query versus an unindexed SELECT *
- Inspect query_cost shifts within EXPLAIN FORMAT=JSON before and after appending a composite index
- Provoke using_filesort by modifying ORDER BY columns out of alignment with the composite index prefix
- Inspect SHOW STATUS LIKE 'Handler_read_%' to monitor internal storage engine index traversal counters

---

## Challenge

Design the optimal composite index for an e-commerce query: `WHERE store_id = 42 AND status = 'ACTIVE' AND price BETWEEN 100000 AND 500000 ORDER BY created_at DESC LIMIT 20`, eliminating `using_filesort`.

---

## Visual Mental Model & Architecture Flow

![Diagram Relasi Relasional & Eksekusi Query Joins](/diagrams/sql-joins.svg)

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

### 1. Legacy `utf8` Instead of `utf8mb4`
- **Symptom / Issue:** Throws `Incorrect string value` when saving 4-byte Unicode characters (emojis).
- **Root Cause:** Common mistaken assumptions during early development.
- **Fix / Best Practice:** Set default database and table character set to `utf8mb4` with `utf8mb4_unicode_ci`.

### 2. TIMESTAMP 2038 Boundary & Timezone Shifts
- **Symptom / Issue:** Epoch overflow bugs on older tables or unexpected timezone conversions.
- **Root Cause:** Common mistaken assumptions during early development.
- **Fix / Best Practice:** Store UTC explicitly or choose `DATETIME` for timezone-neutral timestamps.

### 3. Failing to Batch Inserts
- **Symptom / Issue:** Per-row autocommit causes massive disk write bottlenecks on large imports.
- **Root Cause:** Common mistaken assumptions during early development.
- **Fix / Best Practice:** Wrap batch imports in a single `START TRANSACTION; ... COMMIT;` block.

---

## Summary

You have mastered InnoDB B+Tree architecture, bookmark lookup elimination via Covering Indexes, and surgical execution profiling using EXPLAIN FORMAT=JSON.
