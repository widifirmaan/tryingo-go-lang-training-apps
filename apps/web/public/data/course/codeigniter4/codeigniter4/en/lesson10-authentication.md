# Authentication & Authorization

> CodeIgniter 4 | Lesson 10

## Learning Objectives

- Create Auth controller with login and logout methods\n- Use session to store user login status\n- Create custom filter (AuthFilter) to protect routes\n- Use $routes->group() with filter for route grouping

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

## Explanation

## Authentication Flow
Login: user submits form -> controller validates -> session->set('user_id', ...) -> redirect to protected page. Logout: session->destroy() -> redirect to home. AuthFilter::before() checks session->get('user_id') -> redirect to login if not set.
## Route Groups
$routes->group('admin', ['filter' => 'auth'], function($routes) { ... }) — all routes in group require 'auth' filter. If user not logged in, filter redirects to /login.
## Session Security
session()->set('user_id', $userId) — store user ID. session()->get('user_id') — check if logged in. session->destroy() — logout. Never store password in session. Always use session->regenerate() after login to prevent session fixation.

---

## Experiments

1. **## Authentication Flow
Login: user submits form -> controller validates -> session->set('user_id', ...) -> redirect to protected page. Logout: session->destroy() -> redirect to home. AuthFilter::before() checks session->get('user_id') -> redirect to login if not set.
## Route Groups
$routes->group('admin', ['filter' => 'auth'], function($routes) { ... }) — all routes in group require 'auth' filter. If user not logged in, filter redirects to /login.
## Session Security
session()->set('user_id', $userId) — store user ID. session()->get('user_id') — check if logged in. session->destroy() — logout. Never store password in session. Always use session->regenerate() after login to prevent session fixation.**

---

## Challenge

Level up authentication: (1) create register page with password confirmation validation, (2) store user in database (users table) instead of hardcode, (3) add role-based middleware (admin vs user), (4) implement remember-me with persistent cookie.

---

## Summary

Auth = login/logout. Session = user status. Filter = route protection. Route group = grouping + filter. Next: REST API.
