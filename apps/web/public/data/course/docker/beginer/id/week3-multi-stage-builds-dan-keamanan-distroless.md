# Multi-Stage Builds & Citra Minimalis Distroless

> **Kategori:** Docker | **Level:** Fondasi Kontainerisasi & Optimasi Image | **Minggu 3:** Multi-Stage Builds & Citra Minimalis Distroless
> ⏱️ **Estimasi Belajar:** 45 Menit (15m teori, 30m praktik) | 🔗 **Tingkat:** Terstruktur (Step-by-step)


## Tujuan Pembelajaran

- Memahami konsep Multi-Stage Builds untuk memisahkan lingkungan kompilasi dari lingkungan runtime
- Menyusutkan ukuran Docker Image secara drastis (dari 1GB+ menjadi kurang dari 30MB)
- Meningkatkan keamanan dengan mengeliminasi compiler, package manager, dan shell pada image runtime
- Menggunakan citra basis Distroless (`gcr.io/distroless/*`) dan menjalankan proses sebagai pengguna nonroot

---

## Program: Penyusutan Ukuran Image Go/Node.js dari 1.2GB Menjadi 25MB Menggunakan Multi-Stage Builds

```dockerfile
# ==============================================================================
# STAGE 1: Build & Compilation Environment (Heavyweight image with compilers)
# ==============================================================================
FROM golang:1.24-alpine AS builder

WORKDIR /build

# Install build-time dependencies (compilers, git, certificates)
RUN apk add --no-cache git ca-certificates

# Cache dependencies layer
COPY go.mod go.sum ./
RUN go mod download

# Copy application source
COPY . .

# Compile binary statically (CGO_ENABLED=0 disables C bindings, creating pure standalone binary)
# -ldflags="-w -s" strips debugging symbols to shrink binary footprint by 40%!
RUN CGO_ENABLED=0 GOOS=linux GOARCH=amd64 go build \
    -ldflags="-w -s" \
    -o /build/api-server .

# ==============================================================================
# STAGE 2: Production Distroless Runtime (Ultra-secure, minimal image)
# Contains ZERO package managers (no apk/apt), ZERO shells (no /bin/sh / /bin/bash)
# ==============================================================================
# gcr.io/distroless/static-debian12 contains strictly CA certificates and tzdata
FROM gcr.io/distroless/static-debian12:nonroot

WORKDIR /app

# Copy ONLY the compiled binary artifact from the builder stage!
# Compilers, SDKs, caches, and intermediate source code are COMPLETELY LEFT BEHIND!
COPY --from=builder /build/api-server /app/api-server

# Distroless 'nonroot' image runs by default under unprivileged UID 65532
USER nonroot:nonroot

EXPOSE 8080

ENTRYPOINT ["/app/api-server"]
```

---

## Konsep Kunci

### Mengapa Multi-Stage Builds Sangat Revolusioner?
Sebelum ada fitur **Multi-Stage Builds**, developer kerap menyertakan seluruh SDK bahasa (compiler Go, Rust, Node.js, Python build tools, git, gcc) di dalam image produksi. Akibatnya:
1. Ukuran image membengkak hingga **1GB - 2GB**, memperlambat proses deployment CI/CD dan menyita bandwidth jaringan.
2. Membuka **permukaan serangan (*attack surface*) yang sangat lebar**. Jika peretas menemukan celah RCE (*Remote Code Execution*), mereka memiliki akses langsung ke compiler `gcc` atau package manager `apt-get` untuk mengunduh malware di dalam server Anda.

### Sintaks Multi-Stage: `AS builder` dan `COPY --from=builder`
Dengan Multi-Stage Builds:
- **Stage 1 (Builder)**: Menggunakan image lengkap (`golang:alpine` atau `node:alpine`) untuk mengunduh library, mengompilasi TypeScript ke JavaScript, atau membangun binary biner mesin.
- **Stage 2 (Runtime)**: Dimulai dengan instruksi `FROM` baru. Seluruh file mentah di Stage 1 dibuang. Anda hanya menyalin file executable hasil kompilasi menggunakan instruksi `COPY --from=builder /build/api-server /app/api-server`.

