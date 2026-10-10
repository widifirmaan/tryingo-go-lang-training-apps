# Setup & Django Installation

> **Kategori:** Django | **Level:** Beginner | **Minggu 1:** Setup & Django Installation

## Learning Objectives

- Install Django via pip
- Understand Django folder structure
- manage.py CLI commands
- settings.py file
- MVT pattern

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

## Program: First Project

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

## Key Concepts

### Installation
`pip install django`, then `django-admin startproject name`.

### Folder Structure
- `myproject/` - Project config
- `app/` - Application code
- `manage.py` - CLI tool

### MVT Pattern
- Model: data & database
- View: business logic
- Template: presentation

---

## Experiments

- Install Django and create project
- Explore each file
- Try manage.py shell
- Create new app
- View settings.py

---

## Challenge

Create a new Django project with 1 app. Create a simple home page.

---

## Summary

Week 1 of 12: **Setup & Django Installation** (Level: Beginner). Next week: **Models & ORM**.
