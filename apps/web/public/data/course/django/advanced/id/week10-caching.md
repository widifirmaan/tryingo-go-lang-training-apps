## Tujuan Pembelajaran

- Cache backends: LocMem, Redis
- Cache API: set, get, delete
- Per-view cache: @cache_page
- Template fragment caching
- Cache invalidation

---

## Program: Caching: Backend & Decorator

Cache dari sisi Django: cache backend (Redis), decorator per-view, cache di fragment template, dan invalidation.

```python
"""Caching dashboard overview."""
# 1. Deklarasi cache di settings.py:
#    CACHES = {'default': {'BACKEND': 'django.core.cache.backends.redis.RedisCache',
#                           'LOCATION': 'redis://127.0.0.1:6379/1'}}
from django.core.cache import cache
from django.views.decorators.cache import cache_page

# 2. Per-view decorator (mem-cache hasil semua GET request)
@cache_page(60)                # cache 60 detik
def dashboard(request):
    # 3. Low-level: query mahal di-cache manual
    stats = cache.get('stats:overview')
    if stats is None:
        # ...query agregasi yang mahal...
        stats = {'orders': 834, 'revenue': '105jt', 'hit_rate': '94%'}
        cache.set('stats:overview', stats, timeout=300)
    return stats

# 4. Invalidasi saat data berubah:
def invalidate_overview(_sender, **_kwargs):
    cache.delete('stats:overview')

# 5. Template fragment cache:
#    {% load cache %} {% cache 300 product_list "v2" %} ... {% endcache %}

stats = dashboard(None)          # pertama: miss (query dihitung)
stats = dashboard(None)          # kedua: hit
print('[dashboard] stats:', stats['orders'], 'orders, hit rate', stats['hit_rate'])
cache.delete('stats:overview')   # expire manual
print('[invalidate] siap menyegarkan statistik berikutnya')
```

---

## Konsep Kunci

### Layer cache

Ada beberapa tingkat: query cache, view cache (hasil GET penuh), template fragment cache, dan low-level cache.set. Pilih level sesuai seberapa mudah datanya membusuk.

### Cache key design

stats:overview vs stats:overview:v1 - prefix versi memudahkan invalidasi massal (naikkan versi saat deploy).

### Decorator vs TTL manual

cache_page men-cache GET; POST tidak di-cache. cache.set(..., timeout=N) adalah jalur atomik TTL manual untuk proses latar.

### Hit-rate observability

Pantau hit-rate lewat statistik Redis (keyspace_hits/misses); hit-rate mengukur seberapa efektif strategi caching yang diterapkan.

---

## Eksperimen

- Ukur hit-rate: muat dashboard 10 kali dan hitung berapa yang hit.
- Ubah TTL ke 30 detik lalu refresh lewat worker.
- Tambahkan panggilan cache.delete ketika checkout selesai.

---

## Tantangan

Rancang statistik "sellers top": hitung sekali lewat cache.set + invalidasi yang dipasang ke signal order-paid, dengan TTI singkat.

---

## Ringkasan

Materi minggu ini telah dibahas: Caching: Backend & Decorator. Lanjut ke pekan berikutnya untuk memperdalam.
