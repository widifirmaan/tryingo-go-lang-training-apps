# docker run dalam: Port, Env, Interaktif

> Docker | Image & Container | Pelajaran 5

## Tujuan Pembelajaran

- Memetakan port container ke host dengan -p
- Memberikan konfigurasi lewat environment variables (-e)
- Memahami --rm untuk container sekali pakai
- Menggunakan -it untuk sesi interaktif

---

## Program: docker run dalam: Port, Env, Interaktif

```docker
# Port mapping: host 8080 -> container 80
docker run -d --name web -p 8080:80 nginx:alpine
docker ps
# Buka http://localhost:8080 di browser Anda!

# Environment variables: -e
docker run -d --name db -e POSTGRES_PASSWORD=rahasia123 postgres:16-alpine
docker exec db env

# --rm: otomatis hapus saat berhenti
docker run --rm hello-world
docker ps -a

# -it: interaktif (stdin tetap terbuka)
docker run -it --name shell alpine sh
docker stop shell
docker rm shell
```

---

## Penjelasan

## Port Mapping: -p HOST:CONTAINER
Aplikasi di dalam container mendengar di port sendiri (nginx di 80, Postgres di 5432). Port itu tidak otomatis terbuka ke laptop Anda. -p 8080:80 berarti: terima trafik di port 8080 host, teruskan ke port 80 di dalam container. Tanpa mapping, container tetap jalan - Anda hanya tidak bisa mengaksesnya dari luar. Ingat: EXPOSE di Dockerfile HANYA dokumentasi; -p yang benar-benar mempublikasikan.
## Konfigurasi Tanpa Hardcode: -e
Image resmi (postgres, redis, mysql) dikonfigurasi lewat environment variables: POSTGRES_PASSWORD, POSTGRES_DB, dan lain-lain. Nilai diberikan saat run dengan -e NAMA=nilai, dibaca aplikasi di dalam container. Ini pola "config dari luar image" - image tetap sama, konfigurasi berbeda per lingkungan (dev/staging/prod).
## --rm: Sekali Pakai
Container yang dipakai untuk satu tugas singkat (test, eksperimen) sebaiknya dijalankan dengan --rm: begitu proses selesai, container dihapus otomatis. Tidak menumpuk sampah. Perhatikan di docker ps -a: tidak ada jejaknya.
## -it: Interaktif
-it menggabungkan -i (stdin tetap terbuka) dan -t (pseudo-TTY). Dipakai saat kita ingin masuk ke shell container - misalnya untuk eksplorasi cepat. Tapi ingat mental model: eksplorasi sesekali, bukan "tinggal di dalam".

---

## Eksperimen

1. **Port Mapping: -p HOST:CONTAINER**
2. **Konfigurasi Tanpa Hardcode: -e**
3. **--rm: Sekali Pakai**
4. **-it: Interaktif**

---

## Tantangan

Jalankan skrip. Lalu buat sendiri: container nginx kedua dengan nama web2 yang memetakan port host 9090, env var APP_ENV=production. Cek dengan docker ps dan docker exec web2 env. Hapus semua container yang Anda buat. Tulis perintah-perintahnya.

---

## Ringkasan

-p mempublikasikan port; -e memberi konfigurasi dari luar; --rm untuk sekali pakai; -it untuk sesi interaktif. Image tetap sama, konfigurasi berbeda per lingkungan. Lanjut: image dan layer.
