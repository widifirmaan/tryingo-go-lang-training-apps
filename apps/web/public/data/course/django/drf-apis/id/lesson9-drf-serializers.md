# DRF: Serializers & APIView

> Django | REST API & DRF | Pelajaran 9

## Tujuan Pembelajaran

- Memasang dan mengonfigurasi Django REST Framework
- Menulis ModelSerializer dan validasi custom
- Menulis APIView: GET list, POST create, GET/PUT/DELETE detail
- Memakai browsable API DRF untuk eksplorasi

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

## Penjelasan

## Kenapa DRF: Serializer = DTO + Form dalam Satu
Serializer mengubah model → JSON (keluar) dan JSON → model (masuk), plus validasi - persis DTO + ValidationPipe di NestJS. ModelSerializer menurunkan field dan validasi dari model: satu definisi, konsisten dengan database. serializer.save() menulis ke DB; banyak = many=True. Dua arah: ProdukSerializer(data=request.data) untuk input, serializer.data untuk output.
## APIView: Empat Method, Satu Fungsi
@api_view(['GET','POST']) membuat view yang menangani method HTTP: GET = baca, POST = buat (201), PUT = ganti penuh, DELETE = hapus (204). Response(serializer.data) mengembalikan JSON; serializer.errors → 400 dengan detail field mana yang gagal. Pola ini setara route + controller di Express/Nest - tapi validasi dan serialisasi otomatis.
## Browsable API: Dokumentasi Hidup
Buka /api/produk/ di browser → DRF merender UI interaktif: form isian, tombol method, detail response. Ini "Swagger-nya DRF" yang lahir gratis. Frontend dev bisa uji endpoint tanpa Postman; explorer bisa membaca kontrak API dari browser. Dokumentasi tidak pernah basi karena lahir dari serializer.
## API vs Template: Dua Wajah Django
View template mengembalikan HTML (render); APIView mengembalikan JSON (Response). Aplikasi nyata memakai KEDUANYA: halaman admin/template untuk internal, API untuk frontend/mobile. Pisahkan routing-nya (/ vs /api/) dan mulailah API-first seperti riset 2026: banyak perusahaan Django memakai DRF sebagai backend utama.

---

## Eksperimen

1. **Kenapa DRF: Serializer = DTO + Form dalam Satu**
2. **APIView: Empat Method, Satu Fungsi**
3. **Browsable API: Dokumentasi Hidup**
4. **API vs Template: Dua Wajah Django**

---

## Tantangan

Perluas API: (1) tambah serializer Ulasan (produk FK + isi + bintang + penulis) dan endpoint GET/POST /api/produk/<id>/ulasan/, (2) tambah query param ?stok_min= di produk_list (filter sebelum serializer), (3) tambah endpoint GET /api/statistik/ mengembalikan aggregasi (jumlah produk, rata-rata harga) via Response, (4) buat serializer nested: produk dengan daftar ulasannya (UlasanSerializer many=True).

---

## Ringkasan

Serializer = DTO + form + validasi. APIView = 4 method satu view. Browsable API = docs hidup. JSON untuk frontend. Lanjut: viewsets & routers.
