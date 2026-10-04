# Modular UI: View Layouts, View Partials & View Cells

> **Kategori:** CodeIgniter 4 | **Level:** Beginner | **Minggu 3:** Modular UI: View Layouts, View Partials & View Cells
> ⏱️ **Estimated Time:** 45 Minutes (15m theory, 30m practice) | 🔗 **Pace:** Structured (Step-by-step)


## Learning Objectives

- Master CI4 View Layout inheritance (`$this->extend()` and `$this->renderSection()`).
- Understand View Cells (`view_cell()`): autonomous UI mini-controllers rendering isolated widgets.
- Eliminate duplicated header, footer, and sidebar markup across web templates.
- Transmit dynamic parameters into View Cells for reusable widget presentation.

---

## Program: Academic Dashboard with View Layouts & Grade Summary ViewCell

```php
<?php
// app/Cells/AcademicSummaryCell.php (CodeIgniter 4 View Cell)
namespace App\Cells;

class AcademicSummaryCell {
    public function render(array $params = []): string {
        $gradeClass = $params['grade'] ?? 'XII-RPL';
        
        // Dalam implementasi nyata: kueri rata-rata kelas dari database
        $averageGpa = 3.82;
        $totalStudents = 34;

        return view('cells/academic_summary', [
            'gradeClass'    => $gradeClass,
            'averageGpa'    => $averageGpa,
            'totalStudents' => $totalStudents,
        ]);
    }
}

// app/Views/layouts/academic_master.php (View Layout Induk)
$masterLayoutSnippet = <<<'HTML'
<!DOCTYPE html>
<html lang="id">
<head>
    <meta charset="UTF-8">
    <title><?= $this->renderSection('title') ?> - Portal Akademik CI4</title>
    <link rel="stylesheet" href="/assets/css/academic.css">
</head>
<body class="bg-gray-50">
    <header class="navbar">Portal Sekolah Menengah Kejuruan</header>
    
    <main class="container">
        <!-- Konten Halaman Spesifik Diinjeksikan ke Section Ini -->
        <?= $this->renderSection('content') ?>
    </main>
</body>
</html>
HTML;

// app/Views/academic/dashboard.php (Halaman Anak)
$childViewSnippet = <<<'HTML'
<?= $this->extend('layouts/academic_master') ?>

<?= $this->section('title') ?>Dashboard Siswa<?= $this->endSection() ?>

<?= $this->section('content') ?>
    <h2>Selamat Datang di Portal Nilai Akademik</h2>
    
    <!-- Memanggil View Cell Independen secara Modular -->
    <?= view_cell('App\Cells\AcademicSummaryCell::render', ['grade' => 'XII-RPL-1']) ?>
<?= $this->endSection() ?>
HTML;

echo "=== VIEW LAYOUTS & VIEW CELL SYSTEM TERDEFINISI DENGAN BERSIH ===\n";
```

---

## Key Concepts

In legacy CodeIgniter 3, developers pieced layouts together using fragmented snippets: `$this->load->view('header'); $this->load->view('content'); $this->load->view('footer');`. Across 20 pages, this boilerplate repeated 20 times.

### View Layouts in CodeIgniter 4
CI4 introduces master template inheritance:
1. A master view (`layouts/academic_master.php`) declares global frames exposing injection slots: `<?= $this->renderSection('content') ?>`.
2. Individual pages (`dashboard.php`) extend the parent via `<?= $this->extend('layouts/academic_master') ?>` and wrap page copy within `<?= $this->section('content') ?>`.

### The Innovation of View Cells
**View Cells** deliver modular component autonomy. If an academic grade summary widget appears on five distinct pages, traditional partial views require all five controllers to query database stats repetitively. A View Cell (`view_cell()`) binds its own isolated mini-controller, resolving data independently without cluttering primary page controllers!


---

---

## Beginner Friendly Explanation

Imagine a school notice board. The View Layout is the master bulletin board bordered by the school crest. A View Cell is an autonomous digital clock mounted in the corner: it runs on its own internal battery without requiring teachers to manually adjust clock hands whenever posting fresh notices.

## Experiments

- Run `php spark make:cell AcademicSummary` to scaffold a View Cell class and view file.
- Add a caching TTL parameter to the View Cell caching HTML output for 5 minutes (`["ttl" => 300]`).
- Deploy conditional sections to inject page-specific JavaScript scripts exclusively on designated views.

---

## Challenge

Build a `StudentAttendanceBadgeCell` View Cell displaying student attendance percentages styled with green/yellow/red color indicators.

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
```text
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
```text
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
```text
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
```text
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

You have mastered View Layouts, template inheritance, and modular View Cells in CI4. Next week we cover CSRF, Sessions, and security Route Filters.
