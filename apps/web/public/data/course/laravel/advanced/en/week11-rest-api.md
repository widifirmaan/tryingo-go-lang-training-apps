# REST API — Online Laravel Shop

> **Kategori:** Laravel | **Level:** Advanced | **Minggu 11:** REST API

## Learning Objectives

- `php artisan make:controller Api/ProductController --api` + `Route::apiResource` becomes JSON

---

## Why This Matters (Non-IT)

Phones need JSON + Sanctum tokens (not session cookies). With `apiResource` + `Sanctum`, 1 line 5 doors + safe tokens.

---

## Program

```php
// routes/api.php
Route::apiResource('products', App\Http\Controllers\Api\ProductController::class);

// Controller
public function index(){ return Product::all(); }
public function store(Request $req){ return Product::create($req->validated()); }
```

`curl http://localhost:8000/api/products` → JSON.


---

## Beginner Friendly Explanation

### Analogy: Laravel Token Drive-Thru
- See Program: run the commands, change 1 thing, see the difference.

### Step 0 — Prepare Device
- Same as Laravel W1: `php artisan serve` on `8000` (+ this week's package).

### How the Computer Reads It
- `Route::apiResource()` 5 doors; `Sanctum::actingAs` in tests; token per phone.

### 3 Must-Know Terms
- 1. **apiResource/Sanctum**: 5-doors/token

---

## Mini Glossary

- See Must-Know Terms above.

## Summary

Week 11: **Laravel API** — `apiResource`. Next: **Capstone**.
