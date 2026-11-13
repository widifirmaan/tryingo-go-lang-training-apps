# Caching & Performance

## Learning Objectives

- Cache backends: LocMem, Redis
- Cache API: set, get, delete
- Per-view cache: @cache_page
- Template fragment caching
- Cache invalidation

---

## Program: Caching Backends & Decorators

Caching the Django way: cache backends (Redis), per-view decorators, template fragments, and invalidation.

```python
"""Caching an overview dashboard."""
# 1. settings.py wiring:
#    CACHES = {'default': {'BACKEND': 'django.core.cache.backends.redis.RedisCache',
#                           'LOCATION': 'redis://127.0.0.1:6379/1'}}
from django.core.cache import cache
from django.views.decorators.cache import cache_page

# 2. Per-view decorator (caches the GET response)
@cache_page(60)                # cache for 60 seconds
def dashboard(request):
    # 3. Low-level cache for expensive queries
    stats = cache.get('stats:overview')
    if stats is None:
        # ...expensive aggregation query...
        stats = {'orders': 834, 'revenue': '105M', 'hit_rate': '94%'}
        cache.set('stats:overview', stats, timeout=300)
    return stats

# 4. Invalidate when data changes:
def invalidate_overview(_sender, **_kwargs):
    cache.delete('stats:overview')

# 5. Template fragment cache:
#    {% load cache %} {% cache 300 product_list "v2" %} ... {% endcache %}

stats = dashboard(None)          # first call: miss (computed)
stats = dashboard(None)          # second call: hit
print('[dashboard] stats:', stats['orders'], 'orders, hit rate', stats['hit_rate'])
cache.delete('stats:overview')   # explicitly expire
print('[invalidate] ready for the next stat refresh')
```

---

## Key Concepts

### Layer cache

Ada beberapa tingkat: query cache, view cache (hasil GET penuh), template fragment cache, dan low-level cache.set. Pilih level sesuai seberapa mudah datanya membusuk.

### Cache key design

stats:overview vs stats:overview:v1 - prefix versi memudahkan invalidasi massal (naikkan versi saat deploy).

### Decorator vs TTL manual

cache_page men-cache GET; POST tidak di-cache. cache.set(..., timeout=N) adalah jalur atomik TTL manual untuk proses latar.

### Hit-rate observability

Pantau hit-rate lewat statistik Redis (keyspace_hits/misses); hit-rate mengukur seberapa efektif strategi caching yang diterapkan.

---

## Experiments

- Measure the hit rate: load the dashboard 10 times and count hits.
- Change TTL to 30 seconds, or refresh early via a worker.
- Trigger cache.delete on completed checkout.

---

## Challenge

Compute a "top sellers" stat: cache.set once plus invalidation wired to the order-paid signal, with a short TTI.

---

## Summary

This week's material has been covered: Caching Backends & Decorators. Continue to the following week to deepen.
