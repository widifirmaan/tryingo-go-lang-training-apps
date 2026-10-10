# CodeIgniter 4 Architecture: Spark CLI, Routing & Controller Namespacing

> **Kategori:** CodeIgniter 4 | **Level:** Beginner | **Minggu 1:** CodeIgniter 4 Architecture: Spark CLI, Routing & Controller Namespacing
> ⏱️ **Estimated Time:** 45 Minutes (15m theory, 30m practice) | 🔗 **Pace:** Structured (Step-by-step)


## Learning Objectives

- Understand CodeIgniter 4 philosophy: the world's lightest full-stack PHP framework (< 15MB footprint).
- Utilize Spark CLI (`php spark serve`, `php spark make:controller`) for automated scaffolding.
- Organize structured routing via `$routes->group()` and named routes.
- Apply domain-driven controller namespacing (`App\Controllers\Academic`).

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

## Program: Academic School Portal with Spark CLI & Structured Route Groups

```php
<?php
// app/Config/Routes.php (CodeIgniter 4 Modern Routing)
use CodeIgniter\Router\RouteCollection;

/** @var RouteCollection $routes */
$routes->get('/', 'Home::index');

// Pengelompokan Rute Portal Akademik Berdasarkan Namespace
$routes->group('portal/academic', ['namespace' => 'App\Controllers\Academic'], static function ($routes) {
    $routes->get('/', 'DashboardController::index', ['as' => 'academic.dashboard']);
    $routes->get('students', 'StudentController::index', ['as' => 'academic.students.list']);
    $routes->get('students/(:num)', 'StudentController::show/$1', ['as' => 'academic.students.show']);
    $routes->post('students/enroll', 'StudentController::enroll', ['as' => 'academic.students.enroll']);
});

// app/Controllers/Academic/StudentController.php
namespace App\Controllers\Academic;

use App\Controllers\BaseController;

class StudentController extends BaseController {
    public function index(): string {
        $data = [
            'title'       => 'Buku Induk Siswa & Akademik',
            'active_term' => 'Semester Ganjil 2026/2027',
            'students'    => [
                ['nisn' => '1029481', 'name' => 'Aditya Pratama', 'grade' => 'XII-RPL-1', 'gpa' => 3.85],
                ['nisn' => '1029482', 'name' => 'Siti Nurhaliza', 'grade' => 'XII-RPL-1', 'gpa' => 3.92],
            ]
        ];

        return view('academic/student_list', $data);
    }

    public function show(int $nisn): string {
        return view('academic/student_detail', ['nisn' => $nisn]);
    }
}

echo "=== CODEIGNITER 4 MVC SPARK ROUTING & CONTROLLER NAMESPACING ACTIVE ===\n";
```

---

## Key Concepts

CodeIgniter 4 (CI4) is a modern PHP framework rebuilt from scratch to exploit PHP 8 capabilities. CI4 maintains its legendary heritage: **ultra-fast execution**, seamless compatibility with resource-constrained servers (shared hosting), and zero dependency on complicated node/npm build chains.

### The Spark CLI Tool
CI4 incorporates a native command-line utility called **Spark** (`php spark`). Spark automates file scaffolding for Controllers, Models, Migrations, and Seeders, alongside spinning up ephemeral development webservers (`php spark serve`).

### Explicit Modern Routing & Namespacing
In modern CI4, insecure legacy reflection auto-routing is disabled by default. Explicit routing definitions reside in `app/Config/Routes.php`. Leveraging `$routes->group()` configured with namespaces neatly partitions academic, bursar, and administrative controllers into modular sub-directories.


---

---

## Beginner Friendly Explanation

Consider the difference between a massive freight semi-truck requiring multi-lane highways (heavy enterprise frameworks) versus a nimble motorcycle navigating tight alleyways to reach destinations in three minutes (CodeIgniter 4). CI4 is featherweight, never congests modest school servers, and deploys effortlessly on economical hosting.

## Experiments

- Run `php spark routes` in your terminal to inspect the active routing table.
- Deploy `(:segment)` or `(:num)` placeholders enforcing strict URL parameter types.
- Toggle the `.env` environment to `development` unlocking CI4's graphic bottom Debug Toolbar.

---

## Challenge

