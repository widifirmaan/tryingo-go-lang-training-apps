# Authentication & Authorization

> **Kategori:** Laravel | **Level:** Menengah | **Minggu 5:** Authentication & Authorization

## Tujuan Pembelajaran

- Laravel Breeze: lightweight auth scaffolding
- Auth Facade: attempt, login, logout, check, user
- Middleware auth: protect routes dengan authentication
- Gates & Policies: authorization logic
- Blade directives: @auth, @guest, @can

---

## Program: Login System

```php
<?php
echo "=== Laravel Authentication ===<br><br>";

echo "=== Breeze / Jetstream ===<br>";
echo "composer require laravel/breeze --dev<br>";
echo "php artisan breeze:install<br>";
echo "npm install && npm run dev<br>";
echo "php artisan migrate<br><br>";

echo "=== Auth Facade ===<br>";
echo "Auth::attempt(['email' => $email, 'password' => $password]);<br>";
echo "Auth::login($user);<br>";
echo "Auth::logout();<br>";
echo "Auth::check();     // Is logged in?<br>";
echo "Auth::user();      // Current user<br>";
echo "Auth::id();        // Current user id<br><br>";

echo "=== Login Simulation ===<br>";
$users = [
    ["id" => 1, "email" => "admin@example.com", "password" => password_hash("secret123", PASSWORD_DEFAULT), "role" => "admin"],
    ["id" => 2, "email" => "user@example.com", "password" => password_hash("pass456", PASSWORD_DEFAULT), "role" => "user"],
];

$input_email = "admin@example.com";
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

echo "<br>=== Middleware Auth ===<br>";
echo "Route::middleware(['auth'])->group(function () {<br>";
echo "    Route::get('/dashboard', [DashboardController::class, 'index']);<br>";
echo "});<br><br>";

echo "=== Gates & Policies ===<br>";
echo "Gate::define('edit-post', function (User $user, Post $post) {<br>";
echo "    return $user->id === $post->user_id;<br>";
echo "});<br><br>";

echo "=== Blade Auth ===<br>";
echo "@auth ... @endauth<br>";
echo "@guest ... @endguest<br>";
echo "@can('edit-post', $post) ... @endcan<br>";
>
```

---

## Konsep Kunci

### Breeze
Scaffolding minimal: login, register, password reset. `php artisan breeze:install`.

### Auth Facade
`Auth::attempt()` cek credentials, `Auth::login()` manual login, `Auth::user()` current user.

### Middleware
`Route::middleware(['auth'])` — redirect ke login jika belum auth.

### Gates & Policies
Gate: closure-based authorization. Policy: class-based untuk model.

### Blade
`@auth` hanya tampil jika login, `@guest` jika belum, `@can` untuk policy check.

---

## Eksperimen

- Install Laravel Breeze dan explore generated files
- Buat custom guard untuk multi-auth
- Implementasikan role-based access dengan Gate
- Buat Policy untuk Post model
- Coba remember me functionality

---

## Tantangan

Buat sistem auth lengkap: register, login, logout, middleware protection, role-based access (admin/user).

---

## Ringkasan

Minggu 5 dari 12: **Authentication & Authorization** (Level: Menengah). Keamanan aplikasi. Minggu depan: **Database Relationships**.
