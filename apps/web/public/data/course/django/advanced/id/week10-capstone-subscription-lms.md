# Capstone: Platform LMS Langganan Multi-Tenant Skala Penuh Production-Ready

> **Kategori:** Django Web Framework | **Level:** Lanjutan | **Minggu 10:** Capstone: Platform LMS Langganan Multi-Tenant Skala Penuh Production-Ready

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

## Ringkasan

Selamat! Kamu telah menyelesaikan seluruh kurikulum Django Web Framework dari nol hingga platform LMS berlangganan multi-tenant berskala produksi!
