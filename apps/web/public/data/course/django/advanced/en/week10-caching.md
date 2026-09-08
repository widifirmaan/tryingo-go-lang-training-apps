# Caching — Fast Django Drawer

> **Kategori:** Django | **Level:** Advanced | **Minggu 10:** Caching

## Learning Objectives

- `cache.set("products", data, 60)` 60-second drawer, `@cache_page(60)` pages

---

## Why This Matters (Non-IT)

Heavy queries 100x/minute without cache = DB overheats. With 60-second `cache.get/set`, 99x served from drawer (0.1ms).

---

## Program

```python
from django.core.cache import cache

def list(request):
    data = cache.get("products")
    if not data:
        data = list(Product.objects.all().values())
        cache.set("products", data, 60) # 60 seconds
    return render(request, "list.html", {"products": data})
```

`settings.py`: `CACHES = {"default": {"BACKEND": "django.core.cache.backends.locmem.LocMemCache"}}`


---

## Beginner Friendly Explanation

### Analogy: Fast Django Drawer
- **No cache = every buyer asks the warehouse**: 100x/minute → warehouse (DB) overheats, store slows.
- **`cache.get` checks the drawer first**: hit → 0.1ms; miss → compute once → `cache.set(key, data, 60)` → next 99 buyers from drawer. Key + seconds = drawer name + expiry!

### Step 0 — Prepare Device
- Same as Django W1: `runserver` on `8000` (+ this week's package).

### How the Computer Reads It
- `cache.get` checks drawer; empty → compute → `cache.set(key, data, 60)`.

### 3 Must-Know Terms
- 1. **cache.get/set**: check/store-drawer

---

## Mini Glossary

- See Must-Know Terms above.

## Summary

Week 10: **Fast Drawer** — 60-second `cache`. Next: **Deploy**.
