# Pengenalan PHP & Sintaks

> PHP | Pelajaran 1

## Tujuan Pembelajaran

- Memahami posisi PHP: bahasa scripting server-side yang populer\n- Mengenal struktur file PHP (tag pembuka, kode, tag penutup)\n- Menjalankan PHP via built-in server dan melihat output di browser\n- Memahami perbedaan PHP dengan HTML: PHP diproses di server

---

## Program: Pengenalan PHP & Sintaks

```php
<?php

echo "Hello, Tryngo!";

```

---

## Penjelasan

## Sintaks Dasar
Setiap file PHP dimulai dengan `<?php` dan diakhiri dengan `?>`. Kode di antara tag tersebut dieksekusi oleh server. `echo` mencetak teks ke output HTML.
## Tag Pembuka & Penutup
`<?php` wajib untuk setiap blok kode PHP. `?>` opsional — jika file hanya berisi PHP, penutup bisa dihilangkan.
## Menjalankan PHP
`php -S 0.0.0.0:3000` menjalankan server development bawaan PHP. Buka http://localhost:3000.

---

## Eksperimen

1. **## Sintaks Dasar
Setiap file PHP dimulai dengan `<?php` dan diakhiri dengan `?>`. Kode di antara tag tersebut dieksekusi oleh server. `echo` mencetak teks ke output HTML.
## Tag Pembuka & Penutup
`<?php` wajib untuk setiap blok kode PHP. `?>` opsional — jika file hanya berisi PHP, penutup bisa dihilangkan.
## Menjalankan PHP
`php -S 0.0.0.0:3000` menjalankan server development bawaan PHP. Buka http://localhost:3000.**

---

## Tantangan

Eksplorasi: (1) ubah "Hello, Tryngo!" menjadi "Selamat datang di PHP!" dengan variabel $selamat, (2) tambah 3 baris echo untuk mencetak nama, umur, dan kota Anda, (3) coba hapus tag penutup ?> dan amati apakah output berubah, (4) tambahkan komentar // di atas setiap echo.

---

## Ringkasan

echo = cetak output. <?php = tag pembuka. Server = PHP diproses di server. Lanjut: variabel & tipe data.
