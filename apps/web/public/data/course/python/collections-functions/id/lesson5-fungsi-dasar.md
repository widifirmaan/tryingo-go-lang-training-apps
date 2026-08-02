# Fungsi Dasar

> Python | Koleksi & Fungsi | Pelajaran 5

## Tujuan Pembelajaran

- Mendefinisikan dan memanggil fungsi dengan def
- Membedakan parameter (def) dan argument (call)
- Menggunakan keyword arguments dan default values
- Memahami perbedaan return dan print

---

## Program: Fungsi Dasar

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

## Penjelasan

## Parameter vs Argument
Parameter = nama di baris `def`; argument = nilai saat dipanggil. Perbedaan ini penting untuk membaca error message (SkillWisor, bishrulhaq). Fungsi didefinisikan sekali, dipanggil berkali-kali — DRY.

## Keyword & Default
`perkenalan(kota="Bandung", ...)` membuat pemanggilan self-documenting. Default value membuat parameter opsional — aturan wajib: parameter ber-default harus SETELAH yang tanpa default, atau SyntaxError.

## return vs print
`print` menampilkan; `return` menyerahkan nilai ke pemanggil. Perangkap klasik: `x = print("hi")` membuat `x` berisi `None`! Fungsi yang "menghitung" harus return, bukan print (StackOverflow: "Forbid print() in functions").

## Multiple Returns
`return a, b` mengembalikan tuple; `terkecil, terbesar = ...` unpacking langsung. Pola ini dipakai di mana-mana di stdlib.

## Common Mistakes
Lupa return (fungsi mengembalikan None diam-diam), memanggil fungsi tanpa kurung, `print(hasil_kuadrat)` (mencetak objek fungsi, bukan hasil).

---

## Eksperimen

1. **Parameter vs Argument**
2. **Keyword & Default**
3. **return vs print**
4. **Multiple Returns**
5. **Common Mistakes**

---

## Tantangan

Buat fungsi `hitung_imt(berat_kg, tinggi_m)` mengembalikan tuple (imt, kategori) dengan kategori dari if/elif. Buat fungsi `konversi_uang(jumlah, kurs)` dengan default kurs 16000. Refactor: semua logika di Challenge sebelumnya dipindah ke fungsi.

---

## Ringkasan

Fungsi: def, parameter vs argument, keyword/default, return vs print, multiple returns. Fondasi sebelum OOP. Lanjut: scope & lambda.
