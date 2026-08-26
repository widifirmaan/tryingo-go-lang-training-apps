# Views & URLs — Pelayan dan Pintu

> **Kategori:** Django | **Level:** Pemula | **Minggu 3:** Views & URLs

## Tujuan Pembelajaran

- `views.py` pelayan: `def daftar(request): return render(...)`
- `urls.py` pintu: `path('produk/', views.daftar)`
- `request.GET` baca cari, `context` kirim ke template

---

## Program

```python
# warung/views.py
from django.shortcuts import render
from .models import Produk

def daftar(request):
    cari = request.GET.get("cari", "")
    produk = Produk.objects.filter(nama__icontains=cari) if cari else Produk.objects.all()
    return render(request, "warung/daftar.html", {"produk": produk, "cari": cari})

# warung/urls.py
from django.urls import path
from . import views
urlpatterns = [
    path("produk/", views.daftar, name="daftar"),
]

# toko/urls.py
from django.urls import include, path
urlpatterns = [
    path("admin/", admin.site.urls),
    path("", include("warung.urls")),
]
```

**Template** `warung/templates/warung/daftar.html`:
```html
<form><input name="cari" value="{{ cari }}"><button>Cari</button></form>
<ul>{% for p in produk %}<li>{{ p.nama }} - Rp{{ p.harga }}</li>{% endfor %}</ul>
```

Buka `http://localhost:8000/produk/?cari=beras`.

---

## Ringkasan

Minggu 3: **Pelayan & Pintu** — views & URLs. Minggu depan: **Templates**.
