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

Kamu telah menguasai Eloquent Policies, mitigasi IDOR, dan penegakan otorisasi di Blade. Level 1 selesai! Di Level 2 kita mempelajari API Resources, Sanctum, dan Background Queues.
