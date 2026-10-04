# Tugas Latar Belakang: Django Signals, Celery & Redis Message Broker

> **Kategori:** Django Web Framework | **Level:** Lanjutan | **Minggu 8:** Tugas Latar Belakang: Django Signals, Celery & Redis Message Broker
> ⏱️ **Estimasi Belajar:** 45 Menit (15m teori, 30m praktik) | 🔗 **Tingkat:** Terstruktur (Step-by-step)


## Tujuan Pembelajaran

- Memahami pola Publish-Subscribe internal Django menggunakan Signals (`post_save`, `pre_delete`).
- Mengintegrasikan Celery dengan message broker Redis untuk tugas background asinkron.
- Memahami method `.delay()` dan `.apply_async()` untuk melepaskan beban pemrosesan berat dari request web.
- Menerapkan retry mechanism dan dead-letter handling pada tugas Celery yang gagal.

---

## Program: Generator Sertifikat PDF Kelulusan Siswa Asinkron dengan Sinyal & Celery Worker

```python
# Demonstrasi Celery Tasks & Django Signals (tasks.py & signals.py)
import time

# 1. Definisi Celery Task Asinkron (tasks.py)
# from celery import shared_task

# @shared_task(bind=True, max_retries=3, default_retry_delay=60)
def generate_completion_certificate_pdf(student_id: int, course_id: int) -> str:
    print(f"[CELERY WORKER START] Memulai komputasi pembuatan sertifikat PDF untuk Student #{student_id}...")
    
    # Simulasi proses rendering PDF yang memakan waktu CPU (misal: WeasyPrint / ReportLab selama 300ms)
    time.sleep(0.3)
    
    certificate_url = f"https://cdn.tryngo.io/certificates/cert_{student_id}_{course_id}.pdf"
    print(f"[CELERY WORKER SUCCESS] Sertifikat selesai! URL: {certificate_url}")
    return certificate_url

# 2. Django Signal: Memicu Task Begitu Siswa Menyelesaikan Seluruh Pelajaran (signals.py)
# from django.db.models.signals import post_save
# from django.dispatch import receiver
# from .models import StudentProgress

# @receiver(post_save, sender=StudentProgress)
def on_progress_updated(sender, student_id, course_id, is_completed, **kwargs):
    if is_completed:
        print(f"[DJANGO SIGNAL TRIGGERED] Siswa #{student_id} telah menuntaskan 100% materi kursus #{course_id}!")
        print(" -> Meneruskan tugas pembuatan sertifikat ke antrean Celery via Redis...")
        
        # Eksekusi secara asinkron (Non-blocking): generate_completion_certificate_pdf.delay(student_id, course_id)
        # HTTP response dikembalikan ke browser siswa dalam 5 milidetik!
        generate_completion_certificate_pdf(student_id, course_id)

# Simulasi Memicu Sinyal
on_progress_updated(None, student_id=8812, course_id=10, is_completed=True)
```

---

## Konsep Kunci

Operasi yang memakan waktu komputasi intensif (seperti menghasilkan file PDF bersertifikat digital, mengirim email massal, atau memproses kompresi video) tidak boleh dijalankan di dalam siklus request-response HTTP Django. Jika dijalankan langsung, koneksi browser pengguna akan macet dan server akan mengalami timeout.

### Django Signals
Django Signals memungkinkan komponen aplikasi yang berbeda saling berkomunikasi secara terlepas (decoupled). Sinyal bawaan seperti `post_save` dipancarkan secara otomatis setiap kali sebuah model disimpan ke database. Kita dapat mendaftarkan receiver function yang bereaksi terhadap perubahan status kelulusan siswa.

### Arsitektur Celery & Redis
**Celery** adalah distributed task queue standar industri untuk Python.
1. **Producer (Django View/Signal)**: Memanggil `generate_completion_certificate_pdf.delay(student_id, course_id)`. Panggilan ini hanya memakan waktu 2 milidetik untuk memasukkan pesan JSON ke dalam antrean Redis.
2. **Broker (Redis)**: Menyimpan antrean tugas secara persisten di memori.
3. **Worker (Celery Process)**: Proses terpisah di background yang mengambil tugas dari Redis, me-render file PDF, dan mengunggahnya ke cloud storage (AWS S3). Pengguna menerima respons web secara instan tanpa menunggu pembuatan PDF selesai.


---

---

## Penjelasan untuk Pemula

Bayangkan Anda memesan jas pengantin di penjahit pakaian. Kasir penjahit (Django View) menerima pesanan Anda dalam 2 menit dan memberikan Anda nomor nota. Kasir tidak langsung menjahit jas Anda di depan mata Anda sambil Anda disuruh menunggu berdiri selama 3 hari. Kasir meletakkan nota di meja ruang jahit (Redis), dan tim penjahit di ruang belakang (Celery Worker) yang menyelesaikannya secara tenang.

## Eksperimen

- Jalankan Celery worker di terminal menggunakan perintah `celery -A lms_project worker -l info`.
- Uji coba pemanggilan `.delay()` dan perhatikan bagaimana terminal Celery worker langsung mencetak log eksekusi.
- Konfigurasikan Celery Beat untuk menjalankan tugas pengecekan langganan kadaluarsa setiap tengah malam.

---

## Tantangan

Konfigurasikan task retry otomatis di Celery dengan Exponential Backoff: jika pengunggahan PDF ke cloud storage gagal karena masalah jaringan, coba ulang sebanyak 3 kali.

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
```output
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
```output
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
```output
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
```output
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

Kamu telah menguasai Django Signals, Celery background workers, dan Redis broker. Minggu depan kita mempelajari Caching dan Security Hardening.
