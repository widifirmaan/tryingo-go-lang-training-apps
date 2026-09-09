# Capstone: Toko Django Lengkap

> **Kategori:** Django | **Level:** Lanjutan | **Minggu 12:** Capstone Project
> **Prasyarat:** Minggu 11 — **Deployment**.

## Tujuan Pembelajaran

- Gabung `models` + `forms` + `auth` + `admin` + `DRF` + `deploy` jadi toko `produk` + `pesanan` + `login`

---

## Kenapa Ini Penting Buat Kamu?

11 minggu terpisah — capstone buktikan gabung: models + auth + DRF + test + deploy jadi toko. Portfolio Django.

---

## Program: Toko Capstone Django

Fitur: `Produk` CRUD via `ModelForm` + `admin` + `api/produk/` DRF + `auth` + `deploy` Railway.

Struktur: `warung/models.py`, `warung/views.py`, `warung/serializers.py`, `warung/admin.py`.

**Tugas:** Deploy `warung-django.railway.app` + video.



```python
from django.http import HttpResponse
from django.contrib.auth.decorators import login_required

# Model ringkas (asli: warung/models.py + migrate) — inti 11 minggu:
# Produk CRUD (ModelForm W5) + auth (W6) + admin (W7) + DRF (W8) + test (W9)
PRODUK = [
    {"id": 1, "nama": "Beras 5kg", "harga": 62000},
    {"id": 2, "nama": "Minyak 2L", "harga": 48000},
]


def tambah_produk(nama, harga):
    """Simulasi ModelForm.is_valid() -> save (asli: form.save())."""
    if not nama or harga <= 0:
        return None  # form tidak valid
    p = {"id": len(PRODUK) + 1, "nama": nama, "harga": harga}
    PRODUK.append(p)
    return p


@login_required  # KTP W6: tanpa login -> tendang ke /login
def daftar(request):
    baris = ", ".join(f"{p['nama']} Rp{p['harga']}" for p in PRODUK)
    return HttpResponse(f"Toko Django: {baris}")


# API drive-thru W8 (asli: warung/serializers.py + ViewSet -> api/produk/)
def api_produk():
    return [{"id": p["id"], "nama": p["nama"]} for p in PRODUK]


# Uji W9 (asli: TestCase): tambah valid + tolak harga minus
tambah_produk("Gula 1kg", 17500)
tambah_produk("", -5)
print(daftar(None).content.decode())
print("API:", api_produk())
print("JUMLAH:", len(PRODUK))  # harap 3
```

*Jalankan tiap fungsi di playground/pc (`python views.py`), lihat struk + API + JUMLAH=3.*

---

## Penjelasan untuk Pemula

### Analogi: Grand Opening Toko Django
- **11 minggu = bangun bagian**: rak (models), pelayan (views), meja (templates), KTP (auth), drive-thru (API).
- **Capstone = grand opening**: semua bagian buka bareng + diuji (`test` hijau) + cabang online (deploy). Satu saja mogok → opening gagal — makanya checklist!

### Langkah 0 — Siapkan Device
- Sama Django W1: `runserver` di `8000` (+ paket minggu ini).

### Cara Komputer Membaca
- CHECKLIST (model + auth + API + test + deploy) lalu URL + video.

### 3 Istilah Wajib
- 1. **Capstone/deploy**: gabung/buka

---

## Eksperimen

- **Hijau:** `tambah_produk('Kopi', 12000)` → JUMLAH=4?
- **Kuning:** `tambah_produk('Teh', 0)` → ditolak (None)? Kenapa?
- **Merah:** Hapus `@login_required` → `daftar` bisa dibuka tanpa login? Pasang lagi.

## Tantangan

****Toko Django Grand Opening:** gabungkan `tambah_produk` + `daftar` + `api_produk`: tambah field `stok`, tolak jual saat stok 0, tampilkan stok di API.**

Hijau: stok berkurang tiap jual. Kuning: stok 0 → pesan habis. Merah: tulis 1 `TestCase` hijau + deploy (Tugas).

## Glosarium Mini

- Lihat Istilah Wajib di atas.

## Ringkasan

Minggu 12: **Capstone Django** — toko lengkap, **Selesai Django 0→Ahli!**
