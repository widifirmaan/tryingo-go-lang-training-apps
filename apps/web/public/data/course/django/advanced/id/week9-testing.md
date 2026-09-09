# Testing — Uji Warung Django

> **Kategori:** Django | **Level:** Lanjutan | **Minggu 9:** Testing
> **Prasyarat:** Minggu 8 — **REST API**.

## Tujuan Pembelajaran

- `python manage.py test` — `TestCase` `assertEqual` `self.client.get("/produk/")`

---

## Kenapa Ini Penting Buat Kamu?

Tanpa `TestCase`, ubah view → 500 ketahuan pelanggan. Dengan `self.client.get` + `assertEqual`, ubah → merah → perbaiki.

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

## Penjelasan untuk Pemula

### Analogi: Cicip Dapur Django
- **`TestCase` = dapur uji terpisah**: tiap test mulai DB kosong + selesai dibuang — test tak cemari data asli/toko buka.
- **`self.client` = pelanggan bohongan**: klik/get/post beneran lewat URL, `assertEqual` cicip status + isi. Merah = resep rusak, betulkan SEBELUM pelanggan komplain.

### Langkah 0 — Siapkan Device
- Sama Django W1: `runserver` di `8000` (+ paket minggu ini).

### Cara Komputer Membaca
- `TestCase` siapkan DB uji; `client.get/post` pura-pura browser; `assertEqual` cicip.

### 3 Istilah Wajib
- 1. **TestCase/client**: dapur-uji/pura-pura

---

## Tantangan

**Testing di Warungmu:** pakai `/produk/`, `test_buat`, `test_list` hingga benar-benar jalan, lalu kerjakan tiga tingkat ini.
- **Hijau:** Jalankan Program minggu ini apa adanya; catat output yang keluar.
- **Kuning:** Ubah 1 nilai pada `/produk/`, `test_buat`, `test_list`; tebak output SEBELUM run, lalu cocokkan.
- **Merah:** Gabungkan dengan **REST API** (Minggu 8): pasang hasilnya di alur itu, pastikan ujung-ke-ujung jalan.

## Glosarium Mini

- Lihat Istilah Wajib di atas.

## Ringkasan

Minggu 9: **Uji Django** — `TestCase`. Minggu depan: **Caching**.
