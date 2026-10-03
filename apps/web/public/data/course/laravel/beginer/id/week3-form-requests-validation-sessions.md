# Validasi Aman: Form Requests, Session State & Otentikasi Pengguna

> **Kategori:** Laravel Framework | **Level:** Pemula | **Minggu 3:** Validasi Aman: Form Requests, Session State & Otentikasi Pengguna
> ⏱️ **Estimasi Belajar:** 45 Menit (15m teori, 30m praktik) | 🔗 **Tingkat:** Terstruktur (Step-by-step)


## Tujuan Pembelajaran

- Memisahkan logika validasi dari Controller menggunakan dedicated `FormRequest` classes.
- Menerapkan aturan validasi canggih: `Rule::exists()`, validasi format berkas upload gambar, dan regex.
- Mengamankan form submission melalui otorisasi request otomatis di method `authorize()`.
- Menggunakan Session Flash Messages (`with("success", ...)`) untuk notifikasi toast pengguna.

---

## Program: Form Request Pembuatan Produk Merchant dengan Validasi Gambar & Aturan Bisnis

```php
<?php
// app/Http/Requests/StoreProductRequest.php
namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class StoreProductRequest extends FormRequest {
    // 1. Otorisasi Request (Hanya merchant terverifikasi yang boleh upload)
    public function authorize(): bool {
        return $this->user() !== null && $this->user()->is_merchant === true;
    }

    // 2. Aturan Validasi Deklaratif
    public function rules(): array {
        return [
            'title'       => ['required', 'string', 'min:5', 'max:150'],
            'sku'         => ['required', 'string', 'regex:/^[A-Z0-9-]+$/', 'unique:products,sku'],
            'price'       => ['required', 'numeric', 'min:1000', 'max:500000000'],
            'stock'       => ['required', 'integer', 'min:0', 'max:10000'],
            'image'       => ['nullable', 'image', 'mimes:jpeg,png,webp', 'max:2048'], // Maks 2MB
            'category_id' => ['required', 'integer', Rule::exists('categories', 'id')],
        ];
    }

    // Pesan Kesalahan Bahasa Indonesia Kustom
    public function messages(): array {
        return [
            'sku.unique' => 'SKU produk ini sudah terdaftar di toko lain!',
            'price.min'  => 'Harga produk minimal adalah Rp 1.000,00.',
            'image.max'  => 'Ukuran foto produk tidak boleh melebihi 2MB.',
        ];
    }
}

// Controller Handler Ramping (Otomatis Tervalidasi sebelum Method Dieksekusi)
class ProductManagementController {
    public function store(StoreProductRequest $request) {
        $validatedData = $request->validated();
        
        // Simpan produk ke database
        // $product = $request->user()->store->products()->create($validatedData);

        return redirect()->route('merchant.products.index')
            ->with('success', 'Produk berhasil dipublikasikan ke marketplace!');
    }
}

echo "=== FORM REQUEST TERISOLASI DENGAN VALIDASI ATRIBUT LENGKAP ===\n";
```

---

## Konsep Kunci

Salah satu kesalahan paling sering dilakukan developer pemula adalah menumpuk aturan validasi 50 baris langsung di dalam method Controller. Pendekatan ini membuat controller menjadi "gemuk" (Fat Controllers) dan sulit dipelihara.

### Kekuatan Form Requests di Laravel
Kelas `FormRequest` bertindak sebagai penjaga gerbang sebelum request mencapai controller:
1. **Otorisasi Otomatis**: Method `authorize()` mengecek apakah pengguna yang sedang login memiliki hak istimewa (misal hanya user dengan `is_merchant = true`). Jika mengembalikan `false`, Laravel langsung menolak request dengan status HTTP 403 Forbidden.
2. **Validasi Otomatis**: Method `rules()` memvalidasi payload. Jika validasi gagal:
   - Pada request web HTML, Laravel otomatis mengarahkan kembali pengguna ke halaman formulir sebelumnya dengan pesan error dan data input lama (`old()`).
   - Pada request API JSON, Laravel otomatis mengembalikan respons `HTTP 422 Unprocessable Content` dengan struktur JSON error.
3. Method controller hanya menerima data yang sudah 100% bersih dan aman melalui `$request->validated()`.


---

---

## Penjelasan untuk Pemula

Bayangkan loket pendaftaran pedagang di pasar resmi. Petugas loket depan (FormRequest) memeriksa KTP Anda dan kelengkapan berkas izin usaha Anda. Jika berkas Anda belum lengkap atau foto buram, petugas depan langsung menyuruh Anda melengkapi berkasnya. Anda tidak diizinkan masuk ke ruangan direktur pasar (Controller) sebelum berkas Anda 100% sempurna.

## Eksperimen

- Kirim form dengan harga Rp 500 dan perhatikan pesan error kustom "Harga produk minimal adalah Rp 1.000,00." muncul di Blade.
- Uji coba upload file non-gambar (misal file .exe atau .pdf) dan amati penolakan oleh validator `image`.
- Tampilkan flash message sukses di template Blade menggunakan direktif `@if (session("success"))`.

---

## Tantangan

Buat Custom Validation Rule `ValidIndonesianPhoneNumber` menggunakan perintah `php artisan make:rule` yang memverifikasi nomor telepon seluler berformat valid Indonesia (`+62` atau `08`).

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

Kamu telah menguasai Form Requests, validasi berkas upload, dan pesan flash session. Minggu depan kita mempelajari Middleware, Policies, dan Gates.
