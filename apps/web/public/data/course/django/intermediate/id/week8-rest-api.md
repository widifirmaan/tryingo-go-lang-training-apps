# REST API dengan DRF

## Tujuan Pembelajaran

- Install DRF
- Serializer: ModelSerializer
- ViewSet: ModelViewSet
- Router: DefaultRouter
- API endpoints: GET, POST, PUT, DELETE

---

## Program: REST API dengan DRF ViewSet

Program menyusun serializer, ViewSet, router, dan permissions - siap diekspos ke /api/orders/.

```python
"""DRF: CRUD untuk model Order."""
from rest_framework import serializers, viewsets, permissions
from rest_framework.routers import DefaultRouter
from django.urls import path, include

# Serializer: model -> JSON
class OrderSerializer(serializers.ModelSerializer):
    item_count = serializers.IntegerField(read_only=True)

    class Meta:
        model = Order
        fields = ['id', 'customer', 'status', 'total', 'item_count']

# Relasi: select_related/prefetch_related menghindari query N+1
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

# Endpoint yang dihasilkan router:
# GET    /api/orders/          list (dengan ?status=paid)
# POST   /api/orders/          create
# GET    /api/orders/1/        retrieve
# PUT/PATCH /api/orders/1/     update
# DELETE /api/orders/1/        destroy
# Auth lanjutan: token/session diaktifkan terpisah di settings.py
```

---

## Konsep Kunci

### Serializer mapping

ModelSerializer memetakan field model -> field JSON otomatis; validasi tipe (Decimal, Date) ikut bekerja out-of-the-box.

### Router & endpoint

DefaultRouter menghasilkan URL untuk 5 aksi CRUD (+ custom @action); cara satu baris untuk membangun API REST.

### Filtering query params

get_queryset membaca query_params.get('status'); seperti ini filter dinamis dibangun. Untuk skala besar pakai django-filter.

### Permissions

IsAuthenticatedOrReadOnly menutup semua penulisan bagi tamu; peran berbasis objek atau DRF throttling bisa menambah pertahanan.

---

## Eksperimen

- Tambahkan filter ?customer= pada get_queryset.
- Buat ProductSerializer lalu router.register('products', ...).
- Batasi POST hanya untuk admin (IsAdminUser).

---

## Tantangan

Implementasi custom @action(detail=True) -> POST /api/orders/1/pay/ yang mengubah status dan total.

---

## Ringkasan

Materi minggu ini telah dibahas: REST API dengan DRF ViewSet. Lanjut ke pekan berikutnya untuk memperdalam.
