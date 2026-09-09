# Caching — Laci Cepat Django

> **Kategori:** Django | **Level:** Lanjutan | **Minggu 10:** Caching
> **Prasyarat:** Minggu 9 — **Testing**.

## Tujuan Pembelajaran

- `cache.set("produk", data, 60)` laci 60 detik, `@cache_page(60)` halaman

---

## Kenapa Ini Penting Buat Kamu?

Query berat 100x/menit tanpa cache = DB kepanasan. Dengan `cache.get/set` 60 detik, 99x dari laci (0.1ms).

---

## Program

```python
from django.core.cache import cache

def daftar(request):
    data = cache.get("produk")
    if not data:
        data = list(Produk.objects.all().values())
        cache.set("produk", data, 60) # 60 detik
    return render(request, "daftar.html", {"produk": data})
```

`settings.py`: `CACHES = {"default": {"BACKEND": "django.core.cache.backends.locmem.LocMemCache"}}`


---

## Penjelasan untuk Pemula

### Analogi: Laci Cepat Django
- **Tanpa cache = tiap pembeli tanya gudang**: 100x/menit → gudang (DB) kepanasan, toko lambat.
- **`cache.get` cek laci dulu**: ada → 0.1ms; kosong → hitung sekali → `cache.set(kunci, data, 60)` → 99 pembeli berikut dari laci. Kunci + detik = nama laci + kadaluarsa!

### Langkah 0 — Siapkan Device
- Sama Django W1: `runserver` di `8000` (+ paket minggu ini).

### Cara Komputer Membaca
- `cache.get` cek laci; kosong → hitung → `cache.set(kunci, data, 60)`.

### 3 Istilah Wajib
- 1. **cache.get/set**: cek/simpan-laci

---

## Eksperimen

- **Hijau:** Jalankan apa adanya, lalu ubah nilai `daftar` → output ikut berubah?
- **Kuning:** Ubah huruf besar-kecil `daftar` → masih jalan atau error?
- **Merah:** Hapus baris `from django.core.cache import cache` → error apa? Pasang lagi.

## Tantangan

**Caching di Warungmu:** pakai `daftar`, `django` hingga benar-benar jalan, lalu kerjakan tiga tingkat ini.
- **Hijau:** Jalankan Program minggu ini apa adanya; catat output yang keluar.
- **Kuning:** Ubah 1 nilai pada `daftar`, `django`; tebak output SEBELUM run, lalu cocokkan.
- **Merah:** Gabungkan dengan **Testing** (Minggu 9): pasang hasilnya di alur itu, pastikan ujung-ke-ujung jalan.

## Glosarium Mini

- Lihat Istilah Wajib di atas.

## Ringkasan

Minggu 10: **Laci Cepat** — `cache` 60 detik. Minggu depan: **Deployment**.
