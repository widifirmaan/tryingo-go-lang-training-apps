# Capstone: Warung Python Lengkap

> **Kategori:** Python | **Level:** Lanjutan | **Minggu 12:** Capstone

## Tujuan Pembelajaran

- Gabung `Flask` + `pandas` + `json` + `test` jadi warung `produk` API + laporan Excel

---

## Program: Warung Python Capstone

```python
from flask import Flask, jsonify
app = Flask(__name__)
produk = [{"id":1,"nama":"Beras","harga":62000}]

@app.route("/produk")
def daftar(): return jsonify(produk)

# Laporan pandas
import pandas as pd
df = pd.DataFrame(produk)
print(df.describe())

# Jalankan: flask --app app run
```

**Tugas:** Deploy `Railway` + `pytest`.

---

## Ringkasan

Minggu 12: **Capstone Python** — warung + laporan, **Selesai Python 0→Ahli!**
