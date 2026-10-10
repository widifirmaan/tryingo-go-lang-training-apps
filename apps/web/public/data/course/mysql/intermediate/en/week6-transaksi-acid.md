# Transactions & ACID

> **Kategori:** MySQL | **Level:** Intermediate | **Minggu 6:** Transactions & ACID

## Learning Objectives

- START TRANSACTION, COMMIT, ROLLBACK
- SAVEPOINT and ROLLBACK TO
- ACID properties
- Isolation levels
- Locking with FOR UPDATE

---

## Program: Transaction Management

```sql
-- ACID Transaction
START TRANSACTION;

UPDATE produk SET stok = stok - 5 WHERE id = 1;
UPDATE produk SET stok = stok + 5 WHERE id = 2;

-- Cek hasil
SELECT id, nama, stok FROM produk WHERE id IN (1, 2);

COMMIT;

-- Rollback example
START TRANSACTION;

UPDATE produk SET harga = harga * 2 WHERE kategori = 'Elektronik';

-- Oops, salah! Rollback
ROLLBACK;

SELECT id, nama, harga FROM produk WHERE kategori = 'Elektronik';

-- Savepoint
START TRANSACTION;

UPDATE produk SET stok = stok - 10 WHERE id = 1;
SAVEPOINT sebelum_update_harga;

UPDATE produk SET harga = harga * 1.1 WHERE id = 1;

-- Rollback ke savepoint
ROLLBACK TO SAVEPOINT sebelum_update_harga;

COMMIT;

-- Isolation Level
SELECT @@transaction_isolation;
SET SESSION TRANSACTION ISOLATION LEVEL READ COMMITTED;

-- Locking
SELECT * FROM produk WHERE id = 1 FOR UPDATE;

START TRANSACTION;
SELECT * FROM produk WHERE kategori = 'Elektronik' FOR UPDATE;
-- Proses bisnis...
COMMIT;
```

---

## Key Concepts

### ACID
Atomicity, Consistency, Isolation, Durability.

### COMMIT & ROLLBACK
COMMIT saves permanently. ROLLBACK cancels.

### SAVEPOINT
Rollback point within transaction.

### Isolation Levels
READ UNCOMMITTED to SERIALIZABLE.

### Locking
FOR UPDATE locks rows.

---

## Experiments

- Deadlock scenario
- Gap locking
- Optimistic locking
- Transaction log

---

## Challenge

Balance transfer system: safe transactions with rollback.

---

## Summary

Week 6 of 10: **Transactions & ACID** (Intermediate).
