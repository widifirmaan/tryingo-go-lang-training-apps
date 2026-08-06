# Container Management

> **Kategori:** Docker | **Level:** Beginner | **Minggu 3:** Container Management

## Learning Objectives

- Container lifecycle: create, start, stop, restart, remove
- Auto-restart policies: no, on-failure, always, unless-stopped
- Resource limits: --memory, --cpus
- Logs and stats: monitoring containers
- exec and copy: accessing running containers

---

## Program: Lifecycle & Exec

```bash
# ─────────────────────────────────────────────────────────
# CONTAINER MANAGEMENT — Lifecycle & Operations
# ─────────────────────────────────────────────────────────

# Run container dengan berbagai options
docker run -d \
  --name my-app \
  -p 3000:3000 \
  -v /data:/app/data \
  -e NODE_ENV=production \
  --restart unless-stopped \
  --memory 512m \
  --cpus 1.0 \
  node:20-alpine

# Container lifecycle
docker start my-app          # Start stopped container
docker stop my-app           # Graceful stop (SIGTERM)
docker kill my-app           # Force stop (SIGKILL)
docker restart my-app        # Restart container
docker pause my-app          # Pause (freeze)
docker unpause my-app        # Unpause

# Auto-restart policies:
# no           : tidak auto-restart
# on-failure   : restart jika exit code != 0
# always       : selalu restart
# unless-stopped: restart kecuali di-stop manual

# Lihat container
docker ps                    # Running containers
docker ps -a                 # All containers
docker ps -q                 # Only container IDs
docker ps --format "table {{.ID}}\t{{.Names}}\t{{.Status}}"

# Container stats
docker stats                 # Real-time resource usage
docker stats my-app          # Stats satu container

# Logs
docker logs my-app           # Semua logs
docker logs -f my-app        # Follow logs (tail -f)
docker logs --tail 100 my-app # 100 baris terakhir
docker logs -t my-app        # Dengan timestamp

# Execute command di container
docker exec my-app ls /app            # Single command
docker exec -it my-app bash           # Interactive shell
docker exec -u root my-app bash       # Sebagai root
docker exec -w /tmp my-app pwd        # Set working directory

# Copy file ke/dari container
docker cp local-file my-app:/app/
docker cp my-app:/app/log.txt ./

# Inspect container
docker inspect my-app
docker inspect --format='{{.State.Status}}' my-app

# Remove container
docker rm my-app             # Remove stopped container
docker rm -f my-app          # Force remove (running)
docker container prune       # Remove all stopped containers
```

---

## Key Concepts

### Lifecycle
Create → Start → Run → Stop → Remove. Containers are ephemeral.

### Restart Policies
Control when containers automatically restart.

### Resource Limits
Limit memory and CPU usage per container.

### Logs
Monitor container output with docker logs.

### Exec
Access running containers with interactive shell.

---

## Experiments

- Run containers with resource limits
- Experiment with restart policies
- Try exec in different containers
- Copy files between host and container
- Monitor container stats

---

## Challenge

Set up development environment: run Node.js container with volume mount, access shell, install dependencies.

---

## Summary

Week 3 of 12: **Container Management** (Level: Beginner). Daily container operations. Next week: **Dockerfiles**.
