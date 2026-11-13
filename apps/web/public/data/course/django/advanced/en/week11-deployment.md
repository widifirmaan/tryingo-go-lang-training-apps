## Learning Objectives

- Production settings: DEBUG, ALLOWED_HOSTS
- Gunicorn: WSGI server
- Nginx: reverse proxy
- Docker: containerize app
- Deployment platforms

---

## Program: Deployment: WSGI, Static & Healthchecks

The program closes the production loop: a WSGI server, collectstatic, env secrets, Docker Compose, and healthchecks.

```python
"""Django deployment checklist (simulated checks)."""
import os

# === settings.py: env-driven config ===
DEBUG = os.getenv('DEBUG', 'False') == 'True'
ALLOWED_HOSTS = os.getenv('ALLOWED_HOSTS', 'tryngo.example.com').split(',')
SECRET_KEY = os.environ['DJANGO_SECRET_KEY']   # never hardcode!
SECURE_PROXY_SSL_HEADER = ('HTTP_X_FORWARDED_PROTO', 'https')

# === Runtime commands ===
# python manage.py migrate          # DB schema
# python manage.py collectstatic    # static files -> STATIC_ROOT
# gunicorn config.wsgi:application --workers 4 --bind 0.0.0.0:8000

# === Gunicorn + nginx: nginx serves static, gunicorn dynamic only ===

# === Dockerfile skeleton ===
# FROM python:3.12-slim
# ENV PYTHONDONTWRITEBYTECODE 1 PYTHONUNBUFFERED 1
# COPY requirements.txt /app/ ; RUN pip install -r /app/requirements.txt
# COPY . /app ; RUN python manage.py collectstatic --noinput
# ENTRYPOINT ["gunicorn","config.wsgi:application","--bind","0.0.0.0:8000"]

# === Healthcheck (kubernetes/compose) ===
import subprocess
def healthcheck():
    result = subprocess.run(['curl', '-sf', 'http://localhost:8000/health/'], capture_output=True)
    return result.returncode == 0

print('healthcheck OK' if healthcheck() else 'healthcheck FAIL')
```

---

## Key Concepts

### WSGI vs ASGI

WSGI sinkron: gunicorn menuntut request dalam form handler(function, response). ASGI (uvicorn/daphne) untuk async + websocket; pilih sesuai kebutuhan realtime.

### 12-factor app

Config via environment (DEBUG, SECRET_KEY) - bukan file settings lokal; 12-factor memungkinkan container dibangun/dirombak bebas.

### Static & media

collectstatic mengagregasi file ke STATIC_ROOT lalu disajikan nginx/CDN; media (upload user) dipisah ke object storage (S3/R2), bukan disk container.

### Healthcheck & graceful shutdown

Healthcheck menentukan kapan container SIAP menerima traffic; saat dikirim SIGTERM, gunicorn menunggu request aktif selesai (graceful).

---

## Experiments

- Simulate a full deploy: migrate, collectstatic, gunicorn in sequence.
- Add a /health/ endpoint checking the DB (SELECT 1).
- Write a full docker-compose.yml: db (postgres), redis, web.

---

## Challenge

Write the CI/CD script: build image, push, SSH to server, docker compose pull && up -d, smoke test /health/.

---

## Summary

This week's material has been covered: Deployment: WSGI, Static & Healthchecks. Continue to the following week to deepen.
