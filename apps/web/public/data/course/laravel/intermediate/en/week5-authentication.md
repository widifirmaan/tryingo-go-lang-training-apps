# Authentication & Authorization

> **Kategori:** Laravel | **Level:** undefined | **Minggu 5:** Authentication & Authorization

## Learning Objectives

- Laravel Breeze: lightweight auth scaffolding
- Auth Facade: attempt, login, logout, check, user
- Middleware auth: protect routes with authentication
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

## Key Concepts

### Breeze
Minimal scaffolding: login, register, password reset.

### Auth Facade
`Auth::attempt()` checks credentials, `Auth::user()` current user.

### Middleware
`Route::middleware(['auth'])` redirects to login if unauthenticated.

### Gates & Policies
Gate: closure-based. Policy: class-based for models.

### Blade
`@auth` if logged in, `@guest` if not, `@can` for policy check.

---

## Experiments

- Install Laravel Breeze and explore generated files
- Create custom guard for multi-auth
- Implement role-based access with Gate
- Create Policy for Post model
- Try remember me functionality

---

## Challenge

Build a complete auth system: register, login, logout, middleware protection, role-based access (admin/user).

---

## Summary

Week 5 of 12: **Authentication & Authorization** (Level: Intermediate). Application security. Next week: **Database Relationships**.
