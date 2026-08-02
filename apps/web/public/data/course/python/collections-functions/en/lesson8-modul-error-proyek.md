# Project: Modules & Error Handling + Contact Book

> Python | Collections & Functions | Lesson 8

## Learning Objectives

- Use import and from-import
- Know the stdlib: math, random, datetime
- Handle errors with try/except/else/finally
- Raise your own errors
- Build a Contact Book with dicts + functions

---

## Program: Project: Modules & Error Handling + Contact Book

```python
import math
import random
import datetime

# ===== Modul & stdlib =====
print(f"pi = {math.pi:.4f}")
print(f"sqrt(144) = {math.sqrt(144)}")
print(f"Random 1-10: {random.randint(1, 10)}")
print(f"Hari ini: {datetime.date.today()}")

from math import floor, ceil
print(f"floor(3.7) = {floor(3.7)}, ceil(3.2) = {ceil(3.2)}")

# ===== Error handling: baca traceback dulu! =====
# SyntaxError: salah ketik sintaks
# TypeError: tipe tidak cocok (mis. "5" + 5)
# NameError: nama belum didefinisikan

try:
    angka = int("tiga")          # ValueError!
except ValueError as err:
    print(f"Tertangkap: {err}")
finally:
    print("finally selalu jalan")

try:
    hasil = 10 / 0               # ZeroDivisionError
except ZeroDivisionError:
    print("Pembagian nol! Cek logika anda.")
else:
    print(f"Hasil: {hasil}")

# raising
def cek_umur(umur):
    if umur < 0:
        raise ValueError("Umur tidak boleh negatif")
    return umur

print(f"Umur valid: {cek_umur(25)}")

# ===== Contact Book (dictionary + functions) =====
kontak = {
    "Ayu": "0812-3456-7890",
    "Budi": "0813-9876-5432",
}

def tampilkan(kontak):
    if not kontak:
        print("(kontak kosong)")
    for nama, no in kontak.items():
        print(f"  {nama}: {no}")

def tambah(kontak, nama, no):
    kontak[nama] = no
    print(f"  '{nama}' ditambahkan.")

def cari(kontak, nama):
    no = kontak.get(nama)
    if no is None:
        print(f"  '{nama}' tidak ditemukan.")
    else:
        print(f"  {nama}: {no}")

print("\n=== Contact Book ===")
tampilkan(kontak)
tambah(kontak, "Citra", "0821-111-2222")
cari(kontak, "Citra")
cari(kontak, "Zainal")

```

---

## Explanation

## Modules & Imports
`import math` then `math.pi`; `from math import floor` for direct names. The stdlib is Python's "batteries included": math, random, datetime, json, csv, os (MOOC.fi Part 7). Your own modules come in Phase 4.

## Reading Tracebacks
Research (Springer 2023): SyntaxError = 29% of all beginner errors, then TypeError; only 35% of students understand tracebacks. Read from BOTTOM to top: last line = error type + message, above = location. "Finding and fixing bugs" is the biggest novice challenge (Lahtinen 2005) — so this skill is trained explicitly.

## try / except / else / finally
`try` holds risky code; `except` catches (specific first!); `else` runs when NO error; `finally` always runs (cleanup). Catch `ValueError`, never a bare `except:` that hides everything.

## raise
Raise your own errors when a contract is violated (`cek_umur(-1)`). An explicit error beats a silent bug. Used later in classes (phase 3) for balance validation.

## Common Mistakes
Bare except, catching then staying silent (a debugging nightmare), forgetting `as` in `except ValueError as err`, ignoring tracebacks, comparing after get() without a None check.

---

## Experiments

1. **Modul & Import**
2. **Membaca Traceback**
3. **try / except / else / finally**
4. **raise**
5. **Common Mistakes**

---

## Challenge

Turn the Contact Book into an interactive menu (input): 1=show, 2=add, 3=search, 4=delete, 0=exit. Validate: digits-only numbers (isdigit), no duplicate names (raise ValueError). Bonus: persist contacts to JSON (see Phase 3) and load on start.

---

## Summary

import/from, stdlib, bottom-up traceback reading, try/except/else/finally, raise. Contact Book: dicts + functions + validation. Next: file I/O.
