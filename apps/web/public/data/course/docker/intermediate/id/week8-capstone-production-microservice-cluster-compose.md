# Capstone Project: Production Microservice Cluster Stack

> **Kategori:** Docker | **Level:** Orkestrasi Multi-Kontainer & Keamanan Produksi | **Minggu 8:** Capstone Project: Production Microservice Cluster Stack
> ⏱️ **Estimasi Belajar:** 45 Menit (15m teori, 30m praktik) | 🔗 **Tingkat:** Terstruktur (Step-by-step)


## Tujuan Pembelajaran

- Mengintegrasikan seluruh materi kurikulum Docker ke dalam satu capstone klaster microservice skala industri
- Mengisolasi tingkatan arsitektur jaringan secara fisik: Edge Publik vs Jaringan Internal Terisolasi (Air-Gapped)
- Menerapkan Multi-Stage Builds dan citra Distroless untuk seluruh servis kustom (Node.js API dan Go Worker)
- Mengunci kontainer dengan konfigurasi keamanan tertinggi: read_only, non-root user UID, no-new-privileges, dan cap_drop ALL

---

## Program: Cluster Microservice Lengkap: Reverse Proxy Nginx, API Node.js, Worker Go, Redis & PostgreSQL

```yaml
# CAPSTONE PROJECT: Enterprise Multi-Stage Containerized Microservice Cluster
# Demonstrates: Multi-Stage Builds, Healthcheck Dependencies, Dual Isolated Networks, Non-Root Users

services:
  # ============================================================================
  # 1. Edge Ingress: Nginx Reverse Proxy with SSL Termination & Rate Limiting
  # ============================================================================
  ingress:
    image: nginx:1.27-alpine
    container_name: cluster_ingress
    restart: unless-stopped
    ports:
      - "80:80"
      - "443:443"
    volumes:
      - ./infra/nginx/nginx.conf:/etc/nginx/nginx.conf:ro
    depends_on:
      api:
        condition: service_healthy
    networks:
      - public_edge_net

  # ============================================================================
  # 2. Core Service: Node.js / TypeScript REST API (Hardened Container)
  # ============================================================================
  api:
    build:
      context: ./services/api
      dockerfile: Dockerfile
    container_name: service_api
    restart: unless-stopped
    read_only: true
    user: "10001:10001"
    security_opt:
      - no-new-privileges:true
    cap_drop:
      - ALL
    tmpfs:
      - /tmp:rw,noexec,nosuid,size=64m
    environment:
      PORT: 3000
      DATABASE_URL: postgresql://app_user:SuperSecret2026!@postgres:5432/production_db
      REDIS_URL: redis://redis:6379
    depends_on:
      postgres:
        condition: service_healthy
      redis:
        condition: service_healthy
    healthcheck:
      test: ["CMD-SHELL", "wget -qO- http://localhost:3000/health || exit 1"]
      interval: 10s
      timeout: 3s
      retries: 3
      start_period: 10s
    networks:
      - public_edge_net
      - private_cluster_net

  # ============================================================================
  # 3. Async Worker: Go Telemetry Event Processor (Distroless Binary)
  # ============================================================================
  worker:
    build:
      context: ./services/worker
      dockerfile: Dockerfile
    container_name: service_worker
    restart: on-failure:5
    read_only: true
    user: "65532:65532"
    security_opt:
      - no-new-privileges:true
    cap_drop:
      - ALL
    environment:
      REDIS_URL: redis://redis:6379
    depends_on:
      redis:
        condition: service_healthy
    networks:
      - private_cluster_net

  # ============================================================================
  # 4. In-Memory Cache & Message Broker: Redis with Append-Only Durability
  # ============================================================================
  redis:
    image: redis:7.4-alpine
    container_name: cluster_redis
    restart: unless-stopped
    command: ["redis-server", "--appendonly", "yes", "--maxmemory", "512mb", "--maxmemory-policy", "allkeys-lru"]
    volumes:
      - redis_data:/data
    healthcheck:
      test: ["CMD", "redis-cli", "ping"]
      interval: 5s
      timeout: 2s
      retries: 3
    networks:
      - private_cluster_net

  # ============================================================================
  # 5. Primary Storage: PostgreSQL with Strict Connection Healthcheck
  # ============================================================================
  postgres:
    image: postgres:17-alpine
    container_name: cluster_postgres
    restart: unless-stopped
    environment:
      POSTGRES_DB: production_db
      POSTGRES_USER: app_user
      POSTGRES_PASSWORD: SuperSecret2026!
    volumes:
      - postgres_data:/var/lib/postgresql/data
    healthcheck:
      test: ["CMD-SHELL", "pg_isready -U app_user -d production_db"]
      interval: 5s
      timeout: 3s
      retries: 5
    networks:
      - private_cluster_net

volumes:
  postgres_data:
  redis_data:

networks:
  public_edge_net:
    driver: bridge
  private_cluster_net:
    driver: bridge
    internal: true # STRICT AIR-GAP: Zero direct route to/from public internet!
```

