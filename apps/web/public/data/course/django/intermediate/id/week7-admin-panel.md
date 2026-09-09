# Admin Panel — Kasir Otomatis Django

> **Kategori:** Django | **Level:** Menengah | **Minggu 7:** Admin Panel
> **Prasyarat:** Minggu 6 — **Authentication**.

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
- **Admin bawaan = meja kasir polos**: bisa jual, tapi cari barang selam 1000 baris.
- **`list_display` + `search_fields` + `list_filter` = rak berlabel + kotak cari + sekat kategori**: kasir ketemu barang 3 detik. `list_editable` = ubah harga langsung di daftar, tanpa buka kartu!

### Langkah 0 — Siapkan Device
- Sama Django W1: `runserver` di `8000` (+ paket minggu ini).

### Cara Komputer Membaca
- `list_display` kolom; `search_fields` cari; `list_filter` saring samping.

### 3 Istilah Wajib
- 1. **list_display/search**: kolom/cari

---

## Eksperimen

- **Hijau:** Jalankan apa adanya, lalu ubah nilai `ProdukAdmin` → output ikut berubah?
- **Kuning:** Ubah huruf besar-kecil `ProdukAdmin` → masih jalan atau error?
- **Merah:** Hapus baris `from django.contrib import admin` → error apa? Pasang lagi.

## Tantangan

**Admin Panel di Warungmu:** pakai `ProdukAdmin`, `django` hingga benar-benar jalan, lalu kerjakan tiga tingkat ini.
- **Hijau:** Jalankan Program minggu ini apa adanya; catat output yang keluar.
- **Kuning:** Ubah 1 nilai pada `ProdukAdmin`, `django`; tebak output SEBELUM run, lalu cocokkan.
- **Merah:** Gabungkan dengan **Authentication** (Minggu 6): pasang hasilnya di alur itu, pastikan ujung-ke-ujung jalan.

## Glosarium Mini

- Lihat Istilah Wajib di atas.

## Ringkasan

Minggu 7: **Kasir Otomatis** — admin kustom. Minggu depan: **REST API**.
