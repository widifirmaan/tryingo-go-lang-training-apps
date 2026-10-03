# Keamanan Kontainer: Non-Root, Drop Capabilities & Trivy

> **Kategori:** Docker | **Level:** Orkestrasi Multi-Kontainer & Keamanan Produksi | **Minggu 7:** Keamanan Kontainer: Non-Root, Drop Capabilities & Trivy

## Tujuan Pembelajaran

- Menerapkan prinsip Zero-Trust pada runtime kontainer Docker di lingkungan produksi
- Mengunci sistem file menjadi immutable menggunakan flag `--read-only` dan alokasi `--tmpfs` aman
- Memangkas hak istimewa kernel Linux menggunakan `--cap-drop=ALL` dan `--security-opt=no-new-privileges`
- Mengintegrasikan pemindaian kerentanan CVE otomatis menggunakan Trivy dan Docker Scout di pipeline CI/CD

---

## Program: Pengerasan Keamanan Kontainer Menyeluruh: Read-Only Filesystem dan Eliminasi Hak Akses Root

```bash
# 1. Run ultra-hardened production container applying Zero-Trust principles
docker run -d \
  --name hardened_api \
  --read-only \
  --cap-drop=ALL \
  --cap-add=NET_BIND_SERVICE \
  --security-opt=no-new-privileges:true \
  --tmpfs /tmp:rw,noexec,nosuid,size=64m \
  --user 10001:10001 \
  -p 8080:8080 \
  my-production-api:v1

# Explanation of Security Flags:
# --read-only: Root filesystem is 100% IMMUTABLE! Attackers CANNOT download rootkits or write scripts!
# --cap-drop=ALL: Strips all Linux Kernel capabilities (chown, kill, net_admin, sys_admin)
# --cap-add=NET_BIND_SERVICE: Grants strictly the permission to bind low ports (if needed)
# --security-opt=no-new-privileges:true: Blocks processes from gaining privileges via SUID binaries
# --tmpfs /tmp: Provides temporary, RAM-only writable scratchpad with noexec flag
# --user 10001: Forces non-root unprivileged UID

# 2. Automated Vulnerability Auditing with Trivy CLI
# Scans OS packages and application dependencies (npm, pip, go) for known CVEs
trivy image --severity HIGH,CRITICAL my-production-api:v1

# 3. Docker Scout: Real-time CVE recommendations
docker scout quickview my-production-api:v1
docker scout cves --only-severity critical my-production-api:v1
```

---

## Konsep Kunci

### Bahaya Menjalankan Kontainer Sebagai Root (UID 0)
Secara default, jika Anda tidak menentukan instruksi `USER`, proses di dalam kontainer berjalan sebagai pengguna **root (UID 0)**. Meskipun dibatasi oleh namespaces, jika penyerang berhasil menemukan celah *Container Breakout* (seperti celah kernel Linux pada `runc`), penyerang otomatis mendapatkan hak akses root atas seluruh server fisik host Anda! Menjalankan kontainer sebagai pengguna biasa unprivileged (`USER 10001`) membatasi potensi kerusakan.

### Sistem File Read-Only dan tmpfs Aman
Lebih dari 90% malware yang berhasil menembus aplikasi web akan berusaha mengunduh file biner jahat ke folder `/tmp` atau menimpa file konfigurasi di `/app`.
Dengan flag `--read-only`, sistem file kontainer dikunci mati (*immutable*). Bahkan perintah `touch test.txt` akan ditolak oleh sistem operasi. Jika aplikasi butuh tempat sementara untuk memproses buffer file kecil, gunakan `--tmpfs /tmp:rw,noexec,nosuid,size=64m`. Opsi `noexec` memastikan tidak ada file di dalam `/tmp` yang dapat dieksekusi sebagai program!

### Memangkas Linux Capabilities (`--cap-drop=ALL`)
Root di Linux tidak bersifat biner (semua atau tidak sama sekali). Hak akses dipecah menjadi puluhan **Capabilities** (misal: `CAP_SYS_ADMIN`, `CAP_NET_RAW`, `CAP_CHOWN`). 
Aplikasi web backend pada dasarnya tidak butuh mengubah kepemilikan file atau mengutak-atik routing kartu jaringan. Flag `--cap-drop=ALL` mencabut seluruh kemampuan tingkat kernel tersebut, menyisakan hanya kapabilitas minimal mutlak yang dibutuhkan.

---

---

## Penjelasan untuk Pemula

Bayangkan seorang tamu hotel yang menyewa kamar. 
Menjalankan kontainer sebagai root seperti memberi tamu tersebut kunci master seluruh gedung hotel! 

Hardening keamanan seperti:
1. Memberi tamu kartu kamar biasa yang hanya bisa membuka pintunya sendiri (Non-Root User).
2. Memaku mati seluruh perabotan dan melarang mengecat dinding kamar (`--read-only`).
3. Mengambil seluruh gunting, tang, dan obeng dari kantong tamu (`--cap-drop=ALL`) sehingga mereka tidak bisa membongkar instalasi listrik gedung!

## Eksperimen

- Jalankan kontainer dengan flag --read-only dan coba buat file baru dengan touch /app/malware.sh untuk melihat penolakan Read-only file system
- Uji flag --cap-drop=ALL dan amati bagaimana perintah chown atau ping ditolak karena kehilangan Linux capabilities
- Jalankan pemindaian Trivy pada image node:latest vs node:alpine vs distroless dan bandingkan temuan CVE kritis
- Periksa apakah proses kontainer berjalan sebagai non-root menggunakan perintah id di dalam kontainer

---

## Tantangan

Konfigurasikan blok `security_opt` dan `cap_drop` di dalam file `compose.yaml`: terapkan `--read-only`, non-root user UID 10001, dan `--tmpfs /tmp` pada seluruh servis API.

---

## Ringkasan

Anda telah menguasai pengerasan keamanan kontainer Docker: eksekusi non-root UID, pembekuan sistem file dengan --read-only dan tmpfs noexec, pemangkasan Linux capabilities, serta audit CVE dengan Trivy.
