# Docker Concepts

> **Kategori:** Docker | **Level:** Beginner | **Minggu 1:** Docker Concepts

## Learning Objectives

- Understand Docker concepts: images, containers, registries
- Docker installation: Docker Desktop, Docker Engine
- Docker architecture: Client, Daemon, Containerd, runc
- Basic commands: run, ps, images, pull, exec
- Common flags: -d, --name, -p, -v, -e, --rm

---

## Program: Hello, Docker!

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

## Key Concepts

### Docker
Platform for developing, shipping, and running applications in containers.

### Images vs Containers
Images are read-only templates. Containers are running instances.

### Registries
Docker Hub for public images. Private registries for enterprise.

### Architecture
CLI → Daemon → Containerd → runc → Container.

### Basic Workflow
Pull image → Run container → Manage lifecycle.

---

## Experiments

- Pull various images and run containers
- Experiment with different flags
- Try exec bash in ubuntu container
- Run containers with different port mappings
- Experiment with environment variables

---

## Challenge

Set up web server: pull nginx image, run container, access in browser, customize page.

---

## Summary

Week 1 of 12: **Docker Concepts** (Level: Beginner). Containerization fundamentals. Next week: **Images & Registries**.
