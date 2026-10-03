# Distributed Caching, Security Hardening & Custom Middleware

> **Kategori:** Django Web Framework | **Level:** Advanced | **Minggu 9:** Distributed Caching, Security Hardening & Custom Middleware
> ⏱️ **Estimated Time:** 45 Minutes (15m theory, 30m practice) | 🔗 **Pace:** Structured (Step-by-step)


## Learning Objectives

- Configure the Django Cache Framework backed by distributed `django-redis`.
- Deploy Low-Level Cache APIs (`cache.get`, `cache.set`, `cache.delete`).
- Implement per-view caching utilizing the `@cache_page(60 * 15)` decorator.
- Author custom middleware auditing execution timings and enforcing security headers.

---

## Program: API Defense Middleware & Course Page Caching with Redis Backend

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

## Key Concepts

When thousands of students browse LMS portals simultaneously, relational database instances must not drown under repetitive queries for semi-static data (popular catalogs, syllabus blueprints). Maintaining peak throughput rests on **Distributed Caching** and **Custom Middleware**.

### Hierarchical Caching Tiers in Django
1. **Per-View Caching (`@cache_page`)**: Stores entire rendered HTML or JSON responses directly inside Redis, bypassing database hits entirely.
2. **Template Fragment Caching (`{% cache %}`)**: Selectively caches isolated blocks inside templates (such as static category sidebars).
3. **Low-Level Cache API (`cache.get / cache.set`)**: Offers surgical programmatic control over storing arbitrary Python structures in Redis paired with Time-To-Live (TTL) expiration.

### The Middleware Execution Pipeline
Middleware intercepts incoming HTTP requests prior to view execution and outgoing responses before delivery to browsers. Custom middleware enforces protective browser security headers (such as `X-Frame-Options: DENY` blocking Clickjacking) and instruments performance metrics.


---

---

## Beginner Friendly Explanation

Imagine a bulletin board at an academy entrance. Rather than each pupil knocking on the principal's office door to ask for daily schedules (hitting the database), the school posts the schedule on the front bulletin board (Redis Cache). And the front gate security officer (Middleware) verifies students wear verified uniform badges before entering.

## Experiments

- Invoke `get_popular_courses_cached()` twice and observe the second invocation triggering a clean `[CACHE HIT]`.
- Run `python manage.py check --deploy` to audit production security configurations.
- Audit HTTP response headers via cURL verifying the `X-Response-Time-Ms` diagnostic header is present.

---

## Challenge

Build a `post_save` model signal on Course that automatically calls `cache.delete("lms:popular_courses:v1")` whenever course details update.

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

You have mastered Redis Caching, Custom Middleware, and Security Hardening. Next week is our Final Capstone: Production-Ready Multi-Tenant Subscription LMS Platform!
