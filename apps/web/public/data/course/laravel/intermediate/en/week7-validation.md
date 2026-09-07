# Validasi — Satpam Laravel Lanjutan

> **Kategori:** Laravel | **Level:** Menengah | **Minggu 7:** Validasi

## Tujuan Pembelajaran

- `FormRequest` satpam terpisah: `php artisan make:request StoreProdukRequest` + `rules()` + `messages()`

---

## Kenapa Ini Penting Buat Kamu?

Tanpa `FormRequest`, validasi campur di controller 30 baris + duplikat tiap method. Dengan 1 class, pakai 10x.

---

## Program

```bash
php artisan make:request StoreProdukRequest
```

```php
// app/Http/Requests/StoreProdukRequest.php
public function rules(){
  return [
    'nama' => 'required|min:3',
    'harga' => 'required|numeric|min:1',
    'stok' => 'required|integer|min:0'
  ];
}
public function messages(){
  return ['nama.required' => 'Nama wajib', 'harga.min' => 'Harga minimal 1'];
}

// Controller
public function store(StoreProdukRequest $req){
  Produk::create($req->validated());
  return redirect('/produk');
}
```

View: `@error('nama') <span>{{ $message }}</span> @enderror`.


---

## Penjelasan untuk Pemula

### Analogi: Satpam Terpisah Laravel
- Lihat Program: jalankan perintahnya, ubah 1 hal, lihat bedanya.

### Langkah 0 — Siapkan Device
- Sama Laravel W1: `php artisan serve` di `8000` (+ paket minggu ini).

### Cara Komputer Membaca
- `php artisan make:request StoreRequest` → `rules()` → type-hint di controller → otomatis dicek.

### 3 Istilah Wajib
- 1. **FormRequest/rules**: satpam/aturan

---

## Glosarium Mini

- Lihat Istilah Wajib di atas.

## Ringkasan

Minggu 7: **Satpam Terpisah** — FormRequest.
