# Image & Registry — Blueprint Warehouse

> **Kategori:** Docker | **Level:** Beginner | **Minggu 2:** Image & Registry
> **Prerequisites:** Week 1 — **Docker Concepts**.

## Learning Objectives

- Find & pull images `docker pull`, view `docker images`, remove `rmi`
- Tags `nginx:1.25` vs `nginx:latest`, layers, cache
- Push to Docker Hub / login, `docker build -t yourname/shop:1.0 .` preview
- `docker save/load` for file transfer

---

## Why This Matters (Non-IT)

One shop blueprint isn't enough. Needs versions `1.0`, `1.1`, stored in a warehouse (Hub) so branches `pull` the same — no USB sticks.

---

## Program: Blueprint Warehouse

```bash
# Find & pull
docker pull nginx:alpine
docker pull postgres:15

# View collection
docker images
docker image ls

# Label your own version (tag)
docker tag nginx:alpine shop/web:1.0
docker images | grep shop

# Save & load as file (send without internet)
docker save shop/web:1.0 -o shop.tar
docker load -i shop.tar

# Remove
docker rmi shop/web:1.0
docker rmi nginx:alpine # when no container uses it

# Login & push (needs hub.docker.com account)
docker login
# docker build -t yourname/shop:1.0 .
# docker push yourname/shop:1.0

# View layers (why is 2nd pull fast? cache)
docker pull nginx:alpine # second time: Already exists
```

---

## Key Concepts

### Tag = Version
`nginx:latest` (newest), `nginx:1.25`, `postgres:15-alpine` (small). Never use `latest` in production — uncertain.

### Layer = Cake Layers
Images consist of layers (OS, nginx, config). 2nd `pull` only fetches new layers.

### Registry = Warehouse
Docker Hub = public warehouse. Private Hub = personal warehouse.

---

## Beginner Friendly Explanation

### Analogy: Blueprint Warehouse

- **`pull` = take blueprint photocopy from warehouse**.
- **`tag` = version stamp**: `shop:1.0` vs `shop:2.0`.
- **`push` = store new photocopy in warehouse**.

### Step 0 — Prepare Device
- Docker running + hub.docker.com account for push practice.

### How the Computer Reads It
1. `docker pull nginx:alpine` → downloads missing layers → image ready.
2. `docker tag a b` → same image ID, second name.

### 3 Must-Know Terms
1. **pull/push/tag**: take/store/version

---

## Experiments

- **Green:** `docker pull postgres:15` then `docker images` → size?
- **Yellow:** `docker tag nginx:alpine shop:test` → 2 names, 1 content (same ID).
- **Red:** `docker rmi postgres:15` while `db` container still runs → `image is being used` error.

---

## Challenge

**Version Warehouse:** `pull` `nginx:alpine` and `nginx:1.25`, compare `docker images` sizes. `tag` one as `shop/nginx:shop` → `save` → `rmi` → `load`.
- **Link-up (Week 1 — Docker Concepts):** plug this challenge's result into that flow; make sure it runs end-to-end.

---
## Mini Glossary

- **pull/push**: take/store
- **Tag**: version
- **Layer**: layer

---

## Summary

Week 2: **Blueprint Warehouse** — fetch, tag, store. Next: **Container Management** — live, die, volumes.
