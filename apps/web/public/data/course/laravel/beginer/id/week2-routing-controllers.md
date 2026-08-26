# Routing & Controllers — Pintu dan Pelayan

> **Kategori:** Laravel | **Level:** Pemula | **Minggu 2:** Routing & Controllers

## Tujuan Pembelajaran

- `Route::get('/produk/{id}', [ProdukController::class,'show'])` pintu dinamis
- `php artisan make:controller ProdukController` buat pelayan, `request()->input('cari')` baca cari

---

## Program

```php
// Buat controller
// php artisan make:controller ProdukController

// app/Http/Controllers/ProdukController.php
public function index(Request $req){
  $cari = $req->input('cari');
  $produk = $cari ? Produk::where('nama','like',"%$cari%")->get() : Produk::all();
  return view('produk', compact('produk'));
}
public function show($id){ return "Detail $id"; }

// routes/web.php
Route::get('/produk', [ProdukController::class,'index']);
Route::get('/produk/{id}', [ProdukController::class,'show']);
```

Buka `http://localhost:8000/produk?cari=beras`.

---

## Ringkasan

Minggu 2: **Pintu & Pelayan** — routing & controller.
