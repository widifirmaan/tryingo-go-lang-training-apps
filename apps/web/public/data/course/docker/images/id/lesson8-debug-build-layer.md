# Debug Build dengan Layer Thinking

> Docker | Image & Container | Pelajaran 8

## Tujuan Pembelajaran

- Menganalisis error build dengan layer thinking
- Memperbaiki Dockerfile yang rusak secara sistematis
- Men-debug dengan shell di layer terakhir yang sukses
- Menerapkan pola apt-get update && install dalam satu RUN

---

## Program: Debug Build dengan Layer Thinking

```docker
# Build yang GAGAL - perhatikan layer mana yang error
docker build -t tryngo/broken:latest broken

# Fix: apt-get update dulu, satu RUN, bersihkan cache
docker build -t tryngo/fixed:latest fixed
docker images

# Debug layer: jalankan shell di layer terakhir yang sukses
docker run -it --entrypoint sh ubuntu:24.04
```

---

## Penjelasan

## Tiap Baris Dockerfile = Satu Layer
Ini kunci debug build: Docker mengeksekusi instruksi satu per satu, masing-masing menjadi layer. Ketika build gagal di layer ke-N, semua layer sebelumnya sudah jadi - dan masih ada di cache. Pertanyaan yang tepat bukan "kenapa gagal?", melainkan "di layer MANA gagalnya?".
## Membaca Error Build
Build broken gagal di RUN apt-get install -y curl: "Unable to locate package curl". Penyebabnya klasik: image base ubuntu:24.04 fresh tidak punya daftar paket (apt lists) - harus apt-get update DULU sebelum install. Solusinya digabung dalam satu RUN: apt-get update && apt-get install -y --no-install-recommends curl.
## Debug di Layer Terakhir yang Sukses
Jangan Googling dulu. Jalankan shell di layer terakhir yang sukses: docker run -it --entrypoint sh ubuntu:24.04, lalu eksekusi manual perintah yang gagal di dalamnya. Anda melihat langsung pesan errornya di lingkungan yang sama persis dengan build. Ini keterampilan yang membedakan engineer yang mengerti vs yang menyalin dari Stack Overflow.
## Cache Busting dan Kebersihan
apt-get update && apt-get install dalam SATU RUN memastikan daftar paket segar tiap kali layer dibangun ulang (update sendirian di layer terpisah akan di-cache dan basi). Bersihkan cache apt di RUN yang sama (rm -rf /var/lib/apt/lists/*) agar layer tidak membawa sampah. Pola yang sama berlaku untuk npm/pip.

---

## Eksperimen

1. **Tiap Baris Dockerfile = Satu Layer**
2. **Membaca Error Build**
3. **Debug di Layer Terakhir yang Sukses**
4. **Cache Busting dan Kebersihan**

---

## Tantangan

Latihan dari trainer bootcamp: buat Dockerfile dengan 4 bug sengaja - (1) RUN install tanpa update, (2) COPY path yang salah, (3) EXPOSE tidak cocok dengan port aplikasi, (4) CMD merujuk file yang tidak ada. Bangun, temukan layer yang gagal, perbaiki satu per satu. Tuliskan bug yang Anda temukan dan perbaikannya.

---

## Ringkasan

Layer thinking: cari layer yang gagal, bukan pesan errornya. Debug dengan shell di layer terakhir yang sukses. apt-get update && install dalam satu RUN + bersihkan cache. Lanjut: volume dan persistensi data.
