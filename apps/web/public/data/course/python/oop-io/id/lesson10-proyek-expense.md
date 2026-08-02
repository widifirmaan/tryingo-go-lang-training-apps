# Proyek: Expense Tracker

> Python | OOP & I/O | Pelajaran 10

## Tujuan Pembelajaran

- Membangun pipeline baca-validasi-analisis CSV
- Menangani baris rusak dengan try/except
- Mengagregasi data dengan dictionary
- Memformat output angka dengan f-strings

---

## Program: Proyek: Expense Tracker

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

## Penjelasan

## Pola Baca-Tulis CSV
Project ladder Scaler #3: Expense Tracker memakai file handling + data structures + analisis dasar. Pola produksi: tulis header sekali -> append baris -> baca dengan DictReader -> agregasi. `if not FILE_CSV.exists()` mencegah overwrite data user.

## Validasi Baris
Data file tidak bisa dipercaya: kolom hilang (KeyError), angka tidak valid (ValueError). Lewati baris rusak dan lanjutkan — bukan crash total. Ini pola ETL dasar yang dipakai data engineer (travisjneuman level 1: "input validation, CSV, JSON").

## Agregasi dengan Dictionary
`per_kategori.get(k, 0) + 1` idiom counting paling umum di Python (word frequency dari L7 diulang dengan data nyata = spacing/interleaving, ACM ICER 2019: +1.04% nilai per jam latihan tersebar).

## Format Angka
`f"{total:,}"` ribuan separator; `{jumlah:>10,}` rata kanan lebar 10; `{porsi:.0f}%` presisi desimal; `{kategori:<12}` rata kiri. Format spec f-string = alat tiap laporan.

## Proyek Milestone
Expense Tracker membuktikan: file I/O + error handling + dict + lambda sort + formatting — separuh jalan menuju Python siap-kerja.

---

## Eksperimen

1. **Pola Baca-Tulis CSV**
2. **Validasi Baris**
3. **Agregasi dengan Dictionary**
4. **Format Angka**
5. **Proyek Milestone**

---

## Tantangan

Tambahkan: (1) filter laporan per bulan (parsing "2026-07"), (2) fungsi tambah_pengeluaran(tanggal, kategori, jumlah) yang meng-append baris baru ke CSV, (3) hapus semua entri dengan kategori tertentu, (4) tampilkan kategori dengan pengeluaran terbesar.

---

## Ringkasan

Expense Tracker: CSV pipeline + validasi + agregasi dict + format angka. Separuh jalan. Lanjut: kelas & objek (OOP).
