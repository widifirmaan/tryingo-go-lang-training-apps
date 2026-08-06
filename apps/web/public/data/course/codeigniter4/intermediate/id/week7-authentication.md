# Authentication & Authorization

> **Kategori:** CodeIgniter 4 | **Level:** Menengah | **Minggu 7:** Authentication & Authorization

## Tujuan Pembelajaran

- Session: set, get, destroy untuk state management
- Custom authentication dengan password_verify
- Filters: protect routes dengan before filter
- Auth filter: redirect jika belum login
- Role-based access dengan session data

---

## Program: Login System

```php
<?php
echo "=== CI4 Authentication ===<br><br>";

echo "=== Session ===<br>";
echo "// Login<br>";
echo "$session = session();<br>";
echo "$session->set('user_id', $user->id);<br>";
echo "$session->set('logged_in', true);<br><br>";

echo "// Check<br>";
echo "if (session('logged_in')) {<br>";
echo "    // User is logged in<br>";
echo "}<br><br>";

echo "// Logout<br>";
echo "$session->destroy();<br>";
echo "return redirect()->to('/login');<br><br>";

echo "=== Login Simulation ===<br>";
$users = [
    ["id" => 1, "email" => "admin@mail.com", "password" => password_hash("secret123", PASSWORD_DEFAULT), "role" => "admin"],
    ["id" => 2, "email" => "user@mail.com", "password" => password_hash("pass456", PASSWORD_DEFAULT), "role" => "user"],
];

$input_email = "admin@mail.com";
$input_password = "secret123";

$authenticated = false;
foreach ($users as $user) {
    if ($user['email'] === $input_email && password_verify($input_password, $user['password'])) {
        $authenticated = true;
        echo "Login success! Welcome, {$user['email']}<br>";
        echo "Role: {$user['role']}<br>";
        break;
    }
}
if (!$authenticated) {
    echo "Login failed!<br>";
}

echo "<br>=== Filters ===<br>";
echo "// app/Config/Filters.php<br>";
echo "public $aliases = [<br>";
echo "    'auth' => \App\Filters\AuthFilter::class,<br>";
echo "];<br>";
echo "public $globals = [<br>";
echo '    "before' => ["auth"],<br>';
echo "];<br><br>";

echo "=== Auth Filter ===<br>";
echo "class AuthFilter implements FilterInterface {<br>";
echo "    public function before(RequestInterface $request) {<br>";
echo "        if (!session('logged_in')) {<br>";
echo "            return redirect()->to('/login');<br>";
echo "        }<br>";
echo "    }<br>";
echo "}<br>";
>
```

---

## Konsep Kunci

### Session
`session()->set('key', $value)`, `session('key')`, `session()->destroy()`.

### Custom Auth
Manual: query user by email, verify password dengan `password_verify()`.

### Filters
`before()` dijalankan sebelum controller. Redirect jika tidak auth.

### Auth Filter
Implement `FilterInterface`. Cek session, redirect ke login jika tidak auth.

### Apply Filter
`$routes->group('/', ['filter' => 'auth'], function ($routes) {...})`.

---

## Eksperimen

- Implementasikan login/logout dengan session
- Buat auth filter untuk protect routes
- Coba remember me dengan cookie
- Buat role-based access (admin/user)
- Implementasikan CSRF protection

---

## Tantangan

Buat sistem auth lengkap: register, login, logout, auth filter, role-based access, CSRF protection.

---

## Ringkasan

Minggu 7 dari 10: **Authentication & Authorization** (Level: Menengah). Keamanan aplikasi. Minggu depan: **REST API**.
