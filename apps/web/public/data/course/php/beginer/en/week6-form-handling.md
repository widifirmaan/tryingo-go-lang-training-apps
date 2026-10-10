# Form Handling & Validation

> **Kategori:** PHP | **Level:** Beginner | **Minggu 6:** Form Handling & Validation

## Learning Objectives

- Superglobals: $_GET, $_POST, $_SERVER for request data
- Input sanitization: htmlspecialchars, strip_tags, trim
- Validation: empty, strlen, filter_var for email
- Password hashing: password_hash and password_verify
- CSRF tokens and basic form security

---

## Program: Registration Form

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

## Key Concepts

### Superglobals
`$_POST` form data, `$_GET` query string, `$_SERVER` server info.

### Sanitization
`trim()`, `strip_tags()`, `htmlspecialchars()` for XSS prevention.

### Validation
`empty()`, `strlen()`, `filter_var()` for email.

### Passwords
`password_hash()` with `PASSWORD_DEFAULT`. Verify with `password_verify()`.

---

## Experiments

- Validate with regex: preg_match for custom formats
- Create validateRequired function for multiple fields
- Try $_FILES for file upload
- Implement simple CSRF token
- Use filter_input for automatic sanitization

---

## Challenge

Build a complete login form: email/username validation, password, remember me, with per-field error messages.

---

## Summary

Week 6 of 12: **Form Handling & Validation** (Level: Beginner). Beginner phase complete! Next week: **PHP Security** (Intermediate).
