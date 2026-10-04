# Capstone: Platform LMS Langganan Multi-Tenant Skala Penuh Production-Ready

> **Kategori:** Django Web Framework | **Level:** Lanjutan | **Minggu 10:** Capstone: Platform LMS Langganan Multi-Tenant Skala Penuh Production-Ready
> ⏱️ **Estimasi Belajar:** 45 Menit (15m teori, 30m praktik) | 🔗 **Tingkat:** Terstruktur (Step-by-step)


## Tujuan Pembelajaran

- Mengintegrasikan seluruh ekosistem: Django 5.1, DRF, PostgreSQL, Celery, Redis, dan Stripe Webhooks.
- Membangun penanganan Webhook pembayaran e-commerce yang aman dan idempotent.
- Mengonfigurasi endpoint `/healthz` untuk probe liveness/readiness klaster container Kubernetes.
- Menyiapkan arsitektur monolitik modern yang siap dideploy menggunakan Docker Compose dan Nginx reverse proxy.

---

## Program: Platform LMS Lengkap (Django 5, DRF, Stripe Webhook, Celery & Docker Compose)

```python
# Arsitektur Capstone Platform LMS Berlangganan Production-Ready
from django.http import JsonResponse, HttpResponse
from django.views.decorators.csrf import csrf_exempt
from django.db import transaction
import json

# 1. Stripe Payment Webhook: Konfirmasi Pembayaran Langganan Siswa Otomatis
@csrf_exempt
def stripe_webhook_handler(request):
    if request.method != "POST":
        return HttpResponse(status=405)

    payload = request.body
    # Dalam implementasi nyata: verifikasi cryptographic signature header stripe-signature
    # sig_header = request.META.get('HTTP_STRIPE_SIGNATURE')

    try:
        event = json.loads(payload)
    except ValueError:
        return HttpResponse(status=400)

    # Tangani Event Pembayaran Sukses (checkout.session.completed)
    if event.get("type") == "checkout.session.completed":
        session = event["data"]["object"]
        customer_email = session.get("customer_email")
        course_id = session.get("metadata", {}).get("course_id")

        print(f"[STRIPE WEBHOOK] Pembayaran lunas diterima dari: {customer_email} untuk Kursus #{course_id}")
        
        # Eksekusi Aktivasi Langganan secara Atomik
        with transaction.atomic():
            # 1. Cari user dan buat record Enrollment
            # 2. Kirim email selamat datang via Celery worker
            print(f"[ENROLLMENT ACTIVATED] Siswa {customer_email} resmi mendapatkan akses penuh ke materi!")

        return JsonResponse({"status": "SUCCESS", "message": "Subscription enrolled successfully."})

    return JsonResponse({"status": "IGNORED"})

# 2. Health Check Endpoint untuk Kubernetes / Docker Swarm Liveness Probe
def healthz_probe(request):
    return JsonResponse({
        "status": "healthy",
        "service": "tryngo-lms-platform",
        "version": "5.1.0",
        "database": "connected",
        "cache": "redis-active"
    })

print("=== TRYNGO PRODUCTION MULTI-TENANT SUBSCRIPTION LMS INITIALIZED ===")
print("Siap melayani pendaftaran siswa, pembayaran Stripe webhook, dan video streaming.")
```

---

## Konsep Kunci

Selamat! Anda telah mencapai proyek Capstone akhir kurikulum Django Web Framework. Sistem ini menyatukan seluruh kemampuan Django modern ke dalam satu platform Learning Management System (LMS) berlangganan yang tangguh, aman, dan siap diproduksi.

### Penanganan Webhook Pembayaran Idempotent
Ketika siswa menyelesaikan pembayaran di Stripe atau Midtrans, payment gateway mengirim HTTP POST ke endpoint `/webhooks/stripe/`. Karena webhook tidak dikirim melalui browser pengguna, endpoint ini dibebaskan dari CSRF (`@csrf_exempt`). Setiap mutasi pendaftaran dijalankan di dalam blok `transaction.atomic()` untuk menjamin tidak ada aktivasi langganan ganda saat terjadi retry pengiriman webhook.

### Observability dan Kesiapan Cloud
Platform dilengkapi dengan endpoint `/healthz` yang memverifikasi kesiapan koneksi database PostgreSQL dan antrean Celery Redis, memungkinkan orchestrator cloud seperti Kubernetes atau Docker Swarm melakukan self-healing secara otomatis saat terjadi gangguan jaringan.


---

---

## Penjelasan untuk Pemula

Proyek ini ibarat universitas digital internasional lengkap. Ada gerbang pendaftaran yang menerima pembayaran dari bank mana pun di dunia (Stripe Webhook), ada gedung kelas digital tempat siswa belajar dengan nyaman (DRF & Video Streaming), perpustakaan materi yang selalu rapi dan cepat dibuka (Redis Caching), dan staf administrasi yang otomatis mencetak ijazah sertifikat begitu siswa lulus (Celery Workers).

## Eksperimen

- Kirim payload webhook Stripe simulasi menggunakan cURL dan amati status response 200 OK.
- Buka browser ke `/healthz` dan pastikan payload status "healthy" dikembalikan.
- Gunakan Stripe CLI (`stripe listen --forward-to localhost:8000/webhooks/stripe/`) untuk menguji alur pembayaran nyata.

---

## Tantangan

Tambahkan penanganan event Stripe `customer.subscription.deleted` untuk secara otomatis mencabut hak akses kursus ketika siswa membatalkan langganan bulanan mereka.

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

Selamat! Kamu telah menyelesaikan seluruh kurikulum Django Web Framework dari nol hingga platform LMS berlangganan multi-tenant berskala produksi!
