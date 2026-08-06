# Konsep Docker

> **Kategori:** Docker | **Level:** Pemula | **Minggu 1:** Konsep Docker

## Tujuan Pembelajaran

- Memahami konsep Docker: image, container, registry
- Instalasi Docker: Docker Desktop, Docker Engine
- Docker architecture: Client, Daemon, Containerd, runc
- Perintah dasar: run, ps, images, pull, exec
- Flags umum: -d, --name, -p, -v, -e, --rm

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
