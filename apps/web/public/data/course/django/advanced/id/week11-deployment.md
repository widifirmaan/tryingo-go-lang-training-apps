# Deployment & DevOps

> **Kategori:** Django | **Level:** Lanjutan | **Minggu 11:** Deployment & DevOps

## Tujuan Pembelajaran

- Production settings: DEBUG, ALLOWED_HOSTS
- Gunicorn: WSGI server
- Nginx: reverse proxy
- Docker: containerize app
- Deployment platforms

---

## Program: Deploy: WSGI, Static & Healthcheck

Program menutup jalur produksi: WSGI server, collectstatic, environment secrets, docker Compose, dan healthcheck.

```python
"""Checklist deployment Django (simulasi run via checks)."""
import os

# === settings.py: config dari environment ===
DEBUG = os.getenv('DEBUG', 'False') == 'True'
ALLOWED_HOSTS = os.getenv('ALLOWED_HOSTS', 'tryngo.example.com').split(',')
SECRET_KEY = os.environ['DJANGO_SECRET_KEY']   # jangan di-hardcode!
SECURE_PROXY_SSL_HEADER = ('HTTP_X_FORWARDED_PROTO', 'https')

# === Command runtime ===
# python manage.py migrate          # DB schema
# python manage.py collectstatic    # static files -> STATIC_ROOT
# gunicorn config.wsgi:application --workers 4 --bind 0.0.0.0:8000

# === Gunicorn + nginx: nginx serve static, gunicorn dynamic only ===

# === Dockerfile skeleton ===
# FROM python:3.12-slim
# ENV PYTHONDONTWRITEBYTECODE 1 PYTHONUNBUFFERED 1
# COPY requirements.txt /app/ ; RUN pip install -r /app/requirements.txt
# COPY . /app ; RUN python manage.py collectstatic --noinput
# ENTRYPOINT ["gunicorn","config.wsgi:application","--bind","0.0.0.0:8000"]

# === Healthcheck (untuk kubernetes/compose) ===
import subprocess
def healthcheck():
    result = subprocess.run(['curl', '-sf', 'http://localhost:8000/health/'], capture_output=True)
    return result.returncode == 0

print('healthcheck OK' if healthcheck() else 'healthcheck FAIL')
```

---

## Konsep Kunci

### WSGI vs ASGI

WSGI sinkron: gunicorn menuntut request dalam form handler(function, response). ASGI (uvicorn/daphne) untuk async + websocket; pilih sesuai kebutuhan realtime.

### 12-factor app

Config via environment (DEBUG, SECRET_KEY) — bukan file settings lokal; 12-factor memungkinkan container dibangun/dirombak bebas.

### Static & media

collectstatic mengagregasi file ke STATIC_ROOT lalu disajikan nginx/CDN; media (upload user) dipisah ke object storage (S3/R2), bukan disk container.

### Healthcheck & graceful shutdown

Healthcheck menentukan kapan container SIAP menerima traffic; saat dikirim SIGTERM, gunicorn menunggu request aktif selesai (graceful).

---

## Eksperimen

- Deploy simulasi: jalankan urutan yang umum migrate, collectstatic, gunicorn.
- Tambahkan endpoint /health/ dengan status DB (SELECT 1).
- Tulis docker-compose.yml lengkap: db (postgres), redis, web.

---

## Tantangan

Tulis skrip CI/CD: build image, push, SSH ke server, docker compose pull && up -d, smoke test /health/.

---

## Ringkasan

Materi minggu ini telah dibahas: Deploy: WSGI, Static & Healthcheck. Lanjut ke pekan berikutnya untuk memperdalam.
