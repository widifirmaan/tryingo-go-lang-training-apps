# Deployment — Buka Cabang Django

> **Kategori:** Django | **Level:** Lanjutan | **Minggu 11:** Deployment

## Tujuan Pembelajaran

- `gunicorn` + `Vercel`/`Railway` deploy `warung-django.vercel.app`, `collectstatic`

---

## Kenapa Ini Penting Buat Kamu?

Lokal `localhost` hanya laptop. `gunicorn` + Railway + `collectstatic` + `DEBUG=False` = URL publik aman.

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

## Penjelasan untuk Pemula

### Analogi: Buka Cabang Django
- Lihat Program: jalankan perintahnya, ubah 1 hal, lihat bedanya.

### Langkah 0 — Siapkan Device
- Sama Django W1: `runserver` di `8000` (+ paket minggu ini).

### Cara Komputer Membaca
- `collectstatic` kumpulkan CSS; `gunicorn` layani; env untuk rahasia (bukan file!).

### 3 Istilah Wajib
- 1. **gunicorn/collectstatic**: layani/kumpul-css

---

## Glosarium Mini

- Lihat Istilah Wajib di atas.

## Ringkasan

Minggu 11: **Buka Cabang Django** — `gunicorn`.
