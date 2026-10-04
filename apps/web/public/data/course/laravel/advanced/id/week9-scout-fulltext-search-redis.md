# Pencarian Cepat: Laravel Scout, Meilisearch & Queue Monitoring Horizon

> **Kategori:** Laravel Framework | **Level:** Lanjutan | **Minggu 9:** Pencarian Cepat: Laravel Scout, Meilisearch & Queue Monitoring Horizon
> ⏱️ **Estimasi Belajar:** 45 Menit (15m teori, 30m praktik) | 🔗 **Tingkat:** Terstruktur (Step-by-step)


## Tujuan Pembelajaran

- Mengintegrasikan Laravel Scout untuk pencarian full-text berkecepatan tinggi dengan Meilisearch / Algolia.
- Mengonfigurasi trait `Searchable` dan kustomisasi payload `toSearchableArray()`.
- Menerapkan fitur pencarian toleran saltik (Typo-Tolerance) dan faceted filtering.
- Mengonfigurasi Laravel Horizon untuk memantau performa antrean Redis dan job metrics secara grafis.

---

## Program: Mesin Pencari Produk Marketplace Toleran Typo dengan Laravel Scout

```php
<?php
// app/Models/Product.php (Menggunakan Laravel Scout)
namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Laravel\Scout\Searchable;

class Product extends Model {
    use Searchable; // Mengaktifkan sinkronisasi otomatis ke search engine

    // Menentukan array atribut yang diindeks untuk pencarian teks penuh
    public function toSearchableArray(): array {
        return [
            'id'          => (int) $this->id,
            'title'       => $this->title,
            'description' => $this->description,
            'price'       => (float) $this->price,
            'vendor_name' => $this->store?->store_name,
            'in_stock'    => $this->stock > 0,
        ];
    }
}

// Controller Handler Pencarian Instan
class ProductSearchController {
    public function search(string $keyword) {
        // Melakukan pencarian full-text dengan toleransi salah ketik (typo-tolerance)
        // melalui Meilisearch / Algolia engine
        $results = Product::search($keyword)
            ->where('in_stock', true)
            ->paginate(20);

        return response()->json([
            'query' => $keyword,
            'total_hits' => $results->total(),
            'hits' => $results->items()
        ]);
    }
}

// Konfigurasi Laravel Horizon (Dashboard Pemantau Antrean Redis Real-Time)
// config/horizon.php:
// 'environments' => [
//     'production' => [
//         'supervisor-1' => [
//             'connection' => 'redis',
//             'queue' => ['high', 'default', 'low'],
//             'balance' => 'auto',
//             'maxProcesses' => 16,
//             'tries' => 3,
//         ],
//     ],
// ]

echo "=== LARAVEL SCOUT FULL-TEXT SEARCH & HORIZON MONITOR TERKONFIGURASI ===\n";
```

---

## Konsep Kunci

Ketika sebuah marketplace menampung 500.000 produk dari ribuan vendor, menggunakan kueri SQL `WHERE title LIKE '%keyword%'` adalah resep bencana: kueri tersebut memicu Full Table Scan yang membuat database PostgreSQL/MySQL macet seketika dan tidak mendukung toleransi salah ketik (typo tolerance).

### Laravel Scout & Meilisearch
**Laravel Scout** menyediakan abstraksi pencarian deklaratif untuk Eloquent. Dengan menambahkan trait `Searchable`, setiap kali produk dibuat, diperbarui, atau dihapus, Scout secara otomatis menyinkronkan data ke search engine khusus seperti **Meilisearch** di background via queues. Meilisearch memberikan hasil pencarian dalam waktu di bawah 10 milidetik dan tetap menemukan produk meskipun pengguna salah mengetik huruf.

### Monitoring Produksi dengan Laravel Horizon
Pada sistem skala enterprise dengan jutaan job antrean per hari, Anda butuh visibilitas penuh. **Laravel Horizon** menyediakan dashboard grafis real-time yang memantau throughput job per menit, metrik kegagalan antrean, dan secara otomatis melakukan auto-scaling jumlah proses worker saat terjadi lonjakan pesanan.


---

---

## Penjelasan untuk Pemula

Bayangkan mencari nama teman di buku telepon tebal 1.000 halaman. Kueri SQL LIKE seperti membaca baris per baris dari halaman 1 sampai halaman 1.000 (sangat lambat dan lelah). Laravel Scout dan Meilisearch seperti mengetik nama teman di kontak smartphone: dalam 0,01 detik nomor teleponnya langsung muncul, bahkan jika Anda salah mengetik satu huruf sekalipun.

## Eksperimen

- Jalankan perintah `php artisan scout:import "App\Models\Product"` untuk mengindeks seluruh data database ke search engine.
- Akses dashboard Laravel Horizon di browser pada `/horizon` dan pantau metrik worker antrean.
- Uji coba pencarian dengan kata kunci salah ketik (misal: "mchanicil kybord") dan buktikan produk tetap ditemukan.

---

## Tantangan

Konfigurasikan faceted filter di Meilisearch sehingga pengguna dapat memfilter hasil pencarian berdasarkan rentang harga (`price <= 500000`) dan rating toko secara bersamaan.

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
```text
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
```text
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
```text
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
```text
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

Kamu telah menguasai Laravel Scout full-text search dan monitoring antrean dengan Horizon. Minggu depan adalah Capstone Final: Multi-Vendor Marketplace Platform Skala Penuh!
