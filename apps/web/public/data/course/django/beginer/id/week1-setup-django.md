# Setup & Instalasi Django

> **Kategori:** Django | **Level:** Pemula | **Minggu 1:** Setup & Instalasi Django

## Tujuan Pembelajaran

- Install Django via pip
- Memahami struktur folder Django
- manage.py CLI commands
- File settings.py
- MVT pattern

---

## Panduan Mulai Cepat (Quick Start): Setup & Inisialisasi Project

Sebelum mulai mendalami materi dan praktik kode di bawah, siapkan lingkungan pengembangan lokal Anda di komputer dengan langkah-langkah praktis berikut:

### 1. Persiapan Editor VS Code & Ekstensi Rekomendasi
Gunakan [Visual Studio Code](https://code.visualstudio.com/) sebagai code editor utama. Pasang ekstensi penting berikut:
- **Python for VS Code** (`ms-python.python`): IntelliSense dan debugger Python
- **Django for VS Code** (`batisteo.vscode-django`): Syntax highlighting untuk template Django dan snippets

Atau instal semua ekstensi rekomendasi sekaligus via terminal:
```bash
code --install-extension ms-python.python --install-extension batisteo.vscode-django
```

---

### 2. Instalasi Runtime & Dependency (Python 3.12+ & pip)
Pastikan runtime atau SDK telah terpasang di sistem operasi Anda:

**Windows (PowerShell):**
```powershell
winget install Python.Python.3.12
```

**macOS (Terminal / Homebrew):**
```bash
brew install python@3.12
```

**Linux (Ubuntu/Debian / bash):**
```bash
sudo apt install python3 python3-pip python3-venv
```

**Verifikasi Instalasi:**
Jalankan perintah berikut di terminal:
```bash
python --version
```

Output yang diharapkan:
```output
Python 3.12.x
```

> 💡 **Tips Prasyarat:** Selalu aktifkan virtual environment sebelum menginstal django via pip.

---

### 3. Inisialisasi Project Kosong (Scaffolding)
Buat folder dan kerangka awal project baru dengan perintah resmi:

```bash
mkdir my-django-app && cd my-django-app
python -m venv .venv
# Windows: .venv\Scripts\activate | Mac/Linux: source .venv/bin/activate
pip install django
django-admin startproject config .
python manage.py migrate
```
- **Keterangan:** Menyiapkan project Django dengan skrip manage.py dan menjalankan migrasi database SQLite default.
- **Pindah ke direktori project:**
```bash
cd my-django-app
```

---

### 4. Menjalankan Server Lokal & File Titik Masuk Pertama
Jalankan server pengembangan lokal:

```bash
python manage.py runserver
```
Akses di browser atau terminal: `http://127.0.0.1:8000`

> ℹ️ Buka http://127.0.0.1:8000 di browser untuk melihat halaman sukses roket Django.

**File Titik Masuk Utama (`config/views.py`):**
```py
from django.http import JsonResponse
from datetime import datetime

def home_view(request):
    return JsonResponse({
        "framework": "Django 5.x",
        "status": "Online",
        "message": "Selamat datang di API Django pertama Anda!",
        "server_time": datetime.now().isoformat()
    })
```
View sederhana yang mengembalikan respon JSON dari Django.

---

### 5. Struktur Direktori Proyek Baru
Struktur folder dan file standar yang dihasilkan:

```text
my-django-app/
├── manage.py            # CLI helper Django untuk migrasi & dev server
├── config/
│   ├── settings.py      # Pengaturan database, apps, dan middleware
│   ├── urls.py          # Routing URL global
│   ├── asgi.py          # Entrypoint async server
│   └── wsgi.py          # Entrypoint WSGI production
└── db.sqlite3           # Database lokal bawaan
```
Arsitektur MVT (Model-View-Template) khas Django.

---

### 6. Tips & Best Practice untuk Pemula
- Jalankan `python manage.py createsuperuser` untuk membuat akun admin panel di `/admin`.
- Gunakan perintah `python manage.py startapp core` saat membuat fitur atau domain baru.

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
