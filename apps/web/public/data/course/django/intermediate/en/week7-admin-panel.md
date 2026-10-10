# Admin Panel

> **Kategori:** Django | **Level:** Intermediate | **Minggu 7:** Admin Panel

## Learning Objectives

- Register models to admin
- ModelAdmin: list_display, list_filter, search_fields
- list_editable for inline editing
- createsuperuser for admin access
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

## Key Concepts

### Register Model
`admin.site.register(Model)` registers model to admin.

### ModelAdmin
`list_display` - displayed columns. `list_filter` - sidebar filters. `search_fields` - search.

### Access
`python manage.py createsuperuser` creates admin. `/admin/` accesses admin.

---

## Experiments

- Register model to admin
- Custom ModelAdmin
- Add search_fields
- Create custom admin action
- Try fieldsets

---

## Challenge

Create admin panel for Product: list_display, list_filter, search_fields.

---

## Summary

Week 7 of 12: **Admin Panel** (Level: Intermediate). Next week: **REST API**.
