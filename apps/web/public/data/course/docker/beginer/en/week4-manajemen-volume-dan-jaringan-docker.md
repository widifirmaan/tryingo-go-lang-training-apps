# Volume Persistence, Storage Drivers & Bridge Networks

> **Kategori:** Docker | **Level:** Containerization Foundations & Image Optimization | **Minggu 4:** Volume Persistence, Storage Drivers & Bridge Networks
> ⏱️ **Estimated Time:** 45 Minutes (15m theory, 30m practice) | 🔗 **Pace:** Structured (Step-by-step)


## Learning Objectives

- Understand the Ephemeral lifecycle of container filesystems and the necessity of persistent storage
- Differentiate storage mounts: Named Volumes (Docker-managed) vs Bind Mounts (Host directory bindings)
- Compare Default Bridge vs User-Defined Bridge networks (automated container DNS service discovery)
- Isolate inter-container communications on private networks without exposing database ports to the host interface

---

## Program: PostgreSQL Persistence with Named Volumes and Custom Bridge Network Routing

```bash
# 1. Create dedicated user-defined Bridge Network
# User-defined bridges provide automatic DNS resolution between containers by container name!
docker network create --driver bridge app_isolated_net

# 2. Create durable Named Volume for database storage persistence
# Bypasses the slow Copy-On-Write storage driver, writing at raw host disk speed!
docker volume create pgdata_production

# 3. Launch PostgreSQL container attached to network and volume
docker run -d \
  --name db_postgres \
  --network app_isolated_net \
  -e POSTGRES_DB=commerce_db \
  -e POSTGRES_USER=admin \
  -e POSTGRES_PASSWORD=SuperSecretPass2026! \
  -v pgdata_production:/var/lib/postgresql/data \
  postgres:17-alpine

# 4. Launch backend application attached to the SAME network
# Notice the database host in URL uses the container name 'db_postgres' resolved via Docker DNS!
docker run -d \
  --name api_server \
  --network app_isolated_net \
  -p 4000:4000 \
  -e DATABASE_URL="postgresql://admin:SuperSecretPass2026!@db_postgres:5432/commerce_db" \
  node:22-alpine sleep 3600

# 5. Verify Inter-Container DNS resolution and connectivity
docker exec -it api_server ping -c 2 db_postgres

# 6. Test Data Persistence across container destruction
docker stop db_postgres && docker rm db_postgres
# Notice: Container is DELETED, but physical volume remains completely intact!
docker volume ls

# Launch a NEW container pointing to the existing volume: All historical data is preserved!
docker run -d \
  --name db_postgres_v2 \
  --network app_isolated_net \
  -v pgdata_production:/var/lib/postgresql/data \
  postgres:17-alpine
```

---

## Key Concepts

### Ephemeral Lifecycles vs State Durability
By default, the writable layer of any container is strictly **ephemeral**. When records are inserted into a database running in a bare container, state is written to the container's top-level copy-on-write storage driver. Executing `docker rm` irreversibly **destroys all underlying data**.

### Storage Mount Architectures: Named Volumes vs Bind Mounts
1. **Named Volumes** (`-v volume_name:/path`): Formally managed by Docker within the host storage engine (`/var/lib/docker/volumes/`). Volumes bypass Copy-On-Write drivers, writing directly to disk blocks at bare-metal I/O throughput. Non-negotiable for databases (PostgreSQL, MySQL, Redis).
2. **Bind Mounts** (`-v /local/host/dir:/container/path`): Mounts host directory trees directly into the container filesystem. Indispensable for live source-code hot-reloading during local development, but dangerous in production due to host filesystem path coupling.

### Automated Service Discovery on User-Defined Bridges
The unconfigured `default bridge` network lacks embedded DNS service discovery.
Conversely, on **User-Defined Bridge Networks** (`docker network create`), Docker embeds an internal 127.0.0.11 DNS resolver. Applications reach peer containers using their literal container identifier as a hostname (e.g. `db_postgres:5432`), rendering volatile dynamic IP addressing irrelevant.

---

---

## Beginner Friendly Explanation

Think of a container like a hotel room rented for a night. If you leave your luggage in the closet and check out, the cleaning staff discards everything (Ephemeral).

A Named Volume is like a permanent bank safety deposit box: you can move across different hotel rooms over time, but your vault contents remain safe and untouched.
A User-Defined Network is like an internal intercom phone connecting hotel suites: you simply dial 'Front Desk' or 'Kitchen' (Container DNS Name) without needing to look up their personal mobile phone numbers!

## Experiments

