# Docker Compose: Infrastruktur sebagai Kode

> Docker | Multi-Container | Pelajaran 11

## Tujuan Pembelajaran

- Membaca definisi service di docker-compose.yml
- Menjalankan seluruh stack dengan compose up
- Melihat log semua service dengan compose logs
- Menjelaskan perbedaan up, down, dan stop

---

## Program: Docker Compose: Infrastruktur sebagai Kode

```docker
# Lihat definisi stack (vote: web + redis + db)
docker compose -f compose/vote/docker-compose.yml config

# Jalankan seluruh stack sekali jalan
docker compose -f compose/vote/docker-compose.yml up -d
docker ps

# Log semua service
docker compose -f compose/vote/docker-compose.yml logs

# Perbesar skala worker
docker compose -f compose/vote/docker-compose.yml up -d --scale worker=3
docker ps

# Matikan stack, network & volume ikut dibersihkan
docker compose -f compose/vote/docker-compose.yml down
```

---

## Penjelasan

## Dari 5 Perintah ke 1 File
Menjalankan stack multi-container tanpa Compose = menghafal urutan 5+ perintah: buat network, jalankan web dengan flag -p dan -v, jalankan db dengan env, dll. Compose menggantikannya dengan SATU file YAML: service mana, image apa, port apa, env apa, volume mana, network mana. Infrastruktur menjadi kode: bisa di-version-control, di-review, di-reproduksi.
## Anatomi docker-compose.yml
services: daftar service, masing-masing dengan image (atau build), ports, environment, volumes, networks, depends_on. Compose otomatis membuat network untuk stack, dan service dipanggil dengan namanya (web, db, redis) - DNS internal yang sama dari pelajaran 10.
## up, down, stop - Bukan Hal yang Sama
compose up = bangun dan mulai semua (idempotent: yang sudah jalan dibiarkan, yang berubah di-update). compose down = HENTIKAN SEMUA + hapus container, network, dan (dengan -v) volume. compose stop = hentikan container tapi jangan hapus apa pun. down -v di praktik baik jarang dipakai - volume data dibiarkan hidup.
## depends_on: Urutan Bukan Kesiapan
depends_on hanya menjamin URUTAN start, bukan bahwa service SUDAH SIAP. Postgres yang baru pertama kali init butuh detik; app yang start lebih cepat akan gagal konek. Solusi modern: healthcheck + condition: service_healthy (pelajaran 12).

---

## Eksperimen

1. **Dari 5 Perintah ke 1 File**
2. **Anatomi docker-compose.yml**
3. **up, down, stop - Bukan Hal yang Sama**
4. **depends_on: Urutan Bukan Kesiapan**

---

## Tantangan

Jalankan skrip, amati urutan container yang dibuat. Lalu coba: docker compose -f compose/vote/docker-compose.yml ps sebelum up - apa yang terjadi? Setelah up, ubah isi docker-compose.yml (misalnya port web) dan up lagi - apa yang berubah? Tuliskan pengamatan Anda.

---

## Ringkasan

Compose = satu file YAML menggantikan rantai perintah. up membuat, down menghapus semuanya, stop menghentikan saja. depends_on = urutan, bukan kesiapan. Lanjut: stack nyata dengan healthcheck.
