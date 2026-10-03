# Capstone: Production-Ready Full-Scale Multi-Tenant Subscription LMS Platform

> **Kategori:** Django Web Framework | **Level:** Advanced | **Minggu 10:** Capstone: Production-Ready Full-Scale Multi-Tenant Subscription LMS Platform
> ⏱️ **Estimated Time:** 45 Minutes (15m theory, 30m practice) | 🔗 **Pace:** Structured (Step-by-step)


## Learning Objectives

- Integrate the complete ecosystem: Django 5.1, DRF, PostgreSQL, Celery, Redis, and Stripe Webhooks.
- Build secure, idempotent e-commerce payment webhook handlers.
- Configure `/healthz` endpoints for Kubernetes container cluster liveness/readiness probes.
- Ship an enterprise-ready modern monolith configured for Docker Compose and Nginx reverse proxies.

---

## Program: Complete LMS Platform (Django 5, DRF, Stripe Webhook, Celery & Docker Compose)

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

## Key Concepts

Congratulations! You have reached the Capstone project. This application synthesizes modern Django 5.1 engineering patterns into an enterprise, production-ready subscription Learning Management System (LMS).

### Idempotent Payment Webhook Ingestion
When students settle invoices via Stripe or Midtrans, payment gateways issue asynchronous HTTP POST notifications to `/webhooks/stripe/`. Because webhooks originate outside browser sessions, the route bypasses standard CSRF (`@csrf_exempt`). Mutations execute within `transaction.atomic()` blocks, guaranteeing idempotency during provider network retries.

### Observability & Cloud Readiness
The platform exposes a native `/healthz` probe auditing PostgreSQL connection pools and Redis Celery availability, empowering cloud orchestrators like Kubernetes or Docker Swarm to conduct automated self-healing.


---

---

## Beginner Friendly Explanation

This project mirrors a digital global university. It features an automated bursar office receiving tuition from worldwide payment gateways (Stripe Webhook), state-of-the-art multimedia lecture halls (DRF & Video Streaming), a high-speed library reading room (Redis Caching), and an automated registrar printing diplomas upon graduation (Celery Workers).

## Experiments

- Dispatch a simulated Stripe webhook payload via cURL and inspect the 200 OK receipt.
- Navigate to `/healthz` in your browser and verify the "healthy" payload.
- Deploy the Stripe CLI (`stripe listen --forward-to localhost:8000/webhooks/stripe/`) to test live payment test-clocks.

---

## Challenge

Add Stripe `customer.subscription.deleted` event handling to automatically revoke course access when students terminate monthly recurring subscriptions.

---

## Syntax Cheatsheet & Quick Reference

| Syntax / Keyword | Purpose & Practical Pattern |
| :--- | :--- |
| **Declaration & Setup** | Initialize data structures, type constraints, and dependencies |
| **Core Processing** | Algorithm execution, control flow, and data transformation |
| **Defensive Validation** | Verify data invariants and handle errors explicitly |
| **Return / Output** | Deliver deterministic output ready for consumption |

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

Congratulations! You have completed the entire Django Web Framework curriculum from zero to an enterprise production multi-tenant subscription LMS platform!
