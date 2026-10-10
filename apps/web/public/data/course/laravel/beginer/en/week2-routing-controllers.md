# Routing & Controllers

> **Kategori:** Laravel | **Level:** Beginner | **Minggu 2:** Routing & Controllers

## Learning Objectives

- Route definition: Route::get, post, put, delete, patch, options
- Route parameters: required {id} and optional {id?}
- Route model binding: implicit binding with type-hint
- Route naming: name() and route() helper
- Resource routes: Route::resource for automatic CRUD

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

## Key Concepts

### Route Definition
`Route::get($uri, $callback)`. HTTP method matches verb.

### Route Parameters
`{id}` required, `{id?}` optional. Injected to callback.

### Model Binding
Type-hint model in controller. Laravel auto-resolves.

### Resource Routes
`Route::resource()` generates 7 CRUD routes.

### Route Groups
Group routes with shared middleware/prefix.

---

## Experiments

- Create route with multiple parameters
- Try route model binding with slug
- Create route group with prefix and middleware
- Use Route::view for static page
- Implement fallback route for 404

---

## Challenge

Create routes for a blog: list posts, single post, create, edit, delete. Use resource controller and named routes.

---

## Summary

Week 2 of 12: **Routing & Controllers** (Level: Beginner). Heart of Laravel. Next week: **Blade Templates**.
