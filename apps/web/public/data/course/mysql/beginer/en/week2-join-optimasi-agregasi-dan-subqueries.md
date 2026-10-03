# Multi-Table Joins, Aggregation & Advanced Subqueries

> **Kategori:** MySQL | **Level:** Relational Foundations & InnoDB Engine | **Minggu 2:** Multi-Table Joins, Aggregation & Advanced Subqueries
> ⏱️ **Estimated Time:** 45 Minutes (15m theory, 30m practice) | 🔗 **Pace:** Structured (Step-by-step)


## Learning Objectives

- Master multi-table relational joins combining INNER and LEFT joins
- Implement conditional aggregations using SUM with inline CASE WHEN expressions
- Prevent Cartesian product calculation explosions using derived subqueries
- Understand foreign key indexing dynamics in accelerating InnoDB join queries

---

## Program: User Wallet Reconciliation Report with Multi-Table Joins and Aggregation

```sql
-- Create transactions ledger table for reconciliation
CREATE TABLE wallet_ledgers (
    id BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
    wallet_id BIGINT UNSIGNED NOT NULL,
    transaction_code VARCHAR(64) NOT NULL,
    direction ENUM('CREDIT', 'DEBIT') NOT NULL,
    amount DECIMAL(15, 2) NOT NULL,
    fee DECIMAL(15, 2) NOT NULL DEFAULT 0.00,
    status ENUM('PENDING', 'SUCCESS', 'FAILED') NOT NULL DEFAULT 'PENDING',
    created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (id),
    UNIQUE KEY uq_tx_code (transaction_code),
    KEY idx_wallet_status_created (wallet_id, status, created_at),
    CONSTRAINT fk_ledger_wallet FOREIGN KEY (wallet_id) REFERENCES user_wallets(id)
) ENGINE=InnoDB;

-- Insert sample transactional entries
INSERT INTO wallet_ledgers (wallet_id, transaction_code, direction, amount, fee, status, created_at) VALUES
(1, 'TX-1001', 'CREDIT', 1000000.00, 0.00, 'SUCCESS', '2026-03-01 10:00:00'),
(1, 'TX-1002', 'DEBIT', 250000.00, 2500.00, 'SUCCESS', '2026-03-02 11:30:00'),
(1, 'TX-1003', 'DEBIT', 150000.00, 2500.00, 'SUCCESS', '2026-03-05 14:15:00'),
(2, 'TX-2001', 'CREDIT', 5000000.00, 0.00, 'SUCCESS', '2026-03-03 09:00:00'),
(2, 'TX-2002', 'CREDIT', 2000000.00, 0.00, 'FAILED', '2026-03-04 16:00:00');

-- Comprehensive user financial balance reconciliation query
SELECT 
    u.id AS user_id,
    u.full_name,
    u.email,
    w.currency,
    w.balance AS current_wallet_balance,
    COALESCE(ledger_summary.total_credit, 0.00) AS total_inflow,
    COALESCE(ledger_summary.total_debit, 0.00) AS total_outflow,
    COALESCE(ledger_summary.total_fees_paid, 0.00) AS total_fees,
    (COALESCE(ledger_summary.total_credit, 0.00) - COALESCE(ledger_summary.total_debit, 0.00) - COALESCE(ledger_summary.total_fees_paid, 0.00)) AS computed_net_flow
FROM app_users u
INNER JOIN user_wallets w ON u.id = w.user_id
LEFT JOIN (
    -- Subquery aggregate per wallet
    SELECT 
        l.wallet_id,
        SUM(CASE WHEN l.direction = 'CREDIT' THEN l.amount ELSE 0 END) AS total_credit,
        SUM(CASE WHEN l.direction = 'DEBIT' THEN l.amount ELSE 0 END) AS total_debit,
        SUM(l.fee) AS total_fees_paid,
        COUNT(l.id) AS successful_transactions_count
    FROM wallet_ledgers l
    WHERE l.status = 'SUCCESS'
    GROUP BY l.wallet_id
) AS ledger_summary ON w.id = ledger_summary.wallet_id
ORDER BY current_wallet_balance DESC;
```

---

## Key Concepts

### Optimizing Multi-Table Joins in InnoDB
During `JOIN` execution, the MySQL query optimizer determines the most efficient join order, typically choosing the relation with the most selective filter as the driving table. Indexing all `FOREIGN KEY` references is mandatory; absent indexes force MySQL to revert to expensive Block Nested-Loop (BNL) or in-memory Hash Joins.

### Conditional Aggregation Mechanics
Financial systems frequently require separating total inflows (`CREDIT`) and outflows (`DEBIT`) stored within a unified ledger amount column. The idiom `SUM(CASE WHEN direction = 'CREDIT' THEN amount ELSE 0 END)` calculates multi-dimensional business metrics within a single disk pass, significantly shrinking memory bandwidth.

### Derived Tables Preventing Cartesian Explosions
Joining `app_users` directly to `user_wallets` and subsequently to `wallet_ledgers` followed by a top-level `GROUP BY` introduces Cartesian multiplication hazards when users hold multiple currency accounts. Pre-aggregating ledger transactions inside an isolated derived table prior to joining top-level entities guarantees mathematical precision.

---

---

## Beginner Friendly Explanation

Imagine acting as a bank auditor inspecting ledger books. If you tally inflows first and then reread the entire book from scratch to tally outflows, you burn double the time.

With conditional aggregation (`CASE WHEN`), you perform a single pass through the ledger: your left hand tallies deposits while your right hand simultaneously tallies withdrawals.

## Experiments

- Replace LEFT JOIN with INNER JOIN and observe the elimination of users with no transactional history
- Append a HAVING total_inflow > 2000000 clause inside the derived table and inspect final reports
- Profile query execution characteristics after seeding 10,000 synthetic rows into wallet_ledgers
- Incorporate DATE_SUB(NOW(), INTERVAL 30 DAY) to filter historical transactions strictly within 30 days

---

## Challenge

Write a balance discrepancy detection query: compare `user_wallets.balance` against `SUM(CREDIT) - SUM(DEBIT) - SUM(fee)` from `wallet_ledgers`, isolating strictly accounts exhibiting drift.

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

You have mastered multi-table join tuning, derived subquery aggregates, single-pass conditional aggregation with CASE WHEN, and Cartesian multiplication prevention in MySQL.
