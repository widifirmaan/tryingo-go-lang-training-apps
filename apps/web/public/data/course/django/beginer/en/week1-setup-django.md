# Setup & Django Installation

> **Kategori:** Django | **Level:** Beginner | **Minggu 1:** Setup & Django Installation

## Learning Objectives

- Install Django via pip
- Understand Django folder structure
- manage.py CLI commands
- settings.py file
- MVT pattern

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
