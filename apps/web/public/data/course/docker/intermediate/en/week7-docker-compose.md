# Docker Compose

> **Kategori:** Docker | **Level:** Intermediate | **Minggu 7:** Docker Compose

## Learning Objectives

- docker-compose.yml: services, volumes, networks
- depends_on with health check conditions
- Environment variables and build contexts
- Compose commands: up, down, logs, exec, scale
- Profiles for different environments

---

## Program: Multi-Container Apps

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

## Key Concepts

### Docker Compose
Define and run multi-container applications.

### Services
Each service maps to one container.

### depends_on
Wait for dependencies to be healthy.

### Volumes & Networks
Shared across services.

### Commands
Start, stop, view logs, execute commands.

### Scaling
Run multiple instances of a service.

---

## Experiments

- Create compose file with 3+ services
- Experiment with depends_on conditions
- Try scaling services
- Create compose with profiles
- Experiment with env_file

---

## Challenge

Build full-stack app with compose: frontend, backend, database, cache. Health checks, volumes, networks.

---

## Summary

Week 7 of 12: **Docker Compose** (Level: Intermediate). Simple orchestration. Next week: **Multi-Stage Builds**.
