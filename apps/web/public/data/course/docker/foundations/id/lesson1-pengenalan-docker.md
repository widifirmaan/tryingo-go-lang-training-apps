# Pengenalan Docker: Masalah "Works on My Machine"

> Docker | Fondasi | Pelajaran 1

## Tujuan Pembelajaran

- Memahami akar masalah "works on my machine" dan mengapa container adalah jawabannya
- Membedakan image, container, dan registry
- Menjalankan container pertama dengan docker run
- Mengenal perintah dasar: version, info, images, ps

---

## Program: Pengenalan Docker: Masalah "Works on My Machine"

```docker
# 1) Cek lingkungan Docker Anda
docker version
docker info

# 2) Image yang tersedia (blueprint aplikasi)
docker images

# 3) Container yang sedang berjalan
docker ps

# 4) Container pertama Anda
docker run hello-world
docker ps -a
```

---

## Penjelasan

## Masalah "Works on My Machine"
Semua developer pernah mengalaminya: aplikasi jalan mulus di laptop kita, tapi error di laptop teman, di server staging, atau di production. Penyebabnya bukan "nasib sial" - itu environment drift: versi bahasa berbeda, dependency versi beda, konfigurasi OS beda. Docker menjawabnya dengan satu kalimat: aplikasi dikemas beserta seluruh lingkungannya.
## Image vs Container vs Registry
Image adalah blueprint hanya-baca: aplikasi + runtime + konfigurasi dalam satu paket. Container adalah instance image yang berjalan. Registry adalah gudang image (Docker Hub adalah yang terbesar). Analogi: image = kelas/recipe, container = objek/hidangan yang dimasak dari recipe itu, registry = buku resep dunia.
## Kenapa Container Penting di 2026
Riset menunjukkan sekitar 92% organisasi IT memakai container dan adopsi Docker mencapai sekitar 71% di kalangan developer. Bukan tren - container menjadi standar de facto untuk mengemas dan mendistribusikan software, dari laptop developer sampai production cluster.
## Yang Akan Anda Kuasai
Track ini 16 pelajaran: mental model container, image dan Dockerfile, data dan jaringan, compose dan orkestrasi. Setiap pelajaran punya skrip yang bisa langsung dijalankan di playground simulator di sebelah kanan - tanpa perlu menginstal Docker.

---

## Eksperimen

1. **Masalah "Works on My Machine"**
2. **Image vs Container vs Registry**
3. **Kenapa Container Penting di 2026**
4. **Yang Akan Anda Kuasai**

---

## Tantangan

Jalankan skrip di playground dan amati output-nya. Lalu ketik manual: docker images, docker ps, dan docker run hello-world sekali lagi. Pertanyaan: kenapa docker run hello-world langsung selesai (bukan berjalan terus)? Tulis jawabanmu satu kalimat - jawabannya menjadi fondasi pelajaran 2.

---

## Ringkasan

Masalah "works on my machine" berasal dari environment drift; Docker mengemas aplikasi + lingkungannya. Image = blueprint, container = instance, registry = gudang image. Lanjut: mental model container = proses.
