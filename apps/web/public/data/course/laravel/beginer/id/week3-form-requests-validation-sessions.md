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

Kamu telah menguasai Form Requests, validasi berkas upload, dan pesan flash session. Minggu depan kita mempelajari Middleware, Policies, dan Gates.
