# Stored Procedures, Triggers & Event Scheduler

> **Kategori:** MySQL | **Level:** Transaction Concurrency, Replication & Sharding Scalability | **Minggu 6:** Stored Procedures, Triggers & Event Scheduler
> ⏱️ **Estimated Time:** 45 Minutes (15m theory, 30m practice) | 🔗 **Pace:** Structured (Step-by-step)


## Learning Objectives

- Master MySQL procedural scripting using DELIMITER, variables, and SQLEXCEPTION handlers
- Construct automated audit triggers comparing OLD and NEW row state variables
- Implement funds transfer Stored Procedures featuring automated rollback on failure
- Configure and monitor recurring background maintenance jobs using MySQL Event Scheduler

---

## Program: Automated Maintenance System: Bookkeeping Triggers and Purging Event Scheduler

```sql
-- 1. Enable Event Scheduler in MySQL
SET GLOBAL event_scheduler = ON;

-- 2. Audit history table
CREATE TABLE wallet_balance_audit (
    id BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
    wallet_id BIGINT UNSIGNED NOT NULL,
    old_balance DECIMAL(15, 2) NOT NULL,
    new_balance DECIMAL(15, 2) NOT NULL,
    changed_by VARCHAR(50) NOT NULL,
    changed_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (id)
) ENGINE=InnoDB;

-- 3. Trigger tracking balance mutations automatically
DELIMITER $$
CREATE TRIGGER trg_wallet_balance_update
AFTER UPDATE ON user_wallets
FOR EACH ROW
BEGIN
    IF OLD.balance <> NEW.balance THEN
        INSERT INTO wallet_balance_audit (wallet_id, old_balance, new_balance, changed_by, changed_at)
        VALUES (NEW.id, OLD.balance, NEW.balance, CURRENT_USER(), NOW());
    END IF;
END$$
DELIMITER ;

-- 4. Stored Procedure with Transaction and SQLEXCEPTION Error Handler
DELIMITER $$
CREATE PROCEDURE sp_transfer_funds(
    IN p_sender_wallet_id BIGINT UNSIGNED,
    IN p_receiver_wallet_id BIGINT UNSIGNED,
    IN p_amount DECIMAL(15, 2),
    OUT p_status_code VARCHAR(20)
)
proc_body: BEGIN
    DECLARE v_sender_balance DECIMAL(15, 2);
    
    -- Error Handler: Automatically rollback on any SQL error
    DECLARE EXIT HANDLER FOR SQLEXCEPTION
    BEGIN
        ROLLBACK;
        SET p_status_code = 'TRANSACTION_ERROR';
    END;

    IF p_amount <= 0 THEN
        SET p_status_code = 'INVALID_AMOUNT';
        LEAVE proc_body;
    END IF;

    START TRANSACTION;

    -- Lock sender wallet
    SELECT balance INTO v_sender_balance
    FROM user_wallets
    WHERE id = p_sender_wallet_id
    FOR UPDATE;

    IF v_sender_balance < p_amount THEN
        ROLLBACK;
        SET p_status_code = 'INSUFFICIENT_FUNDS';
        LEAVE proc_body;
    END IF;

    -- Debit sender
    UPDATE user_wallets 
    SET balance = balance - p_amount 
    WHERE id = p_sender_wallet_id;

    -- Credit receiver
    UPDATE user_wallets 
    SET balance = balance + p_amount 
    WHERE id = p_receiver_wallet_id;

    COMMIT;
    SET p_status_code = 'SUCCESS';
END$$
DELIMITER ;

-- 5. Automated Recurring Event Scheduler: Archive/Purge audit logs older than 90 days
DELIMITER $$
CREATE EVENT evt_purge_old_audit_logs
ON SCHEDULE EVERY 1 DAY
STARTS (CURRENT_TIMESTAMP + INTERVAL 1 HOUR)
DO
BEGIN
    DELETE FROM wallet_balance_audit
    WHERE changed_at < DATE_SUB(NOW(), INTERVAL 90 DAY);
END$$
DELIMITER ;
```

---

## Key Concepts

### Procedural Scripting and DELIMITER Mechanics
Standard SQL parsers interpret semicolons (`;`) as statement terminators. Within compound procedures or triggers, intermediate semicolons prematurely terminate the definition. The directive `DELIMITER $$` reassigns the delimiter sequence to `$$`, permitting complex procedural blocks until reset via `DELIMITER ;`.

### Transactional Resilience with SQLEXCEPTION Handlers
In enterprise procedures, partial execution corrupts ledger integrity. Declaring `DECLARE EXIT HANDLER FOR SQLEXCEPTION` operates identically to try-catch exception handling in modern languages. Upon encountering constraint violations or runtime faults, the handler intercepts execution, rolls back state mutations atomically, and surfaces error codes to client layers.

### In-Database Automation with the Event Scheduler
Instead of relying on fragile external OS cron jobs susceptible to network blips, MySQL embeds a native task daemon: the **Event Scheduler** (`SET GLOBAL event_scheduler = ON`). The scheduler executes temporal maintenance workflows directly inside the storage engine, including log compaction, daily rollups, and partition rotation.

---

---

## Beginner Friendly Explanation

Think of a Stored Procedure like an automated ATM. You cannot deduct money from Account A and walk away before Account B receives it.

The ATM features a failsafe mechanism (`SQLEXCEPTION HANDLER`): if the machine jams mid-transaction, everything cancels atomically and your funds remain safe. The Event Scheduler acts like an alarm clock ringing every morning at 2 AM to sweep up discarded, expired ATM receipts.

## Experiments

- Invoke sp_transfer_funds with funds triggering INSUFFICIENT_FUNDS and verify the return status
- Update balances manually and verify automated audit capture within wallet_balance_audit
- Inspect scheduled background jobs using SHOW EVENTS
- Force a duplicate key collision inside the procedure to verify atomic rollback by the EXIT HANDLER

---

## Challenge

Enhance `sp_transfer_funds` to atomically write double-entry debit and credit records into `wallet_ledgers` within the same transaction scope.

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

You have mastered MySQL server-side programming: robust Stored Procedures with exception handling, automated audit Triggers, and periodic task automation via the Event Scheduler.
