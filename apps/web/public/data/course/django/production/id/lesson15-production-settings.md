# Produksi: Settings, Env & PostgreSQL

> Django | Produksi & Capstone | Pelajaran 15

## Tujuan Pembelajaran

- Memisahkan settings: base, development, production
- Membaca konfigurasi dari environment (env vars)
- Menjalankan PostgreSQL (bukan SQLite) di produksi
- Menggunakan Redis untuk cache & sesi bersama

---

## Program: Produksi: Settings, Env & PostgreSQL

```python
import os

from .base import *  # noqa

# Sekali masuk ke produksi: semua dari environment
SECRET_KEY = os.environ['DJANGO_SECRET_KEY']  # crash cepat jika tidak ada
DEBUG = False
ALLOWED_HOSTS = os.environ.get('DJANGO_ALLOWED_HOSTS', '').split(',')

# PostgreSQL: production standard (bukan SQLite!)
DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.postgresql',
        'NAME': os.environ.get('POSTGRES_DB', 'tryngo'),
        'USER': os.environ.get('POSTGRES_USER', 'tryngo'),
        'PASSWORD': os.environ.get('POSTGRES_PASSWORD', ''),
        'HOST': os.environ.get('POSTGRES_HOST', 'db'),
        'PORT': os.environ.get('POSTGRES_PORT', '5432'),
        # Koneksi pool: koneksi DB dipakai ulang (performa)
        'CONN_MAX_AGE': 600,
    }
}

# Security hardening (dari pelajaran 13)
SECURE_SSL_REDIRECT = True
SESSION_COOKIE_SECURE = True
CSRF_COOKIE_SECURE = True
SECURE_HSTS_SECONDS = 31536000
SECURE_HSTS_INCLUDE_SUBDOMAINS = True
SECURE_HSTS_PRELOAD = True
SECURE_REFERRER_POLICY = 'same-origin'
X_FRAME_OPTIONS = 'DENY'

# Redis cache + sesi (django-redis) - cache bersama antar worker
CACHES = {
    'default': {
        'BACKEND': 'django_redis.cache.RedisCache',
        'LOCATION': os.environ.get('REDIS_URL', 'redis://redis:6379/1'),
        'OPTIONS': {'CLIENT_CLASS': 'django_redis.client.DefaultClient'},
    }
}
```

---

## Penjelasan

## Tiga File Settings: Satu Logika, Tiga Lingkungan
base.py = semua yang sama (apps, middleware, templates). development.py = DEBUG=True, SQLite, SECRET_KEY dummy. production.py = env-driven, PostgreSQL, hardening. Pilih dengan --settings=... atau DJANGO_SETTINGS_MODULE. Aturan: tidak ada nilai produksi di git - kecuali .env.example (template tanpa rahasia).
## Env Vars: Bahasa Lingkungan
SECRET_KEY, DB credentials, ALLOWED_HOSTS, REDIS_URL - semuanya dari environment, dibaca dengan os.environ['KEY'] (crash cepat jika hilang - lebih baik gagal saat start daripada diam-diam berjalan tanpa secret). Platform PaaS/CI menyuntikkan env ini; di lokal, tools seperti django-environ atau dotenv membaca .env.
## PostgreSQL: Database Produksi yang Sebenarnya
SQLite = file, satu pengguna, mudah dibawa - untuk belajar. Produksi: PostgreSQL - multi-user, concurrent, indexing kuat, JSONB, dll. ENGINE='django.db.backends.postgresql' + kredensial dari env. CONN_MAX_AGE = 600: koneksi DB dipakai ulang, hemat handshake. Migration yang sama (makemigrations/migrate) berlaku untuk keduanya - ORM menyembunyikan perbedaan.
## Redis: Cache + Sesi yang Dibagikan
Sesi Django default = tabel database (bisa jadi bottleneck multi-request). Django-Redis memindahkan cache (dan sesi via SESSION_ENGINE='django.contrib.sessions.backends.cache') ke satu Redis - semua worker berbagi. Satu infrastruktur, tiga peran: cache, sesi, queue (Celery di pelajaran berikutnya).

---

## Eksperimen

1. **Tiga File Settings: Satu Logika, Tiga Lingkungan**
2. **Env Vars: Bahasa Lingkungan**
3. **PostgreSQL: Database Produksi yang Sebenarnya**
4. **Redis: Cache + Sesi yang Dibagikan**

---

## Tantangan

Siapkan produksi nyata: (1) buat docker-compose.yml dengan api (build .), db (postgres:16-alpine + healthcheck), redis (redis:7-alpine), (2) pindahkan collectstatic: STATIC_ROOT + perintah di Dockerfile, (3) uji koneksi PostgreSQL: buat user/db, jalankan migrate dengan settings production, (4) tulis runbook deploy manual: env vars → migrate → collectstatic → gunicorn → verifikasi /health.

---

## Ringkasan

3 file settings. Env vars = satu-satunya sumber config produksi. PostgreSQL + Redis. Crash cepat tanpa secret. Lanjut: Docker & Gunicorn.
