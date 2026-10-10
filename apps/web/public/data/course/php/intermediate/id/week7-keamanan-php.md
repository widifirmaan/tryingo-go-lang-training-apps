# Keamanan PHP

> **Kategori:** PHP | **Level:** Menengah | **Minggu 7:** Keamanan PHP

## Tujuan Pembelajaran

- XSS Prevention: htmlspecialchars untuk output encoding
- SQL Injection: prepared statements dan parameterized queries
- CSRF Protection: token generation dan validation
- Input Validation: filter_var dengan berbagai filter
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

## Konsep Kunci

### XSS Prevention
`htmlspecialchars()` convert `<>` ke entity. Selalu escape output ke HTML.

### SQL Injection
Prepared statements: `$pdo->prepare("SELECT * FROM u WHERE id = ?")`. Jangan concatenate input ke query.

### CSRF Token
Generate token random (random_bytes), simpan di session, validasi setiap POST request.

### Session Security
`session_regenerate_id()` setelah login. Set cookie HTTP-only dan Secure.

---

## Eksperimen

- Buat fungsi antiXSS untuk output aman
- Coba SQL injection pada query tidak aman vs prepared statement
- Implementasikan CSRF token di form
- Set cookie dengan setcookie() dan params aman
- Buat rate limiting sederhana dengan session

---

## Tantangan

Buat sistem login aman: CSRF token, password hash, session management, dan protection terhadap brute force.

---

## Ringkasan

Minggu 7 dari 12: **Keamanan PHP** (Level: Menengah). Keamanan adalah prioritas produksi. Minggu depan: **PDO & Database**.
