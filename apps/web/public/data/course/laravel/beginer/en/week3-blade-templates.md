# Blade Templates — Etalase Warisi Bingkai Laravel

> **Kategori:** Laravel | **Level:** Pemula | **Minggu 3:** Blade Templates

## Tujuan Pembelajaran

- `{{ $nama }}` cetak aman (otomatis `htmlspecialchars`), `{!! !!}` mentah (hati-hati) (sumber: laravel.com/docs/blade)
- `@if`, `@foreach` (+ `@empty`, `@forelse`), `@extends` + `@section` warisan layout

---

## Kenapa Ini Penting Buat Kamu?

Tanpa warisan, header/footer ditulis di 10 file — ganti nomor WA ubah 10x. Dengan `@extends('layout')`, ubah 1x. `{{ }}` otomatis aman dari XSS `<script>` — `<?php echo ?>` mentah tidak.

---

## Program: Etalase Warisi Bingkai

```html
<!-- resources/views/layouts/app.blade.php — bingkai (1x) -->
<!DOCTYPE html>
<html lang="id"><body>
<header><h1>Warung Bu Siti</h1><nav><a href="/produk">Produk</a></nav></header>
<main>@yield('content')</main>
<footer>WA 0812</footer>
</body></html>
```

```html
<!-- resources/views/produk.blade.php — isi -->
@extends('layouts.app')
@section('content')
<h2>Katalog</h2>
@forelse($produk as $p)
  <div>{{ $p["nama"] }} - Rp{{ number_format($p["harga"]) }}</div>
@empty
  <p>Kosong — coba kata lain</p>
@endforelse
@endsection
```

```php
// Controller kirim
return view('produk', ["produk" => $produk]);
```

---

## Konsep Kunci

### `{{ }}` Aman vs `{!! !!}` Mentah
`{{ $nama }}` → `htmlspecialchars` otomatis. `{!! $html !!}` → mentah, hanya untuk HTML sendiri.

### `@extends` + `@section` + `@yield` = Warisan
Layout `@yield('content')` lubang → anak `@section('content')` isi.

### `@forelse` + `@empty` = Ulang + Kosong
`@forelse` gabung `foreach` + kosong, tidak perlu `if count`.

---

## Penjelasan untuk Pemula

### Analogi: Bingkai Foto & Isi
- **Layout = bingkai toko**: header/footer tetap.
- **Section = foto**: ganti tiap halaman.

### Langkah 0 — Siapkan Device
- Sama W1: `php artisan serve` di `8000`.

### Cara Komputer Membaca
1. `view('produk', [...])` → Blade cari `produk.blade.php`.
2. `@extends('layouts.app')` → ambil bingkai → tempel `section` ke `yield`.

### 3 Istilah Wajib
1. **Blade/{{ }}**: template/cetak aman
2. **extends/section**: warisi/isi
3. **forelse/empty**: ulang/kosong

---

## Eksperimen

- **Hijau:** `$nama = "<b>Budi</b>"` → `{{ $nama }}` tampil `&lt;b&gt;` mentah (aman)?
- **Kuning:** Ganti `@forelse` jadi `@foreach` tanpa `empty` → daftar kosong melompong?
- **Merah:** `{!! "<b>Budi</b>" !!}` → jadi tebal (mentah, hanya untuk milik sendiri)?

---

## Tantangan

**Warung Etalase Lengkap:** `layouts/app` (header/nav/footer) + `produk` (`extends`, `forelse`, `number_format`) + `detail` (`{{ $p["nama"] }}` + link kembali). `php artisan serve` screenshot.

---

## Glosarium Mini

- **Blade/extends/section**: template/warisi/isi
- **{{ }}/@forelse**: cetak/ulang

---

## Ringkasan

Minggu 3 dari 4: **Etalase Warisi** (Level: Pemula). Dapur & etalase terpisah aman. Minggu depan: **Eloquent** — rak otomatis.
