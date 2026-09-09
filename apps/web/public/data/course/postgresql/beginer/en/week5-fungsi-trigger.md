# Functions & Triggers — Automatic PostgreSQL Warehouse Recipes

> **Kategori:** PostgreSQL | **Level:** Beginner | **Minggu 5:** Fungsi & Trigger
> **Prerequisites:** Week 4 — **Index & Optimization**.

## Learning Objectives

- `CREATE FUNCTION calc_tax(price) RETURNS DECIMAL ... LANGUAGE plpgsql` recipe in the warehouse (source: postgresql.org/docs/plpgsql)
- `CREATE TRIGGER ... BEFORE INSERT` automatic alarm on every item add

---

## Why This Matters (Non-IT)

Computing 11% tax in 10 places (JS, Python, reports) → 1 place forgotten, totals differ. With a DB `FUNCTION`, everyone uses the same formula. Triggers auto-reject negative `stock` — no relying on apps.

---

## Program: Warehouse Recipes & Alarms

```sql
-- 1. Function: tax recipe (store once, use forever)
CREATE OR REPLACE FUNCTION calc_total_tax(price DECIMAL, pct DECIMAL DEFAULT 11)
RETURNS DECIMAL AS $$
BEGIN
  RETURN price + (price * pct / 100);
END;
$$ LANGUAGE plpgsql;

SELECT name, price, calc_total_tax(price) AS total FROM products;

-- 2. Trigger: alarm rejecting negative stock
CREATE OR REPLACE FUNCTION reject_negative_stock()
RETURNS TRIGGER AS $$
BEGIN
  IF NEW.stock < 0 THEN
    RAISE EXCEPTION 'Stock % must not be negative!', NEW.name;
  END IF;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER check_stock
BEFORE INSERT OR UPDATE ON products
FOR EACH ROW EXECUTE FUNCTION reject_negative_stock();

-- Try violating!
UPDATE products SET stock = -5 WHERE id = 1;
-- ERROR: Stock Rice must not be negative!
```

---

## Key Concepts

### `FUNCTION` = Recipe in Warehouse
`CREATE FUNCTION ... RETURNS ... AS $$ BEGIN ... END; $$ LANGUAGE plpgsql` — call like `calc_total_tax(price)`.

### `TRIGGER` = Automatic Alarm
`BEFORE INSERT OR UPDATE ... FOR EACH ROW` → checks each row → `RAISE EXCEPTION` rejects.

### `NEW` = New Goods
`NEW.stock` the incoming value. `RETURN NEW` passes, `RAISE` rejects.

---

## Beginner Friendly Explanation

### Analogy: Wall Recipe & Alarm
- **Function = posted recipe**: all cashiers use the same formula.
- **Trigger = door alarm**: negative goods → rings, rejected.

### Step 0 — Prepare Device
- Same as W1: Supabase SQL Editor / `psql`.

### How the Computer Reads It
1. `SELECT calc_total_tax(62000)` → runs `BEGIN...END` → 68820.
2. `UPDATE stock=-5` → `BEFORE` trigger → `RAISE` → cancelled + message.

### 3 Must-Know Terms
1. **Function/plpgsql**: recipe/recipe-language
2. **Trigger/NEW**: alarm/new-goods

---

## Experiments

- **Green:** `SELECT calc_total_tax(100000, 10)` → 110000?
- **Yellow:** `UPDATE stock = 0` (not negative) → passes?
- **Red:** `DROP FUNCTION calc_total_tax` → report query errors? Recreate.

---

## Challenge

**Automatic Warehouse:** Function `discount(price, pct)` + trigger rejecting `price <= 0` + `SELECT` 3 products via function. **Beginner PostgreSQL DONE!**

---

## Mini Glossary

- **Function/Trigger/RAISE**: recipe/alarm/reject

---

## Summary

Week 5 of 5: **Automatic Recipes & Alarms** (Level: Beginner). **Beginner PostgreSQL DONE!** Next: **Window Functions** (Intermediate).
