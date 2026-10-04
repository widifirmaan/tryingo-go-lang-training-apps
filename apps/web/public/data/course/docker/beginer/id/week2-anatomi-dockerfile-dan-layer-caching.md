# Anatomi Dockerfile & Strategi Layer Caching

> **Kategori:** Docker | **Level:** Fondasi Kontainerisasi & Optimasi Image | **Minggu 2:** Anatomi Dockerfile & Strategi Layer Caching
> ⏱️ **Estimasi Belajar:** 45 Menit (15m teori, 30m praktik) | 🔗 **Tingkat:** Terstruktur (Step-by-step)


## Tujuan Pembelajaran

- Memahami konsep Immutable Image Layers dan mekanisme Copy-On-Write (CoW)
- Menghindari invalidasi cache dini dengan memisahkan instalasi dependensi (package.json) dari kode sumber
- Membedakan sintaks Shell Form vs Exec Form pada instruksi CMD dan ENTRYPOINT
- Menggunakan file `.dockerignore` untuk mencegah kebocoran secret, file `.git`, dan folder lokal node_modules

---

## Program: Dockerfile Produksi dengan Urutan Instruksi Optimal untuk Memaksimalkan Build Cache

```dockerfile
# Production-Ready Dockerfile demonstrating Layer Caching Strategy
# Base Image: Use explicit, immutable semantic version tags (NEVER use 'latest' in production!)
FROM node:22-alpine

# Set non-interactive environment variables
ENV NODE_ENV=production \
    PORT=3000

# Set explicit working directory inside the container
WORKDIR /app

# CACHE OPTIMIZATION STEP 1: Copy ONLY package dependency manifests first!
# Dependency manifests rarely change, allowing Docker to cache the expensive 'npm ci' layer!
COPY package.json package-lock.json ./

# Run installation of strictly production dependencies
# 'npm ci' guarantees reproducible installs based on package-lock.json
RUN npm ci --only=production && \
    npm cache clean --force

# CACHE OPTIMIZATION STEP 2: Copy application source code LAST!
# Application code changes frequently. Placing it after 'npm ci' ensures that code edits
# do NOT invalidate the cached node_modules layer!
COPY src/ ./src/
COPY tsconfig.json ./

# Security best practice: Create unprivileged system user instead of running as root (UID 0)
RUN addgroup -S appgroup && adduser -S appuser -G appgroup && \
    chown -R appuser:appgroup /app

# Switch to unprivileged user
USER appuser

# Document exposed runtime port (informational metadata)
EXPOSE 3000

# Exec Form of ENTRYPOINT and CMD (Ensures process runs as PID 1 to receive UNIX SIGTERM signals)
CMD ["node", "src/server.js"]
```

---

## Konsep Kunci

### Bagaimana Docker Image Dibangun? Konsep Layer Caching
Setiap instruksi di dalam Dockerfile (`FROM`, `RUN`, `COPY`) menghasilkan satu **Lapisan Gambar (Image Layer)** baru yang bersifat kekal (*read-only / immutable*). 
Ketika Anda menjalankan perintah `docker build`, Docker memeriksa apakah instruksi tersebut beserta file yang disalin memiliki perubahan:
- Jika tidak ada perubahan, Docker menggunakan **Build Cache** (*CACHED*) dan melompati proses dalam waktu 0 detik!
- Begitu satu layer berubah (misal Anda mengubah sebaris kode di `src/`), **seluruh layer setelahnya akan dinyatakan tidak valid (cache invalidated)** dan terpaksa di-build ulang dari awal.

### Aturan Emas Urutan Dockerfile
Jangan pernah menulis `COPY . .` sebelum perintah `RUN npm install`! 
Jika Anda melakukannya, setiap kali Anda mengubah sebaris komentar pada kode sumber, Docker akan menganggap seluruh direktori berubah dan mengunduh ulang ribuan dependensi `node_modules` selama bermenit-menit. Pisahkan penyalinan `package.json` terlebih dahulu, jalankan `npm ci`, baru salin kode sumber di langkah terakhir.

### Shell Form vs Exec Form pada CMD
- **Shell Form** (`CMD node server.js`): Docker membungkus perintah di dalam sub-shell `/bin/sh -c`. Akibatnya, `/bin/sh` menjadi PID 1 dan aplikasi Anda menjadi child process. Sinyal penghentian `SIGTERM` dari Docker tidak akan diteruskan ke aplikasi Anda, menyebabkan shutdown kontainer menggantung selama 10 detik lalu dimatikan paksa (*SIGKILL*).
- **Exec Form** (`CMD ["node", "server.js"]`): Format JSON array wajib digunakan. Aplikasi Anda langsung menjadi PID 1 sejati dan menangkap sinyal *graceful shutdown* seketika.

---

---

## Penjelasan untuk Pemula

Bayangkan membangun Docker Image seperti menumpuk kue lapis. Lapisan dasar adalah piring (OS Alpine), lapisan kedua adalah tepung dan telur (package.json dan npm install), dan lapisan teratas adalah meses cokelat (kode program aplikasi Anda).

Jika Anda ingin mengganti warna meses cokelat (edit kode), Anda cukup mengganti taburan meses di lapisan paling atas tanpa perlu membuang dan memanggang ulang kue lapis di bawahnya!

## Eksperimen

- Build Dockerfile di atas, lalu ubah 1 kata di file src/server.js, build ulang, dan amati bahwa langkah npm ci tetap berstatus CACHED
- Buat file .dockerignore yang mengecualikan node_modules dan .git, lalu periksa ukuran build context yang dikirim ke daemon
- Ubah format CMD menjadi shell form CMD node src/server.js, jalankan docker stop, dan amati jeda 10 detik sebelum kontainer mati
- Inspeksi riwayat ukuran masing-masing layer image menggunakan perintah docker history <image-id>

---

## Tantangan

Buat file `.dockerignore` berstandar keamanan tinggi yang secara default mengabaikan seluruh file (`*`), lalu menyertakan secara selektif (`!src`, `!package*.json`, `!tsconfig.json`) hanya file yang benar-benar dibutuhkan aplikasi.

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

Anda telah menguasai anatomi Dockerfile, pemaksimalan efisiensi Build Cache, keharusan sintaks Exec Form untuk graceful shutdown, dan sanitasi konteks dengan .dockerignore.
