# Libraries — Pinjam Alat Tetangga

> **Kategori:** Python | **Level:** Lanjutan | **Minggu 9:** Libraries

## Tujuan Pembelajaran

- `pip install requests pandas` pinjam, `import requests` pakai, `venv` laci terpisah

---

## Program

```bash
python -m venv warung-env
# Windows: warung-env\Scripts\activate
# Mac/Linux: source warung-env/bin/activate
pip install requests
pip freeze > requirements.txt
```

```python
import requests
# Tanpa API beneran, simulasi
data = [{"nama": "Beras", "harga": 62000}]
print("Pinjam requests:", data)

import json, os
print("json & os sudah bawaan — tidak perlu pip")
```

---

## Ringkasan

Minggu 9: **Pinjam Alat** — `pip` + `venv`.
