# Complex Joins, Aggregations & Common Table Expressions (CTE)

> **Kategori:** PostgreSQL | **Level:** Relational Foundations & Advanced SQL | **Minggu 2:** Complex Joins, Aggregations & Common Table Expressions (CTE)
> ⏱️ **Estimated Time:** 45 Minutes (15m theory, 30m practice) | 🔗 **Pace:** Structured (Step-by-step)


## Learning Objectives

- Construct modular, maintainable analytical queries using Common Table Expressions (WITH clauses)
- Understand semantic differences between INNER, LEFT, and FULL OUTER joins to ensure reporting accuracy
- Apply aggregation functions (SUM, AVG, COUNT, MIN, MAX) with GROUP BY and HAVING filters
- Bucket time-series transaction records using DATE_TRUNC

---

## Program: Hierarchical Sales Report using CTEs and HAVING Aggregate Filters

```sql
-- Common Table Expressions (CTE) for modular, readable data pipelines
WITH completed_orders AS (
    -- Step 1: Filter and normalize order financial totals
    SELECT 
        o.id AS order_id,
        o.customer_id,
        o.total_amount,
        o.created_at,
        DATE_TRUNC('month', o.created_at) AS order_month
    FROM orders o
    WHERE o.status IN ('PAID', 'PROCESSING', 'SHIPPED')
),
customer_summary AS (
    -- Step 2: Aggregate lifetime value per customer
    SELECT 
        co.customer_id,
        COUNT(co.order_id) AS total_orders,
        SUM(co.total_amount) AS lifetime_spent,
        AVG(co.total_amount) AS average_order_value,
        MAX(co.created_at) AS last_order_date
    FROM completed_orders co
    GROUP BY co.customer_id
),
top_product_lines AS (
    -- Step 3: Calculate product performance across all orders
    SELECT 
        p.id AS product_id,
        p.sku,
        p.title,
        SUM(oi.quantity) AS units_sold,
        SUM(oi.quantity * oi.unit_price) AS gross_revenue
    FROM products p
    INNER JOIN order_items oi ON p.id = oi.product_id
    INNER JOIN orders o ON oi.order_id = o.id
    WHERE o.status = 'PAID'
    GROUP BY p.id, p.sku, p.title
    HAVING SUM(oi.quantity) > 0
)
-- Step 4: Final analytical projection joining customer profiles
SELECT 
    c.full_name,
    c.email,
    COALESCE(cs.total_orders, 0) AS completed_orders,
    COALESCE(cs.lifetime_spent, 0.00) AS total_revenue_idr,
    ROUND(COALESCE(cs.average_order_value, 0.00), 2) AS avg_basket_size,
    CASE 
        WHEN COALESCE(cs.lifetime_spent, 0) >= 20000000 THEN 'VIP Platinum'
        WHEN COALESCE(cs.lifetime_spent, 0) >= 10000000 THEN 'Gold Member'
        WHEN COALESCE(cs.lifetime_spent, 0) > 0 THEN 'Active Regular'
        ELSE 'Prospect'
    END AS customer_segment
FROM customers c
LEFT JOIN customer_summary cs ON c.id = cs.customer_id
ORDER BY total_revenue_idr DESC;
```

---

## Key Concepts

### Query Modularity with Common Table Expressions (CTEs)
The `WITH` clause (Common Table Expression / CTE) empowers developers to decompose unwieldy, deeply nested SQL queries into sequential, readable logical stages. Each CTE functions as an ephemeral, named result set evaluated within the scope of the parent statement. Unlike convoluted nested subqueries, CTEs drastically improve code readability, maintainability, and debugging ergonomics.

### Relational JOIN Semantics and NULL Handling
When correlating customers and their respective purchases:
- `INNER JOIN` strictly produces records where keys exist on both sides. Inactive customers with zero orders are excluded.
- `LEFT JOIN` preserves all records from the primary relation (`customers`), populating missing foreign attributes with `NULL`. Combining this with `COALESCE(val, fallback)` guarantees clean defaults (e.g. converting `NULL` order counts into `0`).

### Aggregation Mechanics: WHERE vs HAVING
The `WHERE` clause filters individual table rows *prior* to `GROUP BY` execution. In contrast, the `HAVING` clause evaluates filtering criteria *after* aggregate calculations are materialized. For example, `WHERE o.status = 'PAID'` filters individual transaction status, whereas `HAVING SUM(oi.quantity) > 10` evaluates aggregate product volumes.

---

---

## Beginner Friendly Explanation

Think of CTEs like preparing mise en place ingredients in a professional kitchen. Instead of dumping every ingredient into one giant chaotic frying pan (nested subquery hell), you prep bowl #1 for 'paid orders', bowl #2 for 'per-customer lifetime spend', and bowl #3 for 'top selling items'. 

At plating time, you effortlessly combine the contents of these prepped bowls into a pristine culinary presentation.

## Experiments

- Switch the primary LEFT JOIN to an INNER JOIN and observe the exclusion of zero-order customers
- Add a new CTE stage calculating the cancellation ratio per customer
- Apply DATE_TRUNC('week', o.created_at) to aggregate weekly revenue buckets
- Experiment with adding HAVING lifetime_spent > 15000000 inside the customer_summary CTE

---

## Challenge

Write a recursive CTE (`WITH RECURSIVE`) querying a hierarchical category tree (parent-child self-referential table) displaying the full breadcrumb path (e.g. "Electronics > Computers > Accessories > Mouse").

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

You have mastered modern analytical query pipelines using Common Table Expressions (CTEs), nuanced INNER vs LEFT JOIN mechanics, and robust aggregation with GROUP BY and HAVING.
