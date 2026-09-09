# Libraries — Pinjam Alat Tetangga

> **Kategori:** Python | **Level:** Lanjutan | **Minggu 9:** Libraries
> **Prasyarat:** Minggu 8 — **Decorators & Generators**.

## Tujuan Pembelajaran

- `pip install requests pandas` pinjam, `import requests` pakai, `venv` laci terpisah

---

## Kenapa Ini Penting Buat Kamu?

Tanpa `venv`, pinjam `requests` v2 untuk proyek A merusak proyek B yang butuh v1 (tabrakan!). Dengan laci terpisah per proyek + `requirements.txt`, tim install sama persis.

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

## Penjelasan untuk Pemula

### Analogi: Laci Alat per Proyek
- **Tanpa `venv` = 1 laci untuk 10 proyek**: proyek A butuh requests v2, B butuh v1 → tabrakan!
- **`venv` = laci per proyek** + `requirements.txt` = daftar belanja: tim install SAMA persis (`pip install -r`). `pip` pinjam, `venv` kurung!

### Langkah 0 — Siapkan Device
- Sama Python W1: `python --version` + folder proyek.

### Cara Komputer Membaca
- `python -m venv warung-env` buat laci; `activate` masuk; `pip install` taruh di laci itu saja.

### 3 Istilah Wajib
- 1. **venv/pip/requirements**: laci/pinjam/daftar

---

## Tantangan

**Libraries di Warungmu:** jalankan ulang hingga benar-benar jalan, lalu kerjakan tiga tingkat ini.
- **Hijau:** Jalankan Program minggu ini apa adanya; catat output yang keluar.
- **Kuning:** Ubah 1 nilai di Program; tebak output SEBELUM run, lalu cocokkan.
- **Merah:** Gabungkan dengan **Decorators & Generators** (Minggu 8): pasang hasilnya di alur itu, pastikan ujung-ke-ujung jalan.

## Glosarium Mini

- Lihat Istilah Wajib di atas.

## Ringkasan

Minggu 9: **Pinjam Alat** — `pip` + `venv`. Minggu depan: **Testing**.
