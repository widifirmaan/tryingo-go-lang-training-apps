# Authentication & Authorization

> **Kategori:** CodeIgniter 4 | **Level:** Intermediate | **Minggu 7:** Authentication & Authorization

## Learning Objectives

- Session: set, get, destroy for state management
- Custom authentication with password_verify
- Filters: protect routes with before filter
- Auth filter: redirect if not logged in
- Role-based access with session data

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

## Key Concepts

### Session
`session()->set()`, `session('key')`, `session()->destroy()`.

### Custom Auth
Manual: query user, verify with `password_verify()`.

### Filters
`before()` runs before controller. Redirect if unauthenticated.

### Auth Filter
Implement `FilterInterface`. Check session, redirect to login.

### Apply Filter
`$routes->group('/', ['filter' => 'auth'], ...)`.

---

## Experiments

- Implement login/logout with sessions
- Create auth filter to protect routes
- Try remember me with cookies
- Create role-based access (admin/user)
- Implement CSRF protection

---

## Challenge

Build a complete auth system: register, login, logout, auth filter, role-based access, CSRF protection.

---

## Summary

Week 7 of 10: **Authentication & Authorization** (Level: Intermediate). Application security. Next week: **REST API**.
