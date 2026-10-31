# Transactions & ACID

> **Kategori:** MySQL | **Level:** Intermediate | **Minggu 6:** Transactions & ACID

## Learning Objectives

- START TRANSACTION, COMMIT, ROLLBACK
- SAVEPOINT and ROLLBACK TO
- ACID properties
- Isolation levels
- Locking with FOR UPDATE

---

## Program: Transfer Transaction Simulation

This program simulates a fund transfer between accounts complete with ledger entries, exactly what a real banking app executes.

```sql
-- Funds transfer simulation (ACID in practice)
-- The playground runs SQLite; on real MySQL wrap the steps in
-- START TRANSACTION ... COMMIT / ROLLBACK.

-- Move 10M from Eko (id=5) to Dewi (id=4)
UPDATE employees SET salary = salary - 10000000 WHERE id = 5;
UPDATE employees SET salary = salary + 10000000 WHERE id = 4;

-- Ledger table for the audit trail
CREATE TABLE transfers (
  transfer_id INTEGER PRIMARY KEY AUTOINCREMENT,
  from_id INTEGER NOT NULL,
  to_id INTEGER NOT NULL,
  amount INTEGER NOT NULL,
  transfer_date TEXT NOT NULL
);
INSERT INTO transfers (from_id, to_id, amount, transfer_date)
VALUES (5, 4, 10000000, '2026-01-20');

-- Verification: total payroll must stay unchanged
SELECT SUM(salary) AS total_payroll FROM employees;

-- Audit: join sender and receiver names
SELECT t.transfer_id,
       s.name AS sender,
       r.name AS receiver,
       t.amount, t.transfer_date
FROM transfers t
JOIN employees s ON s.id = t.from_id
JOIN employees r ON r.id = t.to_id;
```

---

## Key Concepts

### Atomicity (Atomicitas)

Semua langkah transfer adalah satu unit: jika satu UPDATE gagal, semuanya dibatalkan. Tanpa ini uang bisa "menghilang" di tengah proses.

### Consistency (Konsistensi)

Constraint (PRIMARY KEY, NOT NULL) menjaga data tetap valid sebelum dan sesudah transaksi. Total payroll yang tetap adalah sanity check-nya.

### Isolation (Isolasi)

Klien bersamaan tidak boleh melihat "setengah transfer". Default MySQL InnoDB = REPEATABLE READ: transaksi membaca snapshot data.

### Durability (Durabilitas)

Setelah COMMIT sukses, data aman walau server mati detik berikutnya — InnoDB menulis ke redo log sebelum mengakui COMMIT.

---

## Experiments

- Try a 5,000,000 transfer and compare SUM before vs after.
- Add a `note TEXT` column to transfers and fill in a reason.
- Write the SELECT that would reject transfers when the sender lacks funds.

---

## Challenge

Build a 10% payroll deduction for every employee and log each cut into the transfers table as company treasury income.

---

## Summary

This week's material has been covered: Transfer Transaction Simulation. Continue to the following week to deepen.
