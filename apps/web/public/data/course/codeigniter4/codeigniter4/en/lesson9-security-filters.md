# Security: CSRF, XSS & Filters

> CodeIgniter 4 | Lesson 9

## Learning Objectives

- Enable CSRF protection in Filters.php\n- Use csrf_field() and csrf_hash() in forms\n- Understand Honeypot filter for bot protection\n- Use esc() to prevent XSS in views

---

## Program: CodeIgniter 4

```php
<?php

namespace Config;

use CodeIgniter\Config\Filters as BaseFilters;

class Filters extends BaseFilters
{
    public array $aliases = [
        'csrf'     => \CodeIgniter\Filters\CSRF::class,
        'toolbar'  => \CodeIgniter\Filters\DebugToolbar::class,
        'honeypot' => \CodeIgniter\Filters\Honeypot::class,
    ];

    public array $before = [
        'csrf' => ['except' => ['api/*']],
        'honeypot' => ['except' => ['api/*']],
    ];

    public array $after = [
        'toolbar',
    ];

    public array $aliases = [];
}

```

---

## Explanation

## CSRF in CI4
Filters.php $before = ['csrf'] — CSRF filter auto-validates every POST request. csrf_field() — adds hidden input with token. csrf_hash() — returns token value for manual embedding.
## XSS Prevention
esc($variable) — escape HTML entities. CI4 auto-escapes all output in views when using <?= ?> shorthand. Never use <?= $userInput ?> without esc().
## Honeypot Filter
Honeypot adds a hidden field that real users never fill. Bots auto-fill it. If honeypot field has value, request is rejected as bot.
## Filter Aliases
'csrf' => CSRF::class — CSRF protection. 'honeypot' => Honeypot::class — bot protection. 'toolbar' => DebugToolbar::class — debug toolbar (development only).

---

## Experiments

1. **## CSRF in CI4
Filters.php $before = ['csrf'] — CSRF filter auto-validates every POST request. csrf_field() — adds hidden input with token. csrf_hash() — returns token value for manual embedding.
## XSS Prevention
esc($variable) — escape HTML entities. CI4 auto-escapes all output in views when using <?= ?> shorthand. Never use <?= $userInput ?> without esc().
## Honeypot Filter
Honeypot adds a hidden field that real users never fill. Bots auto-fill it. If honeypot field has value, request is rejected as bot.
## Filter Aliases
'csrf' => CSRF::class — CSRF protection. 'honeypot' => Honeypot::class — bot protection. 'toolbar' => DebugToolbar::class — debug toolbar (development only).**

---

## Challenge

Level up security: (1) create custom filter that blocks requests from detected spam IPs, (2) add rate limiting for form submit (max 3 submits per minute), (3) implement Content Security Policy (CSP) headers in Filters.php, (4) add logging for all requests rejected by filters.

---

## Summary

CSRF = form POST protection. XSS = esc() in views. Honeypot = anti bot. Filters = middleware chain. Next: authentication.
