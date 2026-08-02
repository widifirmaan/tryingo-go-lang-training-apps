# File I/O & Data

> Python | OOP & I/O | Lesson 9

## Learning Objectives

- Read and write text files with with
- Read files line by line
- Use pathlib for safe paths
- Save and load JSON
- Read/write CSV with the csv module

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

## Explanation

## with: The Context Manager
`with open(...) as f:` guarantees the file closes automatically, even on exceptions — no manual `f.close()` needed (Scaler M5 places file handling with OOP; datafield in a separate chapter — here it precedes OOP because the Expense Tracker needs CSV).

## Reading Line by Line
`for baris in f:` iterates without loading the whole file into memory — the pattern for large files. `.strip()` removes newlines. `f.read()` reads everything once; `f.readlines()` returns a list of lines.

## pathlib
`Path` is the modern way: `Path("arsip") / "catatan.txt"` is safe on every OS (vs \\ on Windows). `.exists()`, `.stat().st_size`, `.name`, `.mkdir(exist_ok=True)`. It prevents hardcoded paths — the #1 automation mistake.

## JSON
`json.dump(data, f)` writes; `json.load(f)` reads. JSON is the most common data exchange format (APIs, config). `ensure_ascii=False` keeps non-ASCII characters readable, `indent=2` pretty-prints.

## CSV
`csv.writer`/`csv.DictReader` handle comma separation, quoting, and OS newlines (`newline=""` matters!). Column headers enable `baris["nama"]` access.

## Common Mistakes
Forgetting `encoding="utf-8"` (UnicodeDecodeError), writing without `with` (locked files), forgetting `newline=""` for CSV on Windows, reading lines then forgetting to strip.

---

## Experiments

1. **with: Context Manager**
2. **Membaca per Baris**
3. **pathlib**
4. **JSON**
5. **CSV**
6. **Common Mistakes**

---

## Challenge

Build a daily journal app: (1) append entries (date + text) to a text file, (2) show all entries, (3) a CSV -> JSON converter: read nilai.csv, turn it into a list of dicts, save nilai.json. Combine with try/except for missing files.

---

## Summary

with, line-by-line, pathlib, JSON, CSV. File read/write patterns ready for projects. Next: Expense Tracker.
