# PDO & Database

> **Kategori:** PHP | **Level:** Intermediate | **Minggu 8:** PDO & Database

## Learning Objectives

- PDO: PHP Data Object for universal database access
- Connection: DSN string, username, password, options
- Prepared Statements: prepare, bindParam, execute
- CRUD Operations: SELECT, INSERT, UPDATE, DELETE
- Error handling: PDO::ERRMODE_EXCEPTION and try-catch

---

## Program: Database CRUD

```php
<?php
echo "=== PDO Database Simulation ===<br><br>";

$users = [
    ["id" => 1, "nama" => "Budi", "email" => "budi@example.com"],
    ["id" => 2, "nama" => "Siti", "email" => "siti@example.com"],
    ["id" => 3, "nama" => "Andi", "email" => "andi@example.com"],
];

echo "SELECT * FROM users<br>";
foreach ($users as $user) {
    echo "  {$user['id']}: {$user['nama']} ({$user['email']})<br>";
}

echo "<br>SELECT WHERE id = 1<br>";
$found = null;
foreach ($users as $u) {
    if ($u['id'] == 1) { $found = $u; break; }
}
echo "  Found: {$found['nama']}<br>";

echo "<br>INSERT INTO users<br>";
$newId = max(array_column($users, 'id')) + 1;
$users[] = ["id" => $newId, "nama" => "Dewi", "email" => "dewi@example.com"];
echo "  Added: Dewi (id: $newId)<br>";

echo "<br>UPDATE users SET nama WHERE id = 2<br>";
foreach ($users as &$u) {
    if ($u['id'] == 2) { $u['nama'] = "Siti Updated"; break; }
}
echo "  Updated: id=2 nama=Siti Updated<br>";

echo "<br>DELETE FROM users WHERE id = 3<br>";
$users = array_filter($users, fn($u) => $u['id'] != 3);
$users = array_values($users);
echo "  Remaining: " . count($users) . " users<br><br>";

echo "=== PDO Connection String ===<br>";
$dsn = "mysql:host=localhost;dbname=myapp;charset=utf8mb4";
echo "DSN: $dsn<br>";
echo "Options: PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION<br>";
echo "Options: PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC<br>";
>
```

---

## Key Concepts

### PDO Connection
`new PDO($dsn, $user, $pass, $options)`. DSN: `mysql:host=localhost;dbname=test`.

### Prepared Statements
`$pdo->prepare()` with named params. `bindParam()` to bind.

### CRUD
`query()` for SELECT, `exec()` for INSERT/UPDATE/DELETE.

### Error Mode
`PDO::ERRMODE_EXCEPTION` throws exceptions on errors.

---

## Experiments

- Create Database wrapper class for PDO
- Try fetchAll() vs fetch() per row
- Implement transactions with beginTransaction
- Create pagination with LIMIT and OFFSET
- Use PDO::FETCH_CLASS to map to objects

---

## Challenge

Build a complete CRUD app: users table with PDO, prepared statements, pagination, search, and error handling.

---

## Summary

Week 8 of 12: **PDO & Database** (Level: Intermediate). Database is the application backbone. Next week: **Composer & Autoloading**.
