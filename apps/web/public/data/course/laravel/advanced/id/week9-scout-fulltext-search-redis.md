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

## Ringkasan Sintaks & Quick Reference

| Perintah / Sintaks | Fungsi & Contoh Praktik |
| :--- | :--- |
| **Deklarasi & Inisialisasi** | Menyiapkan variabel, tipe data, atau struktur komponen awal |
| **Logika & Pemrosesan** | Menjalankan algoritma, kontrol alur, dan transformasi data |
| **Error Handling & Validasi** | Memastikan input valid dan menangani kegagalan sistem secara elegan |
| **Return / Output** | Mengembalikan hasil komputasi yang siap dikonsumsi pengguna/sistem |

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
