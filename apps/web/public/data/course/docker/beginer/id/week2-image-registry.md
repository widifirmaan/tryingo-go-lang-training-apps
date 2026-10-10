# Image & Registry

> **Kategori:** Docker | **Level:** Pemula | **Minggu 2:** Image & Registry

## Tujuan Pembelajaran

- Image layers: setiap command adalah layer
- Pull, tag, push image ke registry
- Docker Hub: search, pull, push image
- Save/load image untuk offline transfer
- Best practices: small image, pin version, minimize layers

---

## Program: Build & Push Image

```bash
# ─────────────────────────────────────────────────────────
# DOCKER IMAGES & REGISTRIES
# ─────────────────────────────────────────────────────────

# Lihat semua image lokal
docker images
docker image ls

# Pull image dari Docker Hub
docker pull nginx:1.25
docker pull ubuntu:22.04
docker pull node:20-alpine

# Image layers — setiap command di Dockerfile adalah layer
docker history nginx

# Inspect image
docker inspect nginx

# Tag image
docker tag nginx:1.25 my-nginx:v1.0

# Push ke Docker Hub (login dulu)
docker login
docker tag my-nginx:v1.0 username/my-nginx:v1.0
docker push username/my-nginx:v1.0

# Search image
docker search mysql
docker search --filter=stars=1000 nginx

# Remove image
docker rmi nginx
docker image prune       # Remove unused images
docker image prune -a    # Remove ALL unused images

# Save dan load image (offline transfer)
docker save -o nginx.tar nginx:1.25
docker load -i nginx.tar

# Import dan export container
docker export my-container > container.tar
docker import container.tar my-image:v1

# Multi-architecture images
docker buildx ls
docker buildx build --platform linux/amd64,linux/arm64 -t myapp .

# Image best practices:
# 1. Gunakan official image
# 2. Pilih small base image (alpine, distroless)
# 3. Pin version tag (hindari :latest)
# 4. Gabung RUN commands untuk minimize layers
# 5. Gunakan .dockerignore
```

---

## Konsep Kunci

### Image Layers
Setiap instruction di Dockerfile membuat layer. Layer di-cache untuk build lebih cepat.

### Registry
Docker Hub = default registry. Bisa buat private registry.

### Tag
`docker tag source target` — rename/reversion image.

### Push Flow
1. `docker login`
2. `docker tag image username/repo:tag`
3. `docker push username/repo:tag`

### Best Practices
- Gunakan alpine/distroless untuk image kecil
- Pin version (hindari :latest)
- Gabung RUN: `RUN apt update && apt install -y ...`

---

## Eksperimen

- Pull berbagai image dan lihat layers
- Eksperimen dengan image tagging
- Coba save dan load image
- Buat akun Docker Hub dan push image
- Eksperimen dengan multi-arch build

---

## Tantangan

Buat image custom: pull ubuntu, install nginx, buat halaman custom, push ke Docker Hub.

---

## Ringkasan

Minggu 2 dari 12: **Image & Registry** (Level: Pemula). Manajemen image Docker. Minggu depan: **Container Management**.
