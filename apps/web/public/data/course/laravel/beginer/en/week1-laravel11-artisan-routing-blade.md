# Modern Laravel 11: Streamlined Structure, Artisan & Blade Components

> **Kategori:** Laravel Framework | **Level:** Beginner | **Minggu 1:** Modern Laravel 11: Streamlined Structure, Artisan & Blade Components
> ⏱️ **Estimated Time:** 45 Minutes (15m theory, 30m practice) | 🔗 **Pace:** Structured (Step-by-step)


## Learning Objectives

- Understand Laravel 11 streamlined directory layout (retirement of `Kernel.php` into `bootstrap/app.php`).
- Master Artisan CLI automating scaffolding for controllers, models, and migrations.
- Construct modular UI component architectures using Blade Components (`<x-product-card />`) and `@props()`.
- Configure named routes and dynamic URL generator helpers.

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

## Program: Marketplace Storefront Catalog with Blade Components & Dynamic Routing

```php
<?php
// routes/web.php (Laravel 11: Konfigurasi Ramping Tanpa Kernel.php)
use Illuminate\Support\Facades\Route;

Route::get('/', function () {
    $featuredProducts = [
        ['id' => 1, 'slug' => 'vps-cloud-pro', 'name' => 'High-Speed Cloud VPS 8GB', 'price' => 350000, 'vendor' => 'IndoCloud'],
        ['id' => 2, 'slug' => 'mechanical-kb',  'name' => 'Custom Mechanical Keyboard', 'price' => 1250000, 'vendor' => 'KeyCraft Store'],
        ['id' => 3, 'slug' => '4k-monitor-pro', 'name' => 'UltraSharp 27" 4K Monitor',  'price' => 6400000, 'vendor' => 'Digital Tech'],
    ];

    return view('marketplace.catalog', compact('featuredProducts'));
})->name('catalog.home');

// resources/views/components/product-card.blade.php (Blade Component System)
$bladeComponentSample = <<<'BLADE'
@props(['product'])

<div class="border rounded-xl p-5 shadow-sm hover:shadow-md transition bg-white">
    <div class="flex justify-between items-start mb-2">
        <span class="text-xs font-semibold px-2 py-1 bg-emerald-100 text-emerald-800 rounded">
            {{ $product['vendor'] }}
        </span>
        <span class="font-bold text-slate-900 text-lg">
            Rp {{ number_format($product['price'], 0, ',', '.') }}
        </span>
    </div>
    <h3 class="font-bold text-slate-800 text-base mb-4">{{ $product['name'] }}</h3>
    <a href="/products/{{ $product['slug'] }}" 
       class="block text-center w-full py-2 bg-slate-900 text-white font-medium rounded-lg hover:bg-slate-800">
        Beli Sekarang
    </a>
</div>
BLADE;

echo "=== LARAVEL 11 STREAMLINED ROUTING & BLADE COMPONENTS INITIALIZED ===\n";
```

---

## Key Concepts

Laravel stands as the world's premier PHP framework, celebrated for developer ergonomics, rapid feature velocity, and unmatched ecosystem cohesion.

### Laravel 11 Architectural Streamlining
Laravel 11 radically declutters the root codebase:
- Retires legacy `app/Http/Middleware/` boilerplate and `Kernel.php`.
- Centralizes routing pipelines, global middleware, and exception handling declaratively inside `bootstrap/app.php`.
- Prunes root `config/` directories, lazy-loading framework defaults under the hood.

### The Blade Component Engine
Modern Blade transcends legacy `@include` snippets. Utilizing **Blade Components**, developers compose declarative tags: `<x-product-card :product="$item" />`. Attributes bind explicitly via `@props(['product'])`, facilitating component-driven design systems across marketplace storefronts.


---

---

## Beginner Friendly Explanation

Imagine opening a toy store. Laravel 11 represents a minimalist showroom layout with pre-assembled display units and concealed wiring (streamlined architecture). Blade Components act like modular glass display cases duplicated across ten showroom corners without carving raw timber each time.

## Experiments

- Execute `php artisan make:component ProductCard` and inspect the generated component view.
- Register a new route in `routes/web.php` binding dynamic `{slug}` route parameters.
- Deploy `route("catalog.home")` within Blade views to synthesize secure absolute anchors.

---

## Challenge

Build a master `<x-layout.marketplace>` Blade Component encapsulating dynamic cart counters and main `{{ $slot }}` injections.

---

## Visual Mental Model & Architecture Flow

