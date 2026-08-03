# Volume: Data Bertahan Hidup

> Docker | Multi-Container | Pelajaran 9

## Tujuan Pembelajaran

- Menjelaskan mengapa data di container tidak bertahan
- Membuat dan memakai named volume dengan -v
- Membuktikan data bertahan setelah container dihapus
- Mengelola siklus hidup volume

---

## Program: Volume: Data Bertahan Hidup

```docker
# Buat volume bernama
docker volume create pgdata
docker volume ls

# Jalankan Postgres dengan volume
docker run -d --name db -e POSTGRES_PASSWORD=rahasia123 -v pgdata:/var/lib/postgresql/data postgres:16-alpine
docker exec db cat /var/lib/postgresql/data/PG_VERSION

# Hapus container - data AMAN di volume
docker stop db
docker rm db

# Jalankan lagi dengan volume yang sama - data masih ada!
docker run -d --name db2 -e POSTGRES_PASSWORD=rahasia123 -v pgdata:/var/lib/postgresql/data postgres:16-alpine
docker exec db2 cat /var/lib/postgresql/data/PG_VERSION

# Bersihkan
docker stop db2
docker rm db2
docker volume rm pgdata
```

---

## Penjelasan

## Masalah: Container itu Ephemeral
Layer tulis container dihapus bersama containernya. Database tanpa volume = kehilangan semua data saat container restart atau dihapus. Solusi: volume - penyimpanan yang hidup di luar siklus hidup container. Dockerfile menyimpan "resep"; volume menyimpan "data".
## Named Volume
-v pgdata:/var/lib/postgresql/data memasang volume pgdata ke direktori data Postgres di dalam container. Nama (pgdata) membuatnya bisa dipakai ulang: container kedua, misal db2, memasang volume yang sama dan melihat data yang sama. Perhatikan di skrip: PG_VERSION (dibuat oleh Postgres saat init) masih terbaca setelah container pertama dihapus.
## Kenapa Nama Direktori Berbeda
Gunakan jalur yang BENAR-BENAR dipakai aplikasi untuk menyimpan datanya. Postgres: /var/lib/postgresql/data. Nginx: /usr/share/nginx/html. Redis: /data. Salah pasang = aplikasi jalan tapi datanya tidak pernah masuk volume (dan hilang). Cek dokumentasi image resmi untuk jalur resminya.
## Siklus Hidup Volume
docker volume ls melihat daftar, docker volume rm menghapus. Penting: menghapus container TIDAK menghapus volume. Volume yatim (tidak dipakai container) menumpuk disk - awasi dengan docker volume ls. Bind mount (pelajaran 12) adalah alternatif untuk direktori host tertentu, tapi untuk produksi, named volume lebih portabel.

---

## Eksperimen

1. **Masalah: Container itu Ephemeral**
2. **Named Volume**
3. **Kenapa Nama Direktori Berbeda**
4. **Siklus Hidup Volume**

---

## Tantangan

Jalankan skrip. Lalu buktikan sendiri: setelah menulis data ke volume (buat file dengan docker exec db2 sh -c "echo halo > /var/lib/postgresql/data/test.txt"), hapus container, jalankan container baru dengan volume yang sama, dan baca file itu. Mengapa ini penting untuk database?

---

## Ringkasan

Container ephemeral, volume bertahan. Named volume dipasang dengan -v nama:jalur. Pasang jalur yang benar-benar dipakai aplikasi. Volume tidak ikut terhapus bersama container. Lanjut: networking antar container.
