# PDO & Database

> **Kategori:** PHP | **Level:** Menengah | **Minggu 8:** PDO & Database

## Tujuan Pembelajaran

- PDO: PHP Data Object untuk akses database universal
- Connection: DSN string, username, password, options
- Prepared Statements: prepare, bindParam, execute
- CRUD Operations: SELECT, INSERT, UPDATE, DELETE
- Error handling: PDO::ERRMODE_EXCEPTION dan try-catch

---

## Program: CRUD Database

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

## Konsep Kunci

### PDO Connection
`new PDO($dsn, $user, $pass, $options)`. DSN: `mysql:host=localhost;dbname=test`.

### Prepared Statements
`$stmt = $pdo->prepare("SELECT * FROM u WHERE id = :id")`. Bind: `->bindParam(':id', $id)`.

### CRUD
`query()` untuk SELECT, `exec()` untuk INSERT/UPDATE/DELETE. `fetch()` untuk result.

### Error Mode
`PDO::ERRMODE_EXCEPTION` untuk throw exception saat error.

---

## Eksperimen

- Buat class Database wrapper untuk PDO
- Coba fetchAll() vs fetch() per row
- Implementasikan transaction dengan beginTransaction
- Buat pagination dengan LIMIT dan OFFSET
- Gunakan PDO::FETCH_CLASS untuk map ke object

---

## Tantangan

Buat CRUD app lengkap: users table dengan PDO, prepared statements, pagination, search, dan error handling.

---

## Ringkasan

Minggu 8 dari 12: **PDO & Database** (Level: Menengah). Database adalah backbone aplikasi. Minggu depan: **Composer & Autoloading**.
