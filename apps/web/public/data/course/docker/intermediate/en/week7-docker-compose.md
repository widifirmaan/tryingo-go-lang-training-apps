# Docker Compose — Rakit Warung Sekali Jalan

> **Kategori:** Docker | **Level:** Menengah | **Minggu 7:** Docker Compose

## Tujuan Pembelajaran

- `docker-compose.yml` (`services`, `ports`, `environment`, `volumes`, `depends_on`) + `docker compose up -d` / `logs` / `down` (sumber: docs.docker.com/compose)

---

## Kenapa Ini Penting Buat Kamu?

Web + DB + cache = 3 perintah `docker run` panjang tiap pagi (lupa 1 flag = rusak). Dengan 1 file `compose.yml`, `up` 1x jalan semua — tim dapat file sama, hasil sama.

---

## Program: Rakit Warung 3 Peti

```yaml
# docker-compose.yml — 1 file untuk semua
services:
  web:
    build: .
    ports: ["8080:80"]
    depends_on: [db]
  db:
    image: postgres:15
    environment: { POSTGRES_PASSWORD: rahasia }
    volumes: [warung-data:/var/lib/postgresql/data]
  cache:
    image: redis:7
volumes:
  warung-data:
```

```bash
docker compose up -d        # rakit + jalan semua
docker compose ps           # 3 peti UP?
docker compose logs db      # intip log 1 peti
docker compose down         # matikan (+ hapus peti, volume tetap!)
docker compose down -v      # + hapus volume (hati-hati!)
```

---

## Konsep Kunci

### `services` / `volumes` = Daftar Peti/Lemari
Tiap service 1 peti. `volumes:` bawah = lemari bernama.

### `depends_on` = Urutan
`web` tunggu `db` start dulu (start saja, bukan siap! Untuk siap pakai `healthcheck`).

### `up` / `down` / `logs` = Nyalakan/Matikan/Intip

---

## Penjelasan untuk Pemula

### Analogi: Denah Rakit Warung
- **compose.yml = denah**: "web di sini, db di sana, 1 lemari".
- **up = bangun serentak** sesuai denah.

### Langkah 0 — Siapkan Device
- Docker Desktop (compose sudah termasuk) + file `docker-compose.yml`.

### Cara Komputer Membaca
1. `up` → baca YAML → buat network + volume + 3 peti berurutan.

### 3 Istilah Wajib
1. **Compose/services**: rakit/daftar-peti
2. **depends_on/volumes**: urutan/lemari

---

## Eksperimen

- **Hijau:** `up` → `ps` 3 UP? `down` → hilang?
- **Kuning:** `down` lalu `up` → data DB tetap? (Volume!)
- **Merah:** `down -v` → data hilang? (Hati-hati di produksi!)

---

## Tantangan

**Warung Rakit Lengkap:** `web` (nginx + bind `index.html`) + `db` (postgres + volume) + `up` → buka `:8080` + `exec` cek DB + `down` (tanpa `-v`).

---

## Glosarium Mini

- **Compose/up/down**: rakit/nyala/mati
- **depends_on**: urutan

---

## Ringkasan

Minggu 7 dari 12: **Rakit Sekali Jalan** (Level: Menengah). 1 file semua. Minggu depan: **Multi-Stage** — peti diet.
