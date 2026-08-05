# Authentication & Authorization

> CodeIgniter 4 | Pelajaran 10

## Tujuan Pembelajaran

- Membuat controller Auth dengan method login dan logout\n- Menggunakan session untuk menyimpan status login user\n- Membuat custom filter (AuthFilter) untuk melindungi route\n- Menggunakan $routes->group() dengan filter untuk route grouping

---

## Program: CodeIgniter 4

```php
<?php

namespace App\Controllers;

use CodeIgniter\HTTP\HTTPRequest;

class Auth extends BaseController
{
    public function login(): string
    {
        if ($this->request->getMethod() === 'post') {
            $username = $this->request->getPost('username');
            $password = $this->request->getPost('password');

            if ($username === 'admin' && $password === 'secret123') {
                session()->set('user_id', 1);
                session()->set('username', $username);
                return redirect()->to('/admin');
            }

            session()->setFlashdata('error', 'Username atau password salah!');
            return redirect()->back()->withInput();
        }

        return view('auth/login');
    }

    public function logout(): string
    {
        session()->destroy();
        return redirect()->to('/');
    }

    public function isLoggedIn(): bool
    {
        return session()->get('user_id') !== null;
    }
}

```

---

## Penjelasan

## Authentication Flow
Login: user submits form -> controller validates -> session->set('user_id', ...) -> redirect to protected page. Logout: session->destroy() -> redirect to home. AuthFilter::before() checks session->get('user_id') -> redirect to login if not set.
## Route Groups
$routes->group('admin', ['filter' => 'auth'], function($routes) { ... }) — semua route di dalam group memerlukan 'auth' filter. Jika user belum login, filter redirect ke /login.
## Session Security
session()->set('user_id', $userId) — store user ID. session()->get('user_id') — check if logged in. session()->destroy() — logout. Never store password in session. Always use session->regenerate() after login to prevent session fixation.

---

## Eksperimen

1. **## Authentication Flow
Login: user submits form -> controller validates -> session->set('user_id', ...) -> redirect to protected page. Logout: session->destroy() -> redirect to home. AuthFilter::before() checks session->get('user_id') -> redirect to login if not set.
## Route Groups
$routes->group('admin', ['filter' => 'auth'], function($routes) { ... }) — semua route di dalam group memerlukan 'auth' filter. Jika user belum login, filter redirect ke /login.
## Session Security
session()->set('user_id', $userId) — store user ID. session()->get('user_id') — check if logged in. session()->destroy() — logout. Never store password in session. Always use session->regenerate() after login to prevent session fixation.**

---

## Tantangan

Tingkatkan authentication: (1) buat halaman register dengan validasi password confirmation, (2) simpan user di database (tabel users) alih-alih hardcode, (3) tambah middleware role-based (admin vs user), (4) implementasi remember-me dengan cookie persisten.

---

## Ringkasan

Auth = login/logout. Session = status user. Filter = proteksi route. Route group = grouping + filter. Lanjut: REST API.
