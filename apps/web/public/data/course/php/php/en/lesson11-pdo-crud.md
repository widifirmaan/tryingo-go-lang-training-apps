# PDO & Database CRUD

> PHP | Lesson 11

## Learning Objectives

- Connect to a SQLite database using PDO\n- Create a table with SQL CREATE TABLE\n- Insert data with prepared statements (safe from SQL injection)\n- Read data with SELECT and fetchAll

---

## Program: PDO & Database CRUD

```php
<?php

try {
    $pdo = new PDO("sqlite:" . __DIR__ . "/app.db");
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

    $pdo->exec("CREATE TABLE IF NOT EXISTS tugas (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        judul TEXT NOT NULL,
        selesai BOOLEAN DEFAULT 0,
        dibuat_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    )");

    $stmt = $pdo->prepare("INSERT INTO tugas (judul) VALUES (:judul)");
    $stmt->execute(["judul" => "Belajar PHP PDO"]);

    $stmt = $pdo->query("SELECT * FROM tugas ORDER BY id DESC");
    $semua = $stmt->fetchAll(PDO::FETCH_ASSOC);

    echo "Tugas:\n";
    foreach ($semua as $t) {
        $status = $t["selesai"] ? "✓" : "○";
        echo "{$status} [{$t["id"]}] {$t["judul"]}\n";
    }
} catch (PDOException $e) {
    echo "Database error: " . $e->getMessage() . "\n";
}

```

---

## Explanation

## PDO: PHP Data Objects
PDO is an abstraction layer for databases — works the same for MySQL, PostgreSQL, SQLite. Just change the DSN (e.g., "mysql:host=localhost;dbname=tryngo") without changing PHP code.
## Connection & Error Mode
new PDO($dsn, $user, $pass) — create a connection. setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION) — make PDO throw exceptions on errors (not silent fail). Without this, PDO errors are invisible.
## Prepared Statements
$pdo->prepare("INSERT INTO tugas (judul) VALUES (:judul)") — prepare statement. execute(["judul" => $judul]) — bind parameters. Prepared statements prevent SQL injection: user input is treated as data, not part of the SQL string.
## Fetch Modes
fetchAll(PDO::FETCH_ASSOC) = associative array (key = column name). fetch() = one row. fetchColumn() = one value. PDO::FETCH_CLASS = map to a class object.

---

## Experiments

1. **## PDO: PHP Data Objects
PDO is an abstraction layer for databases — works the same for MySQL, PostgreSQL, SQLite. Just change the DSN (e.g., "mysql:host=localhost;dbname=tryngo") without changing PHP code.
## Connection & Error Mode
new PDO($dsn, $user, $pass) — create a connection. setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION) — make PDO throw exceptions on errors (not silent fail). Without this, PDO errors are invisible.
## Prepared Statements
$pdo->prepare("INSERT INTO tugas (judul) VALUES (:judul)") — prepare statement. execute(["judul" => $judul]) — bind parameters. Prepared statements prevent SQL injection: user input is treated as data, not part of the SQL string.
## Fetch Modes
fetchAll(PDO::FETCH_ASSOC) = associative array (key = column name). fetch() = one row. fetchColumn() = one value. PDO::FETCH_CLASS = map to a class object.**

---

## Challenge

Expand PDO CRUD: (1) add updateTugas($id, $judul) and deleteTugas($id) functions with prepared statements, (2) add a priority column (enum: low, medium, high) and filter query by priority, (3) build pagination: SELECT * FROM tugas LIMIT 10 OFFSET $offset, (4) add transactions: $pdo->beginTransaction() → multiple inserts → $pdo->commit() or $pdo->rollBack() on failure.

---

## Summary

PDO = database abstraction. Prepared statements = safe from SQL injection. Fetch mode = data shape. Next: security.
