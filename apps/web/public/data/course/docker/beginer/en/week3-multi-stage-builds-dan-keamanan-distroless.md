# Multi-Stage Builds & Minimalist Distroless Images

> **Kategori:** Docker | **Level:** Containerization Foundations & Image Optimization | **Minggu 3:** Multi-Stage Builds & Minimalist Distroless Images

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

## Summary

You have mastered Multi-Stage Builds, shrinking images from gigabytes to tens of megabytes, neutralizing attack surfaces with Distroless, and enforcing nonroot execution.
