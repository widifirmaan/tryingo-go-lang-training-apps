# Advanced Functions & Scope

> Python | Collections & Functions | Lesson 6

## Learning Objectives

- Understand local vs global scope and the LEGB rule
- Use *args and **kwargs
- Write good docstrings
- Use lambda as a tiny function
- Avoid the mutable default trap

---

## Program: Advanced Functions & Scope

```python
# ===== Scope: lokal vs global =====
total = 0                      # global scope

def hitung(angka):
    total = angka * 2          # LOKAL: tidak mengubah global
    return total

print(f"Hasil fungsi: {hitung(5)}")
print(f"Global total tetap: {total}")

# LEGB: Local -> Enclosing -> Global -> Built-in
def luar():
    pesan = "dari luar"
    def dalam():
        return pesan           # membaca dari Enclosing scope
    return dalam()

print(luar())

# ===== *args dan **kwargs =====
def jumlahkan(*args):
    return sum(args)

print(f"jumlahkan(1,2,3,4) = {jumlahkan(1, 2, 3, 4)}")

def profil(**kwargs):
    return ", ".join(f"{k}={v}" for k, v in kwargs.items())

print(profil(nama="Ayu", umur=26, kota="Jakarta"))

# ===== Docstrings =====
def luas_persegi(sisi):
    """Menghitung luas persegi.

    Parameter:
        sisi (int/float): panjang sisi.
    Return:
        Luas = sisi * sisi.
    """
    return sisi * sisi

print(f"Luas: {luas_persegi(4)}")
print(f"Docstring: {luas_persegi.__doc__.strip().splitlines()[0]}")

# ===== Lambda =====
produk = [("Keyboard", 750000), ("Monitor", 3200000), ("Hub", 250000)]
produk.sort(key=lambda item: item[1])   # urutkan by harga
print("Produk termurah dulu:", produk)

# ===== Perangkap: mutable default argument =====
def tambah_item_bug(item, daftar=[]):     # BUG: default dievaluasi SEKALI
    daftar.append(item)
    return daftar

def tambah_item_aman(item, daftar=None):
    if daftar is None:
        daftar = []
    daftar.append(item)
    return daftar

print("Bug:", tambah_item_bug("a"), tambah_item_bug("b"))
print("Aman:", tambah_item_aman("a"), tambah_item_aman("b"))

```

---

## Explanation

## Scope & LEGB
Names are resolved: Local -> Enclosing -> Global -> Built-in. Variables assigned inside a function are local — they do not change a same-named global (MOOC.fi Part 6 groups this with error handling). `global` exists, but the professional advice is blunt: don't.

## *args and **kwargs
`*args` packs extra positional arguments into a tuple; `**kwargs` keyword arguments into a dict. You will rarely write them, but constantly read them in libraries (print itself uses `*args`).

## Docstrings
`"""..."""` right after def: purpose, parameters, return. Not a regular comment — it becomes `__doc__` and tooling reads it. Access it with `help()`.

## Lambda
`lambda x: x * 2` = a single-expression anonymous function. Only for short callbacks (sort keys, filters). More than one line? Promote it to a `def` — readability wins. Functions are values: store them, pass them, return them.

## The Mutable Default Trap
Defaults are evaluated ONCE at definition time. `daftar=[]` is shared across calls — items mysteriously accumulate. The correct idiom: `daftar=None`, create the list inside.

---

## Experiments

1. **Scope & LEGB**
2. ***args dan **kwargs**
3. **Docstrings**
4. **Lambda**
5. **Perangkap: Mutable Default**

---

## Challenge

Write `rata_rata(*nilai)` (return the average, raise ValueError if empty), `filter_lebih_dari(daftar, ambang)` using lambda+filter, and refactor the earlier FizzBuzz into a `fizzbuzz(n)` function returning a list of results.

---

## Summary

Scope/LEGB, *args/**kwargs, docstrings, lambda, mutable default trap. Functions = values. Next: dictionaries, sets & comprehensions.
