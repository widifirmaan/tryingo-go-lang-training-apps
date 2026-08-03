# Eloquent Relationships: 1-N & N-N

> Laravel | Data & CRUD | Pelajaran 5

## Tujuan Pembelajaran

- Mendefinisikan hasMany, belongsTo, dan belongsToMany
- Memakai relasi sebagai properti: $produk->kategori (lazy load)
- Menghindari N+1 dengan with() (eager loading)
- Menggunakan scope untuk query yang bisa dipakai ulang

---

## Program: Eloquent Relationships: 1-N & N-N

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
    ];

    public function kategori()
    {
        return $this->belongsTo(Kategori::class);
    }

    public function tags()
    {
        return $this->belongsToMany(Tag::class);
    }

    public function scopeTersedia($query)
    {
        return $query->where('tersedia', true);
    }
}

```

---

## Penjelasan

## Relasi sebagai Bahasa
Produk belongsTo Kategori (punya kategori_id), Kategori hasMany Produk (satu kategori punya banyak produk), Produk belongsToMany Tag (many-to-many via tabel pivot produk_tag). Setelah didefinisikan, relasi dipakai seperti properti: $produk->kategori mengembalikan objek Kategori, $produk->tags mengembalikan Collection.
## Eager Loading vs N+1
Loop 30 produk + akses $produk->kategori di dalamnya = 1 query produk + 30 query kategori = 31 query (masalah N+1). Produk::with('kategori') memuat semuanya dalam 2 query via JOIN. Aturan: di dalam @foreach, gunakan with() di controller - dan observasi jumlah query dengan debugbar/telescope.
## Query Relasi
$kategori->produk()->where('tersedia', true)->get() memfilter anak dari relasi (query builder penuh tetap tersedia). Relasi bisa dirantai: Produk::with('kategori.produk')->get().
## Scope: Query Bernama
scopeTersedia() memungkinkan Produk::tersedia()->get() - filter yang dibungkus nama deskriptif, dipakai ulang di banyak controller. Ini pola kunci kode Eloquent yang bersih.

---

## Eksperimen

1. **Relasi sebagai Bahasa**
2. **Eager Loading vs N+1**
3. **Query Relasi**
4. **Scope: Query Bernama**

---

## Tantangan

Perkuat relasi: (1) buat relasi Ulasan (produk hasMany ulasan, ulasan belongsTo produk + pengguna) dan tampilkan rata-rata bintang via withAvg, (2) tambah relasi kategoris pada Tag (belongsToMany kategori) - ya, relasi antar pivot boleh, (3) buat halaman statistik yang menampilkan jumlah produk per kategori memakai withCount, (4) tambahkan scopeHargaBawah(15000) dan pakai di route.

---

## Ringkasan

Relasi = bahasa. with() lawan N+1. Scope = query bernama. Lanjut: validasi & form requests.
