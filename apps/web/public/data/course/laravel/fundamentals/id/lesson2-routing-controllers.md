# Routing & Controllers

> Laravel | Fondasi Laravel | Pelajaran 2

## Tujuan Pembelajaran

- Menulis route dengan parameter, named routes, dan constraints
- Memindahkan logika dari closure ke controller (pola MVC)
- Menggunakan route groups dengan prefix dan middleware
- Membuat halaman 404 custom dengan Route::fallback

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

## Penjelasan

## Controller: Memisahkan Web dari Logika
Route berisi HANYA pemetaan URL → [Controller::class, 'method']. Method menerima parameter URL sesuai urutan. Controller memakai class Controller bawaan agar bisa menggunakan middleware dan validasi (pada lesson berikutnya).
## Parameter & Constraint
{produk} menangkap segmen URL dan mengirimnya sebagai int $produk - Type Hint int membuat Laravel otomatis menolak URL non-angka (404). whereNumber()/whereAlpha() = constraint eksplisit. Route::fallback menangkap semua URL tak dikenal → kontrol penuh atas halaman 404.
## Named Routes: Anti-Broken-Link
->name('produk.detail') memberi identitas route. Blade memakai route('produk.detail', $id) - saat URL berubah, seluruh aplikasi mengikuti tanpa edit satu pun template. Rule: JANGAN menulis URL string di blade.
## Group: Batching Config
Route::prefix('admin') menambahkan prefix ke semua anaknya. ->middleware('auth') melindungi semua route admin sekaligus (dipakai lesson 10). Group mengurangi duplikasi dan mencegah lupa proteksi.

---

## Eksperimen

1. **Controller: Memisahkan Web dari Logika**
2. **Parameter & Constraint**
3. **Named Routes: Anti-Broken-Link**
4. **Group: Batching Config**

---

## Tantangan

Perluas katalog: (1) tambah route /produk/{produk}/ulasan dengan whereNumber dan tampilkan daftar ulasan dummy dari controller, (2) tambah named route produk.baru untuk form create, (3) buat group /api dengan prefix dan route yang mengembalikan response()->json($produk), (4) buat halaman 404 custom dengan view dan desain bebas.

---

## Ringkasan

Controller = logika. Named route = anti-broken-link. Group = batching. Lanjut: Blade.
