# Migrations & Eloquent Dasar

> Laravel | Fondasi Laravel | Pelajaran 4

## Tujuan Pembelajaran

- Membuat tabel dengan migration (schema versioning) dan menjalankannya
- Menulis Eloquent Model: $fillable, $casts, query dasar
- Menggunakan route model binding: {produk} → Produk $produk
- Menjalankan perintah artisan make:migration dan tinker

---

## Program: Migrations & Eloquent Dasar

```php
<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Produk extends Model
{
    use HasFactory;

    protected $fillable = ['nama', 'harga', 'stok', 'tersedia', 'kategori_id'];

    protected $casts = [
        'tersedia' => 'boolean',
        'harga' => 'decimal:2',
    ];
}

```

---

## Penjelasan

## Migration: Skema sebagai Versi
Migration = file PHP yang mendeskripsikan perubahan skema, dieksekusi dengan php artisan migrate. Tabel dibuat dari kode, bukan SQL manual. Ini memungkinkan tim sinkron: setiap orang menjalankan migrate dan mendapat database yang sama. down() membatalkan perubahan (rollback).
## Eloquent: Model = Tabel
class Produk extends Model → objek Produk mewakili baris tabel produks. Tanpa konfigurasi: nama class jamak = nama tabel (Produk → produks). $fillable = daftar kolom yang boleh diisi massal (keamanan mass assignment). $casts = transformasi otomatis: tersedia jadi boolean, harga jadi decimal.
## Query Builder yang Manusiawi
Produk::all() (semua baris), Produk::find(1), Produk::where('stok', '>', 0)->get(), count(), firstOrFail(). Setiap query mengembalikan Collection - bisa di-loop langsung di blade.
## Route Model Binding
{produk} + type hint Produk $produk → Laravel otomatis mencari Produk::findOrFail($id) - kalau tidak ada, otomatis 404. Tanpa binding, Anda menulis pencarian manual di setiap controller.

---

## Eksperimen

1. **Migration: Skema sebagai Versi**
2. **Eloquent: Model = Tabel**
3. **Query Builder yang Manusiawi**
4. **Route Model Binding**

---

## Tantangan

Bangun model kedua: (1) buat migration tabel ulasans (produk_id FK, isi text, bintang 1-5) + model Ulasan, (2) tampilkan ulasan di halaman detail produk dengan @forelse, (3) tambah scopeTersedia() di Produk dan pakai di route /produk, (4) tambah kolom diskon_persen (nullable) lewat migration baru - jangan edit migration lama!

---

## Ringkasan

Migration = skema versioned. Eloquent = tabel sebagai object. Binding = 404 otomatis. Lanjut: relationships.
