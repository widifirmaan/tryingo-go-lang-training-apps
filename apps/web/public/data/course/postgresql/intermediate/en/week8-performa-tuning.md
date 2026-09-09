# Performance Tuning — Warehouse Fast at 1M Rows

> **Kategori:** PostgreSQL | **Level:** Intermediate | **Minggu 8:** Performa Tuning
> **Prerequisites:** Week 7 — **JSONB Semi-Structured**.

## Learning Objectives

- `EXPLAIN ANALYZE` real time, `VACUUM`, `ANALYZE`, `pg_stat_statements` find slow queries

---

## Why This Matters (Non-IT)

Without `EXPLAIN ANALYZE`, slow queries surface via complaints (not data). With real-time X-ray + `VACUUM`, prove 100x before deploy.

---

## Program

```sql
EXPLAIN ANALYZE SELECT * FROM products WHERE category = 'Staples';
-- Seq Scan cost=... time=1.2ms → Index Scan time=0.1ms

VACUUM ANALYZE products;
-- MANDATORY first (without it: relation does not exist!):
CREATE EXTENSION IF NOT EXISTS pg_stat_statements;
SELECT query, mean_exec_time FROM pg_stat_statements ORDER BY mean_exec_time DESC LIMIT 5;
```


---

## Beginner Friendly Explanation

### Analogy: Warehouse Doctor
- **Slow queries without EXPLAIN = sickness without X-ray**: guessing (add RAM?) is expensive and often wrong.
- **`EXPLAIN ANALYZE` = real X-ray**: points at slow lines + their ms. `VACUUM` = sweeps dead data, `pg_stat_statements` = medical records of all queries!

### Step 0 — Prepare Device
- Same as this track's W1 (Supabase no-install / local).

### How the Computer Reads It
- EXPLAIN ANALYZE shows real time per stage; VACUUM sweeps dead data.

### 3 Must-Know Terms
- 1. **EXPLAIN ANALYZE/VACUUM**: time-xray/sweep

## Challenge

**Performance Tuning in Your Shop:** use `products`, `pg_stat_statements` until it truly runs, then do these three levels.
- **Green:** Run this week's Program as-is; note the output.
- **Yellow:** Change 1 value in `products`, `pg_stat_statements`; predict the output BEFORE running, then compare.
- **Red:** Combine with **JSONB Semi-Structured** (Week 7): plug the result into that flow, end-to-end must work.

## Summary

Week 8: **Fast Warehouse** — `EXPLAIN ANALYZE` + `VACUUM`. Next week: **Replication & HA**.
