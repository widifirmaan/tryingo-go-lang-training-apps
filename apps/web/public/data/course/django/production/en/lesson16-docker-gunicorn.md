# Docker, Gunicorn & Nginx

> Django | Production & Capstone | Lesson 16

## Learning Objectives

- Write a multi-stage Dockerfile for Django
- Run Gunicorn as the production WSGI server
- Compose a stack: nginx + api + db + redis (compose)
- Understand the roles of collectstatic & healthchecks

---

## Program: Docker, Gunicorn & Nginx

```python
# Stage 1: build (toolchain lengkap)
FROM python:3.12-slim AS build
WORKDIR /app
ENV PYTHONDONTWRITEBYTECODE=1 PYTHONUNBUFFERED=1
COPY requirements.txt .
RUN pip install --prefix=/install -r requirements.txt

# Stage 2: runtime - image minimal, hanya dependency + kode
FROM python:3.12-slim
WORKDIR /app
COPY --from=build /install /usr/local
COPY . .
RUN mkdir -p staticfiles

EXPOSE 8000
# Gunicorn: WSGI server produksi (bukan runserver!)
CMD ["sh", "-c", "python manage.py migrate --noinput && python manage.py collectstatic --noinput && gunicorn myproject.wsgi:application --bind 0.0.0.0:8000 --workers 3"]
```

---

## Explanation

## Gunicorn: Not runserver
python manage.py runserver = the dev server (auto-reload, not for production: slow, single worker, untested). Gunicorn = the production WSGI server: multi-worker (--workers 3), preloading, timeouts, graceful restart. gunicorn myproject.wsgi:application loads the WSGI application. Production rule: Gunicorn behind a reverse proxy, WITH HTTPS.
## Multi-Stage Dockerfile: Small & Safe
Build stage: python:3.12-slim + pip install (full toolchain). Runtime stage: the same base BUT only copying installed deps (--prefix=/install) + code. Result: an image without pip caches or build sources - smaller and safer. CMD runs: migrate --noinput → collectstatic --noinput → gunicorn. Everything in a container = an identical production environment everywhere.
## Nginx: Reverse Proxy & Static Files
Django does NOT serve static files in production. Nginx: /static/ from the volume (collectstatic output), everything else proxy_pass to Gunicorn (api:8000) + X-Forwarded-* headers. One entry point (80), three layers behind it - the standard Django production pattern.
## Compose: One Command, Four Services
docker compose up -d --build runs api + db + redis + nginx with automatic networking. depends_on + healthchecks: db ready (pg_isready) and redis ready (redis-cli ping) BEFORE the api starts. The db-data volume = surviving data; static-files = collectstatic output shared by api & nginx. This is the same stack as real production.

---

## Experiments

1. **Gunicorn: Not runserver**
2. **Multi-Stage Dockerfile: Small & Safe**
3. **Nginx: Reverse Proxy & Static Files**
4. **Compose: One Command, Four Services**

---

## Challenge

Strengthen the stack: (1) add a /health/ endpoint checking the DB (connection.ensure_connection) and Redis (cache.get) - return 200/503, (2) add an api healthcheck in compose: wget -qO- http://api:8000/health/ with retries, (3) an extra stage: an nginx stage copying staticfiles into the nginx image (copy --from=api), (4) add gunicorn timeout & log levels to CMD, then test that a worker restart (SIGTERM) does not cut active requests.

---

## Summary

Gunicorn = the production WSGI. Multi-stage = small images. Nginx = proxy + static. Compose = 4 services, one command. Next: CI/CD.
