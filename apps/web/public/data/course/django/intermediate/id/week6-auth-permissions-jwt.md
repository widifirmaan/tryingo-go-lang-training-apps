# Keamanan API: Stateless JWT (SimpleJWT) & Custom Permissions

> **Kategori:** Django Web Framework | **Level:** Menengah | **Minggu 6:** Keamanan API: Stateless JWT (SimpleJWT) & Custom Permissions

## Tujuan Pembelajaran

- Mengonfigurasi stateless authentication menggunakan JSON Web Token dengan `djangorestframework-simplejwt`.
- Memahami siklus hidup Access Token (umur pendek: 15 menit) dan Refresh Token (umur panjang: 7 hari).
- Membangun Custom Permission Classes dengan mewarisi `permissions.BasePermission`.
- Mengamankan konten video digital berbayar dari pembajakan dan akses tidak sah.

---

## Program: Proteksi Akses Materi Video Pelajaran Khusus Siswa Terdaftar dengan SimpleJWT

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

## Konsep Kunci

Aplikasi mobile dan frontend SPA modern tidak menggunakan cookies berbasis sesi (session cookies) karena rentan terhadap pemblokiran pihak ketiga dan sulit diskalakan di klaster multi-server. Kita menggunakan **Stateless JWT (JSON Web Tokens)**.

### Cara Kerja SimpleJWT di Django
1. Pengguna mengirimkan username dan password ke endpoint `/api/token/`.
2. SimpleJWT mengembalikan dua token:
   - **Access Token**: Token umur pendek (misal 15 menit) yang disertakan pada setiap HTTP request di header `Authorization: Bearer <access_token>`.
   - **Refresh Token**: Token umur panjang yang disimpan aman di client untuk memperbarui access token baru saat kadaluarsa tanpa meminta pengguna login ulang.

### Custom Permissions (BasePermission)
Keamanan sejati bukan hanya mengecek apakah pengguna sudah login (`IsAuthenticated`), tetapi juga memverifikasi apakah pengguna berhak mengakses sumber daya spesifik (**Object-Level Permissions**). Dengan mengimplementasikan method `has_object_permission`, kita memeriksa kepemilikan kursus atau status pembayaran langganan secara terpusat dan elegan.


---

---

## Penjelasan untuk Pemula

Bayangkan Anda pergi ke festival musik. Di loket depan Anda menukarkan tiket dengan gelang festival (Access Token). Gelang ini berlaku selama 1 hari. Untuk masuk ke tenda konser VIP (Custom Permission), petugas di depan tenda memindai barcode gelang Anda untuk memastikan Anda sudah membeli paket VIP, bukan sekadar tiket reguler.

## Eksperimen

- Kirim request ke `/api/token/` menggunakan cURL dan amati balikan `access` dan `refresh` token.
- Akses endpoint yang dilindungi tanpa header Authorization dan amati status 401 Unauthorized.
- Akses endpoint dengan user yang belum terdaftar dan amati pesan penolakan custom dari `IsEnrolledStudentOrInstructor`.

---

## Tantangan

Implementasikan sistem Token Blacklisting: ketika pengguna logout, masukkan refresh token ke dalam tabel blacklist database menggunakan `rest_framework_simplejwt.token_blacklist` sehingga token tidak bisa digunakan lagi.

---

## Ringkasan

Kamu telah menguasai SimpleJWT stateless authentication dan Custom Permissions. Minggu depan kita mempelajari optimasi kueri ORM dan mitigasi N+1 Problem.
