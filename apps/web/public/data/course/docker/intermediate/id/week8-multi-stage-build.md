# Multi-Stage Build

> **Kategori:** Docker | **Level:** Menengah | **Minggu 8:** Multi-Stage Build

## Tujuan Pembelajaran

- Multi-stage build: multiple FROM dalam satu Dockerfile
- Build stage: compile, test, build artifacts
- Production stage: copy hanya artifacts, bukan tools
- Distroless base image untuk minimal attack surface
- Perbandingan image size: single vs multi-stage

---

## Program: Optimized Image

```dockerfile
# ─────────────────────────────────────────────────────────
# MULTI-STAGE BUILD — Optimized Production Image
# ─────────────────────────────────────────────────────────

# File: Dockerfile (Node.js App)
# Stage 1: Build
FROM node:20-alpine AS builder
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm ci
COPY . .
RUN npm run build

# Stage 2: Production
FROM node:20-alpine AS production
WORKDIR /app
ENV NODE_ENV=production

# Copy hanya yang perlu dari builder
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/package.json ./
RUN npm ci --only=production && npm cache clean --force

# Non-root user
RUN addgroup -S appgroup && adduser -S appuser -G appgroup
USER appuser

EXPOSE 3000
HEALTHCHECK --interval=30s CMD wget --spider http://localhost:3000/health || exit 1
CMD ["node", "dist/server.js"]

# ─────────────────────────────────────────────────────────
# File: Dockerfile (Go App)
# ─────────────────────────────────────────────────────────
# Stage 1: Build
FROM golang:1.22-alpine AS builder
WORKDIR /app
COPY go.mod go.sum ./
RUN go mod download
COPY . .
RUN CGO_ENABLED=0 GOOS=linux go build -o /app/server .

# Stage 2: Production (distroless)
FROM gcr.io/distroless/static-debian12 AS production
COPY --from=builder /app/server /server
EXPOSE 8080
USER nonroot:nonroot
ENTRYPOINT ["/server"]

# ─────────────────────────────────────────────────────────
# File: Dockerfile (Python App)
# ─────────────────────────────────────────────────────────
# Stage 1: Build
FROM python:3.12-slim AS builder
WORKDIR /app
COPY requirements.txt .
RUN pip install --user --no-cache-dir -r requirements.txt

# Stage 2: Production
FROM python:3.12-slim AS production
WORKDIR /app
COPY --from=builder /root/.local /root/.local
COPY . .
ENV PATH=/root/.local/bin:$PATH
RUN adduser --disabled-password appuser
USER appuser
EXPOSE 8000
CMD ["python", "app.py"]

# ─────────────────────────────────────────────────────────
# Build & Compare
# ─────────────────────────────────────────────────────────
# docker build -t myapp:single -f Dockerfile.single .
# docker build -t myapp:multi -f Dockerfile .
# docker images | grep myapp
# Single stage: ~1GB
# Multi-stage: ~50MB
```

---

## Konsep Kunci

### Multi-Stage Build
Multiple FROM dalam satu Dockerfile. Setiap FROM = stage baru.

### Build Stage
Install dependencies, compile code, run tests. Bisa pakai image besar.

### Production Stage
Copy hanya artifacts dari build stage. Image kecil dan aman.

### Distroless
Image tanpa shell, package manager. Minimal attack surface.

### Benefits
- Image lebih kecil (1GB → 50MB)
- Lebih aman (no build tools)
- Build cache per stage

---

## Eksperimen

- Buat multi-stage build untuk aplikasi sendiri
- Bandingkan image size single vs multi-stage
- Coba distroless base image
- Eksperimen dengan named stages
- Buat build dengan test stage

---

## Tantangan

Buat multi-stage build untuk aplikasi pilihan: build stage + production stage. Bandingkan ukuran image.

---

## Ringkasan

Minggu 8 dari 12: **Multi-Stage Build** (Level: Menengah). Selesai fase Intermediate! Minggu depan: **Security** (Advanced).
