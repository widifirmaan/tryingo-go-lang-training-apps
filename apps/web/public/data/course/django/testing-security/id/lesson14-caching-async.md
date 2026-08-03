# Caching, Redis & Async Views

> Django | Testing & Keamanan | Pelajaran 14

## Tujuan Pembelajaran

- Mengonfigurasi cache backend (LocMem → Redis)
- Menggunakan @cache_page dan cache manual (cache.get/set)
- Menulis async views (Django 5+)
- Memilih strategi cache: apa yang di-cache, kapan di-invalidasi

---

## Program: Caching, Redis & Async Views

```python
import asyncio

from django.core.cache import cache
from django.http import HttpResponse
from django.shortcuts import render
from django.views.decorators.cache import cache_page

from .models import Produk


# cache_page: seluruh response di-cache 60 detik (per URL)
@cache_page(60)
def daftar(request):
    produk = Produk.objects.all()
    return render(request, 'katalog/daftar.html', {'produk': produk})


# Cache manual: kontrol penuh atas kunci & TTL
def statistik(request):
    key = 'statistik_produk'
    data = cache.get(key)
    if data is None:
        # MISS: hitung (mahal), lalu simpan 5 menit
        data = {
            'jumlah': Produk.objects.count(),
            'rata_rata': float(Produk.objects.aggregate(
                avg=__import__('django.db.models', fromlist=['Avg']).Avg('harga')
            )['avg'] or 0),
        }
        cache.set(key, data, 300)
    return render(request, 'katalog/statistik.html', {'data': data})


# Async view (Django 5+): await untuk I/O yang lama
async def kesehatan(request):
    # contoh: await fetch ke service lain (httpx, dsb.)
    await asyncio.sleep(0.01)
    return HttpResponse('OK')
```

---

## Penjelasan

## Cache: Server Menghafal Pekerjaan
Cache menyimpan hasil yang mahal (query berat, response penuh, perhitungan) di memori dengan TTL. @cache_page(60) men-cache response view per URL selama 60 detik - query database di-skip untuk semua request dalam jendela itu. Pola cache yang umum: halaman publik read-heavy (berita, katalog), statistik, konfigurasi, rate-limit counter.
## Manual Cache: Kontrol Penuh
cache.get(key) → None saat MISS, lalu hitung + cache.set(key, data, 300). Pola read-through: cek → hitung → simpan. Kunci harus deterministik: f'statistik_{kategori_id}'. Invalidasi: cache.delete(key) setelah data berubah (buat produk baru = hapus kunci statistik). Tanpa invalidasi, pengguna melihat data basi sampai TTL habis - pilih TTL sesuai toleransi kesegaran data.
## Redis: Cache Bersama untuk Banyak Server
LocMemCache = per-proses (hilang saat restart, tidak berbagi antar server). Produksi: django-redis (RedisCache) - SATE cache + sesi + queue (Celery), diakses semua worker. Config: CACHES.default.BACKEND = django_redis.cache.RedisCache + LOCATION redis://... (pelajaran 15: Docker Redis).
## Async Views: I/O Panjang Tidak Memblokir
View biasa sinkron: request menunggu I/O (HTTP ke service lain, file besar) dengan worker terikat. async def view + await membebaskan worker untuk request lain selama menunggu - ideal untuk integrasi API dan WebSocket. Catatan: ORM tetap sinkron (sync_to_async untuk memanggilnya dari view async). Django 6 (rilis akhir 2025) membawa dukungan async yang matang - riset 2026 menyebutnya non-opsional.

---

## Eksperimen

1. **Cache: Server Menghafal Pekerjaan**
2. **Manual Cache: Kontrol Penuh**
3. **Redis: Cache Bersama untuk Banyak Server**
4. **Async Views: I/O Panjang Tidak Memblokir**

---

## Tantangan

Tingkatkan performa: (1) pasang cache berbasis file (FileBasedCache) lalu Redis via Docker (redis:7-alpine + django-redis) - bandingkan keduanya, (2) tambahkan cache pada query set (qs = Produk.objects.all(); qs = qs.cache()) dengan versioning key, (3) buat halaman /flush-cache/ (staff only) yang memanggil cache.clear(), (4) tulis satu endpoint async yang memanggil https://httpbin.org/delay/1 dengan httpx.AsyncClient - bandingkan waktu dengan versi sinkron.

---

## Ringkasan

Cache = hasil mahal disimpan. @cache_page + manual + TTL + invalidasi. Redis = cache bersama. Async views untuk I/O. Lanjut: produksi.