- Seed tables in PostgreSQL, delete the container, spin up a new container on the same volume, and verify data survives
- Inspect physical host storage coordinates using docker volume inspect pgdata_production
- Attempt pinging peer containers on the default bridge and verify that DNS resolution fails
- Run docker network inspect app_isolated_net to view the list of dynamically assigned container IP addresses

---

## Challenge

Architect dual-network isolation: provision `frontend_net` and `backend_net`. Place Web on both networks, while restricting Database strictly to `backend_net` achieving zero internet ingress.

---

## Visual Mental Model & Architecture Flow

![Diagram Layer Arsitektur Docker Image & Container](/diagrams/docker-layers.svg)

```diagram
┌────────────────────────────────────────────────────────┐
│ [Layer 4 - Writeable] Container R/W Layer (Ephemeral)  │
├────────────────────────────────────────────────────────┤
│ [Layer 3 - Read Only] CMD ["npm", "start"]             │
├────────────────────────────────────────────────────────┤
│ [Layer 2 - Read Only] COPY . /app & RUN npm install    │
├────────────────────────────────────────────────────────┤
│ [Layer 1 - Read Only] FROM node:20-alpine (Base Image) │
└────────────────────────────────────────────────────────┘
```

---

## Syntax Reference & Practical Guide (W3Schools Style)

Here is the comprehensive breakdown of syntax signatures, parameters, return behavior, and isolated runnable examples introduced in this module:

### 1. `FROM <image>:<tag>`
- **Core Functionality:** Menentukan base image fondasi container.
- **Parameters / Attributes:** `Image identifier, Tag versi`.
- **System Behavior & Return:** Menetapkan sistem operasi minimalis dan runtime awal (misal `node:20-alpine`, `golang:1.24`)..
- **Practical Code Example:**
```dockerfile
FROM node:20-alpine
WORKDIR /app
```
- **Expected Execution Output:**
```output
Lingkungan container Node.js di atas Alpine siap
```

### 2. `COPY <host_src> <container_dest>`
- **Core Functionality:** Menyalin file host ke dalam image filesystem.
- **Parameters / Attributes:** `Path lokal, Path tujuan container`.
- **System Behavior & Return:** Includes kode sumber, file konfigurasi, dan aset ke direktori kerja container..
- **Practical Code Example:**
```dockerfile
COPY package*.json ./
RUN npm install --production
COPY . .
```
- **Expected Execution Output:**
```output
Kode aplikasi tersalin ke dalam container
```

### 3. `RUN <command>`
- **Core Functionality:** Mengeksekusi instruksi build layer.
- **Parameters / Attributes:** `Shell instruction`.
- **System Behavior & Return:** Menginstal dependencies, mengkompilasi binary, dan mengatur izin sistem saat build dijalankan..
- **Practical Code Example:**
```dockerfile
RUN npm run build
```
- **Expected Execution Output:**
```output
Menghasilkan bundle produksi di dalam layer image
```

### 4. `docker run -d -p 8080:80 --name my-app app:v1`
- **Core Functionality:** Menjalankan instance container aktif.
- **Parameters / Attributes:** `Flag -d (detached), -p (port mapping), --name`.
- **System Behavior & Return:** Membuat dan menyalakan container yang memetakan port host 8080 ke port container 80..
- **Practical Code Example:**
```bash
docker run -d -p 3000:3000 --name web-service my-app:latest
```
- **Expected Execution Output:**
```output
Container berjalan di latar belakang dan dapat diakses
```

---

## Common Pitfalls & Debugging Tips

### 1. Running Containers as Root
- **Symptom / Issue:** Enables container breakout attacks to compromise host operating system privileges.
- **Root Cause:** Common mistaken assumptions during early development.
- **Fix / Best Practice:** Declare dedicated non-root users inside Dockerfile: `USER node` or `USER 1001`.

### 2. Omitting `.dockerignore` Files
- **Symptom / Issue:** Unintentionally copies gigabytes of local build caches and sensitive `.env` files into image.
- **Root Cause:** Common mistaken assumptions during early development.
- **Fix / Best Practice:** Always maintain `.dockerignore` ignoring `node_modules`, `.git`, and environment files.

### 3. Bloated Images Without Multi-Stage Builds
- **Symptom / Issue:** Massive image sizes slow down container registry pulls and cloud deployments.
- **Root Cause:** Common mistaken assumptions during early development.
- **Fix / Best Practice:** Adopt Multi-Stage Builds separating compile tooling from lightweight runtime images.

---

## Summary

You have mastered container persistence via Named Volumes, local development bind mounts, and isolated User-Defined Bridge networks featuring automatic DNS service discovery.
