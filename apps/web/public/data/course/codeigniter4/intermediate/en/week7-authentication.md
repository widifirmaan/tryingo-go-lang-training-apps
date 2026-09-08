# Authentication — Real CI4 Shop ID

> **Kategori:** CodeIgniter | **Level:** Intermediate | **Minggu 7:** Authentication & Authorization

## Learning Objectives

- `session()->set('user_id', ...)` ID + `session()->destroy()` logout (source: codeigniter.com/user_guide/libraries/sessions)
- `AuthFilter::before()` door guard filter + register in `Filters.php` (source: user_guide/incoming/filters)
- `password_hash`/`password_verify` (never MD5!)

---

## Why This Matters (Non-IT)

Without auth, anyone opens `/admin` → prices edited for fun. Without filters, login checks written in 20 methods (forget 1 = hole). 1 filter guards all doors.

---

## Program: Real CI4 ID + Guard

```php
// Auth.php — real login (not echo!)
public function login() {
  $email = $this->request->getPost('email');
  $user = (new \App\Models\UserModel())->where('email', $email)->first();
  if ($user && password_verify($this->request->getPost('password'), $user['password'])) {
    session()->set(['user_id' => $user['id'], 'logged_in' => true]);
    session()->regenerate(); // swap keys (anti-hijack!)
    return redirect()->to('/admin');
  }
  return redirect()->back()->with('error', 'Wrong');
}

public function logout() {
  session()->destroy();
  return redirect()->to('/login');
}
```

```php
// Filters/AuthFilter.php — 1 guard for all doors
namespace App\Filters;
use CodeIgniter\Filters\FilterInterface;
use CodeIgniter\HTTP\{RequestInterface, ResponseInterface};

class AuthFilter implements FilterInterface {
  public function before(RequestInterface $request, $arguments = null) {
    if (!session('logged_in')) {
      return redirect()->to('/login'); // kick!
    }
  }
  public function after(RequestInterface $request, ResponseInterface $response, $arguments = null) {}
}
```

```php
// Config/Filters.php — register the guard
public $aliases = ['auth' => \App\Filters\AuthFilter::class];
// Routes.php:
$routes->group('admin', ['filter' => 'auth'], function($routes) {
  $routes->get('/', 'Admin::index');
});
```

---

## Key Concepts

### `session()->set/get/destroy` = ID
`set` gives, `session('logged_in')` checks, `destroy` revokes. `regenerate()` swaps keys.

### Filter `before()` = Door Guard
Runs BEFORE controllers. Returned redirect = kick.

### `password_verify` = Vault Check
Compares hashes, not text.

---

## Beginner Friendly Explanation

### Analogy: Concert Wristband + Guard
- **session = wristband**: enter → wristband, exit → cut.
- **Filter = guard at every admin door**.

### Step 0 — Prepare Device
- Same as W1 + `users` table (migration + 1-admin seeder, `password_hash` password!).

### How the Computer Reads It
1. `GET /admin` → filter `before` → `session('logged_in')`? No → redirect `/login`.
2. Correct login → `set` + `regenerate` → `/admin` passes.

### 3 Must-Know Terms
1. **Session/filter**: wristband/guard
2. **password_verify**: vault-check

---

## Experiments

- **Green:** Open `/admin` logged-out → to `/login`?
- **Yellow:** Wrong login → back + error?
- **Red:** Remove `'filter' => 'auth'` → free without login? (Don't! Attach it.)

---

## Challenge

**ID-Protected Shop:** Real login/logout + `AuthFilter` guarding `/admin/*` + admin seeder + kick & pass screenshots.

---

## Mini Glossary

- **Session/filter/regenerate**: wristband/guard/swap-keys

---

## Summary

Week 7 of 10: **ID + Guard** (Level: Intermediate). Doors guarded. Next: **REST API**.
