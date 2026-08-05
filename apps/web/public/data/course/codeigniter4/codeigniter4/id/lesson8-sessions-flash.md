# Sessions & Flash Data

> CodeIgniter 4 | Pelajaran 8

## Tujuan Pembelajaran

- Menggunakan session()->setFlashdata() dan session()->getFlashdata()\n- Menyimpan data session persisten dengan session()->set()\n- Menghapus session dengan session()->remove()\n- Menggunakan session untuk menyimpan pesan sukses/gagal

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

## Penjelasan

## Flash Data vs Persistent Session
Flash data: session()->setFlashdata('key', 'value') — data tersedia HANYA untuk 1 request berikutnya, lalu otomatis dihapus. Cocok untuk pesan sukses/gagal setelah redirect. Persistent session: session()->set('key', 'value') — data tetap sampai dihapus manual atau session expired.
## Session in CI4
session() helper otomatis loaded. session()->getFlashdata('message') — ambil flash data. session()->set('user_id', 42) — set persistent data. session()->remove('user_id') — hapus data. session()->destroy() — destroy entire session.
## Delete with Confirmation
onclick="return confirm('Hapus post ini?')" — browser native confirmation dialog. Jika user klik OK, request dilanjutkan. Jika Cancel, request dibatalkan (return false).

---

## Eksperimen

1. **## Flash Data vs Persistent Session
Flash data: session()->setFlashdata('key', 'value') — data tersedia HANYA untuk 1 request berikutnya, lalu otomatis dihapus. Cocok untuk pesan sukses/gagal setelah redirect. Persistent session: session()->set('key', 'value') — data tetap sampai dihapus manual atau session expired.
## Session in CI4
session() helper otomatis loaded. session()->getFlashdata('message') — ambil flash data. session()->set('user_id', 42) — set persistent data. session()->remove('user_id') — hapus data. session()->destroy() — destroy entire session.
## Delete with Confirmation
onclick="return confirm('Hapus post ini?')" — browser native confirmation dialog. Jika user klik OK, request dilanjutkan. Jika Cancel, request dibatalkan (return false).**

---

## Tantangan

Kembangkan session: (1) buat halaman /login yang menyimpan username ke session, (2) buat /logout yang menghapus session, (3) tambah middleware yang melindungi halaman admin (cek session login), (4) simpan shopping cart di session dengan add/remove/clear methods.

---

## Ringkasan

Flash data = pesan sekali jalan. Session()->set() = data persisten. session()->remove() = hapus data. Lanjut: keamanan.
