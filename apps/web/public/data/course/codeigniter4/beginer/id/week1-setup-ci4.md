# Setup & Instalasi CI4

> **Kategori:** CodeIgniter 4 | **Level:** Pemula | **Minggu 1:** Setup & Instalasi CI4

## Tujuan Pembelajaran

- Install CodeIgniter 4 via Composer (CI4 Docs: Installation)
- Memahami struktur folder CI4: app, public, writable, tests
- Spark CLI: serve, make:controller, make:model, migrate
- File .env untuk environment configuration
- Namespace: App\Controllers, App\Models

---

## Panduan Mulai Cepat (Quick Start): Setup & Inisialisasi Project

Sebelum mulai mendalami materi dan praktik kode di bawah, siapkan lingkungan pengembangan lokal Anda di komputer dengan langkah-langkah praktis berikut:

### 1. Persiapan Editor VS Code & Ekstensi Rekomendasi
Gunakan [Visual Studio Code](https://code.visualstudio.com/) sebagai code editor utama. Pasang ekstensi penting berikut:
- **PHP Intelephense** (`bmewburn.vscode-intelephense-client`): Autocomplete kode PHP

Atau instal semua ekstensi rekomendasi sekaligus via terminal:
```bash
code --install-extension bmewburn.vscode-intelephense-client
```

---

### 2. Instalasi Runtime & Dependency (PHP 8.1+ & Composer)
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

### 3. Inisialisasi Project Kosong (Scaffolding)
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

### 4. Menjalankan Server Lokal & File Titik Masuk Pertama
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

### 5. Struktur Direktori Proyek Baru
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

### 6. Tips & Best Practice untuk Pemula
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
