# Capstone: Complete Shop Warehouse

> **Kategori:** PostgreSQL | **Level:** Intermediate | **Minggu 10:** Capstone Project

## Learning Objectives

- Combine `CREATE TABLE` + `JOIN` + `INDEX` + `JSONB` + `replication` into a 10k-row shop warehouse + `GROUP BY` + `Window` report

---

## Why This Matters (Non-IT)

9 separate weeks — capstone proves the combination: 10k-row warehouse + reports + backup/restore. PostgreSQL portfolio.

---

## Program: Warehouse Capstone

Build `products`, `customers`, `orders` + `INDEX` + `JSONB` for `orders.data` + `replica` + `EXPLAIN ANALYZE`.

**Task:** Import 10k rows `COPY FROM csv`, build report `SELECT category, SUM(price) OVER (PARTITION BY category)`.


---

## Beginner Friendly Explanation

### Analogy: Warehouse Grand Opening
- **9 weeks = building a warehouse**: racks (tables), ropes (FKs), contents (indexes), recipes (functions), alarms (triggers).
- **Capstone = grand opening**: 10k-row warehouse + reports + backup/restore PROVEN (`pg_dump` + restore + same data!). No backup = warehouse without insurance!

### Step 0 — Prepare Device
- Same as this track's W1 (Supabase no-install / local).

### How the Computer Reads It
- CHECKLIST everything (index + view + backup) then `pg_dump` + restore + same data.

### 3 Must-Know Terms
- 1. **Capstone/pg_dump**: combine/backup

## Summary

Week 10: **Warehouse Capstone** — complete warehouse, **PostgreSQL 0→Expert DONE!**
