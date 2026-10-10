# Dockerfile

> **Kategori:** Docker | **Level:** Pemula | **Minggu 4:** Dockerfile

## Tujuan Pembelajaran

- Dockerfile instructions: FROM, RUN, COPY, WORKDIR, CMD
- Layer caching: urutan instruction mempengaruhi cache
- Environment variables: ENV vs ARG
- EXPOSE dan HEALTHCHECK
- .dockerignore untuk exclude file

---

## Program: Build Custom Image

```dockerfile
# ─────────────────────────────────────────────────────────
# DOCKERFILE — Build Custom Image
# ─────────────────────────────────────────────────────────

# File: Dockerfile
FROM node:20-alpine

# Metadata
LABEL maintainer="developer@example.com"
LABEL version="1.0"
LABEL description="Node.js App"

# Environment variable
ENV NODE_ENV=production
ENV PORT=3000

# Working directory
WORKDIR /app

# Copy dependency files (layer caching)
COPY package.json package-lock.json ./

# Install dependencies
RUN npm ci --only=production

# Copy application code
COPY . .

# Create non-root user
RUN addgroup -S appgroup && adduser -S appuser -G appgroup
USER appuser

# Expose port (dokumentasi, tidak publish)
EXPOSE 3000

# Health check
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
  CMD wget --no-verbose --tries=1 --spider http://localhost:3000/health || exit 1

# Start command
CMD ["node", "server.js"]

# ─────────────────────────────────────────────────────────
# Build & Run
# ─────────────────────────────────────────────────────────

# Build image
# docker build -t my-node-app:1.0 .
# docker build -t my-node-app:1.0 -f Dockerfile.prod .

# Run container dari image
# docker run -d -p 3000:3000 --name app my-node-app:1.0

# ─────────────────────────────────────────────────────────
# Dockerfile Instructions:
# ─────────────────────────────────────────────────────────
# FROM      : base image
# RUN       : execute command saat build
# COPY      : copy file dari host ke image
# ADD       : seperti COPY, support URL dan tar
# WORKDIR   : set working directory
# ENV       : environment variable
# ARG       : build-time variable
# EXPOSE    : dokumentasi port
# CMD       : default command saat container start
# ENTRYPOINT: command yang selalu dijalankan
# USER      : switch user
# LABEL     : metadata
# HEALTHCHECK: health check
# VOLUME    : mount point

# ─────────────────────────────────────────────────────────
# .dockerignore
# ─────────────────────────────────────────────────────────
# node_modules
# .git
# .env
# *.log
# Dockerfile
# .dockerignore
```

---

## Konsep Kunci

### Dockerfile
Blueprint untuk build image. Setiap instruction = satu layer.

### Layer Cache
Jika instruction tidak berubah, Docker pakai cache. Urutan penting: taruh yang jarang berubah di atas.

### COPY vs ADD
COPY lebih disederhana. ADD support URL dan auto-extract tar.

### CMD vs ENTRYPOINT
CMD bisa override. ENTRYPOINT selalu dijalankan. Bisa kombinasi.

### HEALTHCHECK
Docker cek health container. Unhealthy container bisa di-restart.

### .dockerignore
Exclude file dari build context. Mengurangi build time dan image size.

---

## Eksperimen

- Buat Dockerfile untuk aplikasi Python
- Eksperimen dengan layer caching
- Coba HEALTHCHECK dengan berbagai interval
- Buat .dockerignore dan lihat perbedaan build
- Eksperimen dengan CMD vs ENTRYPOINT

---

## Tantangan

Buat Dockerfile untuk web app: multi-stage build, non-root user, health check, optimized layers.

---

## Ringkasan

Minggu 4 dari 12: **Dockerfile** (Level: Pemula). Selesai fase Beginner! Minggu depan: **Volume & Data** (Intermediate).
