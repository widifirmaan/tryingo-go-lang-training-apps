# Best Practices Dockerfile

> Docker | Produksi | Pelajaran 13

## Tujuan Pembelajaran

- Menerapkan urutan instruksi yang ramah cache
- Membandingkan image single-stage vs multi-stage
- Menjelaskan peran .dockerignore
- Menggunakan tag yang deskriptif dan tidak floating

---

## Program: Best Practices Dockerfile

```docker
# Build "single" (satu stage) vs "web" (multi-stage)
docker build -t tryngo/single:1.0 single
docker build -t tryngo/shop-web:2.0 web

# Bandingkan ukuran image
docker images

# Build ulang = cache layer dipakai (perhatikan output)
docker build -t tryngo/shop-web:2.1 web

# .dockerignore: build context tetap kecil
docker build -t tryngo/shop-web:2.2 web
```

---

## Penjelasan

## Urutkan Instruksi dari yang Jarang Berubah
Cache layer bekerja per instruksi: layer hanya dibangun ulang jika instruksinya berubah ATAU semua yang di bawahnya berubah. Karena itu salin dependency dulu (package.json / requirements.txt / go.mod), RUN install-nya, baru COPY source. Ubah satu baris kode = hanya layer terakhir yang dibangun ulang. Salin source dulu, install belakangan = setiap commit membangun ulang dependency yang mahal.
## Satu Tujuan per Layer vs Layer Kurus
Dulu: "setiap RUN satu tool". Sekarang: gabung perintah terkait dalam satu RUN (apt-get update && install) dan bersihkan cache di RUN yang sama. Layer kurus = image kecil dan aman (tidak ada artefak sisa). Dua aturan praktik: (1) gabungkan install + cleanup, (2) pisahkan hal yang frekuensi perubahannya berbeda.
## Multi-stage: Toolchain vs Runtime
Perbandingan di skrip menunjukkan intinya: single membawa seluruh toolchain build (ukuran besar), web (multi-stage) hanya menyalin hasil build ke base minimal. Ukuran image runtime menentukan: kecepatan pull, serangan supply-chain, biaya storage registry. Rencana produksi: stage build (node/rust/go), stage runtime (alpine/scratch).
## .dockerignore dan Konteks Bersih
COPY . menyalin build context - semua yang bukan .dockerignore. node_modules, .git, dist, file env masuk image? .dockerignore (pola seperti .gitignore) menjaga konteks tetap kecil dan mencegah rahasia lokal masuk image.

---

## Eksperimen

1. **Urutkan Instruksi dari yang Jarang Berubah**
2. **Satu Tujuan per Layer vs Layer Kurus**
3. **Multi-stage: Toolchain vs Runtime**
4. **.dockerignore dan Konteks Bersih**

---

## Tantangan

Hitung sendiri: apa perbedaan ukuran tryngo/single:1.0 vs tryngo/shop-web:2.0? Mengapa? Lalu salin isi proyek single ke folder baru, tambahkan .dockerignore yang mengecualikan README.md, bangun ulang, dan bandingkan ukuran image. Tuliskan hasilnya.

---

## Ringkasan

Dependency dulu, source belakangan (cache). Layer kurus dengan install+cleanup. Multi-stage: toolchain di build, hasil di runtime. .dockerignore = konteks bersih. Lanjut: image produksi.
