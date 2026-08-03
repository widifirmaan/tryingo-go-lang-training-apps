# Keamanan Aplikasi

> PHP | Pelajaran 12

## Tujuan Pembelajaran

- Mengamankan password dengan password_hash / password_verify\n- Melindungi dari XSS dengan htmlspecialchars\n- Memahami CSRF token dan session\n- Validasi input dengan filter_var

---

## Program: Keamanan Aplikasi

```php
<?php

// 1. Password Hashing
$password = "rahasia123";
$hash = password_hash($password, PASSWORD_DEFAULT);
echo "Hash: $hash\n";
echo "Verifikasi benar: " . (password_verify($password, $hash) ? "ya" : "tidak") . "\n";
echo "Verifikasi salah: " . (password_verify("salah", $hash) ? "ya" : "tidak") . "\n";

// 2. XSS Protection
$inputUser = "<script>alert('xss')</script>";
$aman = htmlspecialchars($inputUser, ENT_QUOTES, "UTF-8");
echo "Tanpa perlindungan: $inputUser\n";
echo "Dilindungi: $aman\n";

// 3. CSRF Token
session_start();
if (empty($_SESSION["csrf_token"])) {
    $_SESSION["csrf_token"] = bin2hex(random_bytes(32));
}
$token = $_SESSION["csrf_token"];
echo "CSRF Token: " . substr($token, 0, 16) . "...\n";

// 4. Input Validation
$email = "user@example.com";
if (filter_var($email, FILTER_VALIDATE_EMAIL)) {
    echo "Email valid\n";
} else {
    echo "Email tidak valid\n";
}

```

---

## Penjelasan

## Password Hashing
password_hash($password, PASSWORD_DEFAULT) = hash bcrypt dengan salt otomatis. Tidak bisa di-reverse (one-way). password_verify($input, $hash) = cek apakah input cocok dengan hash. JANGAN gunakan md5/sha1 untuk password — terlalu cepat dan tanpa salt.
## XSS Protection
htmlspecialchars($input, ENT_QUOTES, "UTF-8") = mengubah <, >, ", ' menjadi HTML entities. Mencegah eksekusi script di browser. SELALU escape output yang berasal dari user sebelum ditampilkan di HTML.
## CSRF Token
Session-based CSRF token: generate dengan random_bytes(32), simpan di $_SESSION, sertakan di setiap form sebagai hidden input, verifikasi di server saat form dikirim. Mencegah serangan cross-site request forgery.
## Input Validation
filter_var($email, FILTER_VALIDATE_EMAIL) = validasi email bawaan PHP. FILTER_VALIDATE_INT, FILTER_SANITIZE_SPECIAL_CHARS. Validasi di sisi server adalah keamanan sesungguhnya — validasi di sisi klien (HTML5) hanya untuk UX.

---

## Eksperimen

1. **## Password Hashing
password_hash($password, PASSWORD_DEFAULT) = hash bcrypt dengan salt otomatis. Tidak bisa di-reverse (one-way). password_verify($input, $hash) = cek apakah input cocok dengan hash. JANGAN gunakan md5/sha1 untuk password — terlalu cepat dan tanpa salt.
## XSS Protection
htmlspecialchars($input, ENT_QUOTES, "UTF-8") = mengubah <, >, ", ' menjadi HTML entities. Mencegah eksekusi script di browser. SELALU escape output yang berasal dari user sebelum ditampilkan di HTML.
## CSRF Token
Session-based CSRF token: generate dengan random_bytes(32), simpan di $_SESSION, sertakan di setiap form sebagai hidden input, verifikasi di server saat form dikirim. Mencegah serangan cross-site request forgery.
## Input Validation
filter_var($email, FILTER_VALIDATE_EMAIL) = validasi email bawaan PHP. FILTER_VALIDATE_INT, FILTER_SANITIZE_SPECIAL_CHARS. Validasi di sisi server adalah keamanan sesungguhnya — validasi di sisi klien (HTML5) hanya untuk UX.**

---

## Tantangan

Tingkatkan keamanan: (1) buat form login sederhana dengan session dan proteksi brute-force (hitung percobaan gagal di session, lock 5 menit setelah 5 gagal), (2) tambahkan prepared statement untuk query SELECT dengan WHERE id = :id dan amati bahwa input "1 OR 1=1" tidak menghasilkan data palsu, (3) buat middleware sederhana yang memeriksa CSRF token pada setiap POST request, (4) tulis README: daftar 10 keamanan dasar PHP yang harus diterapkan di setiap project.

---

## Ringkasan

password_hash = aman. htmlspecialchars = anti-XSS. CSRF token = proteksi form. filter_var = validasi. Lanjut: composer.
