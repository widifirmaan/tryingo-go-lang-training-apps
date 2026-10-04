# Caching Terdistribusi, Security Hardening & Custom Middleware

> **Kategori:** Django Web Framework | **Level:** Lanjutan | **Minggu 9:** Caching Terdistribusi, Security Hardening & Custom Middleware
> ⏱️ **Estimasi Belajar:** 45 Menit (15m teori, 30m praktik) | 🔗 **Tingkat:** Terstruktur (Step-by-step)


## Tujuan Pembelajaran

- Mengonfigurasi Django Cache Framework dengan backend terdistribusi `django-redis`.
- Menggunakan Low-Level Cache API (`cache.get`, `cache.set`, `cache.delete`).
- Menerapkan per-view caching menggunakan decorator `@cache_page(60 * 15)`.
- Membangun Custom Middleware untuk audit durasi eksekusi request dan penegakan security headers.

---

## Program: Middleware Pelindung API & Caching Halaman Kursus dengan Redis Backend

```python
# Demonstrasi Django Caching & Custom Middleware
import time
from django.core.cache import cache
from django.views.decorators.cache import cache_page

# 1. Custom Security & Timing Middleware
class RequestTimingAndSecurityMiddleware:
    def __init__(self, get_response):
        self.get_response = get_response

    def __call__(self, request):
        start_time = time.perf_counter()

        # Eksekusi request ke view downstream
        response = self.get_response(request)

        # Hitung waktu eksekusi
        elapsed_ms = (time.perf_counter() - start_time) * 1000
        response["X-Response-Time-Ms"] = f"{elapsed_ms:.2f}"

        # Terapkan Security Headers
        response["X-Content-Type-Options"] = "nosniff"
        response["X-Frame-Options"] = "DENY"
        response["Referrer-Policy"] = "strict-origin-when-cross-origin"

        return response

# 2. Low-Level Caching API dengan Redis
def get_popular_courses_cached():
    cache_key = "lms:popular_courses:v1"
    
    # 1. Periksa apakah data ada di Redis Cache
    popular_courses = cache.get(cache_key)
    if popular_courses is not None:
        print("[CACHE HIT] Mengembalikan daftar kursus populer dari Redis Cache!")
        return popular_courses

    # 2. Cache Miss: Kueri dari Database PostgreSQL
    print("[CACHE MISS] Menghitung agregasi kursus terpopuler dari PostgreSQL...")
    popular_courses = [
        {"id": 1, "title": "Full-Stack React & Django Mastery", "students": 1250},
        {"id": 2, "title": "Rust System Programming from Scratch", "students": 890}
    ]

    # Simpan ke Redis dengan TTL 15 Menit (900 Detik)
    cache.set(cache_key, popular_courses, timeout=900)
    return popular_courses

# Demonstrasi Eksekusi
courses = get_popular_courses_cached()
print("Data Kursus:", courses)
```

---

## Konsep Kunci

Ketika ribuan siswa mengakses platform LMS Anda secara bersamaan, database PostgreSQL tidak boleh dibebani dengan kueri data yang jarang berubah (seperti daftar kursus terpopuler atau kurikulum statis). Dua instrumen vital untuk menjaga performa adalah **Caching** dan **Custom Middleware**.

### Tingkatan Caching di Django
1. **Per-View Caching (`@cache_page`)**: Menyimpan seluruh HTML atau JSON respons suatu view di memori Redis. Seluruh komputasi database dilewati secara total.
2. **Template Fragment Caching (`{% cache %}`)**: Meng-cache hanya blok HTML tertentu di dalam template (misal sidebar daftar kategori).
3. **Low-Level Cache API (`cache.get / cache.set`)**: Memberikan kontrol granular untuk menyimpan data objek Python arbitrer ke dalam Redis dengan durasi Time-To-Live (TTL).

### Peran Middleware Pipeline
Middleware adalah rantai komponen yang mencegat setiap HTTP request sebelum mencapai View dan setiap HTTP response sebelum dikirimkan ke browser. Dengan custom middleware, kita dapat menyuntikkan header keamanan browser (seperti `X-Frame-Options: DENY` untuk mencegah Clickjacking) dan memantau waktu respons server (SLA).


---

---

## Penjelasan untuk Pemula

Bayangkan papan pengumuman jadwal pelajaran di lobi sekolah. Daripada setiap siswa harus mengetuk pintu ruang kepala sekolah untuk bertanya jadwal hari ini (menghantam database), sekolah menempelkan jadwal tersebut di papan pengumuman lobi (Redis Cache). Dan satpam di gerbang sekolah (Middleware) selalu memeriksa apakah setiap siswa memakai seragam lengkap sebelum diizinkan masuk.

