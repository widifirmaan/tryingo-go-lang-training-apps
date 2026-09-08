# Authentication — Laravel ID

> **Kategori:** Laravel | **Level:** Intermediate | **Minggu 5:** Authentication

## Learning Objectives

- `php artisan make:auth` or `Breeze` — `Auth::attempt`, `middleware('auth')` guards `/admin`

---

## Why This Matters (Non-IT)

Without auth, anyone opens `/admin` → prices edited for fun. Breeze builds login/register/logout in 1 command + `middleware('auth')` guards.

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

// Login automatic at /login, /register
```

Open `http://localhost:8000/login` → register → `/admin` protected.


---

## Beginner Friendly Explanation

### Analogy: Ready-Made Laravel ID
- See Program: run the commands, change 1 thing, see the difference.

### Step 0 — Prepare Device
- Same as Laravel W1: `php artisan serve` on `8000` (+ this week's package).

### How the Computer Reads It
- `composer require laravel/breeze` → `php artisan breeze:install` → `migrate` → `/login` done.

### 3 Must-Know Terms
- 1. **Breeze/middleware**: ready-ID/guard

---

## Mini Glossary

- See Must-Know Terms above.

## Summary

Week 5: **Laravel ID** — Breeze `auth` + `middleware`. Next: **Relations**.
