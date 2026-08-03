# Security: SQLi, XSS, CSRF & Headers

> Django | Testing & Keamanan | Pelajaran 13

## Tujuan Pembelajaran

- Menjelaskan perlindungan bawaan Django: SQLi, XSS, CSRF
- Membaca hardening settings: HTTPS, HSTS, cookies
- Memakai ORM vs raw SQL: parameterized queries
- Memahami autoescape template dan CSRF token

---

## Program: Security: SQLi, XSS, CSRF & Headers

```python
import os

from django.core.exceptions import ImproperlyConfigured


def env_bool(key, default=False):
    return os.getenv(key, str(default)).lower() in ('1', 'true', 'yes')


# SECRET: dari environment, BUKAN hardcode (pelajaran 15)
SECRET_KEY = os.getenv('DJANGO_SECRET_KEY', 'kunci-rahasia-dev')

DEBUG = env_bool('DJANGO_DEBUG', True)

ALLOWED_HOSTS = os.getenv('DJANGO_ALLOWED_HOSTS', '*').split(',')

INSTALLED_APPS = [
    'django.contrib.admin',
    'django.contrib.auth',
    'django.contrib.contenttypes',
    'django.contrib.sessions',
    'django.contrib.messages',
    'django.contrib.staticfiles',
    'katalog',
]

MIDDLEWARE = [
    # SecurityMiddleware: header keamanan otomatis (lihat bawah)
    'django.middleware.security.SecurityMiddleware',
    'django.contrib.sessions.middleware.SessionMiddleware',
    'django.middleware.common.CommonMiddleware',
    # CsrfViewMiddleware: memblokir POST tanpa token valid
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

# ---- Hardening: hanya aktif saat DEBUG=False ----
# HTTPS paksa + cookie hanya lewat HTTPS
SECURE_SSL_REDIRECT = not DEBUG
SESSION_COOKIE_SECURE = not DEBUG
CSRF_COOKIE_SECURE = not DEBUG

# Header HTTP: X-Content-Type-Options, X-Frame-Options,
# Strict-Transport-Security, Referrer-Policy, Cross-Origin-Opener-Policy
SECURE_HSTS_SECONDS = 31536000 if not DEBUG else 0
SECURE_HSTS_INCLUDE_SUBDOMAINS = not DEBUG
SECURE_HSTS_PRELOAD = not DEBUG
SECURE_REFERRER_POLICY = 'same-origin'
X_FRAME_OPTIONS = 'DENY'
```

---

## Penjelasan

## SQL Injection: Tidak Ada di ORM
ORM mengubah filter() menjadi parameterized query: input user jadi PARAMETER, bukan string SQL. Artikel.objects.filter(judul__icontains="x' OR 1=1") tidak bisa membocorkan data - meski user mengirim SQL jahat. Aturan: JANGAN pernah concat string ke raw SQL. Kalau terpaksa raw (raw()/connection.cursor), selalu parameter: cursor.execute(sql, [nilai]).
## XSS: Autoescape Adalah Perisai
Template Django meng-escape {{ var }} secara otomatis: <script> menjadi &lt;script&gt; - input user dirender sebagai TEKS, bukan HTML. Pengecualian eksplisit: |safe, mark_safe, autoescape off - hanya untuk konten yang Anda kendalikan. Aturan: jangan pernah menandai input user sebagai safe.
## CSRF: Token yang Membuktikan Niat
POST tanpa token CSRF valid = 403. Token acak per sesi, diverifikasi middleware - form dari situs LAIN tidak bisa memalsukan aksi pengguna yang login. {% csrf_token %} di tiap form POST; untuk API, CSRFExemptView atau token dari cookie (dua sumber - keduanya wajib cocok).
## Hardening: Header & HTTPS
DEBUG=False mengaktifkan: SECURE_SSL_REDIRECT (HTTP→HTTPS), SESSION_COOKIE_SECURE + CSRF_COOKIE_SECURE (cookie hanya lewat HTTPS), HSTS (browser hanya HTTPS untuk domain ini), X_FRAME_OPTIONS DENY (anti clickjacking), X-Content-Type-Options. SECRET_KEY dari env, ALLOWED_HOSTS dibatasi (bukan '*'). Periksa dengan securityheaders.com / Mozilla Observatory.

---

## Eksperimen

1. **SQL Injection: Tidak Ada di ORM**
2. **XSS: Autoescape Adalah Perisai**
3. **CSRF: Token yang Membuktikan Niat**
4. **Hardening: Header & HTTPS**

---

## Tantangan

Audit keamanan proyek Anda: (1) pasang django-debug-toolbar dan periksa jumlah query halaman berita (N+1?), (2) tambah Referrer-Policy & Content-Security-Policy (header CSP minimal: default-src self) di settings, (3) buat form komentar publik dengan validasi + tampilkan via |linebreaksbr (escape tetap aktif), lalu uji isi <script>alert(1)</script> - harus tampil sebagai teks, (4) ganti ALLOWED_HOSTS dengan daftar domain nyata (bukan *) dan uji error 400 saat pakai host asing.

---

## Ringkasan

ORM = parameterized (anti-SQLi). Autoescape = anti-XSS. CSRF token = anti-pemalsuan. Hardening headers saat DEBUG=False. Lanjut: caching & async.
