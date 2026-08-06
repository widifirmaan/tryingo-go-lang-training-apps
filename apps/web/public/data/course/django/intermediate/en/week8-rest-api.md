# REST API with DRF

> **Kategori:** Django | **Level:** Intermediate | **Minggu 8:** REST API with DRF

## Learning Objectives

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

## Key Concepts

### DRF
Django REST Framework - framework for building APIs.

### Serializer
`ModelSerializer` - serializes model to JSON.

### ViewSet
`ModelViewSet` - automatic CRUD.

### Router
`DefaultRouter` - generates URLs automatically.

---

## Experiments

- Install DRF
- Create Serializer
- Create ViewSet and Router
- Test API endpoints
- Add pagination

---

## Challenge

Create REST API for Product: CRUD endpoints with DRF.

---

## Summary

Week 8 of 12: **REST API** (Level: Intermediate). Intermediate phase complete! Next week: **Testing**.
