# Python Basics & Syntax

## Why This Matters

Python is the friendliest first language yet reaches into AI/data science, automation, and backends. It is the one language that appears in nearly every field - the most versatile learning investment.

Practice program: *"Hello, Python!"*. Run the code in the Playground to examine how it works.


## Learning Objectives

- Understand Python as an interpreted, dynamically typed language (Python.org tutorial)
- Run Python files with python command and IDE
- Declare variables without explicit types - duck typing
- Learn basic data types: int, float, str, bool, None
- Use f-strings for modern string formatting


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

### 1. Runtime & Dependency Installation (Python 3.12+)
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

> **Prerequisite Note:** Ensure "Add python.exe to PATH" is checked when using the Windows graphical installer.

---

### 2. Initializing a Blank Project (Scaffolding)
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

### 3. Running the Local Dev Server & First Entry File
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
    return f"Halo {name}! Waktu server: {now} (Python {sys.version.split()[0]})"

if __name__ == "__main__":
    print(greet("Developer"))
```
Python script utilizing modern type annotations and datetime.

---

### 4. New Project Directory Structure
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

### 5. Beginner Tips & Best Practices
- Run `pip freeze > requirements.txt` to lock project dependencies.
- Try `uv` (`pip install uv`) as an ultra-fast drop-in replacement for standard pip.

---

## Program: Hello, Python!

```python

# Dasar Python & Sintaks
print("Selamat datang di Python!")
print("Python adalah bahasa interpreted, dynamically typed.")

# Variabel - tidak perlu deklarasi tipe
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
Interpreted, dynamically typed language by Guido van Rossum. No compilation needed - code runs line by line. Indentation defines code blocks.

### Variables & Types
No type declaration needed: `x = 5` is auto int. Basic types: `int`, `float`, `str`, `bool`, `None`.

### f-strings
`f"Hello {name}"` - modern string formatting in Python 3.6+.

### Multiple Assignment
`a, b = 10, 20` and swap `a, b = b, a`.

### Type Conversion
`int("42")`, `str(100)`, `float("3.14")` - explicit type conversion.

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

> **Playground tip:** the browser playground cannot receive typed input, so write the value directly into a variable, e.g. `rupiah = 250000`, then perform the conversion. When running locally in a terminal/IDE, feel free to use `int(input())` to ask the user for input.

---

## Summary

Week 1 of 12: **Python Basics & Syntax** (Level: Beginner). Python is readable and writable. Next week: **Data Types & Operations**.
