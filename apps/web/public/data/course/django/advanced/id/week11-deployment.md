# Deployment — Buka Cabang Django

> **Kategori:** Django | **Level:** Lanjutan | **Minggu 11:** Deployment
> **Prasyarat:** Minggu 10 — **Caching**.

## Tujuan Pembelajaran

- `gunicorn` + `Vercel`/`Railway` deploy `warung-django.vercel.app`, `collectstatic`

---

## Kenapa Ini Penting Buat Kamu?

Lokal `localhost` hanya laptop. `gunicorn` + Railway + `collectstatic` + `DEBUG=False` = URL publik aman.

---

## Program

```bash
pip install gunicorn
python manage.py collectstatic
gunicorn toko.wsgi
# Deploy: vercel --prod atau railway
```

`settings.py`: `ALLOWED_HOSTS = ["*"]`, `DEBUG=False`, `DATABASE_URL` dari env.


---

## Penjelasan untuk Pemula

### Analogi: Buka Cabang Django
- **`runserver` = gerobak dorong**: enak keliling (dev), haram untuk cabang tetap (1 pembeli, mati saat tutup laptop!).
- **`gunicorn` = ruko + pegawai**: layani banyak pembeli bareng + hidup terus. `collectstatic` = pindahkan cat/spanduk (CSS) ke 1 gudang agar ruko produksi ketemu. `DEBUG=False` + env = kunci brankas cabang!

### Langkah 0 — Siapkan Device
- Sama Django W1: `runserver` di `8000` (+ paket minggu ini).

### Cara Komputer Membaca
- `collectstatic` kumpulkan CSS; `gunicorn` layani; env untuk rahasia (bukan file!).

### 3 Istilah Wajib
- 1. **gunicorn/collectstatic**: layani/kumpul-css

---

## Eksperimen

- **Hijau:** Jalankan Program apa adanya; catat 1 baris output pertama.
- **Kuning:** Ubah 1 angka/string di Program → tebak dulu, baru run.
- **Merah:** Hapus 1 baris di Program → error pertama apa? Kembalikan.

## Tantangan

**Deployment di Warungmu:** pakai `pip install gunicorn`, `python manage`, `gunicorn toko` hingga benar-benar jalan, lalu kerjakan tiga tingkat ini.
- **Hijau:** Jalankan Program minggu ini apa adanya; catat output yang keluar.
- **Kuning:** Ubah 1 nilai pada `pip install gunicorn`, `python manage`, `gunicorn toko`; tebak output SEBELUM run, lalu cocokkan.
- **Merah:** Gabungkan dengan **Caching** (Minggu 10): pasang hasilnya di alur itu, pastikan ujung-ke-ujung jalan.

## Glosarium Mini

- Lihat Istilah Wajib di atas.

## Ringkasan

Minggu 11: **Buka Cabang Django** — `gunicorn`. Minggu depan: **Capstone: Toko Django Lengkap**.
