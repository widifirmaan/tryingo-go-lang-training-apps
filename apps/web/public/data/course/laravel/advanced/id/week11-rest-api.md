# REST API — Warung Online Laravel

> **Kategori:** Laravel | **Level:** Lanjutan | **Minggu 11:** REST API

## Tujuan Pembelajaran

- `php artisan make:controller Api/ProdukController --api` + `Route::apiResource` jadi JSON

---

## Program

```php
// routes/api.php
Route::apiResource('produk', App\Http\Controllers\Api\ProdukController::class);

// Controller
public function index(){ return Produk::all(); }
public function store(Request $req){ return Produk::create($req->validated()); }
```

`curl http://localhost:8000/api/produk` → JSON.

---

## Ringkasan

Minggu 11: **API Laravel** — `apiResource`.
