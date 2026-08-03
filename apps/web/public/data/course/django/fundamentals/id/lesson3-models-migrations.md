# Models & Migrations: Database Tanpa SQL

> Django | Fondasi Django | Pelajaran 3

## Tujuan Pembelajaran

- Menulis model: field types, choices, relasi
- Menjalankan makemigrations & migrate
- Menggunakan Django admin untuk CRUD otomatis
- Memakai get_object_or_404 dan QuerySet dasar

---

## Program: Models & Migrations: Database Tanpa SQL

```python
from django.db import models


class Kategori(models.Model):
    """Satu model = satu tabel database."""
    nama = models.CharField(max_length=100, unique=True)

    class Meta:
        ordering = ['nama']

    def __str__(self):
        return self.nama


class Produk(models.Model):
    nama = models.CharField(max_length=200)
    harga = models.DecimalField(max_digits=10, decimal_places=2)
    stok = models.PositiveIntegerField(default=0)
    tersedia = models.BooleanField(default=True)
    # Relasi: banyak produk -> satu kategori (ForeignKey)
    kategori = models.ForeignKey(Kategori, on_delete=models.CASCADE, related_name='produk')
    dibuat = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ['-dibuat']

    def __str__(self):
        return self.nama
```

---

## Penjelasan

## Model = Tabel, Class = Skema
Satu class = satu tabel; satu atribut = satu kolom. CharField → VARCHAR, DecimalField → DECIMAL, ForeignKey → kolom id + constraint. Django menerjemahkan class ke SQL; Anda tidak menulis CREATE TABLE. Model juga pusat validasi: tipe field menentukan apa yang boleh masuk ke database.
## Migrations: Versioned Schema
makemigrations membandingkan models.py dengan database, membuat file migration (riwayat perubahan skema). migrate menerapkannya. Keajaiban: skema di-version di git, bisa rollback, dan TIM mengubah skema bersama tanpa konflik. Aturan: ubah model → makemigrations → migrate. Jangan pernah ubah tabel manual di SQLite - biarkan Django yang pegang.
## Admin: CRUD Gratis
Daftarkan model di admin.py → panel /admin langsung punya create/read/update/delete + pencarian + filter (list_display, list_filter, search_fields). Admin = "internal tool" yang lahir otomatis dari model. Untuk proyek internal, admin saja sering cukup - tidak perlu membangun UI CRUD dari nol.
## Relasi: FK, One-to-Many
ForeignKey(Kategori) = banyak produk ke satu kategori; related_name='produk' membuat kategori.produk.all() tersedia (reverse). get_object_or_404(Produk, id=...) = ORM + 404 dalam satu baris. Produk.objects.filter(...) mengembalikan QuerySet - dipelajari dalam di pelajaran 5.

---

## Eksperimen

1. **Model = Tabel, Class = Skema**
2. **Migrations: Versioned Schema**
3. **Admin: CRUD Gratis**
4. **Relasi: FK, One-to-Many**

---

## Tantangan

Perluas model: (1) tambah model Ulasan (produk FK, penulis CharField, isi TextField, bintang PositiveSmallIntegerField dengan choices 1-5), (2) tambah field diskon_persen di Produk (DecimalField nullable), (3) buat migration dan terapkan, (4) tampilkan rata-rata bintang di halaman detail produk (aggregate Avg - dipelajari pelajaran 5).

---

## Ringkasan

Model = skema. Migrations = versioned schema. Admin = CRUD otomatis. FK = relasi. Jangan sentuh tabel manual. Lanjut: templates.
