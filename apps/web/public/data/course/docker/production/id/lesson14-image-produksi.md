# Image Produksi: Alpine, Slim, Distroless

> Docker | Produksi | Pelajaran 14

## Tujuan Pembelajaran

- Membedakan alpine, slim, distroless, dan scratch
- Membangun image Go yang sangat kecil (binary statis)
- Membaca jejak layer image produksi
- Menilai trade-off toolchain vs runtime di image

---

## Program: Image Produksi: Alpine, Slim, Distroless

```docker
# Program Go: build statis -> image tiny
docker build -t tryngo/goproj:1.0 goproj
docker images
docker history tryngo/goproj:1.0

# Jalankan binary statis
docker run --rm tryngo/goproj:1.0

# Bandingkan dengan image toolchain
docker run --rm golang:1.22-alpine ls /usr/local/go/bin
```

---

## Penjelasan

## Spektrum Base Image
Dari besar ke kecil: distribusi penuh (ubuntu/debian), slim (debian tanpa toolchain), alpine (musl, sangat kecil), distroless (hanya runtime, tanpa shell), scratch (kosong total). Aturan: pakai base seminimal mungkin yang masih bisa menjalankan aplikasi. image kecil = pull cepat, permukaan serangan kecil.
## Go: Kasus Ideal
Go dikompilasi statis: binary tidak butuh runtime di image. FROM scratch + COPY binary = image yang hanya berisi aplikasi Anda. Docker history goproj memperlihatkan: base kosong, binary disalin, selesai. Image Go yang bagus bisa ~10MB vs ~800MB base ubuntu.
## Kenapa Tidak Selalu Scratch
Binary statis butuh CA cert (HTTPS), zona waktu, user non-root - semua bisa disalin sebagai file ke scratch. Tapi jika aplikasi butuh shell (debug, entrypoint script), distroless atau alpine lebih praktis. Distroless menjalankan aplikasi sebagai non-root SECARA DEFAULT - menutup satu kelas kerentanan container escape.
## Trade-off yang Perlu Diingat
Alpine memakai musl, bukan glibc - beberapa library C native bisa bermasalah. Distroless tidak punya shell - tidak bisa docker exec sh (dan itu bagus untuk keamanan). Pilihan base image adalah keputusan keamanan DAN debugging: dokumentasikan alasan Anda memilih base di README.

---

## Eksperimen

1. **Spektrum Base Image**
2. **Go: Kasus Ideal**
3. **Kenapa Tidak Selalu Scratch**
4. **Trade-off yang Perlu Diingat**

---

## Tantangan

Jalankan skrip. Lalu coba: ubah Dockerfile goproj untuk memakai alpine (FROM alpine:3.20, tambahkan RUN apk add --no-cache ca-certificates), bangun sebagai tryngo/goproj:alpine. Bandingkan ukuran dan jalankan keduanya. Mana yang Anda pilih untuk produksi dan mengapa?

---

## Ringkasan

Base minimal: slim < alpine < distroless < scratch. Go statis = scratch ideal (~10MB). Non-root default di distroless. Setiap base punya trade-off keamanan/debug. Lanjut: registry, CI/CD, deploy.
