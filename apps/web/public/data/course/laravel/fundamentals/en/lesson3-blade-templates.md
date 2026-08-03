# Blade: Templates, Layouts & Components

> Laravel | Laravel Fundamentals | Lesson 3

## Learning Objectives

- Build a single layout with @yield and inherit it via @extends
- Use Blade directives: {{ }}, @if, @forelse, {{-- --}}
- Understand auto-escaping {{ }} vs raw output {!! !!}
- Render pages from controller data with compact()

---

## Program: Blade: Templates, Layouts & Components

```php
<!DOCTYPE html>
<html lang="id">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>@yield('judul', 'Tryngo') - Katalog</title>
    <style>
        body { font-family: system-ui, sans-serif; margin: 0; background: #f6f4ef; color: #1c1c1c; }
        header { background: #2E5B44; color: white; padding: 1rem 2rem; }
        nav a { color: white; margin-right: 1rem; text-decoration: none; }
        main { max-width: 800px; margin: 2rem auto; padding: 0 1rem; }
        footer { text-align: center; padding: 2rem; color: #888; }
        .kartu { background: white; border-radius: 8px; padding: 1rem; margin-bottom: 1rem; }
    </style>
</head>
<body>
    <header>
        <h1>Katalog Tryngo</h1>
        <nav>
            <a href="{{ url('/') }}">Beranda</a>
            <a href="{{ route('produk.daftar') }}">Produk</a>
        </nav>
    </header>

    <main>
        @yield('konten')
    </main>

    <footer>&copy; {{ date('Y') }} Tryngo. Dibuat dengan Blade.</footer>
</body>
</html>

```

---

## Explanation

## Layout: Write Once, Use Everywhere
layouts/app.blade.php holds the full HTML skeleton. @yield('konten') is the slot child pages fill. @yield('judul', 'Tryngo') = a slot with a default. @extends('layouts.app') on the child page + @section('konten') fills the slot. Every page shares the same skeleton - free consistency.
## {{ }} vs {!! !!}
{{ $variabel }} = echo + htmlspecialchars: user input displays as text, not HTML (anti-XSS - lesson 13 revisits this in security). {!! $html !!} = raw without escaping: ONLY for content you fully control. Rule: {{ }} by default, {!! !!} only with a strong reason.
## Directives: PHP with Less Noise
@if/@else, @forelse (loop + else in one directive), @empty, @foreach, {{-- comment --}} (not rendered into HTML). Directives are human-readable PHP control structures.
## The Compact Helper
compact('produk') = ['produk' => $produk] - a short way to pass many variables to a view.

---

## Experiments

1. **Layout: Write Once, Use Everywhere**
2. **{{ }} vs {!! !!}**
3. **Directives: PHP with Less Noise**
4. **The Compact Helper**

---

## Challenge

Polish the UI: (1) add a @section("skrip") block in the layout and fill it from the list page with a small JavaScript snippet, (2) build an About page extending the layout with @yield("judul") changing, (3) display prices as Rp 1.250.000 via number_format in blade, (4) extract a footer partial and include it with @include.

---

## Summary

Layout once, many pages. {{ }} = escaped. Directives = clean PHP. Next: migrations & Eloquent.
