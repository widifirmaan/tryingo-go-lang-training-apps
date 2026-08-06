# Docker Compose

> **Kategori:** Docker | **Level:** Menengah | **Minggu 7:** Docker Compose

## Tujuan Pembelajaran

- docker-compose.yml: services, volumes, networks
- depends_on dengan health check condition
- Environment variables dan build context
- Compose commands: up, down, logs, exec, scale
- Profiles untuk environment berbeda

---

## Program: Multi-Container App

```bash
# ─────────────────────────────────────────────────────────
# DOCKER COMPOSE — Multi-Container Orchestration
# ─────────────────────────────────────────────────────────

# File: docker-compose.yml
cat << 'EOF' > docker-compose.yml
version: "3.8"

services:
  web:
    build: ./web
    ports:
      - "80:80"
    depends_on:
      - api
    networks:
      - frontend

  api:
    build: ./api
    ports:
      - "3000:3000"
    environment:
      - DATABASE_URL=postgres://user:pass@db:5432/mydb
      - REDIS_URL=redis://redis:6379
    depends_on:
      db:
        condition: service_healthy
      redis:
        condition: service_started
    networks:
      - frontend
      - backend

  db:
    image: postgres:16
    environment:
      POSTGRES_DB: mydb
      POSTGRES_USER: user
      POSTGRES_PASSWORD: pass
    volumes:
      - pgdata:/var/lib/postgresql/data
    healthcheck:
      test: ["CMD-SHELL", "pg_isready -U user -d mydb"]
      interval: 10s
      timeout: 5s
      retries: 5
    networks:
      - backend

  redis:
    image: redis:7-alpine
    volumes:
      - redis-data:/data
    networks:
      - backend

volumes:
  pgdata:
  redis-data:

networks:
  frontend:
  backend:
EOF

# Compose Commands
docker-compose up -d              # Start semua services
docker-compose up -d --build      # Build dan start
docker-compose down               # Stop dan remove
docker-compose down -v            # Stop + remove volumes
docker-compose logs -f            # Follow logs
docker-compose logs -f api        # Logs satu service
docker-compose ps                 # List services
docker-compose exec api bash      # Exec di service
docker-compose restart api        # Restart service
docker-compose scale api=3        # Scale service (v2)
docker-compose up -d --scale api=3 # Scale (v3)

# Compose profiles
# docker-compose --profile debug up
```

---

## Konsep Kunci

### Docker Compose
Tool untuk define dan run multi-container applications.

### Services
Setiap service = satu container. Bisa build dari Dockerfile atau pakai image.

### depends_on
`condition: service_healthy` — tunggu health check passed.

### Volumes & Networks
Define di top-level. Shared antar services.

### Commands
- `up -d`: start di background
- `down`: stop dan remove
- `logs -f`: follow logs
- `exec`: jalankan command di container

### Scale
`--scale api=3` — jalankan 3 instance api.

---

## Eksperimen

- Buat compose file dengan 3+ services
- Eksperimen dengan depends_on condition
- Coba scale service
- Buat compose dengan profiles
- Eksperimen dengan env_file

---

## Tantangan

Buat full-stack app dengan compose: frontend, backend, database, cache. Health checks, volumes, networks.

---

## Ringkasan

Minggu 7 dari 12: **Docker Compose** (Level: Menengah). Orchestration sederhana. Minggu depan: **Multi-Stage Build**.
