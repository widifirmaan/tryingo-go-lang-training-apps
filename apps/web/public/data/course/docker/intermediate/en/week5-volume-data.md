# Volumes & Data Persistence

> **Kategori:** Docker | **Level:** Intermediate | **Minggu 5:** Volumes & Data Persistence

## Learning Objectives

- Volume types: named volumes, bind mounts, tmpfs
- Named volumes: Docker-managed, portable
- Bind mounts: host paths, for development
- Backup and restore volumes
- Volume drivers for storage backends

---

## Program: Persistent Storage

```bash
# ─────────────────────────────────────────────────────────
# DOCKER VOLUMES — Data Persistence
# ─────────────────────────────────────────────────────────

# Volume types:
# 1. Named Volume — dikelola Docker
# 2. Bind Mount — path di host
# 3. tmpfs Mount — in-memory (Linux)

# Named Volume
docker volume create my-data
docker volume ls
docker volume inspect my-data
docker volume rm my-data
docker volume prune       # Remove unused volumes

# Run dengan named volume
docker run -d \
  --name postgres-db \
  -v pgdata:/var/lib/postgresql/data \
  -e POSTGRES_PASSWORD=secret \
  postgres:16

# Bind Mount
docker run -d \
  --name dev-app \
  -v $(pwd):/app \
  -v /app/node_modules \
  node:20-alpine

# Bind mount dengan read-only
docker run -v $(pwd)/config:/etc/config:ro nginx

# Volume di docker-compose
# volumes:
#   pgdata:
#   redis-data:

# Backup volume
docker run --rm \
  -v pgdata:/data \
  -v $(pwd):/backup \
  alpine tar czf /backup/backup.tar.gz -C /data .

# Restore volume
docker run --rm \
  -v pgdata:/data \
  -v $(pwd):/backup \
  alpine tar xzf /backup/backup.tar.gz -C /data

# Volume drivers (plugin)
# docker volume create --driver vieux/sshfs \
#   -o sshcmd=user@host:/path \
#   -o password=secret \
#   sshvolume

# Inspect volume mount
docker inspect -f '{{ .Mounts }}' postgres-db

# Data-only container (legacy)
# docker create -v /data --name data-store alpine
# docker run --volumes-from data-store app
```

---

## Key Concepts

### Volume Types
Named volumes, bind mounts, and tmpfs for different use cases.

### Named Volumes
Docker-managed, portable across containers.

### Bind Mounts
Host paths for development workflows.

### Backup
Use temporary containers to archive volume data.

### Volume Drivers
Plugins for various storage backends.

---

## Experiments

- Create named volume and mount to container
- Experiment with bind mounts for development
- Backup and restore database volume
- Try volumes in docker-compose
- Experiment with read-only mounts

---

## Challenge

Set up PostgreSQL with persistent volume: create volume, run container, verify data persists after restart.

---

## Summary

Week 5 of 12: **Volumes & Data Persistence** (Level: Intermediate). Persistent data. Next week: **Networking**.
