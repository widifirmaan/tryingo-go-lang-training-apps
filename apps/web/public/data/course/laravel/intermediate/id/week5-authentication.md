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
- **Breeze = KTP jadi dalam 1 perintah**: `breeze:install` cetak halaman login/register + route + view — tanpa tulis 200 baris.
- **`middleware('auth')` = gelang konser**: halaman `/admin` cek gelang, tak ada → tendang ke `/login`.

### Langkah 0 — Siapkan Device
- Sama Laravel W1: `php artisan serve` di `8000` (+ paket minggu ini).

### Cara Komputer Membaca
- `composer require laravel/breeze` → `php artisan breeze:install` → `migrate` → `/login` jadi.

### 3 Istilah Wajib
- 1. **Breeze/middleware**: KTP-jadi/satpam

### Bonus: Middleware Sendiri (docs: Middleware Laravel!)

Breeze pakai `auth` bawaan. Butuh aturan sendiri (misal: hanya jam buka!)? Bikin 1x, tempel ke pintu mana saja:

```bash
php artisan make:middleware JamBuka
```

```php
// app/Http/Middleware/JamBuka.php
public function handle(Request $req, Closure $next) {
  $jam = (int) date("H");
  if ($jam < 7 || $jam >= 20) {
    return response("Warung tutup (07-20)", 403); // TOLAK sebelum controller!
  }
  return $next($req); // lolos → lanjut
}
```

```php
// routes/web.php — tempel ke pintu (alias daftarkan di bootstrap/app.php!)
Route::middleware('jambuka')->group(function(){
  Route::get('/pesan', function(){ return view('pesan'); });
});
```
- Urutan: request → middleware → controller. `return $next($req)` = teruskan, `return response(...)` = stop!

---

## Glosarium Mini

- Lihat Istilah Wajib di atas.

## Ringkasan

Minggu 5: **KTP Laravel** — Breeze `auth` + `middleware`.
