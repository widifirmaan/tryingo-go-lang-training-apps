# Views & URLs — Django Shop Waiters and Doors

> **Kategori:** Django | **Level:** Beginner | **Minggu 3:** Views & URLs
> **Prerequisites:** Week 2 — **Models & ORM**.

## Learning Objectives

- `def list(request)` waiter in `views.py` → `render(request, "shop/list.html", {...})` delivers (source: docs.djangoproject.com/topics/http/views)
- `path('products/', views.list)` door in `urls.py` + `include("shop.urls")` in main doors (source: docs.djangoproject.com/topics/http/urls)
- `request.GET.get("find", "")` reads typing, `name__icontains` fuzzy-filters

---

## Why This Matters (Non-IT)

Racks (`models`) without waiters = customers can't see. Views = waiters fetching from racks + delivering to tables (templates). URLs = door boards (`/products/` → `list` waiter). Without `urls.py`, browsers 404 though views are correct.

---

## Program: Product-Finding Waiter

```python
# shop/views.py — waiter
from django.shortcuts import render
from .models import Product

def list(request):
    find = request.GET.get("find", "")  # reads ?find=rice
    if find:
        products = Product.objects.filter(name__icontains=find)
    else:
        products = Product.objects.all()
    return render(request, "shop/list.html", {"products": products, "find": find})
```

```python
# shop/urls.py — store doors (create new file!)
from django.urls import path
from . import views

urlpatterns = [
    path("products/", views.list, name="list"),
]
```

```python
# store/urls.py — building doors (add 1 line)
from django.urls import include, path
urlpatterns = [
    path("admin/", admin.site.urls),
    path("", include("shop.urls")),  # forwards all /... to shop
]
```

```html
<!-- shop/templates/shop/list.html — table -->
<form method="get">
  <input name="find" value="{{ find }}" placeholder="Find: rice">
  <button>Find</button>
</form>
<ul>
  {% for p in products %}
    <li>{{ p.name }} - Rp{{ p.price }}</li>
  {% empty %}
    <li>No results for "{{ find }}"</li>
  {% endfor %}
</ul>
```

Open `http://localhost:8000/products/` → all. Type `rice` → `http://localhost:8000/products/?find=rice` → filtered.

---

## Key Concepts

### `request` = Customer Order
`request.GET` = writing on paper (`?find=rice`), `request.POST` = sealed envelope (forms).

### `render(request, template, context)` = Deliver to Table
`{"products": products}` = tray of data for `{{ }}` templates.

### `path()` + `include()` = Doors
`path("products/", views.list)` store door, `include("shop.urls")` forwards from building.

---

## Beginner Friendly Explanation

### Analogy: Restaurant
- **URLs = door boards**: `/products/` → `list` waiter table.
- **Views = waiters**: take orders (`request`), fetch from kitchen (`models`), deliver to tables (`render`).
- **Template = table**: displays `{{ p.name }}`.

### Step 0 — Prepare Device
- Same as W1-W2: `runserver` running, `Product` pre-filled (create 3 via admin).

### How the Computer Reads It
1. Browser `GET /products/?find=rice` → `store/urls.py` → `include` → `shop/urls.py` → `path("products/")` matches → `list(request)`.
2. `list` reads `find="rice"` → `filter(name__icontains="rice")` → `render` → HTML.

### 3 Must-Know Terms
1. **View**: waiter (function)
2. **URL/path**: door
3. **Context**: data tray to template

---

## Experiments

- **Green:** Open `/products/?find=spinach` → only Spinach?
- **Yellow:** Remove `include("shop.urls")` → `/products/` 404? Reattach.
- **Red:** Swap `render` for `return HttpResponse("Hello")` → raw text? (render = template, HttpResponse = raw)

---

## Challenge

**Complete Finding Shop:** Add second `?category=veggies`: `list` reads `find` + `category` → filters both → template 2 inputs + link `?find=&category=staples`.

---

## Mini Glossary

- **request.GET/POST**: paper/envelope
- **render/path/include**: deliver/door/forward
- **icontains/empty**: fuzzy/empty

---

## Summary

Week 3 of 4: **Waiters & Doors** (Level: Beginner). Can display + find. Next: **Templates** — pretty tables.
