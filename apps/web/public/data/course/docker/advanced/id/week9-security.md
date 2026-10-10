# Security

> **Kategori:** Docker | **Level:** Lanjutan | **Minggu 9:** Security

## Tujuan Pembelajaran

- Non-root user di container
- Read-only filesystem dan drop capabilities
- Image scanning: Trivy, Docker Scout, Snyk
- Content trust dan security profiles
- Resource limits dan security options

---

## Program: Secure Container

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

## Konsep Kunci

### Non-root User
Jalankan container sebagai non-root. Tambah user di Dockerfile.

### Read-only
`--read-only` — filesystem read-only. Gunakan `--tmpfs` untuk direktori yang perlu write.

### Capabilities
Linux capabilities. Drop semua, tambah hanya yang perlu.

### Image Scanning
Scan image untuk CVE/vulnerabilities. Trivy, Scout, Snyk.

### Content Trust
Sign image dengan Docker Content Trust. Verify saat pull.

### Security Profiles
Seccomp dan AppArmor untuk restrict system calls.

---

## Eksperimen

- Scan image dengan Trivy
- Eksperimen dengan read-only container
- Coba drop capabilities
- Buat seccomp profile
- Eksperimen dengan AppArmor

---

## Tantangan

Audit existing Dockerfile: tambah non-root user, read-only fs, resource limits, image scanning.

---

## Ringkasan

Minggu 9 dari 12: **Security** (Level: Lanjutan). Keamanan container. Minggu depan: **CI/CD**.
