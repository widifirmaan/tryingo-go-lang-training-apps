# Pengenalan CodeIgniter 4 & Instalasi

> CodeIgniter 4 | Pelajaran 1

## Tujuan Pembelajaran

- Memahami posisi CI4: PHP framework modern dengan pola MVC\n- Mengenal struktur direktori CI4 (app/, public/, writable/, system/)\n- Memahami peran front controller (public/index.php)\n- Membedakan CI4 dari PHP murni: framework vs bahasa

---

## Program: CodeIgniter 4

```php
<?php

// CodeIgniter 4 - Front Controller
// Ini adalah titik masuk utama aplikasi CI4.
// Semua request HTTP melewati file ini.

require_once __DIR__ . '/../system/bootstrap.php';

echo "Hello, CodeIgniter 4!";
echo "\nMVC = Model-View-Controller";
echo "\nRouting: URL -> Controller -> View";

```

---

## Penjelasan

## Struktur Direktori CI4
app/ = kode aplikasi (Controllers, Models, Views, Config). public/ = web root (index.php, assets). writable/ = cache, logs, session, uploads. system/ = inti framework (tidak perlu dimodifikasi). vendor/ = dependency Composer.
## MVC di CI4
Request -> public/index.php -> Router -> Controller -> Model (database) -> View (HTML) -> Response. Setiap lapisan punya tanggung jawab sendiri.
## Menjalankan CI4
php -S 0.0.0.0:3000 -t public menjalankan server development. Buka http://localhost:3000 dan liat output "Welcome to CodeIgniter 4!".

---

## Eksperimen

1. **## Struktur Direktori CI4
app/ = kode aplikasi (Controllers, Models, Views, Config). public/ = web root (index.php, assets). writable/ = cache, logs, session, uploads. system/ = inti framework (tidak perlu dimodifikasi). vendor/ = dependency Composer.
## MVC di CI4
Request -> public/index.php -> Router -> Controller -> Model (database) -> View (HTML) -> Response. Setiap lapisan punya tanggung jawab sendiri.
## Menjalankan CI4
php -S 0.0.0.0:3000 -t public menjalankan server development. Buka http://localhost:3000 dan liat output "Welcome to CodeIgniter 4!".**

---

## Tantangan

Eksplorasi: (1) ubah "Welcome to CodeIgniter 4!" menjadi selamat datang Anda di view welcome_message.php, (2) tambah h2 dengan nama framework Anda, (3) coba akses http://localhost:3000/ dan liat perubahan, (4) tambah link <a href="/about">About</a> di view.

---

## Ringkasan

CI4 = PHP framework MVC. public/index.php = front controller. app/ = kode Anda. Lanjut: routing & controllers.
