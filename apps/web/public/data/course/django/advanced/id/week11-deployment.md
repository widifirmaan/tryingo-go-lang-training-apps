# Deployment — Buka Cabang Django

> **Kategori:** Django | **Level:** Lanjutan | **Minggu 11:** Deployment

## Tujuan Pembelajaran

- `gunicorn` + `Vercel`/`Railway` deploy `warung-django.vercel.app`, `collectstatic`

---

## Program

```bash
pip install gunicorn
python manage.py collectstatic
gunicorn toko.wsgi
# Deploy: vercel --prod atau railway
```

`settings.py`: `ALLOWED_HOSTS = ["*"]`, `DEBUG=False`, `DATABASE_URL` dari env.

---

## Ringkasan

Minggu 11: **Buka Cabang Django** — `gunicorn`.
