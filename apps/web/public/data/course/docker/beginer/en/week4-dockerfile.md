# Dockerfile

> **Kategori:** Docker | **Level:** Beginner | **Minggu 4:** Dockerfile

## Learning Objectives

- Dockerfile instructions: FROM, RUN, COPY, WORKDIR, CMD
- Layer caching: instruction order affects cache
- Environment variables: ENV vs ARG
- EXPOSE and HEALTHCHECK
- .dockerignore to exclude files

---

## Program: Building Custom Images

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

## Key Concepts

### Dockerfile
Blueprint for building images. Each instruction creates a layer.

### Layer Caching
Docker caches unchanged layers. Order instructions strategically.

### COPY vs ADD
COPY for simple file copying. ADD for URLs and tar extraction.

### CMD vs ENTRYPOINT
CMD can be overridden. ENTRYPOINT always runs.

### HEALTHCHECK
Docker monitors container health.

### .dockerignore
Exclude files from build context.

---

## Experiments

- Create Dockerfile for Python application
- Experiment with layer caching
- Try HEALTHCHECK with different intervals
- Create .dockerignore and observe build differences
- Experiment with CMD vs ENTRYPOINT

---

## Challenge

Create Dockerfile for web app: multi-stage build, non-root user, health check, optimized layers.

---

## Summary

Week 4 of 12: **Dockerfile** (Level: Beginner). Beginner phase complete! Next week: **Volumes & Data** (Intermediate).
