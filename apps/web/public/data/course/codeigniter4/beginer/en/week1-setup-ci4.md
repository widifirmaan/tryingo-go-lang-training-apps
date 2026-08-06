# Setup & CI4 Installation

> **Kategori:** CodeIgniter 4 | **Level:** Beginner | **Minggu 1:** Setup & CI4 Installation

## Learning Objectives

- Install CodeIgniter 4 via Composer (CI4 Docs: Installation)
- Understand CI4 folder structure: app, public, writable, tests
- Spark CLI: serve, make:controller, make:model, migrate
- .env file for environment configuration
- Namespaces: App\Controllers, App\Models

---

## Program: First Project

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

## Key Concepts

### CI4 Installation
`composer create-project codeigniter4/appstarter name`.

### Folder Structure
- `app/` — Application code
- `public/` — Entry point
- `writable/` — Cache, logs, uploads
- `tests/` — Test files

### Spark CLI
CI4 command-line tool. `php spark` lists commands.

### Namespaces
CI4 uses namespaces. Controller: `namespace App\Controllers`.

### Routes
`app/Config/Routes.php` defines all routes.

---

## Experiments

- Install CI4 and run spark serve
- Explore app/ folder and its contents
- Try spark list for all commands
- Create simple route in Routes.php
- Navigate Config/ and view config files

---

## Challenge

Create a new CI4 project with 3 routes: home (/), about (/about), contact (/contact). Display different text on each route.

---

## Summary

Week 1 of 10: **Setup & CI4 Installation** (Level: Beginner). CI4 foundation begins. Next week: **Controllers & Routing**.
