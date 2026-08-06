# Setup & Instalasi Laravel

> **Kategori:** Laravel | **Level:** Pemula | **Minggu 1:** Setup & Instalasi Laravel

## Tujuan Pembelajaran

- Install Laravel via Composer (Laravel Docs: Installation)
- Memahami struktur folder Laravel: app, routes, resources, database
- Artisan CLI: serve, make:controller, make:model, migrate
- File .env untuk environment configuration
- Routes: routes/web.php dan routes/api.php

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
