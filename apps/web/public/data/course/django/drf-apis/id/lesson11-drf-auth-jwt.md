# DRF: JWT, Permissions & Throttling

> Django | REST API & DRF | Pelajaran 11

## Tujuan Pembelajaran

- Menjelaskan JWT: access & refresh token
- Mendapatkan token via simplejwt (TokenObtainPairView)
- Menulis permission classes (IsAuthenticated, custom)
- Mengonfigurasi throttling untuk proteksi API

---

## Program: DRF: JWT, Permissions & Throttling

```python
INSTALLED_APPS = [
    'django.contrib.admin',
    'django.contrib.auth',
    'django.contrib.contenttypes',
    'django.contrib.sessions',
    'django.contrib.messages',
    'django.contrib.staticfiles',
    'rest_framework',
    'rest_framework_simplejwt',  # JWT
    'katalog',
]

MIDDLEWARE = [
    'django.middleware.security.SecurityMiddleware',
    'django.contrib.sessions.middleware.SessionMiddleware',
    'django.middleware.common.CommonMiddleware',
    'django.middleware.csrf.CsrfViewMiddleware',
    'django.contrib.auth.middleware.AuthenticationMiddleware',
    'django.contrib.messages.middleware.MessageMiddleware',
    'django.middleware.clickjacking.XFrameOptionsMiddleware',
]

ROOT_URLCONF = 'myproject.urls'

TEMPLATES = [
    {
        'BACKEND': 'django.template.backends.django.DjangoTemplates',
        'DIRS': [],
        'APP_DIRS': True,
        'OPTIONS': {
            'context_processors': [
                'django.template.context_processors.request',
                'django.contrib.auth.context_processors.auth',
                'django.contrib.messages.context_processors.messages',
            ],
        },
    },
]

DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.sqlite3',
        'NAME': 'db.sqlite3',
    }
}

STATIC_URL = 'static/'
DEFAULT_AUTO_FIELD = 'django.db.models.BigAutoField'
SECRET_KEY = 'kunci-rahasia-dev'
DEBUG = True
ALLOWED_HOSTS = []

from datetime import timedelta  # noqa: E402

REST_FRAMEWORK = {
    # Auth: JWT adalah metode DEFAULT (bukan session)
    'DEFAULT_AUTHENTICATION_CLASSES': [
        'rest_framework_simplejwt.authentication.JWTAuthentication',
    ],
    # Perhatian: default di pelajaran ini = IsAuthenticated (lihat views)
    'DEFAULT_PERMISSION_CLASSES': [
        'rest_framework.permissions.IsAuthenticated',
    ],
    'DEFAULT_THROTTLE_CLASSES': [
        'rest_framework.throttling.AnonRateThrottle',
        'rest_framework.throttling.UserRateThrottle',
    ],
    'DEFAULT_THROTTLE_RATES': {
        'anon': '20/min',   # pengunjung: 20 permintaan per menit
        'user': '100/min',  # user login: 100 per menit
    },
}

# simplejwt: konfigurasi token
SIMPLE_JWT = {
    'ACCESS_TOKEN_LIFETIME': timedelta(minutes=30),
    'REFRESH_TOKEN_LIFETIME': timedelta(days=7),
    'AUTH_HEADER_TYPES': ('Bearer',),
}
```

---

## Penjelasan

## JWT: Token yang Membawa Identitas
Login → POST /api/token/ {username, password} → {access, refresh}. Client mengirim Authorization: Bearer <access> di tiap request; JWTAuthentication memverifikasi tanda tangan tanpa menyentuh database sesi. Access token pendek (30 menit), refresh panjang (7 hari) - refresh hanya untuk menukar access baru. Stateless = API bisa di-scale horizontal.
## Permission Classes: Siapa Boleh Apa
IsAuthenticated = harus login (semua default global). AllowAny = publik. IsAdminUser = staff. Custom IsStaffOrReadOnly: SAFE_METHODS (GET/HEAD/OPTIONS) untuk semua, tulis (POST/PUT/DELETE) hanya staff. Permission dipasang per-view atau global - komposisi seperti guards di NestJS. Kombinasi umum: auth (siapa) + permission (boleh apa).
## Throttling: Rem untuk API
Throttle membatasi permintaan: anon 20/menit, user 100/menit - melindungi dari brute-force dan penyalahgunaan. Rate limits muncul sebagai header HTTP (X-RateLimit-*) dan error 429 saat lewat. Untuk produksi: throttle lebih ketat di endpoint auth, lebih longgar di endpoint publik read-only.
## Alur Lengkap di Aplikasi
Frontend: login → simpan token → kirim Authorization tiap request → 401 saat expired → refresh token → token baru. Password di-hash (auth bawaan Django), secret JWT di env (pelajaran 15). Token TIDAK disimpan di localStorage pada app sensitif - gunakan httpOnly cookie yang aman (django-cookie-jar) atau short-lived token.

---

## Eksperimen

1. **JWT: Token yang Membawa Identitas**
2. **Permission Classes: Siapa Boleh Apa**
3. **Throttling: Rem untuk API**
4. **Alur Lengkap di Aplikasi**

---

## Tantangan

Perkuat keamanan API: (1) buat permission IsOwnerOrReadOnly: objek dengan field pemilik hanya bisa diubah pemiliknya (has_object_permission + request.user == objek.pemilik), (2) tambah model Ulasan dengan pemilik=FK User dan terapkan permission itu di viewset-nya, (3) tambah throttle khusus: 5/menit untuk endpoint token (ScopedRateThrottle), (4) uji: tanpa token (401), token salah (401), token valid (200), rate limit lewat (429).

---

## Ringkasan

JWT = stateless, access+refresh. Permissions = siapa boleh apa. Throttling = rem API. 401/403/429 jelas. Lanjut: testing.
