# Docker Compose — Assemble Shop in One Run

> **Kategori:** Docker | **Level:** Intermediate | **Minggu 7:** Docker Compose

## Learning Objectives

- `docker-compose.yml` (`services`, `ports`, `environment`, `volumes`, `depends_on`) + `docker compose up -d` / `logs` / `down` (source: docs.docker.com/compose)

---

## Why This Matters (Non-IT)

Web + DB + cache = 3 long `docker run` commands every morning (1 forgotten flag = broken). With 1 `compose.yml` file, 1x `up` runs all — team gets the same file, same result.

---

## Program: Assemble 3-Box Shop

```yaml
# docker-compose.yml — 1 file for all
services:
  web:
    build: .
    ports: ["8080:80"]
    depends_on: [db]
  db:
    image: postgres:15
    environment: { POSTGRES_PASSWORD: secret }
    volumes: [shop-data:/var/lib/postgresql/data]
  cache:
    image: redis:7
volumes:
  shop-data:
```

```bash
docker compose up -d        # assemble + run all
docker compose ps           # 3 boxes UP?
docker compose logs db      # peek 1 box's log
docker compose down         # stop (+ remove boxes, volumes stay!)
docker compose down -v      # + remove volumes (careful!)
```

---

## Key Concepts

### `services` / `volumes` = Box/Wardrobe Lists
Each service 1 box. Bottom `volumes:` = named wardrobes.

### `depends_on` = Order
`web` waits for `db` to start first (start only, not ready! For ready use `healthcheck`).

### `up` / `down` / `logs` = On/Off/Peek

---

## Beginner Friendly Explanation

### Analogy: Shop Assembly Blueprint
- **compose.yml = blueprint**: "web here, db there, 1 wardrobe".
- **up = build simultaneously** per blueprint.

### Step 0 — Prepare Device
- Docker Desktop (compose included) + `docker-compose.yml` file.

### How the Computer Reads It
1. `up` → reads YAML → creates network + volume + 3 boxes in order.

### 3 Must-Know Terms
1. **Compose/services**: assemble/box-list
2. **depends_on/volumes**: order/wardrobes

---

## Experiments

- **Green:** `up` → `ps` 3 UP? `down` → gone?
- **Yellow:** `down` then `up` → DB data stays? (Volume!)
- **Red:** `down -v` → data gone? (Careful in production!)

---

## Challenge

**Assembled Shop:** `up` 3 boxes + `ps` proof + data survives `down/up` + `logs` check. **Intermediate Compose DONE!**

---

## Mini Glossary

- **compose/up/down**: assemble/on/off

---

## Summary

Week 7 of 12: **Assemble Once** (Level: Intermediate). 1 file, all boxes. Next: **Multi-Stage**.
