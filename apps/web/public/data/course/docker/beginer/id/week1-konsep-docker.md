# Konsep Docker

> **Kategori:** Docker | **Level:** Pemula | **Minggu 1:** Konsep Docker

## Tujuan Pembelajaran

- Memahami konsep Docker: image, container, registry
- Instalasi Docker: Docker Desktop, Docker Engine
- Docker architecture: Client, Daemon, Containerd, runc
- Perintah dasar: run, ps, images, pull, exec
- Flags umum: -d, --name, -p, -v, -e, --rm

---

## Panduan Mulai Cepat (Quick Start): Setup & Inisialisasi Project

Sebelum mulai mendalami materi dan praktik kode di bawah, siapkan lingkungan pengembangan lokal Anda di komputer dengan langkah-langkah praktis berikut:

### 1. Persiapan Editor VS Code & Ekstensi Rekomendasi
Gunakan [Visual Studio Code](https://code.visualstudio.com/) sebagai code editor utama. Pasang ekstensi penting berikut:
- **Docker for VS Code** (`ms-azuretools.vscode-docker`): Kelola kontainer, images, volume, dan intellisense Dockerfile langsung di sidebar

Atau instal semua ekstensi rekomendasi sekaligus via terminal:
```bash
code --install-extension ms-azuretools.vscode-docker
```

---

### 2. Instalasi Runtime & Dependency (Docker Engine / Docker Desktop)
Pastikan runtime atau SDK telah terpasang di sistem operasi Anda:

**Windows (PowerShell):**
```powershell
winget install Docker.DockerDesktop
```

**macOS (Terminal / Homebrew):**
```bash
brew install --cask docker
```

**Linux (Ubuntu/Debian / bash):**
```bash
curl -fsSL https://get.docker.com | sh && sudo usermod -aG docker $USER
```

**Verifikasi Instalasi:**
Jalankan perintah berikut di terminal:
```bash
docker --version && docker compose version
```

Output yang diharapkan:
```output
Docker version 26.x.x
Docker Compose version v2.x.x
```

> 💡 **Tips Prasyarat:** Di Windows pastikan WSL 2 (Windows Subsystem for Linux) sudah aktif sebelum memasang Docker Desktop.

---

### 3. Inisialisasi Project Kosong (Scaffolding)
Buat folder dan kerangka awal project baru dengan perintah resmi:

```bash
mkdir my-docker-app && cd my-docker-app
touch compose.yaml
```
- **Keterangan:** Menyiapkan file konfigurasi multi-kontainer deklaratif modern compose.yaml.
- **Pindah ke direktori project:**
```bash
cd my-docker-app
```

---

### 4. Menjalankan Server Lokal & File Titik Masuk Pertama
Jalankan server pengembangan lokal:

```bash
docker compose up -d
```
Akses di browser atau terminal: `http://localhost:80`

> ℹ️ Kontainer berjalan di latar belakang (detached mode).

**File Titik Masuk Utama (`compose.yaml`):**
```dockerfile
services:
  web:
    image: nginx:alpine
    ports:
      - "8080:80"
    restart: always

  database:
    image: postgres:16-alpine
    environment:
      POSTGRES_USER: devuser
      POSTGRES_PASSWORD: secretpassword
      POSTGRES_DB: appdb
    ports:
      - "5432:5432"
    volumes:
      - pgdata:/var/lib/postgresql/data

volumes:
  pgdata:
```
Konfigurasi compose.yaml lengkap dengan web server NGINX dan PostgreSQL.

---

### 5. Struktur Direktori Proyek Baru
Struktur folder dan file standar yang dihasilkan:

```text
my-docker-app/
├── compose.yaml         # Orkestrasi multi-kontainer
├── Dockerfile           # Instruksi pembuatan image aplikasi
├── .dockerignore        # File yang diabaikan saat build
└── app/                 # Source code aplikasi
```
Pemisahan jelas antara konfigurasi image (Dockerfile) dan orkestrasi runtime (compose.yaml).

---

### 6. Tips & Best Practice untuk Pemula
- Gunakan perintah `docker compose ps` untuk melihat status kontainer yang sedang berjalan.
- Gunakan `docker compose logs -f` untuk memantau streaming log kontainer secara realtime.

---

## Program: Halo, Docker!

```bash
# ─────────────────────────────────────────────────────────
# DOCKER CONCEPTS — Fundamental Commands
# ─────────────────────────────────────────────────────────

# Check Docker installation
docker --version
docker info

# Hello World — verifikasi Docker berjalan
docker run hello-world

# Docker Architecture:
# Docker Client → Docker Daemon → Containerd → runc → Container

# Image vs Container:
# Image = template/blueprint (read-only)
# Container = running instance dari image

# Basic Commands
docker ps                    # List running containers
docker ps -a                 # List all containers (including stopped)
docker images                # List downloaded images
docker pull nginx            # Download image tanpa run
docker search ubuntu         # Cari image di Docker Hub

# Run container sederhana
docker run hello-world

# Run container dengan options
docker run -d --name my-nginx -p 8080:80 nginx

# Flags:
# -d        : detached mode (background)
# --name    : nama container
# -p        : port mapping (host:container)
# -v        : volume mount
# -e        : environment variable
# --rm      : auto-remove saat stop

# Lihat logs container
docker logs my-nginx
docker logs -f my-nginx      # Follow logs

# Execute command di container yang berjalan
docker exec -it my-nginx bash

# Stop dan remove container
docker stop my-nginx
docker rm my-nginx

# Remove image
docker rmi nginx
```

---

## Konsep Kunci

### Docker
Platform untuk develop, ship, dan run application dalam container.

### Image vs Container
Image = template read-only. Container = running instance dari image.

### Registry
Docker Hub = public registry. Private registry untuk enterprise.

### Architecture
- Docker CLI: user interface
- Docker Daemon: manage containers
- Containerd: container runtime management
- runc: low-level runtime

### Basic Workflow
1. Pull image: `docker pull nginx`
2. Run container: `docker run -d nginx`
3. Manage: `docker ps`, `docker stop`, `docker rm`

---

## Eksperimen

- Pull berbagai image dan run container
- Eksperimen dengan flags berbeda
- Coba exec bash di container ubuntu
- Run container dengan port mapping berbeda
- Eksperimen dengan environment variable

---

## Tantangan

Setup web server: pull nginx image, run container, akses di browser, customize halaman.

---

## Ringkasan

Minggu 1 dari 12: **Konsep Docker** (Level: Pemula). Containerization fundamentals. Minggu depan: **Image & Registry**.
