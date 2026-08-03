# Blade: Template, Layout & Komponen

> Laravel | Fondasi Laravel | Pelajaran 3

## Tujuan Pembelajaran

- Membangun layout tunggal dengan @yield dan mewarisinya via @extends
- Menggunakan direktif Blade: {{ }}, @if, @forelse, {{-- --}}
- Memahami escape otomatis {{ }} vs raw {!! !!}
- Membuat halaman dari data controller dengan compact()

---

## Program: Blade: Template, Layout & Komponen

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

## Penjelasan

## Layout: Tulis Sekali, Pakai di Semua Halaman
layouts/app.blade.php berisi kerangka HTML lengkap. @yield('konten') adalah lubang yang diisi halaman anak. @yield('judul', 'Tryngo') = lubang dengan default. @extends('layouts.app') di halaman anak + @section('konten') mengisi lubangnya. Semua halaman memakai kerangka yang sama - konsistensi gratis.
## {{ }} vs {!! !!}
{{ $variabel }} = echo + htmlspecialchars: input user tampil sebagai teks, bukan HTML (anti-XSS - lesson 13 mengulang ini dalam konteks keamanan). {!! $html !!} = raw tanpa escape: HANYA untuk konten yang Anda kontrol sendiri. Rule: {{ }} default, {!! !!} hanya dengan alasan kuat.
## Direktif: PHP dengan Kurang Ribut
@if/@else, @forelse (loop + else dalam satu direktif), @empty, @foreach, {{-- komentar --}} (tidak dirender ke HTML). Direktif adalah struktur kontrol PHP yang dibaca manusia.
## Compact Helper
compact('produk') = ['produk' => $produk] - cara singkat mengirim banyak variabel ke view.

---

## Eksperimen

1. **Layout: Tulis Sekali, Pakai di Semua Halaman**
2. **{{ }} vs {!! !!}**
3. **Direktif: PHP dengan Kurang Ribut**
4. **Compact Helper**

---

## Tantangan

Poles tampilan: (1) tambah block @section("skrip") di layout dan isi dari halaman daftar dengan sedikit JavaScript, (2) buat halaman Tentang yang meng-extends layout dengan @yield("judul") berubah, (3) tampilkan harga dengan format Rp 1.250.000 via number_format di blade, (4) buat partial footer terpisah dan include dengan @include.

---

## Ringkasan

Layout sekali, halaman banyak. {{ }} = escape. Direktif = PHP bersih. Lanjut: migrations & Eloquent.
