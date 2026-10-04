# RESTful API Enterprise: Eloquent API Resources & Laravel Sanctum

> **Kategori:** Laravel Framework | **Level:** Menengah | **Minggu 5:** RESTful API Enterprise: Eloquent API Resources & Laravel Sanctum
> ⏱️ **Estimasi Belajar:** 45 Menit (15m teori, 30m praktik) | 🔗 **Tingkat:** Terstruktur (Step-by-step)


## Tujuan Pembelajaran

- Memahami peran Eloquent API Resources sebagai layer transformasi pemisah antara database dan JSON.
- Mencegah kebocoran data sensitif (password hash, secret keys) dengan kontrol atribut eksplisit.
- Menggunakan metode `$this->whenLoaded("relation")` untuk mencegah query N+1 di API response.
- Mengamankan endpoint mobile dan SPA menggunakan token autentikasi ringan Laravel Sanctum.

---

## Program: API Katalog Produk Marketplace Terotentikasi Sanctum Token dengan API Resources

```php
<?php
// app/Http/Resources/ProductResource.php
namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class ProductResource extends JsonResource {
    // Transformasi Model Eloquent menjadi JSON Terstandarisasi
    public function toArray(Request $request): array {
        return [
            'id'           => $this->id,
            'title'        => $this->title,
            'slug'         => $this->slug,
            'price_idr'    => (float) $this->price,
            'formatted'    => 'Rp ' . number_format((float) $this->price, 0, ',', '.'),
            'stock'        => (int) $this->stock,
            'is_in_stock'  => $this->stock > 0,
            
            // Relasi hanya dimuat jika sudah di-eager load (mencegah N+1 di API)
            'store'        => new StoreResource($this->whenLoaded('store')),
            
            'links'        => [
                'self' => url("/api/v1/products/{$this->slug}"),
            ]
        ];
    }
}

// routes/api.php dengan Proteksi Sanctum & Rate Limiting
use Illuminate\Support\Facades\Route;

Route::middleware(['auth:sanctum', 'throttle:api'])->prefix('v1')->group(function () {
    Route::get('/user/profile', function (Request $request) {
        return response()->json($request->user());
    });

    // Endpoint Katalog Produk Publik (Cached & Throttled)
    Route::get('/products', function () {
        // $products = Product::with('store')->where('stock', '>', 0)->paginate(15);
        // return ProductResource::collection($products);
        return response()->json(['status' => 'OK', 'message' => 'API Resources Active']);
    });
});

echo "=== ELOQUENT API RESOURCES & SANCTUM MIDDLEWARE TERKONFIGURASI ===\n";
```

---

## Konsep Kunci

Mengembalikan model Eloquent langsung dari controller (`return Product::all();`) adalah kebiasaan buruk yang berbahaya. Jika ada penambahan kolom sensitif di tabel database, kolom tersebut bisa tidak sengaja bocor ke publik dalam respons JSON.

### Keunggulan Eloquent API Resources
**API Resources** bertindak sebagai filter dan transformator data resmi:
- Memformat angka harga menjadi format mata uang yang ramah pengguna.
- Membuka kontrol penuh atas nama field JSON tanpa harus mengubah nama kolom di database.
- Menyediakan method kondisional sakti `$this->whenLoaded('store')`: relasi toko hanya akan dimasukkan ke JSON jika query controller secara eksplisit melakukan eager loading (`Product::with('store')`), melindungi API dari kueri tersembunyi yang lambat.

### Autentikasi Modern dengan Laravel Sanctum
**Laravel Sanctum** menyediakan sistem otentikasi token yang sangat ringan untuk Single Page Applications (React, Vue) dan aplikasi mobile (Flutter, iOS, Android). Sanctum memungkinkan pengguna menghasilkan token API (Personal Access Tokens) dengan batasan izin (token abilities) tanpa kerumitan server OAuth2 yang berat.


---

---

## Penjelasan untuk Pemula

Bayangkan toko perhiasan mewah. Di gudang brankas belakang (Database), ada dokumen rahasia harga beli pabrik dan nomor sertifikat distributor. Resepsionis etalase depan (API Resource) hanya menunjukkan kalung emas, kartu nama toko, dan harga jual resmi ke calon pembeli, tanpa pernah memperlihatkan dokumen rahasia gudang kepada orang luar.

## Eksperimen

- Buat token Sanctum menggunakan `$user->createToken("mobile-app", ["products:read"])->plainTextToken`.
- Kirim request dengan header `Authorization: Bearer <token>` menggunakan cURL dan amati verifikasi Sanctum.
- Gunakan `ProductResource::collection($products)` untuk memformat koleksi data terpaginasi otomatis.

---

## Tantangan

Konfigurasikan pembatasan kemampuan token Sanctum (Token Abilities): buat token khusus kurir yang hanya memiliki izin `orders:update-status` dan tolak akses jika mencoba membuat produk baru.

---

## Model Mental & Diagram Alur Visual

