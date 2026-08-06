# Functions & Modules

> **Kategori:** Python | **Level:** Beginner | **Minggu 4:** Functions & Modules

## Learning Objectives

- Create functions with def, parameters, and return values
- Default parameters, *args, **kwargs for flexibility
- Lambda functions for one-line operations
- Built-in functions: map, filter, sorted, sum, max, min
- Import modules: import, from...import, alias

---

## Program: Modular Calculator

```python

# Functions & Modules
import math
import random
from datetime import datetime

# Basic Function
def sapa(nama, greeting="Halo"):
    """Sapa orang dengan greeting yang bisa dikustomisasi."""
    return f"{greeting}, {nama}!"

# Multiple Return Values
def hitung(a, b):
    """Return jumlah, selisih, kali, bagi."""
    return a + b, a - b, a * b, a / b if b != 0 else None

# *args dan **kwargs
def tampilkan(*args, **kwargs):
    print(f"Positional: {args}")
    print(f"Keyword: {kwargs}")

# Lambda Function
kuadrat = lambda x: x ** 2
pangkat = lambda a, b: a ** b

# Decorator Sederhana
def timer(func):
    def wrapper(*args, **kwargs):
        start = datetime.now()
        result = func(*args, **kwargs)
        elapsed = (datetime.now() - start).total_seconds()
        print(f"{func.__name__} took {elapsed:.4f}s")
        return result
    return wrapper

@timer
def jumlahkan(n):
    return sum(range(n))

# Main Program
print("=== Functions ===")
print(sapa("Budi"))
print(sapa("Siti", "Selamat pagi"))

print("\n=== Multiple Returns ===")
j, s, k, b = hitung(10, 3)
print(f"Jumlah: {j}, Selisih: {s}, Kali: {k}, Bagi: {b:.2f}")

print("\n=== *args & **kwargs ===")
tampilkan(1, 2, 3, nama="Budi", umur=25)

print("\n=== Lambda ===")
print(f"Kuadrat 5: {kuadrat(5)}")
print(f"2 pangkat 10: {pangkat(2, 10)}")

print("\n=== Built-in Functions ===")
angka = [3, 1, 4, 1, 5, 9, 2, 6]
print(f"List: {angka}")
print(f"Sorted: {sorted(angka)}")
print(f"Reversed: {sorted(angka, reverse=True)}")
print(f"Sum: {sum(angka)}")
print(f"Max: {max(angka)}, Min: {min(angka)}")
print(f"Map (x2): {list(map(lambda x: x*2, angka))}")
print(f"Filter (genap): {list(filter(lambda x: x%2==0, angka))}")

print("\n=== Math Module ===")
print(f"Pi: {math.pi:.6f}")
print(f"Sqrt(144): {math.sqrt(144)}")
print(f"Faktorial(5): {math.factorial(5)}")

print("\n=== Decorator ===")
hasil = jumlahkan(1000000)
print(f"Hasil: {hasil}")
    
```

---

## Key Concepts

### Basic Functions
`def name(params):` with docstring. Return multiple values -> tuple.

### Flexible Parameters
`*args` = positional tuple. `**kwargs` = keyword dict. Default: `def f(x=10)`.

### Lambda
Anonymous one-line functions.

### Built-in Functions
`map`, `filter`, `sorted`, `sum`, `enumerate`, `zip`.

### Import Modules
Various import styles.

### Decorators
Functions wrapping other functions.

---

## Experiments

- Create functions with different parameter types
- Try map and filter with lambda
- Build your own decorator: @debug, @cache
- Experiment with zip and enumerate
- Create your own module and import it

---

## Challenge

Build your own math library: functions for factorial, fibonacci, prime check, GCD, LCM. Use docstrings and type hints.

---

## Summary

Week 4 of 12: **Functions & Modules** (Level: Beginner). Beginner phase complete! Next week: **Collections** (Intermediate).
