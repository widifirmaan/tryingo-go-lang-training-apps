# Proyek: Modul & Error Handling + Contact Book

> Python | Koleksi & Fungsi | Pelajaran 8

## Tujuan Pembelajaran

- Menggunakan import dan from-import
- Mengenal stdlib: math, random, datetime
- Menangani error dengan try/except/else/finally
- Melempar error sendiri dengan raise
- Membangun Contact Book dengan dict + fungsi

---

## Program: Proyek: Modul & Error Handling + Contact Book

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

## Penjelasan

## Modul & Import
`import math` lalu `math.pi`; `from math import floor` untuk nama langsung. Stdlib = "baterai bawaan" Python: math, random, datetime, json, csv, os (MOOC.fi Part 7). Modul sendiri dipelajari di Phase 4.

## Membaca Traceback
Riset (Springer 2023): SyntaxError = 29% semua error pemula, lalu TypeError; hanya 35% siswa paham isi traceback. Baca dari BAWAH ke atas: baris terakhir = jenis error + pesan, di atasnya = lokasi. "Finding and fixing bugs" = tantangan terbesar pemula (Lahtinen 2005) — jadi keahlian ini dilatih eksplisit.

## try / except / else / finally
`try` blok berisiko; `except` menangkap (spesifik dulu!); `else` jalan saat TANPA error; `finally` selalu jalan (untuk cleanup). Tangkap `ValueError`, jangan `except:` telanjang yang menyembunyikan semua error.

## raise
Lempar error sendiri saat kontrak dilanggar (`cek_umur(-1)`). Error yang eksplisit > bug yang diam. Nanti dipakai di kelas (phase 3) untuk validasi saldo.

## Common Mistakes
Except telanjang, menangkap lalu diam (debugging mimpi buruk), `except ValueError as err` lupa as, mengabaikan traceback, membandingkan dengan `==` setelah get() tanpa cek None.

---

## Eksperimen

1. **Modul & Import**
2. **Membaca Traceback**
3. **try / except / else / finally**
4. **raise**
5. **Common Mistakes**

---

## Tantangan

Ubah Contact Book jadi menu interaktif (input): 1=tampilkan, 2=tambah, 3=cari, 4=hapus, 0=keluar. Validasi: nomor hanya angka (isdigit), nama tidak duplikat (lemparkan ValueError). Bonus: simpan kontak ke file JSON (lihat Phase 3) dan muat saat start.

---

## Ringkasan

import/from, stdlib, baca traceback bottom-up, try/except/else/finally, raise. Contact Book: dict + fungsi + validasi. Lanjut: file I/O.
