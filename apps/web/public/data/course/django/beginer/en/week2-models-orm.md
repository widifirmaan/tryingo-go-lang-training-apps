# Models & ORM — Rak Otomatis

> **Kategori:** Django | **Level:** Pemula | **Minggu 2:** Models & ORM

## Tujuan Pembelajaran

- `models.Model` — tulis rak Python, Django buatkan tabel SQL
- `CharField`, `IntegerField`, `DecimalField`, `ForeignKey` — label rak
- `makemigrations` + `migrate` — cetak biru → bangun rak
- `Produk.objects.create()`, `all()`, `filter()` — isi & ambil

---

## Program

```python
# warung/models.py
from django.db import models

class Produk(models.Model):
    nama = models.CharField(max_length=100)
    harga = models.DecimalField(max_digits=10, decimal_places=2)
    stok = models.IntegerField(default=0)
    kategori = models.CharField(max_length=50, blank=True)
    dibuat = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.nama} - Rp{self.harga}"

class Pelanggan(models.Model):
    nama = models.CharField(max_length=100)
    email = models.EmailField(unique=True)
    kota = models.CharField(max_length=50, blank=True)
```

```bash
python manage.py makemigrations
python manage.py migrate
python manage.py shell
>>> from warung.models import Produk
>>> Produk.objects.create(nama="Beras 5kg", harga=62000, stok=10)
>>> Produk.objects.all()
>>> Produk.objects.filter(kategori="Sayur")
```

Daftarkan ke admin `admin.py`: `from .models import Produk; admin.site.register(Produk)` → lihat di `/admin`.

---

## Ringkasan

Minggu 2: **Rak ORM** — Python jadi tabel. Minggu depan: **Views & URLs**.
