# PDO Database — Real PHP Warehouse Driver

> **Kategori:** PHP | **Level:** Intermediate | **Minggu 8:** PDO & Database

## Learning Objectives

- `new PDO("mysql:host=...;dbname=shop", "root", "")` connects + `ERRMODE_EXCEPTION` (source: php.net/pdo)
- `query()` for fixed, `prepare()` + `execute()` for user input, `fetchAll()` fetches

---

## Why This Matters (Non-IT)

Array simulations vanish on restart. Real PDO + MySQL = durable data + millions of rows. 1 PDO driver serves MySQL/Postgres/SQLite (just swap DSN).

---

## Program: Real PDO Warehouse

```php
<?php
try {
  $pdo = new PDO(
    "mysql:host=localhost;dbname=shop;charset=utf8mb4",
    "root", "",
    [PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION] // errors explode!
  );
} catch (PDOException $e) {
  die("Connect failed: " . $e->getMessage());
}

// Fixed (no user input): direct query
foreach ($pdo->query("SELECT name, price FROM products WHERE stock > 5") as $row) {
  echo $row["name"] . " Rp" . $row["price"] . "\n";
}

// User input: MUST prepare!
$find = $_GET["find"] ?? "";
$stmt = $pdo->prepare("SELECT * FROM products WHERE name LIKE ?");
$stmt->execute(["%$find%"]);
$results = $stmt->fetchAll(PDO::FETCH_ASSOC);
echo "Found: " . count($results) . "\n";

// Write
$ins = $pdo->prepare("INSERT INTO products (name, price, stock) VALUES (?, ?, ?)");
$ins->execute(["Coffee", 12000, 7]);
echo "New ID: " . $pdo->lastInsertId() . "\n";
?>
```

---

## Key Concepts

### `new PDO(dsn, user, pass)` = Connect Warehouse
`mysql:host=...;dbname=...` address. `ERRMODE_EXCEPTION` makes errors explode (never silent!).

### `query()` vs `prepare()` = Fixed vs Has-Guests
Fixed → `query`. User input present → `prepare` + `?`.

### `fetchAll()` / `lastInsertId()` = Fetch All / New ID

---

## Beginner Friendly Explanation

### Analogy: Warehouse Driver
- **PDO = driver**: 1 driver reaches MySQL/Postgres warehouses (swap address).
- **prepare = official waybill**: goods (data) inspected, no smuggling.

### Step 0 — Prepare Device
- Running MySQL + `shop` DB + `products` table (W1 MySQL) + `php -m | grep -i pdo` lists `pdo_mysql`.

### How the Computer Reads It
1. `new PDO(...)` → TCP-connects to MySQL.
2. `prepare` → MySQL compiles → `execute` sends data separately.

### 3 Must-Know Terms
1. **DSN/PDO**: address/driver
2. **prepare/fetchAll**: safe/fetch

---

## Experiments

- **Green:** Wrong password → clear `PDOException` message?
- **Yellow:** `query("SELECT ... $find ...")` glued + `find = '" OR 1=1'` → leaks? Switch to prepare.
- **Red:** Forget `ERRMODE_EXCEPTION` → silent failure (false)? Attach it.

---

## Challenge

**Complete PDO Warehouse:** `list.php` (`query` + `find` prepare) + `add.php` (`prepare` INSERT) + `delete.php` (`prepare` DELETE) + failed SQL-injection attempt.

---

## Mini Glossary

- **PDO/DSN/prepare**: driver/address/safe

---

## Summary

Week 8 of 12: **Real Warehouse Driver** (Level: Intermediate). Million-row durable data. Next: **Composer** — tool warehouse.
