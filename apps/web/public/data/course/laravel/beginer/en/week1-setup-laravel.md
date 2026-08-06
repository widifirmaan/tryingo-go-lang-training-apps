# Setup & Laravel Installation

> **Kategori:** Laravel | **Level:** Beginner | **Minggu 1:** Setup & Laravel Installation

## Learning Objectives

- Install Laravel via Composer (Laravel Docs: Installation)
- Understand Laravel folder structure: app, routes, resources, database
- Artisan CLI: serve, make:controller, make:model, migrate
- .env file for environment configuration
- Routes: routes/web.php and routes/api.php

---

## Program: First Project

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

## Key Concepts

### Laravel Installation
`composer create-project laravel/laravel name`. Alternative: `laravel new`.

### Folder Structure
- `app/` — Business logic
- `routes/` — Route definitions
- `resources/views/` — Blade templates
- `database/migrations/` — Schema versioning
- `public/` — Entry point

### Artisan CLI
CLI tool for scaffolding, migrations, testing.

### Routes
`routes/web.php` for web, `routes/api.php` for API.

---

## Experiments

- Create new project with laravel new
- Explore each folder and its contents
- Try artisan list for all commands
- Create simple route in web.php
- Navigate config/ and view config files

---

## Challenge

Create a new Laravel project with 3 routes: home (/), about (/about), contact (/contact). Display different text on each route.

---

## Summary

Week 1 of 12: **Setup & Laravel Installation** (Level: Beginner). Laravel foundation begins. Next week: **Routing & Controllers**.
