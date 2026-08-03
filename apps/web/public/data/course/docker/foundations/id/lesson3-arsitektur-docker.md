# Arsitektur Docker & Linux VM

> Docker | Fondasi | Pelajaran 3

## Tujuan Pembelajaran

- Memahami arsitektur Docker: client, daemon, containerd, runtime
- Menjelaskan kenapa Docker Desktop menjalankan Linux VM di Mac/Windows
- Menarik image dari registry dengan docker pull
- Menjalankan layanan nyata (Redis) dalam container

---

## Program: Arsitektur Docker & Linux VM

```docker
# Arsitektur: client -> daemon -> containerd
docker version

# Di balik layar Docker Desktop: Linux VM kecil
docker info

# Ambil image dari registry
docker images
docker pull redis:7-alpine

# Jalankan Redis sebagai cache
docker run -d --name cache -p 6379:6379 redis:7-alpine
docker ps
docker stop cache
docker rm cache
```

---

## Penjelasan

## Client, Daemon, dan Containerd
Ketik docker <perintah> - yang berjalan adalah client CLI. Client berbicara dengan Docker daemon (dockerd) lewat API. Daemon tidak menjalankan container sendiri: ia meminta containerd (runtime) untuk menjalankan container sebagai proses. Pemisahan ini penting: Kubernetes zaman sekarang tidak berbicara dengan dockerd, melainkan langsung dengan containerd/CRI-O.
## Mengapa Ada Linux VM di Mac dan Windows
Container bergantung pada fitur kernel Linux (namespaces, cgroups). Kernel macOS/Windows tidak punya fitur itu. Solusinya: Docker Desktop menjalankan VM Linux kecil di belakang layar, dan semua container hidup di dalam VM itu. Karena itu di docker info tertulis OSType: linux meskipun laptop Anda Windows/Mac.
## Registry: Docker Hub
docker pull redis:7-alpine mengambil image dari Docker Hub (registry publik terbesar). Perhatikan: kita meminta versi spesifik (7-alpine), bukan latest - kebiasaan baik yang akan menjadi tema pelajaran 6. Image yang sudah ada tidak diunduh ulang; Docker memakai cache lokal.
## Ukuran: VM vs Container yang Sesungguhnya
Image redis:7-alpine hanya 43MB dan container-nya siap dipakai dalam hitungan detik - bandingkan dengan VM Linux yang minimal ratusan MB dan perlu menit untuk boot. Inilah mengapa aplikasi modern dikemas sebagai container, bukan VM image.

---

## Eksperimen

1. **Client, Daemon, dan Containerd**
2. **Mengapa Ada Linux VM di Mac dan Windows**
3. **Registry: Docker Hub**
4. **Ukuran: VM vs Container yang Sesungguhnya**

---

## Tantangan

Jalankan skrip, lalu coba tarik image lain: docker pull python:3.12-slim dan jalankan docker run -d --name py python:3.12-slim (tanpa port mapping - amati bedanya di docker ps). Jelaskan satu kalimat: kenapa kolom PORTS kosong untuk container py?

---

## Ringkasan

Client, daemon, containerd: proses berlapis. Di Mac/Windows container hidup dalam Linux VM (Docker Desktop). Registry = sumber image; pull dengan versi spesifik. Lanjut: perintah-perintah esensial Docker.
