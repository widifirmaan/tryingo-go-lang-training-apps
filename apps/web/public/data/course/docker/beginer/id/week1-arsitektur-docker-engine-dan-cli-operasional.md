# Arsitektur Docker Engine, Linux Primitives & CLI Dasar

> **Kategori:** Docker | **Level:** Fondasi Kontainerisasi & Optimasi Image | **Minggu 1:** Arsitektur Docker Engine, Linux Primitives & CLI Dasar
> ⏱️ **Estimasi Belajar:** 45 Menit (15m teori, 30m praktik) | 🔗 **Tingkat:** Terstruktur (Step-by-step)


## Tujuan Pembelajaran

- Memahami perbedaan arsitektur mendasar antara Virtual Machine (Hypervisor) vs Docker Container (Shared OS Kernel)
- Mengetahui peran primitif Linux Kernel di balik kontainer: Namespaces (Isolasi) dan Control Groups / cgroups (Limitasi Sumber Daya)
- Menguasai perintah CLI operasional harian: run, ps, exec, logs, stop, rm, dan system prune
- Mengonfigurasi pembatasan memori, CPU, dan pemetaan port (Port Mapping Host ke Kontainer)

---

## Program: Manajemen Siklus Hidup Kontainer, Isolasi Port, dan Pemeriksaan Metrik Sumber Daya

```bash
# 1. Run an isolated, background container with explicit port mapping and memory limits
docker run -d \
  --name web_gateway \
  -p 8080:80 \
  --memory="256m" \
  --cpus="1.0" \
  --restart unless-stopped \
  nginx:alpine

# 2. Inspect active containers and resource utilization in real time
docker ps --format "table {{.ID}}\t{{.Names}}\t{{.Status}}\t{{.Ports}}"
docker stats --no-stream web_gateway

# 3. Execute interactive debugging shell inside the running container (exec)
docker exec -it web_gateway sh -c "echo 'Container is healthy' && nginx -v"

# 4. Stream real-time container log stdout/stderr
docker logs --tail 50 -f web_gateway

# 5. Inspect low-level JSON metadata, Linux namespaces, and networking configuration
docker inspect --format '{{range .NetworkSettings.Networks}}{{.IPAddress}}{{end}}' web_gateway

# 6. Graceful container shutdown and cleanup lifecycle
docker stop -t 10 web_gateway
docker rm web_gateway

# Prune dangling layers and unused images to reclaim disk space
docker system df
docker system prune -f
```

---

## Konsep Kunci

### Virtual Machine vs Docker Container
- **Virtual Machine (VM)**: Setiap VM menyertakan Guest OS lengkap (beberapa gigabyte), kernel sendiri, dan berjalan di atas layer Hypervisor. Booting memakan waktu beberapa menit dan boros RAM.
- **Docker Container**: Kontainer berbagi **satu Linux Kernel induk yang sama** dengan Host OS. Kontainer hanyalah sebuah proses OS biasa yang diisolasi secara ketat. Ukurannya hanya puluhan megabyte dan dapat dinyalakan dalam hitungan milidetik (*sub-second startup*).

### Primitif Inti Linux: Namespaces & cgroups
Docker tidak memiliki teknologi virtualisasi sihir; ia memanfaatkan dua fitur bawaan kernel Linux:
1. **Linux Namespaces**: Menyediakan dinding isolasi virtual sehingga proses di dalam kontainer merasa memiliki dunianya sendiri:
   - `PID Namespace`: Menjadikan proses utama kontainer sebagai PID 1.
   - `NET Namespace`: Memberikan interface jaringan dan IP address privat tersendiri.
   - `MNT Namespace`: Mengisolasi sistem file disk.
2. **Control Groups (cgroups)**: Membatasi jatah penggunaan sumber daya perangkat keras fisik. Parameter `--memory="256m" --cpus="1.0"` memastikan kontainer tidak dapat mengonsumsi lebih dari 256MB RAM atau 1 core CPU, mencegah satu kontainer nakal melumpuhkan seluruh server host.

### Peran containerd dan OCI Runtimes (runc)
Arsitektur Docker modern bersifat modular standar OCI (*Open Container Initiative*):
Aplikasi klien Docker CLI berbicara dengan daemon `dockerd`, yang meneruskan instruksi ke `containerd`. Selanjutnya, `containerd` memanggil runtime tingkat rendah `runc` untuk berinteraksi langsung dengan kernel Linux guna melahirkan kontainer baru.

---

---

## Penjelasan untuk Pemula

Bayangkan Virtual Machine seperti membangun rumah terpisah lengkap dengan instalasi listrik, genset, dan pipa air sendiri untuk setiap tamu (sangat mahal dan butuh tanah luas). 

Docker Container seperti gedung apartemen: seluruh penghuni kamar berbagi fondasi bangunan dan pipa air yang sama (Shared OS Kernel), namun setiap kamar memiliki pintu terkunci rapat sendiri-sendiri (Namespaces) dan meteran listrik yang membatasi daya maksimal tiap kamar (cgroups)!

## Eksperimen

- Jalankan kontainer nginx di port 8080, buka browser pada http://localhost:8080, lalu amati access log di terminal via docker logs -f
- Masuk ke dalam kontainer yang sedang berjalan menggunakan docker exec -it web_gateway sh dan periksa daftar proses dengan ps aux (perhatikan PID 1)
- Gunakan docker stats untuk memantau penggunaan RAM saat kontainer diberi beban request HTTP
- Jalankan docker run dengan flag --rm dan amati kontainer otomatis terhapus saat prosesnya berhenti

