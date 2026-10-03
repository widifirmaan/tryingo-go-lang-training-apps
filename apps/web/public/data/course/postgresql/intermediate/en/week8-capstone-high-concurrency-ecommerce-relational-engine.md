# Capstone Project: High-Concurrency E-Commerce Relational Engine

> **Kategori:** PostgreSQL | **Level:** Concurrency, Partitioning & Enterprise Architecture | **Minggu 8:** Capstone Project: High-Concurrency E-Commerce Relational Engine
> ⏱️ **Estimated Time:** 45 Minutes (15m theory, 30m practice) | 🔗 **Pace:** Structured (Step-by-step)


## Learning Objectives

- Synthesize all architectural PostgreSQL disciplines into a production-grade e-commerce engine capstone
- Implement an atomic checkout Stored Procedure with pessimistic locking and OUT parameters
- Harmonize Declarative Table Partitioning with high-velocity Window Analytics views
- Ensure bulletproof concurrency defenses against inventory overselling under high concurrency

---

## Program: Full E-Commerce Engine: Transaction Partitioning, Flash Sale Stock Locking & Audit Trail

```sql
-- CAPSTONE: High-Concurrency E-Commerce Relational Engine
-- Integrates UUID, JSONB, Window Analytics, PL/pgSQL Triggers, Partitioning, and Locking

-- 1. Partitioned Orders Table by Year
CREATE TABLE IF NOT EXISTS orders_engine (
    id UUID NOT NULL DEFAULT gen_random_uuid(),
    customer_id UUID NOT NULL,
    total_amount NUMERIC(14, 2) NOT NULL DEFAULT 0.00 CHECK (total_amount >= 0),
    status VARCHAR(20) NOT NULL DEFAULT 'PENDING'
        CHECK (status IN ('PENDING', 'PROCESSING', 'PAID', 'SHIPPED', 'CANCELLED')),
    checkout_metadata JSONB NOT NULL DEFAULT '{}'::jsonb,
    created_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (id, created_at)
) PARTITION BY RANGE (created_at);

CREATE TABLE IF NOT EXISTS orders_engine_2026 PARTITION OF orders_engine
    FOR VALUES FROM ('2026-01-01 00:00:00+00') TO ('2027-01-01 00:00:00+00');

-- 2. Stored Procedure for Atomic Flash-Sale Purchase Execution
CREATE OR REPLACE PROCEDURE execute_checkout(
    p_customer_id UUID,
    p_product_id UUID,
    p_quantity INT,
    OUT p_order_id UUID,
    OUT p_status_code TEXT
)
LANGUAGE plpgsql AS $$
DECLARE
    v_available_stock INT;
    v_unit_price NUMERIC(12, 2);
    v_total NUMERIC(14, 2);
    v_new_order_id UUID;
BEGIN
    -- Step A: Pessimistic Row Lock on Product
    SELECT stock_quantity, price 
    INTO v_available_stock, v_unit_price
    FROM products
    WHERE id = p_product_id
    FOR UPDATE;

    IF NOT FOUND THEN
        p_status_code := 'PRODUCT_NOT_FOUND';
        RETURN;
    END IF;

    -- Step B: Validate Inventory
    IF v_available_stock < p_quantity THEN
        p_status_code := 'INSUFFICIENT_STOCK';
        RETURN;
    END IF;

    -- Step C: Deduct Stock Atomically
    UPDATE products
    SET stock_quantity = stock_quantity - p_quantity
    WHERE id = p_product_id;

    -- Step D: Create Partitioned Order
    v_total := v_unit_price * p_quantity;
    v_new_order_id := gen_random_uuid();

    INSERT INTO orders_engine (id, customer_id, total_amount, status, checkout_metadata, created_at)
    VALUES (
        v_new_order_id,
        p_customer_id,
        v_total,
        'PAID',
        jsonb_build_object('product_id', p_product_id, 'quantity', p_quantity, 'ip', '192.168.1.100'),
        CURRENT_TIMESTAMP
    );

    p_order_id := v_new_order_id;
    p_status_code := 'SUCCESS';
END;
$$;

-- 3. Executive Dashboard View utilizing Window Functions
CREATE OR REPLACE VIEW v_executive_sales_summary AS
WITH daily_metrics AS (
    SELECT 
        DATE_TRUNC('day', created_at)::DATE AS sales_date,
        COUNT(id) AS daily_transactions,
        SUM(total_amount) AS daily_revenue
    FROM orders_engine
    WHERE status = 'PAID'
    GROUP BY DATE_TRUNC('day', created_at)
)
SELECT 
    sales_date,
    daily_transactions,
    daily_revenue,
    SUM(daily_revenue) OVER (ORDER BY sales_date ASC) AS running_cumulative_revenue,
    ROUND(
        daily_revenue - AVG(daily_revenue) OVER (
            ORDER BY sales_date ASC ROWS BETWEEN 6 PRECEDING AND CURRENT ROW
        ), 2
    ) AS delta_from_7day_moving_avg
FROM daily_metrics;

-- 4. Verification queries
SELECT * FROM v_executive_sales_summary;
```

---

## Key Concepts

### Capstone E-Commerce Engine Architecture
This capstone project synthesizes enterprise PostgreSQL capabilities into a coherent, industrial-grade relational system:
1. **Physical Partitioning (`PARTITION BY RANGE`)**: High-velocity order volumes are segmented into annual storage partitions without compromising primary key uniqueness.
2. **Procedural Concurrency Defense**: The `execute_checkout` procedure encapsulates inventory deduction and order generation within an isolated transaction boundary. `FOR UPDATE` row locks eliminate race hazards during high-concurrency peak events.
3. **Flexible JSONB Metadata**: The `checkout_metadata` column persists audit snapshots and client details without triggering schema migrations.
4. **Real-Time Executive Analytics**: The `v_executive_sales_summary` view utilizes sliding analytical window frames (`7 PRECEDING`) to calculate moving average volatility and cumulative revenue in real time.

---

---

## Beginner Friendly Explanation

Congratulations! You have constructed the core engine of an enterprise-tier e-commerce platform. From partitioned storage, to an atomic checkout procedure, to locking padlocks preventing double-spending, up to an automated executive analytics dashboard powered by window functions.

## Experiments

- Invoke procedure execute_checkout with quantity exceeding inventory and verify status INSUFFICIENT_STOCK
- Inject pg_sleep() inside the procedure to inspect concurrent locking mechanics interactively
- Enhance v_executive_sales_summary by incorporating DENSE_RANK() for peak revenue days
- Run EXPLAIN ANALYZE on the executive view to inspect partition pruning efficiency

---

## Challenge

Extend the capstone engine with a promotional voucher mechanism: create a `vouchers` table with quota caps, and modify `execute_checkout` to lock the voucher via `FOR UPDATE`, validate expiration, and deduct quota atomically.

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

Congratulations! You have completed the entire PostgreSQL curriculum from foundations to enterprise architecture: UUID, JSONB, CTEs, Window Functions, B-Tree & GIN Indexing, Concurrency Locking, PL/pgSQL Triggers, Partitioning, and a Capstone E-Commerce Engine.
