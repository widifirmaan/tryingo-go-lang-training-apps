# Background Tasks: Django Signals, Celery & Redis Message Broker

> **Kategori:** Django Web Framework | **Level:** Advanced | **Minggu 8:** Background Tasks: Django Signals, Celery & Redis Message Broker
> ⏱️ **Estimated Time:** 45 Minutes (15m theory, 30m practice) | 🔗 **Pace:** Structured (Step-by-step)


## Learning Objectives

- Understand Django internal Publish-Subscribe signals (`post_save`, `pre_delete`).
- Integrate Celery paired with Redis message brokers for asynchronous background workloads.
- Master `.delay()` and `.apply_async()` offloading intensive compute from the HTTP response loop.
- Implement fault-tolerant task retry policies and error handling in Celery workers.

---

## Program: Async Student Graduation PDF Certificate Generator with Signals & Celery Worker

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

## Key Concepts

Compute-intensive workflows (generating cryptographic PDF certificates, dispatching transactional email batches, transcoding uploaded media) must never execute synchronously within the HTTP request-response cycle. Doing so freezes client browsers and triggers 504 Gateway Timeouts.

### Django Signals
Django Signals facilitate decoupled event communication across disparate apps. Native signals like `post_save` broadcast automatically when models commit to storage. Dedicated receiver handlers listen for completion milestones reactively.

### Celery & Redis Task Architecture
**Celery** is Python's premier distributed task queue engine.
1. **Producer (Django View/Signal)**: Invokes `generate_completion_certificate_pdf.delay(student_id, course_id)`. This dispatches a compact JSON message to Redis within 2 milliseconds.
2. **Broker (Redis)**: Holds task queues in high-throughput in-memory structures.
3. **Worker (Celery Process)**: Autonomous background pods consuming tasks from Redis, rendering PDF binaries, and uploading artifacts to cloud object storage (AWS S3). Clients receive instantaneous HTTP responses.


---

---

## Beginner Friendly Explanation

Imagine ordering a tailored tuxedo at a tailor shop. The front clerk (Django View) records your measurements in two minutes and hands you a claim slip. The clerk does not force you to stand waiting at the counter for three days while the tuxedo is stitched. The ticket is placed on the workshop rack (Redis), and back-room tailors (Celery Workers) complete the garments calmly.

## Experiments

- Launch a local Celery worker process via `celery -A lms_project worker -l info`.
- Trigger a task via `.delay()` and observe the Celery worker terminal outputting execution logs.
- Configure Celery Beat to execute subscription expiration audits nightly at midnight.

---

## Challenge

Configure automated Celery task retries with exponential backoff: if cloud storage uploads fail due to network blips, retry up to 3 times.

---

## Visual Mental Model & Architecture Flow

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

## Syntax Reference & Practical Guide (W3Schools Style)

Here is the comprehensive breakdown of syntax signatures, parameters, return behavior, and isolated runnable examples introduced in this module:

### 1. `class Model(models.Model)`
- **Core Functionality:** Definisi entitas ORM database.
- **Parameters / Attributes:** `Field Types (CharField, IntegerField, ForeignKey)`.
- **System Behavior & Return:** Memetakan struktur tabel database langsung dari class Python dengan migrasi bawaan..
- **Practical Code Example:**
```python
from django.db import models
class Product(models.Model):
    name = models.CharField(max_length=200)
    price = models.DecimalField(max_digits=10, decimal_places=2)
    created_at = models.DateTimeField(auto_now_add=True)
```
- **Expected Execution Output:**
```output
Skema tabel Product siap dimigrasi ke database
```

### 2. `Product.objects.filter(price__gt=50000)`
- **Core Functionality:** ORM QuerySet Fluent API.
- **Parameters / Attributes:** `Field lookups (__gt, __icontains, __in)`.
- **System Behavior & Return:** Menyusun query SQL relasional berkinerja tinggi secara lazy tanpa menulis SQL mentah..
- **Practical Code Example:**
```python
cheap_products = Product.objects.filter(price__lte=100000).order_by('-created_at')[:5]
```
- **Expected Execution Output:**
```output
Mengembalikan 5 baris produk termurah
```

### 3. `def view(request): return render(request, 'home.html', ctx)`
- **Core Functionality:** View Handler berbasis fungsi/kelas.
- **Parameters / Attributes:** `HttpRequest, Template name, Context dict`.
- **System Behavior & Return:** Menerima permintaan pengguna, memproses data, dan mengembalikan HTML yang ter-render..
- **Practical Code Example:**
```python
from django.shortcuts import render
def home_view(request):
    items = Product.objects.all()
    return render(request, 'home.html', {'items': items})
```
- **Expected Execution Output:**
```output
Halaman web ter-render sempurna untuk pengguna
```

### 4. `path('products/<int:id>/', views.detail, name='product-detail')`
- **Core Functionality:** Pendaftaran URL Pattern terstruktur.
- **Parameters / Attributes:** `Route string, View function, Unique name`.
- **System Behavior & Return:** Menghubungkan pola URL yang diminta peramban ke fungsi view yang sesuai..
- **Practical Code Example:**
```python
from django.urls import path
from . import views
urlpatterns = [
    path('products/<int:id>/', views.detail, name='product-detail')
]
```
- **Expected Execution Output:**
```output
Rute /products/123 dipetakan ke views.detail
```

---

## Common Pitfalls & Debugging Tips

### 1. Unapplied Model Migrations
- **Symptom / Issue:** Triggers database errors: `ProgrammingError: relation does not exist`.
- **Root Cause:** Common mistaken assumptions during early development.
- **Fix / Best Practice:** Always run `python manage.py makemigrations` followed by `python manage.py migrate`.

### 2. N+1 Queries in Django ORM Templates
- **Symptom / Issue:** Templates trigger a separate SQL query per item rendered.
- **Root Cause:** Common mistaken assumptions during early development.
- **Fix / Best Practice:** Use `select_related()` for foreign keys and `prefetch_related()` for many-to-many.

### 3. Exposing Sensitive Secrets in Settings
- **Symptom / Issue:** Leaking SECRET_KEY or running `DEBUG = True` in production environments.
- **Root Cause:** Common mistaken assumptions during early development.
- **Fix / Best Practice:** Load secrets from environment variables and ensure `DEBUG = False` in production.

---

## Summary

You have mastered Django Signals, Celery background workers, and Redis broker. Next week we cover Caching and Security Hardening.
