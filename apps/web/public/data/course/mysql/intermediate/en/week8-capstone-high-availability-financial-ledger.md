# Capstone Project: High-Availability Financial Ledger

> **Kategori:** MySQL | **Level:** Transaction Concurrency, Replication & Sharding Scalability | **Minggu 8:** Capstone Project: High-Availability Financial Ledger
> ⏱️ **Estimated Time:** 45 Minutes (15m theory, 30m practice) | 🔗 **Pace:** Structured (Step-by-step)


## Learning Objectives

- Synthesize the full MySQL curriculum into an enterprise financial ledger capstone
- Enforce strict double-entry bookkeeping: aggregate Debit mutations must strictly equal Credit totals
- Implement API Idempotency guarantees leveraging unique idempotency_key constraints
- Mathematically eliminate deadlocks through standardized ascending account lock ordering

---

## Program: Double-Entry Bookkeeping Ledger with Idempotency Keys and Audit Mutations

```sql
-- CAPSTONE: High-Availability Financial Ledger & Sharded Transaction Store
-- Incorporates InnoDB Clustered Indexes, Double-Entry Bookkeeping, Idempotency, and Audit Trails

CREATE DATABASE IF NOT EXISTS core_ledger CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE core_ledger;

-- 1. Accounts Master Table (Assets, Liabilities, Equity, Revenue, Expense)
CREATE TABLE chart_of_accounts (
    id BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
    account_number VARCHAR(32) NOT NULL,
    account_type ENUM('ASSET', 'LIABILITY', 'EQUITY', 'REVENUE', 'EXPENSE') NOT NULL,
    account_name VARCHAR(100) NOT NULL,
    current_balance DECIMAL(18, 4) NOT NULL DEFAULT 0.0000,
    created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (id),
    UNIQUE KEY uq_account_no (account_number)
) ENGINE=InnoDB;

-- 2. Journal Entries Header (Guarantees Idempotency from API Gateways)
CREATE TABLE journal_entries (
    id BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
    idempotency_key VARCHAR(64) NOT NULL,
    reference_id VARCHAR(64) NOT NULL,
    description VARCHAR(255) NOT NULL,
    posted_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (id),
    UNIQUE KEY uq_idempotency (idempotency_key),
    KEY idx_journal_posted (posted_at)
) ENGINE=InnoDB;

-- 3. Journal Lines (Double-Entry: Sum of Debits MUST EQUAL Sum of Credits)
CREATE TABLE journal_lines (
    id BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
    journal_entry_id BIGINT UNSIGNED NOT NULL,
    account_id BIGINT UNSIGNED NOT NULL,
    direction ENUM('DEBIT', 'CREDIT') NOT NULL,
    amount DECIMAL(18, 4) NOT NULL CHECK (amount > 0.0000),
    PRIMARY KEY (id),
    KEY idx_entry_account (journal_entry_id, account_id),
    CONSTRAINT fk_lines_entry FOREIGN KEY (journal_entry_id) REFERENCES journal_entries(id) ON DELETE RESTRICT,
    CONSTRAINT fk_lines_account FOREIGN KEY (account_id) REFERENCES chart_of_accounts(id) ON DELETE RESTRICT
) ENGINE=InnoDB;

-- 4. Stored Procedure for Atomic Double-Entry Financial Posting
DELIMITER $$
CREATE PROCEDURE post_double_entry_transaction(
    IN p_idempotency_key VARCHAR(64),
    IN p_reference_id VARCHAR(64),
    IN p_description VARCHAR(255),
    IN p_debit_account_id BIGINT UNSIGNED,
    IN p_credit_account_id BIGINT UNSIGNED,
    IN p_amount DECIMAL(18, 4),
    OUT p_journal_id BIGINT UNSIGNED,
    OUT p_status_code VARCHAR(30)
)
proc_body: BEGIN
    DECLARE v_existing_id BIGINT UNSIGNED;

    -- Exit on any SQL error
    DECLARE EXIT HANDLER FOR SQLEXCEPTION
    BEGIN
        ROLLBACK;
        SET p_status_code = 'SYSTEM_ERROR';
    END;

    -- Check idempotency key first to prevent duplicate charges
    SELECT id INTO v_existing_id
    FROM journal_entries
    WHERE idempotency_key = p_idempotency_key;

    IF v_existing_id IS NOT NULL THEN
        SET p_journal_id = v_existing_id;
        SET p_status_code = 'IDEMPOTENT_DUPLICATE_ACCEPTED';
        LEAVE proc_body;
    END IF;

    IF p_debit_account_id = p_credit_account_id THEN
        SET p_status_code = 'IDENTICAL_ACCOUNTS_FORBIDDEN';
        LEAVE proc_body;
    END IF;

    START TRANSACTION;

    -- Insert Journal Header
    INSERT INTO journal_entries (idempotency_key, reference_id, description)
    VALUES (p_idempotency_key, p_reference_id, p_description);

    SET p_journal_id = LAST_INSERT_ID();

    -- Insert Debit Line
    INSERT INTO journal_lines (journal_entry_id, account_id, direction, amount)
    VALUES (p_journal_id, p_debit_account_id, 'DEBIT', p_amount);

    -- Insert Credit Line
    INSERT INTO journal_lines (journal_entry_id, account_id, direction, amount)
    VALUES (p_journal_id, p_credit_account_id, 'CREDIT', p_amount);

    -- Mutate Account Balances atomically with lock ordering (lower ID locked first to prevent deadlock)
    IF p_debit_account_id < p_credit_account_id THEN
        UPDATE chart_of_accounts SET current_balance = current_balance + p_amount WHERE id = p_debit_account_id;
        UPDATE chart_of_accounts SET current_balance = current_balance - p_amount WHERE id = p_credit_account_id;
    ELSE
        UPDATE chart_of_accounts SET current_balance = current_balance - p_amount WHERE id = p_credit_account_id;
        UPDATE chart_of_accounts SET current_balance = current_balance + p_amount WHERE id = p_debit_account_id;
    END IF;

    COMMIT;
    SET p_status_code = 'SUCCESS';
END$$
DELIMITER ;
```

