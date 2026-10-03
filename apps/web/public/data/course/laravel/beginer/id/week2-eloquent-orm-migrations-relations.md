# Eloquent ORM: Migrasi Skema, Model Relationships & Database Factories

> **Kategori:** Laravel Framework | **Level:** Pemula | **Minggu 2:** Eloquent ORM: Migrasi Skema, Model Relationships & Database Factories
> ⏱️ **Estimasi Belajar:** 45 Menit (15m teori, 30m praktik) | 🔗 **Tingkat:** Terstruktur (Step-by-step)


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

## Model Mental & Diagram Alur Visual

```diagram
┌──────────────┐     Call Stack Kosong?      ┌────────────────┐
│  CALL STACK  │ ◄─────────────────────────  │   EVENT LOOP   │
│ (Sync Code)  │                             │  (Pemeriksa)   │
└──────┬───────┘                             └───────▲────────┘
       │ Operasi Async (Fetch / Timer)               │
       ▼                                             │
┌──────────────┐                             ┌───────┴────────┐
│  WEB APIs    │ ─── Callback Selesai ────►  │ TASK / PROMISE │
│  (Background)│                             │     QUEUE      │
└──────────────┘                             └────────────────┘
```

---

## Panduan Sintaks & Referensi Lengkap (W3Schools Style)

Berikut adalah rincian sintaks, parameter, nilai kembalian, dan contoh penggunaan praktis yang diperkenalkan pada modul ini:

### 1. `const / let variabel`
- **Fungsi Utama:** Deklarasi variabel modern lingkup blok (Block Scope).
- **Parameter / Atribut:** `Identifier, Initial Value`.
- **Perilaku & Efek Sistem:** `const` untuk referensi konstan yang tidak dapat di-reassign; `let` untuk variabel nilai dinamis.
- **Contoh Penggunaan Praktis:**
```javascript
const appName = 'Tryngo';
let counter = 0;
counter += 1;
console.log(appName, counter);
```
- **Hasil Output yang Diharapkan:**
```text
Tryngo 1
```

### 2. `() => { ... } (Arrow Function)`
- **Fungsi Utama:** Sintaks fungsi ringkas dengan lexical 'this'.
- **Parameter / Atribut:** `Parameters, Function Body`.
- **Perilaku & Efek Sistem:** Menyederhanakan penulisan fungsi dan mempertahankan konteks `this` dari lingkup pembungkus luar.
- **Contoh Penggunaan Praktis:**
```javascript
const multiply = (a, b) => a * b;
console.log(multiply(6, 7));
```
- **Hasil Output yang Diharapkan:**
```text
42
```

### 3. `async / await & fetch(url)`
- **Fungsi Utama:** Penanganan operasi asinkron berbasis Promise.
- **Parameter / Atribut:** `URL string, RequestInit options`.
- **Perilaku & Efek Sistem:** Menulis kode asinkron dengan alur linier layaknya kode sinkron tanpa callback hell.
- **Contoh Penggunaan Praktis:**
```javascript
async function fetchUser(id) {
  const res = await fetch(`https://api.example.com/users/${id}`);
  const data = await res.json();
  return data;
}
```
- **Hasil Output yang Diharapkan:**
```text
Mengembalikan objek data JSON terurai dari server
```

### 4. `Array.prototype.map() / filter()`
- **Fungsi Utama:** Transformasi array fungsional tanpa mutasi data asal.
- **Parameter / Atribut:** `callback(item, index, array)`.
- **Perilaku & Efek Sistem:** `map` menghasilkan array baru dari hasil transformasi; `filter` menyaring elemen berdasarkan kondisi boolean.
- **Contoh Penggunaan Praktis:**
```javascript
const numbers = [1, 2, 3, 4, 5];
const doubledEvens = numbers
  .filter(n => n % 2 === 0)
  .map(n => n * 2);
console.log(doubledEvens);
```
- **Hasil Output yang Diharapkan:**
```text
[4, 8]
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

Kamu telah menguasai Eloquent ORM, relasi database, casts() Laravel 11, dan eager loading. Minggu depan kita mempelajari Form Requests dan validasi input.
