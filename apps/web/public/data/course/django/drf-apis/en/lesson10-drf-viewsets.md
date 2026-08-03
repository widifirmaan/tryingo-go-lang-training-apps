# DRF: ViewSets, Routers & Filtering

> Django | REST APIs & DRF | Lesson 10

## Learning Objectives

- Write a ModelViewSet: full CRUD in one class
- Auto-generate URLs with DefaultRouter
- Add filtering, search & ordering
- Override get_queryset for query control

---

## Program: DRF: ViewSets, Routers & Filtering

```python
from django_filters.rest_framework import DjangoFilterBackend
from rest_framework import viewsets
from rest_framework.filters import OrderingFilter, SearchFilter

from .models import Kategori, Produk
from .serializers import KategoriSerializer, ProdukSerializer


# ViewSet: list + create + retrieve + update + delete SEKALIGUS
class ProdukViewSet(viewsets.ModelViewSet):
    queryset = Produk.objects.select_related('kategori').all()
    serializer_class = ProdukSerializer

    # Filtering deklaratif dari query params
    filter_backends = [DjangoFilterBackend, SearchFilter, OrderingFilter]
    filterset_fields = ['kategori', 'tersedia']  # ?kategori=1&tersedia=true
    search_fields = ['nama', 'kategori__nama']   # ?search=kopi
    ordering_fields = ['harga', 'stok', 'dibuat']  # ?ordering=-harga
    ordering = ['-dibuat']

    # Override query: batasi data per-user (pola keamanan!)
    def get_queryset(self):
        qs = super().get_queryset()
        min_harga = self.request.query_params.get('min_harga')
        if min_harga:
            qs = qs.filter(harga__gte=min_harga)
        return qs


class KategoriViewSet(viewsets.ModelViewSet):
    queryset = Kategori.objects.all()
    serializer_class = KategoriSerializer
```

---

## Explanation

## ViewSets: CRUD in One Class
ModelViewSet provides list, create, retrieve, update, partial_update, delete - without writing a single method. Configuration: queryset + serializer_class. DefaultRouter generates the URLs: /produk/ (list+create), /produk/{pk}/ (retrieve+update+delete). This is DRF's answer to "fat controllers" - 80% of CRUD endpoints need no new code, only configuration.
## Filtering: Declarative, Not Manual
filter_backends + filterset_fields = ?kategori=1&tersedia=true automatically. SearchFilter = ?search=kopi (icontains, cross-field). OrderingFilter = ?ordering=-harga. Without these backends, manual filtering = ifs in every view (lots of duplication). django-filter maps query params to QuerySets safely - built-in type validation.
## get_queryset: The Security & Customization Point
Override get_queryset for: per-user filtering (request.user), soft deletes, custom price filters, select_related optimization. This is where the "users only see their own data" rule is ENFORCED - not in the serializer, not in the frontend. The same pattern across all tracks: query-level security.
## Routers: URLs That Cannot Typos
DefaultRouter reads the ViewSet actions and generates URLs + consistent route names. Add custom actions with @action (GET/POST /produk/terlaris/) without breaking the router. Browsable API + router = endpoints explorable without separate documentation.

---

## Experiments

1. **ViewSets: CRUD in One Class**
2. **Filtering: Declarative, Not Manual**
3. **get_queryset: The Security & Customization Point**
4. **Routers: URLs That Cannot Typos**

---

## Challenge

Strengthen the API: (1) add a custom @action(detail=False) GET terlaris to ProdukViewSet (top 5 best-stocked), (2) add a @action(detail=True) POST /produk/<id>/tambah-stok/ increasing stock via serializer input, (3) enable custom pagination: 5 per page + ?page_size override, (4) build a ReadOnlyModelViewSet for reports (statistics per category) - read only, no writes.

---

## Summary

ViewSets = CRUD in one class. Routers = automatic URLs. Declarative filter/search/ordering. get_queryset = the security gate. Next: JWT & permissions.
