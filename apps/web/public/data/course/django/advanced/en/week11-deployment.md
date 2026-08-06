# Deployment & DevOps

> **Kategori:** Django | **Level:** Advanced | **Minggu 11:** Deployment & DevOps

## Learning Objectives

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

## Key Concepts

### Production Settings
`DEBUG = False`, `ALLOWED_HOSTS`, `SECRET_KEY` from env vars.

### Gunicorn
WSGI server for production.

### Nginx
Reverse proxy to Gunicorn.

### Docker
Containerize app.

---

## Experiments

- Setup production settings
- Deploy to Heroku
- Setup Docker
- Configure Nginx
- Implement CI/CD

---

## Challenge

Deploy Django app to production: Gunicorn, Nginx, PostgreSQL.

---

## Summary

Week 11 of 12: **Deployment** (Level: Advanced). Next week: **Capstone**!
