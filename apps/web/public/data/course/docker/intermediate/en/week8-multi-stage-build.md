# Multi-Stage Build — Diet Shop Boxes

> **Kategori:** Docker | **Level:** Intermediate | **Minggu 8:** Multi-Stage Build
> **Prerequisites:** Week 7 — **Docker Compose**.

## Learning Objectives

- `FROM ... AS build` + `COPY --from=build` — cook in a big kitchen, serve on a small plate (source: docs.docker.com/build/building/multi-stage)
- Shrink Go image `800MB → 15MB` (drop the compiler)

---

## Why This Matters (Non-IT)

Go image with compiler = 800MB (10-min upload, storage bills). With multi-stage, compiler only at build → 15MB result (10-second upload). Deploying 10x daily = hours saved.

---

## Program: Shop Box Diet

```dockerfile
# Dockerfile — 2 stages
# Stage 1: KITCHEN (big, has compiler)
FROM golang:1.22 AS build
WORKDIR /app
COPY go.mod ./
RUN go mod download
COPY . .
RUN CGO_ENABLED=0 go build -o shop .

# Stage 2: PLATE (small, result only!)
FROM alpine:3.19
COPY --from=build /app/shop /shop
EXPOSE 8080
CMD ["/shop"]
```

```bash
docker build -t shop:1.0 .
docker images shop  # ~15MB! (vs golang:1.22 ~800MB)
docker run -p 8080:8080 shop:1.0
```

---

## Key Concepts

### `AS build` + `COPY --from=build` = Kitchen + Serve
Stage 1 cooks (compiler), stage 2 carries only results. Kitchen tools don't join.

### `CGO_ENABLED=0` = Static
Binary needs no libc — runs on empty `alpine`/`scratch`.

---

## Beginner Friendly Explanation

### Analogy: Kitchen & Serving Plate
- **Build stage = kitchen**: stove + pots (big).
- **Final stage = plate**: food only (small). Kitchen never joins the table!

### Step 0 — Prepare Device
- Docker + small Go project (`main.go` hello).

### How the Computer Reads It
1. `FROM golang AS build` → compiles → `/app/shop`.
2. `FROM alpine` → copies binary only → tiny final image.

### 3 Must-Know Terms
1. **Multi-stage/AS**: 2-stages/kitchen
2. **COPY --from**: carry-result

---

## Experiments

- **Green:** Compare `docker images` 1-stage vs multi → MB difference?
- **Yellow:** Drop `CGO_ENABLED=0` + `scratch` base → `not found` error? (Needs libc!)
- **Red:** `COPY . .` before `go mod download` → code edit = re-download (slow)? Order mods first (cache!).

---

## Challenge

**Complete Diet Box:** Go/Node shop multi-stage + `docker images` <50MB + passing `run`. **Intermediate Docker DONE!**
- **Link-up (Week 7 — Docker Compose):** plug this challenge's result into that flow; make sure it runs end-to-end.

---
## Mini Glossary

- **Multi-stage/scratch**: diet/empty
- **CGO_ENABLED**: static

---

## Summary

Week 8 of 12: **Diet Boxes** (Level: Intermediate). 800MB → 15MB. **Intermediate Docker DONE!** Next: **Security** (Advanced).
