# URLs & Views: The Dispatcher & Path Converters

> Django | Django Fundamentals | Lesson 2

## Learning Objectives

- Write URL patterns with path() and include()
- Use path converters: int, str, slug, uuid
- Write function-based views (FBVs)
- Read query params and return JSON

---

## Program: URLs & Views: The Dispatcher & Path Converters

```python
from django.http import Http404, HttpResponse, JsonResponse
from django.shortcuts import render

PRODUK = [
    {'id': 1, 'nama': 'Kopi Arabika', 'harga': 45000},
    {'id': 2, 'nama': 'Teh Melati', 'harga': 25000},
    {'id': 3, 'nama': 'Matcha Latte', 'harga': 55000},
]


def daftar(request):
    """View berbasis fungsi (FBV): render daftar produk."""
    return render(request, 'katalog/daftar.html', {'produk': PRODUK})


def detail(request, produk_id):
    """Path converter <int:produk_id> mengirimkan int (bukan string!)."""
    item = next((p for p in PRODUK if p['id'] == produk_id), None)
    if item is None:
        raise Http404('Produk tidak ditemukan')  # -> halaman 404
    return render(request, 'katalog/detail.html', {'item': item})


def cari(request):
    """Query params: ?q=teh -> request.GET['q']."""
    kata = request.GET.get('q', '')
    hasil = [p for p in PRODUK if kata.lower() in p['nama'].lower()]
    return render(request, 'katalog/cari.html', {'hasil': hasil, 'kata': kata})


def api_produk(request):
    """JsonResponse: balas JSON, dasar API (DRF di pelajaran 9)."""
    return JsonResponse({'produk': PRODUK})
```

---

## Explanation

## The URLconf: A Clear Route Map
urlpatterns is a list of patterns: path('produk/<int:produk_id>/', views.detail) matches a URL and PASSES produk_id to the view. Order matters: Django tries top-down, the first matching pattern wins. The naming convention (name='daftar') lets templates reference routes with {% url 'daftar' %} - change the URL without touching templates.
## Path Converters: Types in the URL
<int:...> accepts only digits (sending 'abc' = 404), <str:...> text, <slug:...> slugs (letters-digits-hyphens), <uuid:...>. A converter is validation + type conversion in one syntax. Rule: strict URLs prevent bugs - 'produk/<int:id>' will never receive junk.
## FBVs: Plain Functions, Full Power
A view is a function with request as an argument, returning an HttpResponse (render, JsonResponse, redirect). render(request, template, context) merges the template + data. Http404 throws a proper 404 response. FBVs are simple and explicit - start here before jumping to class-based views (lesson 8).
## Query Params & JSON
?q=teh is read via request.GET.get('q', '') - a default when absent. JsonResponse({'produk': [...]}) returns JSON for frontends/mobile - this is the seed of the APIs later formalized with the Django REST Framework (lesson 9).

---

## Experiments

1. **The URLconf: A Clear Route Map**
2. **Path Converters: Types in the URL**
3. **FBVs: Plain Functions, Full Power**
4. **Query Params & JSON**

---

## Challenge

Extend the catalog: (1) add a /produk/baru/ route accepting a simple POST and appending to PRODUK (note: it disappears on server restart - why?), (2) add a <slug:nama> converter to another detail route, (3) create a /statistik/ route returning a JsonResponse with the product count and total price, (4) refactor PRODUK into a dict list with an extra stok field.

---

## Summary

The URLconf = the route map. Path converters = types in the URL. FBVs = request→response functions. Query params & JSON. Next: models & migrations.
