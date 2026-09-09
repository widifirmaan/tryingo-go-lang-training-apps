# Networking — Telepon Antar Peti Docker

> **Kategori:** Docker | **Level:** Menengah | **Minggu 6:** Networking
> **Prasyarat:** Minggu 5 — **Volume & Data**.

## Tujuan Pembelajaran

- `docker network create warung-net` + `--network warung-net` agar peti panggil nama (`db:5432`) bukan IP (sumber: docs.docker.com/network)
- Bedakan `bridge` (default), `host`, `none`

---

## Kenapa Ini Penting Buat Kamu?

Web + DB beda peti tanpa network sama = web tidak temukan DB (IP berubah tiap start!). Dengan 1 network, web panggil `db` (nama) — IP berubah pun tetap ketemu via DNS Docker otomatis.

---

## Program: Telepon Warung

```bash
# 1. Buat jaringan + pasang 2 peti
docker network create warung-net

docker run --name db --network warung-net \
  -e POSTGRES_PASSWORD=rahasia -d postgres

docker run --name web --network warung-net \
  -p 8080:80 -d nginx

# 2. Panggil nama (bukan IP!)
docker exec -it web ping db -c 2
# → db ketemu! (DNS otomatis)

docker exec -it web getent hosts db
# → 172.18.0.2 db (IP bisa beda tiap start, nama tetap!)

# 3. Lihat & bersih
docker network ls
docker network inspect warung-net
docker network rm warung-net  # setelah peti dilepas
```

Aplikasi web sambung DB via `host=db` (bukan `localhost`!).

---

## Konsep Kunci

### Network = Jaringan Telepon Pribadi
1 network = 1 grup yang saling panggil nama. Beda network = tidak kenal.

### `bridge` / `host` / `none` = 3 Jenis
- `bridge` default (NAT, aman).
- `host` nempel host (cepat, tidak isolasi).
- `none` tanpa internet (rahasia).

---

## Penjelasan untuk Pemula

### Analogi: Grup WA Peti
- **Network = grup WA**: anggota grup bisa panggil nama. Beda grup tidak.

### Langkah 0 — Siapkan Device
- Docker jalan + 2 peti contoh.

### Cara Komputer Membaca
1. `--network warung-net` → peti gabung + dapat IP + DNS catat nama.
2. `ping db` → DNS jawab IP → paket sampai.

### 3 Istilah Wajib
1. **Network/bridge**: grup/default
2. **DNS nama**: panggil-nama

---

## Eksperimen

- **Hijau:** Tanpa `--network` sama, `ping db` dari web → tidak ketemu? Gabungkan → ketemu?
- **Kuning:** `inspect` → `Containers` ada 2?
- **Merah:** App pakai `localhost:5432` dari peti web → gagal? (localhost = peti sendiri!) Ganti `db:5432`.

---

## Tantangan

**Warung Terhubung:** Network `toko` + `db` (postgres) + `web` (node app `host=db`) + `ping` lulus + app baca DB.
- **Sambungan (Minggu 5 — Volume & Data):** pasang hasil tantangan ini ke alur itu; pastikan ujung-ke-ujung jalan.

---
## Glosarium Mini

- **Network/bridge/DNS**: grup/default/nama

---

## Ringkasan

Minggu 6 dari 12: **Telepon Antar Peti** (Level: Menengah). Panggil nama, bukan IP. Minggu depan: **Compose** — rakit sekali jalan.
