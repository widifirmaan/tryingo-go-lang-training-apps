# Views & Layouts

> CodeIgniter 4 | Lesson 3

## Learning Objectives

- Understand layout: main template extended by child views\n- Use $this->extend() and $this->section() in views\n- Pass data from controller to view with array\n- Use esc() for safe output (anti XSS)

---

## Program: CodeIgniter 4

```php
<!DOCTYPE html>
<html>
<head>
    <title><?= $title ?? 'CI4 App' ?></title>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
</head>
<body>
    <header>
        <nav>
            <a href="/">Beranda</a> |
            <a href="/blog">Blog</a> |
            <a href="/about">Tentang</a>
        </nav>
    </header>
    <main>
        <?= $this->renderSection('content') ?>
    </main>
    <footer>
        <p>&copy; <?= date('Y') ?> CI4 App</p>
    </footer>
</body>
</html>

```

---

## Explanation

## Layout System
$this->extend('templates/main') — child view inherits main layout. $this->section('content') — defines section that replaces @section('content') in layout. $this->endSection() — closes section.
## Data Passing
view('blog/view', ['slug' => $slug]) — pass data as associative array. In view: $slug (or $data['slug']) — access passed data.
## XSS Prevention
esc($variable) — escape HTML entities. Prevents script injection. Always use esc() for user data output in views.

---

## Experiments

1. **## Layout System
$this->extend('templates/main') — child view inherits main layout. $this->section('content') — defines section that replaces @section('content') in layout. $this->endSection() — closes section.
## Data Passing
view('blog/view', ['slug' => $slug]) — pass data as associative array. In view: $slug (or $data['slug']) — access passed data.
## XSS Prevention
esc($variable) — escape HTML entities. Prevents script injection. Always use esc() for user data output in views.**

---

## Challenge

Expand layout: (1) add sidebar with nav links in main template, (2) add "footer" section in layout populated by child view, (3) create partial views for header/footer that can be included, (4) add dynamic meta description per page.

---

## Summary

Layout = main template. Section = dynamic content block. extend() = inherit layout. esc() = anti XSS. Next: database.
