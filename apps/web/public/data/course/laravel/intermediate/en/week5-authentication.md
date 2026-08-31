# Authentication — KTP Laravel

> **Kategori:** Laravel | **Level:** Menengah | **Minggu 5:** Authentication

## Tujuan Pembelajaran

- `php artisan make:auth` atau `Breeze` — `Auth::attempt`, `middleware('auth')` jaga `/admin`

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

## Ringkasan

Minggu 5: **KTP Laravel** — Breeze `auth` + `middleware`.
