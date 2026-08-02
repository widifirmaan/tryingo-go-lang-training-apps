# OOP Lanjutan & Special Methods

> Python | OOP & I/O | Pelajaran 12

## Tujuan Pembelajaran

- Memahami references, aliasing, dan copying
- Menerapkan encapsulation dengan _private dan @property
- Menggunakan inheritance dan super()
- Mengimplementasikan __str__ dan __eq__
- Menilai kapan TIDAK memakai class

---

## Program: OOP Lanjutan & Special Methods

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

## Penjelasan

## References & Aliasing
`b = a` membuat dua nama menunjuk OBJEK yang sama — `b.append(4)` mengubah a juga! Riset Glasgow 2020: hanya 2% mahasiswa benar membedakan `a + b`, `a.append(b)`, `a += b`. Ini threshold concept: gunakan `.copy()` untuk salinan, pahami `is` vs `==`. MOOC.fi Part 9 menempatkan "Objects and References" sebelum materi OOP lanjutan.

## Encapsulation
Python tidak punya private sejati — konvensi: `_saldo` = "internal, jangan disentuh". `@property` membungkus attribute dengan method (getter) tanpa mengubah API pemanggil. Tujuannya: kendali (validasi), bukan keamanan (datafield.dev).

## Inheritance & super
`class Tabungan(Akun)` mewarisi attribute + method parent. `super().__init__(...)` memanggil constructor parent sebelum logika sendiri (urutan MOOC.fi: P9 references -> P10 hierarchies). Method di child override method parent; `super()` untuk memanggil versi parent.

## Special Methods
`__str__` untuk print/display, `__eq__` untuk == (default: identity!). `__repr__`, `__len__`, `__lt__` menyusul saat perlu. "Dunder" methods = integrasi objek dengan operator built-in.

## Kapan TIDAK Pakai Class
Real Python/datafield: data-only -> dataclass/namedtuple/dict; satu method -> fungsi. OOP untuk "benda" (noun: Student, BankAccount, Produk); prosedural untuk operasi (verb: calculate, parse). Kebanyakan program Python = campuran sehat.

---

## Eksperimen

1. **References & Aliasing**
2. **Encapsulation**
3. **Inheritance & super**
4. **Special Methods**
5. **Kapan TIDAK Pakai Class**

---

## Tantangan

Buat kelas `KoleksiBuku` dengan `__str__` (daftar isi) dan `__eq__` (isi sama). Tambah inheritance `BukuDigital(KoleksiBuku)` dengan field ukuran_file. Bonus: cegah mutasi bersama (aliasing) dengan mengembalikan `list.copy()` dari getter.

---

## Ringkasan

References & aliasing (2%), encapsulation via _/@property, inheritance+super, __str__/__eq__, kapan tidak pakai class. Lanjut: venv & pip.
