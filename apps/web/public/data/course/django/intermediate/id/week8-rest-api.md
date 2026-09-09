# REST API — Warung Django Online

> **Kategori:** Django | **Level:** Menengah | **Minggu 8:** REST API
> **Prasyarat:** Minggu 7 — **Admin Panel**.

## Tujuan Pembelajaran

- `djangorestframework` — `ModelSerializer` + `ViewSet` + `router` jadi API tanpa tulis `JsonResponse` manual

---

## Kenapa Ini Penting Buat Kamu?

HP butuh JSON, bukan HTML. DRF `ViewSet` + `router` 5 baris jadi API lengkap (tanpa tulis JsonResponse manual).

---

## Program

```bash
pip install djangorestframework
```

```python
# toko/settings.py — WAJIB daftarkan (lupa = ImproperlyConfigured error!)
INSTALLED_APPS = [
    ...,
    "rest_framework",
    "warung",
]
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

## Penjelasan untuk Pemula

### Analogi: Drive-Thru JSON Django
- **ViewSet = 1 loket layani 5 keperluan** (lihat daftar, lihat 1, tambah, ubah, hapus) — tanpa tulis 5 fungsi.
- **Router = papan nomor antre otomatis**: daftarkan ViewSet 1 baris → URL `/api/produk/`, `/api/produk/1/` jadi sendiri.

### Langkah 0 — Siapkan Device
- Sama Django W1: `runserver` di `8000` (+ paket minggu ini).

### Cara Komputer Membaca
- `ModelViewSet` sediakan list/create/retrieve/update/destroy; `router` daftarkan URL.

### 3 Istilah Wajib
- 1. **ViewSet/router**: sediakan/daftar

---

## Eksperimen

- **Hijau:** Jalankan apa adanya, lalu ubah nilai `ProdukSerializer` → output ikut berubah?
- **Kuning:** Ubah huruf besar-kecil `ProdukSerializer` dan `Meta` → masih jalan atau error?
- **Merah:** Hapus baris `from rest_framework import serializers` → error apa? Pasang lagi.

## Tantangan

**REST API di Warungmu:** pakai `ProdukSerializer`, `Meta`, `ProdukViewSet` hingga benar-benar jalan, lalu kerjakan tiga tingkat ini.
- **Hijau:** Jalankan Program minggu ini apa adanya; catat output yang keluar.
- **Kuning:** Ubah 1 nilai pada `ProdukSerializer`, `Meta`, `ProdukViewSet`; tebak output SEBELUM run, lalu cocokkan.
- **Merah:** Gabungkan dengan **Admin Panel** (Minggu 7): pasang hasilnya di alur itu, pastikan ujung-ke-ujung jalan.

## Glosarium Mini

- Lihat Istilah Wajib di atas.

## Ringkasan

Minggu 8: **API Django** — DRF `ViewSet` jadi REST. Minggu depan: **Testing**.
