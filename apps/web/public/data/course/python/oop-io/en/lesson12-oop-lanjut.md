# Advanced OOP & Special Methods

> Python | OOP & I/O | Lesson 12

## Learning Objectives

- Understand references, aliasing, and copying
- Apply encapsulation with _private and @property
- Use inheritance and super()
- Implement __str__ and __eq__
- Judge when NOT to use classes

---

## Program: Advanced OOP & Special Methods

```python
# ===== Objects & References (riset Glasgow: hanya 2% benar!) =====
a = [1, 2, 3]
b = a                  # alias: b dan a menunjuk OBJEK yang sama
b.append(4)
print(f"a = {a}  (ikut berubah! alias, bukan salinan)")
c = a.copy()           # salinan: objek baru
c.append(5)
print(f"a = {a}, c = {c}")

# ===== Encapsulation: _private + @property =====
class Akun:
    def __init__(self, nama, saldo):
        self.nama = nama
        self._saldo = saldo        # konvensi: internal

    @property
    def saldo(self):
        return self._saldo

    def setor(self, jumlah):
        if jumlah <= 0:
            raise ValueError("Harus positif")
        self._saldo += jumlah

# ===== Inheritance + super =====
class Tabungan(Akun):
    def __init__(self, nama, saldo, bunga_persen=5):
        super().__init__(nama, saldo)   # panggil parent
        self.bunga_persen = bunga_persen

    def bulanan(self):
        bunga = self._saldo * self.bunga_persen / 100
        self._saldo += bunga
        return bunga

tabungan = Tabungan("Ayu", 1000000)
print(f"Saldo awal: {tabungan.saldo}")
print(f"Bunga bulan ini: {tabungan.bulanan():.0f}")
print(f"Saldo baru: {tabungan.saldo}")

# ===== Special methods: __str__, __eq__ =====
class Produk:
    def __init__(self, nama, harga):
        self.nama = nama
        self.harga = harga

    def __str__(self):
        return f"{self.nama} (Rp {self.harga:,})"

    def __eq__(self, lain):
        return isinstance(lain, Produk) and self.nama == lain.nama and self.harga == lain.harga

p1 = Produk("Keyboard", 750000)
p2 = Produk("Keyboard", 750000)
print(str(p1))                    # pakai __str__
print(f"p1 == p2: {p1 == p2}")    # pakai __eq__

# ===== Kapan TIDAK memakai class (Real Python) =====
# Data-only -> dataclass/namedtuple/dict
# Satu method -> fungsi biasa

```

---

## Explanation

## References & Aliasing
`b = a` creates two names pointing at the SAME object — `b.append(4)` changes a too! Glasgow research 2020: only 2% of students correctly distinguished `a + b`, `a.append(b)`, `a += b`. This is a threshold concept: use `.copy()` for copies, understand `is` vs `==`. MOOC.fi Part 9 places "Objects and References" before advanced OOP material.

## Encapsulation
Python has no true private — the convention: `_saldo` = "internal, don't touch". `@property` wraps an attribute with a method (getter) without changing the caller API. Its purpose: control (validation), not security (datafield.dev).

## Inheritance & super
`class Tabungan(Akun)` inherits the parent's attributes + methods. `super().__init__(...)` calls the parent constructor before your own logic (MOOC.fi order: P9 references -> P10 hierarchies). Child methods override parent ones; `super()` calls the parent version.

## Special Methods
`__str__` for print/display, `__eq__` for == (default: identity!). `__repr__`, `__len__`, `__lt__` come when needed. "Dunder" methods integrate objects with built-in operators.

## When NOT to Use Classes
Real Python/datafield: data-only -> dataclass/namedtuple/dict; single method -> function. OOP for "things" (nouns: Student, BankAccount, Produk); procedural for operations (verbs: calculate, parse). Most real Python = a healthy mix.

---

## Experiments

1. **References & Aliasing**
2. **Encapsulation**
3. **Inheritance & super**
4. **Special Methods**
5. **Kapan TIDAK Pakai Class**

---

## Challenge

Create a `KoleksiBuku` class with `__str__` (content list) and `__eq__` (same contents). Add inheritance `BukuDigital(KoleksiBuku)` with a file-size field. Bonus: prevent shared mutation (aliasing) by returning `list.copy()` from the getter.

---

## Summary

References & aliasing (2%), encapsulation via _/@property, inheritance+super, __str__/__eq__, when not to use classes. Next: venv & pip.
