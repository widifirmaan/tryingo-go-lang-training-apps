# PL/pgSQL, Stored Procedures & Audit Triggers

> **Kategori:** PostgreSQL | **Level:** Concurrency, Partitioning & Enterprise Architecture | **Minggu 6:** PL/pgSQL, Stored Procedures & Audit Triggers
> ⏱️ **Estimated Time:** 45 Minutes (15m theory, 30m practice) | 🔗 **Pace:** Structured (Step-by-step)


## Learning Objectives

- Master syntax and procedural programming patterns in PL/pgSQL
- Implement event-driven triggers with contextual variables (TG_OP, NEW, OLD)
- Build a tamper-evident financial audit trail capturing state transitions in JSONB
- Distinguish functions (RETURNS value) from Stored Procedures (CALL with transaction control)

---

## Program: Automated Financial Audit Trail System Using PL/pgSQL Triggers

```sql
-- 1. Create dedicated audit log table for tamper-evident tracking
CREATE TABLE audit_logs (
    id BIGSERIAL PRIMARY KEY,
    table_name VARCHAR(50) NOT NULL,
    operation VARCHAR(10) NOT NULL, -- 'INSERT', 'UPDATE', 'DELETE'
    record_id UUID NOT NULL,
    old_data JSONB,
    new_data JSONB,
    changed_by VARCHAR(100) NOT NULL DEFAULT CURRENT_USER,
    changed_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- 2. PL/pgSQL Function acting as trigger handler
CREATE OR REPLACE FUNCTION process_audit_log()
RETURNS TRIGGER AS $$
BEGIN
    IF (TG_OP = 'INSERT') THEN
        INSERT INTO audit_logs (table_name, operation, record_id, new_data)
        VALUES (TG_TABLE_NAME, TG_OP, NEW.id, to_jsonb(NEW));
        RETURN NEW;
    ELSIF (TG_OP = 'UPDATE') THEN
        -- Only record audit if values actually changed
        IF (NEW IS DISTINCT FROM OLD) THEN
            INSERT INTO audit_logs (table_name, operation, record_id, old_data, new_data)
            VALUES (TG_TABLE_NAME, TG_OP, NEW.id, to_jsonb(OLD), to_jsonb(NEW));
        END IF;
        RETURN NEW;
    ELSIF (TG_OP = 'DELETE') THEN
        INSERT INTO audit_logs (table_name, operation, record_id, old_data)
        VALUES (TG_TABLE_NAME, TG_OP, OLD.id, to_jsonb(OLD));
        RETURN OLD;
    END IF;
    RETURN NULL;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- 3. Attach trigger to products table for changes monitoring
DROP TRIGGER IF EXISTS trg_audit_products ON products;
CREATE TRIGGER trg_audit_products
AFTER INSERT OR UPDATE OR DELETE ON products
FOR EACH ROW EXECUTE FUNCTION process_audit_log();

-- 4. Stored Procedure for atomic bulk price adjustment with transaction control
CREATE OR REPLACE PROCEDURE bulk_adjust_prices(
    brand_filter TEXT, 
    percentage_increase NUMERIC
)
LANGUAGE plpgsql AS $$
DECLARE
    affected_rows INT;
BEGIN
    -- Update prices based on brand attribute
    UPDATE products
    SET price = ROUND(price * (1 + percentage_increase / 100), 2)
    WHERE attributes->>'brand' = brand_filter;

    GET DIAGNOSTICS affected_rows = ROW_COUNT;
    RAISE NOTICE 'Successfully updated prices for % products of brand %', affected_rows, brand_filter;
END;
$$;

-- Test invocation
CALL bulk_adjust_prices('Logitech', 10.0);

-- Query the audit logs to inspect changes
SELECT 
    id, table_name, operation, record_id, 
    old_data->>'price' AS old_price, 
    new_data->>'price' AS new_price, 
    changed_at
FROM audit_logs
ORDER BY id DESC;
```

---

## Key Concepts

### Procedural Power with PL/pgSQL
PostgreSQL features an industrial procedural language: **PL/pgSQL**. It enables control structures (`IF/ELSE`), iterative loops (`FOR/WHILE`), exception handling (`BEGIN...EXCEPTION`), and dynamic SQL execution directly in memory within the database engine with zero network round-trip latency.

### Trigger Machinery and Contextual Variables
Triggers fire automatically when data modification events occur (`BEFORE` or `AFTER` on `INSERT`, `UPDATE`, or `DELETE`). PostgreSQL injects critical execution context into the runtime:
- `TG_OP`: Contains the triggering operation (`'INSERT'`, `'UPDATE'`, `'DELETE'`).
- `NEW`: Holds the incoming record payload for inserts/updates.
- `OLD`: Contains the previous record state prior to update/deletion.
- `to_jsonb(NEW)`: Serializes entire table rows into JSONB structures instantly.

### Functions vs Stored Procedures
- **Functions** (`CREATE FUNCTION ... RETURNS ...`): Invoked via `SELECT`. Functions cannot commit or roll back transactions independently because they execute within the transaction context of the invoking query.
- **Stored Procedures** (`CREATE PROCEDURE ...`): Introduced in PostgreSQL 11 and invoked via `CALL`. Their crucial differentiator is native transaction autonomy: procedures can commit batch updates iteratively during long-running bulk migrations to prevent transaction bloat.

---

---

## Beginner Friendly Explanation

Think of a Stored Procedure like an automated robot residing inside the bank vault. Instead of dispatching 1,000 courier letters back and forth to update 1,000 prices individually (wasting network bandwidth), you dispatch a single master command: 'Robot, increase all Logitech prices by 10%'.

Triggers act like security surveillance cameras: whenever any staff member touches a price tag, the sensor snaps a photo of the old tag and new tag, instantly writing an indelible log to the audit ledger.

## Experiments

- Perform an UPDATE on a product price and verify that an entry is automatically appended to audit_logs
- Verify the IS DISTINCT FROM logic by updating a product with identical values to confirm redundant logging is bypassed
- Incorporate exception handling inside bulk_adjust_prices to abort if negative price percentages are supplied
- Construct a BEFORE INSERT trigger that automatically sanitizes product SKUs to UPPER() casing

---

## Challenge

Build a Soft Delete mechanism using a `BEFORE DELETE` trigger: instead of physically removing tuples, the trigger populates `deleted_at = CURRENT_TIMESTAMP`, archives previous states, and returns `NULL` to intercept physical deletion.

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

You have mastered PostgreSQL server-side logic: PL/pgSQL, event-driven triggers for financial regulatory audit trails, and Stored Procedures for autonomous batching workflows.
