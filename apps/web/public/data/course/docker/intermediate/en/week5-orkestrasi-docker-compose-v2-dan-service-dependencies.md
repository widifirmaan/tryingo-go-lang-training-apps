# Docker Compose v2 & Service Dependency Management

> **Kategori:** Docker | **Level:** Multi-Container Orchestration & Production Hardening | **Minggu 5:** Docker Compose v2 & Service Dependency Management
> ⏱️ **Estimated Time:** 45 Minutes (15m theory, 30m practice) | 🔗 **Pace:** Structured (Step-by-step)


## Learning Objectives

- Master modern Docker Compose v2 specifications (using `compose.yaml` without obsolete version keys)
- Prevent cold-boot application startup crashes via `depends_on` pairing with `condition: service_healthy`
- Configure resilient container healthchecks across PostgreSQL, Redis, and HTTP endpoints
- Isolate internal persistence tiers from public routing using `internal: true` bridge networks

---

## Program: Production Multi-Container Stack: Web Gateway, API, Redis & PostgreSQL with Healthchecks

```yaml
# Modern Docker Compose v2 Specification (compose.yaml)
# Note: The obsolete 'version:' key is deprecated and omitted in Compose v2+
services:
  # 1. Reverse Proxy & Static Asset Gateway
  gateway:
    image: nginx:alpine
    container_name: web_gateway
    ports:
      - "80:80"
    volumes:
      - ./nginx.conf:/etc/nginx/nginx.conf:ro
    depends_on:
      api:
        condition: service_healthy # Wait until API healthcheck passes!
    networks:
      - edge_network

  # 2. Core Node.js API Service
  api:
    build:
      context: ./apps/api
      dockerfile: Dockerfile
    container_name: core_api
    environment:
      NODE_ENV: production
      DATABASE_URL: postgres://pguser:SecretPass2026@postgres:5432/core_db
      REDIS_URL: redis://cache:6379
    depends_on:
      postgres:
        condition: service_healthy # Guarantees DB is accepting connections before API boots!
      cache:
        condition: service_healthy
    healthcheck:
      test: ["CMD", "wget", "-qO-", "http://localhost:3000/healthz"]
      interval: 10s
      timeout: 3s
      retries: 3
      start_period: 5s
    networks:
      - edge_network
      - internal_network

  # 3. High-Throughput In-Memory Cache
  cache:
    image: redis:7-alpine
    container_name: app_cache
    command: ["redis-server", "--appendonly", "yes", "--maxmemory", "256mb"]
    healthcheck:
      test: ["CMD", "redis-cli", "ping"]
      interval: 5s
      timeout: 2s
      retries: 3
    networks:
      - internal_network

  # 4. Primary Relational Storage
  postgres:
    image: postgres:17-alpine
    container_name: app_database
    environment:
      POSTGRES_DB: core_db
      POSTGRES_USER: pguser
      POSTGRES_PASSWORD: SecretPass2026
    volumes:
      - pgdata:/var/lib/postgresql/data
    healthcheck:
      test: ["CMD-SHELL", "pg_isready -U pguser -d core_db"]
      interval: 5s
      timeout: 3s
      retries: 5
    networks:
      - internal_network

volumes:
  pgdata:
    driver: local

networks:
  edge_network:
    driver: bridge
  internal_network:
    driver: bridge
    internal: true # Forbids all outbound internet ingress/egress for maximum security!
```

---

## Key Concepts

### Why Docker Compose v2?
Manually dispatching disparate `docker run` commands littered with dozen of flags across terminal shells is error-prone and unversioned. **Docker Compose v2** (invoked as `docker compose`, superseding legacy python-based `docker-compose`) enables declarative infrastructure-as-code orchestration defined cleanly inside `compose.yaml`.

### The depends_on Trap and service_healthy
Historically, `depends_on: [postgres]` merely awaited the container transition to a *running* state. However, databases require 5-10 seconds of disk replay before accepting socket traffic on port 5432. Downstream API containers starting instantly immediately crashed with *Connection Refused* exceptions.
**The Production Solution**:
Pairing `depends_on` with `condition: service_healthy` anchored to deterministic healthchecks (`pg_isready`). Docker Compose freezes API instantiation until the database passes real SQL socket readiness probes.

### Network Segmentation via internal: true
Exposing database ports directly to host interfaces (`ports: ["5432:5432"]`) is a severe security vulnerability. Employing dual-tier networks:
- `edge_network`: Bridges public ingress from the Gateway to the API.
- `internal_network` declared with `internal: true`: Connects API to Database and Redis. The persistence tier is physically air-gapped with zero route to the public internet.

---

---

## Beginner Friendly Explanation

Think of Docker Compose like an orchestra conductor.
Without a conductor, the drummer, guitarist, and vocalist start playing at random intervals, collapsing the performance (the API boots before the database is ready).

The conductor watches the drummer (PostgreSQL) tune their kit, waiting for a definitive thumbs-up signal (`service_healthy`), before cueing the lead singer (API Server) to step up to the microphone!

## Experiments

- Spin up the complete stack with docker compose up -d and observe the orchestrated startup sequence
- Inspect health statuses via docker compose ps, confirming the STATUS column displays (healthy)
- Stop the postgres container and observe API health status degrade accordingly
- Aggregate real-time service telemetry using docker compose logs -f api

---

## Challenge

Extend `compose.yaml` with horizontal scaling: deploy the API across 3 replicas (`deploy.replicas: 3`) and configure Nginx to round-robin balance traffic across all instances.

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
- **Core Functionality:** Initial container image base declaration.
- **Parameters / Attributes:** `Image name, Version tag`.
- **System Behavior & Return:** Establishes the minimal operating system distribution and toolchain dependencies.
- **Practical Code Example:**
```javascript
FROM node:20-alpine
WORKDIR /app
```
- **Expected Execution Output:**
```text
Configures lightweight Alpine Linux runtime foundation
```

### 2. `COPY <src> <dest>`
- **Core Functionality:** Host to container filesystem transfer.
- **Parameters / Attributes:** `Local path, Container destination`.
- **System Behavior & Return:** Packages application source files, package manifests, and compiled artifacts into image layers.
- **Practical Code Example:**
```javascript
COPY package.json ./
RUN npm install
COPY . .
```
- **Expected Execution Output:**
```text
Injects application bundle into container workspace
```

### 3. `RUN <command>`
- **Core Functionality:** Build-time layer execution command.
- **Parameters / Attributes:** `Shell instruction`.
- **System Behavior & Return:** Executes dependency installation, binary compilation, and directory permission setup during build time.
- **Practical Code Example:**
```javascript
RUN npm run build
```
- **Expected Execution Output:**
```text
Generates production artifacts inside immutable image layer
```

### 4. `docker run -d -p 8080:80 app:v1`
- **Core Functionality:** Container runtime lifecycle instantiation.
- **Parameters / Attributes:** `Flags -d (detached), -p (port mapping)`.
- **System Behavior & Return:** Spawns an active container instance exposing port 80 to host port 8080.
- **Practical Code Example:**
```javascript
docker run -d -p 3000:3000 my-web-app
```
- **Expected Execution Output:**
```text
Web application live and reachable at http://localhost:3000
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

You have mastered Docker Compose v2 orchestration, boot race condition elimination via condition: service_healthy, database healthchecks, and multi-tier network isolation.
