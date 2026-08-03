# Pengenalan Laravel & Artisan

> Laravel | Fondasi Laravel | Pelajaran 1

## Tujuan Pembelajaran

- Memahami posisi Laravel: framework MVC paling populer untuk PHP
- Mengenal struktur project Laravel 12 (app, routes, config, database, resources)
- Menjalankan server dengan php artisan serve dan route:list
- Memahami siklus request: URL → Route → Controller/Closure → View → Response

---

## Program: Pengenalan Laravel & Artisan

```php
<?php

use Illuminate\Support\Facades\Route;

Route::get('/', function () {
    return view('beranda', ['judul' => 'Selamat datang di Tryngo Laravel!']);
});

Route::get('/waktu', function () {
    return now()->toDateTimeString();
});

```

---

## Penjelasan

## Request Lifecycle
Browser mengirim GET / → publik/index.php (front controller) → bootstrap/app.php menyiapkan Application → router mencocokkan URL ke route → closure dieksekusi → response HTML dikembalikan. Semua request PHP melewati SATU pintu ini - inilah pola front controller.
## Route: Jantung Laravel
routes/web.php adalah peta URL aplikasi. Route::get('/') mendaftarkan URL root. Closure menerima Request dan mengembalikan Response. 'waktu' memakai helper now() - framework memuat aplikasi penuh sebelum route jalan, jadi helper Laravel tersedia di mana saja.
## view(): Blade Sebagai Jawaban
view('beranda', ['judul' => ...]) mencari resources/views/beranda.blade.php dan mengirim data. Blade: {{ $judul }} = echo dengan escape otomatis (anti-XSS). url('/waktu') membuat URL absolut dari path.
## Artisan: Toolbox
php artisan list (semua perintah), route:list (peta URL), make:model/make:controller (scaffolding), tinker (REPL interaktif). Artisan adalah pembeda Laravel: sebagian besar tugas dilakukan lewat perintah konsol, bukan manual.

---

## Eksperimen

1. **Request Lifecycle**
2. **Route: Jantung Laravel**
3. **view(): Blade Sebagai Jawaban**
4. **Artisan: Toolbox**

---

## Tantangan

Eksplorasi setup: (1) tambah route /profil yang mengembalikan teks HTML berisi nama Anda, (2) buat route /kalkulator/{a}/{b} dengan closure yang menjumlahkan dua angka, (3) ganti route / dengan closure yang mengembalikan response()->json([...]) dan amati perbedaannya di browser, (4) jalankan php artisan route:list dan tulis ulang isinya di README.

---

## Ringkasan

Front controller + route = pintu tunggal. Artisan = toolbox. View = Blade. Lanjut: routing & controllers.