---

## Konsep Kunci

### Arsitektur Capstone Production Microservice Cluster
Proyek capstone ini membangun fondasi infrastruktur kontainer kelas enterprise:
1. **Segmentasi Jaringan Berlapis (Air-Gapped Tiering)**: Hanya Nginx `cluster_ingress` yang membuka port 80/443 ke internet publik (`public_edge_net`). Seluruh database PostgreSQL, cache Redis, dan Go Worker berada di dalam `private_cluster_net` dengan konfigurasi `internal: true`. Peretas dari internet mustahil memindai atau menyerang database secara langsung.
2. **Koordinasi Booting Tanpa Balapan (*Zero Boot Race Conditions*)**: Nginx menunggu API berstatus sehat. API menunggu PostgreSQL dan Redis lulus uji `pg_isready` dan `redis-cli ping`. Seluruh klaster menyala secara tertib dan otomatis.
3. **Pengerasan Keamanan Maksimal (*Maximum Hardening*)**: Servis API dan Worker berjalan sebagai pengguna non-root biasa, menggunakan sistem file *read-only* dengan alokasi *tmpfs* aman, mencabut seluruh hak kernel Linux (`cap_drop: ALL`), dan memblokir eskalasi hak istimewa (`no-new-privileges: true`).

---

---

## Penjelasan untuk Pemula

Selamat! Anda telah membangun istana teknologi modern berstandar perbankan internasional. 

Pintu gerbang istana (Nginx Ingress) menyambut pengunjung dengan ramah. Di dalam istana, para juru masak dan kurir (API dan Go Worker) bekerja cepat tanpa saling berebut bahan karena ada jadwal yang tertib (Healthcheck). Dan yang paling hebat: brankas harta karun emas Anda (PostgreSQL dan Redis) tersimpan di ruang bawah tanah tersembunyi tanpa pintu keluar ke dunia luar (Internal Network), dijaga oleh satpam yang tidak bisa disuap!

## Eksperimen

- Nyalakan seluruh stack dengan docker compose up -d dan gunakan docker compose ps untuk melihat seluruh servis berstatus healthy
- Coba hubungi database postgres langsung dari komputer host Anda dan buktikan bahwa koneksi ditolak karena port tidak di-expose
- Lakukan docker exec ke dalam kontainer API dan coba buat file di direktori root untuk membuktikan aturan read-only bekerja
- Jalankan docker compose down -v untuk membersihkan seluruh stack beserta volumenya saat pengujian selesai

---

## Tantangan

Tambahkan servis `monitoring` menggunakan Prometheus dan Grafana ke dalam `compose.yaml`: pantau metrik utilisasi CPU dan RAM dari seluruh kontainer di dalam cluster secara real-time.

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

Selamat! Anda telah menguasai seluruh kurikulum Docker: arsitektur engine & kernel Linux, optimasi Dockerfile & layer cache, Multi-Stage Builds hemat ukuran, volume & bridge networks, orkestrasi Docker Compose v2, healthchecks tahan banting, pengerasan keamanan non-root & capabilities, dan Capstone Microservice Cluster.
