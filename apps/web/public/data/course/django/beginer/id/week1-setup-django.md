# Setup & Instalasi Django

> **Kategori:** Django | **Level:** Pemula | **Minggu 1:** Setup & Instalasi Django

## Tujuan Pembelajaran

- Install Django via pip
- Memahami struktur folder Django
- manage.py CLI commands
- File settings.py
- MVT pattern

---

## Program: Project Pertama

```python
# Setup
print("=== Django Setup ===")
print("pip install django")
print("django-admin startproject myproject")
print("cd myproject")
print("python manage.py runserver")
print("Server running on http://localhost:8000")
print("")
print("=== Directory Structure ===")
dirs = [
    "myproject/",
    "  settings.py",
    "  urls.py",
    "manage.py",
    "app/",
    "  models.py",
    "  views.py",
    "  admin.py",
    "  migrations/",
]
for d in dirs:
    print(f"  {d}")
print("")
print("=== manage.py Commands ===")
print("runserver - Start dev server")
print("startapp - Create app")
print("makemigrations - Create migrations")
print("migrate - Apply migrations")
print("createsuperuser - Create admin")
print("shell - Interactive shell")

```

---

## Konsep Kunci

### Instalasi
`pip install django`, lalu `django-admin startproject nama_project`.

### Struktur Folder
- `myproject/` - Project config
- `app/` - Application code
- `manage.py` - CLI tool

### MVT Pattern
- Model: data & database
- View: business logic
- Template: presentation

---

## Eksperimen

- Install Django dan buat project baru
- Jelajari setiap file
- Coba manage.py shell
- Buat app baru
- Lihat settings.py

---

## Tantangan

Buat project Django baru dengan 1 app. Buat halaman home sederhana.

---

## Ringkasan

Minggu 1 dari 12: **Setup & Instalasi Django** (Level: Pemula). Minggu depan: **Models & ORM**.
