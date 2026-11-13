# REST API with DRF

## Learning Objectives

- Install DRF
- Serializer: ModelSerializer
- ViewSet: ModelViewSet
- Router: DefaultRouter
- API endpoints: GET, POST, PUT, DELETE

---

## Program: REST API with DRF ViewSets

The program stitches serializers, ViewSets, routers, and permissions - ready to serve under /api/orders/.

```python
"""DRF: CRUD over the Order model."""
from rest_framework import serializers, viewsets, permissions
from rest_framework.routers import DefaultRouter
from django.urls import path, include

# Serializer: model -> JSON
class OrderSerializer(serializers.ModelSerializer):
    item_count = serializers.IntegerField(read_only=True)

    class Meta:
        model = Order
        fields = ['id', 'customer', 'status', 'total', 'item_count']

# N+1 avoidance via select_related/prefetch_related on the queryset
class OrderViewSet(viewsets.ModelViewSet):
    queryset = Order.objects.select_related('customer').prefetch_related('items')
    serializer_class = OrderSerializer
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]

    def get_queryset(self):
        qs = self.queryset
        status = self.request.query_params.get('status')
        if status:
            qs = qs.filter(status=status)
        return qs

router = DefaultRouter()
router.register(r'orders', OrderViewSet, basename='order')

urlpatterns = [path('api/', include(router.urls))]

# Endpoints the router generates:
# GET    /api/orders/          list (with ?status=paid)
# POST   /api/orders/          create
# GET    /api/orders/1/        retrieve
# PUT/PATCH /api/orders/1/     update
# DELETE /api/orders/1/        destroy
# Advanced auth wiring lives in settings.py
```

---

## Key Concepts

### Serializer mapping

ModelSerializer memetakan field model -> field JSON otomatis; validasi tipe (Decimal, Date) ikut bekerja out-of-the-box.

### Router & endpoint

DefaultRouter menghasilkan URL untuk 5 aksi CRUD (+ custom @action); cara satu baris untuk membangun API REST.

### Filtering query params

get_queryset membaca query_params.get('status'); seperti ini filter dinamis dibangun. Untuk skala besar pakai django-filter.

### Permissions

IsAuthenticatedOrReadOnly menutup semua penulisan bagi tamu; peran berbasis objek atau DRF throttling bisa menambah pertahanan.

---

## Experiments

- Add a ?customer= filter in get_queryset.
- Create a ProductSerializer then router.register("products", ...).
- Restrict POST to admins only (IsAdminUser).

---

## Challenge

Add a custom @action(detail=True) -> POST /api/orders/1/pay/ that updates status and total.

---

## Summary

This week's material has been covered: REST API with DRF ViewSets. Continue to the following week to deepen.
