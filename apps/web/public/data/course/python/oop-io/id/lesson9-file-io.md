# File I/O & Data

> Python | OOP & I/O | Pelajaran 9

## Tujuan Pembelajaran

- Membaca dan menulis file teks dengan with
- Membaca file per baris
- Menggunakan pathlib untuk path aman
- Menyimpan dan memuat JSON
- Membaca/menulis CSV dengan csv module

---

## Program: File I/O & Data

```python
import json
import csv
from pathlib import Path

# ===== Menulis & membaca file teks =====
with open("catatan.txt", "w", encoding="utf-8") as f:
    f.write("baris pertama\n")
    f.write("baris kedua\n")

with open("catatan.txt", "r", encoding="utf-8") as f:
    isi = f.read()
print("Isi file:")
print(isi)

# with = context manager: file SELALU ditutup, bahkan saat error

# ===== Membaca per baris =====
with open("catatan.txt", "r", encoding="utf-8") as f:
    for baris in f:
        print(f"  Baris: {baris.strip()}")

# ===== pathlib =====
p = Path("catatan.txt")
print(f"Ada? {p.exists()} | Ukuran: {p.stat().st_size} byte | Nama: {p.name}")
p2 = Path("arsip") / "catatan.txt"     # gabung path aman lintas OS
print(f"Path gabung: {p2}")

# ===== JSON =====
data = {"nama": "Ayu", "nilai": [90, 78, 85], "lulus": True}
with open("data.json", "w", encoding="utf-8") as f:
    json.dump(data, f, indent=2, ensure_ascii=False)

with open("data.json", "r", encoding="utf-8") as f:
    dibaca = json.load(f)
print(f"JSON dibaca: {dibaca['nama']}, nilai {dibaca['nilai']}")

# ===== CSV =====
with open("nilai.csv", "w", newline="", encoding="utf-8") as f:
    penulis = csv.writer(f)
    penulis.writerow(["nama", "nilai"])
    penulis.writerow(["Ayu", 90])
    penulis.writerow(["Budi", 78])

with open("nilai.csv", "r", encoding="utf-8") as f:
    pembaca = csv.DictReader(f)
    for baris in pembaca:
        print(f"  {baris['nama']}: {baris['nilai']}")

```

---

## Penjelasan

## with: Context Manager
`with open(...) as f:` menjamin file ditutup otomatis, bahkan saat exception terjadi — tidak perlu `f.close()` manual (Scaler M5 menempatkan file handling bersama OOP; datafield di chapter terpisah — di sini mendahului OOP karena Expense Tracker butuh CSV).

## Membaca per Baris
`for baris in f:` mengiterasi file tanpa memuat semua ke memori — pola untuk file besar. `.strip()` membersihkan newline. `f.read()` sekali baca seluruh isi; `f.readlines()` list baris.

## pathlib
`Path` adalah cara modern: `Path("arsip") / "catatan.txt"` aman di semua OS (vs \\ di Windows). `.exists()`, `.stat().st_size`, `.name`, `.mkdir(exist_ok=True)`. Mencegah hardcode path — common mistake nomor satu automasi.

## JSON
`json.dump(data, f)` menulis; `json.load(f)` membaca. JSON = format pertukaran data paling umum (API, config). `ensure_ascii=False` agar karakter non-ASCII terbaca, `indent=2` agar rapi.

## CSV
`csv.writer`/`csv.DictReader` menangani pemisahan koma, kutipan, dan newline antar OS (`newline=""` penting!). Column header memungkinkan akses `baris["nama"]`.

## Common Mistakes
Lupa `encoding="utf-8"` (UnicodeDecodeError), menulis tanpa `with` (file terkunci), lupa `newline=""` untuk CSV di Windows, membaca baris lalu lupa strip.

---

## Eksperimen

1. **with: Context Manager**
2. **Membaca per Baris**
3. **pathlib**
4. **JSON**
5. **CSV**
6. **Common Mistakes**

---

## Tantangan

Buat aplikasi catatan harian: (1) tambah entri (tanggal + teks) ke file teks, (2) tampilkan semua entri, (3) konverter CSV -> JSON: baca nilai.csv, ubah jadi list of dict, simpan nilai.json. Gabungkan dengan try/except untuk file yang tidak ada.

---

## Ringkasan

with, per-baris, pathlib, JSON, CSV. Pola baca-tulis file siap untuk proyek. Lanjut: Expense Tracker.
