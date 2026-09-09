# Security — Locking the MySQL Warehouse

> **Kategori:** MySQL | **Level:** Intermediate | **Minggu 9:** Keamanan & User Management
> **Prerequisites:** Week 8 — **Replication**.

## Learning Objectives

- `CREATE USER 'cashier'@'localhost' IDENTIFIED BY '...'`, `GRANT SELECT, INSERT ON shop.products` just-enough (source: dev.mysql.com/doc/refman/8.0/en/privileges)
- Never root for apps! `REVOKE` removes, `mysql_secure_installation` first

---

## Why This Matters (Non-IT)

Apps on `root` + SQL injection → hackers `DROP DATABASE` (root can do everything!). With a `cashier` user (only SELECT/INSERT products), even breached can't delete. 90% of breaches = weak passwords + root.

---

## Program: Lock MySQL Shop

```sql
-- 1. Secure first (answer Y to all!)
-- mysql_secure_installation

-- 2. Just-enough users (least-privilege principle!)
CREATE USER 'cashier'@'localhost' IDENTIFIED BY 'Cashier#2026!';
GRANT SELECT, INSERT ON shop.products TO 'cashier'@'localhost';

CREATE USER 'reporter'@'%' IDENTIFIED BY 'Reporter#2026!';
GRANT SELECT ON shop.* TO 'reporter'@'%';

-- 3. Revoke when needed
REVOKE INSERT ON shop.products FROM 'cashier'@'localhost';
DROP USER 'reporter'@'%';

-- 4. Check who can do what
SHOW GRANTS FOR 'cashier'@'localhost';

-- 5. Test: log in as cashier
-- mysql -u cashier -p
-- DROP TABLE products;  → ERROR 1142 (rejected! good)
-- SELECT * FROM products; → works
```

---

## Key Concepts

### `GRANT ... ON db.table` = Room Keys
`SELECT, INSERT ON shop.products` — only 2 actions, 1 table. Not `ALL`!

### Never `root` for Apps
`root` for human emergencies only. Apps = dedicated just-enough users.

### `mysql_secure_installation` = First Lock
Removes anonymous, disables remote root, drops test DB.

---

## Beginner Friendly Explanation

### Analogy: Boarding-House Keys
- **root = master key**: held by owner.
- **cashier = room key**: opens its room only.
- **GRANT = locksmith**: carves just enough.

### Step 0 — Prepare Device
- Local MySQL + initial root access.

### How the Computer Reads It
1. `cashier` login → MySQL checks `mysql.user` + `db` privileges.
2. `DROP` → no privilege → `ERROR 1142`.

### 3 Must-Know Terms
1. **GRANT/REVOKE**: give/take
2. **Least privilege**: just-enough

---

## Experiments

- **Green:** `SHOW GRANTS` for cashier → only 2?
- **Yellow:** `GRANT ALL` to `trial` → can DROP? (Not in production!) `REVOKE` + `DROP USER`.
- **Red:** Password `123` → cracked in 1 second? Change to 12+ random.

---

### Bonus: Backup & Restore (locks + copies = truly safe!)

```bash
mysqldump -u root -p shop > backup.sql       # BACK UP (all SQL text!)
mysql -u root -p shop_new < backup.sql      # RESTORE into new DB
```
- Mandatory drill: backup → `DROP DATABASE shop;` → create fresh → restore → data back! Without this, strong locks still lose everything to fire.

---

## Challenge

**Locked Warehouse:** 3 users (`cashier` SELECT/INSERT products, `reporter` SELECT all, `admin` ALL) + prove `cashier` DROP rejected + `SHOW GRANTS` 3 screenshots.

---

## Mini Glossary

- **GRANT/REVOKE/privilege**: give/take/permit

---

## Summary

Week 9 of 10: **Warehouse Lock** (Level: Intermediate). Just-enough. Next: **Capstone**.
