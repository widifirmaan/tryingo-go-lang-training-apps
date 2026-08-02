# Functions Basics

> Python | Collections & Functions | Lesson 5

## Learning Objectives

- Define and call functions with def
- Distinguish parameters (def) from arguments (call)
- Use keyword arguments and default values
- Understand the difference between return and print

---

## Program: Functions Basics

```python
# ===== Definisi & pemanggilan =====
def sapa(nama):
    return f"Halo, {nama}!"

print(sapa("Ayu"))
print(sapa("Budi"))

# ===== Parameter vs Argument =====
# parameter = nama di def; argument = nilai saat dipanggil
def celsius_ke_fahrenheit(c):
    return c * 9 / 5 + 32

print(f"25C = {celsius_ke_fahrenheit(25)}F")

# ===== Keyword arguments =====
def perkenalan(nama, umur, kota):
    return f"{nama} ({umur}) dari {kota}"

print(perkenalan("Ayu", 26, "Jakarta"))                    # positional
print(perkenalan(kota="Bandung", umur=30, nama="Budi"))    # keyword, urutan bebas

# ===== Default values (wajib SETELAH non-default) =====
def sapa_v2(nama, sapaan="Halo"):
    return f"{sapaan}, {nama}!"

print(sapa_v2("Ayu"))
print(sapa_v2("Budi", "Selamat pagi"))

# ===== return vs print (perangkap klasik!) =====
def cetak_kuadrat(x):
    print(x * x)        # hanya menampilkan

def hasil_kuadrat(x):
    return x * x        # mengembalikan nilai

cetak_kuadrat(4)
nilai = hasil_kuadrat(4)
print(f"hasil_kuadrat(4) = {nilai}, bisa dipakai lagi: {nilai * 2}")

# print mengembalikan None:
x = print("ini print")
print(f"Nilai dari print: {x}")   # None!

# ===== Multiple returns =====
def min_max(data):
    return min(data), max(data)

daftar = [3, 8, 2, 9, 5]
terkecil, terbesar = min_max(daftar)
print(f"Min: {terkecil}, Max: {terbesar}")

```

---

## Explanation

## Parameters vs Arguments
Parameters are the names in the `def` line; arguments are the values passed at the call. This distinction matters for reading error messages (SkillWisor, bishrulhaq). Define once, call many times — DRY.

## Keyword & Defaults
`perkenalan(kota="Bandung", ...)` makes calls self-documenting. Default values make parameters optional — hard rule: parameters with defaults must come AFTER those without, or SyntaxError.

## return vs print
`print` displays; `return` hands a value back to the caller. Classic trap: `x = print("hi")` leaves `x` holding `None`! Functions that "compute" must return, not print (StackOverflow: "Forbid print() in functions").

## Multiple Returns
`return a, b` returns a tuple; `smallest, largest = ...` unpacks directly. This pattern is everywhere in the stdlib.

## Common Mistakes
Forgetting return (functions silently return None), calling a function without parentheses, `print(hasil_kuadrat)` (printing the function object, not the result).

---

## Experiments

1. **Parameter vs Argument**
2. **Keyword & Default**
3. **return vs print**
4. **Multiple Returns**
5. **Common Mistakes**

---

## Challenge

Create `hitung_imt(berat_kg, tinggi_m)` returning a tuple (imt, category) with the category from if/elif. Create `konversi_uang(jumlah, kurs)` with kurs defaulting to 16000. Refactor: move previous Challenge logic into functions.

---

## Summary

Functions: def, parameters vs arguments, keyword/defaults, return vs print, multiple returns. The foundation before OOP. Next: scope & lambda.
