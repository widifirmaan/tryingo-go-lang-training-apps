# Image & Layer: Mengapa Image Tersusun

> Docker | Image & Container | Pelajaran 6

## Tujuan Pembelajaran

- Memahami image sebagai tumpukan layer hanya-baca
- Membaca riwayat layer dengan docker history
- Memberi nama versi image dengan docker tag
- Menjelaskan risiko tag :latest dan pentingnya pin versi

---

## Program: Image & Layer: Mengapa Image Tersusun

```docker
# Pull image = unduh lapisan demi lapisan
docker pull nginx:alpine

# Setiap image = tumpukan layer
docker history nginx:alpine

# Tag = nama dan versi image
docker tag nginx:alpine nginx:myweb
docker images

# Jangan pakai :latest di produksi - pin versi!
docker pull node:20-alpine
docker images

# Hapus image
docker rmi nginx:myweb
docker images
```

---

## Penjelasan

## Image = Tumpukan Layer
Image bukan satu file raksasa - ia tumpukan layer hanya-baca. Saat container dijalankan, Docker menambahkan satu layer tulis tipis di atasnya. Semua perubahan di dalam container hidup di layer tulis itu; hapus container, layer itu hilang. Image tidak pernah berubah - immutable. Perubahan = image baru (layer baru).
## Docker History: Membaca Arsip
docker history nginx:alpine memperlihatkan layer demi layer: base OS, lalu instruksi build selanjutnya. Ini alat forensik: kenapa image ini besar? Layer mana yang menyumbang ukuran? Ini juga yang membuat Dockerfile bisa di-debug secara ilmiah (pelajaran 8).
## Layer dan Cache
Karena layer di-cache, membangun ulang image tidak mengulang semuanya: hanya layer yang berubah (dan setelahnya) yang dibangun ulang. Konsekuensi praktisnya: urutkan instruksi Dockerfile dari yang jarang berubah ke yang sering berubah (dependency dulu, source belakangan). Ini kunci build cepat - dibahas dalam pelajaran 13.
## Tag dan Pinning
Tag = nama versi (nginx:alpine, node:20-alpine). Tag :latest itu "mengambang": hari ini berisi versi A, bulan depan versi B - build Anda bisa rusak tanpa perubahan kode apa pun. Di produksi, pin versi spesifik (bahkan digest sha256 untuk keamanan maksimal).

---

## Eksperimen

1. **Image = Tumpukan Layer**
2. **Docker History: Membaca Arsip**
3. **Layer dan Cache**
4. **Tag dan Pinning**

---

## Tantangan

Jalankan skrip. Lalu bandingkan dua image Node: docker history node:20-alpine dan docker history node:20-slim (pull dulu jika perlu). Image mana yang lebih banyak layer-nya? Mengapa? Tulis jawaban satu paragraf singkat.

---

## Ringkasan

Image = layer hanya-baca + layer tulis saat runtime. history membaca arsip layer; tag memberi nama versi; :latest mengambang dan berbahaya - pin versi. Lanjut: menulis Dockerfile.
