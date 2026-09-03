# Testing — Uji Warung Django

> **Kategori:** Django | **Level:** Lanjutan | **Minggu 9:** Testing

## Tujuan Pembelajaran

- `python manage.py test` — `TestCase` `assertEqual` `self.client.get("/produk/")`

---

## Program

```python
# warung/tests.py
from django.test import TestCase
from .models import Produk

class ProdukTest(TestCase):
    def test_buat(self):
        p = Produk.objects.create(nama="Beras", harga=62000)
        self.assertEqual(p.nama, "Beras")

    def test_list(self):
        Produk.objects.create(nama="Beras", harga=62000)
        res = self.client.get("/produk/")
        self.assertEqual(res.status_code, 200)
```

`python manage.py test` → OK.

---

## Ringkasan

Minggu 9: **Uji Django** — `TestCase`.
