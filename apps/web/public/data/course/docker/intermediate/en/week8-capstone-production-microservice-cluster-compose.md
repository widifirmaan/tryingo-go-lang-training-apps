# Capstone Project: Production Microservice Cluster Stack

> **Kategori:** Docker | **Level:** Multi-Container Orchestration & Production Hardening | **Minggu 8:** Capstone Project: Production Microservice Cluster Stack
> ⏱️ **Estimated Time:** 45 Minutes (15m theory, 30m practice) | 🔗 **Pace:** Structured (Step-by-step)


## Learning Objectives

- Synthesize all Docker containerization disciplines into an industrial-grade microservice cluster capstone
- Physically segment network tiers: Public Ingress Edge vs Private Air-Gapped Internal Networks
- Enforce Multi-Stage Builds and Distroless images across all custom services (Node.js API and Go Worker)
- Lock down containers with strict runtime security: read_only, non-root user UIDs, no-new-privileges, and cap_drop ALL

---

## Program: Full Production Microservice Cluster: Nginx Proxy, Node.js API, Go Worker, Redis & PostgreSQL

```yaml
# CAPSTONE PROJECT: Enterprise Multi-Stage Containerized Microservice Cluster
# Demonstrates: Multi-Stage Builds, Healthcheck Dependencies, Dual Isolated Networks, Non-Root Users

services:
  # ============================================================================
  # 1. Edge Ingress: Nginx Reverse Proxy with SSL Termination & Rate Limiting
  # ============================================================================
  ingress:
    image: nginx:1.27-alpine
    container_name: cluster_ingress
    restart: unless-stopped
    ports:
      - "80:80"
      - "443:443"
    volumes:
      - ./infra/nginx/nginx.conf:/etc/nginx/nginx.conf:ro
    depends_on:
      api:
        condition: service_healthy
    networks:
      - public_edge_net

  # ============================================================================
  # 2. Core Service: Node.js / TypeScript REST API (Hardened Container)
  # ============================================================================
  api:
    build:
      context: ./services/api
      dockerfile: Dockerfile
    container_name: service_api
    restart: unless-stopped
    read_only: true
    user: "10001:10001"
    security_opt:
      - no-new-privileges:true
    cap_drop:
      - ALL
    tmpfs:
      - /tmp:rw,noexec,nosuid,size=64m
    environment:
      PORT: 3000
      DATABASE_URL: postgresql://app_user:SuperSecret2026!@postgres:5432/production_db
      REDIS_URL: redis://redis:6379
    depends_on:
      postgres:
        condition: service_healthy
      redis:
        condition: service_healthy
    healthcheck:
      test: ["CMD-SHELL", "wget -qO- http://localhost:3000/health || exit 1"]
      interval: 10s
      timeout: 3s
      retries: 3
      start_period: 10s
    networks:
      - public_edge_net
      - private_cluster_net

  # ============================================================================
  # 3. Async Worker: Go Telemetry Event Processor (Distroless Binary)
  # ============================================================================
  worker:
    build:
      context: ./services/worker
      dockerfile: Dockerfile
    container_name: service_worker
    restart: on-failure:5
    read_only: true
    user: "65532:65532"
    security_opt:
      - no-new-privileges:true
    cap_drop:
      - ALL
    environment:
      REDIS_URL: redis://redis:6379
    depends_on:
      redis:
        condition: service_healthy
    networks:
      - private_cluster_net

  # ============================================================================
  # 4. In-Memory Cache & Message Broker: Redis with Append-Only Durability
  # ============================================================================
  redis:
    image: redis:7.4-alpine
    container_name: cluster_redis
    restart: unless-stopped
    command: ["redis-server", "--appendonly", "yes", "--maxmemory", "512mb", "--maxmemory-policy", "allkeys-lru"]
    volumes:
      - redis_data:/data
    healthcheck:
      test: ["CMD", "redis-cli", "ping"]
      interval: 5s
      timeout: 2s
      retries: 3
    networks:
      - private_cluster_net

  # ============================================================================
  # 5. Primary Storage: PostgreSQL with Strict Connection Healthcheck
  # ============================================================================
  postgres:
    image: postgres:17-alpine
    container_name: cluster_postgres
    restart: unless-stopped
    environment:
      POSTGRES_DB: production_db
      POSTGRES_USER: app_user
      POSTGRES_PASSWORD: SuperSecret2026!
    volumes:
      - postgres_data:/var/lib/postgresql/data
    healthcheck:
      test: ["CMD-SHELL", "pg_isready -U app_user -d production_db"]
      interval: 5s
      timeout: 3s
      retries: 5
    networks:
      - private_cluster_net

volumes:
  postgres_data:
  redis_data:

networks:
  public_edge_net:
    driver: bridge
  private_cluster_net:
    driver: bridge
    internal: true # STRICT AIR-GAP: Zero direct route to/from public internet!
```

---

## Key Concepts

### Capstone Production Microservice Cluster Architecture
This capstone implements an enterprise-grade containerized microservice topology:
1. **Air-Gapped Network Segmentation**: Strictly the Nginx `cluster_ingress` gateway exposes ports 80/443 to the public internet (`public_edge_net`). The PostgreSQL database, Redis cluster, and Go Worker reside exclusively inside `private_cluster_net` declared with `internal: true`. Hostile external actors cannot reach the persistence layer.
2. **Zero Boot Race Conditions**: Nginx defers initialization until API health checks pass. The API waits for PostgreSQL and Redis readiness probes (`pg_isready` and `redis-cli ping`). The entire cluster initializes reliably without uncoordinated boot crashes.
3. **Maximum Runtime Hardening**: API and Worker containers execute under unprivileged non-root UIDs, enforce immutable *read-only* root filesystems with restricted *tmpfs* scratchpads, strip all kernel capabilities (`cap_drop: ALL`), and block privilege escalation (`no-new-privileges: true`).

---

---

## Beginner Friendly Explanation

Congratulations! You have constructed an enterprise-grade technology fortress meeting banking security standards.

The palace gatehouse (Nginx Ingress) greets public visitors cleanly. Inside, the chefs and couriers (API and Go Worker) coordinate seamlessly without collision thanks to orchestrated timing (Healthchecks). And most impressively: your gold vault (PostgreSQL and Redis) is concealed in an underground air-gapped cellar with zero egress to the outside world, guarded by unassailable security!

## Experiments

- Launch the complete stack via docker compose up -d and verify with docker compose ps that all services achieve healthy states
- Attempt connecting to postgres directly from your local host machine to confirm port isolation
- Execute a shell inside the API container and attempt creating a file at the root filesystem to verify read-only enforcement
- Run docker compose down -v to cleanly teardown the entire cluster and volume allocations when finished

---

## Challenge

Integrate a `monitoring` observability service using Prometheus and Grafana into `compose.yaml`: visualize real-time CPU and RAM utilization metrics across all cluster containers.

---

## Syntax Cheatsheet & Quick Reference

| Syntax / Keyword | Purpose & Practical Pattern |
| :--- | :--- |
| **Declaration & Setup** | Initialize data structures, type constraints, and dependencies |
| **Core Processing** | Algorithm execution, control flow, and data transformation |
| **Defensive Validation** | Verify data invariants and handle errors explicitly |
| **Return / Output** | Deliver deterministic output ready for consumption |

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

Congratulations! You have mastered the comprehensive Docker curriculum: engine architecture & Linux primitives, Dockerfile & layer cache optimization, lightweight Multi-Stage Builds, storage volumes & bridge networks, Docker Compose v2 orchestration, resilient healthchecks, non-root & capability hardening, and a Production Microservice Cluster Capstone.
