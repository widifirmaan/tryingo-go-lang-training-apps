# Dockerfile — Resep Peti Sendiri

> **Kategori:** Docker | **Level:** Pemula | **Minggu 4:** Dockerfile
> **Prasyarat:** Minggu 3 — **Container Management**.

## Tujuan Pembelajaran

- Tulis `Dockerfile` `FROM`, `COPY`, `RUN`, `CMD`, `docker build -t warung:1.0 .` bikin cetak biru sendiri

---

## Kenapa Ini Penting Buat Kamu?

Tanpa Dockerfile, pakai `nginx` orang lain. Dengan Dockerfile, bikin peti warung dengan `index.html` sendiri.

---

## Program: Resep Warung

```dockerfile
# Dockerfile — di folder warung/
FROM nginx:alpine
COPY index.html /usr/share/nginx/html/index.html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
```

```html
<!-- index.html -->
<h1>Warung Bu Siti — Docker</h1><p>Buka 07.00-20.00</p>
```

```bash
docker build -t warung:1.0 .
docker run -p 8080:80 -d warung:1.0
# Buka http://localhost:8080 → "Warung Bu Siti"
docker push warung:1.0 # jika mau ke Hub
```

---

### Bonus: HEALTHCHECK + .dockerignore (best practice docs.docker.com!)

```dockerfile
# Tambah di Dockerfile — Docker cek warung hidup tiap 30 detik!
HEALTHCHECK --interval=30s --timeout=3s CMD wget -qO- http://localhost:80/ || exit 1
```

```
# .dockerignore — JANGAN bawa sampah ke image (sebelah Dockerfile)!
node_modules
.git
*.log
.env
```
- Tanpa `.dockerignore`, `COPY . .` bawa `node_modules` 500MB + `.env` rahasia BOCOR ke image! `docker build` juga jadi lambat.
- Cek sehat: `docker ps` kolom STATUS → `healthy` (bukan cuma `Up`)!

---

## Eksperimen

- **Hijau:** Jalankan Program apa adanya; catat 1 baris output pertama.
- **Kuning:** Ubah 1 angka/string di Program → tebak dulu, baru run.
- **Merah:** Hapus 1 baris di Program → error pertama apa? Kembalikan.

## Tantangan

**Dockerfile di Warungmu:** jalankan ulang hingga benar-benar jalan, lalu kerjakan tiga tingkat ini.
- **Hijau:** Jalankan Program minggu ini apa adanya; catat output yang keluar.
- **Kuning:** Ubah 1 nilai di Program; tebak output SEBELUM run, lalu cocokkan.
- **Merah:** Gabungkan dengan **Container Management** (Minggu 3): pasang hasilnya di alur itu, pastikan ujung-ke-ujung jalan.

## Glosarium Mini

- **Dockerfile/build**: resep/panggang

## Ringkasan

Minggu 4: **Resep Peti** — Dockerfile `FROM/COPY/RUN`. Minggu depan: **Volume & Data**.
