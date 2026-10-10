# PHP Security

> **Kategori:** PHP | **Level:** Intermediate | **Minggu 7:** PHP Security

## Learning Objectives

- XSS Prevention: htmlspecialchars for output encoding
- SQL Injection: prepared statements and parameterized queries
- CSRF Protection: token generation and validation
- Input Validation: filter_var with various filters
- Session Security: session_start, regenerate_id, HTTP-only

---

## Program: Security Check

```php
<?php
$user_input = '<script>alert("XSS")</script>Hello';
$safe = htmlspecialchars($user_input, ENT_QUOTES, 'UTF-8');
echo "XSS Safe: $safe<br>";

$search = "Budi";
$safe_search = urlencode($search);
echo "URL Safe: $safe_search<br>";

$email = "user@example.com";
if (filter_var($email, FILTER_VALIDATE_EMAIL)) {
    echo "Email valid: $email<br>";
}

$age = "25";
if (filter_var($age, FILTER_VALIDATE_INT, ["options" => ["min_range" => 1, "max_range" => 150]])) {
    echo "Age valid: $age<br>";
}

$ip = "192.168.1.1";
if (filter_var($ip, FILTER_VALIDATE_IP)) {
    echo "IP valid: $ip<br>";
}

$token = bin2hex(random_bytes(32));
echo "CSRF Token: " . substr($token, 0, 16) . "...<br>";

session_start();
$_SESSION['user_id'] = 123;
$_SESSION['token'] = $token;
echo "Session started: user_id=" . $_SESSION['user_id'] . "<br>";

$password = "user_password";
$hash = password_hash($password, PASSWORD_BCRYPT, ['cost' => 12]);
echo "Bcrypt: " . substr($hash, 0, 20) . "...<br>";
echo "Verify: " . (password_verify($password, $hash) ? "Valid" : "Invalid") . "<br>";
>
```

---

## Key Concepts

### XSS Prevention
`htmlspecialchars()` converts `<>` to entities. Always escape output.

### SQL Injection
Prepared statements with placeholders. Never concatenate input.

### CSRF Tokens
Generate random tokens (random_bytes), store in session, validate on POST.

### Session Security
`session_regenerate_id()` after login. HTTP-only and Secure cookies.

---

## Experiments

- Create antiXSS function for safe output
- Try SQL injection on unsafe query vs prepared statement
- Implement CSRF token in form
- Set cookie with setcookie() and secure params
- Create simple rate limiting with sessions

---

## Challenge

Build a secure login system: CSRF token, password hashing, session management, and brute force protection.

---

## Summary

Week 7 of 12: **PHP Security** (Level: Intermediate). Security is a production priority. Next week: **PDO & Database**.
