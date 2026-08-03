# Docker, Gunicorn & Nginx

> Django | Produksi & Capstone | Pelajaran 16

## Tujuan Pembelajaran

- Menulis Dockerfile multi-stage untuk Django
- Menjalankan Gunicorn sebagai WSGI server produksi
- Menyusun stack: nginx + api + db + redis (compose)
- Memahami peran collectstatic & healthcheck

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

## Penjelasan

## Gunicorn: Bukan runserver
python manage.py runserver = server development (auto-reload, tidak untuk produksi: lambat, satu worker, tidak teruji). Gunicorn = WSGI production server: multi-worker (--workers 3), preloading, timeout, graceful restart. gunicorn myproject.wsgi:application memuat WSGI application. Aturan produksi: Gunicorn di belakang reverse proxy, DENGAN HTTPS.
## Dockerfile Multi-Stage: Kecil & Aman
Stage build: python:3.12-slim + pip install (toolchain penuh). Stage runtime: base yang sama TAPI hanya menyalin dependency terpasang (--prefix=/install) + kode. Hasil: image tanpa cache pip, tanpa source build, lebih kecil dan lebih aman. CMD menjalankan: migrate --noinput → collectstatic --noinput → gunicorn. Semua di container = lingkungan produksi identik di mana pun.
## Nginx: Reverse Proxy & Static Files
Django TIDAK melayani static files di produksi. Nginx: /static/ dari volume (hasil collectstatic), sisanya proxy_pass ke Gunicorn (api:8000) + header X-Forwarded-*. Satu pintu masuk (80), tiga lapisan di belakangnya - pola produksi standar Django.
## Compose: Satu Perintah, Empat Service
docker compose up -d --build menjalankan api + db + redis + nginx dengan jaringan otomatis. depends_on + healthcheck: db siap (pg_isready) dan redis siap (redis-cli ping) SEBELUM api start. Volume db-data = data bertahan; static-files = hasil collectstatic dibagi api & nginx. Ini stack yang sama dengan produksi nyata.

---

## Eksperimen

1. **Gunicorn: Bukan runserver**
2. **Dockerfile Multi-Stage: Kecil & Aman**
3. **Nginx: Reverse Proxy & Static Files**
4. **Compose: Satu Perintah, Empat Service**

---

## Tantangan

Perkuat stack: (1) tambah endpoint /health/ dengan pengecekan DB (connection.ensure_connection) dan Redis (cache.get) - return 200/503, (2) tambah healthcheck api di compose: wget -qO- http://api:8000/health/ dengan retries, (3) multi-stage tambahan: stage nginx menyalin staticfiles ke image nginx (copy --from=api), (4) tambah gunicorn timeout & log level di CMD, lalu uji restart worker (SIGTERM) tidak memutus request aktif.

---

## Ringkasan

Gunicorn = WSGI produksi. Multi-stage = image kecil. Nginx = proxy + static. Compose = 4 service satu perintah. Lanjut: CI/CD.
