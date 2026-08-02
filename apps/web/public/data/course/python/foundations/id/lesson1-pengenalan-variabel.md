# Pengenalan Python & Variabel

> Python | Foundasi Python | Pelajaran 1

## Tujuan Pembelajaran

- Memahami variabel sebagai label, bukan kotak
- Mengenal 4 tipe data dasar: int, float, str, bool
- Menulis output dengan f-strings
- Memahami reassignment dan arti tanda kutip

---

## Program: Pengenalan Python & Variabel

```python
# Variabel adalah LABEL yang menunjuk ke sebuah nilai.
# Variabel BUKAN "kotak" yang menampung banyak nilai sekaligus.

name = "Ayu"
age = 26
height = 1.65
is_learner = True

print("Halo,", name, "!")
print(f"Umur: {age} tahun | Tinggi: {height} m | Pelajar: {is_learner}")

# Ekspresi dievaluasi saat program berjalan
print(f"Tahun depan: {age + 1}")
print(f"Umur dalam bulan: {age * 12}")

# Reassignment: nilai lama DIGANTI, bukan ditumpuk
score = 10
print(f"Score awal: {score}")
score = 20
print(f"Score baru: {score}")

# Tipe data: int, float, str, bool
print(type(42))     # <class 'int'>
print(type(3.14))   # <class 'float'>
print(type("42"))   # <class 'str'>  -- tanda kutip = string!
print(type(True))   # <class 'bool'>

```

---

## Penjelasan

## Variabel = Label, Bukan Kotak
Riset misconception (Cabo, n=108) menemukan 37% pemula percaya variabel bisa menyimpan beberapa nilai sekaligus, dan 34% percaya nilai tidak bisa diganti. Faktanya: `score = 10` lalu `score = 20` — variabel menunjuk ke satu nilai; nilai lama diganti, tidak pernah menumpuk.

## Tipe Data
`int` (bilangan bulat), `float` (desimal), `str` (teks), `bool` (True/False). Gunakan `type()` untuk memeriksa. 46% pemula salah membedakan `"2.5"` (string!) dengan `2.5` (float) — tanda kutip menentukan tipe.

## f-strings
`f"..."` dengan `{ekspresi}` adalah satu-satunya cara format yang diajarkan di track ini (StackOverflow: "show only one method, stick to it"). Hindari `+` berantai dan legacy `%`/`.format()`.

## Reassignment & Komentar
Nama variabel case-sensitive dan harus deskriptif (`is_learner` bukan `x`). Komentar `#` menjelaskan "mengapa", bukan "apa".

---

## Eksperimen

1. **Variabel = Label, Bukan Kotak**
2. **Tipe Data**
3. **f-strings**
4. **Reassignment & Komentar**

---

## Tantangan

Buat profil singkat dengan 4 variabel (str, int, float, bool) dan tampilkan dengan f-strings. Lalu prediksi output sebelum menjalankan: (1) `a = 5; a = a + 3; print(a)`, (2) `b = "5"; print(b + 3)` — jelaskan kenapa (2) error (TypeError).

---

## Ringkasan

Variabel = label ke satu nilai. 4 tipe dasar + type(). f-strings untuk output. Reassignment mengganti, tidak menumpuk. Lanjut: tipe data & kondisi.
