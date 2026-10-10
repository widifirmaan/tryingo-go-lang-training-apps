# Blade Templates

> **Kategori:** Laravel | **Level:** Pemula | **Minggu 3:** Blade Templates

## Tujuan Pembelajaran

- Blade syntax: {{ }} untuk echo, @ untuk directives
- Layout system: @extends, @section, @yield, @parent
- Components: <x-component> untuk reusable UI
- Control structures: @if, @foreach, @forelse, @unless
- CSRF protection: @csrf dan method spoofing: @method

---

## Program: Template Engine

```php
<?php
echo "=== Blade Templates ===<br><br>";

echo "=== Syntax Dasar ===<br>";
echo "{{ $variable }}  — Echo escaped<br>";
echo "{{{ $variable }}}  — Echo raw (deprecated, use !!})<br>";
echo "{{ !! $html !!}}  — Echo unescaped<br>";
echo "@{{ not parsed }}  — Escape blade<br><br>";

echo "=== Control Structures ===<br>";
echo "@if($condition) ... @endif<br>";
echo "@unless($condition) ... @endunless<br>";
echo "@foreach($items as $item) ... @endforeach<br>";
echo "@for($i = 0; $i < 10; $i++) ... @endfor<br>";
echo "@while($condition) ... @endwhile<br><br>";

echo "=== Layout & Sections ===<br>";
echo "@extends('layouts.app')<br>";
echo "@section('title', 'Home')<br>";
echo "@section('content')<br>";
echo "    <h1>Welcome</h1><br>";
echo "@endsection<br><br>";

echo "=== Components ===<br>";
echo "<x-alert type='error' :message='$error' /><br>";
echo "<x-button>Click me</x-button><br><br>";

echo "=== Loops ===<br>";
$posts = [
    ["title" => "Post 1", "author" => "Budi"],
    ["title" => "Post 2", "author" => "Siti"],
    ["title" => "Post 3", "author" => "Andi"],
];

echo "@foreach($posts as $post)<br>";
foreach ($posts as $post) {
    echo "    {{ $post['title'] }} by {{ $post['author'] }}<br>";
}
echo "@endforeach<br><br>";

echo "@forelse($posts as $post)<br>";
echo "    {{ $post->title }}<br>";
echo "@empty<br>";
echo "    No posts found<br>";
echo "@endforelse<br><br>";

echo "=== CSRF & Method ===<br>";
echo "@csrf  — CSRF token field<br>";
echo "@method('DELETE')  — Spoof HTTP method<br>";
>
```

---

## Konsep Kunci

### Echo Syntax
`{{ $var }}` auto-escape HTML (anti-XSS). `{!! !!}` untuk raw HTML.

### Layout
`@extends('layouts.app')` inherit layout. `@section('content')` inject content. `@yield('content')` placeholder.

### Components
`<x-alert>` reusable component. Di-compile ke PHP. Slot untuk content.

### Directives
`@if`, `@foreach`, `@forelse` (dengan @empty), `@csrf`, `@method('PUT')`.

### Blade & JavaScript
`@{{ }}` escape untuk framework JS seperti Vue.

---

## Eksperimen

- Buat layout master dengan section header, content, footer
- Buat component alert dengan type dan message
- Implementasikan nested foreach untuk data
- Coba @forelse dengan data kosong
- Gunakan @auth dan @guest untuk conditional display

---

## Tantangan

Buat layout blog lengkap: header, footer, sidebar. Buat halaman home menampilkan daftar posts dengan foreach. Buat component card untuk post.

---

## Ringkasan

Minggu 3 dari 12: **Blade Templates** (Level: Pemula). View layer Laravel. Minggu depan: **Eloquent ORM**.
