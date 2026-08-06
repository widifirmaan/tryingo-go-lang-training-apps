# Deployment & DevOps

> **Kategori:** Django | **Level:** Lanjutan | **Minggu 11:** Deployment & DevOps

## Tujuan Pembelajaran

- Production settings: DEBUG, ALLOWED_HOSTS
- Gunicorn: WSGI server
- Nginx: reverse proxy
- Docker: containerize app
- Deployment platforms

---

## Program: Production Deploy

```python
# deployment
print("=== Django Deployment ===")
print("=== Production Checklist ===")
print("DEBUG = False")
print("ALLOWED_HOSTS = ['yourdomain.com']")
print("SECRET_KEY = os.environ.get('SECRET_KEY')")
print("")
print("=== Gunicorn ===")
print("pip install gunicorn")
print("gunicorn myproject.wsgi:application --bind 0.0.0.0:8000")
print("")
print("=== Nginx Config ===")
print("server {")
print("    listen 80;")
print("    location / {")
print("        proxy_pass http://127.0.0.1:8000;")
print("    }")
print("}")
print("")
print("=== Docker ===")
print("FROM python:3.11")
print("WORKDIR /app")
print("COPY requirements.txt .")
print("RUN pip install -r requirements.txt")
print("COPY . .")
print("CMD ["gunicorn", "myproject.wsgi:application", "--bind", "0.0.0.0:8000"]")

```

---

## Konsep Kunci

### Production Settings
`DEBUG = False`, `ALLOWED_HOSTS`, `SECRET_KEY` dari env vars.

### Gunicorn
WSGI server untuk production.

### Nginx
Reverse proxy ke Gunicorn.

### Docker
Containerize app.

---

## Eksperimen

- Setup production settings
- Deploy ke Heroku
- Setup Docker
- Configure Nginx
- Implementasikan CI/CD

---

## Tantangan

Deploy Django app ke production: Gunicorn, Nginx, PostgreSQL.

---

## Ringkasan

Minggu 11 dari 12: **Deployment** (Level: Lanjutan). Minggu depan: **Capstone**!
