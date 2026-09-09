# Volume & Data — Lemari Tetap Docker

> **Kategori:** Docker | **Level:** Menengah | **Minggu 5:** Volume & Data Persistence
> **Prasyarat:** Minggu 4 — **Dockerfile**.

## Tujuan Pembelajaran

- `docker volume create warung-data` + `-v warung-data:/var/lib/postgresql/data` agar `docker rm` tidak hapus data (sumber: docs.docker.com/storage/volumes)
- Bedakan volume (tetap) vs bind mount (`-v $(pwd):/app` untuk kode) vs tmpfs

---

## Kenapa Ini Penting Buat Kamu?

Tanpa volume, `docker rm db` → 10.000 baris stok hilang permanen. Dengan volume, data di luar peti — hapus container 100x, data tetap. Bind mount untuk kode (edit di laptop langsung masuk peti, tanpa rebuild).

---

## Program: Lemari Tetap Warung

```bash
# 1. Volume bernama (tetap, dikelola Docker)
docker volume create warung-data
docker run --name db -v warung-data:/var/lib/postgresql/data \
  -e POSTGRES_PASSWORD=rahasia -p 5432:5432 -d postgres

docker exec -it db psql -U postgres -c "CREATE TABLE produk (id SERIAL PRIMARY KEY, nama TEXT);"
docker exec -it db psql -U postgres -c "INSERT INTO produk (nama) VALUES ('Beras');"

# 2. Buktikan tetap: hapus peti, data ada!
docker rm -f db
docker run --name db2 -v warung-data:/var/lib/postgresql/data \
  -e POSTGRES_PASSWORD=rahasia -p 5432:5432 -d postgres
docker exec -it db2 psql -U postgres -c "SELECT * FROM produk;"
# → Beras masih ada!

# 3. Bind mount untuk kode (edit langsung)
docker run --name web -v $(pwd)/index.html:/usr/share/nginx/html/index.html:ro -p 8080:80 -d nginx
# Edit index.html di laptop → refresh browser langsung berubah!

docker volume ls
docker volume inspect warung-data
```

---

## Konsep Kunci

### Volume vs Bind vs Tmpfs
- `volume` (`-v nama:/data`): tetap, dikelola Docker di `/var/lib/docker/volumes` — untuk DB.
- `bind` (`-v $(pwd)/file:/file`): file laptop langsung — untuk kode dev.
- `tmpfs`: RAM saja (hilang) — untuk rahasia sementara.

### `:ro` = Baca Saja
`.../index.html:ro` peti tidak bisa ubah file laptop (aman).

---

## Penjelasan untuk Pemula

### Analogi: Lemari vs Tas Jinjing
- **Volume = lemari di gudang**: peti (penghuni) pindah, lemari tetap.
- **Bind = tas jinjing**: barang laptop dibawa masuk peti langsung.

### Langkah 0 — Siapkan Device
- Docker Desktop jalan + `docker volume ls` kosong.

### Cara Komputer Membaca
1. `-v warung-data:/var/lib/...` → Docker pasang lemari ke folder itu di peti.
2. Postgres tulis → masuk lemari (bukan peti) → `rm` aman.

### 3 Istilah Wajib
1. **Volume/bind**: lemari/tas
2. **ro**: baca-saja

---

## Eksperimen

- **Hijau:** Tanpa `-v`, isi DB → `rm` → buat lagi → hilang? (Bukti butuh volume!)
- **Kuning:** `docker volume inspect warung-data` → `Mountpoint` di mana?
- **Merah:** Bind tanpa `:ro` + `echo x > file` dari dalam peti → file laptop berubah? (Bahaya! Pakai `:ro`.)

---

## Tantangan

**Gudang Tetap Warung:** Volume `warung-data` + Postgres + isi 3 produk + `rm` + buat lagi + `SELECT` 3 tetap + bind `index.html` edit tanpa rebuild.

---

## Glosarium Mini

- **Volume/bind/tmpfs**: lemari/tas/RAM
- **ro/inspect**: baca-saja/intip

---

## Ringkasan

Minggu 5 dari 12: **Lemari Tetap** (Level: Menengah). Data selamat dari `rm`. Minggu depan: **Networking** — telepon antar peti.
