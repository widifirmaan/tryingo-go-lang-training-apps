# Volume & Data — Permanent Docker Wardrobe

> **Kategori:** Docker | **Level:** Intermediate | **Minggu 5:** Volume & Data Persistence
> **Prerequisites:** Week 4 — **Dockerfile**.

## Learning Objectives

- `docker volume create shop-data` + `-v shop-data:/var/lib/postgresql/data` so `docker rm` never deletes data (source: docs.docker.com/storage/volumes)
- Distinguish volumes (permanent) vs bind mounts (`-v $(pwd):/app` for code) vs tmpfs

---

## Why This Matters (Non-IT)

Without volumes, `docker rm db` → 10,000 stock rows gone permanently. With volumes, data lives outside the box — delete containers 100x, data stays. Bind mounts for code (edit on laptop, instantly inside box, no rebuild).

---

## Program: Permanent Shop Wardrobe

```bash
# 1. Named volume (permanent, Docker-managed)
docker volume create shop-data
docker run --name db -v shop-data:/var/lib/postgresql/data \
  -e POSTGRES_PASSWORD=secret -p 5432:5432 -d postgres

docker exec -it db psql -U postgres -c "CREATE TABLE products (id SERIAL PRIMARY KEY, name TEXT);"
docker exec -it db psql -U postgres -c "INSERT INTO products (name) VALUES ('Rice');"

# 2. Prove it stays: delete box, data present!
docker rm -f db
docker run --name db2 -v shop-data:/var/lib/postgresql/data \
  -e POSTGRES_PASSWORD=secret -p 5432:5432 -d postgres
docker exec -it db2 psql -U postgres -c "SELECT * FROM products;"
# → Rice still there!

# 3. Bind mount for code (live edits)
docker run --name web -v $(pwd)/index.html:/usr/share/nginx/html/index.html:ro -p 8080:80 -d nginx
# Edit index.html on laptop → refresh browser, instantly changed!

docker volume ls
docker volume inspect shop-data
```

---

## Key Concepts

### Volume vs Bind vs Tmpfs
- `volume` (`-v name:/data`): permanent, Docker-managed in `/var/lib/docker/volumes` — for DBs.
- `bind` (`-v $(pwd)/file:/file`): laptop file live — for dev code.
- `tmpfs`: RAM only (lost) — for temporary secrets.

### `:ro` = Read Only
`.../index.html:ro` the box can't edit laptop files (safe).

---

## Beginner Friendly Explanation

### Analogy: Wardrobe vs Tote Bag
- **Volume = wardrobe in warehouse**: tenant (box) moves, wardrobe stays.
- **Bind = tote bag**: laptop goods carried straight into the box.

### Step 0 — Prepare Device
- Docker Desktop running + empty `docker volume ls`.

### How the Computer Reads It
1. `-v shop-data:/var/lib/...` → Docker mounts wardrobe into that box path.
2. Postgres writes → into wardrobe (not box) → `rm` safe.

### 3 Must-Know Terms
1. **Volume/bind**: wardrobe/bag
2. **ro**: read-only

---

## Experiments

- **Green:** No `-v`, fill DB → `rm` → recreate → gone? (Proof volumes needed!)
- **Yellow:** `docker volume inspect shop-data` → where's Mountpoint?
- **Red:** Bind without `:ro` + `echo x > file` from inside box → laptop file changes? (Danger! Use `:ro`.)

---

## Challenge

**Permanent Shop Warehouse:** `shop-data` volume + Postgres + 3 products + `rm` + recreate + `SELECT` still 3 + bind `index.html` editing without rebuild.

---

## Mini Glossary

- **Volume/bind/tmpfs**: wardrobe/bag/RAM
- **ro/inspect**: read-only/peek

---

## Summary

Week 5 of 12: **Permanent Wardrobe** (Level: Intermediate). Data survives `rm`. Next: **Networking** — box-to-box calls.
