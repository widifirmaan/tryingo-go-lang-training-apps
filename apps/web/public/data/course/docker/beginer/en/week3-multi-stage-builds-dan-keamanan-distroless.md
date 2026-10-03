# Multi-Stage Builds & Minimalist Distroless Images

> **Kategori:** Docker | **Level:** Containerization Foundations & Image Optimization | **Minggu 3:** Multi-Stage Builds & Minimalist Distroless Images
> ⏱️ **Estimated Time:** 45 Minutes (15m theory, 30m practice) | 🔗 **Pace:** Structured (Step-by-step)


## Learning Objectives

- Master Multi-Stage Builds decoupling build-time compiler toolchains from runtime distributions
- Drastically shrink container image sizes (from 1GB+ down to under 30MB)
- Harden security posture by stripping compilers, package managers, and shells from runtime images
- Deploy Google Distroless base images (`gcr.io/distroless/*`) running under unprivileged nonroot users

---

## Program: Shrinking Go/Node.js Images from 1.2GB to 25MB Using Multi-Stage Distroless Builds

```dockerfile
# ==============================================================================
# STAGE 1: Build & Compilation Environment (Heavyweight image with compilers)
# ==============================================================================
FROM golang:1.24-alpine AS builder

WORKDIR /build

# Install build-time dependencies (compilers, git, certificates)
RUN apk add --no-cache git ca-certificates

# Cache dependencies layer
COPY go.mod go.sum ./
RUN go mod download

# Copy application source
COPY . .

# Compile binary statically (CGO_ENABLED=0 disables C bindings, creating pure standalone binary)
# -ldflags="-w -s" strips debugging symbols to shrink binary footprint by 40%!
RUN CGO_ENABLED=0 GOOS=linux GOARCH=amd64 go build \
    -ldflags="-w -s" \
    -o /build/api-server .

# ==============================================================================
# STAGE 2: Production Distroless Runtime (Ultra-secure, minimal image)
# Contains ZERO package managers (no apk/apt), ZERO shells (no /bin/sh / /bin/bash)
# ==============================================================================
# gcr.io/distroless/static-debian12 contains strictly CA certificates and tzdata
FROM gcr.io/distroless/static-debian12:nonroot

WORKDIR /app

# Copy ONLY the compiled binary artifact from the builder stage!
# Compilers, SDKs, caches, and intermediate source code are COMPLETELY LEFT BEHIND!
COPY --from=builder /build/api-server /app/api-server

# Distroless 'nonroot' image runs by default under unprivileged UID 65532
USER nonroot:nonroot

EXPOSE 8080

ENTRYPOINT ["/app/api-server"]
```

---

## Key Concepts

### The Multi-Stage Revolution
Prior to **Multi-Stage Builds**, production images inevitably bundled complete development SDKs (Go compilers, Rust toolchains, npm, gcc, git). This caused two severe liabilities:
1. Bloated image footprints (**1GB to 2GB**), strangling CI/CD pipeline deployment speeds and saturating container registry storage.
2. An unacceptably wide **attack surface**. If an attacker achieves Remote Code Execution (RCE), they discover compilers (`gcc`) and package managers (`apk/apt`) readily available to download and compile malicious rootkits.

### Anatomy of Multi-Stage Builds
- **Stage 1 (Builder)**: Utilizes a heavy build image (`AS builder`) equipped with complete toolchains to compile assets, run linters, or produce statically linked binaries.
- **Stage 2 (Runtime)**: Declares a fresh `FROM` line. Intermediate caches, build scripts, and compilers are discarded. The runtime selectively copies strictly the production binary via `COPY --from=builder /build/binary /app/binary`.

### Extreme Security with Google Distroless
**Distroless** base images (maintained by Google) define the industry security standard. They package strictly runtime dependencies (such as root SSL `ca-certificates` and `glibc/musl`). Crucially, Distroless images contain **zero package managers and zero shells (`/bin/sh` or `/bin/bash`)**. Even if a remote exploit is achieved, attackers cannot spawn a shell or download binaries!

---

---

## Beginner Friendly Explanation

Think of constructing a Formula 1 racing car.
Stage 1 (Builder) is the industrial manufacturing plant filled with 10-ton hydraulic presses, welders, raw metal shavings, and toolkits.
Stage 2 (Runtime) is the Grand Prix racetrack.

You don't tow the 10-ton hydraulic welders and factory tools onto the racetrack; you only bring the finished, ultra-lightweight racing car onto the track!

## Experiments

- Compare image sizes using docker images: observe the variance between single-stage (1GB+) versus multi-stage distroless (<30MB)
- Attempt running docker exec -it <container> sh against a distroless container and observe the executable not found error
- Scan the images using Trivy (trivy image <name>) and observe the massive drop in detectable CVE vulnerabilities
- Verify CGO_ENABLED=0 compilation to ensure the compiled Go binary has zero dynamic C library dependencies

---

## Challenge

Architect a Multi-Stage Build for a React/Vite frontend: Stage 1 executes `npm run build` in Node.js, and Stage 2 copies the compiled `dist/` folder into `nginx:alpine`, stripping Node.js entirely.

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

You have mastered Multi-Stage Builds, shrinking images from gigabytes to tens of megabytes, neutralizing attack surfaces with Distroless, and enforcing nonroot execution.
