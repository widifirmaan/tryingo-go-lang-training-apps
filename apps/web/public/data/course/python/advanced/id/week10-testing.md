# Testing — Uji Rasa Sebelum Saji

> **Kategori:** Python | **Level:** Lanjutan | **Minggu 10:** Testing
> **Prasyarat:** Minggu 9 — **Libraries**.

## Tujuan Pembelajaran

- `pytest` atau `unittest` — cicip sebelum saji, `assert` cek

---

## Kenapa Ini Penting Buat Kamu?

Tanpa `pytest`, ubah rumus → salah ketahuan pelanggan. Dengan `assert` + `pytest -v`, ubah → merah → perbaiki. `parametrize` cicip 10 kasus 3 baris.

---

## Program

```python
# hitung.py
def hitung(a,b): return a+b

# test_hitung.py
def test_hitung():
    assert hitung(2,3) == 5
    assert hitung(0,0) == 0
    print("Lulus")

test_hitung()

# Jalankan: pytest -v
# (python -m unittest butuh class TestCase — gaya fungsi polos ini untuk pytest)
```


---

## Penjelasan untuk Pemula

### Analogi: Cicip Dapur Python
- **`assert` = cicip mesin**: `hitung(2,3)==5`? Beda → MERAH + nilai kiri-kanan ditunjuk.
- **`parametrize` = cicip borongan**: 10 kasus 3 baris (tanpa ini: 10 fungsi!). Ubah rumus → merah → betulkan SEBELUM pelanggan!

### Langkah 0 — Siapkan Device
- Sama Python W1: `python --version` + folder proyek.

### Cara Komputer Membaca
- `pytest` cari `test_*.py`; `assert a == b` cocok? Lanjut : merah + nilai.

### 3 Istilah Wajib
- 1. **pytest/assert/parametrize**: dapur/cicip/borong

---

## Glosarium Mini

- Lihat Istilah Wajib di atas.

## Ringkasan

Minggu 10: **Uji Rasa** — `assert` sebelum deploy. Minggu depan: **CLI & Automation**.
