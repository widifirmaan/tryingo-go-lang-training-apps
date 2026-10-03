# Manajemen Volume, Persistensi Data & Jaringan Bridge

> **Kategori:** Docker | **Level:** Fondasi Kontainerisasi & Optimasi Image | **Minggu 4:** Manajemen Volume, Persistensi Data & Jaringan Bridge
> ⏱️ **Estimasi Belajar:** 45 Menit (15m teori, 30m praktik) | 🔗 **Tingkat:** Terstruktur (Step-by-step)


## Tujuan Pembelajaran

- Memahami sifat Ephemeral (sementara) sistem file kontainer dan pentingnya penyimpanan persisten
- Membedakan jenis mount: Named Volumes (dikelola Docker di /var/lib/docker/volumes/) vs Bind Mounts (path host lokal)
- Memahami perbedaan Default Bridge Network vs User-Defined Bridge Network (resolusi DNS otomatis)
- Menghubungkan beberapa kontainer dalam satu jaringan terisolasi tanpa membuka port database ke publik

---

## Program: Persistensi Database PostgreSQL dengan Named Volume dan Komunikasi Jaringan Kustom

```bash
# 1. Create dedicated user-defined Bridge Network
# User-defined bridges provide automatic DNS resolution between containers by container name!
docker network create --driver bridge app_isolated_net

# 2. Create durable Named Volume for database storage persistence
# Bypasses the slow Copy-On-Write storage driver, writing at raw host disk speed!
docker volume create pgdata_production

# 3. Launch PostgreSQL container attached to network and volume
docker run -d \
  --name db_postgres \
  --network app_isolated_net \
  -e POSTGRES_DB=commerce_db \
  -e POSTGRES_USER=admin \
  -e POSTGRES_PASSWORD=SuperSecretPass2026! \
  -v pgdata_production:/var/lib/postgresql/data \
  postgres:17-alpine

# 4. Launch backend application attached to the SAME network
# Notice the database host in URL uses the container name 'db_postgres' resolved via Docker DNS!
docker run -d \
  --name api_server \
  --network app_isolated_net \
  -p 4000:4000 \
  -e DATABASE_URL="postgresql://admin:SuperSecretPass2026!@db_postgres:5432/commerce_db" \
  node:22-alpine sleep 3600

# 5. Verify Inter-Container DNS resolution and connectivity
docker exec -it api_server ping -c 2 db_postgres

# 6. Test Data Persistence across container destruction
docker stop db_postgres && docker rm db_postgres
# Notice: Container is DELETED, but physical volume remains completely intact!
docker volume ls

# Launch a NEW container pointing to the existing volume: All historical data is preserved!
docker run -d \
  --name db_postgres_v2 \
  --network app_isolated_net \
  -v pgdata_production:/var/lib/postgresql/data \
  postgres:17-alpine
```

---

## Konsep Kunci

### Sifat Ephemeral Sistem File Kontainer
Secara default, seluruh sistem file di dalam kontainer bersifat **sementara (*ephemeral*)**. Ketika Anda membuat tabel di database atau mengunggah file di dalam kontainer, data tersebut ditulis ke layer tipis *writable layer* kontainer. Saat kontainer dimatikan dan dihapus (`docker rm`), seluruh data tersebut akan **musnah selamanya**.

### Named Volumes vs Bind Mounts
1. **Named Volumes** (`-v nama_volume:/path/kontainer`): Dikelola sepenuhnya oleh Docker di direktori aman host (`/var/lib/docker/volumes/`). Named volume melewati layer *Copy-On-Write* (CoW) dan menulis langsung ke disk host pada kecepatan I/O native. Merupakan standar emas untuk PostgreSQL, MySQL, dan Redis.
2. **Bind Mounts** (`-v /path/di/laptop:/path/kontainer`): Menautkan folder fisik di laptop pengembang ke dalam kontainer. Sangat ideal untuk *Hot-Reloading* saat pengembangan lokal, namun tidak disarankan di lingkungan produksi karena ketergantungan pada struktur path OS host.

### Keajaiban DNS pada User-Defined Bridge Network
Secara default, jika Anda tidak menentukan jaringan, kontainer masuk ke `default bridge network`. Jaringan default ini memiliki kelemahan: tidak mendukung pencarian nama servis (*Service Discovery*).
Sebaliknya, pada **User-Defined Bridge Network** (`docker network create ...`), Docker menyediakan server DNS internal. Kontainer `api_server` dapat menghubungi database cukup dengan memanggil hostname nama kontainernya: `db_postgres:5432`, tanpa pernah perlu memusingkan IP address kontainer yang dinamis.

---

---

## Penjelasan untuk Pemula

Bayangkan kontainer seperti kamar hotel yang Anda sewa selama semalam. Jika Anda meninggalkan baju di lemari kamar hotel dan check-out, petugas kebersihan akan membuang baju Anda (Ephemeral).

Named Volume seperti brankas penitipan permanen di stasiun kereta: Anda bisa check-in di hotel mana pun, kapan pun, dan brankas penitipan barang Anda tetap utuh tidak tersentuh. 
User-Defined Network seperti interkom telepon antar-kamar di hotel: Anda cukup menekan tombol 'Resepsionis' atau 'Koki' (DNS Container Name) tanpa perlu tahu nomor HP pribadi mereka!

## Eksperimen

- Buat tabel dan isi data di postgres, hapus kontainernya, buat kontainer baru dengan volume yang sama, dan buktikan datanya masih ada
- Inspeksi lokasi fisik volume di host menggunakan docker volume inspect pgdata_production
- Coba ping kontainer lain di default bridge network dan buktikan bahwa DNS name lookup gagal
- Gunakan docker network inspect app_isolated_net untuk melihat daftar seluruh IP kontainer yang tergabung

---

## Tantangan

Konfigurasi arsitektur multi-network: buat `frontend_net` dan `backend_net`. Pastikan kontainer Web terhubung ke kedua network, namun kontainer Database HANYA terhubung ke `backend_net` sehingga terisolasi total dari internet.

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

Anda telah menguasai manajemen persistensi data kontainer menggunakan Named Volumes, bind mounts untuk development, serta arsitektur jaringan User-Defined Bridge dengan DNS service discovery otomatis.
