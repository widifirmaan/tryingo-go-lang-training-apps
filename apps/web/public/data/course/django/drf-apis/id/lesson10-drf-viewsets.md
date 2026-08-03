# DRF: ViewSets, Routers & Filtering

> Django | REST API & DRF | Pelajaran 10

## Tujuan Pembelajaran

- Menulis ModelViewSet: CRUD lengkap dalam satu class
- Membuat URL otomatis dengan DefaultRouter
- Menambahkan filtering, search & ordering
- Meng-override get_queryset untuk kontrol query

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

## Penjelasan

## ViewSet: CRUD dalam Satu Class
ModelViewSet menyediakan list, create, retrieve, update, partial_update, delete - TANPA menulis satu pun method. Konfigurasi: queryset + serializer_class. DefaultRouter menghasilkan URL-nya: /produk/ (list+create), /produk/{pk}/ (retrieve+update+delete). Ini jawaban DRF untuk "controller fat" - 80% endpoint CRUD tidak butuh kode baru, hanya konfigurasi.
## Filtering: Deklaratif, Bukan Manual
filter_backends + filterset_fields = ?kategori=1&tersedia=true otomatis. SearchFilter = ?search=kopi (icontains, bisa lintas field). OrderingFilter = ?ordering=-harga. Tanpa backend ini, filter manual = if di tiap view (banyak duplikasi). Django-filter memetakan query params ke QuerySet secara aman - validasi tipe bawaan.
## get_queryset: Titik Keamanan & Kustomisasi
Override get_queryset untuk: filter per-user (request.user), soft delete, filter harga custom, optimasi select_related. Di sinilah aturan "user hanya melihat datanya sendiri" DIPAKSA - bukan di serializer, bukan di frontend. Pola yang sama di semua track: query-level security.
## Router: URL yang Tidak Bisa Typo
DefaultRouter membaca aksi ViewSet dan membuat URL + nama route konsisten. Tambah aksi custom dengan @action (GET/POST /produk/terlaris/) tanpa merusak router. Browsable API + router = endpoint yang bisa dieksplorasi tanpa dokumentasi terpisah.

---

## Eksperimen

1. **ViewSet: CRUD dalam Satu Class**
2. **Filtering: Deklaratif, Bukan Manual**
3. **get_queryset: Titik Keamanan & Kustomisasi**
4. **Router: URL yang Tidak Bisa Typo**

---

## Tantangan

Perkuat API: (1) tambah aksi custom @action(detail=False) GET terlaris di ProdukViewSet (top 5 stok terbanyak), (2) tambah aksi @action(detail=True) POST /produk/<id>/tambah-stok/ yang menambah stok via serializer input, (3) aktifkan pagination custom: 5 per halaman + ?page_size override, (4) buat ReadOnlyModelViewSet untuk laporan (statistik per kategori) - hanya baca, tidak bisa write.

---

## Ringkasan

ViewSet = CRUD satu class. Router = URL otomatis. Filter/search/ordering deklaratif. get_queryset = gerbang keamanan. Lanjut: JWT & permissions.
