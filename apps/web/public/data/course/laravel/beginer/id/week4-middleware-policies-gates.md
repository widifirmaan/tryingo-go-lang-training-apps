# Otorisasi & Keamanan: Middleware Pipeline, Gates & Eloquent Policies

> **Kategori:** Laravel Framework | **Level:** Pemula | **Minggu 4:** Otorisasi & Keamanan: Middleware Pipeline, Gates & Eloquent Policies
> ⏱️ **Estimasi Belajar:** 45 Menit (15m teori, 30m praktik) | 🔗 **Tingkat:** Terstruktur (Step-by-step)


## Tujuan Pembelajaran

- Memahami perbedaan peran Autentikasi ("Siapa Anda?") vs Otorisasi ("Apa yang boleh Anda lakukan?").
- Menggunakan Eloquent Policies untuk memusatkan aturan hak akses per model domain.
- Menerapkan otorisasi deklaratif di Controller menggunakan `$this->authorize("update", $product)`.
- Menyembunyikan tombol aksi sensitif di template Blade menggunakan direktif `@can` dan `@cannot`.

---

## Program: Sistem Otorisasi Kepemilikan Toko dengan Eloquent Policies & Middleware

```php
<?php
// app/Policies/ProductPolicy.php
namespace App\Policies;

use App\Models\User;
use App\Models\Product;

class ProductPolicy {
    // Administrator sistem memiliki akses penuh tanpa batas (Super Admin Bypass)
    public function before(User $user, string $ability): ?bool {
        if ($user->is_super_admin) {
            return true;
        }
        return null; // Lanjutkan evaluasi method policy spesifik
    }

    // Hanya pemilik toko yang bersangkutan yang boleh mengedit produk miliknya
    public function update(User $user, Product $product): bool {
        return $user->id === $product->store->user_id;
    }

    // Hanya pemilik toko yang boleh menghapus produk
    public function delete(User $user, Product $product): bool {
        return $user->id === $product->store->user_id;
    }
}

// Controller yang Dilindungi oleh Policy
class ProductController {
    public function edit(Product $product) {
        // Otomatis memicu ProductPolicy::update, melempar 403 Forbidden jika bukan pemilik!
        // $this->authorize('update', $product);

        return view('merchant.products.edit', compact('product'));
    }
}

// Penggunaan Otorisasi di Template Blade:
$bladeAuthSnippet = <<<'BLADE'
@can('update', $product)
    <a href="/products/{{ $product->id }}/edit" class="btn btn-warning">Edit Produk</a>
@endcan

@can('delete', $product)
    <form action="/products/{{ $product->id }}" method="POST">
        @csrf
        @method('DELETE')
        <button type="submit" class="btn btn-danger">Hapus</button>
    </form>
@endcan
BLADE;

echo "=== ELOQUENT POLICY & BLADE @CAN DIRECTIVE TERDEFINISI ===\n";
```

---

## Konsep Kunci

Salah satu celah peretasan paling umum di aplikasi e-commerce adalah **IDOR (Insecure Direct Object Reference)**: pengguna A mengubah parameter URL `/products/42/edit` menjadi `/products/43/edit` dan berhasil mengubah harga produk milik toko pengguna B karena backend lupa memeriksa kepemilikan data.

### Solusi Elegan: Eloquent Policies
Laravel memecahkan celah IDOR melalui **Eloquent Policies**. Policy adalah kelas khusus yang memetakan method ke model tertentu (misal `ProductPolicy`). Di dalam method `update()`, kita cukup menulis:
`return $user->id === $product->store->user_id;`

### Penegakan di Berbagai Lapisan
Aturan policy yang sama dapat digunakan di mana saja secara seragam:
1. Di Controller: `$this->authorize('update', $product);` (otomatis melempar HTTP 403 Forbidden).
2. Di Blade Template: `@can('update', $product)` (tombol edit hanya muncul untuk pemilik asli).
3. Di Route Middleware: `->can('update', 'product')`.


---

---

## Penjelasan untuk Pemula

Bayangkan loker penyimpanan barang di stasiun kereta. Tiket Anda (Autentikasi) membuktikan Anda penumpang yang sah. Namun untuk membuka loker nomor 14 (Otorisasi Policy), kunci fisik di tangan Anda harus cocok dengan lubang kunci loker nomor 14. Anda tidak diizinkan membuka loker nomor 15 milik orang lain meskipun Anda sama-sama penumpang stasiun.

## Eksperimen

- Uji coba manipulasi ID produk via cURL menggunakan akun merchant lain dan amati respons penolakan HTTP 403 Forbidden.
- Manfaatkan method `before()` di Policy untuk memberikan hak akses bypass otomatis kepada Super Admin.
- Terapkan helper `@cannot("delete", $product)` untuk menampilkan badge status "Terkunci".

---

## Tantangan

Buat middleware kustom `EnsureStoreIsActive` yang memeriksa apakah toko merchant sedang dibekukan oleh admin karena pelanggaran, memblokir akses ke dashboard merchant jika toko nonaktif.

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

Kamu telah menguasai Eloquent Policies, mitigasi IDOR, dan penegakan otorisasi di Blade. Level 1 selesai! Di Level 2 kita mempelajari API Resources, Sanctum, dan Background Queues.
