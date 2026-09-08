# File Storage — Gudang Foto Laravel

> **Kategori:** Laravel | **Level:** Menengah | **Minggu 8:** File Storage

## Tujuan Pembelajaran

- `Storage::disk('public')->put()` simpan foto produk, `php artisan storage:link` buka ke public

---

## Kenapa Ini Penting Buat Kamu?

Foto produk tanpa Storage = path acak + tidak bisa pindah ke S3. Dengan `store('produk','public')` + `storage:link`, rapi + pindah cloud 1 config.

---

## Program

```php
// Controller
use Illuminate\Support\Facades\Storage;

public function simpan(Request $req){
  $path = $req->file('foto')->store('produk', 'public');
  Produk::create(["nama"=>$req->nama, "foto"=>$path]);
  return redirect('/produk');
}

// View: <form enctype="multipart/form-data"><input type="file" name="foto">
```

```bash
php artisan storage:link
# Buka http://localhost:8000/storage/produk/xxx.jpg
```


---

## Penjelasan untuk Pemula

### Analogi: Gudang Foto Laravel
- **Upload tanpa Storage = tumpuk foto di meja**: path acak + pindah server hilang semua.
- **`store('produk','public')` = masukkan laci berlabel** + `storage:link` = jembatan ke etalase (`/storage/...`). Pindah ke S3? Ganti 1 config, kode tetap!

### Langkah 0 — Siapkan Device
- Sama Laravel W1: `php artisan serve` di `8000` (+ paket minggu ini).

### Cara Komputer Membaca
- `$req->file('foto')->store('produk','public')` simpan; `Storage::url()` link publik.

### 3 Istilah Wajib
- 1. **Storage/link**: gudang/jembatan

---

## Glosarium Mini

- Lihat Istilah Wajib di atas.

## Ringkasan

Minggu 8: **Gudang Foto** — Storage Laravel.
