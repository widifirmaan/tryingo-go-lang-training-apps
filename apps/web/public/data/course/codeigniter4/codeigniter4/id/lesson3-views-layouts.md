# Views & Layouts

> CodeIgniter 4 | Pelajaran 3

## Tujuan Pembelajaran

- Memahami layout: template utama yang di-extend view anak\n- Menggunakan $this->extend() dan $this->section() di view\n- Mengirim data dari controller ke view dengan array\n- Menggunakan esc() untuk output yang aman (anti XSS)

---

## Program: CodeIgniter 4

```php
<!DOCTYPE html>
<html>
<head>
    <title><?= $title ?? 'CI4 App' ?></title>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
</head>
<body>
    <header>
        <nav>
            <a href="/">Beranda</a> |
            <a href="/blog">Blog</a> |
            <a href="/about">Tentang</a>
        </nav>
    </header>
    <main>
        <?= $this->renderSection('content') ?>
    </main>
    <footer>
        <p>&copy; <?= date('Y') ?> CI4 App</p>
    </footer>
</body>
</html>

```

---

## Penjelasan

## Layout System
$this->extend('templates/main') — view anak mewarisi layout utama. $this->section('content') — mendefinisikan bagian yang akan menggantikan @section('content') di layout. $this->endSection() — menutup section.
## Data Passing
view('blog/view', ['slug' => $slug]) — mengirim data sebagai associative array. Di view: $slug (atau $data['slug']) — mengakses data yang dikirim.
## XSS Prevention
esc($variable) — escape HTML entities. Mencegah script injection. Selalu gunakan esc() untuk output user data di view.

---

## Eksperimen

1. **## Layout System
$this->extend('templates/main') — view anak mewarisi layout utama. $this->section('content') — mendefinisikan bagian yang akan menggantikan @section('content') di layout. $this->endSection() — menutup section.
## Data Passing
view('blog/view', ['slug' => $slug]) — mengirim data sebagai associative array. Di view: $slug (atau $data['slug']) — mengakses data yang dikirim.
## XSS Prevention
esc($variable) — escape HTML entities. Mencegah script injection. Selalu gunakan esc() untuk output user data di view.**

---

## Tantangan

Kembangkan layout: (1) tambah sidebar dengan link navigasi di template main, (2) tambah section "footer" di layout dan isi dari view anak, (3) buat partial view untuk header dan footer yang bisa di-include, (4) tambah meta description dinamis di setiap halaman.

---

## Ringkasan

Layout = template utama. Section = blok konten dinamis. extend() = warisi layout. esc() = anti XSS. Lanjut: database.
