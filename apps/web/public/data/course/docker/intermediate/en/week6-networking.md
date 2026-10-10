# Networking

> **Kategori:** Docker | **Level:** Intermediate | **Minggu 6:** Networking

## Learning Objectives

- Network types: bridge, host, none, overlay, macvlan
- Custom networks: create, connect, disconnect
- DNS resolution between containers
- Port publishing: -p host:container
- Network aliases and multi-network

---

## Program: Multi-Container Networks

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

## Key Concepts

### Network Types
Bridge, host, none, overlay, and macvlan for different scenarios.

### Custom Networks
Containers on the same network communicate via DNS names.

### Port Publishing
Map host ports to container ports.

### DNS
Docker provides automatic DNS resolution between containers.

### Aliases
Additional DNS names for containers.

---

## Experiments

- Create custom network and connect 2 containers
- Test DNS resolution between containers
- Experiment with port publishing
- Try host network mode
- Create multi-network setup

---

## Challenge

Set up multi-container app: web + api + database on the same network. Test communication.

---

## Summary

Week 6 of 12: **Networking** (Level: Intermediate). Inter-container communication. Next week: **Docker Compose**.
