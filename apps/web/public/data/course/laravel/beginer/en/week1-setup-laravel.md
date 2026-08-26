# Setup Laravel — Warung Siap Jual dengan Artisan

> **Kategori:** Laravel | **Level:** Pemula | **Minggu 1:** Setup Laravel

## Tujuan Pembelajaran

- Instal `composer create-project laravel/laravel warung`, `php artisan serve` di `localhost:8000`
- Paham `artisan` tukang, `routes/web.php` pintu, `resources/views` etalase, `.env` buku alamat

---

## Kenapa Ini Penting Buat Kamu?

Laravel = PHP warung siap jual: `artisan` bikinkan rak, kasir, admin — tidak dari nol. Paling cepat buat toko online untuk non-IT.

---

## Program: Toko Laravel 5 Menit

```bash
composer create-project laravel/laravel warung
cd warung
php artisan serve
# Buka http://localhost:8000 → Laravel welcome
```

**Buat pintu & etalase:**
```php
// routes/web.php
Route::get('/', function () { return view('welcome'); });
Route::get('/produk', function () {
  $produk = [["nama"=>"Beras","harga"=>62000],["nama"=>"Bayam","harga"=>5000]];
  return view('produk', ["produk"=>$produk]);
});
```

```html
<!-- resources/views/produk.blade.php -->
<h1>Katalog</h1>
<ul>
@foreach($produk as $p)
  <li>{{ $p["nama"] }} - Rp{{ number_format($p["harga"]) }}</li>
@endforeach
</ul>
```

Buka `http://localhost:8000/produk`.

---

## Ringkasan

Minggu 1: **Artisan & Pintu** — Laravel hidup. Minggu depan: **Routing & Controller**.
