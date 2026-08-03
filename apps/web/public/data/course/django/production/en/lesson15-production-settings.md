# Production: Settings, Env & PostgreSQL

> Django | Production & Capstone | Lesson 15

## Learning Objectives

- Split settings: base, development, production
- Read configuration from environment variables
- Run PostgreSQL (not SQLite) in production
- Use Redis for shared cache & sessions

---

## Program: Production: Settings, Env & PostgreSQL

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

## Explanation

## Three Settings Files: One Logic, Three Environments
base.py = everything shared (apps, middleware, templates). development.py = DEBUG=True, SQLite, a dummy SECRET_KEY. production.py = env-driven, PostgreSQL, hardening. Select with --settings=... or DJANGO_SETTINGS_MODULE. Rule: no production values in git - except .env.example (a template without secrets).
## Env Vars: The Language of Environments
SECRET_KEY, DB credentials, ALLOWED_HOSTS, REDIS_URL - all from the environment, read with os.environ['KEY'] (fail fast if missing - better to crash at startup than silently run without a secret). PaaS/CI platforms inject these; locally, tools like django-environ or dotenv read .env.
## PostgreSQL: The Real Production Database
SQLite = a file, single user, easy to carry - for learning. Production: PostgreSQL - multi-user, concurrent, strong indexing, JSONB, etc. ENGINE='django.db.backends.postgresql' + credentials from env. CONN_MAX_AGE = 600: DB connections are reused, saving handshakes. The same migrations (makemigrations/migrate) work on both - the ORM hides the difference.
## Redis: Shared Cache + Sessions
The default Django session store = a database table (a potential bottleneck under many requests). Django-Redis moves the cache (and sessions via SESSION_ENGINE='django.contrib.sessions.backends.cache') into one Redis - every worker shares it. One piece of infrastructure, three roles: cache, sessions, queue (Celery in later lessons).

---

## Experiments

1. **Three Settings Files: One Logic, Three Environments**
2. **Env Vars: The Language of Environments**
3. **PostgreSQL: The Real Production Database**
4. **Redis: Shared Cache + Sessions**

---

## Challenge

Prepare real production: (1) write a docker-compose.yml with api (build .), db (postgres:16-alpine + healthcheck), redis (redis:7-alpine), (2) move collectstatic: STATIC_ROOT + the command in the Dockerfile, (3) test the PostgreSQL connection: create user/db, run migrate with production settings, (4) write a manual deploy runbook: env vars → migrate → collectstatic → gunicorn → verify /health.

---

## Summary

3 settings files. Env vars = the only production config source. PostgreSQL + Redis. Fail fast without secrets. Next: Docker & Gunicorn.
