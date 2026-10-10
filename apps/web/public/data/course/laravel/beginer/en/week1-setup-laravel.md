# Setup & Laravel Installation

> **Kategori:** Laravel | **Level:** Beginner | **Minggu 1:** Setup & Laravel Installation

## Learning Objectives

- Install Laravel via Composer (Laravel Docs: Installation)
- Understand Laravel folder structure: app, routes, resources, database
- Artisan CLI: serve, make:controller, make:model, migrate
- .env file for environment configuration
- Routes: routes/web.php and routes/api.php

---

## Quick Start Guide: Setup & Project Initialization

Before exploring the lesson theory and code examples below, set up your local development environment with these step-by-step instructions:

### 1. VS Code Setup & Recommended Extensions
Use [Visual Studio Code](https://code.visualstudio.com/) as your primary code editor. Install these essential extensions:
- **PHP Intelephense** (`bmewburn.vscode-intelephense-client`): PHP language server
- **Laravel Blade Snippets** (`onecentlin.laravel5-snippets`): Blade template highlighting and snippets

Or install all recommended extensions at once via terminal:
```bash
code --install-extension bmewburn.vscode-intelephense-client --install-extension onecentlin.laravel5-snippets
```

---

### 2. Runtime & Dependency Installation (PHP 8.2+ & Composer)
Make sure the required runtime or SDK is installed on your machine:

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

**Verify Installation:**
Run this command in your terminal to ensure tools are properly configured:
```bash
php -v && composer -v
```

Expected output:
```output
PHP 8.x
Composer 2.x
```

> 💡 **Prerequisite Note:** Ensure php-curl, mbstring, and xml extensions are enabled.

---

### 3. Initializing a Blank Project (Scaffolding)
Generate a brand-new project workspace using the official CLI command:

```bash
composer create-project laravel/laravel my-laravel-app
cd my-laravel-app
```
- **Details:** Downloads official Laravel skeleton, generates APP_KEY, and creates default .env.
- **Navigate to the project directory:**
```bash
cd my-laravel-app
```

---

### 4. Running the Local Dev Server & First Entry File
Start your local development server:

```bash
php artisan serve
```
Open in browser or terminal: `http://127.0.0.1:8000`

> ℹ️ Laravel development server launches on port 8000.

**Initial Entry File (`routes/web.php`):**
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
Simple route closure returning JSON response.

---

### 5. New Project Directory Structure
Standard directory layout and file anatomy created by the scaffolder:

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
Structured Laravel MVC architecture.

---

### 6. Beginner Tips & Best Practices
- Run `php artisan make:model Product -mcr` to scaffold a Model, Migration, and Controller in one command.
- Execute `php artisan migrate` to apply pending database schema changes.

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
