# DRF: Serializers & APIView

> Django | REST APIs & DRF | Lesson 9

## Learning Objectives

- Install and configure the Django REST Framework
- Write ModelSerializers and custom validation
- Write APIViews: GET list, POST create, GET/PUT/DELETE detail
- Use the DRF browsable API for exploration

---

## Program: DRF: Serializers & APIView

```python
from rest_framework import serializers

from .models import Kategori, Produk


class KategoriSerializer(serializers.ModelSerializer):
    """ModelSerializer: JSON dari/ke model - otomatis dari field model."""

    class Meta:
        model = Kategori
        fields = ['id', 'nama']


class ProdukSerializer(serializers.ModelSerializer):
    # Nama field boleh beda dari model (read-only, dari relasi)
    nama_kategori = serializers.CharField(source='kategori.nama', read_only=True)

    class Meta:
        model = Produk
        fields = ['id', 'nama', 'harga', 'stok', 'kategori', 'nama_kategori', 'dibuat']

    # Validasi custom (setara clean_* di forms)
    def validate_harga(self, harga):
        if harga <= 0:
            raise serializers.ValidationError('Harga harus lebih dari 0.')
        return harga


class ProdukRingkasSerializer(serializers.ModelSerializer):
    """Serializer kedua: subset field untuk endpoint ringkas."""

    class Meta:
        model = Produk
        fields = ['id', 'nama', 'harga']
```

---

## Explanation

## Why DRF: Serializer = DTO + Form in One
A serializer converts model → JSON (out) and JSON → model (in), plus validation - exactly the DTO + ValidationPipe from NestJS. ModelSerializer derives fields and validation from the model: one definition, consistent with the database. serializer.save() writes to the DB; collections use many=True. Two directions: ProdukSerializer(data=request.data) for input, serializer.data for output.
## APIView: Four Methods, One Function
@api_view(['GET','POST']) builds a view handling HTTP methods: GET = read, POST = create (201), PUT = full replace, DELETE = remove (204). Response(serializer.data) returns JSON; serializer.errors → 400 with the failing fields detailed. This pattern equals routes + controllers in Express/Nest - but validation and serialization are automatic.
## The Browsable API: Living Documentation
Open /api/produk/ in a browser → DRF renders an interactive UI: input forms, method buttons, response details. This is DRF's "Swagger", free from birth. Frontend devs test endpoints without Postman; explorers read the API contract from the browser. Docs never go stale because they are born from serializers.
## API vs Template: Django's Two Faces
Template views return HTML (render); APIViews return JSON (Response). Real apps use BOTH: admin/template pages for internal use, APIs for frontends/mobiles. Split the routing (/ vs /api/) and start API-first like the 2026 research: many Django companies run DRF as their primary backend.

---

## Experiments

1. **Why DRF: Serializer = DTO + Form in One**
2. **APIView: Four Methods, One Function**
3. **The Browsable API: Living Documentation**
4. **API vs Template: Django's Two Faces**

---

## Challenge

Extend the API: (1) add a Ulasan serializer (produk FK + isi + bintang + penulis) and GET/POST /api/produk/<id>/ulasan/ endpoints, (2) add a ?stok_min= query param to produk_list (filter before serializing), (3) add a GET /api/statistik/ endpoint returning aggregations (product count, average price) via Response, (4) build a nested serializer: products with their reviews (UlasanSerializer many=True).

---

## Summary

Serializers = DTO + form + validation. APIViews = 4 methods in one view. The browsable API = living docs. JSON for frontends. Next: viewsets & routers.
