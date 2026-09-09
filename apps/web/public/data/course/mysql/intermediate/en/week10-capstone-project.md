# Capstone: E-Commerce Database — Shop Warehouse Grand Opening

> **Kategori:** MySQL | **Level:** Intermediate | **Minggu 10:** Capstone: E-Commerce Database
> **Prerequisites:** Week 9 — **Security**.

## Learning Objectives

- Combine W1-W9: `AUTO_INCREMENT` + `FK` + `INDEX` + `TRANSACTION` + `VIEW` + `TRIGGER` into a production online-store warehouse

---

## Why This Matters (Non-IT)

9 separate weeks — capstone proves the combination: a warehouse that's fast (index), safe (transactions + users), monitored. Your "production-ready MySQL" portfolio.

---

## Program: Complete Store Warehouse (Checklist)

```sql
-- 1. Racks + ropes (W1-W3)
CREATE TABLE categories (id INT AUTO_INCREMENT PRIMARY KEY, name VARCHAR(50)) ENGINE=InnoDB;
CREATE TABLE products (
  id INT AUTO_INCREMENT PRIMARY KEY,
  category_id INT,
  name VARCHAR(100) NOT NULL,
  price INT NOT NULL CHECK (price > 0),
  stock INT DEFAULT 0,
  FOREIGN KEY (category_id) REFERENCES categories(id)
) ENGINE=InnoDB;

-- 2. Indexes (W4+W7)
CREATE INDEX idx_category ON products(category_id);
CREATE INDEX idx_name ON products(name);

-- 3. Just-enough users (W9)
CREATE USER 'cashier'@'localhost' IDENTIFIED BY 'Cashier#2026!';
GRANT SELECT, INSERT, UPDATE ON shop.products TO 'cashier'@'localhost';

-- 4. Readable report VIEW
CREATE VIEW report AS
SELECT k.name AS category, COUNT(*) AS cnt, SUM(p.price * p.stock) AS value
FROM products p JOIN categories k ON p.category_id = k.id
GROUP BY k.name;

-- 5. Safe sell transaction (W6)
START TRANSACTION;
UPDATE products SET stock = stock - 2 WHERE id = 1 AND stock >= 2;
INSERT INTO orders (product_id, qty) VALUES (1, 2);
COMMIT;

-- 6. Fast check (W7)
EXPLAIN SELECT * FROM products WHERE category_id = 1;
```

**Capstone task:** Complete `shop.sql` file + `mysqldump` backup + `EXPLAIN` 3 queries (`ref`, not `ALL`) + `SHOW GRANTS` screenshot.

---

## Key Concepts

### Capstone = Combine 9 Weeks
Racks + ropes + indexes + transactions + users + views = production.

---

## Beginner Friendly Explanation

### Analogy: Warehouse Grand Opening
- **W1-W4 foundation** + **W6-W9 engine** = warehouse. **W10 = open**.

### Step 0 — Prepare Device
- `db-fiddle.com` or local MySQL + `mysqldump` available.

### How the Computer Reads It
1. `shop.sql` runs top-to-bottom → full warehouse built.
2. `mysqldump shop > backup.sql` → restorable copy.

### 3 Must-Know Terms
1. **VIEW/mysqldump**: window/backup

---

## Experiments

- **Green:** `SELECT * FROM report` → per-category counts + values?
- **Yellow:** Restore `backup.sql` into empty DB → same data?
- **Red:** Sell without `WHERE stock >= 2` → negative stock? Add guard.

---

## Challenge

**Grand Opening:** All checklist + `mysqldump shop > backup.sql` + drop DB + `restore` from backup + data back! **MySQL 0→Expert DONE!** 🎉

---
- **Integration checklist:** **MySQL Basics** (Week 1) + **CRUD & Query** (Week 2) + **JOIN & Relations** (Week 3) + **Index & Optimization** (Week 4) + **Stored Procedure** (Week 5) + **Transactions & ACID** (Week 6) + **Performance & Tuning** (Week 7) + **Replication** (Week 8) + **Security** (Week 9) → all parts above run together at the grand opening.
## Mini Glossary

- **VIEW/mysqldump**: window/backup

---

## Summary

Week 10 of 10: **Grand Opening** (Level: Intermediate). **MySQL 0→Expert from zero DONE!** 🎉
