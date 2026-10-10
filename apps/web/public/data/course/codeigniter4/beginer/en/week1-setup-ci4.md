# Setup & CI4 Installation

> **Kategori:** CodeIgniter 4 | **Level:** Beginner | **Minggu 1:** Setup & CI4 Installation

## Learning Objectives

- Install CodeIgniter 4 via Composer (CI4 Docs: Installation)
- Understand CI4 folder structure: app, public, writable, tests
- Spark CLI: serve, make:controller, make:model, migrate
- .env file for environment configuration
- Namespaces: App\Controllers, App\Models

---

## Quick Start Guide: Setup & Project Initialization

Before exploring the lesson theory and code examples below, set up your local development environment with these step-by-step instructions:

### 1. VS Code Setup & Recommended Extensions
Use [Visual Studio Code](https://code.visualstudio.com/) as your primary code editor. Install these essential extensions:
- **PHP Intelephense** (`bmewburn.vscode-intelephense-client`): PHP autocomplete engine

Or install all recommended extensions at once via terminal:
```bash
code --install-extension bmewburn.vscode-intelephense-client
```

---

### 2. Runtime & Dependency Installation (PHP 8.1+ & Composer)
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
sudo apt install -y php-cli php-intl composer
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

> 💡 **Prerequisite Note:** Ensure php-intl and php-mbstring extensions are enabled in php.ini.

---

### 3. Initializing a Blank Project (Scaffolding)
Generate a brand-new project workspace using the official CLI command:

```bash
composer create-project codeigniter4/appstarter my-ci4-app
cd my-ci4-app
```
- **Details:** Downloads the official CodeIgniter 4 app starter directory structure.
- **Navigate to the project directory:**
```bash
cd my-ci4-app
```

---

### 4. Running the Local Dev Server & First Entry File
Start your local development server:

```bash
php spark serve
```
Open in browser or terminal: `http://localhost:8080`

> ℹ️ CodeIgniter Spark dev server runs at port 8080.

**Initial Entry File (`app/Controllers/Home.php`):**
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
Default CodeIgniter 4 controller returning JSON.

---

### 5. New Project Directory Structure
Standard directory layout and file anatomy created by the scaffolder:

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
Lean MVC architecture of CodeIgniter 4.

---

### 6. Beginner Tips & Best Practices
- Rename `env` to `.env` and set `CI_ENVIRONMENT = development` to enable the interactive Debug Toolbar.
- Use `php spark make:controller User` to generate controllers quickly.

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
