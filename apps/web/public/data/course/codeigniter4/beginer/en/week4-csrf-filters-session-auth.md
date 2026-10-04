# Portal Security: CSRF Protection, Sessions & Security Route Filters

> **Kategori:** CodeIgniter 4 | **Level:** Beginner | **Minggu 4:** Portal Security: CSRF Protection, Sessions & Security Route Filters
> ⏱️ **Estimated Time:** 45 Minutes (15m theory, 30m practice) | 🔗 **Pace:** Structured (Step-by-step)


## Learning Objectives

- Master Route Filters architecture (`FilterInterface`) in CodeIgniter 4.
- Understand `before()` (request interception) and `after()` (response security injection) cycles.
- Protect input forms using CI4's native CSRF defense (`csrf_field()`).
- Implement Role-Based Access Control (RBAC) across grade entry modules via filter arguments.

---

## Program: Teacher & Student Role Authentication Filter with FilterInterface in CI4

```php
<?php
// app/Filters/RoleAuthFilter.php (CodeIgniter 4 Route Filter)
namespace App\Filters;

use CodeIgniter\Filters\FilterInterface;
use CodeIgniter\HTTP\RequestInterface;
use CodeIgniter\HTTP\ResponseInterface;

class RoleAuthFilter implements FilterInterface {
    // Dieksekusi SEBELUM Controller dipanggil (Penjaga Gerbang)
    public function before(RequestInterface $request, $arguments = null) {
        $session = session();

        // 1. Periksa apakah user sudah login
        if (!$session->get('is_logged_in')) {
            return redirect()->to('/login')
                ->with('error', 'Sesi Anda telah berakhir. Harap login kembali.');
        }

        // 2. Periksa Peran Pengguna (Role-Based Access Control)
        $userRole = $session->get('user_role'); // 'TEACHER', 'STUDENT', 'ADMIN'
        
        // $arguments dilewatkan dari konfigurasi rute: ['filter' => 'role:TEACHER,ADMIN']
        if (!empty($arguments) && !in_array($userRole, $arguments, true)) {
            // Pengguna login tetapi tidak memiliki hak akses ke modul ini
            return redirect()->to('/portal/unauthorized')
                ->with('error', 'Akses ditolak! Halaman penginputan nilai hanya untuk Guru.');
        }

        return null; // Lanjutkan ke Controller
    }

    // Dieksekusi SETELAH Controller selesai (Pascabedah Respons)
    public function after(RequestInterface $request, ResponseInterface $response, $arguments = null) {
        // Terapkan Security Headers
        $response->setHeader('X-Frame-Options', 'DENY');
        $response->setHeader('X-Content-Type-Options', 'nosniff');
        return $response;
    }
}

// app/Config/Filters.php (Registrasi Filter)
// public array $aliases = [
//     'role' => \App\Filters\RoleAuthFilter::class,
// ];

// Penggunaan di Routes.php:
// $routes->group('grades', ['filter' => 'role:TEACHER,ADMIN'], static function ($routes) {
//     $routes->post('input', 'GradeController::store');
// });

echo "=== CODEIGNITER 4 SECURITY FILTER & RBAC TERKONFIGURASI ===\n";
```

---

## Key Concepts

In legacy CodeIgniter 3, developers manually pasted `if (!isset($_SESSION['user'])) exit;` blocks atop every single controller action—a fragile practice prone to security omissions during rapid development.

### CodeIgniter 4 Route Filters
CodeIgniter 4 introduces **Filters** (the CI4 equivalent to HTTP middleware) implementing `FilterInterface`:
- **before()**: Executes prior to controller entry. If authentication fails or roles mismatch, the filter issues an immediate redirect. The controller action is never reached!
- **after()**: Executes after the controller yields a response, ideal for appending HTTP security headers like anti-Clickjacking (`X-Frame-Options: DENY`).

### Automated CSRF Governance
CI4 ships with native CSRF defense enabled globally in `app/Config/Filters.php`. Simply inject `<?= csrf_field() ?>` inside HTML forms. CI4 verifies the cryptographic token, regenerating tokens securely on submissions.


---

---

## Beginner Friendly Explanation

Imagine the faculty room at an academy. The security guard stationed at the threshold (Filter Before) verifies whether you wear a certified faculty badge. Students are turned back to their home classrooms. And as visitors exit, groundskeepers ensure security gates latch shut (Filter After).

## Experiments

- Access `/grades/input` without active sessions and verify the filter redirects to `/login`.
- Simulate a student session and confirm the filter denies entry to faculty routes.
- Toggle `$csrf->regenerate = true;` inside `app/Config/Security.php` enforcing one-time CSRF tokens.

---

## Challenge

