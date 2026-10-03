# Docker Engine Architecture, Linux Primitives & Core CLI

> **Kategori:** Docker | **Level:** Containerization Foundations & Image Optimization | **Minggu 1:** Docker Engine Architecture, Linux Primitives & Core CLI
> ⏱️ **Estimated Time:** 45 Minutes (15m theory, 30m practice) | 🔗 **Pace:** Structured (Step-by-step)


## Learning Objectives

- Understand architectural distinctions between Virtual Machines (Hypervisors) vs Docker Containers (Shared Kernel)
- Master underlying Linux Kernel primitives: Namespaces (Isolation) and Control Groups / cgroups (Resource Constraints)
- Operate daily production CLI workflows: run, ps, exec, logs, stop, rm, and system prune
- Configure CPU/memory hardware resource limits and network port mappings (Host-to-Container)

---

## Program: Container Lifecycle Management, Port Mapping, and Resource Inspection

```bash
# 1. Run an isolated, background container with explicit port mapping and memory limits
docker run -d \
  --name web_gateway \
  -p 8080:80 \
  --memory="256m" \
  --cpus="1.0" \
  --restart unless-stopped \
  nginx:alpine

# 2. Inspect active containers and resource utilization in real time
docker ps --format "table {{.ID}}\t{{.Names}}\t{{.Status}}\t{{.Ports}}"
docker stats --no-stream web_gateway

# 3. Execute interactive debugging shell inside the running container (exec)
docker exec -it web_gateway sh -c "echo 'Container is healthy' && nginx -v"

# 4. Stream real-time container log stdout/stderr
docker logs --tail 50 -f web_gateway

# 5. Inspect low-level JSON metadata, Linux namespaces, and networking configuration
docker inspect --format '{{range .NetworkSettings.Networks}}{{.IPAddress}}{{end}}' web_gateway

# 6. Graceful container shutdown and cleanup lifecycle
docker stop -t 10 web_gateway
docker rm web_gateway

# Prune dangling layers and unused images to reclaim disk space
docker system df
docker system prune -f
```

---

## Key Concepts

### Virtual Machines vs Docker Containers
- **Virtual Machines (VM)**: Every VM bundles a redundant Guest Operating System (multiple gigabytes), standalone kernel, and virtualized hardware abstractions managed by a Hypervisor. Cold boots incur multi-minute startup delays and consume severe RAM overhead.
- **Docker Containers**: Containers execute directly on the **shared Host Linux Kernel**. A container is essentially an isolated Linux process sandbox. Booting is instantaneous (milliseconds), with footprints measured in tens of megabytes.

### Underlying Linux Primitives: Namespaces and cgroups
Docker is powered by two foundational Linux kernel mechanisms:
1. **Linux Namespaces**: Erects strict isolation barriers creating the illusion of dedicated system resources:
   - `PID Namespace`: Isolates process trees, making the container entry point PID 1.
   - `NET Namespace`: Provisions private virtual network stacks, route tables, and IP interfaces.
   - `MNT Namespace`: Isolates file system mount points.
2. **Control Groups (cgroups)**: Regulates physical hardware resource consumption ceilings. Flags like `--memory="256m" --cpus="1.0"` instruct the kernel scheduler to hard-throttle processes exceeding memory allocations, preventing single rogue containers from exhausting server nodes.

### containerd and OCI Runtimes (runc)
The contemporary Docker Engine is strictly decoupled following OCI (*Open Container Initiative*) standards:
The Docker CLI communicates with the `dockerd` daemon, which delegates lifecycle management to `containerd`. In turn, `containerd` invokes the low-level OCI reference runtime `runc` to interface directly with the kernel to spawn containers.

---

---

## Beginner Friendly Explanation

Think of a Virtual Machine like constructing an entire detached house complete with its own private generator and plumbing system for every guest (expensive, heavy, and slow to build).

A Docker Container is like a modern apartment building: all residents share the same structural foundation and utility grid (Shared OS Kernel), but each apartment features an impenetrable locked door (Namespaces) and an electrical fuse box capping maximum wattage (cgroups)!

## Experiments

- Launch an nginx container on port 8080, access http://localhost:8080, and observe access logs stream via docker logs -f
- Enter the running container shell via docker exec -it web_gateway sh and inspect process tables with ps aux (notice PID 1)
- Run docker stats to monitor real-time RAM metrics as the container handles incoming HTTP requests
- Execute docker run specifying the --rm flag and observe automated container cleanup upon process termination

---

## Challenge

Spin up an interactive Alpine Linux container capped at 64MB RAM (`--memory="64m"`), intentionally allocating memory beyond the ceiling to observe the Linux OOM-Killer terminate the container.

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

You have mastered Docker Engine architecture, Linux kernel primitives (Namespaces & cgroups), foundational operational CLI workflows, and hardware resource boundaries.