```diagram
┌──────────────────────────────────────────────────────────┐
│ ALUR KERJA SIKLUS LARAVEL                                │
│                                                          │
│ HTTP Request ──► index.php ──► HTTP Kernel               │
│                                     │                    │
│                                     ▼                    │
│                                Middleware                │
│                                     │                    │
│                                     ▼                    │
│                           Router (web.php/api.php)       │
│                                     │                    │
│                                     ▼                    │
│                           Controller / Action            │
│                            │              │              │
│                            ▼              ▼              │
│                   Eloquent ORM (Model)  Blade Template   │
│                            │              │              │
│                            ▼              ▼              │
│                         Database     HTTP Response       │
└──────────────────────────────────────────────────────────┘
```

---

## Syntax Reference & Practical Guide (W3Schools Style)

Here is the comprehensive breakdown of syntax signatures, parameters, return behavior, and isolated runnable examples introduced in this module:

### 1. `Route::get('/users', [UserController::class, 'index'])`
- **Core Functionality:** Pendaftaran rute HTTP deklaratif.
- **Parameters / Attributes:** `URI pattern, Action Controller array`.
- **System Behavior & Return:** Mengarahkan permintaan HTTP GET yang masuk ke method controller yang relevan..
- **Practical Code Example:**
```php
<?php
use App\Http\Controllers\ProductController;
Route::get('/products', [ProductController::class, 'index'])->name('products.index');
```
- **Expected Execution Output:**
```output
Rute terdaftar dan siap diakses pengguna
```

### 2. `class Product extends Model { protected $fillable = [...]; }`
- **Core Functionality:** Model Eloquent ORM & Mass Assignment Guard.
- **Parameters / Attributes:** `$fillable array`.
- **System Behavior & Return:** Mendefinisikan entitas database dengan relasi aktif dan perlindungan injeksi mass assignment..
- **Practical Code Example:**
```php
<?php
namespace App\Models;
use Illuminate\Database\Eloquent\Model;
class Product extends Model {
    protected $fillable = ['title', 'price', 'in_stock'];
}
```
- **Expected Execution Output:**
```output
Model Product siap untuk operasi CRUD Eloquent
```

### 3. `$request->validate(['email' => 'required|email|unique:users'])`
- **Core Functionality:** Validasi HTTP request terpusat.
- **Parameters / Attributes:** `Rules array`.
- **System Behavior & Return:** Memvalidasi input data pengguna secara otomatis dan mengembalikan error jika tidak memenuhi syarat..
- **Practical Code Example:**
```php
<?php
$validated = $request->validate([
    'title' => 'required|string|max:255',
    'price' => 'required|numeric|min:0'
]);
```
- **Expected Execution Output:**
```output
Data lolos seleksi atau redirect dengan error session
```

### 4. `return view('products.index', compact('products'))`
- **Core Functionality:** Rendering tampilan Blade Template.
- **Parameters / Attributes:** `View path, Data array / compact`.
- **System Behavior & Return:** Mengirimkan data dari controller ke template Blade untuk dirender menjadi antarmuka HTML..
- **Practical Code Example:**
```php
<?php
public function index() {
    $products = Product::where('in_stock', true)->paginate(10);
    return view('products.index', compact('products'));
}
```
- **Expected Execution Output:**
```output
Tampilan daftar produk berhasil disajikan
```

---

## Common Pitfalls & Debugging Tips

### 1. Mass Assignment Exception
- **Symptom / Issue:** Model throws error preventing mass creation when columns are unprotected.
- **Root Cause:** Common mistaken assumptions during early development.
- **Fix / Best Practice:** Define safe assignable attributes inside `protected $fillable = [...]` on the model.

### 2. Overstuffed Controllers (Fat Controllers)
- **Symptom / Issue:** Controllers become untestable and violate single-responsibility guidelines.
- **Root Cause:** Common mistaken assumptions during early development.
- **Fix / Best Practice:** Extract domain logic into Action classes, Form Requests, and Service layers.

### 3. Skipping Production Cache Optimization
- **Symptom / Issue:** Repeated file system lookups drag down production response latency.
- **Root Cause:** Common mistaken assumptions during early development.
- **Fix / Best Practice:** Run `php artisan config:cache`, `route:cache`, and `view:cache` in production deployments.

---

## Summary

You have mastered Laravel 11 streamlined architecture, Artisan, and Blade Components. Next week we explore Eloquent ORM and multi-table relational persistence.
