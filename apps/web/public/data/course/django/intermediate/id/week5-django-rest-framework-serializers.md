# Django REST Framework: Serializers, ModelViewSet & RESTful API

> **Kategori:** Django Web Framework | **Level:** Menengah | **Minggu 5:** Django REST Framework: Serializers, ModelViewSet & RESTful API
> ⏱️ **Estimasi Belajar:** 45 Menit (15m teori, 30m praktik) | 🔗 **Tingkat:** Terstruktur (Step-by-step)


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

## Ringkasan Sintaks & Quick Reference

| Perintah / Sintaks | Fungsi & Contoh Praktik |
| :--- | :--- |
| **Deklarasi & Inisialisasi** | Menyiapkan variabel, tipe data, atau struktur komponen awal |
| **Logika & Pemrosesan** | Menjalankan algoritma, kontrol alur, dan transformasi data |
| **Error Handling & Validasi** | Memastikan input valid dan menangani kegagalan sistem secara elegan |
| **Return / Output** | Mengembalikan hasil komputasi yang siap dikonsumsi pengguna/sistem |

---

## Jebakan Umum & Debugging (Common Pitfalls)

### 1. Lupa Menjalankan Migration setelah Mengubah Model
- **Gejala / Masalah:** Database tidak sinkron dengan kode Python, memicu error `ProgrammingError: relation does not exist`.
- **Penyebab Utama:** Logika atau asumsi yang sering keliru pada tahap awal implementasi.
- **Solusi Tepat:** Selalu jalankan `python manage.py makemigrations` lalu `python manage.py migrate`.

### 2. N+1 Query Problem di Django ORM
- **Gejala / Masalah:** Template me-render list dengan mengeksekusi query database berulang kali untuk setiap relasi.
- **Penyebab Utama:** Logika atau asumsi yang sering keliru pada tahap awal implementasi.
- **Solusi Tepat:** Gunakan `select_related()` untuk Foreign Key satu-ke-satu dan `prefetch_related()` untuk Many-to-Many.

### 3. Expose SECRET_KEY atau DEBUG=True di Produksi
- **Gejala / Masalah:** Informasi credential rentan dibobol dan halaman debug menampilkan variabel lingkungan.
- **Penyebab Utama:** Logika atau asumsi yang sering keliru pada tahap awal implementasi.
- **Solusi Tepat:** Simpan rahasia di environment variable dan pastikan `DEBUG = False` di lingkungan produksi.

---

## Ringkasan

Kamu telah menguasai DRF Serializers, ModelViewSet, dan DefaultRouter. Minggu depan kita mempelajari Autentikasi API dengan SimpleJWT dan Custom Permissions.
