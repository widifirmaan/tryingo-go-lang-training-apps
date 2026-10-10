# Functions & Modules

> **Kategori:** Python | **Level:** Pemula | **Minggu 4:** Functions & Modules

## Tujuan Pembelajaran

- Membuat function dengan def, parameter, dan return value
- Default parameter, *args, **kwargs untuk fleksibilitas
- Lambda function untuk operasi satu baris
- Built-in functions: map, filter, sorted, sum, max, min
- Import module: import, from...import, alias

---

## Program: Kalkulator Modular

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

## Konsep Kunci

### Function Dasar
`def nama(params):` dengan docstring `"""..."""`. Return multiple values -> tuple.

### Parameter Fleksibel
`*args` = tuple positional args. `**kwargs` = dict keyword args. Default: `def f(x=10)`.

### Lambda
`lambda x: x**2` — function anonymous satu baris. Cocok untuk callback.

### Built-in Functions
`map(func, list)`, `filter(func, list)`, `sorted(list)`, `sum()`, `enumerate()`, `zip()`.

### Import Module
`import math`, `from datetime import datetime`, `import numpy as np`.

### Decorator
Function yang membungkus function lain. `@timer` syntax sugar.

---

## Eksperimen

- Buat function dengan berbagai tipe parameter
- Coba map dan filter dengan lambda
- Buat decorator sendiri: @debug, @cache
- Eksperimen dengan zip dan enumerate
- Buat module sendiri dan import

---

## Tantangan

Buat library matematika sendiri: function untuk faktorial, fibonacci, prima check, GCD, LCM. Gunakan docstring dan type hints.

---

## Ringkasan

Minggu 4 dari 12: **Functions & Modules** (Level: Pemula). Selesai fase Beginner! Minggu depan: **Collections** (Intermediate).
