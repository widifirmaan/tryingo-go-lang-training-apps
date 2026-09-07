# Authentication — KTP Laravel

> **Kategori:** Laravel | **Level:** Menengah | **Minggu 5:** Authentication

## Tujuan Pembelajaran

- `php artisan make:auth` atau `Breeze` — `Auth::attempt`, `middleware('auth')` jaga `/admin`

---

## Kenapa Ini Penting Buat Kamu?

Tanpa auth, `/admin` dibuka siapa saja → harga diubah iseng. Breeze 1 perintah jadi login/register/logout + `middleware('auth')` jaga.

---

## Program

```bash
composer require laravel/breeze --dev
php artisan breeze:install
php artisan migrate
npm install && npm run dev
```

```php
// routes/web.php
Route::middleware('auth')->group(function(){
  Route::get('/admin', function(){ return view('admin'); });
});

// Login otomatis di /login, /register
```

Buka `http://localhost:8000/login` → daftar → `/admin` terproteksi.


---

## Penjelasan untuk Pemula

### Analogi: KTP Siap Pakai Laravel
- Lihat Program: jalankan perintahnya, ubah 1 hal, lihat bedanya.

### Langkah 0 — Siapkan Device
- Sama Laravel W1: `php artisan serve` di `8000` (+ paket minggu ini).

### Cara Komputer Membaca
- `composer require laravel/breeze` → `php artisan breeze:install` → `migrate` → `/login` jadi.

### 3 Istilah Wajib
- 1. **Breeze/middleware**: KTP-jadi/satpam

---

## Glosarium Mini

- Lihat Istilah Wajib di atas.

## Ringkasan

Minggu 5: **KTP Laravel** — Breeze `auth` + `middleware`.
