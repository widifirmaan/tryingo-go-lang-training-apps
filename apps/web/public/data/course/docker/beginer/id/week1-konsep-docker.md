# Konsep Docker — Peti Kemas untuk Aplikasi

> **Kategori:** Docker | **Level:** Pemula | **Minggu 1:** Konsep Docker

## Tujuan Pembelajaran

- Paham Docker seperti **peti kemas**: aplikasi + dependensi 1 paket, jalan di mana saja
- Bedakan `image` (cetak biru) vs `container` (peti yang jalan), vs `Dockerfile` (resep)
- Install Docker Desktop, cek `docker --version`, jalankan `docker run hello-world` dan `nginx`
- `docker ps`, `logs`, `stop`, `rm`

---

## Kenapa Ini Penting Buat Kamu?

Warung buka cabang: tanpa peti, bawa kompor, tabung, bumbu terpisah — ada yang ketinggalan. Dengan peti Docker, 1 peti berisi semua → buka di mana saja langsung jalan. Laptop teman, server, sama.

---

## Program: Peti Pertama

```bash
# Cek Docker terinstall
docker --version
docker run hello-world
# → Hello from Docker! (peti contoh)

# Jalankan toko demo (nginx) — peti web server
docker run --name warung-web -p 8080:80 -d nginx
# -p 8080:80 = pintu luar 8080 → dalam 80, -d = jalan di belakang
# Buka http://localhost:8080 → lihat "Welcome to nginx!"

# Lihat peti yang jalan
docker ps
docker logs warung-web
docker stop warung-web
docker rm warung-web

# Peti berinteraksi (masuk ke dalam)
docker run -it --rm alpine sh
# -it = interaktif, --rm = hapus setelah keluar
# Di dalam: ls, pwd, exit
```

**Install (sekali):** `docker.com` → Docker Desktop → Install → Restart → `docker --version` muncul.

**Tanpa install (coba):** `play-with-docker.com` di browser.

---

## Konsep Kunci

### Peti Kemas
- **Image** = cetak biru (resep + bahan) — `nginx`, `postgres`
- **Container** = peti yang jalan dari image — `warung-web`
- **Dockerfile** = resep tulis image (minggu 4)
- **Registry** = gudang cetak biru — Docker Hub

### Perintah Wajib
`docker run -p luar:dalam -d --name nama image`, `docker ps`, `logs`, `stop`, `rm`, `exec -it`.

---

## Penjelasan untuk Pemula

### Analogi

- **Image = cetak biru peti**: gambar + daftar isi.
- **Container = peti nyata**: 1 cetak bisa jadi 5 peti jalan.
- **Port `-p` = pintu gudang**: luar 8080, dalam 80.

---

## Eksperimen

- **Hijau:** `docker run -p 8081:80 -d nginx` kedua di 8081 → 2 toko jalan bareng?
- **Kuning:** `docker ps -a` lihat yang mati, `docker rm` hapus.
- **Merah:** Lupa `-p` → `localhost:8080` tidak bisa, harus `-p`.

---

## Tantangan

**Peti Warung:** `docker run --name db -e POSTGRES_PASSWORD=rahasia -p 5432:5432 -d postgres` → cek `docker logs db` → `docker ps`. Stop & hapus setelah.

---

## Glosarium Mini

- **Image/Container**: cetak/peti
- **Port**: pintu
- **Registry**: gudang cetak

---

## Ringkasan

Minggu 1: **Peti Kemas** — aplikasi jalan di mana saja. Minggu depan: **Image & Registry** — ambil & simpan cetak biru.
