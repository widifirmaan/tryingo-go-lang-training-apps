# Modern Laravel 11: Struktur Ramping, Artisan & Komponen Blade

> **Kategori:** Laravel Framework | **Level:** Pemula | **Minggu 1:** Modern Laravel 11: Struktur Ramping, Artisan & Komponen Blade

## Tujuan Pembelajaran

- Memahami struktur direktori ramping Laravel 11 (penghapusan `Kernel.php` dan migrasi middleware ke `bootstrap/app.php`).
- Menguasai Artisan CLI untuk pembuatan controller, model, dan migration secara otomatis.
- Membangun sistem UI modular menggunakan Blade Components (`<x-product-card />`) dan `@props()`.
- Mengonfigurasi named routes dan URL generation yang fleksibel.

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

## Ringkasan

Kamu telah menguasai struktur baru Laravel 11, Artisan CLI, dan Blade Components. Minggu depan kita masuk ke Eloquent ORM dan relasi database antar-tabel.