---

## Key Concepts

### Capstone Financial Ledger Architecture
This capstone establishes the core architectural foundation of modern banking engines on MySQL InnoDB:
1. **Double-Entry Bookkeeping Principles**: Every monetary motion is logged as a balanced pair (`DEBIT` and `CREDIT`). Capital is never arbitrarily created or destroyed; it strictly transfers across asset, liability, and equity classifications.
2. **API Idempotency Guarantees**: In network payment workflows, gateway timeouts frequently prompt automated client retries. The `idempotency_key UNIQUE` constraint ensures replayed payloads acknowledge existing records without duplicate balance deductions.
3. **Mathematical Deadlock Elimination**: Standardizing lock acquisition order in ascending sequence (`IF debit_id < credit_id`) prevents the circular lock acquisition cycles that trigger engine deadlocks.

---

---

## Beginner Friendly Explanation

Congratulations! You have constructed a true institutional banking ledger. Double-entry bookkeeping has powered global commerce for centuries: every penny entering your wallet originated from an identifiable counter-account.

Idempotency keys protect customers from double-billing during mobile connectivity drops, and ascending lock ordering guarantees your database server never freezes under deadlock contention!

## Experiments

- Invoke sp_transfer_funds iteratively with identical idempotency_key values to observe IDEMPOTENT_DUPLICATE_ACCEPTED
- Attempt initiating a transfer where debit and credit accounts match to verify constraint guards
- Run a ledger integrity audit query: verify that global SUM(Debit) strictly equals SUM(Credit)
- Simulate 100 concurrent execution threads to empirically confirm zero deadlock incidents

---

## Challenge

Architect horizontal table sharding for `journal_lines`: apply declarative range partitioning by `posted_at` month intervals while maintaining referential integrity.

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

Congratulations! You have mastered the comprehensive MySQL continuum: InnoDB storage internals, Clustered Indexing, Covering Indexes, Full-Text & JSON, Gap Locking, Stored Procedures, GTID Replication, and a Double-Entry Financial Ledger Capstone.
