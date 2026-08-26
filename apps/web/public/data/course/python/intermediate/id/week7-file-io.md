# File I/O — Buku Kas di File

> **Kategori:** Python | **Level:** Menengah | **Minggu 7:** File I/O

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
```

**Aturan:** `with open` otomatis tutup, tidak perlu `f.close()`.

---

## Konsep Kunci

### `w`/`r`/`a`
- `w` tulis (hapus lama), `r` baca, `a` tambah di belakang

### `json`
`json.dump(obj, file)` tulis, `json.load(file)` baca — untuk `list`/`dict`.

---

## Penjelasan untuk Pemula

### Analogi: Buku Kas Kertas
- **`open("produk.json","w")` = buka buku tulis**, `json.dump` = tulis, `with` = tutup otomatis.

---

## Tantangan

**Warung File:** Simpan `keranjang = [{"nama":"Beras","qty":2}]` ke `keranjang.json` dengan `json.dump`, baca lagi, tambah 1 item, tulis lagi.

---

## Ringkasan

Minggu 7: **Buku Kas File** — simpan ke `json` biar tidak hilang.
