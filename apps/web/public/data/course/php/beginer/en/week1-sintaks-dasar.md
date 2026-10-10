# Basic Syntax & Variables

> **Kategori:** PHP | **Level:** Beginner | **Minggu 1:** Basic Syntax & Variables

## Learning Objectives

- Understand PHP as a server-side language (PHP Official Docs)
- Write PHP tags: <?php ... ?> and echo for output
- Declare variables with $ and dynamic typing
- Learn basic types: string, int, float, bool, array, NULL
- String interpolation and concatenation with .

---

## Quick Start Guide: Setup & Project Initialization

Before exploring the lesson theory and code examples below, set up your local development environment with these step-by-step instructions:

### 1. VS Code Setup & Recommended Extensions
Use [Visual Studio Code](https://code.visualstudio.com/) as your primary code editor. Install these essential extensions:
- **PHP Intelephense** (`bmewburn.vscode-intelephense-client`): Ultra-fast PHP language server: code completion and signature help

Or install all recommended extensions at once via terminal:
```bash
code --install-extension bmewburn.vscode-intelephense-client
```

---

### 2. Runtime & Dependency Installation (PHP 8.3+ & Composer)
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
sudo apt install -y php8.3-cli php8.3-mbstring php8.3-xml composer
```

**Verify Installation:**
Run this command in your terminal to ensure tools are properly configured:
```bash
php -v && composer -v
```

Expected output:
```output
PHP 8.3.x
Composer version 2.x
```

> 💡 **Prerequisite Note:** Composer is the standard dependency manager for PHP.

---

### 3. Initializing a Blank Project (Scaffolding)
Generate a brand-new project workspace using the official CLI command:

```bash
mkdir my-php-app && cd my-php-app
composer init --no-interaction
touch index.php
```
- **Details:** Configures composer.json for PSR-4 autoloading and third-party packages.
- **Navigate to the project directory:**
```bash
cd my-php-app
```

---

### 4. Running the Local Dev Server & First Entry File
Start your local development server:

```bash
php -S localhost:8000
```
Open in browser or terminal: `http://localhost:8000`

> ℹ️ PHP built-in development web server starts at port 8000.

**Initial Entry File (`index.php`):**
```php
<?php
declare(strict_types=1);

header('Content-Type: application/json');

$data = [
    'status' => 'success',
    'language' => 'PHP ' . PHP_VERSION,
    'message' => 'Halo dari server PHP 8 modern!',
    'timestamp' => date('c')
];

echo json_encode($data, JSON_PRETTY_PRINT);
```
Modern PHP script demonstrating strict types and JSON output.

---

### 5. New Project Directory Structure
Standard directory layout and file anatomy created by the scaffolder:

```text
my-php-app/
├── public/
│   └── index.php        # Entrypoint web
├── src/                 # Class PSR-4 aplikasi
├── vendor/              # Dependensi Composer (autoloader)
└── composer.json        # Manifest project
```
Modern PSR-4 compliant PHP architecture.

---

### 6. Beginner Tips & Best Practices
- Always include `declare(strict_types=1);` at the top of PHP files for strict type enforcement.
- Pass `-t public` to `php -S` to serve files safely from the public document root.

---

## Program: Hello, PHP!

```php
<?php
echo "Selamat datang di PHP!<br>";
echo "PHP adalah bahasa server-side populer.<br>";

$nama = "Budi";
$umur = 25;
$tinggi = 175.5;
$aktif = true;

echo "Nama: $nama<br>";
echo "Umur: $umur<br>";
echo "Tinggi: $tinggi<br>";
echo "Aktif: " . ($aktif ? "Ya" : "Tidak") . "<br>";
echo "Tipe: " . gettype($nama) . ", " . gettype($umur) . "<br>";
>
```

---

## Key Concepts

### PHP's Role
PHP is a server-side scripting language. Executed on the server — produces HTML sent to client.

### Basic Syntax
`<?php ... ?>` tags. `echo` for output. Variables start with `$`.

### Data Types
String, Integer, Float, Boolean, Array, NULL.

### Strings
Double-quote interpolation, single-quote literal, concatenation with `.`.

---

## Experiments

- Change variable values and observe
- Create arithmetic operations: +, -, *, /, %
- Try single-quote vs double-quote difference
- Use gettype() to check various types
- Create type casting: (int), (string), (bool)

---

## Challenge

Build a student profile program: name, age, grades (array), and graduation status. Display with formatted echo.

---

## Summary

Week 1 of 12: **Basic Syntax & Variables** (Level: Beginner). PHP foundation starts here. Next week: **Operators & Control Flow**.
