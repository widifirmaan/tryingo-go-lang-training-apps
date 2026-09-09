# Container Management — Live, Die, and Data Stays

> **Kategori:** Docker | **Level:** Beginner | **Minggu 3:** Container Management
> **Prerequisites:** Week 2 — **Image & Registry**.

## Learning Objectives

- `docker run -v shop-data:/data` volumes keep data alive across `rm`, `docker network` connects boxes, `docker exec -it` enters

---

## Why This Matters (Non-IT)

Without volumes, `docker rm db` → stock data gone. With volumes, data lives outside the box — safe.

---

## Program: Shop Volume

```bash
docker volume create shop-data
docker run --name db -v shop-data:/var/lib/postgresql/data -e POSTGRES_PASSWORD=secret -p 5432:5432 -d postgres
docker exec -it db psql -U postgres -c "CREATE TABLE products (id SERIAL PRIMARY KEY, name TEXT);"

# Check volume
docker volume ls
docker volume inspect shop-data

# Remove container but data stays
docker rm -f db
docker run --name db2 -v shop-data:/var/lib/postgresql/data -e POSTGRES_PASSWORD=secret -p 5432:5432 -d postgres
# Product data still there!

# Network: connect web + db
docker network create shop-net
docker network connect shop-net db2
```

---

## Key Concepts

### Volume = Outside Drawer
`-v name:/path` stores outside the box; `rm` safe.

### `exec -it` = Enter Box
Runs a command inside a running box.

---

## Beginner Friendly Explanation

### Analogy: Tenant & Wardrobe
- **Container = tenant** (comes and goes), **volume = wardrobe** (stays in the room).

### Step 0 — Prepare Device
- Docker running, `docker volume ls` to start.

### How the Computer Reads It
1. `-v shop-data:/var/lib/...` → mounts wardrobe into the box path.
2. `docker rm -f db` → box gone, wardrobe stays → `db2` reuses it.

### 3 Must-Know Terms
1. **volume/exec/network**: wardrobe/enter/connect

---

## Experiments

- **Green:** `rm` + recreate with same volume → data back?
- **Yellow:** `docker volume inspect` → find Mountpoint?
- **Red:** No `-v` + `rm` → data gone? (That's why volumes!)

---

## Challenge

**Persistent Shop:** Volume + Postgres + 3 rows + `rm` + recreate + `SELECT` still 3.
- **Link-up (Week 2 — Image & Registry):** plug this challenge's result into that flow; make sure it runs end-to-end.

---
## Mini Glossary

- **volume/network**: wardrobe/connect

---

## Summary

Week 3: **Data Stays** — volumes & networks. Next: **Dockerfile** — own box recipe.