Build a custom Throttle Filter capping failed logins to 5 attempts per IP per minute using CI4's Cache Engine preventing password brute-force attacks.

---

## Visual Mental Model & Architecture Flow

```diagram
┌──────────────────────────────────────────────────────────┐
│ ARSITEKTUR MVC RINGAN CODEIGNITER 4                      │
│                                                          │
│ Public Ingress (public/index.php)                        │
│       │                                                  │
│       ▼                                                  │
│ URI Routing (app/Config/Routes.php)                      │
│       │                                                  │
│       ▼ Filters (Auth/CSRF/CORS)                         │
│ Controller (extends BaseController)                      │
│       │                          │                       │
│       ▼                          ▼                       │
│ Model (Entity & Validation)    View (Render Buffer)      │
│       │                          │                       │
│       ▼                          ▼                       │
│ Database Output ──────────────► Browser Response         │
└──────────────────────────────────────────────────────────┘
```

---

## Syntax Reference & Practical Guide (W3Schools Style)

Here is the comprehensive breakdown of syntax signatures, parameters, return behavior, and isolated runnable examples introduced in this module:

### 1. `$routes->get('items', 'Items::index')`
- **Core Functionality:** Routing URI CodeIgniter 4.
- **Parameters / Attributes:** `HTTP verb, URI string, Controller::method`.
- **System Behavior & Return:** Menghubungkan URL browser ke controller CodeIgniter 4 dengan namespace terorganisir..
- **Practical Code Example:**
```php
<?php
$routes->get('catalog', 'CatalogController::index');
$routes->post('catalog/create', 'CatalogController::create');
```
- **Expected Execution Output:**
```output
Endpoint CI4 siap menerima koneksi HTTP
```

### 2. `class ProductModel extends Model { protected $allowedFields = [...]; }`
- **Core Functionality:** Model CI4 dengan Query Builder bawaan.
- **Parameters / Attributes:** `$table, $primaryKey, $allowedFields`.
- **System Behavior & Return:** Provides operasi database aman dengan proteksi field otomatis tanpa query SQL mentah..
- **Practical Code Example:**
```php
<?php
namespace App\Models;
use CodeIgniter\Model;
class ProductModel extends Model {
    protected $table = 'products';
    protected $allowedFields = ['name', 'price'];
}
```
- **Expected Execution Output:**
```output
Model siap menjalankan method findAll() dan save()
```

### 3. `return view('template_name', $data)`
- **Core Functionality:** Helper render antarmuka View CI4.
- **Parameters / Attributes:** `View path, Data array`.
- **System Behavior & Return:** Mengurai berkas view PHP di dalam direktori `app/Views/` dan menyajikannya ke layar klien..
- **Practical Code Example:**
```php
<?php
$data = ['title' => 'Katalog Produk', 'items' => $items];
return view('products/list', $data);
```
- **Expected Execution Output:**
```output
Halaman web disajikan melalui buffering respons
```

### 4. `$this->request->getPost('fieldName')`
- **Core Functionality:** Retrieval of input request aman CI4.
- **Parameters / Attributes:** `Field identifier, Filter flag`.
- **System Behavior & Return:** Membaca payload POST yang masuk dengan pembersihan sanitasi XSS bawaan framework..
- **Practical Code Example:**
```php
<?php
$title = $this->request->getPost('title', FILTER_SANITIZE_SPECIAL_CHARS);
```
- **Expected Execution Output:**
```output
Input terbaca dengan pembersihan karakter berbahaya
```

---

## Common Pitfalls & Debugging Tips

### 1. Incorrect `baseURL` in `.env`
- **Symptom / Issue:** Assets and navigation redirect to incorrect hosts or fail to load.
- **Root Cause:** Common mistaken assumptions during early development.
- **Fix / Best Practice:** Configure `app.baseURL` to match your exact local or production host address.

### 2. Overlooking CSRF Form Tokens
- **Symptom / Issue:** Leaves form submissions vulnerable to Cross-Site Request Forgery.
- **Root Cause:** Common mistaken assumptions during early development.
- **Fix / Best Practice:** Enable CSRF filters in `Filters.php` and include `<?= csrf_field() ?>` inside HTML forms.

### 3. Case-Sensitivity Mismatches in Namespaces
- **Symptom / Issue:** Fails class autoloading on Linux servers due to uppercase/lowercase discrepancies.
- **Root Cause:** Common mistaken assumptions during early development.
- **Fix / Best Practice:** Follow strict PSR-4 casing matching folder and file names identically.

---

## Summary

You have mastered Route Filters, CSRF defense, and RBAC in CI4. Level 1 complete! Level 2 covers RESTful APIs, Database Transactions, and our SIS Capstone.
