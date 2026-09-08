# Laravel Setup — Sell-Ready Shop with Artisan

> **Kategori:** Laravel | **Level:** Beginner | **Minggu 1:** Setup Laravel

## Learning Objectives

- Install `composer create-project laravel/laravel shop`, `php artisan serve` on `localhost:8000`
- Understand `artisan` the worker, `routes/web.php` doors, `resources/views` showcase, `.env` address book

---

## Why This Matters (Non-IT)

Laravel = sell-ready PHP shops: `artisan` builds racks, cashiers, admin — not from zero. Fastest online store for non-IT.

---

## Program: 5-Minute Laravel Store

```bash
composer create-project laravel/laravel shop
cd shop
php artisan serve
# Open http://localhost:8000 → Laravel welcome
```

**Doors & showcase:**
```php
// routes/web.php
Route::get('/', function () { return view('welcome'); });
Route::get('/products', function () {
  $products = [["name"=>"Rice","price"=>62000],["name"=>"Spinach","price"=>5000]];
  return view('products', ["products"=>$products]);
});
```

```html
<!-- resources/views/products.blade.php -->
<h1>Catalog</h1>
<ul>
@foreach($products as $p)
  <li>{{ $p["name"] }} - Rp{{ number_format($p["price"]) }}</li>
@endforeach
</ul>
```

Open `http://localhost:8000/products`.

---

## Key Concepts

### `artisan` / `routes` / `views` / `.env`
`artisan` builds, `routes/web.php` doors, `views` showcase, `.env` secrets.

---

## Beginner Friendly Explanation

### Analogy: Sell-Ready Shop
- **artisan = handyman**: `make:controller`, `make:model` build files for you.

### Step 0 — Prepare Device
- PHP 8.1+ + Composer + `composer create-project laravel/laravel shop`.

### How the Computer Reads It
1. `php artisan serve` → dev server on 8000.
2. `GET /products` → route closure → `view('products')`.

### 3 Must-Know Terms
1. **artisan/route/view**: worker/door/showcase

---

## Experiments

- **Green:** `/products` → catalog lists 2?
- **Yellow:** Change price → refresh shows new?
- **Red:** Wrong view name → `View not found` error? Fix name.

---

## Challenge

**Live Store:** Project + `/products` route + Blade list + `artisan serve` screenshot.

---

## Mini Glossary

- **artisan/route**: worker/door

---

## Summary

Week 1: **Artisan & Doors** — Laravel alive. Next: **Routing & Controller**.
