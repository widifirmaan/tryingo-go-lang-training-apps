# Capstone: Production Pipeline

> **Kategori:** Docker | **Level:** Advanced | **Minggu 12:** Capstone: Production Pipeline

## Learning Objectives

- Full production pipeline: build → test → scan → deploy
- Multi-stage Dockerfile with security best practices
- Docker Compose production with replicas and limits
- CI/CD integration with GitHub Actions
- Monitoring, backup, and disaster recovery

---

## Program: Full DevOps Pipeline

```bash
# ─────────────────────────────────────────────────────────
# CAPSTONE: Full Docker Production Pipeline
# ─────────────────────────────────────────────────────────

# Project Structure:
# my-project/
# ├── .github/workflows/ci.yml
# ├── docker-compose.yml
# ├── docker-compose.prod.yml
# ├── Dockerfile
# ├── Dockerfile.prod
# ├── k8s/
# │   ├── deployment.yml
# │   ├── service.yml
# │   └── ingress.yml
# └── scripts/
#     ├── deploy.sh
#     └── backup.sh

# ─────────────────────────────────────────────────────────
# 1. Multi-Stage Dockerfile
# ─────────────────────────────────────────────────────────
cat << 'DOCKERFILE' > Dockerfile.prod
FROM node:20-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

FROM node:20-alpine AS production
WORKDIR /app
ENV NODE_ENV=production
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/package.json ./
RUN npm ci --only=production
RUN addgroup -S app && adduser -S app -G app
USER app
EXPOSE 3000
HEALTHCHECK --interval=30s CMD wget --spider http://localhost:3000/health || exit 1
CMD ["node", "dist/server.js"]
DOCKERFILE

# ─────────────────────────────────────────────────────────
# 2. Docker Compose Production
# ─────────────────────────────────────────────────────────
cat << 'COMPOSE' > docker-compose.prod.yml
version: "3.8"
services:
  app:
    build:
      context: .
      dockerfile: Dockerfile.prod
    environment:
      - DATABASE_URL=postgres://user:pass@db:5432/mydb
    depends_on:
      db:
        condition: service_healthy
    deploy:
      replicas: 3
      resources:
        limits:
          memory: 512M
          cpus: '0.5'
    healthcheck:
      test: ["CMD", "wget", "--spider", "http://localhost:3000/health"]
      interval: 30s
      timeout: 10s
      retries: 3

  db:
    image: postgres:16-alpine
    environment:
      POSTGRES_DB: mydb
      POSTGRES_USER: user
      POSTGRES_PASSWORD: pass
    volumes:
      - pgdata:/var/lib/postgresql/data
    healthcheck:
      test: ["CMD-SHELL", "pg_isready -U user"]
      interval: 10s
      timeout: 5s
      retries: 5

  nginx:
    image: nginx:alpine
    ports:
      - "80:80"
      - "443:443"
    volumes:
      - ./nginx.conf:/etc/nginx/nginx.conf
    depends_on:
      - app

volumes:
  pgdata:
COMPOSE

# ─────────────────────────────────────────────────────────
# 3. Deploy Script
# ─────────────────────────────────────────────────────────
cat << 'SCRIPT' > scripts/deploy.sh
#!/bin/bash
set -e

echo "Building image..."
docker build -f Dockerfile.prod -t myapp:latest .

echo "Running tests..."
docker run --rm myapp:latest npm test

echo "Pushing to registry..."
docker tag myapp:latest registry.example.com/myapp:latest
docker push registry.example.com/myapp:latest

echo "Deploying..."
docker compose -f docker-compose.prod.yml up -d

echo "Verifying..."
docker compose -f docker-compose.prod.yml ps
echo "Deployment complete!"
SCRIPT

# Capstone Checklist:
# ✅ Multi-stage Dockerfile
# ✅ Non-root user
# ✅ Health checks
# ✅ Resource limits
# ✅ Persistent volumes
# ✅ CI/CD pipeline
# ✅ Image scanning
# ✅ Production compose
# ✅ Monitoring
# ✅ Backup strategy
```

---

## Key Concepts

### Capstone
Full production pipeline combining all Docker concepts.

### Pipeline
Build → Test → Scan → Push → Deploy → Monitor.

### Security
Non-root users, read-only filesystems, image scanning.

### Production
Replicas, resource limits, health checks.

### CI/CD
Automated pipelines with GitHub Actions.

### Monitoring
Health checks, logs, and metrics.

---

## Experiments

- Create full pipeline for your application
- Experiment with blue-green deployment
- Try canary deployment strategy
- Create monitoring with Prometheus + Grafana
- Experiment with disaster recovery

---

## Challenge

Build a full production pipeline: Dockerfile → CI/CD → Docker Compose → Monitoring → Backup. Domain: E-Commerce or Blog.

---

## Summary

Week 12 of 12: **Capstone: Production Pipeline** (Level: Advanced). Complete! 🎉 You've mastered Docker from scratch to production-ready.
