# Eloquent ORM: Migrasi Skema, Model Relationships & Database Factories

> **Kategori:** Laravel Framework | **Level:** Pemula | **Minggu 2:** Eloquent ORM: Migrasi Skema, Model Relationships & Database Factories

## Tujuan Pembelajaran

- Menguasai Eloquent ORM: Active Record pattern paling intuitif dan ekspresif di dunia web.
- Mendefinisikan relasi database: `hasMany`, `belongsTo`, `belongsToMany`, dan `hasManyThrough`.
- Menggunakan method baru `casts()` di Laravel 11 untuk casting atribut model secara type-safe.
- Membuat Database Seeders dan Factories untuk menghasilkan ribuan data dummy pengujian realistis.

---

## Program: Relasi Toko Multi-Vendor, Produk & Kategori dengan Eloquent ORM

```php
<?php
// app/Models/Store.php & app/Models/Product.php (Eloquent ORM)
namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Store extends Model {
    use HasFactory;

    protected $fillable = ['user_id', 'store_name', 'slug', 'is_verified'];

    // Relasi Satu Toko Memiliki Banyak Produk (One-to-Many)
    public function products(): HasMany {
        return $this->hasMany(Product::class);
    }
}

class Product extends Model {
    use HasFactory;

    protected $fillable = ['store_id', 'category_id', 'title', 'slug', 'price', 'stock'];

    // Casts atribut otomatis di Laravel 11 (method casts() menggantikan properti $casts)
    protected function casts(): array {
        return [
            'price' => 'decimal:2',
            'stock' => 'integer',
            'is_active' => 'boolean',
        ];
    }

    public function store(): BelongsTo {
        return $this->belongsTo(Store::class);
    }
}

// Simulasi Kueri Eloquent Berperforma Tinggi
// $verifiedStoreProducts = Store::where('is_verified', true)
//     ->with(['products' => fn($q) => $q->where('stock', '>', 0)])
//     ->get();

echo "=== MODEL ELOQUENT LARAVEL 11 DENGAN METHOD CASTS() TERKONFIGURASI ===\n";
```

---

## Konsep Kunci

Eloquent ORM adalah jantung dari ekosistem Laravel. Berbeda dari Data Mapper (seperti Doctrine atau Hibernate) yang memisahkan entitas dari database, Eloquent menerapkan pola **Active Record**: setiap model mewakili satu baris data di tabel dan memiliki method bawaan untuk menyimpan, memperbarui, dan mencari relasi data.

### Method casts() Baru di Laravel 11
Sebelum Laravel 11, casting atribut dilakukan melalui properti array `$casts = [...]`. Di Laravel 11, casting dipindahkan ke method `protected function casts(): array`. Ini memungkinkan pemanggilan fungsi dinamis, validasi enum native PHP 8.1+, dan penulisan casting kustom yang jauh lebih fleksibel.

### Mengatasi N+1 Query dengan Eager Loading (with)
Jika Anda mengambil 50 toko dan memanggil `$store->products`, tanpa optimasi Laravel akan menjalankan 51 kueri database (Lazy Loading). Dengan menambahkan `Store::with('products')->get()`, Eloquent menjalankan **Eager Loading**: seluruh produk diambil hanya dalam **2 kueri SQL super cepat**, menghemat 95% beban memori database.


---

---

## Penjelasan untuk Pemula

Bayangkan buku katalog toko serba ada. Tanpa Eloquent (SQL mentah), Anda harus menulis tabel koordinat gudang rumit setiap kali ingin memeriksa stok barang. Dengan Eloquent, Anda cukup memanggil kalimat manusiawi: Toko ini -> ambil semua produknya ($store->products). Eloquent yang otomatis mencari dan mengambilkan barangnya dari gudang untuk Anda.

## Eksperimen

- Jalankan perintah `php artisan make:model Category -mfs` untuk membuat Model, Migration, Factory, dan Seeder sekaligus.
- Gunakan `Model::preventLazyLoading(!app()->isProduction())` di `AppServiceProvider` untuk mendeteksi bug N+1 saat development.
- Tulis Factory untuk menghasilkan 50 produk dummy dengan harga acak menggunakan pustaka Faker bawaan.

---

## Tantangan

Buat relasi `hasManyThrough`: hubungkan model `Vendor` ke `Order` melalui model perantara `Product` sehingga vendor dapat melihat seluruh pesanan barang mereka secara langsung.

---

## Ringkasan

Kamu telah menguasai Eloquent ORM, relasi database, casts() Laravel 11, dan eager loading. Minggu depan kita mempelajari Form Requests dan validasi input.
