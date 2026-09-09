# Views & URLs — Pelayan dan Pintu Warung Django

> **Kategori:** Django | **Level:** Pemula | **Minggu 3:** Views & URLs
> **Prasyarat:** Minggu 2 — **Models & ORM**.

## Tujuan Pembelajaran

- `def daftar(request)` pelayan di `views.py` → `render(request, "warung/daftar.html", {...})` antar (sumber: docs.djangoproject.com/topics/http/views)
- `path('produk/', views.daftar)` pintu di `urls.py` + `include("warung.urls")` di pintu utama (sumber: docs.djangoproject.com/topics/http/urls)
- `request.GET.get("cari", "")` baca ketikan, `nama__icontains` saring mirip

---

## Kenapa Ini Penting Buat Kamu?

Rak (`models`) tanpa pelayan = pelanggan tidak bisa lihat. Views = pelayan yang ambil dari rak + antar ke meja (template). URLs = papan pintu (`/produk/` → pelayan `daftar`). Tanpa `urls.py`, browser 404 meski views sudah benar.

---

## Program: Pelayan Cari Produk

```python
# warung/views.py — pelayan
from django.shortcuts import render
from .models import Produk

def daftar(request):
    cari = request.GET.get("cari", "")  # baca ?cari=beras
    if cari:
        produk = Produk.objects.filter(nama__icontains=cari)
    else:
        produk = Produk.objects.all()
    return render(request, "warung/daftar.html", {"produk": produk, "cari": cari})
```

```python
# warung/urls.py — pintu toko (buat file baru!)
from django.urls import path
from . import views

urlpatterns = [
    path("produk/", views.daftar, name="daftar"),
]
```

```python
# toko/urls.py — pintu gedung (tambah 1 baris)
from django.urls import include, path
urlpatterns = [
    path("admin/", admin.site.urls),
    path("", include("warung.urls")),  # semua /... teruskan ke warung
]
```

```html
<!-- warung/templates/warung/daftar.html — meja -->
<form method="get">
  <input name="cari" value="{{ cari }}" placeholder="Cari: beras">
  <button>Cari</button>
</form>
<ul>
  {% for p in produk %}
    <li>{{ p.nama }} - Rp{{ p.harga }}</li>
  {% empty %}
    <li>Tidak ada hasil untuk "{{ cari }}"</li>
  {% endfor %}
</ul>
```

Buka `http://localhost:8000/produk/` → semua. Ketik `beras` → `http://localhost:8000/produk/?cari=beras` → saring.

---

## Konsep Kunci

### `request` = Pesanan Pelanggan
`request.GET` = tulisan di kertas (`?cari=beras`), `request.POST` = amplop tertutup (form).

### `render(request, template, context)` = Antar ke Meja
`{"produk": produk}` = baki berisi data untuk template `{{ }}`.

### `path()` + `include()` = Pintu
`path("produk/", views.daftar)` pintu toko, `include("warung.urls")` teruskan dari gedung.

---

## Penjelasan untuk Pemula

### Analogi: Restoran
- **URLs = papan pintu**: `/produk/` → meja pelayan `daftar`.
- **Views = pelayan**: terima pesanan (`request`), ambil dari dapur (`models`), antar ke meja (`render`).
- **Template = meja**: pajang `{{ p.nama }}`.

### Langkah 0 — Siapkan Device
- Sama W1-W2: `runserver` jalan, `Produk` sudah ada isi (buat 3 via admin).

### Cara Komputer Membaca
1. Browser `GET /produk/?cari=beras` → `toko/urls.py` → `include` → `warung/urls.py` → `path("produk/")` cocok → `daftar(request)`.
2. `daftar` baca `cari="beras"` → `filter(nama__icontains="beras")` → `render` → HTML.

### 3 Istilah Wajib
1. **View**: pelayan (fungsi)
2. **URL/path**: pintu
3. **Context**: baki data ke template

---

## Eksperimen

- **Hijau:** Buka `/produk/?cari=bayam` → hanya Bayam?
- **Kuning:** Hapus `include("warung.urls")` → `/produk/` 404? Pasang lagi.
- **Merah:** Ganti `render` jadi `return HttpResponse("Halo")` → teks mentah? (render = template, HttpResponse = mentah)

---

## Tantangan

**Warung Cari Lengkap:** Tambah `?kategori=sayur` kedua: `daftar` baca `cari` + `kategori` → filter dua-duanya → template 2 input + link `?cari=&kategori=sembako`.

---

## Glosarium Mini

- **request.GET/POST**: kertas/amplop
- **render/path/include**: antar/pintu/teruskan
- **icontains/empty**: mirip/kosong

---

## Ringkasan

Minggu 3 dari 4: **Pelayan & Pintu** (Level: Pemula). Bisa tampilkan + cari. Minggu depan: **Templates** — meja cantik.
