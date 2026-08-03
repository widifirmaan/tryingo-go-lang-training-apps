# Caching & Redis

> Laravel | Testing & Produksi | Pelajaran 18

## Tujuan Pembelajaran

- Menyimpan hasil query dengan Cache::remember (key + TTL)
- Memahami berapa lama cache hidup dan kapan harus di-forget
- Menggunakan counter dengan Cache::increment
- Menukar backend cache: file (lokal) vs Redis (produksi)

---

## Program: Caching & Redis

```php
<?php

namespace App\Http\Controllers;

use App\Models\Produk;
use Illuminate\Support\Facades\Cache;

class TokoController extends Controller
{
    public function index()
    {
        $produk = Cache::remember('toko.produk', 60, function () {
            return Produk::with('kategori')->get();
        });

        $terlaris = Cache::remember('toko.terlaris', 300, function () {
            return Produk::orderBy('stok', 'asc')->take(5)->get();
        });

        $kunjungan = Cache::increment('toko.kunjungan', 1);

        return view('toko', compact('produk', 'terlaris', 'kunjungan'));
    }

    public function refresh()
    {
        Cache::forget('toko.produk');
        Cache::forget('toko.terlaris');

        return back()->with('sukses', 'Cache toko dibersihkan.');
    }
}

```

---

## Penjelasan

## remember(): Satu Baris untuk Menyimpan
Cache::remember('toko.produk', 60, fn) = kalau key ada, kembalikan; kalau tidak, jalankan closure, simpan hasilnya selama 60 detik, kembalikan. Query yang berat dijalankan SEKALI per menit, bukan sekali per request. Key = nama unik; TTL = detik.
## Kapan Cache Hidup, Kapan Mati
TTL pendek (detik-menit) untuk data sering berubah, panjang (jam-hari) untuk data jarang berubah. Data yang BERUBAH harus di-invalidate: Cache::forget('toko.produk') saat produk di-create/update/delete - di controller toko ini tombol "Bersihkan Cache" menirunya. TTL tanpa forget = data basi maksimal 60 detik.
## Counter & Angka Kecil
Cache::increment('toko.kunjungan', 1) = operasi atomik: aman diakses banyak request bersamaan (bandingkan read-modify-write manual yang bisa race condition). Cocok untuk hit counter, rate limiting, statistik ringan.
## File vs Redis
CACHE_STORE=file = menyimpan di storage (lokal, tanpa setup). redis = server di memori (cepat, terdistribusi, bisa dipakai BANYAK server aplikasi sekaligus). Ganti 1 baris .env - kode tidak berubah. Untuk memilih: single server kecil = file/array; skala banyak instance = redis.

---

## Eksperimen

1. **remember(): Satu Baris untuk Menyimpan**
2. **Kapan Cache Hidup, Kapan Mati**
3. **Counter & Angka Kecil**
4. **File vs Redis**

---

## Tantangan

Optimasi cache nyata: (1) tambah Cache::remember('toko.halaman', 600, fn) untuk halaman produk TERLARIS dengan cache tag? (tanpa package: pakai key terpisah + forget manual di refresh), (2) buat cache stok dengan locking: Cache::lock('stok.produk.'.$id, 10) di sekitar pengurangan stok untuk mencegah oversell, (3) bandingkan kecepatan: cek waktu respons dengan dan tanpa cache (Chrome DevTools/curl -w "%{time_total}"), (4) tulis README: skenario cache stampede dan solusi lock.

---

## Ringkasan

remember = query sekali, TTL = masa hidup, forget = invalidasi, increment = atomik. Lanjut: Docker & CI/CD.
