# Admin Panel

> **Kategori:** Django | **Level:** Menengah | **Minggu 7:** Admin Panel

## Tujuan Pembelajaran

- Register model ke admin
- ModelAdmin: list_display, list_filter, search_fields
- list_editable untuk inline editing
- createsuperuser untuk akses admin
- Custom admin actions

---

## Program: Custom Admin

```python
# admin.py
print("=== Django Admin ===")
print("from django.contrib import admin")
print("from .models import Product")
print("")
print("=== Register Model ===")
print("admin.site.register(Product)")
print("")
print("=== Custom Admin ===")
print("@admin.register(Product)")
print("class ProductAdmin(admin.ModelAdmin):")
print("    list_display = ["name", "price", "is_available", "created_at"]")
print("    list_filter = ["is_available", "created_at"]")
print("    search_fields = ["name"]")
print("    list_editable = ["price", "is_available"]")
print("")
print("=== Access Admin ===")
print("python manage.py createsuperuser")
print("http://localhost:8000/admin/")

```

---

## Konsep Kunci

### Register Model
`admin.site.register(Model)` - register model ke admin.

### ModelAdmin
`list_display` - kolom yang ditampilkan. `list_filter` - filter sidebar. `search_fields` - pencarian.

### Access
`python manage.py createsuperuser` - buat admin. `/admin/` - akses admin.

---

## Eksperimen

- Register model ke admin
- Custom ModelAdmin
- Tambah search_fields
- Buat custom admin action
- Coba fieldsets

---

## Tantangan

Buat admin panel untuk Product: list_display, list_filter, search_fields.

---

## Ringkasan

Minggu 7 dari 12: **Admin Panel** (Level: Menengah). Minggu depan: **REST API**.
