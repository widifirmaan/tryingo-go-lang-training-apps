# Django 5.1 MVT Architecture, Settings & Domain Model Declarations

> **Kategori:** Django Web Framework | **Level:** Beginner | **Minggu 1:** Django 5.1 MVT Architecture, Settings & Domain Model Declarations
> ⏱️ **Estimated Time:** 45 Minutes (15m theory, 30m practice) | 🔗 **Pace:** Structured (Step-by-step)


## Learning Objectives

- Understand Django's "Batteries-Included" philosophy and Model-View-Template (MVT) architecture.
- Declare database entities via `models.Model`, `CharField`, `DecimalField`, and `TextChoices`.
- Configure relational foreign keys with `models.ForeignKey` and `related_name`.
- Automate SEO-friendly slug generation by overriding the model `save()` method.

---

## Quick Start Guide: Setup & Project Initialization

Before exploring the lesson theory and code examples below, set up your local development environment with these step-by-step instructions:

### 1. VS Code Setup & Recommended Extensions
Use [Visual Studio Code](https://code.visualstudio.com/) as your primary code editor. Install these essential extensions:
- **Python for VS Code** (`ms-python.python`): Python language and debugging support
- **Django for VS Code** (`batisteo.vscode-django`): Template syntax highlighting and snippets

Or install all recommended extensions at once via terminal:
```bash
code --install-extension ms-python.python --install-extension batisteo.vscode-django
```

---

### 2. Runtime & Dependency Installation (Python 3.12+ & pip)
Make sure the required runtime or SDK is installed on your machine:

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

**Verify Installation:**
Run this command in your terminal to ensure tools are properly configured:
```bash
python --version
```

Expected output:
```output
Python 3.12.x
```

> 💡 **Prerequisite Note:** Always activate your virtual environment before running pip install django.

---

### 3. Initializing a Blank Project (Scaffolding)
Generate a brand-new project workspace using the official CLI command:

```bash
mkdir my-django-app && cd my-django-app
python -m venv .venv
# Windows: .venv\Scripts\activate | Mac/Linux: source .venv/bin/activate
pip install django
django-admin startproject config .
python manage.py migrate
```
- **Details:** Scaffolds Django project structure with manage.py and initializes the default SQLite database.
- **Navigate to the project directory:**
```bash
cd my-django-app
```

---

### 4. Running the Local Dev Server & First Entry File
Start your local development server:

```bash
python manage.py runserver
```
Open in browser or terminal: `http://127.0.0.1:8000`

> ℹ️ Open http://127.0.0.1:8000 in your browser to view the Django launchpad page.

**Initial Entry File (`config/views.py`):**
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
Simple view returning a clean JSON response from Django.

---

### 5. New Project Directory Structure
Standard directory layout and file anatomy created by the scaffolder:

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
Classic Django Model-View-Template architecture.

---

### 6. Beginner Tips & Best Practices
- Run `python manage.py createsuperuser` to create an administrator account for `/admin`.
- Use `python manage.py startapp core` when creating a new domain feature or app.

---

## Program: LMS Course & Lesson Domain Models with Django ORM

```python
# Demonstrasi Model Domain LMS (models.py)
from django.db import models
from django.utils.text import slugify
from django.core.validators import MinValueValidator

class CourseLevel(models.TextChoices):
    BEGINNER = "BEGINNER", "Pemula"
    INTERMEDIATE = "INTERMEDIATE", "Menengah"
    ADVANCED = "ADVANCED", "Lanjutan"

class Course(models.Model):
    title = models.CharField(max_length=200, help_text="Judul lengkap kursus")
    slug = models.SlugField(max_length=220, unique=True, blank=True)
    description = models.TextField()
    price = models.DecimalField(
        max_digits=10, 
        decimal_places=2, 
        validators=[MinValueValidator(0.00)]
    )
    level = models.CharField(
        max_length=20, 
        choices=CourseLevel.choices, 
        default=CourseLevel.BEGINNER
    )
    is_published = models.BooleanField(default=False)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ["-created_at"]
        verbose_name = "Kursus"
        verbose_name_plural = "Daftar Kursus"

    def save(self, *args, **kwargs):
        if not self.slug:
            self.slug = slugify(self.title)
        super().save(*args, **kwargs)

    def __str__(self):
        return f"{self.title} ({self.get_level_display()})"

class Lesson(models.Model):
    course = models.ForeignKey(Course, on_delete=models.CASCADE, related_name="lessons")
    title = models.CharField(max_length=200)
    video_url = models.URLField(blank=True)
    content = models.TextField(help_text="Materi markdown pelajaran")
    order = models.PositiveIntegerField(default=1)

    class Meta:
        ordering = ["order"]
        unique_together = ["course", "order"]

    def __str__(self):
        return f"{self.course.title} - #{self.order}: {self.title}"

print("=== DJANGO LMS MODELS TERDEFINISI DENGAN VALIDASI & CHOICES ===")
```

---

## Key Concepts

Django stands as Python's flagship web framework, renowned for its **"Batteries-Included"** ethos: packaging ORM persistence, automated migrations, an administrative dashboard, authentication, and CSRF defense right out of the box.

### The MVT (Model-View-Template) Architecture
- **Model**: Encapsulates data schemas and business invariants mapped directly to relational database tables.
- **View**: Executes application logic, queries models, and coordinates responses.
- **Template**: Renders dynamic presentations (HTML) delivered to user agents.

### Django ORM & TextChoices
Rather than authoring raw SQL statements prone to injection vulnerabilities, models are declared as clean Python classes. Utilizing `models.TextChoices` provisions type-safe enums alongside built-in helper methods such as `course.get_level_display()`.

### Relational Foreign Key Integrity
Designating `models.ForeignKey(Course, on_delete=models.CASCADE, related_name="lessons")` sets up foreign key constraints within PostgreSQL. If a course is pruned, its associated lessons purge atomically via Cascade Deletion.


---

---

## Beginner Friendly Explanation

Imagine constructing an educational academy. Django represents a turn-key facility fully furnished with classrooms, administrative desks, security gates, and student records vaults (Batteries-Included). The Course and Lesson models act as pre-printed registration forms filed into steel vaults (the Database) without manual carpentry.

## Experiments

- Run `python manage.py makemigrations` and inspect the synthesized migration Python script.
- Instantiate a Course in the Django shell (`python manage.py shell`) and verify slug auto-generation.
- Attempt inserting two Lesson records with identical `order` keys within a single course to test `unique_together`.

---

## Challenge

Author an `Enrollment` model binding `User` and `Course`, tracking registration timestamps and payment states (PENDING, PAID, CANCELLED).

---

## Visual Mental Model & Architecture Flow

```diagram
┌──────────────────────────────────────────────────────────┐
│ ARSITEKTUR MODEL-TEMPLATE-VIEW (MTV) DJANGO              │
│                                                          │
│ Browser Request ──► urls.py (URL Router)                 │
│                            │                             │
│                            ▼                             │
│                       views.py (Logika Bisnis)           │
│                         │         │                      │
│             Query DB    ▼         ▼   Render HTML        │
│        models.py (ORM) ◄           ► templates/*.html    │
│               │                            │             │
│               ▼                            ▼             │
│          Database Relasional           HTTP Response     │
└──────────────────────────────────────────────────────────┘
```

---

## Syntax Reference & Practical Guide (W3Schools Style)

Here is the comprehensive breakdown of syntax signatures, parameters, return behavior, and isolated runnable examples introduced in this module:

### 1. `class Model(models.Model)`
- **Core Functionality:** Definisi entitas ORM database.
- **Parameters / Attributes:** `Field Types (CharField, IntegerField, ForeignKey)`.
- **System Behavior & Return:** Memetakan struktur tabel database langsung dari class Python dengan migrasi bawaan..
- **Practical Code Example:**
```python
from django.db import models
class Product(models.Model):
    name = models.CharField(max_length=200)
    price = models.DecimalField(max_digits=10, decimal_places=2)
    created_at = models.DateTimeField(auto_now_add=True)
```
- **Expected Execution Output:**
```output
Skema tabel Product siap dimigrasi ke database
```

### 2. `Product.objects.filter(price__gt=50000)`
- **Core Functionality:** ORM QuerySet Fluent API.
- **Parameters / Attributes:** `Field lookups (__gt, __icontains, __in)`.
- **System Behavior & Return:** Menyusun query SQL relasional berkinerja tinggi secara lazy tanpa menulis SQL mentah..
- **Practical Code Example:**
```python
cheap_products = Product.objects.filter(price__lte=100000).order_by('-created_at')[:5]
```
- **Expected Execution Output:**
```output
Mengembalikan 5 baris produk termurah
```

### 3. `def view(request): return render(request, 'home.html', ctx)`
- **Core Functionality:** View Handler berbasis fungsi/kelas.
- **Parameters / Attributes:** `HttpRequest, Template name, Context dict`.
- **System Behavior & Return:** Menerima permintaan pengguna, memproses data, dan mengembalikan HTML yang ter-render..
- **Practical Code Example:**
```python
from django.shortcuts import render
def home_view(request):
    items = Product.objects.all()
    return render(request, 'home.html', {'items': items})
```
- **Expected Execution Output:**
```output
Halaman web ter-render sempurna untuk pengguna
```

### 4. `path('products/<int:id>/', views.detail, name='product-detail')`
- **Core Functionality:** Pendaftaran URL Pattern terstruktur.
- **Parameters / Attributes:** `Route string, View function, Unique name`.
- **System Behavior & Return:** Menghubungkan pola URL yang diminta peramban ke fungsi view yang sesuai..
- **Practical Code Example:**
```python
from django.urls import path
from . import views
urlpatterns = [
    path('products/<int:id>/', views.detail, name='product-detail')
]
```
- **Expected Execution Output:**
```output
Rute /products/123 dipetakan ke views.detail
```

---

## Common Pitfalls & Debugging Tips

### 1. Unapplied Model Migrations
- **Symptom / Issue:** Triggers database errors: `ProgrammingError: relation does not exist`.
- **Root Cause:** Common mistaken assumptions during early development.
- **Fix / Best Practice:** Always run `python manage.py makemigrations` followed by `python manage.py migrate`.

### 2. N+1 Queries in Django ORM Templates
- **Symptom / Issue:** Templates trigger a separate SQL query per item rendered.
- **Root Cause:** Common mistaken assumptions during early development.
- **Fix / Best Practice:** Use `select_related()` for foreign keys and `prefetch_related()` for many-to-many.

### 3. Exposing Sensitive Secrets in Settings
- **Symptom / Issue:** Leaking SECRET_KEY or running `DEBUG = True` in production environments.
- **Root Cause:** Common mistaken assumptions during early development.
- **Fix / Best Practice:** Load secrets from environment variables and ensure `DEBUG = False` in production.

---

## Summary

You have mastered Django MVT architecture, ORM Models, and ForeignKey relations. Next week we explore the Migrations Engine and Django Admin customization.
