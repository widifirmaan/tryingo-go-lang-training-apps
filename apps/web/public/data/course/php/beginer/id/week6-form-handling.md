# Form Handling & Validasi

> **Kategori:** PHP | **Level:** Pemula | **Minggu 6:** Form Handling & Validasi

## Tujuan Pembelajaran

- Superglobals: $_GET, $_POST, $_SERVER untuk data request
- Sanitasi input: htmlspecialchars, strip_tags, trim
- Validasi: empty, strlen, filter_var untuk email
- Password hashing: password_hash dan password_verify
- CSRF token dan keamanan form dasar

---

## Program: Form Registrasi

```php
<?php
function sanitize(string $input): string {
    return htmlspecialchars(strip_tags(trim($input)), ENT_QUOTES, 'UTF-8');
}

$errors = [];
$nama = $email = "";

if (true) {
    $input_nama = "  Budi Santoso  ";
    $input_email = "budi@example.com";

    $nama = sanitize($input_nama);
    $email = sanitize($input_email);

    if (empty($nama)) {
        $errors[] = "Nama wajib diisi";
    } elseif (strlen($nama) < 3) {
        $errors[] = "Nama minimal 3 karakter";
    }

    if (empty($email)) {
        $errors[] = "Email wajib diisi";
    } elseif (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
        $errors[] = "Format email tidak valid";
    }
}

echo "=== Hasil Validasi ===<br>";
if (empty($errors)) {
    echo "Registrasi berhasil!<br>";
    echo "Nama: $nama<br>";
    echo "Email: $email<br>";
} else {
    echo "Terjadi error:<br>";
    foreach ($errors as $error) {
        echo "- $error<br>";
    }
}

$password = "rahasia123";
$hashed = password_hash($password, PASSWORD_DEFAULT);
echo "<br>Password hash: " . substr($hashed, 0, 20) . "...<br>";
echo "Verify: " . (password_verify($password, $hashed ? "Valid" : "Invalid")) . "<br>";
>
```

---

## Konsep Kunci

### Superglobals
`$_POST` data form POST, `$_GET` query string, `$_SERVER` info server.

### Sanitasi
`trim()` hapus spasi, `strip_tags()` hapus HTML, `htmlspecialchars()` escape XSS.

### Validasi
`empty()` cek kosong, `strlen()` panjang, `filter_var($email, FILTER_VALIDATE_EMAIL)`.

### Password
`password_hash()` dengan `PASSWORD_DEFAULT`. Verifikasi dengan `password_verify()`.

---

## Eksperimen

- Validasi dengan regex: preg_match untuk format khusus
- Buat fungsi validateRequired untuk multiple field
- Coba $_FILES untuk upload file
- Implementasikan CSRF token sederhana
- Gunakan filter_input untuk sanitasi otomatis

---

## Tantangan

Buat form login lengkap: validasi email/username, password, remember me, dengan error messages per field.

---

## Ringkasan

Minggu 6 dari 12: **Form Handling & Validasi** (Level: Pemula). Selesai fase Beginner! Minggu depan: **Keamanan PHP** (Intermediate).
