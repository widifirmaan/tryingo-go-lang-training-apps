# API Security: Stateless JWT (SimpleJWT) & Custom Permissions

> **Kategori:** Django Web Framework | **Level:** Intermediate | **Minggu 6:** API Security: Stateless JWT (SimpleJWT) & Custom Permissions
> ⏱️ **Estimated Time:** 45 Minutes (15m theory, 30m practice) | 🔗 **Pace:** Structured (Step-by-step)


## Learning Objectives

- Configure stateless authentication with JSON Web Tokens via `djangorestframework-simplejwt`.
- Understand short-lived Access Tokens (15 min) and long-lived Refresh Tokens (7 days).
- Construct Custom Permission Classes extending `permissions.BasePermission`.
- Shield proprietary digital video content from unauthorized access and piracy.

---

## Program: Enrolled Student Video Content Protection with SimpleJWT

```python
# Menggunakan djangorestframework-simplejwt
from rest_framework import permissions, status
from rest_framework.views import APIView
from rest_framework.response import Response

# 1. Custom Permission Class: Hanya Siswa yang Terdaftar yang Boleh Mengakses Konten
class IsEnrolledStudentOrInstructor(permissions.BasePermission):
    message = "Akses ditolak! Anda harus terdaftar (enrolled) di kursus ini untuk menonton video materi."

    def has_object_permission(self, request, view, obj):
        # Admin selalu memiliki hak akses penuh
        if request.user.is_staff:
            return True

        # Periksa apakah user terdaftar di kursus terkait
        # Misal: obj adalah instance Lesson, obj.course adalah kursus
        # return obj.course.enrollments.filter(student=request.user, is_paid=True).exists()
        return getattr(request.user, "is_enrolled", False)

# 2. Protected Video Streaming Endpoint
class LessonStreamView(APIView):
    # Memerlukan token JWT valid dan izin custom
    permission_classes = [permissions.IsAuthenticated, IsEnrolledStudentOrInstructor]

    def get(self, request, lesson_id):
        # Data aman yang hanya boleh dilihat siswa yang membayar
        return Response({
            "lesson_id": lesson_id,
            "title": "Membangun High-Throughput Microservice",
            "secure_stream_url": f"https://cdn.tryngo.io/hls/lesson_{lesson_id}/master.m3u8?token=HMAC_SECURE_TOKEN",
            "expires_in_seconds": 3600
        })

# Konfigurasi SimpleJWT di settings.py:
# REST_FRAMEWORK = {
#     'DEFAULT_AUTHENTICATION_CLASSES': (
#         'rest_framework_simplejwt.authentication.JWTAuthentication',
#     )
# }

print("=== STATELSS JWT AUTH & CUSTOM PERMISSIONS TERKONFIGURASI ===")
```

---

## Key Concepts

Modern single-page applications (SPAs) and mobile clients avoid stateful session cookies due to third-party cookie restrictions and multi-region scaling hurdles. We deploy **Stateless JSON Web Tokens (JWT)**.

### SimpleJWT Mechanics in Django
1. Clients submit credentials to `/api/token/`.
2. SimpleJWT yields a token pair:
   - **Access Token**: Short-lived credential (e.g., 15 minutes) passed in the `Authorization: Bearer <token>` header on each transaction.
   - **Refresh Token**: Long-lived token used to negotiate fresh access tokens without requiring users to re-enter passwords.

### Custom Permissions via BasePermission
Production security extends beyond binary login checks (`IsAuthenticated`) into granular **Object-Level Permissions**. Overriding `has_object_permission` encapsulates domain access rules—such as verifying enrollment payment status—centrally.


---

---

## Beginner Friendly Explanation

Think of a music festival. At the gate, you exchange your purchase receipt for an RFID wristband (the Access Token). When entering the VIP backstage lounge (Custom Permission), the guard scans your wristband to verify whether you purchased VIP access rather than standard admission.

## Experiments

- Dispatch a request to `/api/token/` via cURL and inspect the returned `access` and `refresh` strings.
- Access protected routes without Authorization headers observing 401 Unauthorized errors.
- Access with an unenrolled student token and observe the custom denial message from `IsEnrolledStudentOrInstructor`.

---

## Challenge

Implement Token Blacklisting: when users logout, invalidate the refresh token via `rest_framework_simplejwt.token_blacklist` preventing token reuse.

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
```text
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
```text
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
```text
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
```text
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

You have mastered SimpleJWT stateless authentication and Custom Permissions. Next week we explore ORM query optimization and the N+1 Problem.
