# Container Management — Hidup, Mati, dan Data Tetap

> **Kategori:** Docker | **Level:** Pemula | **Minggu 3:** Container Management
> **Prasyarat:** Minggu 2 — **Image & Registry**.

## Tujuan Pembelajaran

- `docker run -v warung-data:/data` volume biar data tidak hilang saat `rm`, `docker network` hubungkan peti, `docker exec -it` masuk

---

## Kenapa Ini Penting Buat Kamu?

Tanpa volume, `docker rm db` → data stok hilang. Dengan volume, data di luar peti — aman.

---

## Program: Volume Warung

```bash
docker volume create warung-data
docker run --name db -v warung-data:/var/lib/postgresql/data -e POSTGRES_PASSWORD=rahasia -p 5432:5432 -d postgres
docker exec -it db psql -U postgres -c "CREATE TABLE produk (id SERIAL PRIMARY KEY, nama TEXT);"

# Cek volume
docker volume ls
docker volume inspect warung-data

# Hapus container tapi data tetap
docker rm -f db
docker run --name db2 -v warung-data:/var/lib/postgresql/data -e POSTGRES_PASSWORD=rahasia -p 5432:5432 -d postgres
# Data produk masih ada!

# Network: hubungkan web + db
docker network create warung-net
docker network connect warung-net db2
```

---

## Eksperimen

- **Hijau:** Jalankan Program apa adanya; catat 1 baris output pertama.
- **Kuning:** Ubah 1 angka/string di Program → tebak dulu, baru run.
- **Merah:** Hapus 1 baris di Program → error pertama apa? Kembalikan.

## Tantangan

**Container Management di Warungmu:** pakai `produk` hingga benar-benar jalan, lalu kerjakan tiga tingkat ini.
- **Hijau:** Jalankan Program minggu ini apa adanya; catat output yang keluar.
- **Kuning:** Ubah 1 nilai pada `produk`; tebak output SEBELUM run, lalu cocokkan.
- **Merah:** Gabungkan dengan **Image & Registry** (Minggu 2): pasang hasilnya di alur itu, pastikan ujung-ke-ujung jalan.

## Glosarium Mini

- **volume/network**: lemari/sambung

## Ringkasan

Minggu 3: **Data Tetap** — volume & network. Minggu depan: **Dockerfile**.
