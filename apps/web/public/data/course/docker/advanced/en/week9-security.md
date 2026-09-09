# Security — Locking Docker Boxes

> **Kategori:** Docker | **Level:** Advanced | **Minggu 9:** Security
> **Prerequisites:** Week 8 — **Multi-Stage Build**.

## Learning Objectives

- `USER appuser` never root, `--read-only` + `--cap-drop ALL` reduce weapons, `trivy image` scans (source: docs.docker.com/security + aquasec Trivy)
- `--memory`/`--cpus` limits, secrets via env/file (never in images!)

---

## Why This Matters (Non-IT)

Boxes running as `root` + hacker entry → host conquered! Without scans, old `postgres:15` images hide CRITICAL CVEs. Without limits, 1 box eats RAM → whole server dies.

---

## Program: Locked Shop Box

```dockerfile
# Secure Dockerfile
FROM alpine:3.19
RUN addgroup -S app && adduser -S shop -G app
USER shop
COPY --chown=shop:app index.html /web/
CMD ["httpd", "-f", "-h", "/web"]
```

```bash
# Run minimal weapons + read-only + limits
docker run -d --name web \
  --read-only --tmpfs /tmp \
  --cap-drop ALL \
  --memory 256m --cpus 0.5 \
  -p 8080:80 shop:1.0

# Scan before deploy!
trivy image shop:1.0
# → HIGH/CRITICAL? Update base image!

# Who runs? (not root!)
docker exec web whoami  # shop
```

---

## Key Concepts

### `USER` non-root = Not Boss
Hackers enter as `shop` (not `root`) → limited damage.

### `--read-only` + `--cap-drop` = Tied Hands
Can't write + can't `mount`/`reboot`.

### `trivy` = X-Ray
Scans CVEs before deploy. `--memory/--cpus` = rations.

---

## Beginner Friendly Explanation

### Analogy: Box with Locks
- **USER = employee access card** (not master key).
- **read-only = glass showcase**: look, don't fiddle.
- **trivy = customs X-ray**: scans before entry.

### Step 0 — Prepare Device
- Docker + `trivy` (`brew install trivy` / binary).

### How the Computer Reads It
1. `USER shop` → process runs as non-0 UID.
2. `--cap-drop ALL` → kernel refuses `mount`, `reboot`.

### 3 Must-Know Terms
1. **USER/root**: employee/boss
2. **read-only/cap-drop**: glass/tied
3. **Trivy/CVE**: xray/hole

---

## Experiments

- **Green:** `whoami` in root box vs `USER shop` box?
- **Yellow:** `touch /x` in `--read-only` → `Read-only file system`?
- **Red:** `trivy image nginx:latest` → CVEs? Switch to `alpine` + rescan (fewer?).

---

## Challenge

**Complete Secure Box:** `USER` + `--read-only` + `--cap-drop ALL` + `--memory 256m` + `trivy` 0 CRITICAL + screenshot.

---

## Mini Glossary

- **USER/cap-drop/read-only**: employee/tied/glass
- **Trivy/CVE**: xray/hole

---

## Summary

Week 9 of 12: **Box Locks** (Level: Advanced). Non-root + scanned. Next: **CI/CD** — auto factory.
