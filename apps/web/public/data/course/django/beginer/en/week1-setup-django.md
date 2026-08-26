# Setup Django — Warung dengan Admin Otomatis

> **Kategori:** Django | **Level:** Pemula | **Minggu 1:** Setup Django

## Tujuan Pembelajaran

- Instal Django `pip install django`, cek `django-admin --version`, buat `django-admin startproject toko .`
- `python manage.py runserver` di `localhost:8000`, `migrate`, `createsuperuser`
- Paham `project` (gedung) vs `app` (toko di gedung)

---

## Kenapa Ini Penting Buat Kamu?

Django = warung dengan **admin otomatis**: buat model `Produk` → admin CRUD jadi tanpa coding. Paling cepat untuk non-IT yang butuh dashboard.

---

## Program: Warung Django 5 Menit

```bash
pip install django
django-admin --version
django-admin startproject toko .
python manage.py startapp warung
python manage.py migrate
python manage.py createsuperuser # admin / admin123
python manage.py runserver
# Buka http://localhost:8000 dan http://localhost:8000/admin
```

**Struktur:**
```
toko/ (gedung)
  settings.py # konfigurasi gedung
  urls.py # pintu utama
warung/ (toko)
  models.py # rak
  views.py # pelayan
  admin.py # kasir admin
```

Tambah `warung` ke `INSTALLED_APPS` di `settings.py`.

---

## Ringkasan

Minggu 1: **Gedung & Toko** — Django hidup dengan admin. Minggu depan: **Models**.
