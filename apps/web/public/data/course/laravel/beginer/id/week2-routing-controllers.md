# Routing & Controllers — Pintu dan Pelayan Laravel

> **Kategori:** Laravel | **Level:** Pemula | **Minggu 2:** Routing & Controllers
> **Prasyarat:** Minggu 1 — **Setup Laravel**.

## Tujuan Pembelajaran

- `Route::get('/produk', [ProdukController::class, 'index'])` pintu di `routes/web.php` (sumber: laravel.com/docs/routing)
- `php artisan make:controller ProdukController` buat pelayan, `$request->input('cari')` baca ketikan (sumber: laravel.com/docs/controllers)
- `Route::get('/produk/{id}', ...)` pintu dinamis

---

## Kenapa Ini Penting Buat Kamu?

Tanpa route, `http://localhost:8000/produk` 404 meski controller sudah benar. Tanpa controller, semua logika di route closure → `web.php` 500 baris berantakan. Pisah: route = papan pintu (1 baris), controller = pelayan (logika).

---

## Program: Pintu & Pelayan Warung

```bash
php artisan make:controller ProdukController
```

```php
// routes/web.php — papan pintu (1 baris per pintu)
use App\Http\Controllers\ProdukController;

Route::get('/', function () { return view('welcome'); });
Route::get('/produk', [ProdukController::class, 'index']);
Route::get('/produk/{id}', [ProdukController::class, 'show']);
```

```php
// app/Http/Controllers/ProdukController.php — pelayan
namespace App\Http\Controllers;
use Illuminate\Http\Request;

class ProdukController extends Controller {
  private $daftar = [
    ["id" => 1, "nama" => "Beras", "harga" => 62000],
    ["id" => 2, "nama" => "Bayam", "harga" => 5000],
  ];

  public function index(Request $req) {
    $cari = $req->input('cari', '');
    $produk = $cari
      ? array_filter($this->daftar, fn($p) => str_contains(strtolower($p["nama"]), strtolower($cari)))
      : $this->daftar;
    return view('produk', ["produk" => $produk, "cari" => $cari]);
  }

  public function show($id) {
    foreach ($this->daftar as $p) if ($p["id"] == $id) return view('detail', ["p" => $p]);
    abort(404);
  }
}
```

Buka `http://localhost:8000/produk` → semua. `?cari=beras` → saring. `/produk/1` → detail.

---

## Konsep Kunci

### `Route::get()` = Papan Pintu
`Route::get('/produk', [ProdukController::class, 'index'])` — GET `/produk` → method `index`.

### Controller = Pelayan
`index(Request $req)` terima `$req`, `view('produk', [...])` antar. `$req->input('cari')` baca ketikan.

### `{id}` = Pintu Dinamis
`/produk/{id}` → `show($id)`. `abort(404)` jika tidak ada.

---

## Penjelasan untuk Pemula

### Analogi: Restoran
- **routes/web.php = papan pintu**: "/produk → pelayan Produk, meja index".
- **Controller = pelayan**: ambil dari dapur, antar ke meja (`view`).

### Langkah 0 — Siapkan Device
- Sama W1: `php artisan serve` di `8000`.

### Cara Komputer Membaca
1. `GET /produk?cari=beras` → `web.php` cocok `get('/produk')` → `index($req)`.
2. `$req->input('cari')` = "beras" → `array_filter` → `view('produk')`.

### 3 Istilah Wajib
1. **Route**: pintu (1 baris)
2. **Controller**: pelayan (logika)
3. **Request**: pesanan masuk

---

## Eksperimen

- **Hijau:** Buka `/produk/2` → Bayam? `/produk/99` → 404?
- **Kuning:** `?cari=BAYAM` kapital → tetap ketemu? (`strtolower` dua sisi)
- **Merah:** Hapus `use App\Http\Controllers\ProdukController;` → error `Class not found`? Pasang lagi.

---

## Tantangan

**Warung 3 Pintu:** `get('/')` sambutan, `get('/produk')` + `?cari`, `get('/produk/{id}')` detail + `abort(404)`. `php artisan route:list` screenshot 3 pintu.
- **Sambungan (Minggu 1 — Setup Laravel):** pasang hasil tantangan ini ke alur itu; pastikan ujung-ke-ujung jalan.

---
## Glosarium Mini

- **Route/Controller/Request**: pintu/pelayan/pesanan
- **{id}/abort**: dinamis/gagal

---

## Ringkasan

Minggu 2 dari 4: **Pintu & Pelayan** (Level: Pemula). Bisa tampilkan + cari + detail. Minggu depan: **Blade** — etalase warisi.
