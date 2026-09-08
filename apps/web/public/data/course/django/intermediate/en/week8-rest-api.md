# REST API — Online Django Shop

> **Kategori:** Django | **Level:** Intermediate | **Minggu 8:** REST API

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
- See Program: run the commands, change 1 thing, see the difference.

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
