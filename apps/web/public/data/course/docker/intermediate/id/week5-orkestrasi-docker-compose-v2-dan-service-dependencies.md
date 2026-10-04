# Docker Compose v2 & Manajemen Dependensi Servis

> **Kategori:** Docker | **Level:** Orkestrasi Multi-Kontainer & Keamanan Produksi | **Minggu 5:** Docker Compose v2 & Manajemen Dependensi Servis
> ⏱️ **Estimasi Belajar:** 45 Menit (15m teori, 30m praktik) | 🔗 **Tingkat:** Terstruktur (Step-by-step)


## Tujuan Pembelajaran

- Menguasai spesifikasi modern Docker Compose v2 (file `compose.yaml` tanpa deklarasi version usang)
- Mencegah crash aplikasi saat booting menggunakan dependensi kondisi: `condition: service_healthy`
- Mengonfigurasi pemeriksaan kesehatan mandiri (`healthcheck`) pada PostgreSQL, Redis, dan HTTP endpoint
- Mengamankan database internal dari akses internet publik menggunakan `internal: true` network

---

## Program: Stack Multi-Kontainer Produksi: Web Gateway, API, Redis & PostgreSQL dengan Healthchecks

```yaml
# Modern Docker Compose v2 Specification (compose.yaml)
# Note: The obsolete 'version:' key is deprecated and omitted in Compose v2+
services:
  # 1. Reverse Proxy & Static Asset Gateway
  gateway:
    image: nginx:alpine
    container_name: web_gateway
    ports:
      - "80:80"
    volumes:
      - ./nginx.conf:/etc/nginx/nginx.conf:ro
    depends_on:
      api:
        condition: service_healthy # Wait until API healthcheck passes!
    networks:
      - edge_network

  # 2. Core Node.js API Service
  api:
    build:
      context: ./apps/api
      dockerfile: Dockerfile
    container_name: core_api
    environment:
      NODE_ENV: production
      DATABASE_URL: postgres://pguser:SecretPass2026@postgres:5432/core_db
      REDIS_URL: redis://cache:6379
    depends_on:
      postgres:
        condition: service_healthy # Guarantees DB is accepting connections before API boots!
      cache:
        condition: service_healthy
    healthcheck:
      test: ["CMD", "wget", "-qO-", "http://localhost:3000/healthz"]
      interval: 10s
      timeout: 3s
      retries: 3
      start_period: 5s
    networks:
      - edge_network
      - internal_network

  # 3. High-Throughput In-Memory Cache
  cache:
    image: redis:7-alpine
    container_name: app_cache
    command: ["redis-server", "--appendonly", "yes", "--maxmemory", "256mb"]
    healthcheck:
      test: ["CMD", "redis-cli", "ping"]
      interval: 5s
      timeout: 2s
      retries: 3
    networks:
      - internal_network

  # 4. Primary Relational Storage
  postgres:
    image: postgres:17-alpine
    container_name: app_database
    environment:
      POSTGRES_DB: core_db
      POSTGRES_USER: pguser
      POSTGRES_PASSWORD: SecretPass2026
    volumes:
      - pgdata:/var/lib/postgresql/data
    healthcheck:
      test: ["CMD-SHELL", "pg_isready -U pguser -d core_db"]
      interval: 5s
      timeout: 3s
      retries: 5
    networks:
      - internal_network

volumes:
  pgdata:
    driver: local

networks:
  edge_network:
    driver: bridge
  internal_network:
    driver: bridge
    internal: true # Forbids all outbound internet ingress/egress for maximum security!
```

---

## Konsep Kunci

### Mengapa Docker Compose v2?
Menjalankan 5 perintah `docker run` dengan 20 flag parameter di terminal sangat rentan salah tik dan tidak dapat dikontrol versinya (*unreproducible*). **Docker Compose v2** (diakses melalui perintah `docker compose` tanpa tanda strip) memungkinkan orkestrasi seluruh arsitektur multi-kontainer didefinisikan secara deklaratif dalam satu file `compose.yaml`.

### Masalah Klasik depends_on dan Solusi service_healthy
Pada konfigurasi lama, deklarasi `depends_on: [postgres]` hanya menunggu kontainer PostgreSQL *mulai menyala (running)*. Padahal, database butuh waktu 5-10 detik untuk menginisialisasi tabel disk dan membuka port 5432. Akibatnya, API yang menyala cepat langsung crash karena koneksi database ditolak (*Connection Refused*).
**Solusi Produksi**:
Gunakan `condition: service_healthy` yang dipasangkan dengan perintah `healthcheck` native (`pg_isready -U ...`). Docker Compose menjamin servis API tidak akan pernah dinyalakan sebelum PostgreSQL benar-benar siap menerima kueri SQL.

### Jaringan Internal Terisolasi (internal: true)
Kelemahan keamanan fatal banyak tim adalah membuka port database ke publik (`ports: ["5432:5432"]`). Dengan arsitektur dua jaringan:
- `edge_network`: Hanya menghubungkan Gateway ke API.
- `internal_network` dengan opsi `internal: true`: Menghubungkan API ke Database dan Redis. Database tidak memiliki akses ke internet luar dan tidak dapat diakses dari luar, memangkas risiko peretasan hingga nol.

---

---

## Penjelasan untuk Pemula

Bayangkan Docker Compose seperti seorang konduktor orkestra musik. 
Tanpa konduktor, pemain drum, gitaris, dan penyanyi mulai bermain sendiri-sendiri tanpa aba-aba dan lagunya hancur berantakan (API menyala sebelum database siap).

Konduktor memastikan pemain drum (PostgreSQL) selesai menyetem drumnya dan memberi tanda jempol (`service_healthy`), barulah sang penyanyi (API Server) mulai bernyanyi di depan panggung!

## Eksperimen

- Jalankan seluruh stack dengan perintah docker compose up -d dan amati urutan startup kontainer yang tertib
- Periksa status kesehatan seluruh servis menggunakan docker compose ps dan pastikan kolom STATUS bertuliskan (healthy)
- Hentikan kontainer postgres dan amati status API berubah dan gateway menangkap kegagalan healthcheck
- Gunakan docker compose logs -f api untuk memantau log gabungan secara terpusat

---

## Tantangan

Kembangkan `compose.yaml` dengan menambahkan skala horizontal: jalankan servis API dengan 3 replika (`deploy.replicas: 3`) dan konfigurasikan reverse proxy Nginx agar melakukan load balancing Round-Robin ke ketiga replika tersebut.

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
```output
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
```output
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
```output
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
```output
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

Anda telah menguasai orkestrasi Docker Compose v2, eliminasi race condition booting dengan condition: service_healthy, konfigurasi healthcheck database, dan isolasi jaringan bertingkat.
