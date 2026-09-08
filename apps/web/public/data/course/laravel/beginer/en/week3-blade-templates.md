# Blade Templates — Showcase Inheriting Laravel Frame

> **Kategori:** Laravel | **Level:** Beginner | **Minggu 3:** Blade Templates

## Learning Objectives

- `{{ $name }}` safe print (automatic `htmlspecialchars`), `{!! !!}` raw (careful) (source: laravel.com/docs/blade)
- `@if`, `@foreach` (+ `@empty`, `@forelse`), `@extends` + `@section` layout inheritance

---

## Why This Matters (Non-IT)

Without inheritance, headers/footers written in 10 files — changing the WA number edits 10x. With `@extends('layout')`, edit 1x. `{{ }}` auto-safe from `<script>` XSS — raw `<?php echo ?>` isn't.

---

## Program: Showcase Inheriting Frame

```html
<!-- resources/views/layouts/app.blade.php — frame (1x) -->
<!DOCTYPE html>
<html lang="en"><body>
<header><h1>Siti's Shop</h1><nav><a href="/products">Products</a></nav></header>
<main>@yield('content')</main>
<footer>WA 0812</footer>
</body></html>
```

```html
<!-- resources/views/products.blade.php — content -->
@extends('layouts.app')
@section('content')
<h2>Catalog</h2>
@forelse($products as $p)
  <div>{{ $p["name"] }} - Rp{{ number_format($p["price"]) }}</div>
@empty
  <p>Empty — try other words</p>
@endforelse
@endsection
```

```php
// Controller sends
return view('products', ["products" => $products]);
```

---

## Key Concepts

### `{{ }}` Safe vs `{!! !!}` Raw
`{{ $name }}` → automatic `htmlspecialchars`. `{!! $html !!}` → raw, only for own HTML.

### `@extends` + `@section` + `@yield` = Inheritance
Layout `@yield('content')` hole → child `@section('content')` fills.

### `@forelse` + `@empty` = Repeat + Empty
`@forelse` merges `foreach` + empty, no `if count` needed.

---

## Beginner Friendly Explanation

### Analogy: Photo Frame & Picture
- **Layout = store frame**: fixed header/footer.
- **Section = photo**: swaps per page.

### Step 0 — Prepare Device
- Same as W1: `php artisan serve` on `8000`.

### How the Computer Reads It
1. `view('products', [...])` → Blade finds `products.blade.php`.
2. `@extends('layouts.app')` → takes frame → pastes `section` into `yield`.

### 3 Must-Know Terms
1. **Blade/{{ }}**: template/safe-print
2. **extends/section**: inherit/fill
3. **forelse/empty**: repeat/empty

---

## Experiments

- **Green:** `$name = "<b>Budi</b>"` → `{{ $name }}` shows raw `&lt;b&gt;` (safe)?
- **Yellow:** Swap `@forelse` for `@foreach` without `empty` → empty list gapes?
- **Red:** `{!! "<b>Budi</b>" !!}` → bold (raw, own HTML only)?

---

## Challenge

**Complete Showcase Shop:** `layouts/app` (header/nav/footer) + `products` (`extends`, `forelse`, `number_format`) + `detail` (`{{ $p["name"] }}` + back link). `php artisan serve` screenshot.

---

## Mini Glossary

- **Blade/extends/section**: template/inherit/fill
- **{{ }}/@forelse**: print/repeat

---

## Summary

Week 3 of 4: **Inheriting Showcase** (Level: Beginner). Separate safe kitchen & showcase. Next: **Eloquent** — automatic racks.
