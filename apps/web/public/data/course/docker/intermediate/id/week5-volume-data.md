# Volume & Data Persistence

> **Kategori:** Docker | **Level:** Menengah | **Minggu 5:** Volume & Data Persistence

## Tujuan Pembelajaran

- Volume types: named volume, bind mount, tmpfs
- Named volume: dikelola Docker, portable
- Bind mount: path di host, untuk development
- Backup dan restore volume
- Volume drivers untuk storage backend

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

## Konsep Kunci

### Volume Types
- Named Volume: dikelola Docker, path di /var/lib/docker/volumes
- Bind Mount: path spesifik di host
- tmpfs: in-memory, hilang saat container stop

### Named Volume
Portable, bisa share antar container. Docker handle lifecycle.


### Bind Mount
Development: mount source code ke container. Perubahan langsung terlihat.

### Backup
Gunakan container sederhana untuk tar/zip volume data.

### Volume Drivers
Plugin untuk NFS, SSH, cloud storage, dll.

---

## Eksperimen

- Buat named volume dan mount ke container
- Eksperimen dengan bind mount untuk development
- Backup dan restore volume database
- Coba volume di docker-compose
- Eksperimen dengan read-only mount

---

## Tantangan

Setup PostgreSQL dengan persistent volume: create volume, run container, verify data persists setelah restart.

---

## Ringkasan

Minggu 5 dari 12: **Volume & Data Persistence** (Level: Menengah). Data yang bertahan. Minggu depan: **Networking**.
