# Laravel Intro & Artisan

> Laravel | Laravel Fundamentals | Lesson 1

## Learning Objectives

- Understand Laravel: the most popular PHP MVC framework
- Learn the Laravel 12 project structure (app, routes, config, database, resources)
- Run the server with php artisan serve and inspect routes with route:list
- Understand the request cycle: URL → Route → Controller/Closure → View → Response

---

## Program: Laravel Intro & Artisan

```php
<?php

use Illuminate\Support\Facades\Route;

Route::get('/', function () {
    return view('beranda', ['judul' => 'Selamat datang di Tryngo Laravel!']);
});

Route::get('/waktu', function () {
    return now()->toDateTimeString();
});

```

---

## Explanation

## Request Lifecycle
The browser sends GET / → public/index.php (the front controller) → bootstrap/app.php prepares the Application → the router matches the URL to a route → the closure runs → an HTML response returns. Every PHP request passes through ONE door - this is the front controller pattern.
## Routes: The Heart of Laravel
routes/web.php is the URL map of the app. Route::get('/') registers the root URL. The closure receives a Request and returns a Response. 'waktu' uses the now() helper - the framework boots fully before any route runs, so Laravel helpers are available everywhere.
## view(): Blade as the Answer
view('beranda', ['judul' => ...]) looks up resources/views/beranda.blade.php and passes data. Blade: {{ $judul }} = echo with automatic escaping (anti-XSS). url('/waktu') builds an absolute URL from a path.
## Artisan: The Toolbox
php artisan list (all commands), route:list (the route map), make:model/make:controller (scaffolding), tinker (an interactive REPL). Artisan is Laravel's differentiator: most tasks are done through console commands, not by hand.

---

## Experiments

1. **Request Lifecycle**
2. **Routes: The Heart of Laravel**
3. **view(): Blade as the Answer**
4. **Artisan: The Toolbox**

---

## Challenge

Explore the setup: (1) add a /profil route returning HTML text with your name, (2) build a /kalkulator/{a}/{b} route whose closure sums two numbers, (3) change the / route to a closure returning response()->json([...]) and observe the browser difference, (4) run php artisan route:list and write its output in the README.

---

## Summary

Front controller + routes = the single door. Artisan = the toolbox. Views = Blade. Next: routing & controllers.
