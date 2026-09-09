# Setup Django — Warung dengan Admin Otomatis

> **Kategori:** Django | **Level:** Pemula | **Minggu 1:** Setup Django
> **Prasyarat:** Tidak ada — mulai dari nol.

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

## Tantangan

**Setup Django di Warungmu:** pakai `pip install django`, `django-admin`, `django-admin startproject toko` hingga benar-benar jalan, lalu kerjakan tiga tingkat ini.
- **Hijau:** Jalankan Program minggu ini apa adanya; catat output yang keluar.
- **Kuning:** Ubah 1 nilai pada `pip install django`, `django-admin`, `django-admin startproject toko`; tebak output SEBELUM run, lalu cocokkan.
- **Merah:** Naikkan 1 tingkat: tambah 1 kasus gagal + pesan error yang jelas.

## Ringkasan

Minggu 1: **Gedung & Toko** — Django hidup dengan admin. Minggu depan: **Models**.
