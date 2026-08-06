# REST API dengan DRF

> **Kategori:** Django | **Level:** Menengah | **Minggu 8:** REST API dengan DRF

## Tujuan Pembelajaran

- Install DRF
- Serializer: ModelSerializer
- ViewSet: ModelViewSet
- Router: DefaultRouter
- API endpoints: GET, POST, PUT, DELETE

---

## Program: API Endpoints

```python
# DRF
print("=== Django REST Framework ===")
print("=== Install DRF ===")
print("pip install djangorestframework")
print("INSTALLED_APPS += ["rest_framework"]")
print("")
print("=== Serializer ===")
print("from rest_framework import serializers")
print("class ProductSerializer(serializers.ModelSerializer):")
print("    class Meta:")
print("        model = Product")
print("        fields = ["id", "name", "price", "is_available"]")
print("")
print("=== ViewSet ===")
print("from rest_framework import viewsets")
print("class ProductViewSet(viewsets.ModelViewSet):")
print("    queryset = Product.objects.all()")
print("    serializer_class = ProductSerializer")
print("")
print("=== Router ===")
print("from rest_framework.routers import DefaultRouter")
print("router = DefaultRouter()")
print("router.register(r"products", ProductViewSet)"

```

---

## Konsep Kunci

### DRF
Django REST Framework - framework untuk build API.

### Serializer
`ModelSerializer` - serialisasi model ke JSON.

### ViewSet
`ModelViewSet` - CRUD otomatis.

### Router
`DefaultRouter` - generate URL otomatis.

---

## Eksperimen

- Install DRF
- Buat Serializer
- Buat ViewSet dan Router
- Test API endpoints
- Tambah pagination

---

## Tantangan

Buat REST API untuk Product: CRUD endpoints dengan DRF.

---

## Ringkasan

Minggu 8 dari 12: **REST API** (Level: Menengah). Selesai fase Intermediate! Minggu depan: **Testing**.
