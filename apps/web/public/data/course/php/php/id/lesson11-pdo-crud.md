# PDO & CRUD Database

> PHP | Pelajaran 11

## Tujuan Pembelajaran

- Menghubungkan ke database SQLite menggunakan PDO\n- Membuat tabel dengan SQL CREATE TABLE\n- Menyisipkan data dengan prepared statements (aman dari SQL injection)\n- Membaca data dengan SELECT dan fetchAll

---

## Program: PDO & CRUD Database

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

## Penjelasan

## PDO: PHP Data Objects
PDO adalah abstraction layer untuk database — sama untuk MySQL, PostgreSQL, SQLite. Ganti DSN saja (mis. "mysql:host=localhost;dbname=tryngo") tanpa ubah kode PHP.
## Connection & Error Mode
new PDO($dsn, $user, $pass) — buat koneksi. setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION) — buat PDO melempar exception saat error (bukan silent fail). Tanpa ini, error PDO tidak terlihat.
## Prepared Statements
$pdo->prepare("INSERT INTO tugas (judul) VALUES (:judul)") — prepare statement. execute(["judul" => $judul]) — bind parameter. Prepared statements mencegah SQL injection: input user dimasukkan sebagai data, bukan bagian dari SQL string.
## Fetch Modes
fetchAll(PDO::FETCH_ASSOC) = array asosiatif (key = nama kolom). fetch() = satu baris. fetchColumn() = satu nilai. PDO::FETCH_CLASS = map ke object kelas.

---

## Eksperimen

1. **## PDO: PHP Data Objects
PDO adalah abstraction layer untuk database — sama untuk MySQL, PostgreSQL, SQLite. Ganti DSN saja (mis. "mysql:host=localhost;dbname=tryngo") tanpa ubah kode PHP.
## Connection & Error Mode
new PDO($dsn, $user, $pass) — buat koneksi. setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION) — buat PDO melempar exception saat error (bukan silent fail). Tanpa ini, error PDO tidak terlihat.
## Prepared Statements
$pdo->prepare("INSERT INTO tugas (judul) VALUES (:judul)") — prepare statement. execute(["judul" => $judul]) — bind parameter. Prepared statements mencegah SQL injection: input user dimasukkan sebagai data, bukan bagian dari SQL string.
## Fetch Modes
fetchAll(PDO::FETCH_ASSOC) = array asosiatif (key = nama kolom). fetch() = satu baris. fetchColumn() = satu nilai. PDO::FETCH_CLASS = map ke object kelas.**

---

## Tantangan

Kembangkan PDO CRUD: (1) tambah fungsi updateTugas($id, $judul) dan hapusTugas($id) dengan prepared statement, (2) tambah kolom prioritas (enum: rendah, sedang, tinggi) dan query filter berdasarkan prioritas, (3) buat pagination: SELECT * FROM tugas LIMIT 10 OFFSET $offset, (4) tambah transaksi: $pdo->beginTransaction() → beberapa insert → $pdo->commit() atau $pdo->rollBack() jika gagal.

---

## Ringkasan

PDO = abstraction database. Prepared statement = aman dari SQL injection. Fetch mode = bentuk data. Lanjut: keamanan.
