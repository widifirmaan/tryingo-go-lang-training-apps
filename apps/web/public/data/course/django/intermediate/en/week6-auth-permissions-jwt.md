# API Security: Stateless JWT (SimpleJWT) & Custom Permissions

> **Kategori:** Django Web Framework | **Level:** Intermediate | **Minggu 6:** API Security: Stateless JWT (SimpleJWT) & Custom Permissions

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

## Summary

You have mastered SimpleJWT stateless authentication and Custom Permissions. Next week we explore ORM query optimization and the N+1 Problem.
