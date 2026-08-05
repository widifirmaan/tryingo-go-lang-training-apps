# Form Handling & Validation

> CodeIgniter 4 | Pelajaran 7

## Tujuan Pembelajaran

- Menggunakan $this->validate() dengan aturan rules\n- Menampilkan error validation di view dengan session("errors")\n- Menggunakan csrf_field() untuk proteksi CSRF\n- Menggunakan old() untuk mengisi ulang form setelah validation gagal

---

## Program: CodeIgniter 4

```php
<?php

namespace App\Controllers;

use App\Models\PostModel;

class Blog extends BaseController
{
    public function store(): string
    {
        $model = new PostModel();

        if (!$this->validate([
            'title' => 'required|min_length[3]|max_length[255]',
            'slug' => 'required|alpha_dash|is_unique[posts.slug]',
            'body' => 'required',
        ])) {
            return view('blog/create', [
                'validation' => $this->validator,
            ]);
        }

        $model->save([
            'title' => $this->request->getPost('title'),
            'slug' => $this->request->getPost('slug'),
            'body' => $this->request->getPost('body'),
        ]);

        return redirect()->to('/blog')->with('message', 'Post berhasil disimpan!');
    }
}

```

---

## Penjelasan

## Validation Rules
'required' — field tidak boleh kosong. 'min_length[X]' — minimal X karakter. 'max_length[X]' — maksimal X karakter. 'alpha_dash' — hanya huruf, angka, dash, underscore. 'is_unique[posts.slug]' — slug harus unik di tabel posts.
## CSRF Protection
csrf_field() — menambahkan hidden input dengan CSRF token. CI4 otomatis memvalidasi token POST. Tanpa csrf_field(), form POST akan ditolak dengan 403 error.
## Flash Data
redirect()->to('/blog')->with('message', 'Berhasil!') — menyimpan pesan di session flash. Di view: session()->get('message') — mengambil dan menghapus flash data setelah dibaca.

---

## Eksperimen

1. **## Validation Rules
'required' — field tidak boleh kosong. 'min_length[X]' — minimal X karakter. 'max_length[X]' — maksimal X karakter. 'alpha_dash' — hanya huruf, angka, dash, underscore. 'is_unique[posts.slug]' — slug harus unik di tabel posts.
## CSRF Protection
csrf_field() — menambahkan hidden input dengan CSRF token. CI4 otomatis memvalidasi token POST. Tanpa csrf_field(), form POST akan ditolak dengan 403 error.
## Flash Data
redirect()->to('/blog')->with('message', 'Berhasil!') — menyimpan pesan di session flash. Di view: session()->get('message') — mengambil dan menghapus flash data setelah dibaca.**

---

## Tantangan

Tingkatkan form: (1) tambah validation untuk upload gambar (image|max_size[1024]|is_image]), (2) buat custom validation rule untuk slug yang cek duplikat secara real-time via AJAX, (3) tambah form preview yang menampilkan data sebelum submit, (4) gunakan form helper form_open() dan form_input() untuk alternatif penulisan form.

---

## Ringkasan

validate() = rules. csrf_field() = CSRF protection. old() = repopulate form. Flash data = pesan sukses. Lanjut: sessions.