Configure Subdomain Routing in CI4: route requests originating from `admin.sekolah.sch.id` directly into the isolated `App\Controllers\Admin\` controller group.

---

## Visual Mental Model & Architecture Flow

```diagram
┌──────────────────────────────────────────────────────────┐
│ ARSITEKTUR MVC RINGAN CODEIGNITER 4                      │
│                                                          │
│ Public Ingress (public/index.php)                        │
│       │                                                  │
│       ▼                                                  │
│ URI Routing (app/Config/Routes.php)                      │
│       │                                                  │
│       ▼ Filters (Auth/CSRF/CORS)                         │
│ Controller (extends BaseController)                      │
│       │                          │                       │
│       ▼                          ▼                       │
│ Model (Entity & Validation)    View (Render Buffer)      │
│       │                          │                       │
│       ▼                          ▼                       │
│ Database Output ──────────────► Browser Response         │
└──────────────────────────────────────────────────────────┘
```

---

## Syntax Reference & Practical Guide (W3Schools Style)

Here is the comprehensive breakdown of syntax signatures, parameters, return behavior, and isolated runnable examples introduced in this module:

### 1. `$routes->get('items', 'Items::index')`
- **Core Functionality:** Routing URI CodeIgniter 4.
- **Parameters / Attributes:** `HTTP verb, URI string, Controller::method`.
- **System Behavior & Return:** Menghubungkan URL browser ke controller CodeIgniter 4 dengan namespace terorganisir..
- **Practical Code Example:**
```php
<?php
$routes->get('catalog', 'CatalogController::index');
$routes->post('catalog/create', 'CatalogController::create');
```
- **Expected Execution Output:**
```output
Endpoint CI4 siap menerima koneksi HTTP
```

### 2. `class ProductModel extends Model { protected $allowedFields = [...]; }`
- **Core Functionality:** Model CI4 dengan Query Builder bawaan.
- **Parameters / Attributes:** `$table, $primaryKey, $allowedFields`.
- **System Behavior & Return:** Provides operasi database aman dengan proteksi field otomatis tanpa query SQL mentah..
- **Practical Code Example:**
```php
<?php
namespace App\Models;
use CodeIgniter\Model;
class ProductModel extends Model {
    protected $table = 'products';
    protected $allowedFields = ['name', 'price'];
}
```
- **Expected Execution Output:**
```output
Model siap menjalankan method findAll() dan save()
```

### 3. `return view('template_name', $data)`
- **Core Functionality:** Helper render antarmuka View CI4.
- **Parameters / Attributes:** `View path, Data array`.
- **System Behavior & Return:** Mengurai berkas view PHP di dalam direktori `app/Views/` dan menyajikannya ke layar klien..
- **Practical Code Example:**
```php
<?php
$data = ['title' => 'Katalog Produk', 'items' => $items];
return view('products/list', $data);
```
- **Expected Execution Output:**
```output
Halaman web disajikan melalui buffering respons
```

### 4. `$this->request->getPost('fieldName')`
- **Core Functionality:** Retrieval of input request aman CI4.
- **Parameters / Attributes:** `Field identifier, Filter flag`.
- **System Behavior & Return:** Membaca payload POST yang masuk dengan pembersihan sanitasi XSS bawaan framework..
- **Practical Code Example:**
```php
<?php
$title = $this->request->getPost('title', FILTER_SANITIZE_SPECIAL_CHARS);
```
- **Expected Execution Output:**
```output
Input terbaca dengan pembersihan karakter berbahaya
```

---

## Common Pitfalls & Debugging Tips

### 1. Incorrect `baseURL` in `.env`
- **Symptom / Issue:** Assets and navigation redirect to incorrect hosts or fail to load.
- **Root Cause:** Common mistaken assumptions during early development.
- **Fix / Best Practice:** Configure `app.baseURL` to match your exact local or production host address.

### 2. Overlooking CSRF Form Tokens
- **Symptom / Issue:** Leaves form submissions vulnerable to Cross-Site Request Forgery.
- **Root Cause:** Common mistaken assumptions during early development.
- **Fix / Best Practice:** Enable CSRF filters in `Filters.php` and include `<?= csrf_field() ?>` inside HTML forms.

### 3. Case-Sensitivity Mismatches in Namespaces
- **Symptom / Issue:** Fails class autoloading on Linux servers due to uppercase/lowercase discrepancies.
- **Root Cause:** Common mistaken assumptions during early development.
- **Fix / Best Practice:** Follow strict PSR-4 casing matching folder and file names identically.

---

## Summary

You have mastered CI4 MVC architecture, Spark CLI, and Controller Namespacing. Next week we explore Model Entities and Database Migrations.
