# Background Tasks: Django Signals, Celery & Redis Message Broker

> **Kategori:** Django Web Framework | **Level:** Advanced | **Minggu 8:** Background Tasks: Django Signals, Celery & Redis Message Broker

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

## Summary

You have mastered Django Signals, Celery background workers, and Redis broker. Next week we cover Caching and Security Hardening.
