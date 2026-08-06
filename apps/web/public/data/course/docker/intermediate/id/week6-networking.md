# Networking

> **Kategori:** Docker | **Level:** Menengah | **Minggu 6:** Networking

## Tujuan Pembelajaran

- Network types: bridge, host, none, overlay, macvlan
- Custom network: create, connect, disconnect
- DNS resolution antar container
- Port publishing: -p host:container
- Network aliases dan multi-network

---

## Program: Multi-Container Network

```bash
# ─────────────────────────────────────────────────────────
# DOCKER NETWORKING
# ─────────────────────────────────────────────────────────

# Network types:
# 1. Bridge — default, internal network
# 2. Host — share host network stack
# 3. None — no network
# 4. Overlay — multi-host (Swarm)
# 5. Macvlan — assign MAC address

# Lihat networks
docker network ls
docker network inspect bridge

# Create custom network
docker network create my-network
docker network create --driver bridge --subnet 172.20.0.0/16 my-net

# Run container di network tertentu
docker run -d --name web --network my-network nginx
docker run -d --name api --network my-network node:20-alpine

# Container bisa pakai nama sebagai hostname
# curl http://api:3000 dari container web

# Connect/disconnect network
docker network connect my-network my-container
docker network disconnect my-network my-container

# Port publishing
docker run -p 8080:80 nginx           # host:container
docker run -p 127.0.0.1:8080:80 nginx # bind ke localhost saja
docker run -P nginx                   # publish semua exposed ports

# DNS resolution
# Container di network yang sama bisa resolve nama container

# Network aliases
docker run --network my-network --network-alias backend nginx

# Inspect network
docker network inspect my-network

# Remove network
docker network rm my-network
docker network prune

# Host network (Linux only)
docker run --network host nginx

# None network
docker run --network none alpine

# Multi-network container
docker run -d --name app \
  --network frontend \
  --network backend \
  my-app
```

---

## Konsep Kunci

### Network Types
- Bridge: default, internal network antar container
- Host: share host network (Linux only)
- None: isolated, no network
- Overlay: multi-host networking (Swarm)

### Custom Network
Container di network yang sama bisa communicate via container name (DNS).

### Port Publishing
`-p 8080:80` — port 8080 di host forward ke port 80 di container.

### DNS
Docker embedded DNS server. Container resolve nama container lain di network yang sama.

### Aliases
`--network-alias` — nama tambahan untuk resolve.

---

## Eksperimen

- Buat custom network dan connect 2 container
- Test DNS resolution antar container
- Eksperimen dengan port publishing
- Coba host network mode
- Buat multi-network setup

---

## Tantangan

Setup multi-container app: web + api + database di network yang sama. Test communication.

---

## Ringkasan

Minggu 6 dari 12: **Networking** (Level: Menengah). Komunikasi antar container. Minggu depan: **Docker Compose**.
