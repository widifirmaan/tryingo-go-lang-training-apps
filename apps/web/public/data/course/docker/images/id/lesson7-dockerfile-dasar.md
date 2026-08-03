# Dockerfile: Membangun Image Sendiri

> Docker | Image & Container | Pelajaran 7

## Tujuan Pembelajaran

- Menulis Dockerfile dengan FROM, WORKDIR, COPY, RUN, EXPOSE, CMD
- Membangun image dengan docker build
- Membedakan CMD dan ENTRYPOINT
- Mengenali pola multi-stage sejak dini

---

## Program: Dockerfile: Membangun Image Sendiri

```docker
# Bangun image dari Dockerfile (proyek web: multi-stage)
docker build -t tryngo/shop-web:1.0 web

# Image baru muncul di daftar
docker images

# Jalankan hasil build
docker run -d --name shop-web -p 8080:80 tryngo/shop-web:1.0
docker ps
docker exec shop-web ls /usr/share/nginx/html

# CMD bisa di-override saat run
docker run --rm tryngo/shop-web:1.0 echo "CMD diganti saat run!"

# Bersihkan
docker stop shop-web
docker rm shop-web
```

---

## Penjelasan

## Anatomi Dockerfile
Dockerfile = resep build, dieksekusi baris demi baris dari atas ke bawah, tiap baris menjadi satu layer. FROM = base image (jangan dari scratch kecuali Anda tahu alasannya). WORKDIR = direktori kerja (jangan lupa - COPY dan RUN berjalan relatif dari sini). COPY = salin file dari build context. RUN = eksekusi perintah build (install dependency, compile).
## Ekspos vs Publikasikan
EXPOSE 80 di Dockerfile hanyalah dokumentasi: "aplikasi ini mendengarkan di port 80". Ia TIDAK mempublikasikan apa pun. Publikasi terjadi saat run dengan -p, atau di Compose dengan ports. Jangan bingung - ini pertanyaan klasik di wawancara kerja DevOps.
## CMD vs ENTRYPOINT
CMD = perintah default, BISA di-override saat run: docker run image echo "halo" menggantikan CMD. ENTRYPOINT = perintah tetap, tidak bisa di-override (argumennya bisa ditambah). Pola umum: ENTRYPOINT untuk executable aplikasi, CMD untuk argumen default. Contoh di skrip: CMD nginx diganti saat run - terlihat di output.
## Multi-stage Sekilas
FROM dua kali dalam satu Dockerfile: stage pertama membangun (toolchain lengkap), stage kedua hanya menyalin hasilnya ke base minimal (nginx:alpine). Hasilnya image kecil dan aman tanpa toolchain build. Detail lengkapnya di pelajaran 13-14.

---

## Eksperimen

1. **Anatomi Dockerfile**
2. **Ekspos vs Publikasikan**
3. **CMD vs ENTRYPOINT**
4. **Multi-stage Sekilas**

---

## Tantangan

Jalankan skrip dan amati output build: berapa langkah, apa yang terjadi tiap langkah. Lalu docker run --rm tryngo/shop-web:1.0 ls / - bandingkan dengan docker exec shop-web ls /usr/share/nginx/html (jalankan container dulu). Apa perbedaan isi filesystem image build vs image runtime?

---

## Ringkasan

Dockerfile = resep layer demi layer. EXPOSE hanya dokumentasi; -p yang mempublikasikan. CMD bisa di-override, ENTRYPOINT tetap. Multi-stage = build kecil, runtime kecil. Lanjut: debug build dengan layer thinking.
