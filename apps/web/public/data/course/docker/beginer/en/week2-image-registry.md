# Images & Registries

> **Kategori:** Docker | **Level:** Beginner | **Minggu 2:** Images & Registries

## Learning Objectives

- Image layers: each command is a layer
- Pull, tag, push images to registries
- Docker Hub: search, pull, push images
- Save/load images for offline transfer
- Best practices: small images, pin versions, minimize layers

---

## Program: Build & Push Images

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

## Key Concepts

### Image Layers
Each Dockerfile instruction creates a cached layer.

### Registries
Docker Hub is the default. Private registries for enterprise.

### Tagging
Rename and version images with docker tag.

### Push Flow
Login → Tag → Push to registry.

### Best Practices
Use small base images, pin versions, minimize layers.

---

## Experiments

- Pull various images and observe layers
- Experiment with image tagging
- Try saving and loading images
- Create Docker Hub account and push image
- Experiment with multi-arch builds

---

## Challenge

Create custom image: pull ubuntu, install nginx, make custom page, push to Docker Hub.

---

## Summary

Week 2 of 12: **Images & Registries** (Level: Beginner). Docker image management. Next week: **Container Management**.
