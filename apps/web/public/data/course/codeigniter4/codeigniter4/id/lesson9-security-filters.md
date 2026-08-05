# Security: CSRF, XSS & Filters

> CodeIgniter 4 | Pelajaran 9

## Tujuan Pembelajaran

- Mengaktifkan CSRF protection di Filters.php\n- Menggunakan csrf_field() dan csrf_hash() di form\n- Memahami Honeypot filter untuk proteksi bot\n- Menggunakan esc() untuk mencegah XSS di view

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

## Penjelasan

## CSRF in CI4
Filters.php $before = ['csrf'] — CSRF filter otomatis memvalidasi setiap POST request. csrf_field() — menambahkan hidden input dengan token. csrf_hash() — mengembalikan nilai token untuk manual embedding.
## XSS Prevention
esc($variable) — escape HTML entities. CI4 auto-escapes all output in views when using <?= ?> shorthand. Never use <?= $userInput ?> without esc().
## Honeypot Filter
Honeypot adds a hidden field that real users never fill. Bots auto-fill it. If honeypot field has value, request is rejected as bot.
## Filter Aliases
'csrf' => CSRF::class — proteksi CSRF. 'honeypot' => Honeypot::class — proteksi bot. 'toolbar' => DebugToolbar::class — debug toolbar (development only).

---

## Eksperimen

1. **## CSRF in CI4
Filters.php $before = ['csrf'] — CSRF filter otomatis memvalidasi setiap POST request. csrf_field() — menambahkan hidden input dengan token. csrf_hash() — mengembalikan nilai token untuk manual embedding.
## XSS Prevention
esc($variable) — escape HTML entities. CI4 auto-escapes all output in views when using <?= ?> shorthand. Never use <?= $userInput ?> without esc().
## Honeypot Filter
Honeypot adds a hidden field that real users never fill. Bots auto-fill it. If honeypot field has value, request is rejected as bot.
## Filter Aliases
'csrf' => CSRF::class — proteksi CSRF. 'honeypot' => Honeypot::class — proteksi bot. 'toolbar' => DebugToolbar::class — debug toolbar (development only).**

---

## Tantangan

Tingkatkan keamanan: (1) buat filter custom yang memblokir request dari IP yang terdeteksi spam, (2) tambah rate limiting untuk form submit (maksimal 3 submit per menit), (3) implementasi Content Security Policy (CSP) header di Filters.php, (4) tambah logging untuk semua request yang ditolak oleh filter.

---

## Ringkasan

CSRF = proteksi form POST. XSS = esc() di view. Honeypot = anti bot. Filters = middleware chain. Lanjut: authentication.
