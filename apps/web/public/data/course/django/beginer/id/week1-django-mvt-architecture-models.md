# Arsitektur MVT Django 5.1, Settings & Deklarasi Model Domain

> **Kategori:** Django Web Framework | **Level:** Pemula | **Minggu 1:** Arsitektur MVT Django 5.1, Settings & Deklarasi Model Domain
> ⏱️ **Estimasi Belajar:** 45 Menit (15m teori, 30m praktik) | 🔗 **Tingkat:** Terstruktur (Step-by-step)


## Tujuan Pembelajaran

- Memahami filosofi "Batteries-Included" dan arsitektur Model-View-Template (MVT) Django.
- Mendefinisikan entitas database menggunakan `models.Model`, `CharField`, `DecimalField`, dan `TextChoices`.
- Mengonfigurasi relasi antar tabel dengan `models.ForeignKey` dan `related_name`.
- Mengotomatisasi pembuatan slug URL SEO-friendly melalui override method `save()`.

---

## Program: Domain Model Kursus & Pelajaran LMS dengan Django ORM

```python
# Demonstrasi Model Domain LMS (models.py)
from django.db import models
from django.utils.text import slugify
from django.core.validators import MinValueValidator

class CourseLevel(models.TextChoices):
    BEGINNER = "BEGINNER", "Pemula"
    INTERMEDIATE = "INTERMEDIATE", "Menengah"
    ADVANCED = "ADVANCED", "Lanjutan"

class Course(models.Model):
    title = models.CharField(max_length=200, help_text="Judul lengkap kursus")
    slug = models.SlugField(max_length=220, unique=True, blank=True)
    description = models.TextField()
    price = models.DecimalField(
        max_digits=10, 
        decimal_places=2, 
        validators=[MinValueValidator(0.00)]
    )
    level = models.CharField(
        max_length=20, 
        choices=CourseLevel.choices, 
        default=CourseLevel.BEGINNER
    )
    is_published = models.BooleanField(default=False)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ["-created_at"]
        verbose_name = "Kursus"
        verbose_name_plural = "Daftar Kursus"

    def save(self, *args, **kwargs):
        if not self.slug:
            self.slug = slugify(self.title)
        super().save(*args, **kwargs)

    def __str__(self):
        return f"{self.title} ({self.get_level_display()})"

class Lesson(models.Model):
    course = models.ForeignKey(Course, on_delete=models.CASCADE, related_name="lessons")
    title = models.CharField(max_length=200)
    video_url = models.URLField(blank=True)
    content = models.TextField(help_text="Materi markdown pelajaran")
    order = models.PositiveIntegerField(default=1)

    class Meta:
        ordering = ["order"]
        unique_together = ["course", "order"]

    def __str__(self):
        return f"{self.course.title} - #{self.order}: {self.title}"

print("=== DJANGO LMS MODELS TERDEFINISI DENGAN VALIDASI & CHOICES ===")
```

---

## Konsep Kunci

Django adalah framework web Python paling matang dan produktif di dunia, terkenal dengan filosofi **"Batteries-Included"** (semuanya sudah tersedia bawaan: ORM, migrasi, admin dashboard, autentikasi, proteksi CSRF).

### Arsitektur MVT (Model-View-Template)
- **Model**: Mendefinisikan struktur data dan aturan bisnis yang dipetakan langsung ke tabel database relasional.
- **View**: Memproses logika bisnis, mengambil data dari model, dan menentukan data apa yang akan dikirim ke client.
- **Template**: Mengatur bagaimana antarmuka HTML ditampilkan kepada pengguna.

### Django ORM dan TextChoices
Alih-alih menulis kode SQL mentah yang rentan terhadap SQL Injection, kita mendeklarasikan model dalam bentuk kelas Python. Fitur `models.TextChoices` memungkinkan pendefinisian enum yang aman dan otomatis menyediakan method pembantu seperti `course.get_level_display()` untuk menampilkan label yang ramah pengguna.

### Integritas Relasi Database
Dengan menentukan `models.ForeignKey(Course, on_delete=models.CASCADE, related_name="lessons")`, Django secara otomatis membuat batasan foreign key di PostgreSQL. Jika sebuah kursus dihapus, seluruh pelajaran (`Lesson`) di dalamnya otomatis ikut terhapus dengan aman (Cascade Delete).


---

---

## Penjelasan untuk Pemula

Bayangkan Anda membangun sekolah fisik. Django seperti paket gedung sekolah siap pakai lengkap dengan meja, kursi, brankas guru, dan gerbang keamanan (Batteries-Included). Kelas Course dan Lesson adalah formulir buku induk siswa yang otomatis dicetak rapi ke dalam lemari arsip baja (Database) tanpa Anda perlu merakit lemarinya sendiri.

## Eksperimen

- Jalankan perintah `python manage.py makemigrations` dan amati file SQL migration yang digenerate Django.
- Buat objek kursus baru di shell Django (`python manage.py shell`) dan buktikan slug otomatis terisi dari title.
- Coba tambahkan dua Lesson dengan nomor `order` yang sama pada satu kursus dan amati validasi `unique_together`.

---

## Tantangan

Tambahkan model `Enrollment` yang menghubungkan `User` dengan `Course`, mencakup tanggal pendaftaran dan status pembayaran (PENDING, PAID, CANCELLED).

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

Kamu telah menguasai arsitektur MVT Django, Model ORM, dan relasi ForeignKey. Minggu depan kita mempelajari Migrations Engine dan kustomisasi Django Admin.
