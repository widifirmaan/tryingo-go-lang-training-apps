# Multi-Stage Builds

> **Kategori:** Docker | **Level:** Intermediate | **Minggu 8:** Multi-Stage Builds

## Learning Objectives

- Multi-stage builds: multiple FROM in one Dockerfile
- Build stage: compile, test, build artifacts
- Production stage: copy only artifacts, not tools
- Distroless base images for minimal attack surface
- Image size comparison: single vs multi-stage

---

## Program: Optimized Images

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

## Key Concepts

### Multi-Stage Builds
Multiple FROM instructions for different build phases.

### Build Stage
Compile and test with full toolchain.

### Production Stage
Copy only necessary artifacts.

### Distroless
Minimal images without shells or package managers.

### Benefits
Smaller images, better security, cached builds.

---

## Experiments

- Create multi-stage build for your application
- Compare single vs multi-stage image sizes
- Try distroless base images
- Experiment with named stages
- Create build with test stage

---

## Challenge

Create multi-stage build for your application: build stage + production stage. Compare image sizes.

---

## Summary

Week 8 of 12: **Multi-Stage Builds** (Level: Intermediate). Intermediate phase complete! Next week: **Security** (Advanced).
