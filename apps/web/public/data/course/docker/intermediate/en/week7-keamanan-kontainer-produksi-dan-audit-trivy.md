# Container Hardening: Non-Root, Drop Capabilities & Trivy

> **Kategori:** Docker | **Level:** Multi-Container Orchestration & Production Hardening | **Minggu 7:** Container Hardening: Non-Root, Drop Capabilities & Trivy
> ⏱️ **Estimated Time:** 45 Minutes (15m theory, 30m practice) | 🔗 **Pace:** Structured (Step-by-step)


## Learning Objectives

- Enforce Zero-Trust security principles across production Docker container runtimes
- Lock filesystems into immutable states utilizing `--read-only` paired with restricted `--tmpfs` mounts
- Strip kernel capabilities via `--cap-drop=ALL` and enforce `--security-opt=no-new-privileges`
- Integrate automated vulnerability scanning via Trivy and Docker Scout within CI/CD pipelines

---

## Program: Comprehensive Container Hardening: Read-Only Root Filesystem and Dropping Linux Capabilities

```bash
# 1. Run ultra-hardened production container applying Zero-Trust principles
docker run -d \
  --name hardened_api \
  --read-only \
  --cap-drop=ALL \
  --cap-add=NET_BIND_SERVICE \
  --security-opt=no-new-privileges:true \
  --tmpfs /tmp:rw,noexec,nosuid,size=64m \
  --user 10001:10001 \
  -p 8080:8080 \
  my-production-api:v1

# Explanation of Security Flags:
# --read-only: Root filesystem is 100% IMMUTABLE! Attackers CANNOT download rootkits or write scripts!
# --cap-drop=ALL: Strips all Linux Kernel capabilities (chown, kill, net_admin, sys_admin)
# --cap-add=NET_BIND_SERVICE: Grants strictly the permission to bind low ports (if needed)
# --security-opt=no-new-privileges:true: Blocks processes from gaining privileges via SUID binaries
# --tmpfs /tmp: Provides temporary, RAM-only writable scratchpad with noexec flag
# --user 10001: Forces non-root unprivileged UID

# 2. Automated Vulnerability Auditing with Trivy CLI
# Scans OS packages and application dependencies (npm, pip, go) for known CVEs
trivy image --severity HIGH,CRITICAL my-production-api:v1

# 3. Docker Scout: Real-time CVE recommendations
docker scout quickview my-production-api:v1
docker scout cves --only-severity critical my-production-api:v1
```

---

## Key Concepts

### The Peril of Running as Root (UID 0)
By default, failing to declare a `USER` directive causes container entry points to execute as **root (UID 0)**. While bounded by namespaces, should an attacker uncover a *Container Breakout* exploit (e.g. kernel vulnerabilities in `runc`), they instantaneously inherit root privileges over the entire physical host node! Forcing non-root execution (`USER 10001`) confines blast radiuses.

### Immutable Read-Only Filesystems & Hardened tmpfs
Over 90% of web exploit payloads attempt downloading malicious binary droppers into `/tmp` or overwriting binaries in `/app`.
Enforcing `--read-only` renders the container filesystem strictly immutable; even `touch exploit.sh` triggers permission-denied faults. When applications require scratch space, bind an ephemeral in-memory mount: `--tmpfs /tmp:rw,noexec,nosuid,size=64m`. Crucially, `noexec` forbids executing binary instructions from the scratchpad!

### Stripping Linux Capabilities (`--cap-drop=ALL`)
Linux root privileges are decomposed into granular **Capabilities** (e.g. `CAP_SYS_ADMIN`, `CAP_NET_RAW`, `CAP_CHOWN`).
Web services have zero legitimate requirement to forge network raw packets or alter hardware clocks. Deploying `--cap-drop=ALL` strips every kernel privilege entirely, selectively whitelisting only essential capabilities (`--cap-add=NET_BIND_SERVICE`).

---

---

## Beginner Friendly Explanation

Think of a guest checking into a hotel room.
Running a container as root is like handing the guest a universal master key that unlocks every utility closet, elevator shaft, and safe in the building!

Container hardening ensures:
1. The guest receives a standard keycard unlocking strictly their room (Non-Root User).
2. Hotel furniture is bolted to the floor and painting walls is prohibited (`--read-only`).
3. Wire cutters, blowtorches, and lockpicks are confiscated at the door (`--cap-drop=ALL`), guaranteeing they cannot tamper with building infrastructure!

## Experiments

- Launch a container with --read-only and attempt touch /app/malware.sh to observe the Read-only file system rejection
- Test --cap-drop=ALL and observe that commands like chown or ping fail due to missing Linux capabilities
- Run a Trivy audit comparing node:latest against node:alpine against distroless to view CVE remediation drops
- Verify non-root process identities by executing the id command inside the running container

---

## Challenge

Incorporate `security_opt` and `cap_drop` directives inside a production `compose.yaml`: enforce `--read-only`, non-root UID 10001, and `--tmpfs /tmp` across all API services.

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

You have mastered production container hardening: unprivileged non-root execution, immutable filesystems via --read-only and noexec tmpfs, Linux capability stripping, and Trivy CVE auditing.
