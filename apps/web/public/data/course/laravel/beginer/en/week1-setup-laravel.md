# Setup & Laravel Installation

## Why This Matters

Laravel is the most popular PHP framework in the world with a complete ecosystem: Eloquent ORM, queues, real-time, billing. Many agencies and studios bill projects in Laravel - a skill you can directly sell.

Practice program: *"First Project"*. Run the code in the Playground to examine how it works.


## Learning Objectives

- Install Laravel via Composer (Laravel Docs: Installation)
- Understand Laravel folder structure: app, routes, resources, database
- Artisan CLI: serve, make:controller, make:model, migrate
- .env file for environment configuration
- Routes: routes/web.php and routes/api.php


## Foundations: Before Writing Code

This section is for readers who are **completely new** to programming. The concepts are identical across every language - learn them once, use them forever.

- **Files & folders = where programs live.** A program is plain text saved in a file (e.g. `lesson.md`). Files have **extensions** that indicate the language: `.md`, `.go`, `.py`, `.html`. A folder holding all of a program's files is called a **project**.
- **Terminal / command line.** A text window where you type commands: `cd folder` (change folder), `ls` / `dir` (list contents), `go run main.go` (run a program). Programs run from the folder containing their files.
- **Compiled vs interpreted.** **Compiled** languages (Go, Rust, C#) translate the whole program into machine instructions before running - fast, but require a build step. **Interpreted** languages (Python, PHP, JavaScript) execute line by line directly - great for learning and quick prototypes. The playgrounds on this site execute code **inside your browser**, so no installation is needed.
- **Statically typed vs dynamically typed.** **Statically typed** languages (Go, Rust, TypeScript) check data types (numbers, text) while you write - errors surface early. **Dynamically typed** languages (Python, PHP, JavaScript) check types while the program runs - more lenient, but errors appear at runtime.
- **How to read error messages.** Read the last line first: the error type plus a short explanation, then locate the **line number** it mentions. Errors are not tragedies - they are the computer telling you what to fix.
- **REPL / playground.** A REPL (Read-Eval-Print Loop) is a code "calculator": type one line, see the result instantly. Every code block on this site has a **Try in Playground** button letting you tweak and run the code live - the fastest way to learn: change a little, run, observe the difference.

> **Important note:** the browser playground has limitations - it cannot receive interactive keyboard input (stdin). If a challenge asks for "user input", simply write the value directly into a variable (e.g. `let name = "Budi"`; `rupiah = 250000`) and run.

---

---

## Quick Start Guide: Setup & Project Initialization

> **Try it directly in the browser without local setup.** All code blocks can run directly in the Playground.

Before exploring the lesson theory and code examples below, set up your local development environment with these step-by-step instructions:

### 1. Runtime & Dependency Installation (PHP 8.2+ & Composer)
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

> **Prerequisite Note:** Ensure php-curl, mbstring, and xml extensions are enabled.

---

### 2. Initializing a Blank Project (Scaffolding)
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

### 3. Running the Local Dev Server & First Entry File
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

### 4. New Project Directory Structure
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

### 5. Beginner Tips & Best Practices
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
echo "routes/web.php - Web routes<br>";
echo "app/Http/Controllers/ - Controllers<br>";
echo "app/Models/ - Eloquent models<br>";
echo "resources/views/ - Blade templates<br>";
echo "database/migrations/ - Database schema<br>";
echo ".env - Environment config<br>";

echo "<br>=== artisan Commands ===<br>";
echo "php artisan serve - Start dev server<br>";
echo "php artisan make:controller Name - Create controller<br>";
echo "php artisan make:model Name - Create model<br>";
echo "php artisan migrate - Run migrations<br>";
echo "php artisan route:list - Show all routes<br>";
```

---

## Key Concepts

### Laravel Installation
`composer create-project laravel/laravel name`. Alternative: `laravel new`.

### Folder Structure
- `app/` - Business logic
- `routes/` - Route definitions
- `resources/views/` - Blade templates
- `database/migrations/` - Schema versioning
- `public/` - Entry point

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
