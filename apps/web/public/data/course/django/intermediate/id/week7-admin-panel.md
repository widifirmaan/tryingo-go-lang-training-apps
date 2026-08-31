# Admin Panel — Kasir Otomatis Django

> **Kategori:** Django | **Level:** Menengah | **Minggu 7:** Admin Panel

## Tujuan Pembelajaran

- `admin.py` kustom: `list_display`, `list_filter`, `search_fields` — kasir lebih enak

---

## Program

```python
# warung/admin.py
from django.contrib import admin
from .models import Produk

@admin.register(Produk)
class ProdukAdmin(admin.ModelAdmin):
    list_display = ("nama", "harga", "stok", "kategori")
    list_filter = ("kategori",)
    search_fields = ("nama",)
    list_editable = ("harga", "stok")
```

Buka `http://localhost:8000/admin/warung/produk/` → filter kategori, cari nama, edit harga langsung di list.

---

## Ringkasan

Minggu 7: **Kasir Otomatis** — admin kustom.
