# Caching & Redis

> Laravel | Testing & Production | Lesson 18

## Learning Objectives

- Store query results with Cache::remember (key + TTL)
- Understand how long cache lives and when to forget it
- Use counters with Cache::increment
- Swap cache backends: file (local) vs Redis (production)

---

## Program: Caching & Redis

```php
<?php

namespace App\Http\Controllers;

use App\Models\Produk;
use Illuminate\Support\Facades\Cache;

class TokoController extends Controller
{
    public function index()
    {
        $produk = Cache::remember('toko.produk', 60, function () {
            return Produk::with('kategori')->get();
        });

        $terlaris = Cache::remember('toko.terlaris', 300, function () {
            return Produk::orderBy('stok', 'asc')->take(5)->get();
        });

        $kunjungan = Cache::increment('toko.kunjungan', 1);

        return view('toko', compact('produk', 'terlaris', 'kunjungan'));
    }

    public function refresh()
    {
        Cache::forget('toko.produk');
        Cache::forget('toko.terlaris');

        return back()->with('sukses', 'Cache toko dibersihkan.');
    }
}

```

---

## Explanation

## remember(): One Line to Store
Cache::remember('toko.produk', 60, fn) = if the key exists, return it; otherwise run the closure, store the result for 60 seconds, return it. The heavy query runs ONCE per minute, not once per request. Key = a unique name; TTL = seconds.
## When Cache Lives, When It Dies
Short TTLs (seconds-minutes) for frequently changing data, long ones (hours-days) for rarely changing data. MUTATED data must be invalidated: Cache::forget('toko.produk') when a product is created/updated/deleted - the "Clear Cache" button in this store mimics it. TTL without forget = stale data for at most 60 seconds.
## Counters & Small Numbers
Cache::increment('toko.kunjungan', 1) = an atomic operation: safe under many concurrent requests (compare a manual read-modify-write which can race). Great for hit counters, rate limiting, lightweight stats.
## File vs Redis
CACHE_STORE=file = stored on disk (local, zero setup). redis = an in-memory server (fast, shared across MANY app servers). Change one .env line - the code does not change. Choosing: small single server = file/array; multi-instance scale = redis.

---

## Experiments

1. **remember(): One Line to Store**
2. **When Cache Lives, When It Dies**
3. **Counters & Small Numbers**
4. **File vs Redis**

---

## Challenge

Real caching optimization: (1) add a Cache::remember('toko.halaman', 600, fn) for the BEST-SELLING page section (no package: separate keys + manual forget in refresh), (2) build locked stock operations: Cache::lock('stok.produk.'.$id, 10) around stock decrements to prevent overselling, (3) compare speeds: measure response time with and without cache (Chrome DevTools/curl -w "%{time_total}"), (4) write a README: the cache stampede scenario and the lock solution.

---

## Summary

remember = query once, TTL = lifetime, forget = invalidation, increment = atomic. Next: Docker & CI/CD.
