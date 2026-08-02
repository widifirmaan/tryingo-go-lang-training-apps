# Classes & Objects

> Python | OOP & I/O | Lesson 11

## Learning Objectives

- Use objects/methods before defining classes
- Define classes with __init__ and self
- Distinguish instance vs class attributes
- Write validating methods (raise)

---

## Program: Classes & Objects

```python
# ===== Memakai method object dulu (dot-notation) =====
kata = "tryngo"
print(f"method: {kata.upper()}")
angka = [3, 1, 2]
angka.sort()
print(f"method: {angka}")
# .append(), .split(), .strip() -- kamu sudah memakai object sejak awal!
# (MOOC.fi Part 8: "objects and methods" DULU, definisi kelas belakangan)

# ===== Mendefinisikan kelas =====
class RekeningBank:
    """Contoh standar industri (Scaler): simpanan bank."""
    mata_uang = "IDR"            # class attribute: dibagi semua instance

    def __init__(self, pemilik, saldo=0):
        self.pemilik = pemilik    # instance attribute: unik per objek
        self.saldo = saldo

    def setor(self, jumlah):
        if jumlah <= 0:
            raise ValueError("Jumlah setoran harus positif")
        self.saldo += jumlah
        return self.saldo

    def tarik(self, jumlah):
        if jumlah > self.saldo:
            raise ValueError("Saldo tidak cukup")
        self.saldo -= jumlah
        return self.saldo

    def info(self):
        return f"{self.pemilik}: Rp {self.saldo:,} ({self.mata_uang})"

# Instansiasi = memanggil kelas seperti fungsi
rekening_ayu = RekeningBank("Ayu", 500000)
rekening_budi = RekeningBank("Budi")          # saldo default 0

print(rekening_ayu.info())
rekening_ayu.setor(150000)
print(f"Setelah setor: {rekening_ayu.info()}")
rekening_ayu.tarik(200000)
print(f"Setelah tarik: {rekening_ayu.info()}")
print(rekening_budi.info())

# Class attribute dibagi; instance attribute unik
print(f"Semua pakai mata uang yang sama: {rekening_ayu.mata_uang}")

# Perangkap: tarik lebih besar dari saldo -> ValueError
try:
    rekening_budi.tarik(999999)
except ValueError as err:
    print(f"Tertangkap: {err}")

```

---

## Explanation

## Objects & Methods: You Already Know Them
`kata.upper()`, `angka.sort()`, `teks.split()` — you have been using objects & methods since Lesson 4. MOOC.fi teaches "Objects and Methods" as Part 8 FIRST, before class definitions: dot-notation is the prerequisite. ACM research ("Some Trouble with Transparency") found the biggest beginner OOP error = forgetting `self` — rooted in unmastered dot-notation.

## class, __init__, self
`class` = the blueprint; `__init__` initializes each new instance (the constructor); `self` = the instance reference when a method is called — always the first parameter (a convention, not a keyword; don't rename). Instantiation = `RekeningBank("Ayu", 500000)`.

## Instance vs Class Attributes
Instance attributes (`self.saldo`) are unique per object — defined in `__init__` (not in the class body, except immutable defaults). Class attributes (`mata_uang`) are shared by all instances. Boot.dev's trap: a mutable class attribute is the class version of the mutable default bug.

## Methods & Validation
Methods are functions inside a class operating on `self`. `setor`/`tarik` validate then raise ValueError — a strict contract (continuing L8). "Data + behavior travel together" = the main reason for OOP.

## Common Mistakes: self
Forgetting `self` as the first parameter, forgetting `self.` when accessing attributes, defining instance attributes outside `__init__`, calling methods without parentheses. This is the #1 beginner OOP error (ACM 2016).

---

## Experiments

1. **Object & Method: Sudah Kamu Kenal**
2. **class, __init__, self**
3. **Instance vs Class Attribute**
4. **Method & Validasi**
5. **Common Mistakes: self**

---

## Challenge

Create a `Produk` class (nama, harga, stok) with `jual(jumlah)` (validate sufficient stock), `restok(jumlah)`, and `info()`. Create 3 products, run transactions, and list products with low stock (< 5).

---

## Summary

Objects/methods first, classes later. __init__ + self, instance vs class attributes, validating methods. The self trap. Next: references & inheritance.
