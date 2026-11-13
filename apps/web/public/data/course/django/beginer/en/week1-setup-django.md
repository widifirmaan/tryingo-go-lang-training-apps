# Setup & Django Installation

## Why This Matters

Django is used by Instagram, Spotify, and countless startups because it is "batteries included": admin panel, auth, ORM - all provided. Your time goes to features, not to wiring up tooling.

Practice program: *"First Project"*. Run the code in the Playground to examine how it works.


## Learning Objectives

- Install Django via pip
- Understand Django folder structure
- manage.py CLI commands
- settings.py file
- MVT pattern


## Foundations: Before Writing Code

This section is for readers who are **completely new** to programming. The concepts are identical across every language - learn them once, use them forever.

- **Files & folders = where programs live.** A program is plain text saved in a file (e.g. `lesson.md`). Files have **extensions** that indicate the language: `.md`, `.go`, `.py`, `.html`. A folder holding all of a program's files is called a **project**.
- **Terminal / command line.** A text window where you type commands: `cd folder` (change folder), `ls` / `dir` (list contents), `go run main.go` (run a program). Programs run from the folder containing their files.
- **Compiled vs interpreted.** **Compiled** languages (Go, Rust, C#) translate the whole program into machine instructions before running - fast, but require a build step. **Interpreted** languages (Python, PHP, JavaScript) execute line by line directly - great for learning and quick prototypes. The playgrounds on this site execute code **inside your browser**, so no installation is needed.
- **Statically typed vs dynamically typed.** **Statically typed** languages (Go, Rust, TypeScript) check data types (numbers, text) while you write - errors surface early. **Dynamically typed** languages (Python, PHP, JavaScript) check types while the program runs - more lenient, but errors appear at runtime.
- **How to read error messages.** Read the last line first: the error type plus a short explanation, then locate the **line number** it mentions. Errors are not tragedies - they are the computer telling you what to fix.
- **REPL / playground.** A REPL (Read-Eval-Print Loop) is a code "calculator": type one line, see the result instantly. Every code block on this site has a **Try in Playground** button letting you tweak and run the code live - the fastest way to learn: change a little, run, observe the difference.

> **Important note:** the browser playground has limitations - it cannot receive interactive keyboard input (stdin). If a challenge asks for "user input", simply write the value directly into a variable (e.g. `let name = "Budi"`; `rupiah = 250000`) and run.

---

---

## Quick Start Guide: Setup & Project Initialization

> **Try it directly in the browser without local setup.** All code blocks can run directly in the Playground.

Before exploring the lesson theory and code examples below, set up your local development environment with these step-by-step instructions:

### 1. Runtime & Dependency Installation (Python 3.12+ & pip)
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

> **Prerequisite Note:** Always activate your virtual environment before running pip install django.

---

### 2. Initializing a Blank Project (Scaffolding)
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

### 3. Running the Local Dev Server & First Entry File
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

### 4. New Project Directory Structure
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

### 5. Beginner Tips & Best Practices
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