```diagram
┌──────────────────────────────────────────────────────────┐
│ ALUR KERJA SIKLUS LARAVEL                                │
│                                                          │
│ HTTP Request ──► index.php ──► HTTP Kernel               │
│                                     │                    │
│                                     ▼                    │
│                                Middleware                │
│                                     │                    │
│                                     ▼                    │
│                           Router (web.php/api.php)       │
│                                     │                    │
│                                     ▼                    │
│                           Controller / Action            │
│                            │              │              │
│                            ▼              ▼              │
│                   Eloquent ORM (Model)  Blade Template   │
│                            │              │              │
│                            ▼              ▼              │
│                         Database     HTTP Response       │
└──────────────────────────────────────────────────────────┘
```

---

## Panduan Sintaks & Referensi Lengkap (W3Schools Style)

Berikut adalah rincian sintaks, parameter, nilai kembalian, dan contoh penggunaan praktis yang diperkenalkan pada modul ini:

### 1. `Route::get('/users', [UserController::class, 'index'])`
- **Fungsi Utama:** Pendaftaran rute HTTP deklaratif.
- **Parameter / Atribut:** `URI pattern, Action Controller array`.
- **Perilaku & Efek Sistem:** Mengarahkan permintaan HTTP GET yang masuk ke method controller yang relevan..
- **Contoh Penggunaan Praktis:**
```php
<?php
use App\Http\Controllers\ProductController;
Route::get('/products', [ProductController::class, 'index'])->name('products.index');
```
- **Hasil Output yang Diharapkan:**
```output
Rute terdaftar dan siap diakses pengguna
```

### 2. `class Product extends Model { protected $fillable = [...]; }`
- **Fungsi Utama:** Model Eloquent ORM & Mass Assignment Guard.
- **Parameter / Atribut:** `$fillable array`.
- **Perilaku & Efek Sistem:** Mendefinisikan entitas database dengan relasi aktif dan perlindungan injeksi mass assignment..
- **Contoh Penggunaan Praktis:**
```php
<?php
namespace App\Models;
use Illuminate\Database\Eloquent\Model;
class Product extends Model {
    protected $fillable = ['title', 'price', 'in_stock'];
}
```
- **Hasil Output yang Diharapkan:**
```output
Model Product siap untuk operasi CRUD Eloquent
```

### 3. `$request->validate(['email' => 'required|email|unique:users'])`
- **Fungsi Utama:** Validasi HTTP request terpusat.
- **Parameter / Atribut:** `Rules array`.
- **Perilaku & Efek Sistem:** Memvalidasi input data pengguna secara otomatis dan mengembalikan error jika tidak memenuhi syarat..
- **Contoh Penggunaan Praktis:**
```php
<?php
$validated = $request->validate([
    'title' => 'required|string|max:255',
    'price' => 'required|numeric|min:0'
]);
```
- **Hasil Output yang Diharapkan:**
```output
Data lolos seleksi atau redirect dengan error session
```

### 4. `return view('products.index', compact('products'))`
- **Fungsi Utama:** Rendering tampilan Blade Template.
- **Parameter / Atribut:** `View path, Data array / compact`.
- **Perilaku & Efek Sistem:** Mengirimkan data dari controller ke template Blade untuk dirender menjadi antarmuka HTML..
- **Contoh Penggunaan Praktis:**
```php
<?php
public function index() {
    $products = Product::where('in_stock', true)->paginate(10);
    return view('products.index', compact('products'));
}
```
- **Hasil Output yang Diharapkan:**
```output
Tampilan daftar produk berhasil disajikan
```

---

## Jebakan Umum & Debugging (Common Pitfalls)

### 1. Mass Assignment Exception
- **Gejala / Masalah:** Muncul error `Add [field] to fillable property to allow mass assignment` saat create/update model.
- **Penyebab Utama:** Logika atau asumsi yang sering keliru pada tahap awal implementasi.
- **Solusi Tepat:** Daftarkan kolom yang aman di properti `protected $fillable = [...]` pada Model Eloquent.

### 2. Menyimpan Logika Bisnis di Controller (Fat Controller)
- **Gejala / Masalah:** Controller menjadi ribet, sulit diuji (*untestable*), dan melanggar prinsip Single Responsibility.
- **Penyebab Utama:** Logika atau asumsi yang sering keliru pada tahap awal implementasi.
- **Solusi Tepat:** Pindahkan logika bisnis ke Action Classes, Service Classes, atau Form Requests.

### 3. Lupa Menjalankan `php artisan config:cache` di Server Produksi
- **Gejala / Masalah:** Pembacaan file konfigurasi secara berulang memperlambat response time aplikasi.
- **Penyebab Utama:** Logika atau asumsi yang sering keliru pada tahap awal implementasi.
- **Solusi Tepat:** Jalankan caching konfigurasi, route, dan view saat pipeline deployment produksi selesai.

---

## Ringkasan

Kamu telah menguasai Eloquent API Resources dan autentikasi token Laravel Sanctum. Minggu depan kita mempelajari Events, Listeners, dan Background Queues.
