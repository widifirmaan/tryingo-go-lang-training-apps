# CodeIgniter 4 Architecture: Spark CLI, Routing & Controller Namespacing

> **Kategori:** CodeIgniter 4 | **Level:** Beginner | **Minggu 1:** CodeIgniter 4 Architecture: Spark CLI, Routing & Controller Namespacing
> ⏱️ **Estimated Time:** 45 Minutes (15m theory, 30m practice) | 🔗 **Pace:** Structured (Step-by-step)


## Learning Objectives

- Understand CodeIgniter 4 philosophy: the world's lightest full-stack PHP framework (< 15MB footprint).
- Utilize Spark CLI (`php spark serve`, `php spark make:controller`) for automated scaffolding.
- Organize structured routing via `$routes->group()` and named routes.
- Apply domain-driven controller namespacing (`App\Controllers\Academic`).

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

## Syntax Cheatsheet & Quick Reference

| Syntax / Keyword | Purpose & Practical Pattern |
| :--- | :--- |
| **Declaration & Setup** | Initialize data structures, type constraints, and dependencies |
| **Core Processing** | Algorithm execution, control flow, and data transformation |
| **Defensive Validation** | Verify data invariants and handle errors explicitly |
| **Return / Output** | Deliver deterministic output ready for consumption |

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
