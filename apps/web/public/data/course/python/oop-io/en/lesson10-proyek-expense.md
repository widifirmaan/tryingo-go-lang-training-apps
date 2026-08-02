# Project: Expense Tracker

> Python | OOP & I/O | Lesson 10

## Learning Objectives

- Build a read-validate-analyze CSV pipeline
- Handle corrupt rows with try/except
- Aggregate data with dictionaries
- Format numeric output with f-strings

---

## Program: Project: Expense Tracker

```python
import csv
from pathlib import Path

FILE_CSV = Path("pengeluaran.csv")

PENGELUARAN_AWAL = [
    ["2026-07-01", "Makanan", 45000],
    ["2026-07-02", "Transport", 25000],
    ["2026-07-03", "Makanan", 65000],
    ["2026-07-04", "Hiburan", 80000],
    ["2026-07-05", "Belanja", 120000],
]

# ===== Simpan ke CSV (hanya jika belum ada) =====
if not FILE_CSV.exists():
    with open(FILE_CSV, "w", newline="", encoding="utf-8") as f:
        writer = csv.writer(f)
        writer.writerow(["tanggal", "kategori", "jumlah"])
        writer.writerows(PENGELUARAN_AWAL)
    print("CSV dibuat dengan 5 entri contoh.")

# ===== Baca + validasi (error handling) =====
def baca_pengeluaran():
    daftar = []
    with open(FILE_CSV, "r", encoding="utf-8") as f:
        for baris in csv.DictReader(f):
            try:
                daftar.append({
                    "tanggal": baris["tanggal"],
                    "kategori": baris["kategori"],
                    "jumlah": int(baris["jumlah"]),
                })
            except (KeyError, ValueError) as err:
                print(f"Baris rusak dilewati: {baris} ({err})")
    return daftar

# ===== Analisis: total + per kategori (dict!) =====
data = baca_pengeluaran()
total = sum(d["jumlah"] for d in data)
per_kategori = {}
for d in data:
    per_kategori[d["kategori"]] = per_kategori.get(d["kategori"], 0) + d["jumlah"]

print(f"\nTotal pengeluaran: Rp {total:,}")
print("Per kategori:")
for kategori, jumlah in sorted(per_kategori.items(), key=lambda x: -x[1]):
    porsi = jumlah / total * 100
    print(f"  {kategori:<12} Rp {jumlah:>10,}  ({porsi:.0f}%)")

```

---

## Explanation

## The CSV Read-Write Pattern
Scaler project ladder #3: the Expense Tracker uses file handling + data structures + basic analysis. The production pattern: write the header once -> append rows -> read with DictReader -> aggregate. `if not FILE_CSV.exists()` prevents overwriting user data.

## Row Validation
File data cannot be trusted: missing columns (KeyError), invalid numbers (ValueError). Skip corrupt rows and continue — not a total crash. This is the basic ETL pattern used by data engineers (travisjneuman level 1: "input validation, CSV, JSON").

## Dict Aggregation
`per_kategori.get(k, 0) + 1` is the most common counting idiom in Python (the L7 word frequency is repeated with real data = spacing/interleaving, ACM ICER 2019: +1.04% exam grade per spaced-practice hour).

## Number Formatting
`f"{total:,}"` thousands separators; `{jumlah:>10,}` right-aligned width 10; `{porsi:.0f}%` decimal precision; `{kategori:<12}` left-aligned. f-string format specs = the tool for every report.

## Project Milestone
The Expense Tracker proves: file I/O + error handling + dicts + lambda sort + formatting — halfway to job-ready Python.

---

## Experiments

1. **Pola Baca-Tulis CSV**
2. **Validasi Baris**
3. **Agregasi dengan Dictionary**
4. **Format Angka**
5. **Proyek Milestone**

---

## Challenge

Add: (1) monthly report filtering (parse "2026-07"), (2) tambah_pengeluaran(tanggal, kategori, jumlah) appending a new CSV row, (3) delete all entries of a given category, (4) show the category with the highest spending.

---

## Summary

Expense Tracker: CSV pipeline + validation + dict aggregation + number formatting. Halfway there. Next: classes & objects (OOP).
