# Testing — Uji Rasa Sebelum Saji

> **Kategori:** Python | **Level:** Lanjutan | **Minggu 10:** Testing

## Tujuan Pembelajaran

- `pytest` atau `unittest` — cicip sebelum saji, `assert` cek

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

# Jalankan: pytest -v atau python -m unittest
```

---

## Ringkasan

Minggu 10: **Uji Rasa** — `assert` sebelum deploy.
