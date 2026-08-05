# Static Assets & Spark CLI

> CodeIgniter 4 | Pelajaran 4

## Tujuan Pembelajaran

- Menyajikan static assets (CSS, JS, gambar) dari direktori public/\n- Menggunakan Spark CLI untuk menjalankan commands\n- Memahami peran public/index.php sebagai front controller\n- Mengonfigurasi baseURL di App.php

---

## Program: CodeIgniter 4

```php
<?php

// CodeIgniter 4 - Front Controller
// Serve static assets from public/css/, public/js/, public/images/

require_once __DIR__ . '/../system/bootstrap.php';

// CI4 handles static assets automatically when APPBASEPATH is set
// Static files in public/ are served directly by the web server

```

---

## Penjelasan

## Static Assets
File di public/ (css/, js/, images/) diakses langsung: http://localhost:3000/css/style.css. CI4 tidak mem-proses file static — web server menyajikannya langsung.
## Spark CLI
php spark list — daftar semua command tersedia. php spark serve — jalankan development server (alternatif dari php -S). php spark make:controller NamaController — generate controller baru. php spark make:model NamaModel — generate model baru.
## App Config
app/Config/App.php berisi baseURL, indexPage, uriProtocol. baseURL harus sesuai dengan URL akses Anda.

---

## Eksperimen

1. **## Static Assets
File di public/ (css/, js/, images/) diakses langsung: http://localhost:3000/css/style.css. CI4 tidak mem-proses file static — web server menyajikannya langsung.
## Spark CLI
php spark list — daftar semua command tersedia. php spark serve — jalankan development server (alternatif dari php -S). php spark make:controller NamaController — generate controller baru. php spark make:model NamaModel — generate model baru.
## App Config
app/Config/App.php berisi baseURL, indexPage, uriProtocol. baseURL harus sesuai dengan URL akses Anda.**

---

## Tantangan

Eksplorasi Spark: (1) jalankan php spark list dan catat 5 command yang tersedia, (2) buat controller baru dengan php spark make:controller About, (3) buat model baru dengan php spark make:model Post, (4) coba php spark serve dan bandingkan dengan npm run dev.

---

## Ringkasan

public/ = static assets. Spark CLI = generate code & run commands. App.php = config utama. Lanjut: database & migrations.
