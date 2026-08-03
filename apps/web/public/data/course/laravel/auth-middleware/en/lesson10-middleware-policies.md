# Middleware & Policies

> Laravel | Auth & Middleware | Lesson 10

## Learning Objectives

- Create custom middleware and register aliases in bootstrap/app.php
- Understand middleware order and responsibility (auth first, then business)
- Write per-model Policies and leverage auto-discovery
- Enforce authorization in controllers ($this->authorize) and blade (@can)

---

## Program: Middleware & Policies

```php
<?php

namespace App\Policies;

use App\Models\Artikel;
use App\Models\User;

class ArtikelPolicy
{
    public function viewAny(?User $user): bool
    {
        return true;
    }

    public function view(?User $user, Artikel $artikel): bool
    {
        return true;
    }

    public function create(User $user): bool
    {
        return true;
    }

    public function update(User $user, Artikel $artikel): bool
    {
        return $user->id === $artikel->penulis_id;
    }

    public function delete(User $user, Artikel $artikel): bool
    {
        return $user->id === $artikel->penulis_id || $user->peran === 'admin';
    }
}

```

---

## Explanation

## Middleware: Filters on the Request's Path
Middleware checks a request BEFORE the controller runs. Aliases are registered in bootstrap/app.php: $middleware->alias([...]) - then used like the built-in 'auth': ->middleware('admin'). Array order matters: ['auth', 'admin'] - check login first, then role, so guests get redirected to login instead of a 403.
## Middleware vs Controller
Middleware = decisions IDENTICAL across many routes (must be logged in, must be admin, profile must be complete). Controller = route-specific logic. If a check is used by one route only it may live in the controller - if it is reused, make middleware.
## Policy: Per-Model Rules
ArtikelPolicy governs authorization per MODEL: viewAny/view allow everyone (reading), update only the author, delete the author or an admin. Laravel 11+ discovers policies automatically (ArtikelPolicy matching Artikel). No hardcoded roles in the controller - all decisions live in one place.
## Two Places to Enforce
$this->authorize('update', $artikel) in the controller: throws 403 on failure. @can('update', $artikel) in blade: hides the button. Hiding the UI is for CONVENIENCE, authorize in the backend is the actual SECURITY - you need both.

---

## Experiments

1. **Middleware: Filters on the Request's Path**
2. **Middleware vs Controller**
3. **Policy: Per-Model Rules**
4. **Two Places to Enforce**

---

## Challenge

Extend the authorization system: (1) add a CachePublik middleware (sets a Cache-Control: public header on the response) for the /artikel route, (2) write a PostPolicy for a new Post model: only the author can update, admins can delete, everyone can read, (3) add a "Delete" action on articles with a confirm button and a DELETE route calling $this->authorize('delete', $artikel), (4) document in the README a table of the 4 policy methods + who is allowed.

---

## Summary

Middleware = per-request filters. Policies = per-model rules. @can = UI, authorize = security. Next: mail & notifications.
