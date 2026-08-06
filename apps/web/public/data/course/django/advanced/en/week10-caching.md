# Caching & Performance

> **Kategori:** Django | **Level:** Advanced | **Minggu 10:** Caching & Performance

## Learning Objectives

- Cache backends: LocMem, Redis
- Cache API: set, get, delete
- Per-view cache: @cache_page
- Template fragment caching
- Cache invalidation

---

## Program: Cache Setup

```python
# caching
print("=== Django Caching ===")
print("=== Cache Backends ===")
print("CACHES = {")
print("    'default': {")
print("        'BACKEND': 'django.core.cache.backends.locmem.LocMemCache',")
print("    }")
print("}")
print("")
print("=== Redis Cache ===")
print("CACHES = {")
print("    'default': {")
print("        'BACKEND': 'django_redis.cache.RedisCache',")
print("        'LOCATION': 'redis://127.0.0.1:6379/1',")
print("    }")
print("}")
print("")
print("=== Cache Usage ===")
print("from django.core.cache import cache")
print("cache.set('key', 'value', timeout=3600)")
print("value = cache.get('key')")
print("cache.delete('key')")
print("")
print("=== Per-View Cache ===")
print("from django.views.decorators.cache import cache_page")
print("@cache_page(60 * 15)")
print("def product_list(request):")
print("    ...")

```

---

## Key Concepts

### Cache Backends
`LocMemCache` (dev), `RedisCache` (production).

### Cache API
`cache.set(key, value, timeout)`, `cache.get(key)`, `cache.delete(key)`.

### Per-View Cache
`@cache_page(60 * 15)` - cache view 15 minutes.

### Invalidation
Delete cache when data changes.

---

## Experiments

- Setup Redis cache
- Cache product list view
- Implement cache invalidation
- Try template caching
- Benchmark with and without cache

---

## Challenge

Setup Redis cache for product list. Implement cache invalidation.

---

## Summary

Week 10 of 12: **Caching** (Level: Advanced). Next week: **Deployment**.
