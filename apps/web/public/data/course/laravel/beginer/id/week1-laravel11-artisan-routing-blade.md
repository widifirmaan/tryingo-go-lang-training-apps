# Modern Laravel 11: Struktur Ramping, Artisan & Komponen Blade

> **Kategori:** Laravel Framework | **Level:** Pemula | **Minggu 1:** Modern Laravel 11: Struktur Ramping, Artisan & Komponen Blade
> ⏱️ **Estimasi Belajar:** 45 Menit (15m teori, 30m praktik) | 🔗 **Tingkat:** Terstruktur (Step-by-step)


## Tujuan Pembelajaran

- Memahami struktur direktori ramping Laravel 11 (penghapusan `Kernel.php` dan migrasi middleware ke `bootstrap/app.php`).
- Menguasai Artisan CLI untuk pembuatan controller, model, dan migration secara otomatis.
- Membangun sistem UI modular menggunakan Blade Components (`<x-product-card />`) dan `@props()`.
- Mengonfigurasi named routes dan URL generation yang fleksibel.

---

## Panduan Mulai Cepat (Quick Start): Setup & Inisialisasi Project

Sebelum mulai mendalami materi dan praktik kode di bawah, siapkan lingkungan pengembangan lokal Anda di komputer dengan langkah-langkah praktis berikut:

### 1. Persiapan Editor VS Code & Ekstensi Rekomendasi
Gunakan [Visual Studio Code](https://code.visualstudio.com/) sebagai code editor utama. Pasang ekstensi penting berikut:
- **PHP Intelephense** (`bmewburn.vscode-intelephense-client`): Dukungan bahasa PHP dan autocomplete method
- **Laravel Blade Snippets** (`onecentlin.laravel5-snippets`): Syntax highlighting & format file .blade.php

Atau instal semua ekstensi rekomendasi sekaligus via terminal:
```bash
code --install-extension bmewburn.vscode-intelephense-client --install-extension onecentlin.laravel5-snippets
```

---

### 2. Instalasi Runtime & Dependency (PHP 8.2+ & Composer)
Pastikan runtime atau SDK telah terpasang di sistem operasi Anda:

**Windows (PowerShell):**
```powershell
winget install PHP.PHP.8.3 && winget install Composer.Composer
```

**macOS (Terminal / Homebrew):**
```bash
brew install php composer
```

**Linux (Ubuntu/Debian / bash):**
```bash
sudo apt install -y php8.3-cli php8.3-curl php8.3-mbstring php8.3-xml composer
```

**Verifikasi Instalasi:**
Jalankan perintah berikut di terminal:
```bash
php -v && composer -v
```

Output yang diharapkan:
```output
PHP 8.x
Composer 2.x
```

> 💡 **Tips Prasyarat:** Laravel membutuhkan ekstensi php-curl, php-mbstring, dan php-xml aktif.

---

### 3. Inisialisasi Project Kosong (Scaffolding)
Buat folder dan kerangka awal project baru dengan perintah resmi:

```bash
composer create-project laravel/laravel my-laravel-app
cd my-laravel-app
```
- **Keterangan:** Men-download skeleton resmi Laravel, men-generate application key, dan menyiapkan file .env.
- **Pindah ke direktori project:**
```bash
cd my-laravel-app
```

---

### 4. Menjalankan Server Lokal & File Titik Masuk Pertama
Jalankan server pengembangan lokal:

```bash
php artisan serve
```
Akses di browser atau terminal: `http://127.0.0.1:8000`

> ℹ️ Server Laravel development aktif di port 8000.

**File Titik Masuk Utama (`routes/web.php`):**
```php
<?php

use Illuminate\Support\Facades\Route;

Route::get('/', function () {
    return response()->json([
        'framework' => 'Laravel ' . app()->version(),
        'status' => 'active',
        'message' => 'Selamat datang di aplikasi Laravel pertama Anda!'
    ]);
});
```
Route closure sederhana yang mengembalikan respon JSON.

---

### 5. Struktur Direktori Proyek Baru
Struktur folder dan file standar yang dihasilkan:

```text
my-laravel-app/
├── app/
│   ├── Http/Controllers/
│   └── Models/          # Model Eloquent ORM
├── routes/
│   ├── web.php          # Route tampilan web
│   └── api.php          # Route REST API
├── database/
│   └── migrations/      # Skema database terkelola
├── resources/views/     # Template Blade (.blade.php)
├── .env                 # Konfigurasi database & environment
└── artisan              # CLI tool pembantu Laravel
```
Arsitektur MVC (Model-View-Controller) Laravel yang sangat terstruktur.

---

### 6. Tips & Best Practice untuk Pemula
- Gunakan `php artisan make:model Product -mcr` untuk membuat Model, Migration, dan Controller Resource sekaligus.
- Jalankan `php artisan migrate` untuk mengeksekusi seluruh migrasi database yang tertunda.

---

## Program: Katalog Etalase Marketplace dengan Komponen Blade & Routing Dinamis

```php
<?php
// routes/web.php (Laravel 11: Konfigurasi Ramping Tanpa Kernel.php)
use Illuminate\Support\Facades\Route;

Route::get('/', function () {
    $featuredProducts = [
        ['id' => 1, 'slug' => 'vps-cloud-pro', 'name' => 'High-Speed Cloud VPS 8GB', 'price' => 350000, 'vendor' => 'IndoCloud'],
        ['id' => 2, 'slug' => 'mechanical-kb',  'name' => 'Custom Mechanical Keyboard', 'price' => 1250000, 'vendor' => 'KeyCraft Store'],
        ['id' => 3, 'slug' => '4k-monitor-pro', 'name' => 'UltraSharp 27" 4K Monitor',  'price' => 6400000, 'vendor' => 'Digital Tech'],
    ];

    return view('marketplace.catalog', compact('featuredProducts'));
})->name('catalog.home');

// resources/views/components/product-card.blade.php (Blade Component System)
$bladeComponentSample = <<<'BLADE'
@props(['product'])

<div class="border rounded-xl p-5 shadow-sm hover:shadow-md transition bg-white">
    <div class="flex justify-between items-start mb-2">
        <span class="text-xs font-semibold px-2 py-1 bg-emerald-100 text-emerald-800 rounded">
            {{ $product['vendor'] }}
        </span>
        <span class="font-bold text-slate-900 text-lg">
            Rp {{ number_format($product['price'], 0, ',', '.') }}
        </span>
    </div>
    <h3 class="font-bold text-slate-800 text-base mb-4">{{ $product['name'] }}</h3>
    <a href="/products/{{ $product['slug'] }}" 
       class="block text-center w-full py-2 bg-slate-900 text-white font-medium rounded-lg hover:bg-slate-800">
        Beli Sekarang
    </a>
</div>
BLADE;

echo "=== LARAVEL 11 STREAMLINED ROUTING & BLADE COMPONENTS INITIALIZED ===\n";
```

---

## Konsep Kunci

Laravel adalah framework PHP paling populer di dunia, dicintai jutaan developer karena sintaksnya yang elegan, produktivitas tinggi, dan ekosistemnya yang sangat kaya.

### Evolusi Struktur Laravel 11
Laravel 11 merampingkan arsitektur secara radikal:
- Menghapus folder `app/Http/Middleware/` dan file `Kernel.php`.
- Seluruh konfigurasi middleware, routing, dan exception handling terpusat secara deklaratif di satu file bersih: `bootstrap/app.php`.
- Mengurangi file konfigurasi bawaan di `config/`, hanya memuat konfigurasi yang benar-benar Anda modifikasi.

### Blade Component System
Blade di Laravel modern bukan sekadar template engine jadul dengan `@include`. Dengan **Blade Components**, kita dapat membuat komponen seperti `<x-product-card :product="$item" />`. Parameter dilewatkan secara type-safe melalui direktif `@props(['product'])`, memungkinkan pembuatan design system antarmuka marketplace yang sangat rapi dan reusable.


---

---

## Penjelasan untuk Pemula

Bayangkan Anda membangun toko mainan. Laravel 11 seperti paket furnitur toko modern yang sudah terakit rapi di dinding tanpa kabel-kabel berserakan (struktur ramping). Dan Blade Component seperti balok etalase kaca portabel yang bisa Anda pasang di 10 sudut toko berbeda tanpa perlu membuat etalasenya dari kayu mentah berulang kali.

## Eksperimen

- Jalankan perintah `php artisan make:component ProductCard` dan amati berkas view yang dihasilkan.
- Daftarkan route baru di `routes/web.php` yang menerima parameter dinamis `{slug}`.
- Gunakan helper `route("catalog.home")` di dalam template Blade untuk menghasilkan tautan absolut aman.

---

## Tantangan

Buat Blade Component layout induk `<x-layout.marketplace>` yang menyertakan navigasi keranjang belanja dinamis dan slot utama `{{ $slot }}`.

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

Kamu telah menguasai struktur baru Laravel 11, Artisan CLI, dan Blade Components. Minggu depan kita masuk ke Eloquent ORM dan relasi database antar-tabel.
