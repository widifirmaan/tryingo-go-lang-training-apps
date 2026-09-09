# Routing & Controllers — Laravel Doors and Waiters

> **Kategori:** Laravel | **Level:** Beginner | **Minggu 2:** Routing & Controllers
> **Prerequisites:** Week 1 — **Laravel Setup**.

## Learning Objectives

- `Route::get('/products', [ProductController::class, 'index'])` doors in `routes/web.php` (source: laravel.com/docs/routing)
- `php artisan make:controller ProductController` builds waiters, `$request->input('find')` reads typing (source: laravel.com/docs/controllers)
- `Route::get('/products/{id}', ...)` dynamic doors

---

## Why This Matters (Non-IT)

Without routes, `http://localhost:8000/products` 404s though controllers are correct. Without controllers, all logic in route closures → 500-line `web.php` mess. Split: routes = door boards (1 line), controllers = waiters (logic).

---

## Program: Shop Doors & Waiters

```bash
php artisan make:controller ProductController
```

```php
// routes/web.php — door board (1 line per door)
use App\Http\Controllers\ProductController;

Route::get('/', function () { return view('welcome'); });
Route::get('/products', [ProductController::class, 'index']);
Route::get('/products/{id}', [ProductController::class, 'show']);
```

```php
// app/Http/Controllers/ProductController.php — waiter
namespace App\Http\Controllers;
use Illuminate\Http\Request;

class ProductController extends Controller {
  private $list = [
    ["id" => 1, "name" => "Rice", "price" => 62000],
    ["id" => 2, "name" => "Spinach", "price" => 5000],
  ];

  public function index(Request $req) {
    $find = $req->input('find', '');
    $products = $find
      ? array_filter($this->list, fn($p) => str_contains(strtolower($p["name"]), strtolower($find)))
      : $this->list;
    return view('products', ["products" => $products, "find" => $find]);
  }

  public function show($id) {
    foreach ($this->list as $p) if ($p["id"] == $id) return view('detail', ["p" => $p]);
    abort(404);
  }
}
```

Open `http://localhost:8000/products` → all. `?find=rice` → filtered. `/products/1` → detail.

---

## Key Concepts

### `Route::get()` = Door Board
`Route::get('/products', [ProductController::class, 'index'])` — GET `/products` → `index` method.

### Controller = Waiter
`index(Request $req)` takes `$req`, `view('products', [...])` delivers. `$req->input('find')` reads typing.

### `{id}` = Dynamic Door
`/products/{id}` → `show($id)`. `abort(404)` when missing.

---

## Beginner Friendly Explanation

### Analogy: Restaurant
- **routes/web.php = door board**: "/products → Products waiter, index table".
- **Controller = waiter**: fetches from kitchen, delivers to table (`view`).

### Step 0 — Prepare Device
- Same as W1: `php artisan serve` on `8000`.

### How the Computer Reads It
1. `GET /products?find=rice` → `web.php` matches `get('/products')` → `index($req)`.
2. `$req->input('find')` = "rice" → `array_filter` → `view('products')`.

### 3 Must-Know Terms
1. **Route**: door (1 line)
2. **Controller**: waiter (logic)
3. **Request**: incoming order

---

## Experiments

- **Green:** Open `/products/2` → Spinach? `/products/99` → 404?
- **Yellow:** `?find=RICE` caps → still found? (`strtolower` both sides)
- **Red:** Remove `use App\Http\Controllers\ProductController;` → `Class not found` error? Reattach.

---

## Challenge

**3-Door Shop:** `get('/')` welcome, `get('/products')` + `?find`, `get('/products/{id}')` detail + `abort(404)`. `php artisan route:list` screenshot 3 doors.

---

## Mini Glossary

- **Route/Controller/Request**: door/waiter/order
- **{id}/abort**: dynamic/fail

---

## Summary

Week 2 of 4: **Doors & Waiters** (Level: Beginner). Can display + find + detail. Next: **Blade** — inheriting showcase.