### Keamanan Ekstrem Citra Distroless
Citra **Distroless** (dibuat oleh Google) adalah standar emas keamanan kontainer. Image ini hanya berisi dependensi minimal mutlak yang dibutuhkan aplikasi Anda untuk berjalan (seperti sertifikat SSL root `ca-certificates` dan zona waktu). Di dalam Distroless, **tidak ada shell (`/bin/sh` atau `/bin/bash`) dan tidak ada package manager (`apt`, `apk`)**. Peretas yang menyusup tidak dapat mengeksekusi perintah shell apapun!

---

---

## Penjelasan untuk Pemula

Bayangkan Anda membangun sebuah mobil balap Formula 1. 
Stage 1 (Builder) adalah pabrik bengkel raksasa lengkap dengan mesin las, mesin bubut, forklift, dan tumpukan besi kotor seberat 10 ton.
Stage 2 (Runtime) adalah lintasan sirkuit balap. 

Anda tidak membawa seluruh mesin las dan forklift 10 ton ke sirkuit balap; Anda hanya membawa mobil balap jadi seberat 500kg yang siap melesat kencang!

## Eksperimen

- Bandingkan ukuran image menggunakan perintah docker images: bandingkan single-stage (1GB+) vs multi-stage distroless (<30MB)
- Coba jalankan docker exec -it <container> sh pada kontainer distroless dan amati error bahwa executable sh tidak ditemukan
- Gunakan tool scanning keamanan open-source Trivy (trivy image <name>) untuk melihat penurunan drastis celah CVE
- Uji kompilasi dengan flag CGO_ENABLED=0 untuk memastikan binary Go tidak bergantung pada library C sistem

---

## Tantangan

Terapkan Multi-Stage Build untuk aplikasi frontend React/Vite: Stage 1 menjalankan `npm run build` di Node.js, dan Stage 2 menyalin folder `dist/` ke dalam web server `nginx:alpine` tanpa menyertakan Node.js sama sekali.

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
- **Fungsi Utama:** Menentukan base image awal.
- **Parameter / Atribut:** `Nama image, Versi/Tag`.
- **Perilaku & Efek Sistem:** Fondasi sistem operasi dan runtime aplikasi (misal `node:20-alpine`, `golang:1.24`).
- **Contoh Penggunaan Praktis:**
```javascript
FROM node:20-alpine
WORKDIR /app
```
- **Hasil Output yang Diharapkan:**
```text
Menyiapkan lingkungan Node.js di atas sistem operasi Alpine Linux
```

### 2. `COPY <src> <dest>`
- **Fungsi Utama:** Menyalin file lokal ke dalam image filesystem.
- **Parameter / Atribut:** `Path file host, Path tujuan container`.
- **Perilaku & Efek Sistem:** Memasukkan kode sumber, file konfigurasi, dan aset ke direktori kerja container.
- **Contoh Penggunaan Praktis:**
```javascript
COPY package*.json ./
RUN npm install
COPY . .
```
- **Hasil Output yang Diharapkan:**
```text
Kode aplikasi tersalin ke dalam container untuk dijalankan
```

### 3. `RUN <command>`
- **Fungsi Utama:** Mengeksekusi perintah build pembuatan layer.
- **Parameter / Atribut:** `Shell command`.
- **Perilaku & Efek Sistem:** Menginstal dependencies, mengkompilasi binary, dan mengatur izin sistem.
- **Contoh Penggunaan Praktis:**
```javascript
RUN npm run build
```
- **Hasil Output yang Diharapkan:**
```text
Menghasilkan bundle produksi di dalam layer image
```

### 4. `docker run -d -p 8080:80 --name web app:v1`
- **Fungsi Utama:** Menjalankan container dari image.
- **Parameter / Atribut:** `Flag -d (detached), -p (port mapping), --name`.
- **Perilaku & Efek Sistem:** Membuat dan menyalakan instance container aktif yang memetakan port host 8080 ke port container 80.
- **Contoh Penggunaan Praktis:**
```javascript
docker run -d -p 3000:3000 my-app
```
- **Hasil Output yang Diharapkan:**
```text
Aplikasi web aktif dan dapat diakses di http://localhost:3000
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

Anda telah menguasai Multi-Stage Builds, penyusutan ukuran image dari gigabyte ke puluhan megabyte, eliminasi permukaan serangan dengan Distroless, dan penegakan eksekusi pengguna nonroot.
