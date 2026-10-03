# Django REST Framework: Serializers, ModelViewSet & RESTful API

> **Kategori:** Django Web Framework | **Level:** Menengah | **Minggu 5:** Django REST Framework: Serializers, ModelViewSet & RESTful API

## Tujuan Pembelajaran

- Memahami peran Django REST Framework (DRF) dalam memisahkan backend API dari frontend.
- Menggunakan `ModelSerializer` untuk serialisasi data model menjadi format JSON dan sebaliknya (deserialisasi).
- Menggunakan `ModelViewSet` untuk menyediakan endpoint CRUD standar (RESTful) dengan nol boilerplate.
- Menambahkan custom route actions menggunakan decorator `@action(detail=True)`.

---

## Program: RESTful API Modul Kursus & Pelajaran dengan ModelSerializer & ViewSets

```python
# Demonstrasi Django REST Framework (DRF)
# pip install djangorestframework

from rest_framework import serializers, viewsets, routers
from rest_framework.response import Response
from rest_framework.decorators import action
# from .models import Course, Lesson

# 1. Nested Serializer untuk Data Relasional Pelajaran
class LessonSerializer(serializers.ModelSerializer):
    class Meta:
        # model = Lesson
        fields = ["id", "order", "title", "video_url"]

# 2. ModelSerializer Kursus dengan Nested Lessons & Computed Fields
class CourseDetailSerializer(serializers.ModelSerializer):
    # Menyertakan array pelajaran di dalam respons kursus (Nested Relationship)
    lessons = LessonSerializer(many=True, read_only=True)
    level_label = serializers.CharField(source="get_level_display", read_only=True)
    is_free = serializers.SerializerMethodField()

    class Meta:
        # model = Course
        fields = ["id", "title", "slug", "description", "price", "level", "level_label", "is_free", "lessons"]

    def get_is_free(self, obj) -> bool:
        return obj.price == 0

# 3. ModelViewSet: Menyediakan CRUD Lengkap Otomatis (GET, POST, PUT, DELETE)
class CourseViewSet(viewsets.ModelViewSet):
    # queryset = Course.objects.filter(is_published=True).prefetch_related("lessons")
    serializer_class = CourseDetailSerializer
    lookup_field = "slug"

    # Custom Action Endpoint: GET /api/v1/courses/{slug}/stats/
    @action(detail=True, methods=["get"])
    def stats(self, request, slug=None):
        return Response({
            "status": "success",
            "enrolled_students": 420,
            "completion_rate": "87.5%"
        })

# 4. Registrasi Router Otomatis
router = routers.DefaultRouter()
# router.register(r'courses', CourseViewSet, basename='course')

print("=== DJANGO REST FRAMEWORK MODELVIEWSET & SERIALIZERS TERKONFIGURASI ===")
```

---

## Konsep Kunci

Ketika aplikasi web LMS Anda membutuhkan aplikasi mobile iOS/Android atau frontend modern seperti React / Vue / Next.js, Anda membutuhkan API RESTful berstandar tinggi. **Django REST Framework (DRF)** adalah toolkit standar emas di ekosistem Python.

### Peran Serializer di DRF
Serializer bertindak seperti penerjemah dua arah:
1. **Serialisasi**: Mengonversi objek query database Django (QuerySets) menjadi format data primitif Python yang dapat di-render menjadi JSON.
2. **Deserialisasi & Validasi**: Memeriksa payload JSON yang dikirimkan client melalui request POST/PUT, memvalidasi aturan tipe data, dan mengubahnya menjadi objek model database yang siap disimpan.

### Keajaiban ModelViewSet dan Routers
Daripada menulis 5 view controller terpisah untuk list, create, retrieve, update, dan destroy, `ModelViewSet` menyediakan seluruh operasi CRUD tersebut secara otomatis. Dikombinasikan dengan `DefaultRouter()`, DRF menghasilkan seluruh pola URL RESTful (`/api/v1/courses/`, `/api/v1/courses/{slug}/`) lengkap dengan dokumentasi web browsing yang interaktif (Browsable API).


---

---

## Penjelasan untuk Pemula

Bayangkan restoran siap saji yang ingin membuka layanan pesan-antar lewat aplikasi ojek online (Mobile App). Django Templates seperti pengunjung yang makan langsung di meja restoran. DRF Serializer seperti petugas bagian pengepakan yang membungkus makanan ke dalam kotak boks rapi berlabel barcode (JSON) agar kurir ojek online bisa mengantarkannya ke mana saja.

## Eksperimen

- Buka endpoint `/api/v1/courses/` di browser dan amati antarmuka grafis DRF Browsable API.
- Kirim request GET dengan header `Accept: application/json` menggunakan cURL dan amati output JSON murni.
- Gunakan `SerializerMethodField` untuk menghitung durasi total seluruh pelajaran dalam menit secara dinamis.

---

## Tantangan

Tambahkan nested writable serializer sehingga instruktur dapat membuat kursus baru sekaligus menyertakan 3 materi pelajaran awal dalam satu request POST.

---

## Ringkasan

Kamu telah menguasai DRF Serializers, ModelViewSet, dan DefaultRouter. Minggu depan kita mempelajari Autentikasi API dengan SimpleJWT dan Custom Permissions.