## Eksperimen

- Panggil fungsi `get_popular_courses_cached()` dua kali dan amati panggilan kedua langsung menghasilkan pesan `[CACHE HIT]`.
- Gunakan perintah `python manage.py check --deploy` untuk memeriksa audit keamanan pengaturan produksi Django.
- Periksa header HTTP menggunakan cURL dan buktikan header `X-Response-Time-Ms` tercetak dengan benar.

---

## Tantangan

Buat sinyal `post_save` pada model Course yang secara otomatis memanggil `cache.delete("lms:popular_courses:v1")` setiap kali data kursus diubah oleh admin.

---

## Model Mental & Diagram Alur Visual

```diagram
┌──────────────────────────────────────────────────────────┐
│ ARSITEKTUR MODEL-TEMPLATE-VIEW (MTV) DJANGO              │
│                                                          │
│ Browser Request ──► urls.py (URL Router)                 │
│                            │                             │
│                            ▼                             │
│                       views.py (Logika Bisnis)           │
│                         │         │                      │
│             Query DB    ▼         ▼   Render HTML        │
│        models.py (ORM) ◄           ► templates/*.html    │
│               │                            │             │
│               ▼                            ▼             │
│          Database Relasional           HTTP Response     │
└──────────────────────────────────────────────────────────┘
```

---

## Panduan Sintaks & Referensi Lengkap (W3Schools Style)

Berikut adalah rincian sintaks, parameter, nilai kembalian, dan contoh penggunaan praktis yang diperkenalkan pada modul ini:

### 1. `class Model(models.Model)`
- **Fungsi Utama:** Definisi entitas ORM database.
- **Parameter / Atribut:** `Field Types (CharField, IntegerField, ForeignKey)`.
- **Perilaku & Efek Sistem:** Memetakan struktur tabel database langsung dari class Python dengan migrasi bawaan..
- **Contoh Penggunaan Praktis:**
```python
from django.db import models
class Product(models.Model):
    name = models.CharField(max_length=200)
    price = models.DecimalField(max_digits=10, decimal_places=2)
    created_at = models.DateTimeField(auto_now_add=True)
```
- **Hasil Output yang Diharapkan:**
```text
Skema tabel Product siap dimigrasi ke database
```

### 2. `Product.objects.filter(price__gt=50000)`
- **Fungsi Utama:** ORM QuerySet Fluent API.
- **Parameter / Atribut:** `Field lookups (__gt, __icontains, __in)`.
- **Perilaku & Efek Sistem:** Menyusun query SQL relasional berkinerja tinggi secara lazy tanpa menulis SQL mentah..
- **Contoh Penggunaan Praktis:**
```python
cheap_products = Product.objects.filter(price__lte=100000).order_by('-created_at')[:5]
```
- **Hasil Output yang Diharapkan:**
```text
Mengembalikan 5 baris produk termurah
```

### 3. `def view(request): return render(request, 'home.html', ctx)`
- **Fungsi Utama:** View Handler berbasis fungsi/kelas.
- **Parameter / Atribut:** `HttpRequest, Template name, Context dict`.
- **Perilaku & Efek Sistem:** Menerima permintaan pengguna, memproses data, dan mengembalikan HTML yang ter-render..
- **Contoh Penggunaan Praktis:**
```python
from django.shortcuts import render
def home_view(request):
    items = Product.objects.all()
    return render(request, 'home.html', {'items': items})
```
- **Hasil Output yang Diharapkan:**
```text
Halaman web ter-render sempurna untuk pengguna
```

### 4. `path('products/<int:id>/', views.detail, name='product-detail')`
- **Fungsi Utama:** Pendaftaran URL Pattern terstruktur.
- **Parameter / Atribut:** `Route string, View function, Unique name`.
- **Perilaku & Efek Sistem:** Menghubungkan pola URL yang diminta peramban ke fungsi view yang sesuai..
- **Contoh Penggunaan Praktis:**
```python
from django.urls import path
from . import views
urlpatterns = [
    path('products/<int:id>/', views.detail, name='product-detail')
]
```
- **Hasil Output yang Diharapkan:**
```text
Rute /products/123 dipetakan ke views.detail
```

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

Kamu telah menguasai Redis Caching, Custom Middleware, dan Security Hardening. Minggu depan adalah Capstone Final: Multi-Tenant Subscription LMS Platform Production-Ready!
