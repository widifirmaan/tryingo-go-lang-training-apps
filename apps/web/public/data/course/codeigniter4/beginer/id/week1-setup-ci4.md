# Setup & Instalasi CI4

> **Kategori:** CodeIgniter 4 | **Level:** Pemula | **Minggu 1:** Setup & Instalasi CI4

## Tujuan Pembelajaran

- Install CodeIgniter 4 via Composer (CI4 Docs: Installation)
- Memahami struktur folder CI4: app, public, writable, tests
- Spark CLI: serve, make:controller, make:model, migrate
- File .env untuk environment configuration
- Namespace: App\Controllers, App\Models

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
