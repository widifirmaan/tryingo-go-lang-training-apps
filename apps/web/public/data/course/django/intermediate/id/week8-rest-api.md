# REST API — Warung Django Online

> **Kategori:** Django | **Level:** Menengah | **Minggu 8:** REST API

## Tujuan Pembelajaran

- `djangorestframework` — `ModelSerializer` + `ViewSet` + `router` jadi API tanpa tulis `JsonResponse` manual

---

## Program

```bash
pip install djangorestframework
```

```python
# warung/serializers.py
from rest_framework import serializers
from .models import Produk
class ProdukSerializer(serializers.ModelSerializer):
    class Meta:
        model = Produk
        fields = "__all__"

# warung/views.py
from rest_framework import viewsets
class ProdukViewSet(viewsets.ModelViewSet):
    queryset = Produk.objects.all()
    serializer_class = ProdukSerializer

# warung/urls.py
from rest_framework.routers import DefaultRouter
router = DefaultRouter()
router.register(r'produk', ProdukViewSet)
urlpatterns = [path('api/', include(router.urls))]
```

Buka `http://localhost:8000/api/produk/` → JSON.

---

## Ringkasan

Minggu 8: **API Django** — DRF `ViewSet` jadi REST.
