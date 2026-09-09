# Networking — Box-to-Box Docker Calls

> **Kategori:** Docker | **Level:** Intermediate | **Minggu 6:** Networking
> **Prerequisites:** Week 5 — **Volume & Data**.

## Learning Objectives

- `docker network create shop-net` + `--network shop-net` so boxes call names (`db:5432`) not IPs (source: docs.docker.com/network)
- Distinguish `bridge` (default), `host`, `none`

---

## Why This Matters (Non-IT)

Web + DB in different boxes without a shared network = web can't find DB (IPs change every start!). With 1 network, web calls `db` (name) — IPs may change, Docker's automatic DNS still finds it.

---

## Program: Shop Phones

```bash
# 1. Create network + attach 2 boxes
docker network create shop-net

docker run --name db --network shop-net \
  -e POSTGRES_PASSWORD=secret -d postgres

docker run --name web --network shop-net \
  -p 8080:80 -d nginx

# 2. Call by name (not IP!)
docker exec -it web ping db -c 2
# → db found! (automatic DNS)

docker exec -it web getent hosts db
# → 172.18.0.2 db (IP may differ per start, name stays!)

# 3. View & clean
docker network ls
docker network inspect shop-net
docker network rm shop-net  # after boxes detached
```

Web apps connect via `host=db` (not `localhost`!).

---

## Key Concepts

### Network = Private Phone Network
1 network = 1 group calling each other by name. Different networks = strangers.

### `bridge` / `host` / `none` = 3 Kinds
- `bridge` default (NAT, safe).
- `host` attached to host (fast, no isolation).
- `none` no internet (secrets).

---

## Beginner Friendly Explanation

### Analogy: Box WA Group
- **Network = WA group**: members call by name. Different groups don't.

### Step 0 — Prepare Device
- Docker running + 2 sample boxes.

### How the Computer Reads It
1. `--network shop-net` → box joins + gets IP + DNS records name.
2. `ping db` → DNS answers IP → packets arrive.

### 3 Must-Know Terms
1. **Network/bridge**: group/default
2. **Name DNS**: call-by-name

---

## Experiments

- **Green:** Without a shared `--network`, `ping db` from web → not found? Join → found?
- **Yellow:** `inspect` → `Containers` lists 2?
- **Red:** App using `localhost:5432` from web box → fails? (localhost = own box!) Switch to `db:5432`.

---

## Challenge

**Connected Shop:** `store` network + `db` (postgres) + `web` (node app `host=db`) + passing `ping` + app reads DB.
- **Link-up (Week 5 — Volume & Data):** plug this challenge's result into that flow; make sure it runs end-to-end.

---
## Mini Glossary

- **Network/bridge/DNS**: group/default/names

---

## Summary

Week 6 of 12: **Box-to-Box Phones** (Level: Intermediate). Call names, not IPs. Next: **Compose** — assemble once, run.
