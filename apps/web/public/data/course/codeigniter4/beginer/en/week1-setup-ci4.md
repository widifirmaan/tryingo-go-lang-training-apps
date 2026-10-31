# Setup & CI4 Installation

> **Kategori:** CodeIgniter 4 | **Level:** Beginner | **Minggu 1:** Setup & CI4 Installation

## Why This Matters

CodeIgniter 4 is a lightweight, fast PHP framework favored by government apps, schools, and small startups across Indonesia. Writing plain PHP first, then CI4, teaches you what frameworks do silently under the hood.

Week 1 — themed **"Setup & CI4 Installation"** — centers on the practice program *"First Project"*. Run the program in the Playground first, tweak it little by little, then read through the key concepts.


## Learning Objectives

- Install CodeIgniter 4 via Composer (CI4 Docs: Installation)
- Understand CI4 folder structure: app, public, writable, tests
- Spark CLI: serve, make:controller, make:model, migrate
- .env file for environment configuration
- Namespaces: App\Controllers, App\Models


## Foundations: Before Writing Code

This section is for readers who are **completely new** to programming. The concepts are identical across every language — learn them once, use them forever.

- **Files & folders = where programs live.** A program is plain text saved in a file (e.g. `lesson.md`). Files have **extensions** that indicate the language: `.md`, `.go`, `.py`, `.html`. A folder holding all of a program's files is called a **project**.
- **Terminal / command line.** A text window where you type commands: `cd folder` (change folder), `ls` / `dir` (list contents), `go run main.go` (run a program). Programs run from the folder containing their files.
- **Compiled vs interpreted.** **Compiled** languages (Go, Rust, C#) translate the whole program into machine instructions before running — fast, but require a build step. **Interpreted** languages (Python, PHP, JavaScript) execute line by line directly — great for learning and quick prototypes. The playgrounds on this site execute code **inside your browser**, so no installation is needed.
- **Statically typed vs dynamically typed.** **Statically typed** languages (Go, Rust, TypeScript) check data types (numbers, text) while you write — errors surface early. **Dynamically typed** languages (Python, PHP, JavaScript) check types while the program runs — more lenient, but errors appear at runtime.
- **How to read error messages.** Read the last line first: the error type plus a short explanation, then locate the **line number** it mentions. Errors are not tragedies — they are the computer telling you what to fix.
- **REPL / playground.** A REPL (Read-Eval-Print Loop) is a code "calculator": type one line, see the result instantly. Every code block on this site has a **Try in Playground** button letting you tweak and run the code live — the fastest way to learn: change a little, run, observe the difference.

> **Important note:** the browser playground has limitations — it cannot receive interactive keyboard input (stdin). If a challenge asks for "user input", simply write the value directly into a variable (e.g. `let name = "Budi"`; `rupiah = 250000`) and run.

---

---

## Quick Start Guide: Setup & Project Initialization

> **⚡ Try it in the browser first — no install required!** Every code block in this lesson has a **Try in Playground** button and runs right in this tab. The local installation steps below are optional — follow them later, once you are ready to code in your own editor (VS Code/IDE) or build real projects.

Before exploring the lesson theory and code examples below, set up your local development environment with these step-by-step instructions:

### 1. Runtime & Dependency Installation (PHP 8.1+ & Composer)
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

### 2. Initializing a Blank Project (Scaffolding)
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

### 3. Running the Local Dev Server & First Entry File
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

### 4. New Project Directory Structure
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

### 5. Beginner Tips & Best Practices
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
