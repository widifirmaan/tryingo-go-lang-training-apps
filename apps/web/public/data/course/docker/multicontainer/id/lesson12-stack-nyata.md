# Stack Nyata: Web + API + DB + Redis

> Docker | Multi-Container | Pelajaran 12

## Tujuan Pembelajaran

- Menggunakan healthcheck + depends_on: service_healthy
- Menjalankan stack 4 service dengan satu perintah
- Membaca log service tertentu
- Menskala service secara horizontal

---

## Program: Stack Nyata: Web + API + DB + Redis

```docker
# Stack shop: web, api, redis, db - lihat definisinya
docker compose -f compose/shop/docker-compose.yml config

# Naikkan stack dengan healthcheck
docker compose -f compose/shop/docker-compose.yml up -d
docker ps
docker compose -f compose/shop/docker-compose.yml ps

# Log tiap service
docker compose -f compose/shop/docker-compose.yml logs api

# Skala horizontal: 2 replika API
docker compose -f compose/shop/docker-compose.yml up -d --scale api=2
docker compose -f compose/shop/docker-compose.yml ps

# Matikan semuanya
docker compose -f compose/shop/docker-compose.yml down
```

---

## Penjelasan

## Pola Aplikasi Modern
Aplikasi web nyata jarang satu service: web server (frontend/nginx), API backend, database (Postgres), cache (Redis). Masing-masing image resmi + konfigurasi masing-masing. Compose menyatukan semuanya dalam satu file - siklus hidup stack = satu perintah.
## healthcheck: Kesiapan yang Sebenarnya
depends_on: db saja tidak cukup (pelajaran 11). Compose modern mendukung depends_on: db: condition: service_healthy. healthcheck mendefinisikan perintah pemeriksaan (misal pg_isready atau wget ke /health). Compose menunggu service sehat SEBELUM memulai dependennya. Ini perbedaan antara "app crash 3 detik lalu berhasil" dan "app mulai saat DB benar-benar siap".
## Membaca dan Memfilter Log
compose logs menampilkan log semua service; compose logs api hanya log API. Log terstruktur (JSON, key=value) jauh lebih mudah dicari daripada log bebas. Ini juga yang dipakai platform observasi produksi.
## Skala Horizontal dengan --scale
--scale api=2 membuat 2 replika service yang sama (naming: api_1, api_2...). Untuk API tanpa state (stateless), ini cara murah menambah kapasitas. Perhatikan: Postgres TIDAK boleh di-scale - database dengan state tidak bisa diduplikasi begitu saja. "Container stateless di-scale, stateful di-hormati".

---

## Eksperimen

1. **Pola Aplikasi Modern**
2. **healthcheck: Kesiapan yang Sebenarnya**
3. **Membaca dan Memfilter Log**
4. **Skala Horizontal dengan --scale**

---

## Tantangan

Modifikasi: tambahkan healthcheck pada api di compose/shop/docker-compose.yml (bukan web), lalu perhatikan urutan start di docker ps saat up. Naikkan api ke 3 replika, periksa dengan compose ps, lalu turunkan kembali ke 1. Tuliskan apa yang Anda pelajari tentang orkestrasi.

---

## Ringkasan

Stack nyata = web + api + db + redis dalam satu file. healthcheck + service_healthy = kesiapan sejati. Stateless bisa di-scale, stateful tidak. Lanjut: best practices Dockerfile.
