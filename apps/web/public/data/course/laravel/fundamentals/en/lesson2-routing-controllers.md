# Routing & Controllers

> Laravel | Laravel Fundamentals | Lesson 2

## Learning Objectives

- Write routes with parameters, named routes, and constraints
- Move logic from closures into controllers (the MVC pattern)
- Use route groups with prefixes and middleware
- Build a custom 404 page with Route::fallback

---

## Program: Routing & Controllers

```php
<?php

use App\Http\Controllers\ProdukController;
use Illuminate\Support\Facades\Route;

Route::get('/', [ProdukController::class, 'index']);

// Parameter route: {produk} diteruskan ke method
Route::get('/produk/{produk}', [ProdukController::class, 'detail'])
    ->whereNumber('produk')
    ->name('produk.detail');

// Constraint regex: hanya huruf
Route::get('/produk/kategori/{kategori}', [ProdukController::class, 'perKategori'])
    ->whereAlpha('kategori')
    ->name('produk.kategori');

// Group: prefix + middleware berlaku untuk semua route di dalamnya
Route::prefix('admin')->middleware('auth')->group(function () {
    Route::get('/produk', [ProdukController::class, 'kelola'])->name('admin.produk');
});

// Fallback untuk URL yang tidak cocok
Route::fallback(function () {
    return response('Halaman tidak ditemukan', 404);
});

```

---

## Explanation

## Controllers: Separating the Web from Logic
Routes contain ONLY the URL → [Controller::class, 'method'] mapping. Methods receive URL parameters in order. Controllers extend the base Controller class to unlock middleware and validation (lesson 10).
## Parameters & Constraints
{produk} captures a URL segment and passes it as int $produk - the int type hint makes Laravel automatically reject non-numeric URLs (404). whereNumber()/whereAlpha() = explicit constraints. Route::fallback catches all unknown URLs → full control of the 404 page.
## Named Routes: Anti-Broken-Link
->name('produk.detail') gives the route an identity. Blade uses route('produk.detail', $id) - when the URL changes, the whole app follows without editing a single template. Rule: NEVER write URL strings in blade.
## Groups: Batching Config
Route::prefix('admin') adds the prefix to every child. ->middleware('auth') protects all admin routes at once (used in lesson 10). Groups reduce duplication and prevent forgotten protection.

---

## Experiments

1. **Controllers: Separating the Web from Logic**
2. **Parameters & Constraints**
3. **Named Routes: Anti-Broken-Link**
4. **Groups: Batching Config**

---

## Challenge

Extend the catalog: (1) add a /produk/{produk}/ulasan route with whereNumber showing dummy reviews from the controller, (2) add a produk.baru named route for a create form, (3) build an /api group with a route returning response()->json($produk), (4) build a custom 404 page with a view and free design.

---

## Summary

Controllers = logic. Named routes = anti-broken-link. Groups = batching. Next: Blade.
