# Python Basics & Syntax

> **Kategori:** Python | **Level:** Beginner | **Minggu 1:** Python Basics & Syntax

## Learning Objectives

- Understand Python as an interpreted, dynamically typed language (Python.org tutorial)
- Run Python files with python command and IDE
- Declare variables without explicit types — duck typing
- Learn basic data types: int, float, str, bool, None
- Use f-strings for modern string formatting

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
