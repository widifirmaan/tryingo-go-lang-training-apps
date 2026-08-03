# Application Security

> PHP | Lesson 12

## Learning Objectives

- Secure passwords with password_hash / password_verify\n- Protect against XSS with htmlspecialchars\n- Understand CSRF tokens and sessions\n- Validate input with filter_var

---

## Program: Application Security

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

## Explanation

## Password Hashing
password_hash($password, PASSWORD_DEFAULT) = hash bcrypt with automatic salt. Cannot be reversed (one-way). password_verify($input, $hash) = check if input matches the hash. NEVER use md5/sha1 for passwords — too fast and no salt.
## XSS Protection
htmlspecialchars($input, ENT_QUOTES, "UTF-8") = converts <, >, ", ' to HTML entities. Prevents script execution in the browser. ALWAYS escape user-derived output before displaying in HTML.
## CSRF Token
Session-based CSRF token: generate with random_bytes(32), store in $_SESSION, include in every form as a hidden input, verify on the server when the form is submitted. Prevents cross-site request forgery attacks.
## Input Validation
filter_var($email, FILTER_VALIDATE_EMAIL) = PHP built-in email validation. FILTER_VALIDATE_INT, FILTER_SANITIZE_SPECIAL_CHARS. Server-side validation is the real security — client-side (HTML5) validation is only for UX.

---

## Experiments

1. **## Password Hashing
password_hash($password, PASSWORD_DEFAULT) = hash bcrypt with automatic salt. Cannot be reversed (one-way). password_verify($input, $hash) = check if input matches the hash. NEVER use md5/sha1 for passwords — too fast and no salt.
## XSS Protection
htmlspecialchars($input, ENT_QUOTES, "UTF-8") = converts <, >, ", ' to HTML entities. Prevents script execution in the browser. ALWAYS escape user-derived output before displaying in HTML.
## CSRF Token
Session-based CSRF token: generate with random_bytes(32), store in $_SESSION, include in every form as a hidden input, verify on the server when the form is submitted. Prevents cross-site request forgery attacks.
## Input Validation
filter_var($email, FILTER_VALIDATE_EMAIL) = PHP built-in email validation. FILTER_VALIDATE_INT, FILTER_SANITIZE_SPECIAL_CHARS. Server-side validation is the real security — client-side (HTML5) validation is only for UX.**

---

## Challenge

Level up security: (1) build a simple login form with session and brute-force protection (count failed attempts in session, lock for 5 minutes after 5 failures), (2) add a prepared statement for a SELECT query with WHERE id = :id and observe that input "1 OR 1=1" does not produce fake data, (3) build a simple middleware that checks the CSRF token on every POST request, (4) write a README: a checklist of 10 basic PHP security practices for every project.

---

## Summary

password_hash = safe. htmlspecialchars = anti-XSS. CSRF token = form protection. filter_var = validation. Next: composer.
