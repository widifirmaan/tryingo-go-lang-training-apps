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

## Ringkasan Sintaks & Quick Reference

| Perintah / Sintaks | Fungsi & Contoh Praktik |
| :--- | :--- |
| **Deklarasi & Inisialisasi** | Menyiapkan variabel, tipe data, atau struktur komponen awal |
| **Logika & Pemrosesan** | Menjalankan algoritma, kontrol alur, dan transformasi data |
| **Error Handling & Validasi** | Memastikan input valid dan menangani kegagalan sistem secara elegan |
| **Return / Output** | Mengembalikan hasil komputasi yang siap dikonsumsi pengguna/sistem |

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
