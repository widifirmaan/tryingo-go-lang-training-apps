# Sessions & Flash Data

> CodeIgniter 4 | Lesson 8

## Learning Objectives

- Use session()->setFlashdata() and session()->getFlashdata()\n- Store persistent session data with session()->set()\n- Remove session with session()->remove()\n- Use session for storing success/error messages

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

    public function store(): string
    {
        $model = new PostModel();
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
        $model = new PostModel();
        $model->delete($id);
        session()->setFlashdata('message', 'Post berhasil dihapus!');
        return redirect()->to('/blog');
    }
}

```

---

## Explanation

## Flash Data vs Persistent Session
Flash data: session()->setFlashdata('key', 'value') — data available for ONLY the next request, then auto-deleted. Great for success/error messages after redirect. Persistent session: session()->set('key', 'value') — data stays until manually removed or session expires.
## Session in CI4
session() helper auto-loaded. session()->getFlashdata('message') — retrieve flash data. session()->set('user_id', 42) — set persistent data. session()->remove('user_id') — remove data. session()->destroy() — destroy entire session.
## Delete with Confirmation
onclick="return confirm('Delete this post?')" — browser native confirmation dialog. If user clicks OK, request continues. If Cancel, request is cancelled (return false).

---

## Experiments

1. **## Flash Data vs Persistent Session
Flash data: session()->setFlashdata('key', 'value') — data available for ONLY the next request, then auto-deleted. Great for success/error messages after redirect. Persistent session: session()->set('key', 'value') — data stays until manually removed or session expires.
## Session in CI4
session() helper auto-loaded. session()->getFlashdata('message') — retrieve flash data. session()->set('user_id', 42) — set persistent data. session()->remove('user_id') — remove data. session()->destroy() — destroy entire session.
## Delete with Confirmation
onclick="return confirm('Delete this post?')" — browser native confirmation dialog. If user clicks OK, request continues. If Cancel, request is cancelled (return false).**

---

## Challenge

Expand session: (1) create /login page storing username in session, (2) create /logout that removes session, (3) add middleware protecting admin pages (check session login), (4) store shopping cart in session with add/remove/clear methods.

---

## Summary

Flash data = one-time message. Session()->set() = persistent data. session()->remove() = remove data. Next: security.
