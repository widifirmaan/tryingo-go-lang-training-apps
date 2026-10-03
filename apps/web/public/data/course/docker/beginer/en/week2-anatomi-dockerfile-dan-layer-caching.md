# Dockerfile Anatomy & Layer Caching Strategies

> **Kategori:** Docker | **Level:** Containerization Foundations & Image Optimization | **Minggu 2:** Dockerfile Anatomy & Layer Caching Strategies
> ⏱️ **Estimated Time:** 45 Minutes (15m theory, 30m practice) | 🔗 **Pace:** Structured (Step-by-step)


## Learning Objectives

- Understand Immutable Image Layers and the Copy-On-Write (CoW) storage driver mechanism
- Prevent premature cache invalidation by segregating dependency manifests from source code
- Differentiate Shell Form vs Exec Form semantics across CMD and ENTRYPOINT instructions
- Enforce comprehensive `.dockerignore` rules eliminating `.git`, secrets, and local node_modules

---

## Program: Production Dockerfile Structured to Maximize Build Cache Hit Rates

```dockerfile
# Production-Ready Dockerfile demonstrating Layer Caching Strategy
# Base Image: Use explicit, immutable semantic version tags (NEVER use 'latest' in production!)
FROM node:22-alpine

# Set non-interactive environment variables
ENV NODE_ENV=production \
    PORT=3000

# Set explicit working directory inside the container
WORKDIR /app

# CACHE OPTIMIZATION STEP 1: Copy ONLY package dependency manifests first!
# Dependency manifests rarely change, allowing Docker to cache the expensive 'npm ci' layer!
COPY package.json package-lock.json ./

# Run installation of strictly production dependencies
# 'npm ci' guarantees reproducible installs based on package-lock.json
RUN npm ci --only=production && \
    npm cache clean --force

# CACHE OPTIMIZATION STEP 2: Copy application source code LAST!
# Application code changes frequently. Placing it after 'npm ci' ensures that code edits
# do NOT invalidate the cached node_modules layer!
COPY src/ ./src/
COPY tsconfig.json ./

# Security best practice: Create unprivileged system user instead of running as root (UID 0)
RUN addgroup -S appgroup && adduser -S appuser -G appgroup && \
    chown -R appuser:appgroup /app

# Switch to unprivileged user
USER appuser

# Document exposed runtime port (informational metadata)
EXPOSE 3000

# Exec Form of ENTRYPOINT and CMD (Ensures process runs as PID 1 to receive UNIX SIGTERM signals)
CMD ["node", "src/server.js"]
```

---

## Key Concepts

### How Docker Images are Built: Layer Caching Mechanics
Every command in a Dockerfile (`FROM`, `RUN`, `COPY`) generates an immutable, read-only **Image Layer**.
During `docker build`, the BuildKit engine computes cryptographic checksums over instructions and modified files:
- If instructions and file hashes match existing cache trees, the engine marks the step as *CACHED*, executing in zero seconds.
- The microsecond an instruction invalidates (e.g. source code changed in a `COPY`), **every subsequent downstream layer is invalidated**, forcing a clean rebuild from scratch.

### The Golden Rule of Dockerfile Ordering
Never execute `COPY . .` prior to `RUN npm install`!
Doing so ensures that modifying a single line of application code invalidates the entire cache, forcing Docker to download gigabytes of `node_modules` on every commit. Isolate `package.json` manifests first, execute `npm ci`, and copy mutable source code as the penultimate layer.

### Shell Form vs Exec Form Dynamics
- **Shell Form** (`CMD node server.js`): Wraps execution inside `/bin/sh -c`. The shell becomes PID 1, relegating your application to a child process. Consequently, kernel `SIGTERM` shutdown signals are swallowed by the shell, forcing Docker to time out for 10 seconds before issuing an ungraceful `SIGKILL`.
- **Exec Form** (`CMD ["node", "server.js"]`): The JSON array syntax is mandatory. Your application executes directly as genuine PID 1, intercepting `SIGTERM` signals for instant graceful teardowns.

---

---

## Beginner Friendly Explanation

Think of building a Docker Image like baking a multi-tiered layer cake. The bottom foundation is the plate (Alpine OS), the middle layer is the baked sponge cake (dependencies from npm install), and the topmost topping is chocolate sprinkles (your application source code).

If you decide to change the color of the sprinkles (editing code), you simply scrape off the top topping and re-sprinkle, without having to discard and re-bake the entire cake foundation from scratch!

## Experiments

- Build the Dockerfile, edit a comment inside src/server.js, rebuild, and observe that npm ci evaluates as CACHED
- Author a .dockerignore excluding node_modules and .git, noting the drastic reduction in transferred build context
- Switch CMD to shell form (CMD node src/server.js), execute docker stop, and observe the 10-second SIGKILL timeout delay
- Inspect the byte footprint of individual image layers using docker history <image-id>

---

## Challenge

Craft a zero-trust `.dockerignore` ignoring everything by default (`*`), explicitly allowing strictly whitelist patterns (`!src`, `!package*.json`, `!tsconfig.json`) needed for the build.

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

You have mastered Dockerfile anatomy, build cache optimization, Exec Form syntax for graceful shutdowns, and build context sanitation via .dockerignore.
