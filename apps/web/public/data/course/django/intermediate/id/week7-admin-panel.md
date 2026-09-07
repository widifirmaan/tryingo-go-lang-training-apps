# Admin Panel — Kasir Otomatis Django

> **Kategori:** Django | **Level:** Menengah | **Minggu 7:** Admin Panel

## Tujuan Pembelajaran

- `admin.py` kustom: `list_display`, `list_filter`, `search_fields` — kasir lebih enak

---

## Kenapa Ini Penting Buat Kamu?

Tanpa kustom admin, cari 1 produk scroll 1000 baris. Dengan `list_display` + `search_fields` + `list_filter`, ketemu 3 detik.

---

## Program

```python
# warung/admin.py
from django.contrib import admin
from .models import Produk

@admin.register(Produk)
class ProdukAdmin(admin.ModelAdmin):
    list_display = ("nama", "harga", "stok", "kategori")
    list_filter = ("kategori",)
    search_fields = ("nama",)
    list_editable = ("harga", "stok")
```

Buka `http://localhost:8000/admin/warung/produk/` → filter kategori, cari nama, edit harga langsung di list.


---

## Penjelasan untuk Pemula

### Analogi: Kasir Otomatis Rapi
- Lihat Program: jalankan perintahnya, ubah 1 hal, lihat bedanya.

### Langkah 0 — Siapkan Device
- Sama Django W1: `runserver` di `8000` (+ paket minggu ini).

### Cara Komputer Membaca
- `list_display` kolom; `search_fields` cari; `list_filter` saring samping.

### 3 Istilah Wajib
- 1. **list_display/search**: kolom/cari

---

## Glosarium Mini

- Lihat Istilah Wajib di atas.

## Ringkasan

Minggu 7: **Kasir Otomatis** — admin kustom.
