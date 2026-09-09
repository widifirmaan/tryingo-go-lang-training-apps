# Views & Templates — CI4 Showcase with Layout

> **Kategori:** CodeIgniter | **Level:** Beginner | **Minggu 3:** Views & Templates
> **Prerequisites:** Week 2 — **Controllers & Routing**.

## Learning Objectives

- `view('products', $data)` sends to `app/Views/products.php` with XSS-safe `<?= esc($name) ?>` (source: user_guide)
- `layout` with `$this->extend('layout/main')` + `$this->section('content')` + `$this->endSection()` — showcase inheritance

---

## Why This Matters (Non-IT)

Without `view()`, HTML mixed into controllers gets messy. With `view('products', ["products"=>$data])`, controllers only send data, views only display — neat like separate kitchen & showcase.

---

## Program: Showcase Inheriting Layout

```php
// Controller: app/Controllers/Products.php
public function index(){
  $data["products"] = [["name"=>"Rice","price"=>62000],["name"=>"Spinach","price"=>5000]];
  $data["title"] = "Shop Catalog";
  return view('products', $data);
}

// Layout: app/Views/layout/main.php
<!DOCTYPE html><html><head><title><?= esc($title ?? "Shop") ?></title></head>
<body><header>Siti's Shop</header><main><?= $this->renderSection('content') ?></main></body></html>

// View: app/Views/products.php
<?= $this->extend('layout/main') ?>
<?= $this->section('content') ?>
<h1><?= esc($title) ?></h1>
<ul>
<?php foreach($products as $p): ?>
  <li><?= esc($p["name"]) ?> - Rp<?= esc($p["price"]) ?></li>
<?php endforeach; ?>
</ul>
<?= $this->endSection() ?>
```

**Safety:** `esc()` prevents XSS `<script>` → `&lt;script&gt;`.

---

## Key Concepts

### `view('products', $data)` = Send to Showcase
Controller sends `$data`, view uses `<?= $name ?>`.

### `extend/section` = Showcase Inheritance
`layout/main` frame, `products` fills `content` — no 10x header/footer rewrites.

### `esc()` = Guard
`esc($name)` turns `<` into `&lt;` — safe.

---

## Beginner Friendly Explanation

### Analogy: Showcase & Warehouse
- **Controller = warehouse**: prepares `products`.
- **View = showcase**: displays `products`.
- **Layout = store frame**: header/footer once, content swaps.

### Step 0 — Prepare Device

Same as W1: `php spark serve` on `8080`, no XAMPP needed.

### How the Computer Reads It
1. `view('products', $data)` → loads `products.php` with `$data` extracted.
2. `extend('layout/main')` → wraps output in layout, `content` section injected.

### 3 Must-Know Terms
1. **view/extend/esc**: send/inherit/guard

---

## Experiments

- **Green:** Remove `esc()` → try `name = "<b>Rice</b>"` → bold (XSS)? Reattach `esc()` → safe `&lt;b&gt;`.
- **Yellow:** `<?= $this->extend('layout/main') ?>` without `endSection` → error.
- **Red:** `view('products')` without `$data` → `$products` undefined.

---

## Challenge

**Shop Layout:** Build `layout/main` + `products` + `contact` (2 views sharing one) + `esc` all output, `php spark serve` screenshot.
- **Link-up (Week 2 — Controllers & Routing):** plug this challenge's result into that flow; make sure it runs end-to-end.

---
## Mini Glossary

- **view/esc**: send & secure
- **extend/section**: inherit

---

## Summary

Week 3 of 5: **Inherited Showcase** (Level: Beginner). Kitchen & showcase separated. Next: **Models & Database** — racks.
