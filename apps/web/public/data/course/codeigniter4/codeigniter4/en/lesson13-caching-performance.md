# Caching & Performance

> CodeIgniter 4 | Lesson 13

## Learning Objectives

- Use cache() to store and retrieve data from cache\n- Use save_to_cache() to store data with TTL\n- Choose file handler for development and Redis/Memcached for production\n- Use cache to reduce repeated database queries

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

## Explanation

## Cache in CI4
cache('key') — retrieve from cache. save_to_cache('key', $data, $ttl) — store with TTL (seconds). cache()->get('key') — alternative syntax. cache()->save('key', $data, $ttl) — alternative store.
## Cache Handlers
File handler (default): stores cache as files in writable/cache/. Redis handler: for production with Redis server. Memcached handler: for production with Memcached. Choose handler in app/Config/Cache.php.
## Cache Invalidation
Delete cache when data changes: cache()->delete('posts_list'). Delete all cache: cache()->flush(). TTL (Time To Live): after TTL expires, cache auto-deleted and data fetched from database again.

---

## Experiments

1. **## Cache in CI4
cache('key') — retrieve from cache. save_to_cache('key', $data, $ttl) — store with TTL (seconds). cache()->get('key') — alternative syntax. cache()->save('key', $data, $ttl) — alternative store.
## Cache Handlers
File handler (default): stores cache as files in writable/cache/. Redis handler: for production with Redis server. Memcached handler: for production with Memcached. Choose handler in app/Config/Cache.php.
## Cache Invalidation
Delete cache when data changes: cache()->delete('posts_list'). Delete all cache: cache()->flush(). TTL (Time To Live): after TTL expires, cache auto-deleted and data fetched from database again.**

---

## Challenge

Level up caching: (1) implement cache tagging for invalidating cache by category, (2) create view cache for rarely changing pages, (3) benchmark performance with and without cache using CI4 timer, (4) implement Redis handler for production environment.

---

## Summary

cache() = retrieve data. save_to_cache() = store data. TTL = time to live. File handler = dev. Redis = production. Next: advanced topics.
