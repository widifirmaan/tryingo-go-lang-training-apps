# Validasi & Form Requests

> Laravel | Data & CRUD | Pelajaran 6

## Tujuan Pembelajaran

- Menulis FormRequest: rules(), messages(), authorize()
- Menggunakan $request->validated() sebagai satu-satunya sumber data
- Menampilkan error validasi dan old() di blade
- Memahami CSRF token dan @csrf di form

---

## Program: Validasi & Form Requests

```php
<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class ProdukRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'nama' => ['required', 'string', 'min:3', 'max:200'],
            'harga' => ['required', 'numeric', 'min:0', 'max:1000000000'],
            'stok' => ['required', 'integer', 'min:0'],
            'tersedia' => ['sometimes', 'boolean'],
            'kategori_id' => ['required', 'exists:kategoris,id'],
        ];
    }

    public function messages(): array
    {
        return [
            'nama.required' => 'Nama produk wajib diisi.',
            'nama.min' => 'Nama minimal 3 karakter.',
            'harga.min' => 'Harga tidak boleh negatif.',
            'kategori_id.exists' => 'Kategori tidak valid.',
        ];
    }
}

```

---

## Penjelasan

## FormRequest: Validasi sebagai Class
php artisan make:request ProdukRequest membuat class khusus. rules() mengembalikan array aturan: required, min:3, max:200, numeric, integer, exists:kategoris,id. Laravel menjalankan validasi OTOMATIS sebelum controller dipanggil - data buruk tidak pernah sampai ke logika bisnis.
## validated(): Satu-Satunya Sumber Data
$request->validated() mengembalikan HANYA kolom yang lolos aturan - tidak ada input nakal (mass assignment protection lapis kedua setelah $fillable). Jangan pernah membaca request langsung di controller saat FormRequest ada.
## Error & old()
Saat validasi gagal: redirect otomatis kembali + error di session. $errors->all() menampilkan semuanya, $errors->first('nama') per kolom. old('nama') mengisi ulang input - user tidak mengetik ulang. 422 vs redirect: form HTML memakai redirect, API (lesson 13) menerima JSON 422.
## CSRF: Token di Setiap Form
@csrf menyisipkan token rahasia; middleware VerifyCsrfToken mencocokkannya dengan session. Tanpa token, POST ditolak (419). Ini menutup serangan cross-site request forgery - form dari situs lain tidak bisa mengirim data atas nama user.

---

## Eksperimen

1. **FormRequest: Validasi sebagai Class**
2. **validated(): Satu-Satunya Sumber Data**
3. **Error & old()**
4. **CSRF: Token di Setiap Form**

---

## Tantangan

Perkuat validasi: (1) tambah aturan unique:nama pada update (abaikan id sendiri: unique:produks,nama,'.$produk->id), (2) buat aturan custom 'stok_genap' via Rule::custom atau closure di rules(), (3) tambahkan error khusus per-field dengan @error('nama') di blade, (4) buat UlasanRequest untuk form ulasan (isi required min:10, bintang required integer between:1,5).

---

## Ringkasan

FormRequest = gerbang. validated() = satu-satunya sumber. CSRF = tameng POST. Lanjut: CRUD blog.
