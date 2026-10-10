# Transaksi & ACID

> **Kategori:** MySQL | **Level:** Menengah | **Minggu 6:** Transaksi & ACID

## Tujuan Pembelajaran

- START TRANSACTION, COMMIT, ROLLBACK
- SAVEPOINT dan ROLLBACK TO
- ACID properties
- Isolation levels
- Locking dengan FOR UPDATE

---

## Program: Manajemen Transaksi

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

## Konsep Kunci

### ACID
Atomicity, Consistency, Isolation, Durability.

### COMMIT & ROLLBACK
COMMIT simpan permanen. ROLLBACK batalkan.

### SAVEPOINT
Titik rollback di dalam transaksi.

### Isolation Levels
READ UNCOMMITTED, READ COMMITTED, REPEATABLE READ, SERIALIZABLE.

### Locking
FOR UPDATE mengunci baris untuk transaksi lain.

---

## Eksperimen

- Deadlock scenario
- Gap locking
- Optimistic locking
- Transaction log

---

## Tantangan

Sistem transfer saldo: transaksi aman dengan rollback.

---

## Ringkasan

Minggu 6 dari 10: **Transaksi & ACID** (Menengah).
