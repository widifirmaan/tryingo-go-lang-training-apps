# Controllers & Routing — Official CI4 Shop Doors

> **Kategori:** CodeIgniter | **Level:** Beginner | **Minggu 2:** Controllers & Routing

## Learning Objectives

- Understand `app/Config/Routes.php` with `$routes->get('products', 'Products::index')` (source: routing.html)
- Distinguish `get()` vs `add()` — use `get()` for GET, `post()` for POST (safe, not legacy `add()`)
- `(:segment)` for `products/(:segment)` → `Products::detail/$1`, and `(:num)` for numbers
- `php spark routes` checks the map

---

## Why This Matters (Non-IT)

Without a correct `Routes.php`, `http://localhost:8080/products` 404s. With `$routes->get('products', 'Products::index')`, 1 line becomes a door. Legacy CI3 `add()` is unsafe — use `get()`/`post()`.

---

## Program: Official Product Doors

```php
// app/Config/Routes.php — official (userguide)
use CodeIgniter\Router\RouteCollection;
/** @var RouteCollection $routes */
$routes->get('/', 'Home::index');
$routes->get('products', 'Products::index');          // GET /products → Products::index
$routes->get('products/(:segment)', 'Products::detail/$1'); // /products/rice → detail("rice")
$routes->post('products', 'Products::save');       // POST for forms
$routes->get('products/(:num)/edit', 'Products::edit/$1'); // (:num) numbers only

// app/Controllers/Products.php
namespace App\Controllers;
class Products extends BaseController {
  public function index(){
    $data["products"] = [["name"=>"Rice","price"=>62000],["name"=>"Spinach","price"=>5000]];
    return view('products', $data);
  }
  public function detail($slug){
    return "Detail: " . esc($slug);
  }
  public function save(){
    $name = $this->request->getPost('name');
    return "Save $name";
  }
}
```

**Check the map:**
```bash
php spark routes
# GET  products → Products::index
# GET  products/(:segment) → Products::detail/$1
```

---

## Key Concepts

### `$routes->get()` vs `add()`
`get('products', 'Products::index')` GET only. `add()` accepts all verbs (unsafe) — avoid except legacy.

### Placeholder `(:segment)` vs `(:num)`
`(:segment)` for `rice` text, `(:num)` for `123`.

### `php spark routes`
Lists all registered doors.

---

## Beginner Friendly Explanation

### Analogy: Shop Doors with Labels
- **`Routes.php` = door board**: `get('products', 'Products::index')` label "Products Door → Products Waiter, index table".
- **`(:segment)` = sliding door**: `products/rice` and `products/spinach` 1 sliding door, `detail($slug)` reads the `rice` label.

### Step 0 — Prepare Device

Ready from W1: `php -v`, `composer`, `php spark serve` on `8080`. No XAMPP needed for dev.

### How the Computer Reads It

1. Browser `GET /products` → `Routes.php` finds `get('products', ...)` → `Products::index()` → `view('products')`.
2. Browser `GET /products/rice` → matches `products/(:segment)` → `detail("rice")`.

### 3 Must-Know Terms

1. **Routes.php**: door board
2. **get/post**: GET/POST doors
3. **(:segment)**: URL variable

---

## Experiments

- **Green:** Add `$routes->get('contact', 'Contact::index')` → `http://localhost:8080/contact`?
- **Yellow:** Change `(:segment)` to `(:num)` then open `/products/rice` → 404? Change back.
- **Red:** Use `$routes->add('products', ...)` then POST → also accepts GET (unsafe). Switch to `get`.

---

## Challenge

**3-Door Shop:** `get('')` Home, `get('products')` index, `get('products/(:num)')` numeric detail, `post('products')` save. `php spark routes` screenshot.

---

## Mini Glossary

- **Routes.php/$routes**: board & collection
- **get/post**: HTTP doors
- **(:segment)/(:num)**: placeholders

---

## Summary

Week 2 of 5: **Official CI4 Doors** (Level: Beginner). Safe `get` map installed. Next: **Views & Templates** — `view()` showcase.
