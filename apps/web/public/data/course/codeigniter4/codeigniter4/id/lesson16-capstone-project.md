# Proyek Akhir: Blog CI4

> CodeIgniter 4 | Pelajaran 16

## Tujuan Pembelajaran

- Merangkus semua konsep CI4 ke dalam satu proyek Blog lengkap\n- Menerapkan MVC dengan routing, controller, model, dan view\n- Menggunakan database migrations dan model untuk data persistence\n- Mengamankan aplikasi dengan CSRF, XSS, dan authentication

---

## Program: CodeIgniter 4

```php
<?php

namespace App\Controllers;

use App\Models\PostModel;

class Blog extends BaseController
{
    public function index(): string
    {
        $model = new PostModel();
        $data['posts'] = $model->getPosts();
        $data['flash'] = session()->getFlashdata('message');
        return view('blog/index', $data);
    }

    public function view(string $slug = null): string
    {
        if ($slug === null) {
            return redirect()->to('/blog');
        }
        $model = new PostModel();
        $data['post'] = $model->getPostBySlug($slug);
        if (!$data['post']) {
            throw \CodeIgniter\Exceptions\PageNotFoundException::forPageNotFound();
        }
        return view('blog/view', $data);
    }

    public function create(): string
    {
        if (!session()->get('user_id')) {
            return redirect()->to('/login');
        }
        return view('blog/create');
    }

    public function store(): string
    {
        $model = new PostModel();

        if (!$this->validate([
            'title' => 'required|min_length[3]|max_length[255]',
            'slug' => 'required|alpha_dash|is_unique[posts.slug]',
            'body' => 'required',
        ])) {
            return view('blog/create', ['validation' => $this->validator]);
        }

        $model->save([
            'title' => $this->request->getPost('title'),
            'slug' => $this->request->getPost('slug'),
            'body' => $this->request->getPost('body'),
        ]);

        session()->setFlashdata('message', 'Post berhasil disimpan!');
        return redirect()->to('/blog');
    }

    public function destroy(int $id): string
    {
        if (!session()->get('user_id')) {
            return redirect()->to('/login');
        }
        $model = new PostModel();
        $model->delete($id);
        session()->setFlashdata('message', 'Post berhasil dihapus!');
        return redirect()->to('/blog');
    }
}

```

---

## Penjelasan

## Proyek Akhir: Menyatukan Semua
16 pelajaran CI4 dirangkum di sini: routing & controllers (Lesson 2), views & layouts (Lesson 3), static assets & Spark CLI (Lesson 4), database & migrations (Lesson 5), models & query builder (Lesson 6), form validation (Lesson 7), sessions & flash data (Lesson 8), security CSRF/XSS/filters (Lesson 9), authentication (Lesson 10), REST API (Lesson 11), file upload & pagination (Lesson 12), caching (Lesson 13), events & CLI (Lesson 14), testing (Lesson 15).
## Arsitektur Blog
Route -> Controller -> Model -> View. Setiap request melewati front controller (public/index.php), di-routing ke controller, controller berinteraksi dengan model untuk data, dan merender view untuk output HTML.
## Dari CI4 ke Production
Untuk deployment: gunakan php spark serve untuk production (atau Nginx/Apache dengan rewrite rules). Aktifkan production mode di app/Config/Boot/production.php. Gunakan Redis untuk cache production. Setup database MySQL/PostgreSQL menggantikan SQLite3.

---

## Eksperimen

1. **## Proyek Akhir: Menyatukan Semua
16 pelajaran CI4 dirangkum di sini: routing & controllers (Lesson 2), views & layouts (Lesson 3), static assets & Spark CLI (Lesson 4), database & migrations (Lesson 5), models & query builder (Lesson 6), form validation (Lesson 7), sessions & flash data (Lesson 8), security CSRF/XSS/filters (Lesson 9), authentication (Lesson 10), REST API (Lesson 11), file upload & pagination (Lesson 12), caching (Lesson 13), events & CLI (Lesson 14), testing (Lesson 15).
## Arsitektur Blog
Route -> Controller -> Model -> View. Setiap request melewati front controller (public/index.php), di-routing ke controller, controller berinteraksi dengan model untuk data, dan merender view untuk output HTML.
## Dari CI4 ke Production
Untuk deployment: gunakan php spark serve untuk production (atau Nginx/Apache dengan rewrite rules). Aktifkan production mode di app/Config/Boot/production.php. Gunakan Redis untuk cache production. Setup database MySQL/PostgreSQL menggantikan SQLite3.**

---

## Tantangan

Tingkatkan proyek akhir: (1) tambah fitur komentar dengan model Comment dan tabel comments, (2) tambah kategori post dengan relasi many-to-many, (3) implementasi search full-text menggunakan LIKE atau database full-text index, (4) tambah admin dashboard dengan statistik posts dan users.

---

## Ringkasan

Blog = MVC + DB + Security + API + Testing. Semua konsep CI4 dalam satu proyek. Anda siap build CI4 app nyata!
