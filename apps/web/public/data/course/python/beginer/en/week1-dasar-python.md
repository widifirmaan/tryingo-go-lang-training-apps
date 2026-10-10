# Python Basics & Syntax

> **Kategori:** Python | **Level:** Beginner | **Minggu 1:** Python Basics & Syntax

## Learning Objectives

- Understand Python as an interpreted, dynamically typed language (Python.org tutorial)
- Run Python files with python command and IDE
- Declare variables without explicit types — duck typing
- Learn basic data types: int, float, str, bool, None
- Use f-strings for modern string formatting

---

## Quick Start Guide: Setup & Project Initialization

Before exploring the lesson theory and code examples below, set up your local development environment with these step-by-step instructions:

### 1. VS Code Setup & Recommended Extensions
Use [Visual Studio Code](https://code.visualstudio.com/) as your primary code editor. Install these essential extensions:
- **Python for VS Code** (`ms-python.python`): Official Python support: debugger, linter, and autocomplete
- **Ruff** (`charliermarsh.ruff`): Ultra-fast Rust-based Python linter and formatter

Or install all recommended extensions at once via terminal:
```bash
code --install-extension ms-python.python --install-extension charliermarsh.ruff
```

---

### 2. Runtime & Dependency Installation (Python 3.12+)
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
python --version || python3 --version
```

Expected output:
```output
Python 3.12.x
```

> 💡 **Prerequisite Note:** Ensure "Add python.exe to PATH" is checked when using the Windows graphical installer.

---

### 3. Initializing a Blank Project (Scaffolding)
Generate a brand-new project workspace using the official CLI command:

```bash
mkdir my-python-app && cd my-python-app
python -m venv .venv
# Windows: .venv\Scripts\activate
# macOS/Linux: source .venv/bin/activate
```
- **Details:** The virtual environment isolates project packages from global system packages.
- **Navigate to the project directory:**
```bash
cd my-python-app
```

---

### 4. Running the Local Dev Server & First Entry File
Start your local development server:

```bash
python main.py
```
Open in browser or terminal: `Terminal Console`

> ℹ️ Code runs immediately via the Python interpreter.

**Initial Entry File (`main.py`):**
```py
import sys
from datetime import datetime

def greet(name: str) -> str:
    now = datetime.now().strftime("%Y-%m-%d %H:%M:%S")
    return f"🐍 Halo {name}! Waktu server: {now} (Python {sys.version.split()[0]})"

if __name__ == "__main__":
    print(greet("Developer"))
```
Python script utilizing modern type annotations and datetime.

---

### 5. New Project Directory Structure
Standard directory layout and file anatomy created by the scaffolder:

```text
my-python-app/
├── .venv/               # Virtual environment isolasi package
├── src/
│   └── main.py          # Entrypoint program
├── requirements.txt     # Daftar package dependensi
└── pyproject.toml       # Metadata konfigurasi modern
```
Modern Python project layout featuring venv isolation.

---

### 6. Beginner Tips & Best Practices
- Run `pip freeze > requirements.txt` to lock project dependencies.
- Try `uv` (`pip install uv`) as an ultra-fast drop-in replacement for standard pip.

---

## Program: Hello, Python!

```python

# Dasar Python & Sintaks
print("Selamat datang di Python!")
print("Python adalah bahasa interpreted, dynamically typed.")

# Variabel — tidak perlu deklarasi tipe
nama = "Pyverse"
versi = 3.12
aktif = True
tahun = 2024

# f-strings untuk formatting
print(f"Nama: {nama}")
print(f"Versi: {versi}")
print(f"Aktif: {aktif}")
print(f"Tahun: {tahun}")

# Tipe data dengan type()
print(f"\nTipe variabel:")
print(f"nama: {type(nama).__name__}")
print(f"versi: {type(versi).__name__}")
print(f"aktif: {type(aktif).__name__}")
print(f"tahun: {type(tahun).__name__}")

# Multiple assignment
x, y, z = 10, 20, 30
print(f"\nx={x}, y={y}, z={z}")

# Swap tanpa variabel temporary
a, b = 5, 10
a, b = b, a
print(f"Setelah swap: a={a}, b={b}")

# Konversi tipe
angka_str = "42"
angka_int = int(angka_str)
angka_float = float(angka_str)
print(f"\nKonversi: '{angka_str}' -> int={angka_int}, float={angka_float}")
    
```

---

## Key Concepts

### What is Python
Interpreted, dynamically typed language by Guido van Rossum. No compilation needed — code runs line by line. Indentation defines code blocks.

### Variables & Types
No type declaration needed: `x = 5` is auto int. Basic types: `int`, `float`, `str`, `bool`, `None`.

### f-strings
`f"Hello {name}"` — modern string formatting in Python 3.6+.

### Multiple Assignment
`a, b = 10, 20` and swap `a, b = b, a`.

### Type Conversion
`int("42")`, `str(100)`, `float("3.14")` — explicit type conversion.

---

## Experiments

- Change variable values and observe output
- Try type() on different variables
- Create type conversions: str to float, int to str
- Experiment with multiple assignment
- Build a small program combining 2-3 concepts

---

## Challenge

Build a currency converter: input Rupiah, convert to USD, EUR, JPY. Use f-strings and type conversion.

---

## Summary

Week 1 of 12: **Python Basics & Syntax** (Level: Beginner). Python is readable and writable. Next week: **Data Types & Operations**.