---

## Tantangan

Jalankan kontainer Alpine Linux interaktif, batasi memorinya maksimal hanya 64MB (`--memory="64m"`), dan coba alokasikan memori melebihi 64MB di dalamnya untuk melihat bagaimana mekanisme Linux OOM-Killer (Out-Of-Memory) menghentikan kontainer.

---

## Model Mental & Diagram Alur Visual

![Diagram Layer Arsitektur Docker Image & Container](/diagrams/docker-layers.svg)

```diagram
┌────────────────────────────────────────────────────────┐
│ [Layer 4 - Writeable] Container R/W Layer (Ephemeral)  │
├────────────────────────────────────────────────────────┤
│ [Layer 3 - Read Only] CMD ["npm", "start"]             │
├────────────────────────────────────────────────────────┤
│ [Layer 2 - Read Only] COPY . /app & RUN npm install    │
├────────────────────────────────────────────────────────┤
│ [Layer 1 - Read Only] FROM node:20-alpine (Base Image) │
└────────────────────────────────────────────────────────┘
```

---

## Panduan Sintaks & Referensi Lengkap (W3Schools Style)

Berikut adalah rincian sintaks, parameter, nilai kembalian, dan contoh penggunaan praktis yang diperkenalkan pada modul ini:

### 1. `FROM <image>:<tag>`
- **Fungsi Utama:** Menentukan base image fondasi container.
- **Parameter / Atribut:** `Image identifier, Tag versi`.
- **Perilaku & Efek Sistem:** Menetapkan sistem operasi minimalis dan runtime awal (misal `node:20-alpine`, `golang:1.24`)..
- **Contoh Penggunaan Praktis:**
```dockerfile
FROM node:20-alpine
WORKDIR /app
```
- **Hasil Output yang Diharapkan:**
```text
Lingkungan container Node.js di atas Alpine siap
```

### 2. `COPY <host_src> <container_dest>`
- **Fungsi Utama:** Menyalin file host ke dalam image filesystem.
- **Parameter / Atribut:** `Path lokal, Path tujuan container`.
- **Perilaku & Efek Sistem:** Memasukkan kode sumber, file konfigurasi, dan aset ke direktori kerja container..
- **Contoh Penggunaan Praktis:**
```dockerfile
COPY package*.json ./
RUN npm install --production
COPY . .
```
- **Hasil Output yang Diharapkan:**
```text
Kode aplikasi tersalin ke dalam container
```

### 3. `RUN <command>`
- **Fungsi Utama:** Mengeksekusi instruksi build layer.
- **Parameter / Atribut:** `Shell instruction`.
- **Perilaku & Efek Sistem:** Menginstal dependencies, mengkompilasi binary, dan mengatur izin sistem saat build dijalankan..
- **Contoh Penggunaan Praktis:**
```dockerfile
RUN npm run build
```
- **Hasil Output yang Diharapkan:**
```text
Menghasilkan bundle produksi di dalam layer image
```

### 4. `docker run -d -p 8080:80 --name my-app app:v1`
- **Fungsi Utama:** Menjalankan instance container aktif.
- **Parameter / Atribut:** `Flag -d (detached), -p (port mapping), --name`.
- **Perilaku & Efek Sistem:** Membuat dan menyalakan container yang memetakan port host 8080 ke port container 80..
- **Contoh Penggunaan Praktis:**
```bash
docker run -d -p 3000:3000 --name web-service my-app:latest
```
- **Hasil Output yang Diharapkan:**
```text
Container berjalan di latar belakang dan dapat diakses
```

---

## Jebakan Umum & Debugging (Common Pitfalls)

### 1. Menjalankan Container sebagai User `root`
- **Gejala / Masalah:** Potensi eskalasi hak akses sistem operasi host jika container berhasil ditembus peretas.
- **Penyebab Utama:** Logika atau asumsi yang sering keliru pada tahap awal implementasi.
- **Solusi Tepat:** Definisikan user non-root khusus di Dockerfile: `USER node` atau `USER 1001`.

### 2. Mengabaikan File `.dockerignore`
- **Gejala / Masalah:** Folder raksasa seperti `node_modules`, `.git`, atau file `.env` rahasia ikut ter-copy ke dalam image.
- **Penyebab Utama:** Logika atau asumsi yang sering keliru pada tahap awal implementasi.
- **Solusi Tepat:** Selalu sediakan `.dockerignore` untuk membuang file lokal sebelum build dijalankan.

### 3. Ukuran Image Membengkak Tanpa Multi-Stage Build
- **Gejala / Masalah:** Image berukuran gigabytes memperlambat waktu transfer jaringan dan deployment cloud.
- **Penyebab Utama:** Logika atau asumsi yang sering keliru pada tahap awal implementasi.
- **Solusi Tepat:** Terapkan Multi-Stage Build: pisahkan tahap kompilasi (*builder stage*) dari runtime minimalis (*alpine/distroless*).

---

## Ringkasan

Anda telah memahami arsitektur Docker Engine, mekanisme isolasi kernel Linux (Namespaces & cgroups), perintah CLI operasional, serta batasan sumber daya kontainer.
