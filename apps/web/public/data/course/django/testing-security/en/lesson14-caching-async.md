# Caching, Redis & Async Views

> Django | Testing & Security | Lesson 14

## Learning Objectives

- Configure cache backends (LocMem → Redis)
- Use @cache_page and manual caching (cache.get/set)
- Write async views (Django 5+)
- Choose a caching strategy: what to cache, when to invalidate

---

## Program: Caching, Redis & Async Views

```python
import asyncio

from django.core.cache import cache
from django.http import HttpResponse
from django.shortcuts import render
from django.views.decorators.cache import cache_page

from .models import Produk


# cache_page: seluruh response di-cache 60 detik (per URL)
@cache_page(60)
def daftar(request):
    produk = Produk.objects.all()
    return render(request, 'katalog/daftar.html', {'produk': produk})


# Cache manual: kontrol penuh atas kunci & TTL
def statistik(request):
    key = 'statistik_produk'
    data = cache.get(key)
    if data is None:
        # MISS: hitung (mahal), lalu simpan 5 menit
        data = {
            'jumlah': Produk.objects.count(),
            'rata_rata': float(Produk.objects.aggregate(
                avg=__import__('django.db.models', fromlist=['Avg']).Avg('harga')
            )['avg'] or 0),
        }
        cache.set(key, data, 300)
    return render(request, 'katalog/statistik.html', {'data': data})


# Async view (Django 5+): await untuk I/O yang lama
async def kesehatan(request):
    # contoh: await fetch ke service lain (httpx, dsb.)
    await asyncio.sleep(0.01)
    return HttpResponse('OK')
```

---

## Explanation

## Caching: The Server Remembers Work
A cache stores expensive results (heavy queries, full responses, computations) in memory with a TTL. @cache_page(60) caches the view's response per URL for 60 seconds - database queries are skipped for every request in that window. Common cache targets: read-heavy public pages (news, catalogs), statistics, configuration, rate-limit counters.
## Manual Caching: Full Control
cache.get(key) → None on MISS, then compute + cache.set(key, data, 300). The read-through pattern: check → compute → store. Keys must be deterministic: f'statistik_{kategori_id}'. Invalidation: cache.delete(key) after data changes (creating a product = delete the stats key). Without invalidation, users see stale data until the TTL expires - pick TTLs matching your data-freshness tolerance.
## Redis: A Shared Cache for Many Servers
LocMemCache = per-process (lost on restart, not shared across servers). Production: django-redis (RedisCache) - one cache + sessions + queues (Celery), reachable from every worker. Config: CACHES.default.BACKEND = django_redis.cache.RedisCache + LOCATION redis://... (lesson 15: Docker Redis).
## Async Views: Long I/O Does Not Block
A sync view makes requests wait on I/O (HTTP to another service, big files) with the worker bound. async def view + await frees the worker for other requests while waiting - ideal for API integrations and WebSockets. Note: the ORM stays sync (sync_to_async to call it from an async view). Django 6 (late 2025 release) brings mature async support - the 2026 research calls it non-optional.

---

## Experiments

1. **Caching: The Server Remembers Work**
2. **Manual Caching: Full Control**
3. **Redis: A Shared Cache for Many Servers**
4. **Async Views: Long I/O Does Not Block**

---

## Challenge

Level up performance: (1) switch to FileBasedCache, then Redis via Docker (redis:7-alpine + django-redis) - compare the two, (2) add queryset caching (qs = Produk.objects.all(); qs = qs.cache()) with versioned keys, (3) build a /flush-cache/ page (staff only) calling cache.clear(), (4) write one async endpoint calling https://httpbin.org/delay/1 with httpx.AsyncClient - compare timing with the sync version.

---

## Summary

Caching = expensive results stored. @cache_page + manual + TTL + invalidation. Redis = shared cache. Async views for I/O. Next: production.
