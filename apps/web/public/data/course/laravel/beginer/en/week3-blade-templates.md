# Blade Templates — Etalase Cantik

> **Kategori:** Laravel | **Level:** Pemula | **Minggu 3:** Blade Templates

## Tujuan Pembelajaran

- `{{ $nama }}` cetak, `@if`, `@foreach`, `@extends` warisan layout

---

## Program

```html
<!-- resources/views/layouts/app.blade.php -->
<html><body><header>Warung</header><main>@yield('content')</main></body></html>

<!-- resources/views/produk.blade.php -->
@extends('layouts.app')
@section('content')
<h1>Katalog</h1>
@forelse($produk as $p)
  <div>{{ $p->nama }} - Rp{{ $p->harga }}</div>
@empty
  <p>Kosong</p>
@endforelse
@endsection
```

---

## Ringkasan

Minggu 3: **Etalase Blade** — `{{ }}`, `@if`, `@foreach`.
