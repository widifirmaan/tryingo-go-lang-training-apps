# File Uploads & Pagination

> CodeIgniter 4 | Lesson 12

## Learning Objectives

- Use $this->request->getFile() to receive file upload\n- Use $file->move() to save file to directory\n- Use $model->paginate() for pagination\n- Use $pager->links() to display pagination links

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

## Explanation

## File Upload
$file = $this->request->getFile('image') — get uploaded file object. $file->isValid() — check if upload succeeded. $file->move(WRITEPATH . 'uploads/') — save file. WRITEPATH = writable/ directory. $file->getClientName() — original filename. $file->getRandomName() — generate random name to prevent collisions.
## Pagination
$model->paginate(5, 'posts') — get 5 records per page, group named 'posts'. $pager->links('posts', 'bootstrap_full') — render pagination links. Pagination automatically handles ?page=N query parameter.
## Security
Always validate file type and size before moving. Use $file->getMimeType() to check MIME type. Limit file size with $this->validate(['image' => 'uploaded[image]|max_size[image,1024]|is_image[image]]).

---

## Experiments

1. **## File Upload
$file = $this->request->getFile('image') — get uploaded file object. $file->isValid() — check if upload succeeded. $file->move(WRITEPATH . 'uploads/') — save file. WRITEPATH = writable/ directory. $file->getClientName() — original filename. $file->getRandomName() — generate random name to prevent collisions.
## Pagination
$model->paginate(5, 'posts') — get 5 records per page, group named 'posts'. $pager->links('posts', 'bootstrap_full') — render pagination links. Pagination automatically handles ?page=N query parameter.
## Security
Always validate file type and size before moving. Use $file->getMimeType() to check MIME type. Limit file size with $this->validate(['image' => 'uploaded[image]|max_size[image,1024]|is_image[image]]).**

---

## Challenge

Level up upload & pagination: (1) add image resize before save using CI4 image service, (2) add multiple file upload (getFiles() instead of getFile()), (3) add drag-and-drop upload with JavaScript in view, (4) custom pagination template with page numbers and prev/next buttons.

---

## Summary

getFile() = upload file. move() = save file. paginate() = pagination. pager->links() = show pagination. Next: caching.
