# File I/O — Buku Kas di File

> **Kategori:** Python | **Level:** Menengah | **Minggu 7:** File I/O
> **Prasyarat:** Minggu 6 — **OOP**.

## Tujuan Pembelajaran

- `open("struk.txt", "w")` tulis, `"r"` baca, `"a"` tambah, `with open(...) as f:` otomatis tutup
- `json.dump` simpan dict ke file, `json.load` baca

---

## Kenapa Ini Penting Buat Kamu?

Stok warung jika hanya di `list` → tutup laptop hilang. Simpan ke `produk.json` → buka lagi tetap ada.

---

## Program: Buku Kas File

```python
import json

# Tulis
produk = [{"nama": "Beras", "harga": 62000}, {"nama": "Bayam", "harga": 5000}]
with open("produk.json", "w") as f:
    json.dump(produk, f, indent=2) # indent biar rapi
print("Tulis selesai")

# Baca
with open("produk.json", "r") as f:
    data = json.load(f)
print("Baca:", data)

# Tambah log
with open("log.txt", "a") as f:
    f.write("Tambah Beras\n")

# Baca teks
with open("log.txt", "r") as f:
    print(f.read())

# Aman: file hilang / JSON rusak → try/except (jangan biarkan crash!)
try:
    with open("produk.json", "r") as f:
        data = json.load(f)
except FileNotFoundError:
    print("File belum ada → mulai kosong")
    data = []
except json.JSONDecodeError:
    print("File rusak → mulai kosong")
    data = []
else:
    print("Sukses baca", len(data), "produk")
finally:
    print("Cek selesai (finally selalu jalan)")
```

### Bonus: SQLite — Buku Kas Beneran (ala freeCodeCamp!)

`produk.json` cukup untuk belajar, tapi toko beneran butuh cari cepat + 10.000 baris. `sqlite3` BAWAAN Python (tanpa install!) — SQL mini di 1 file.

```python
import sqlite3

db = sqlite3.connect("warung.db")  # bikin file jika belum ada
db.execute("CREATE TABLE IF NOT EXISTS produk (nama TEXT, harga INTEGER)")
db.execute("INSERT INTO produk VALUES (?, ?)", ("Beras", 62000))  # ? = aman, anti SQL-injection!
db.execute("INSERT INTO produk VALUES (?, ?)", ("Bayam", 5000))
db.commit()  # WAJIB simpan!

for nama, harga in db.execute("SELECT nama, harga FROM produk WHERE harga < 20000"):
    print(f"Murah: {nama} Rp{harga:,}")

db.close()
```

**Aturan:** `with open` otomatis tutup, tidak perlu `f.close()`.

---

## Konsep Kunci

### `w`/`r`/`a`
- `w` tulis (hapus lama), `r` baca, `a` tambah di belakang

### `json`
`json.dump(obj, file)` tulis, `json.load(file)` baca — untuk `list`/`dict`.

### `try/except` = Jaring Pengaman (wajib CS50P!)
`try` coba → `except FileNotFoundError` tangkap spesifik → `else` jika sukses → `finally` selalu jalan. Urut spesifik→umum!

### `sqlite3` = SQL Tanpa Install
`connect()` + `execute("... ? ...", (isi,))` (`?` cegah SQL-injection!) + `commit()` wajib + `close()`.

---

## Penjelasan untuk Pemula

### Analogi: Buku Kas Kertas
- **`open("produk.json","w")` = buka buku tulis**, `json.dump` = tulis, `with` = tutup otomatis.

---

## Tantangan

**Warung File:** Simpan `keranjang = [{"nama":"Beras","qty":2}]` ke `keranjang.json` dengan `json.dump`, baca lagi, tambah 1 item, tulis lagi.

---

## Ringkasan

Minggu 7: **Buku Kas File** — simpan ke `json` biar tidak hilang. Minggu depan: **Decorators & Generators**.
