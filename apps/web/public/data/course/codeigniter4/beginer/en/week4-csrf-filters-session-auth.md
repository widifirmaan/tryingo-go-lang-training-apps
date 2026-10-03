# Portal Security: CSRF Protection, Sessions & Security Route Filters

> **Kategori:** CodeIgniter 4 | **Level:** Beginner | **Minggu 4:** Portal Security: CSRF Protection, Sessions & Security Route Filters

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

## Summary

You have mastered Route Filters, CSRF defense, and RBAC in CI4. Level 1 complete! Level 2 covers RESTful APIs, Database Transactions, and our SIS Capstone.
