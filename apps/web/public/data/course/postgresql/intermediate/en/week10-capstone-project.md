# Capstone: Complete Shop Warehouse

> **Kategori:** PostgreSQL | **Level:** Intermediate | **Minggu 10:** Capstone Project
> **Prerequisites:** Week 9 — **Replication & HA**.

## Learning Objectives

- Combine `CREATE TABLE` + `JOIN` + `INDEX` + `JSONB` + `replication` into a 10k-row shop warehouse + `GROUP BY` + `Window` report

---

## Why This Matters (Non-IT)

9 separate weeks — capstone proves the combination: 10k-row warehouse + reports + backup/restore. PostgreSQL portfolio.

---

## Program: Warehouse Capstone

Build `products`, `customers`, `orders` + `INDEX` + `JSONB` for `orders.data` + `replica` + `EXPLAIN ANALYZE`.

**Task:** Import 10k rows `COPY FROM csv`, build report `SELECT category, SUM(price) OVER (PARTITION BY category)`.



```sql
-- Capstone Gudang: JOIN SQLite (aksi nyata di playground; di Postgres
-- produksi pola sama + JSONB + replikasi + pg_dump, lihat Tugas)
CREATE TABLE produk(id INTEGER PRIMARY KEY, nama TEXT, kategori TEXT, harga INTEGER, stok INTEGER);
CREATE TABLE pelanggan(id INTEGER PRIMARY KEY, nama TEXT, kota TEXT);
CREATE TABLE pesanan(id INTEGER PRIMARY KEY, pelanggan_id INTEGER, produk_id INTEGER, qty INTEGER, tanggal TEXT);
INSERT INTO produk VALUES (1,'Beras 5kg','Sembako',62000,40),(2,'Minyak 2L','Sembako',48000,25),(3,'Sabun','Rumah',12000,100);
INSERT INTO pelanggan VALUES (1,'Budi','Bandung'),(2,'Siti','Jakarta');
INSERT INTO pesanan VALUES (1,1,1,2,'2026-09-01'),(2,1,3,5,'2026-09-02'),(3,2,2,1,'2026-09-03');
CREATE INDEX idx_pesanan_produk ON pesanan(produk_id);
-- Laporan omzet per kategori (JOIN + GROUP BY, W3)
SELECT pr.kategori, SUM(pr.harga * ps.qty) AS omzet
FROM pesanan ps JOIN produk pr ON pr.id = ps.produk_id
GROUP BY pr.kategori;
-- Peringkat produk terlaris per kategori (Window, W6)
SELECT nama, kategori,
  SUM(stok) OVER (PARTITION BY kategori) AS stok_kategori
FROM produk;
EXPLAIN QUERY PLAN SELECT * FROM pesanan WHERE produk_id = 1;
```

*Paste into the playground → Run per statement, see turnover + ranking + QUERY PLAN.*

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

## Experiments

- **Green:** `SELECT * FROM produk` → 3 rows? `WHERE stok < 30` → what?
- **Yellow:** Add Siti order 3 Minyak → Sembako turnover changes?
- **Red:** Drop the `INDEX` → `EXPLAIN` becomes SCAN? Recreate.

## Challenge

****Warehouse Grand Opening:** combine `CREATE TABLE` + `JOIN` + `Window` + `EXPLAIN`: add `stok_masuk` table, `v_omzet_harian` view, and verify `EXPLAIN` still uses the index.**

Green: view runs. Yellow: INSERT 1 row → view follows. Red: `pg_dump` + restore (Task) → data identical.

## Summary

Week 10: **Warehouse Capstone** — complete warehouse, **PostgreSQL 0→Expert DONE!**
