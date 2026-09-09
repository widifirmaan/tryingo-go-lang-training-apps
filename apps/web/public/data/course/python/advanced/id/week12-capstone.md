# Capstone: Warung Python Lengkap

> **Kategori:** Python | **Level:** Lanjutan | **Minggu 12:** Capstone
> **Prasyarat:** Minggu 11 — **CLI & Automation**.

## Tujuan Pembelajaran

- Gabung `Flask` + `pandas` + `json` + `test` jadi warung `produk` API + laporan Excel

---

## Kenapa Ini Penting Buat Kamu?

11 minggu terpisah — capstone buktikan gabung: Flask API + pandas laporan + CLI + test jadi warung beneran. Portfolio Python.

---

## Program: Warung Python Capstone

```bash
pip install flask pandas openpyxl
```

Simpan sebagai `app.py`, lalu:
```python
from flask import Flask, jsonify
app = Flask(__name__)
produk = [{"id":1,"nama":"Beras","harga":62000}]

@app.route("/produk")
def daftar(): return jsonify(produk)

# Laporan pandas (+ Excel beneran)
import pandas as pd
df = pd.DataFrame(produk)
print(df.describe())
df.to_excel("laporan.xlsx", index=False)  # butuh openpyxl
print("Excel tersimpan: laporan.xlsx")

# Jalankan: flask --app app run
# Buka http://127.0.0.1:5000/produk → JSON
```

**Tugas:** Deploy `Railway` + `pytest`.


---

## Penjelasan untuk Pemula

### Analogi: Grand Opening Warung Python
- **11 minggu = bangun warung**: resep (fungsi), rak (koleksi), cetak biru (OOP), buku kas (file), pinjam alat (pip).
- **Capstone = grand opening**: Flask API + pandas laporan + CLI + test JALAN BARENG + deploy Railway. Demo video = bukti buka!

### Langkah 0 — Siapkan Device
- Sama Python W1: `python --version` + folder proyek.

### Cara Komputer Membaca
- CHECKLIST (API + laporan + CLI + test) lalu demo + video.

### 3 Istilah Wajib
- 1. **Capstone/demo**: gabung/tunjuk

---

## Glosarium Mini

- Lihat Istilah Wajib di atas.

## Ringkasan

Minggu 12: **Capstone Python** — warung + laporan, **Selesai Python 0→Ahli!**
