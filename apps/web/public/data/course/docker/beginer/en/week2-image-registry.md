# Image & Registry — Blueprint Warehouse

> **Kategori:** Docker | **Level:** Beginner | **Minggu 2:** Image & Registry

## Learning Objectives

- Find & pull `docker pull`, see `docker images`, delete `rmi`
- Tag `nginx:1.25` vs `nginx:latest`, layers, cache
- Push to Docker Hub / login, `docker build -t yourname/shop:1.0 .` preview
- `docker save/load` to send file

---

## Why This Matters (Non-IT)

Shop blueprint not just 1. Need version `1.0`, `1.1`, store in warehouse (Hub) so branch can `pull` same — not via USB.

---

## Program: Blueprint Warehouse

```bash
docker pull nginx:alpine
docker pull postgres:15

docker images
docker image ls

docker tag nginx:alpine shop/web:1.0
docker images | grep shop

docker save shop/web:1.0 -o shop.tar
docker load -i shop.tar

docker rmi shop/web:1.0
docker rmi nginx:alpine

docker login
# docker build -t yourname/shop:1.0 .
# docker push yourname/shop:1.0

docker pull nginx:alpine # second time: Already exists (cache)
```

---

## Key Concepts

### Tag = Version
`nginx:latest` (latest), `nginx:1.25`, `postgres:15-alpine` (small). Don't use `latest` in prod — uncertain.

### Layer = Cake Layers
Image has layers (OS, nginx, config). Second `pull` only new layers.

### Registry = Warehouse
Docker Hub = public warehouse. Private Hub = private.

---

## Beginner Friendly Explanation

### Analogy: Blueprint Warehouse

- **`pull` = take blueprint copy from warehouse**.
- **`tag` = version stamp**: `shop:1.0` vs `shop:2.0`.
- **`push` = save new copy to warehouse**.

---

## Experiments

- **Green:** `docker pull postgres:15` then `docker images` → size?
- **Yellow:** `docker tag nginx:alpine shop:test` → 2 names, 1 content (same ID).
- **Red:** `docker rmi postgres:15` while container `db` running → error `image is being used`.

---

## Challenge

**Version Warehouse:** `pull` `nginx:alpine` and `nginx:1.25`, compare `docker images` size. `tag` one to `shop/nginx:shop` → `save` → `rmi` → `load`.

---

## Mini Glossary

- **pull/push**: fetch/store
- **Tag**: version
- **Layer**: layer

---

## Summary

Week 2: **Blueprint Warehouse** — fetch, tag, store. Next: **Container Management** — live, stop, volumes.
