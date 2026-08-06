# Dasar Python & Sintaks

> **Kategori:** Python | **Level:** Pemula | **Minggu 1:** Dasar Python & Sintaks

## Tujuan Pembelajaran

- Memahami Python sebagai bahasa interpreted, dynamically typed (Python.org tutorial)
- Menjalankan file Python dengan python command dan IDE
- Mendeklarasikan variabel tanpa tipe eksplisit — duck typing
- Mengenal tipe data dasar: int, float, str, bool, None
- Menggunakan f-strings untuk string formatting modern

---

## Program: Halo, Python!

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

## Konsep Kunci

### Apa Itu Python
Python adalah bahasa interpreted, dynamically typed yang dibuat Guido van Rossum. Tidak perlu kompilasi — kode dijalankan baris per baris. Indentation (spasi) menentukan blok kode, bukan kurung kurawal.

### Variabel & Tipe Data
Tidak perlu deklarasi tipe: `x = 5` otomatis int. Python cek tipe saat runtime. Tipe dasar: `int`, `float`, `str`, `bool`, `None`.

### f-strings
`f"Hello {name}"` — cara modern formatting string di Python 3.6+. Lebih readable daripada `%` atau `.format()`.

### Multiple Assignment
`a, b = 10, 20` dan swap `a, b = b, a` — fitur elegan Python.

### Konversi Tipe
`int("42")`, `str(100)`, `float("3.14")` — konversi eksplisit antar tipe.

---

## Eksperimen

- Ubah nilai variabel dan lihat output berubah
- Coba type() pada berbagai variabel
- Buat konversi tipe: str ke float, int ke str
- Eksperimen dengan multiple assignment
- Buat program kecil gabungan 2-3 konsep

---

## Tantangan

Buat program konversi mata uang: input Rupiah, konversi ke USD, EUR, JPY. Gunakan f-strings dan konversi tipe.

---

## Ringkasan

Minggu 1 dari 12: **Dasar Python & Sintaks** (Level: Pemula). Python mudah dibaca dan ditulis. Minggu depan: **Data Types & Operasi**.
