# File Uploads & Pagination

> CodeIgniter 4 | Pelajaran 12

## Tujuan Pembelajaran

- Menggunakan $this->request->getFile() untuk menerima file upload\n- Menggunakan $file->move() untuk menyimpan file ke direktori\n- Menggunakan $model->paginate() untuk pagination\n- Menggunakan $pager->links() untuk menampilkan link pagination

---

## Program: CodeIgniter 4

```php
<?php

namespace App\Controllers;

use App\Models\PostModel;

class Upload extends BaseController
{
    public function index(): string
    {
        $model = new PostModel();
        $data['posts'] = $model->paginate(5, 'posts');
        $data['pager'] = $model->pager;
        return view('blog/index', $data);
    }

    public function upload(): string
    {
        $file = $this->request->getFile('image');

        if (!$file->isValid()) {
            session()->setFlashdata('error', 'File tidak valid');
            return redirect()->back();
        }

        if (!$file->move(WRITEPATH . 'uploads/')) {
            session()->setFlashdata('error', 'Gagal upload file');
            return redirect()->back();
        }

        session()->setFlashdata('message', 'File berhasil diupload: ' . $file->getClientName());
        return redirect()->to('/blog');
    }
}

```

---

## Penjelasan

## File Upload
$file = $this->request->getFile('image') — get uploaded file object. $file->isValid() — check if upload succeeded. $file->move(WRITEPATH . 'uploads/') — save file. WRITEPATH = writable/ directory. $file->getClientName() — original filename. $file->getRandomName() — generate random name to prevent collisions.
## Pagination
$model->paginate(5, 'posts') — get 5 records per page, group named 'posts'. $pager->links('posts', 'bootstrap_full') — render pagination links. Pagination automatically handles ?page=N query parameter.
## Security
Always validate file type and size before moving. Use $file->getMimeType() to check MIME type. Limit file size with $this->validate(['image' => 'uploaded[image]|max_size[image,1024]|is_image[image]]).

---

## Eksperimen

1. **## File Upload
$file = $this->request->getFile('image') — get uploaded file object. $file->isValid() — check if upload succeeded. $file->move(WRITEPATH . 'uploads/') — save file. WRITEPATH = writable/ directory. $file->getClientName() — original filename. $file->getRandomName() — generate random name to prevent collisions.
## Pagination
$model->paginate(5, 'posts') — get 5 records per page, group named 'posts'. $pager->links('posts', 'bootstrap_full') — render pagination links. Pagination automatically handles ?page=N query parameter.
## Security
Always validate file type and size before moving. Use $file->getMimeType() to check MIME type. Limit file size with $this->validate(['image' => 'uploaded[image]|max_size[image,1024]|is_image[image]]).**

---

## Tantangan

Tingkatkan upload & pagination: (1) tambah image resize sebelum save menggunakan CI4 image service, (2) tambah multiple file upload (getFiles() bukan getFile()), (3) tambah drag-and-drop upload dengan JavaScript di view, (4) custom pagination template dengan angka halaman dan tombol prev/next.

---

## Ringkasan

getFile() = upload file. move() = simpan file. paginate() = pagination. pager->links() = tampil pagination. Lanjut: caching.
