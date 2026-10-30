# Setup & Instalasi Laravel

> **Kategori:** Laravel | **Level:** Pemula | **Minggu 1:** Setup & Instalasi Laravel

## Tujuan Pembelajaran

- Install Laravel via Composer (Laravel Docs: Installation)
- Memahami struktur folder Laravel: app, routes, resources, database
- Artisan CLI: serve, make:controller, make:model, migrate
- File .env untuk environment configuration
- Routes: routes/web.php dan routes/api.php


## Fondasi: Sebelum Menulis Kode

Bagian ini untuk Anda yang **benar-benar baru** belajar coding. Konsepnya sama di semua bahasa — dibutuhkan sekali paham, dipakai selamanya.

- **File & folder = tempat program tinggal.** Program hanyalah teks biasa yang disimpan dalam file (contoh: `belajar.md`). File punya **ekstensi** yang menunjukkan bahasanya: `.md`, `.go`, `.py`, `.html`. Satu folder berisi semua file program disebut **project**.
- **Terminal / command line.** Jendela hitam tempat kita mengetik perintah teks: `cd folder` (pindah folder), `ls` / `dir` (lihat isi folder), `go run main.go` (jalankan program). Program dijalankan dari folder tempat file-nya berada.
- **Compiled vs interpreted.** Bahasa **compiled** (Go, Rust, C#) diterjemahkan dulu seluruh program menjadi instruksi mesin sebelum jalan — cepat, tapi harus "di-build" dulu. Bahasa **interpreted** (Python, PHP, JavaScript) dieksekusi baris per baris langsung — cocok untuk belajar & prototipe cepat. Playground di website ini mengeksekusi kode **di browser**, jadi Anda bisa mencoba materi tanpa install apa pun.
- **Statically typed vs dynamically typed.** Bahasa **statically typed** (Go, Rust, TypeScript) mewajibkan/mengecek tipe data (angka, teks) saat ditulis — error tertangkap lebih awal. Bahasa **dynamically typed** (Python, PHP, JavaScript) cek tipe saat program berjalan — lebih longgar, error baru muncul saat runtime.
- **Cara membaca pesan error.** Baca baris paling bawah dulu: jenis error + penjelasan singkatnya, lalu cari **nomor baris** yang disebut. Error bukan tragis — itulah cara komputer memberi tahu ada yang perlu diperbaiki.
- **REPL / playground.** REPL (Read-Eval-Print Loop) = "kalkulator" kode: ketik satu baris, langsung terlihat hasilnya. Tombol **Coba di Playground** di setiap blok kode memungkinkan Anda mengubah kode dan menjalankannya langsung — inilah cara tercepat belajar: ubah sedikit, jalankan, lihat bedanya.

> **Catatan penting:** playground di browser memiliki batasan — tidak menerima input keyboard interaktif (stdin). Jika sebuah tantangan meminta "input dari pengguna", cukup tulis nilainya langsung ke variabel (contoh: `let nama = "Budi"`; `rupiah = 250000`), lalu jalankan.

---

---

## Panduan Mulai Cepat (Quick Start): Setup & Inisialisasi Project

Sebelum mulai mendalami materi dan praktik kode di bawah, siapkan lingkungan pengembangan lokal Anda di komputer dengan langkah-langkah praktis berikut:

### 1. Instalasi Runtime & Dependency (PHP 8.2+ & Composer)
Pastikan runtime atau SDK telah terpasang di sistem operasi Anda:

**Windows (PowerShell):**
```powershell
winget install PHP.PHP.8.3 && winget install Composer.Composer
```

**macOS (Terminal / Homebrew):**
```bash
brew install php composer
```

**Linux (Ubuntu/Debian / bash):**
```bash
sudo apt install -y php8.3-cli php8.3-curl php8.3-mbstring php8.3-xml composer
```

**Verifikasi Instalasi:**
Jalankan perintah berikut di terminal:
```bash
php -v && composer -v
```

Output yang diharapkan:
```output
PHP 8.x
Composer 2.x
```

> 💡 **Tips Prasyarat:** Laravel membutuhkan ekstensi php-curl, php-mbstring, dan php-xml aktif.

---

### 2. Inisialisasi Project Kosong (Scaffolding)
Buat folder dan kerangka awal project baru dengan perintah resmi:

```bash
composer create-project laravel/laravel my-laravel-app
cd my-laravel-app
```
- **Keterangan:** Men-download skeleton resmi Laravel, men-generate application key, dan menyiapkan file .env.
- **Pindah ke direktori project:**
```bash
cd my-laravel-app
```

---

### 3. Menjalankan Server Lokal & File Titik Masuk Pertama
Jalankan server pengembangan lokal:

```bash
php artisan serve
```
Akses di browser atau terminal: `http://127.0.0.1:8000`

> ℹ️ Server Laravel development aktif di port 8000.

**File Titik Masuk Utama (`routes/web.php`):**
```php
<?php

use Illuminate\Support\Facades\Route;

Route::get('/', function () {
    return response()->json([
        'framework' => 'Laravel ' . app()->version(),
        'status' => 'active',
        'message' => 'Selamat datang di aplikasi Laravel pertama Anda!'
    ]);
});
```
Route closure sederhana yang mengembalikan respon JSON.

---

### 4. Struktur Direktori Proyek Baru
Struktur folder dan file standar yang dihasilkan:

```text
my-laravel-app/
├── app/
│   ├── Http/Controllers/
│   └── Models/          # Model Eloquent ORM
├── routes/
│   ├── web.php          # Route tampilan web
│   └── api.php          # Route REST API
├── database/
│   └── migrations/      # Skema database terkelola
├── resources/views/     # Template Blade (.blade.php)
├── .env                 # Konfigurasi database & environment
└── artisan              # CLI tool pembantu Laravel
```
Arsitektur MVC (Model-View-Controller) Laravel yang sangat terstruktur.

---

### 5. Tips & Best Practice untuk Pemula
- Gunakan `php artisan make:model Product -mcr` untuk membuat Model, Migration, dan Controller Resource sekaligus.
- Jalankan `php artisan migrate` untuk mengeksekusi seluruh migrasi database yang tertunda.

---

## Program: Project Pertama

```php
<?php
// Terminal commands (simulated output)
echo "=== Laravel Setup ===<br>";
echo "composer create-project laravel/laravel my-app<br>";
echo "cd my-app<br>";
echo "php artisan serve<br>";
echo "Server running on http://localhost:8000<br><br>";

// Directory structure
echo "=== Laravel Directory Structure ===<br>";
$dirs = [
    "app/",
    "  Console/Commands/",
    "  Http/Controllers/",
    "  Http/Middleware/",
    "  Models/",
    "  Providers/",
    "bootstrap/",
    "config/",
    "database/migrations/",
    "database/seeders/",
    "public/",
    "resources/views/",
    "routes/",
    "storage/",
    "tests/",
];
foreach ($dirs as $dir) {
    echo "  $dir<br>";
}

echo "<br>=== Key Files ===<br>";
echo "routes/web.php — Web routes<br>";
echo "app/Http/Controllers/ — Controllers<br>";
echo "app/Models/ — Eloquent models<br>";
echo "resources/views/ — Blade templates<br>";
echo "database/migrations/ — Database schema<br>";
echo ".env — Environment config<br>";

echo "<br>=== artisan Commands ===<br>";
echo "php artisan serve — Start dev server<br>";
echo "php artisan make:controller Name — Create controller<br>";
echo "php artisan make:model Name — Create model<br>";
echo "php artisan migrate — Run migrations<br>";
echo "php artisan route:list — Show all routes<br>";
>
```

---

## Konsep Kunci

### Instalasi Laravel
`composer create-project laravel/laravel nama-project`. Alternatif: `laravel new`.

### Struktur Folder
- `app/` — Business logic (Controllers, Models, Middleware)
- `routes/` — Route definitions
- `resources/views/` — Blade templates
- `database/migrations/` — Schema versioning
- `public/` — Entry point (index.php)

### Artisan CLI
Command-line tool untuk scaffolding, migration, testing, dan banyak lagi.

### Routes
`routes/web.php` untuk web pages, `routes/api.php` untuk API.

---

## Eksperimen

- Buat project baru dengan laravel new
- Jelajahi setiap folder dan lihat isinya
- Coba artisan list untuk semua commands
- Buat route sederhana di web.php
- Pindah ke config/ dan lihat file konfigurasi

---

## Tantangan

Buat project Laravel baru dengan 3 routes: home (/), about (/about), contact (/contact). Tampilkan teks berbeda di setiap route.

---

## Ringkasan

Minggu 1 dari 12: **Setup & Instalasi Laravel** (Level: Pemula). Fondasi Laravel dimulai. Minggu depan: **Routing & Controllers**.
