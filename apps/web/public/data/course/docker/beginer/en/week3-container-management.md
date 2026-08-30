# Container Management — Hidup, Mati, dan Data Tetap

> **Kategori:** Docker | **Level:** Pemula | **Minggu 3:** Container Management

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

## Ringkasan

Minggu 3: **Data Tetap** — volume & network.
