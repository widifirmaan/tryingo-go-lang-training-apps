# Capstone: Blog API + Admin

> Django | Produksi & Capstone | Pelajaran 18

## Tujuan Pembelajaran

- Menggabungkan SEMUA konsep track dalam satu proyek
- Membuat API dengan JWT + ownership permissions
- Menjaga data per-user lewat perform_create & get_queryset
- Menutup proyek: test, README, deployment

---

## Program: Capstone: Blog API + Admin

```python
from rest_framework import viewsets
from rest_framework.permissions import IsAuthenticatedOrReadOnly

from ..models import Artikel
from ..permissions import IsOwnerOrReadOnly
from ..serializers import ArtikelSerializer


class ArtikelViewSet(viewsets.ModelViewSet):
    queryset = Artikel.objects.select_related('pemilik').all()
    serializer_class = ArtikelSerializer
    permission_classes = [IsAuthenticatedOrReadOnly, IsOwnerOrReadOnly]
    filterset_fields = ['status', 'pemilik']
    search_fields = ['judul', 'isi']
    ordering_fields = ['dibuat', 'diupdate', 'judul']

    def perform_create(self, serializer):
        # pemilik di-set dari request.user - TIDAK bisa dipalsukan client
        serializer.save(pemilik=self.request.user)

    def get_queryset(self):
        # Filter default: hanya terbit untuk pengunjung
        qs = super().get_queryset()
        user = self.request.user
        if not user.is_authenticated:
            qs = qs.filter(status='terbit')
        return qs
```

---

## Penjelasan

## Capstone: Semua Pelajaran Menjadi Satu Proyek
Blog API ini merangkum: models & migrations (Artikel + FK User) → admin (kelola cepat) → DRF serializers (JSON dua arah) → viewsets & routers (CRUD + URL otomatis) → JWT (login/refresh) → permissions (ownership) → filtering/search/pagination → testing (APITestCase) → siap production (settings + Docker dari pelajaran 15-17). Jika Anda bisa menjelaskan setiap file tanpa catatan, Anda menguasai track.
## Ownership: Keamanan di Tiga Lapis
1) perform_create: pemilik DIAMBIL dari request.user - client tidak bisa memalsukan. 2) get_queryset: pengunjung hanya melihat status='terbit'. 3) IsOwnerOrReadOnly (has_object_permission): hanya pemilik yang mengubah/menghapus objeknya. Tiga lapis independen - satu gagal, dua lainnya tetap melindungi. Pola yang sama di semua track: aturan di backend, bukan di UI.
## IsAuthenticatedOrReadOnly: API Publik yang Aman
Baca (GET) boleh tanpa login - untuk pengunjung/blog publik. Menulis butuh token. Kombinasi dengan IsOwnerOrReadOnly = pola REST API blog standar. JWT memberi identitas (request.user dari token), permissions memberi wewenang - dipasang berlapis, dievaluasi berurutan.
## Menutup Proyek Seperti Profesional
Yang membedakan lulusan bootcamp: (1) test yang menutup alur kritis (401 tanpa token, pemilik otomatis, 403 non-pemilik), (2) README: cara run, env, endpoint, contoh curl, (3) deployment (Render/Railway/Fly + PostgreSQL + Redis), (4) pipeline CI. Satu proyek selesai dan ter-deploy > lima proyek setengah jadi.

---

## Eksperimen

1. **Capstone: Semua Pelajaran Menjadi Satu Proyek**
2. **Ownership: Keamanan di Tiga Lapis**
3. **IsAuthenticatedOrReadOnly: API Publik yang Aman**
4. **Menutup Proyek Seperti Profesional**

---

## Tantangan

Bawa capstone ke level produksi: (1) tambah endpoint /api/artikel/statistik (custom action) dengan jumlah per status, (2) tambah komentar: model Komentar (artikel FK, isi, penulis, dibuat) + serializer + endpoint CRUD dengan permission yang sama, (3) tulis 5 test tambahan: komentar non-pemilik ditolak, filter status, search judul, pagination, refresh token berhasil, (4) deploy ke platform gratis (Render/Railway + PostgreSQL + Redis) dan bagikan URL-nya.

---

## Ringkasan

Capstone merangkum: models → admin → DRF → JWT → permissions → test. Ownership 3 lapis. API publik yang aman. Anda siap Django!
