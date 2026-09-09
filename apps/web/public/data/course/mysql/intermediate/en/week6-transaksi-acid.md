# Transactions & ACID — Safe Anti-Half Payment

> **Kategori:** MySQL | **Level:** Intermediate | **Minggu 6:** Transaksi & ACID
> **Prerequisites:** Week 5 — **Stored Procedure**.

## Learning Objectives

- `START TRANSACTION` + `COMMIT` validates + `ROLLBACK` cancels — all-or-nothing package (source: dev.mysql.com/doc/refman/8.0/en/commit)
- ACID: Atomicity, Consistency, Isolation, Durability + `InnoDB` mandatory (MyISAM can't!)

---

## Why This Matters (Non-IT)

Moving stock warehouse A→B without transactions: A decrements (success), B increments (fails, blackout) → 10 boxes of stock vanish! With transactions, 1 failure = all cancelled (as if nothing happened).

---

## Program: Safe Stock Move

```sql
-- Without transaction (DANGEROUS): if line 2 fails, line 1 already ran!
-- UPDATE warehouse_a SET stock = stock - 10 WHERE id = 1;
-- UPDATE warehouse_b SET stock = stock + 10 WHERE id = 1;

-- With transaction (SAFE):
START TRANSACTION;

UPDATE products SET stock = stock - 10 WHERE id = 1 AND stock >= 10;
-- Check: if stock short, cancel manually:
-- (in app: check ROW_COUNT(), if 0 → ROLLBACK)

UPDATE products SET stock = stock + 10 WHERE id = 2;

COMMIT;  -- validate both (or ROLLBACK to cancel all!)

-- Try cancelling:
START TRANSACTION;
UPDATE products SET price = 1 WHERE id = 1;  -- wrong! 1-rupiah price
ROLLBACK;  -- cancelled! price restored
SELECT price FROM products WHERE id = 1;  -- still original
```

---

## Key Concepts

### `START TRANSACTION` / `COMMIT` / `ROLLBACK` = Start/Validate/Cancel
Everything between = 1 package. `COMMIT` writes permanently, `ROLLBACK` discards all.

### ACID = 4 InnoDB Promises
- **A**tomic: all or nothing.
- **C**onsistent: rules (FK, CHECK) always true.
- **I**solated: other transactions never see halfway.
- **D**urable: once COMMITted = survives blackouts.

### InnoDB Mandatory
`ENGINE=InnoDB` supports transactions. `MyISAM` does NOT — check `SHOW TABLE STATUS`.

---

## Beginner Friendly Explanation

### Analogy: Bank Transfer
- **Transaction = bank transfer**: debit A + credit B in 1 package. 1 failure = all cancelled (money never lost in transit).

### Step 0 — Prepare Device
- Same as MySQL W1: `mysql -u root -p`, `products` table InnoDB.

### How the Computer Reads It
1. `START TRANSACTION` → marks the starting point.
2. `UPDATE...` → writes temporarily (not permanent yet).
3. `COMMIT` → permanent. `ROLLBACK` → discards everything since the mark.

### 3 Must-Know Terms
1. **Transaction/commit/rollback**: package/validate/cancel
2. **ACID/InnoDB**: 4-promises/safe-engine

---

## Experiments

- **Green:** `START; UPDATE price=1; ROLLBACK; SELECT` → price unchanged?
- **Yellow:** `START; UPDATE; COMMIT;` → permanent? (Close-reopen connection, check!)
- **Red:** `MyISAM` table + `ROLLBACK` → still changed? (MyISAM can't! Switch to InnoDB.)

---

## Challenge

**Safe Stock Move:** `START` → decrement A by 5 (check `stock>=5` in WHERE!) → increment B by 5 → `COMMIT` → A+B total unchanged. Fail 1 → `ROLLBACK`, total intact.
- **Link-up (Week 5 — Stored Procedure):** plug this challenge's result into that flow; make sure it runs end-to-end.

---
## Mini Glossary

- **START/COMMIT/ROLLBACK**: start/validate/cancel
- **ACID/InnoDB**: promises/engine

---

## Summary

Week 6 of 10: **Safe Payment** (Level: Intermediate). All-or-nothing. Next: **Performance** — speed.
