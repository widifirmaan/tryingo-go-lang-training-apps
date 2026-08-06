# Routing & Controllers

> **Kategori:** Laravel | **Level:** Pemula | **Minggu 2:** Routing & Controllers

## Tujuan Pembelajaran

- Route definition: Route::get, post, put, delete, patch, options
- Route parameters: required {id} dan optional {id?}
- Route model binding: implicit binding dengan type-hint
- Route naming: name() dan route() helper
- Resource routes: Route::resource untuk CRUD otomatis

---

## Program: Route & Controller

```php
<?php
echo "=== Laravel Routing ===<br><br>";

// routes/web.php (simulated)
$routes = [
    ["GET", "/", "HomeController@index", "home"],
    ["GET", "/about", "PageController@about", "about"],
    ["GET", "/users", "UserController@index", "users.index"],
    ["GET", "/users/{id}", "UserController@show", "users.show"],
    ["POST", "/users", "UserController@store", "users.store"],
    ["PUT", "/users/{id}", "UserController@update", "users.update"],
    ["DELETE", "/users/{id}", "UserController@destroy", "users.destroy"],
];

echo "Method | URI | Action | Name<br>";
echo "-------|-----|--------|------<br>";
foreach ($routes as [$method, $uri, $action, $name]) {
    echo "$method | $uri | $action | $name<br>";
}

echo "<br>=== Route Parameters ===<br>";
echo "Route::get('/posts/{post}', function (Post $post) {<br>";
echo "    return $post->title;<br>";
echo "});<br><br>";

echo "=== Route Model Binding ===<br>";
echo "public function show(Post $post)  // Auto-resolve by id<br>";
echo "public function show(Post $post:slug)  // Resolve by slug<br><br>";

echo "=== Resource Route ===<br>";
echo "Route::resource('posts', PostController::class);<br>";
echo "Creates: index, create, store, show, edit, update, destroy<br><br>";

echo "=== Controller Example ===<br>";
echo "php artisan make:controller PostController --resource<br>";
>
```

---

## Konsep Kunci

### Route Definition
`Route::get($uri, $callback)`. HTTP method sesuai verb.

### Route Parameters
`{id}` required, `{id?}` optional. Diinject ke callback/controller.

### Model Binding
Type-hint model di controller parameter. Laravel auto-resolve by id atau field.

### Resource Routes
`Route::resource('posts', PostController)` generate 7 routes CRUD sekaligus.

### Route Groups
`Route::middleware(['auth'])->group(function () {})` untuk apply middleware.

---

## Eksperimen

- Buat route dengan multiple parameters
- Coba route model binding dengan slug
- Buat route group dengan prefix dan middleware
- Gunakan Route::view untuk static page
- Implementasikan fallback route untuk 404

---

## Tantangan

Buat routes untuk blog: list posts, single post, create, edit, delete. Gunakan resource controller dan named routes.

---

## Ringkasan

Minggu 2 dari 12: **Routing & Controllers** (Level: Pemula). Heart of Laravel. Minggu depan: **Blade Templates**.
