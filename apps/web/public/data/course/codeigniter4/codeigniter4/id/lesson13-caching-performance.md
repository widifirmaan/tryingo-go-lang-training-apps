# Caching & Performance

> CodeIgniter 4 | Pelajaran 13

## Tujuan Pembelajaran

- Menggunakan cache() untuk menyimpan dan mengambil data dari cache\n- Menggunakan save_to_cache() untuk menyimpan data dengan TTL\n- Memilih file handler untuk development dan Redis/Memcached untuk production\n- Menggunakan cache untuk mengurangi query database yang berulang

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

        // Check cache first
        if (!$cached = cache('posts_list')) {
            $data['posts'] = $model->getPosts();
            save_to_cache('posts_list', $data['posts'], 300); // 5 minutes
        } else {
            $data['posts'] = $cached;
        }

        return view('blog/index', $data);
    }

    public function view(string $slug = null): string
    {
        if ($slug === null) {
            return redirect()->to('/blog');
        }

        $cacheKey = 'post_' . $slug;
        if (!$post = cache($cacheKey)) {
            $model = new PostModel();
            $post = $model->getPostBySlug($slug);
            if (!$post) {
                throw \CodeIgniter\Exceptions\PageNotFoundException::forPageNotFound();
            }
            save_to_cache($cacheKey, $post, 600); // 10 minutes
        }

        return view('blog/view', ['post' => $post]);
    }
}

```

---

## Penjelasan

## Cache in CI4
cache('key') — retrieve from cache. save_to_cache('key', $data, $ttl) — store with TTL (seconds). cache()->get('key') — alternative syntax. cache()->save('key', $data, $ttl) — alternative store.
## Cache Handlers
File handler (default): menyimpan cache sebagai file di writable/cache/. Redis handler: untuk production dengan Redis server. Memcached handler: untuk production dengan Memcached. Pilih handler di app/Config/Cache.php.
## Cache Invalidation
Hapus cache saat data berubah: cache()->delete('posts_list'). Hapus semua cache: cache()->flush(). TTL (Time To Live): setelah TTL expired, cache otomatis dihapus dan data diambil dari database lagi.

---

## Eksperimen

1. **## Cache in CI4
cache('key') — retrieve from cache. save_to_cache('key', $data, $ttl) — store with TTL (seconds). cache()->get('key') — alternative syntax. cache()->save('key', $data, $ttl) — alternative store.
## Cache Handlers
File handler (default): menyimpan cache sebagai file di writable/cache/. Redis handler: untuk production dengan Redis server. Memcached handler: untuk production dengan Memcached. Pilih handler di app/Config/Cache.php.
## Cache Invalidation
Hapus cache saat data berubah: cache()->delete('posts_list'). Hapus semua cache: cache()->flush(). TTL (Time To Live): setelah TTL expired, cache otomatis dihapus dan data diambil dari database lagi.**

---

## Tantangan

Tingkatkan caching: (1) implementasi cache tagging untuk invalidate cache berdasarkan kategori, (2) buat view cache untuk halaman yang jarang berubah, (3) bandingkan performa dengan dan tanpa cache menggunakan timer CI4, (4) implementasi Redis handler untuk production environment.

---

## Ringkasan

cache() = ambil data. save_to_cache() = simpan data. TTL = time to live. File handler = dev. Redis = production. Lanjut: advanced topics.
