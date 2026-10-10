# Security

> **Kategori:** Docker | **Level:** Advanced | **Minggu 9:** Security

## Learning Objectives

- Non-root users in containers
- Read-only filesystems and capability dropping
- Image scanning: Trivy, Docker Scout, Snyk
- Content trust and security profiles
- Resource limits and security options

---

## Program: Secure Containers

```bash
# ─────────────────────────────────────────────────────────
# DOCKER SECURITY — Best Practices
# ─────────────────────────────────────────────────────────

# 1. Non-root user
# Dockerfile:
# RUN addgroup -S appgroup && adduser -S appuser -G appgroup
# USER appuser

# 2. Read-only filesystem
docker run --read-only --tmpfs /tmp myapp

# 3. Drop capabilities
docker run --cap-drop=ALL --cap-add=NET_BIND_SERVICE myapp

# 4. No new privileges
docker run --security-opt=no-new-privileges myapp

# 5. Resource limits
docker run --memory 512m --cpus 1.0 --pids-limit 100 myapp

# 6. Image scanning
docker scout cves myapp:latest
trivy image myapp:latest
snyk docker test myapp:latest

# 7. Content trust
export DOCKER_CONTENT_TRUST=1
docker push myapp:latest

# 8. Seccomp profile
docker run --security-opt seccomp=profile.json myapp

# 9. AppArmor profile
docker run --security-opt apparmor=my-profile myapp

# 10. Health check
# HEALTHCHECK --interval=30s CMD curl -f http://localhost/ || exit 1

# Dockerfile Security Best Practices:
# FROM specific:version          # Pin version
# RUN apt update && apt install  # Gabung commands
# USER nonroot                   # Non-root user
# COPY --chown=user:group        # Set ownership
# HEALTHCHECK                    # Health check
# Multi-stage build              # Minimal image

# docker-compose security:
# services:
#   web:
#     read_only: true
#     user: "1000:1000"
#     cap_drop:
#       - ALL
#     security_opt:
#       - no-new-privileges:true
#     deploy:
#       resources:
#         limits:
#           memory: 512M
#           cpus: '1.0'
```

---

## Key Concepts

### Non-root Users
Run containers as non-root for security.

### Read-only
Prevent filesystem modifications.

### Capabilities
Drop unnecessary Linux capabilities.

### Image Scanning
Detect vulnerabilities in images.

### Content Trust
Sign and verify image integrity.

### Security Profiles
Restrict system calls with Seccomp and AppArmor.

---

## Experiments

- Scan images with Trivy
- Experiment with read-only containers
- Try dropping capabilities
- Create seccomp profiles
- Experiment with AppArmor

---

## Challenge

Audit existing Dockerfile: add non-root user, read-only fs, resource limits, image scanning.

---

## Summary

Week 9 of 12: **Security** (Level: Advanced). Container security. Next week: **CI/CD**.
