# Networking: Container Saling Bicara

> Docker | Multi-Container | Pelajaran 10

## Tujuan Pembelajaran

- Membuat network sendiri dengan docker network create
- Menjelaskan DNS internal: container dipanggil dengan namanya
- Memeriksa anggota network dengan docker network inspect
- Memahami kenapa --link sudah usang

---

## Program: Networking: Container Saling Bicara

```docker
# Buat network khusus
docker network create mynet
docker network ls

# Jalankan dua container di network yang sama
docker run -d --name web --network mynet -p 8080:80 nginx:alpine
docker run -d --name db --network mynet -e POSTGRES_PASSWORD=rahasia123 postgres:16-alpine

# DNS internal: web bisa "ping db" cuma dengan namanya
docker exec web ping db

# Network inspect: lihat anggota
docker network inspect mynet

# Hapus network
docker network rm mynet
```

---

## Penjelasan

## Jalan Buntu: Localhost Tidak Akan Pernah Sampai
"localhos" di dalam container adalah container itu sendiri. Aplikasi web yang memanggil http://localhost:5432 TIDAK akan pernah mencapai database di container lain. Kedua container harus berada di network yang sama, dan aplikasi memanggil nama container: http://db:5432.
## DNS Internal: Nama = Alamat
Di network khusus, Docker menyediakan DNS: container bisa dipanggil dengan NAMAnya. web bisa ping db tanpa tahu IP-nya. Ini menyelesaikan masalah besar: IP container berubah setiap kali dijalankan ulang, nama tidak. Aplikasi dikonfigurasi dengan nama, bukan IP.
## Mengapa Network Khusus
Mengapa tidak semua container di default network saja? Isolasi dan keamanan: network membatasi siapa bisa bicara dengan siapa. DB hanya terhubung ke web, tidak ke setiap container acak di mesin. Prinsip jaringan produksi: segmen, bukan satu kabel besar.
## --link dan Sejarah
Dulu ada docker run --link web:web untuk menghubungkan container. Ia dianggap legacy dan tidak direkomendasikan - DNS network menggantikannya. Jawaban wawancara yang bagus: "--link membuat entri /etc/hosts statis; network menyediakan DNS dinamis yang mengikuti container ke mana pun IP-nya berubah."

---

## Eksperimen

1. **Jalan Buntu: Localhost Tidak Akan Pernah Sampai**
2. **DNS Internal: Nama = Alamat**
3. **Mengapa Network Khusus**
4. **--link dan Sejarah**

---

## Tantangan

Jalankan skrip. Lalu coba modifikasi: hapus db dari network dengan docker network disconnect mynet db, lalu ping db lagi dari web. Apa yang terjadi? Hubungkan kembali dengan docker network connect mynet db dan ping lagi. Tuliskan hasilnya.

---

## Ringkasan

Container di network yang sama bicara lewat NAMA (DNS internal), bukan IP. Buat network khusus untuk isolasi. localhost tidak akan pernah mencapai container lain. Lanjut: Docker Compose.
