# Capstone: Production Pipeline — Docker Shop Grand Opening

> **Kategori:** Docker | **Level:** Advanced | **Minggu 12:** Capstone: Production Pipeline
> **Prerequisites:** Week 11 — **Orchestration**.

## Learning Objectives

- Combine W1-W11: diet `Dockerfile` + `compose` assembly + `CI/CD` factory + `security` locks + `volume` wardrobe into a production shop pipeline

---

## Why This Matters (Non-IT)

11 separate weeks — capstone proves the combined pipeline: `git push` → test → scan → deploy → monitor. Your "production-ready Docker" portfolio.

---

## Program: Complete Shop Pipeline (Checklist)

```dockerfile
# Dockerfile — diet + secure (W4+W8+W9)
FROM golang:1.22 AS build
WORKDIR /app
COPY go.mod ./
RUN go mod download
COPY . .
RUN CGO_ENABLED=0 go build -o shop .
FROM alpine:3.19
RUN adduser -S shop
USER shop
COPY --from=build /app/shop /shop
CMD ["/shop"]
```

```yaml
# docker-compose.yml — assembly (W7) + wardrobe (W5)
services:
  web: { build: ., ports: ["8080:80"] }
  db: { image: postgres:15, environment: { POSTGRES_PASSWORD: secret }, volumes: [data:/var/lib/postgresql/data] }
volumes: { data: }
```

```yaml
# .github/workflows/docker.yml — factory (W10)
# on: push → build → trivy → push GHCR
```

```bash
# Grand opening checklist:
trivy image shop:1.0        # 0 CRITICAL? (W9)
docker compose up -d          # all UP? (W7)
curl localhost:8080/health  # UP? (monitor)
docker images shop          # <50MB? (W8 diet)
```

**Capstone task:** Public repo + green pipeline + <50MB image + 0 CRITICAL + deploy + 2-min video. **Docker 0→Expert DONE!** 🎉

---

## Key Concepts

### Pipeline = Combine 11 Weeks
Diet + assembly + factory + locks + wardrobe = production.

---

## Beginner Friendly Explanation

### Analogy: Factory Grand Opening
- **W1-W4 foundation** + **W5-W8 engine** + **W9-W11 guards** = factory. **W12 = open**.

### Step 0 — Prepare Device
- Docker + registry account + deploy target ready.

### How the Computer Reads It
1. `git push` → factory builds → scans → ships.
2. Checklist all green → production pipeline live.

### 3 Must-Know Terms
1. **Capstone/pipeline**: combine/prod-flow

---

## Experiments

- **Green:** All checklist items pass locally?
- **Yellow:** Image >50MB → which stage bloated? Diet it.
- **Red:** Trivy CRITICAL → ship anyway? Never — fix base.

---

## Challenge

**Grand Opening:** All-green checklist + public URL + video. **Docker 0→Expert DONE!** 🎉

---

## Mini Glossary

- **Capstone/pipeline**: combine/prod-flow

---

## Summary

Week 12 of 12: **Production Pipeline** (Level: Advanced). **Docker 0→Expert from zero DONE!** 🎉
