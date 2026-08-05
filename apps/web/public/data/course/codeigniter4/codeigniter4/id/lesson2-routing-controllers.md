# Routing & Controllers

> CodeIgniter 4 | Pelajaran 2

## Tujuan Pembelajaran

- Memahami routing: URL dipetakan ke controller dan method\n- Membuat controller dengan method index, view, create, store\n- Menggunakan $this->request->getPost() untuk menerima data form\n- Menggunakan redirect()->to() untuk redirect

---

## Program: CodeIgniter 4

```php
<?php

namespace App\Controllers;

class Blog extends BaseController
{
    public function index(): string
    {
        return view('blog/index');
    }

    public function view(string $slug = null): string
    {
        if ($slug === null) {
            return redirect()->to('/blog');
        }

        return view('blog/view', ['slug' => $slug]);
    }

    public function create(): string
    {
        return view('blog/create');
    }

    public function store(): string
    {
        $title = $this->request->getPost('title');
        return "Post dibuat: " . esc($title);
    }
}

```

---

## Penjelasan

## Routing Patterns
$routes->get('blog', 'Blog::index') — GET /blog -> Blog::index. $routes->get('blog/(:any)', 'Blog::view/$1') — parameter (:any) ditangkap dan diteruskan ke method. $routes->post('blog/store', 'Blog::store') — POST request.
## Controller Methods
public function index(): string — method default. return view('nama_view') — render view. return redirect()->to('/url') — redirect. $this->request->getPost('field') — ambil data POST.
## View dengan Data
view('blog/view', ['slug' => $slug]) — kirim data ke view. Di view: <?= esc($slug) ?> — output yang di-escape untuk keamanan (anti XSS).

---

## Eksperimen

1. **## Routing Patterns
$routes->get('blog', 'Blog::index') — GET /blog -> Blog::index. $routes->get('blog/(:any)', 'Blog::view/$1') — parameter (:any) ditangkap dan diteruskan ke method. $routes->post('blog/store', 'Blog::store') — POST request.
## Controller Methods
public function index(): string — method default. return view('nama_view') — render view. return redirect()->to('/url') — redirect. $this->request->getPost('field') — ambil data POST.
## View dengan Data
view('blog/view', ['slug' => $slug]) — kirim data ke view. Di view: <?= esc($slug) ?> — output yang di-escape untuk keamanan (anti XSS).**

---

## Tantangan

Kembangkan routing: (1) tambah method edit($slug) di Blog controller, (2) tambah route PUT untuk update, (3) tambah method delete($slug) dengan route DELETE, (4) buat halaman /blog/about yang menampilkan info tentang blog.

---

## Ringkasan

Route = URL ke controller. Controller = logic. View = HTML. $routes->get/post = metode HTTP. Lanjut: views & layouts.
