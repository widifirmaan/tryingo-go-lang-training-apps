# Validasi — Satpam Laravel Lanjutan

> **Kategori:** Laravel | **Level:** Menengah | **Minggu 7:** Validasi
> **Prasyarat:** Minggu 6 — **Relationships**.

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
- **Validasi di controller = satpam rangkap kasir**: campur 30 baris + duplikat tiap method.
- **`FormRequest` = satpam khusus pintu**: 1 class `rules()` dipakai 10 controller. Gagal? Otomatis tendang balik + `old()` isi lama + `@error` pesan!

### Langkah 0 — Siapkan Device
- Sama Laravel W1: `php artisan serve` di `8000` (+ paket minggu ini).

### Cara Komputer Membaca
- `php artisan make:request StoreRequest` → `rules()` → type-hint di controller → otomatis dicek.

### 3 Istilah Wajib
- 1. **FormRequest/rules**: satpam/aturan

---

## Tantangan

**Validasi di Warungmu:** pakai `/produk`, `rules`, `messages` hingga benar-benar jalan, lalu kerjakan tiga tingkat ini.
- **Hijau:** Jalankan Program minggu ini apa adanya; catat output yang keluar.
- **Kuning:** Ubah 1 nilai pada `/produk`, `rules`, `messages`; tebak output SEBELUM run, lalu cocokkan.
- **Merah:** Gabungkan dengan **Relationships** (Minggu 6): pasang hasilnya di alur itu, pastikan ujung-ke-ujung jalan.

## Glosarium Mini

- Lihat Istilah Wajib di atas.

## Ringkasan

Minggu 7: **Satpam Terpisah** — FormRequest. Minggu depan: **File Storage**.
