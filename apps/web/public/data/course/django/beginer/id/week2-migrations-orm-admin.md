# Migrations Engine, QuerySets & Kustomisasi Django Admin

> **Kategori:** Django Web Framework | **Level:** Pemula | **Minggu 2:** Migrations Engine, QuerySets & Kustomisasi Django Admin
> ⏱️ **Estimasi Belajar:** 45 Menit (15m teori, 30m praktik) | 🔗 **Tingkat:** Terstruktur (Step-by-step)


## Tujuan Pembelajaran

- Menguasai siklus hidup migrasi database Django (`makemigrations`, `migrate`, `showmigrations`).
- Menyesuaikan antarmuka visual Django Admin dengan `list_display`, `list_filter`, dan `search_fields`.
- Menggunakan `TabularInline` untuk mengedit relasi anak (Lessons) langsung di dalam form induk (Course).
- Membuat Bulk Actions kustom untuk mengubah status ratusan data secara atomik dengan satu klik.

---

## Program: Dashboard Administrasi Kursus Interaktif dengan Search, Filter & Bulk Actions

```python
# Demonstrasi Kustomisasi Django Admin (admin.py)
from django.contrib import admin
# from .models import Course, Lesson

class LessonInline(admin.TabularInline):
    # Memungkinkan penambahan/pengeditan materi pelajaran langsung di halaman kursus
    # model = Lesson
    extra = 1
    fields = ["order", "title", "video_url"]

class CourseAdmin(admin.ModelAdmin):
    list_display = ["title", "level", "price", "is_published", "lesson_count", "created_at"]
    list_filter = ["is_published", "level", "created_at"]
    search_fields = ["title", "description"]
    prepopulated_fields = {"slug": ("title",)}
    # inlines = [LessonInline]
    actions = ["publish_courses", "unpublish_courses"]

    # Custom Calculated Column
    @admin.display(description="Jumlah Pelajaran")
    def lesson_count(self, obj):
        # Dalam implementasi nyata: obj.lessons.count()
        return 12

    # Custom Bulk Action untuk Admin
    @admin.action(description="Publikasikan kursus terpilih ke publik")
    def publish_courses(self, request, queryset):
        updated = queryset.update(is_published=True)
        self.message_user(request, f"{updated} kursus berhasil dipublikasikan!")

    @admin.action(description="Tarik kursus terpilih dari publik (Draft)")
    def unpublish_courses(self, request, queryset):
        updated = queryset.update(is_published=False)
        self.message_user(request, f"{updated} kursus diubah kembali menjadi draf.")

# admin.site.register(Course, CourseAdmin)
print("=== DJANGO ADMIN DASHBOARD SIAP DENGAN INLINE EDITING & BULK ACTIONS ===")
```

---

## Konsep Kunci

Salah satu fitur yang membuat para founder startup dan CTO memilih Django adalah **Django Admin**. Tanpa perlu membangun antarmuka web khusus untuk staf operasional, Django menyediakan dashboard back-office kelas enterprise secara instan.

### Siklus Migrasi Database
Ketika model Python diubah, perintah `makemigrations` mendeteksi perbedaannya dan menulis skrip migrasi deklaratif. Perintah `migrate` kemudian mengeksekusinya ke PostgreSQL/MySQL. Django melacak riwayat migrasi di tabel `django_migrations`, menjamin tidak ada migrasi yang tertinggal saat deployment ke server produksi.

### Kekuatan Kustomisasi ModelAdmin
Dengan mendefinisikan kelas `CourseAdmin`, kita dapat mengubah dashboard bawaan menjadi alat manajemen yang sangat intuitif:
- `search_fields`: Menambahkan kotak pencarian cepat berbasis indeks SQL `LIKE / ILIKE`.
- `list_filter`: Menyediakan filter sidebar instan berdasarkan kategori status.
- `inlines`: Memungkinkan staf menambahkan materi pelajaran (`Lesson`) langsung di halaman pembuatan kursus tanpa berpindah-pindah menu.

### Efisiensi Bulk Actions
Fungsi `publish_courses` menggunakan method `queryset.update(is_published=True)`. Ini mengeksekusi satu perintah SQL tunggal (`UPDATE courses SET is_published = true WHERE id IN (...)`), bukan loop satu per satu, sehingga dapat memperbarui 10.000 data dalam beberapa milidetik.


---

---

## Penjelasan untuk Pemula

Bayangkan Anda baru membuka toko swalayan. Di framework lain, Anda harus membuat aplikasi kasir dan ruang komputer admin dari nol selama 3 bulan. Di Django, begitu Anda mendaftarkan daftar barang dagangan Anda, ruang kantor manajer lengkap dengan meja komputer, laporan stok, dan filter pencarian barang sudah otomatis tersedia dan siap pakai sejak hari pertama.

## Eksperimen

- Buat superuser baru dengan perintah `python manage.py createsuperuser` dan login ke `/admin`.
- Uji coba fitur Bulk Action `publish_courses` pada 3 kursus draf sekaligus di antarmuka admin.
- Gunakan `prepopulated_fields` dan amati bagaimana slug terisi otomatis saat Anda mengetik judul kursus di browser.

---

## Tantangan

Tambahkan aksi ekspor CSV kustom pada `CourseAdmin` yang mengunduh daftar kursus terpilih beserta total pendapatan siswa yang mendaftar.

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

Kamu telah menguasai Migrasi, QuerySet updates, dan Django Admin kustom. Minggu depan kita mempelajari Class-Based Views dan Template Engine.
