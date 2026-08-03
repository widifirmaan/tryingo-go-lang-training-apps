# Composer & Autoloading

> PHP | Pelajaran 13

## Tujuan Pembelajaran

- Memahami autoloading PSR-4 dan struktur direktori\n- Menggunakan namespace dan use statement\n- Membuat class yang otomatis dimuat oleh Composer\n- Membedakan autoload (runtime) dan require manual

---

## Program: Composer & Autoloading

```php
<?php

require_once __DIR__ . "/vendor/autoload.php";

use App\Models\Task;
use App\Services\Logger;

$task = new Task("Belajar Composer", "Pelajari autoloading PSR-4");
$task->complete();

Logger::info("Task diselesaikan: " . $task->getJudul());

```

---

## Penjelasan

## PSR-4: Standar Autoloading
Namespace App\Models memetakan ke direktori src/Models/. Composer menggunakan aturan: ganti \ dengan /, tambahkan .php. Jadi App\Models\Task → src/Models/Task.php. Tanpa autoload: manual require untuk setiap file — tidak scalable.
## composer.json Autoload
"autoload": { "psr-4": { "App\": "src/" } } — mendefinisikan mapping namespace ke direktori. Setelah edit composer.json, jalankan composer dump-autoload untuk memperbarui mapping.
## Namespace & Use
namespace App\Models; — deklarasi namespace di awal file. use App\Models\Task; — import class agar bisa dipakai tanpa prefix lengkap. Tanpa use: new \App\Models\Task(...) — fully qualified name.
## Static Method
Logger::info() — memanggil method statis tanpa membuat instance. Cocok untuk utility class (Logger, Validator, Helper). Tidak perlu $this karena tidak ada state instance.

---

## Eksperimen

1. **## PSR-4: Standar Autoloading
Namespace App\Models memetakan ke direktori src/Models/. Composer menggunakan aturan: ganti \ dengan /, tambahkan .php. Jadi App\Models\Task → src/Models/Task.php. Tanpa autoload: manual require untuk setiap file — tidak scalable.
## composer.json Autoload
"autoload": { "psr-4": { "App\": "src/" } } — mendefinisikan mapping namespace ke direktori. Setelah edit composer.json, jalankan composer dump-autoload untuk memperbarui mapping.
## Namespace & Use
namespace App\Models; — deklarasi namespace di awal file. use App\Models\Task; — import class agar bisa dipakai tanpa prefix lengkap. Tanpa use: new \App\Models\Task(...) — fully qualified name.
## Static Method
Logger::info() — memanggil method statis tanpa membuat instance. Cocok untuk utility class (Logger, Validator, Helper). Tidak perlu $this karena tidak ada state instance.**

---

## Tantangan

Kembangkan Composer: (1) tambah dependency fakerphp/faker di composer.json dan gunakan di seeder untuk membuat 10 tugas dummy, (2) buat script CLI custom di composer.json (scripts.post-install-cmd) yang menjalankan migration otomatis, (3) buat class App\Services\Database yang menggunakan singleton pattern (private static $instance), (4) tulis README tentang perbedaan autoload (runtime) vs compile (opcache).

---

## Ringkasan

Composer = autoload dependency. PSR-4 = namespace ke direktori. use = import class. static = tanpa instance. Lanjut: PHP 8.
