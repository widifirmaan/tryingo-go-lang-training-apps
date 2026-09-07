# REST API — Warung Online Laravel

> **Kategori:** Laravel | **Level:** Lanjutan | **Minggu 11:** REST API

## Tujuan Pembelajaran

- `php artisan make:controller Api/ProdukController --api` + `Route::apiResource` jadi JSON

---

## Kenapa Ini Penting Buat Kamu?

HP butuh JSON + Sanctum token (bukan session cookie). Dengan `apiResource` + `Sanctum`, 1 baris 5 pintu + token aman.

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

## Penjelasan untuk Pemula

### Analogi: Drive-Thru Token Laravel
- Lihat Program: jalankan perintahnya, ubah 1 hal, lihat bedanya.

### Langkah 0 — Siapkan Device
- Sama Laravel W1: `php artisan serve` di `8000` (+ paket minggu ini).

### Cara Komputer Membaca
- `Route::apiResource()` 5 pintu; `Sanctum::actingAs` di test; token per HP.

### 3 Istilah Wajib
- 1. **apiResource/Sanctum**: 5-pintu/token

---

## Glosarium Mini

- Lihat Istilah Wajib di atas.

## Ringkasan

Minggu 11: **API Laravel** — `apiResource`.
