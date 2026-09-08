# Stored Procedure — Recipes Stored in MySQL Warehouse

> **Kategori:** MySQL | **Level:** Beginner | **Minggu 5:** Stored Procedure

## Learning Objectives

- `DELIMITER //` swaps the semicolon temporarily, `CREATE PROCEDURE calcTotal()` stores the recipe on the server, `CALL calcTotal()` invokes, `DROP PROCEDURE` removes (source: MySQL 8.0 docs)
- `IN category VARCHAR(50)` parameter for flexible recipes

---

## Why This Matters (Non-IT)

The "Staples total" report computed every morning with a 5-line query — copy-paste risks mistakes. With a procedure, store once in the warehouse → mornings need only `CALL calcTotal('Staples')` 1 line. Standard recipe, same for all cashiers.

---

## Program: Recipe in Warehouse

```sql
-- Swap the delimiter first (recipes contain ; inside)
DELIMITER //

CREATE PROCEDURE calcTotal(IN cat VARCHAR(50))
BEGIN
  SELECT category, SUM(price * stock) AS total_value
  FROM products
  WHERE category = cat
  GROUP BY category;
END //

-- Restore delimiter
DELIMITER ;

-- Call the recipe (1 line!)
CALL calcTotal('Staples');
CALL calcTotal('Veggies');

-- View & remove recipes
SHOW PROCEDURE STATUS WHERE Db = 'shop_db';
DROP PROCEDURE IF EXISTS calcTotal;
```

---

## Key Concepts

### `DELIMITER //` = Swap the Dot
MySQL reads `;` as "run". Recipes contain many `;` → swap delimiter to `//` first, restore after.

### `CREATE PROCEDURE` + `CALL` = Store & Call
`CREATE PROCEDURE name(IN param TYPE)` stores, `CALL name('value')` runs.

### `IN` = Incoming Ingredient
`IN cat VARCHAR(50)` = recipe accepts 1 ingredient `cat`.

---

## Beginner Friendly Explanation

### Analogy: Recipe Pinned on Warehouse Wall
- **Plain query = recipe on loose paper**: rewritten every morning, can err.
- **Procedure = recipe pinned on wall**: `CALL` = point at recipe, warehouse executes.

### Step 0 — Prepare Device
- Same as W1. `DELIMITER` only exists in clients (`mysql`, `db-fiddle` console) — not part of server SQL.

### How the Computer Reads It
1. `CREATE PROCEDURE ...` → MySQL stores recipe text + checks syntax once.
2. `CALL calcTotal('Staples')` → MySQL fetches recipe, fills `cat='Staples'`, runs `SELECT ... WHERE category = 'Staples'`.

### 3 Must-Know Terms
1. **Procedure**: stored recipe
2. **DELIMITER**: command delimiter
3. **CALL**: call recipe

---

## Experiments

- **Green:** `CALL calcTotal('Protein')` → Protein category total?
- **Yellow:** Build parameterless `lowStock()`: `SELECT * FROM products WHERE stock < 5` → `CALL lowStock()`?
- **Red:** Forget `DELIMITER //` → `syntax` error at first `;`? Add delimiter.

---

### Bonus: TRIGGER — Automatic Alarm (used in W10 capstone!)

Procedures run manually (`CALL`). Triggers run THEMSELVES on every INSERT/UPDATE/DELETE:

```sql
-- Log table first (automatic note per order!)
CREATE TABLE IF NOT EXISTS order_log (
  id INT AUTO_INCREMENT PRIMARY KEY,
  note VARCHAR(100)
);

DELIMITER //
CREATE TRIGGER log_sale AFTER INSERT ON orders
FOR EACH ROW
BEGIN
  INSERT INTO order_log (note)
  VALUES (CONCAT('Order ', NEW.id, ' total ', NEW.total));
END //
DELIMITER ;
-- Try: INSERT INTO orders (customer_id, total) VALUES (1, 9000);
-- → SELECT * FROM order_log; (note appears AUTOMATICALLY!)
-- NEW. = new row, OLD. = old row (for UPDATE/DELETE).
SHOW TRIGGERS;
DROP TRIGGER IF EXISTS log_sale;
```

---

## Challenge

**Complete Shop Recipes:** Build `discountCategory(IN cat VARCHAR(50), IN pct INT)` that `UPDATE products SET price = price * (1 - pct/100) WHERE category = cat` → `CALL discountCategory('Veggies', 10)` → `SELECT` verifies 10% drop.

---

## Mini Glossary

- **PROCEDURE/CALL/DROP**: store/call/remove recipe
- **DELIMITER/IN**: delimiter/ingredient

---

## Summary

Week 5 of 5: **Warehouse Recipes** (Level: Beginner). **Beginner MySQL DONE!** Next: **Advanced Query** (Intermediate).
