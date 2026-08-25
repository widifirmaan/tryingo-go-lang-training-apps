# Image & Registry — Gudang Cetak Biru

> **Kategori:** Docker | **Level:** Pemula | **Minggu 2:** Image & Registry

## Tujuan Pembelajaran

- Cari & tarik image `docker pull`, lihat `docker images`, hapus `rmi`
- Tag `nginx:1.25` vs `nginx:latest`, layer, cache
- Push ke Docker Hub / login, `docker build -t namamu/warung:1.0 .` preview
- `docker save/load` untuk kirim file

---

## Kenapa Ini Penting Buat Kamu?

Cetak biru warung tidak cukup 1. Perlu versi `1.0`, `1.1`, simpan di gudang (Hub) biar cabang bisa `pull` yang sama — tidak bawa USB.

---

## Program: Gudang Cetak

```bash
# Cari & tarik
docker pull nginx:alpine
docker pull postgres:15

# Lihat koleksi
docker images
docker image ls

# Beri label versi sendiri (tag)
docker tag nginx:alpine warung/web:1.0
docker images | grep warung

# Simpan & load sebagai file (untuk kirim tanpa internet)
docker save warung/web:1.0 -o warung.tar
docker load -i warung.tar

# Hapus
docker rmi warung/web:1.0
docker rmi nginx:alpine # jika tidak dipakai container

# Login & push (butuh akun hub.docker.com)
docker login
# docker build -t namamu/warung:1.0 .
# docker push namamu/warung:1.0

# Lihat layer (kenapa pull kedua cepat? cache)
docker pull nginx:alpine # kedua kali: Already exists
```

---

## Konsep Kunci

### Tag = Versi
`nginx:latest` (terbaru), `nginx:1.25`, `postgres:15-alpine` (kecil). Jangan pakai `latest` di produksi — tidak pasti.

### Layer = Lapis Kue
Image terdiri lapis (OS, nginx, config). `pull` kedua hanya lapis baru.

### Registry = Gudang
Docker Hub = gudang umum. Private Hub = gudang pribadi.

---

## Penjelasan untuk Pemula

### Analogi: Gudang Cetak Biru

- **`pull` = ambil fotokopi cetak dari gudang**.
- **`tag` = stempel versi**: `warung:1.0` vs `warung:2.0`.
- **`push` = simpan fotokopi baru ke gudang**.

---

## Eksperimen

- **Hijau:** `docker pull postgres:15` lalu `docker images` → size?
- **Kuning:** `docker tag nginx:alpine warung:test` → 2 nama, 1 isi (same ID).
- **Merah:** `docker rmi postgres:15` saat container `db` masih jalan → error `image is being used`.

---

## Tantangan

**Gudang Versi:** `pull` `nginx:alpine` dan `nginx:1.25`, bandingkan `docker images` size. `tag` satu jadi `warung/nginx:warung` → `save` → `rmi` → `load`.

---

## Glosarium Mini

- **pull/push**: ambil/simpan
- **Tag**: versi
- **Layer**: lapis

---

## Ringkasan

Minggu 2: **Gudang Cetak** — ambil, tag, simpan. Minggu depan: **Container Management** — hidup, mati, volume.
