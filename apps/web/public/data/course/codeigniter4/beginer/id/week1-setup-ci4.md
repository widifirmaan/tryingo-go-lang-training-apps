# Setup & Instalasi CI4

> **Kategori:** CodeIgniter 4 | **Level:** Pemula | **Minggu 1:** Setup & Instalasi CI4

## Kenapa Materi Ini Penting

CodeIgniter 4 adalah framework PHP yang ringan dan cepat, favorit untuk aplikasi instansi, sekolah, dan startup kecil di Indonesia. Menulis kode PHP murni dulu lalu CI4 membuat Anda paham apa yang framework "kerjakan diam-diam".

Di minggu ke-1 — bertajuk **"Setup & Instalasi CI4"** — program latihan utamanya adalah *"Project Pertama"*. Kerjakan programnya di Playground dulu, ubah sedikit demi sedikit, lalu baca penjelasan konsepnya.


## Tujuan Pembelajaran

- Install CodeIgniter 4 via Composer (CI4 Docs: Installation)
- Memahami struktur folder CI4: app, public, writable, tests
- Spark CLI: serve, make:controller, make:model, migrate
- File .env untuk environment configuration
- Namespace: App\Controllers, App\Models


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

> **⚡ Coba dulu di browser — tanpa install!** Semua blok kode di materi ini punya tombol **Coba di Playground** dan bisa langsung dijalankan di tab ini. Langkah instalasi lokal di bawah ini opsional — lakukan nanti saat Anda sudah siap ngoding di editor sendiri (VS Code/IDE) atau mengerjakan proyek nyata.

Sebelum mulai mendalami materi dan praktik kode di bawah, siapkan lingkungan pengembangan lokal Anda di komputer dengan langkah-langkah praktis berikut:

### 1. Instalasi Runtime & Dependency (PHP 8.1+ & Composer)
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
sudo apt install -y php-cli php-intl composer
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

> 💡 **Tips Prasyarat:** Pastikan ekstensi php-intl dan php-mbstring aktif di php.ini.

---

### 2. Inisialisasi Project Kosong (Scaffolding)
Buat folder dan kerangka awal project baru dengan perintah resmi:

```bash
composer create-project codeigniter4/appstarter my-ci4-app
cd my-ci4-app
```
- **Keterangan:** Mengunduh starter resmi CodeIgniter 4 dengan struktur direktori siap pakai.
- **Pindah ke direktori project:**
```bash
cd my-ci4-app
```

---

### 3. Menjalankan Server Lokal & File Titik Masuk Pertama
Jalankan server pengembangan lokal:

```bash
php spark serve
```
Akses di browser atau terminal: `http://localhost:8080`

> ℹ️ Server CodeIgniter Spark aktif di port 8080.

**File Titik Masuk Utama (`app/Controllers/Home.php`):**
```php
<?php

namespace App\Controllers;

class Home extends BaseController
{
    public function index(): string
    {
        return $this->response->setJSON([
            'framework' => 'CodeIgniter 4',
            'status' => 'running',
            'message' => 'Halo dari CodeIgniter 4 Spark!'
        ]);
    }
}
```
Controller default CodeIgniter 4 mengembalikan JSON.

---

### 4. Struktur Direktori Proyek Baru
Struktur folder dan file standar yang dihasilkan:

```text
my-ci4-app/
├── app/
│   ├── Controllers/     # Controller logika HTTP
│   ├── Models/          # Model query database
│   └── Views/           # Template tampilan HTML
├── public/              # Document root web server
├── spark                # Script CLI CodeIgniter
└── env                  # File contoh konfigurasi (rename ke .env)
```
Arsitektur MVC ramping CodeIgniter 4.

---

### 5. Tips & Best Practice untuk Pemula
- Ubah nama file `env` menjadi `.env` dan atur `CI_ENVIRONMENT = development` untuk mengaktifkan Debug Toolbar.
- Gunakan perintah `php spark make:controller User` untuk membuat controller baru dengan cepat.

---

## Program: Project Pertama

```php
<?php
echo "=== CodeIgniter 4 Setup ===<br>";
echo "composer create-project codeigniter4/appstarter my-app<br>";
echo "cd my-app<br>";
echo "php spark serve<br>";
echo "Server running on http://localhost:8080<br><br>";

echo "=== CI4 Directory Structure ===<br>";
$dirs = [
    "app/",
    "  Config/",
    "  Controllers/",
    "  Models/",
    "  Views/",
    "  Filters/",
    "  Database/Migrations/",
    "  Database/Seeds/",
    "public/",
    "writable/",
    "tests/",
];
foreach ($dirs as $dir) {
    echo "  $dir<br>";
}

echo "<br>=== Key Files ===<br>";
echo "app/Config/Routes.php — Route definitions<br>";
echo "app/Controllers/ — Controllers<br>";
echo "app/Models/ — Models<br>";
echo "app/Views/ — View files<br>";
echo "app/Config/Database.php — DB config<br>";
echo ".env — Environment config<br>";

echo "<br>=== spark Commands ===<br>";
echo "php spark serve — Start dev server<br>";
echo "php spark make:controller Name — Create controller<br>";
echo "php spark make:model Name — Create model<br>";
echo "php spark make:migration Name — Create migration<br>";
echo "php spark migrate — Run migrations<br>";
echo "php spark db:seed Name — Run seeder<br>";
echo "php spark routes — Show all routes<br>";

echo "<br>=== Namespace ===<br>";
echo "namespace App\Controllers;<br>";
echo "namespace App\Models;<br>";
>
```

---

## Konsep Kunci

### Instalasi CI4
`composer create-project codeigniter4/appstarter nama-project`.

### Struktur Folder
- `app/` — Application code (Controllers, Models, Config)
- `public/` — Entry point (index.php)
- `writable/` — Cache, logs, uploads
- `tests/` — Test files

### Spark CLI
Command-line tool CI4. `php spark` untuk list commands.

### Namespace
CI4 gunakan namespace. Controller: `namespace App\Controllers`.

### Routes
`app/Config/Routes.php` — define semua routes di sini.

---

## Eksperimen

- Install CI4 dan jalankan spark serve
- Jelajahi folder app/ dan lihat isinya
- Coba spark list untuk semua commands
- Buat route sederhana di Routes.php
- Pindah ke Config/ dan lihat file konfigurasi

---

## Tantangan

Buat project CI4 baru dengan 3 routes: home (/), about (/about), contact (/contact). Tampilkan teks berbeda di setiap route.

---

## Ringkasan

Minggu 1 dari 10: **Setup & Instalasi CI4** (Level: Pemula). Fondasi CI4 dimulai. Minggu depan: **Controllers & Routing**.
