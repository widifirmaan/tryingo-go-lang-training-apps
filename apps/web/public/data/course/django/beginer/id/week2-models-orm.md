# Models & ORM — Rak Otomatis Django

> **Kategori:** Django | **Level:** Pemula | **Minggu 2:** Models & ORM
> **Prasyarat:** Minggu 1 — **Setup Django**.

## Tujuan Pembelajaran

- `class Produk(models.Model)` tulis rak Python → Django buatkan tabel SQL (sumber: docs.djangoproject.com/topics/db/models)
- `CharField`, `DecimalField`, `IntegerField`, `ForeignKey` label rak
- `makemigrations` (cetak biru) + `migrate` (bangun rak) — 2 langkah wajib
- `objects.create()`, `all()`, `filter(nama__icontains=...)` isi & ambil (sumber: docs.djangoproject.com/topics/db/queries)

---

## Kenapa Ini Penting Buat Kamu?

Tanpa ORM, tulis `CREATE TABLE produk (...)` SQL manual — 1 typo kolom, error. Dengan `models.py`, tulis Python yang sudah kamu bisa → Django terjemahkan + buatkan tombol admin CRUD gratis. Ubah model (tambah `diskon`)? `makemigrations` lagi, data lama aman.

---

## Program: Rak Warung ORM

```python
# warung/models.py — tulis Python, jadi tabel SQL
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
# 2 langkah wajib (urutan jangan terbalik!)
python manage.py makemigrations  # tulis cetak biru (file 0001_initial.py)
python manage.py migrate         # bangun rak di DB
```

```bash
# Coba di shell
python manage.py shell
>>> from warung.models import Produk
>>> Produk.objects.create(nama="Beras 5kg", harga=62000, stok=10)
>>> Produk.objects.all()
>>> Produk.objects.filter(kategori="Sayur")
>>> Produk.objects.filter(nama__icontains="beras")  # icontains = cari mirip
>>> exit()
```

Daftarkan ke admin `warung/admin.py`: `from .models import Produk, Pelanggan` + `admin.site.register(Produk)` → buka `http://localhost:8000/admin` → tambah produk tanpa coding!

---

## Konsep Kunci

### `models.Model` = Tulis Python, Jadi Tabel
`class Produk(models.Model)` → tabel `warung_produk` otomatis.

### `makemigrations` vs `migrate`
- `makemigrations` = gambar cetak biru (file migrasi).
- `migrate` = bangun rak sesuai biru. Ubah model → ulangi keduanya.

### ORM `objects` = Tukang Gudang
`create()` isi, `all()` semua, `filter()` saring, `get(id=1)` satu.

---

## Penjelasan untuk Pemula

### Analogi: Tukang + Penerjemah
- **Kamu = arsitek**: gambar rak Python.
- **Django = tukang + penerjemah**: terjemahkan ke SQL + bangun + buatkan admin.

### Langkah 0 — Siapkan Device
- Sama W1: `toko` + `warung` app sudah ada, `pip install django`, `python manage.py runserver`.

### Cara Komputer Membaca
1. `makemigrations` → baca `models.py` → tulis `migrations/0001_initial.py`.
2. `migrate` → jalankan SQL `CREATE TABLE warung_produk (...)`.
3. `Produk.objects.create(...)` → `INSERT INTO warung_produk ...`.

### 3 Istilah Wajib
1. **Model**: cetak biru rak Python
2. **Migration**: cetak biru → bangun (2 langkah)
3. **ORM**: tukang SQL otomatis

---

## Eksperimen

- **Hijau:** `Produk.objects.create(nama="Kopi", harga=12000)` → `all()` ada 3?
- **Kuning:** `filter(harga__gte=20000)` (`gte` = >=) → hanya mahal?
- **Merah:** Ubah model tambah `diskon`, lupa `makemigrations` → `filter(diskon=10)` error `no such column`? Jalankan 2 langkah.

---

## Tantangan

**Rak Perpustakaan:** `Buku(judul, stok)` + `Anggota(nama, email unique)` → `makemigrations` + `migrate` → `create` 3 buku → `filter(stok__lt=5)` (< 5) → daftarkan ke `admin.py`.
- **Sambungan (Minggu 1 — Setup Django):** pasang hasil tantangan ini ke alur itu; pastikan ujung-ke-ujung jalan.

---
## Glosarium Mini

- **Model/migrate**: biru/bangun
- **objects.create/all/filter**: isi/semua/saring
- **admin.site.register**: daftarkan ke kasir

---

## Ringkasan

Minggu 2 dari 4: **Rak ORM** (Level: Pemula). Python jadi tabel + admin gratis. Minggu depan: **Views & URLs** — pelayan & pintu.
