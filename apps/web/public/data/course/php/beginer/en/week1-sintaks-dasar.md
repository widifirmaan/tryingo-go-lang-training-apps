# Basic Syntax & Variables

## Why This Matters

PHP runs roughly three quarters of the web - WordPress, Wikipedia, and endless e-commerce. Modern PHP 8 is fast and clean; learning its syntax properly kills the "PHP is messy" myth.

Practice program: *"Hello, PHP!"*. Run the code in the Playground to examine how it works.


## Learning Objectives

- Understand PHP as a server-side language (PHP Official Docs)
- Write PHP tags: <?php ... ?> and echo for output
- Declare variables with $ and dynamic typing
- Learn basic types: string, int, float, bool, array, NULL
- String interpolation and concatenation with .


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

### 1. Runtime & Dependency Installation (PHP 8.3+ & Composer)
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

> **Prerequisite Note:** Composer is the standard dependency manager for PHP.

---

### 2. Initializing a Blank Project (Scaffolding)
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

### 3. Running the Local Dev Server & First Entry File
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

### 4. New Project Directory Structure
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

### 5. Beginner Tips & Best Practices
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
```

---

## Key Concepts

### PHP's Role
PHP is a server-side scripting language. Executed on the server - produces HTML sent to client.

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
