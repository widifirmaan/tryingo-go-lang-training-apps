# REST API — Online Django Shop

> **Kategori:** Django | **Level:** Intermediate | **Minggu 8:** REST API
> **Prerequisites:** Week 7 — **Admin Panel**.

## Learning Objectives

- `djangorestframework` — `ModelSerializer` + `ViewSet` + `router` becomes an API without hand-written `JsonResponse`

---

## Why This Matters (Non-IT)

Phones need JSON, not HTML. DRF `ViewSet` + `router` in 5 lines becomes a complete API (no manual JsonResponse).

---

## Program

```bash
pip install djangorestframework
```

```python
# store/settings.py — MANDATORY registration (forgotten = ImproperlyConfigured error!)
INSTALLED_APPS = [
    ...,
    "rest_framework",
    "shop",
]
```

```python
# shop/serializers.py
from rest_framework import serializers
from .models import Product
class ProductSerializer(serializers.ModelSerializer):
    class Meta:
        model = Product
        fields = "__all__"

# shop/views.py
from rest_framework import viewsets
class ProductViewSet(viewsets.ModelViewSet):
    queryset = Product.objects.all()
    serializer_class = ProductSerializer

# shop/urls.py
from rest_framework.routers import DefaultRouter
router = DefaultRouter()
router.register(r'products', ProductViewSet)
urlpatterns = [path('api/', include(router.urls))]
```

Open `http://localhost:8000/api/products/` → JSON.


---

## Beginner Friendly Explanation

### Analogy: Django JSON Drive-Thru
- **ViewSet = 1 counter serving 5 needs** (list one, list all, add, edit, delete) — no 5 hand-written functions.
- **Router = automatic queue-number board**: register a ViewSet in 1 line → `/api/products/`, `/api/products/1/` appear by themselves.

### Step 0 — Prepare Device
- Same as Django W1: `runserver` on `8000` (+ this week's package).

### How the Computer Reads It
- `ModelViewSet` provides list/create/retrieve/update/destroy; `router` registers URLs.

### 3 Must-Know Terms
- 1. **ViewSet/router**: provide/register

---

## Mini Glossary

- See Must-Know Terms above.

## Summary

Week 8: **Django API** — DRF `ViewSet` becomes REST. Next: **Testing**.
