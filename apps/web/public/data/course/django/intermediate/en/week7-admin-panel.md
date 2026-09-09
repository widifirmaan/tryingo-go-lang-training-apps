# Admin Panel — Automatic Django Cashier

> **Kategori:** Django | **Level:** Intermediate | **Minggu 7:** Admin Panel
> **Prerequisites:** Week 6 — **Authentication**.

## Learning Objectives

- Custom `admin.py`: `list_display`, `list_filter`, `search_fields` — nicer cashier desk

---

## Why This Matters (Non-IT)

Without custom admin, finding 1 product scrolls 1000 rows. With `list_display` + `search_fields` + `list_filter`, found in 3 seconds.

---

## Program

```python
# shop/admin.py
from django.contrib import admin
from .models import Product

@admin.register(Product)
class ProductAdmin(admin.ModelAdmin):
    list_display = ("name", "price", "stock", "category")
    list_filter = ("category",)
    search_fields = ("name",)
    list_editable = ("price", "stock")
```

Open `http://localhost:8000/admin/shop/product/` → filter category, find names, edit prices right in the list.


---

## Beginner Friendly Explanation

### Analogy: Neat Automatic Cashier
- **Stock admin = plain cashier desk**: can sell, but finding goods means scrolling 1000 rows.
- **`list_display` + `search_fields` + `list_filter` = labeled racks + search box + category dividers**: cashiers find goods in 3 seconds. `list_editable` = edit prices right in the list, no card opening!

### Step 0 — Prepare Device
- Same as Django W1: `runserver` on `8000` (+ this week's package).

### How the Computer Reads It
- `list_display` columns; `search_fields` finds; `list_filter` side-filters.

### 3 Must-Know Terms
- 1. **list_display/search**: columns/find

---

## Challenge

**Admin Panel in Your Shop:** use `ProductAdmin`, `django` until it truly runs, then do these three levels.
- **Green:** Run this week's Program as-is; note the output.
- **Yellow:** Change 1 value in `ProductAdmin`, `django`; predict the output BEFORE running, then compare.
- **Red:** Combine with **Authentication** (Week 6): plug the result into that flow, end-to-end must work.

## Mini Glossary

- See Must-Know Terms above.

## Summary

Week 7: **Automatic Cashier** — custom admin. Next: **REST API**.
