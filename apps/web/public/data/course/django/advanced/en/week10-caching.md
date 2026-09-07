# Caching — Laci Cepat Django

> **Kategori:** Django | **Level:** Lanjutan | **Minggu 10:** Caching

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
- Lihat Program: jalankan perintahnya, ubah 1 hal, lihat bedanya.

### Langkah 0 — Siapkan Device
- Sama Django W1: `runserver` di `8000` (+ paket minggu ini).

### Cara Komputer Membaca
- `cache.get` cek laci; kosong → hitung → `cache.set(kunci, data, 60)`.

### 3 Istilah Wajib
- 1. **cache.get/set**: cek/simpan-laci

---

## Glosarium Mini

- Lihat Istilah Wajib di atas.

## Ringkasan

Minggu 10: **Laci Cepat** — `cache` 60 detik.
