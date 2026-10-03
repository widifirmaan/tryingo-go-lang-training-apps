# InnoDB Locking: Record Locks, Gap Locks & Deadlock Analysis

> **Kategori:** MySQL | **Level:** Transaction Concurrency, Replication & Sharding Scalability | **Minggu 5:** InnoDB Locking: Record Locks, Gap Locks & Deadlock Analysis
> ⏱️ **Estimated Time:** 45 Minutes (15m theory, 30m practice) | 🔗 **Pace:** Structured (Step-by-step)


## Learning Objectives

- Understand internal InnoDB lock primitives: Record Locks, Gap Locks, and Next-Key Locks
- Learn how Next-Key Locking mathematically eliminates Phantom Reads in REPEATABLE READ mode
- Parse and diagnose the LATEST DETECTED DEADLOCK report inside SHOW ENGINE INNODB STATUS
- Eliminate application deadlocks by standardizing resource locking sequences

---

## Program: Next-Key Locking Analysis and Deadlock Investigation via ENGINE INNODB STATUS

```sql
-- Demonstrate InnoDB Row and Gap Locking mechanics under REPEATABLE READ
-- Setup dedicated account ledger
DROP TABLE IF EXISTS account_balances;
CREATE TABLE account_balances (
    account_id BIGINT UNSIGNED NOT NULL,
    owner_name VARCHAR(100) NOT NULL,
    balance DECIMAL(15, 2) NOT NULL,
    PRIMARY KEY (account_id)
) ENGINE=InnoDB;

INSERT INTO account_balances (account_id, owner_name, balance) VALUES
(10, 'Alice', 1000.00),
(20, 'Bob', 2500.00),
(30, 'Charlie', 5000.00);

-- Scenario A: Next-Key Lock (Record Lock + Gap Lock)
-- Under REPEATABLE READ, querying a range locks existing rows AND gaps between them
-- Session 1:
BEGIN;
SELECT * FROM account_balances 
WHERE account_id BETWEEN 15 AND 25 
FOR UPDATE;
-- Locks: Record 20, plus Gap (10, 20) and Gap (20, 30).
-- Concurrent INSERT of account_id 18 or 22 in Session 2 will be BLOCKED!

-- Scenario B: Deadlock Detection & Resolution
-- Session 1 locks account 10, then attempts to lock account 20
-- Session 2 locks account 20, then attempts to lock account 10
-- InnoDB background deadlock detector kills the smaller transaction automatically!

-- Inspect the latest deadlock details, locks, and buffer pool status
SHOW ENGINE INNODB STATUS;

-- Query active transaction locks from information_schema / performance_schema
SELECT 
    r.trx_id AS waiting_trx_id,
    r.trx_mysql_thread_id AS waiting_thread,
    b.trx_id AS blocking_trx_id,
    b.trx_mysql_thread_id AS blocking_thread
FROM performance_schema.data_lock_waits w
INNER JOIN information_schema.innodb_trx b ON b.trx_id = w.blocking_engine_transaction_id
INNER JOIN information_schema.innodb_trx r ON r.trx_id = w.requesting_engine_transaction_id;
```

---

## Key Concepts

### InnoDB Lock Anatomy: Record, Gap, and Next-Key Locks
Under MySQL default `REPEATABLE READ` isolation, InnoDB enforces strict consistency via composite locking:
- **Record Lock**: Locks the physical index record.
- **Gap Lock**: Locks the open gap between adjacent index records (e.g. interval between ID 10 and 20), forbidding concurrent transactions from inserting new rows into the gap.
- **Next-Key Lock**: A composite lock combining a Record Lock on the indexed entry plus a Gap Lock on the preceding span. This invariant prevents Phantom Reads under REPEATABLE READ.

### Automated Deadlock Detection Engine
A **Deadlock** arises when Transaction A holds Row 1 and awaits Row 2, while Transaction B holds Row 2 and awaits Row 1. InnoDB runs a background cycle-detection algorithm maintaining an in-memory *wait-for graph*. Upon discovering a circular wait, InnoDB identifies the transaction with the fewest mutating writes as the victim, triggers an automated `ROLLBACK`, and emits error `1213: Deadlock found when trying to get lock`.

### Forensic Diagnostics with SHOW ENGINE INNODB STATUS
The command `SHOW ENGINE INNODB STATUS` provides deep telemetry. The `LATEST DETECTED DEADLOCK` section captures exact SQL statements, lock requests (`lock_mode X`), target page IDs, and rationales for victim selection.

---

---

## Beginner Friendly Explanation

Imagine you and a friend holding the final two pieces of a puzzle. Your friend holds Piece A; you hold Piece B.

You refuse to surrender Piece B until your friend gives you Piece A, while your friend refuses to release Piece A until you hand over Piece B. Without a referee (the InnoDB Deadlock Detector), both of you would freeze indefinitely. The referee blows a whistle, forces one player to drop their piece and retry later, allowing the other player to complete the puzzle.

## Experiments

- Open two mysql CLI sessions, simulate gap locking: session 1 locks an ID range, observe session 2 blocking on INSERT inside the gap
- Intentionally stage cross-locking between two rows to trigger error 1213 Deadlock
- Run SHOW ENGINE INNODB STATUS and examine the LATEST DETECTED DEADLOCK breakdown
- Query performance_schema.data_locks to inspect granular active lock structures

---

## Challenge

Craft a deadlock-free funds transfer transaction: enforce strict key ordering via `LEAST(from_id, to_id)` and `GREATEST(from_id, to_id)` prior to executing `SELECT ... FOR UPDATE`.

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

You have mastered internal InnoDB locking mechanics: Record, Gap, and Next-Key locks, Phantom Read prevention, and deadlock forensics using SHOW ENGINE INNODB STATUS.
