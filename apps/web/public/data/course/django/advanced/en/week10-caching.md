# Caching — Laci Cepat Django

> **Kategori:** Django | **Level:** Lanjutan | **Minggu 10:** Caching

## Tujuan Pembelajaran

- `cache.set("produk", data, 60)` laci 60 detik, `@cache_page(60)` halaman

---

## Program

```python
from django.core.cache import cache

def daftar(request):
    data = cache.get("produk")
    if not data:
        data = list(Produk.objects.all().values())
        cache.set("produk", data, 60) # 60 detik
    return render(request, "daftar.html", {"produk": data})
```

`settings.py`: `CACHES = {"default": {"BACKEND": "django.core.cache.backends.locmem.LocMemCache"}}`

---

## Ringkasan

Minggu 10: **Laci Cepat** — `cache` 60 detik.
