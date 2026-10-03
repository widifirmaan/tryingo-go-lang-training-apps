# Modular UI: View Layouts, View Partials & View Cells

> **Kategori:** CodeIgniter 4 | **Level:** Beginner | **Minggu 3:** Modular UI: View Layouts, View Partials & View Cells

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

## Summary

You have mastered View Layouts, template inheritance, and modular View Cells in CI4. Next week we cover CSRF, Sessions, and security Route Filters.
