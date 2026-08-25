# Docker Concept — Shipping Container for Apps

> **Kategori:** Docker | **Level:** Beginner | **Minggu 1:** Konsep Docker

## Learning Objectives

- Understand Docker like **shipping container**: app + dependencies 1 package, runs anywhere
- Difference `image` (blueprint) vs `container` (running box), vs `Dockerfile` (recipe)
- Install Docker Desktop, check `docker --version`, run `docker run hello-world` and `nginx`
- `docker ps`, `logs`, `stop`, `rm`

---

## Why This Matters (Non-IT)

Shop branch: without container, bring stove, gas, spices separately — something missing. With Docker container, 1 box has all → open anywhere same. Friend laptop, server, same.

---

## Program: First Box

```bash
docker --version
docker run hello-world

docker run --name shop-web -p 8080:80 -d nginx
# -p 8080:80 = outside 8080 → inside 80, -d = background
# Open http://localhost:8080 → "Welcome to nginx!"

docker ps
docker logs shop-web
docker stop shop-web
docker rm shop-web

docker run -it --rm alpine sh
# -it = interactive, --rm = delete after exit
# Inside: ls, pwd, exit
```

**Install (once):** `docker.com` → Docker Desktop → Install → Restart → `docker --version`.

**No install:** `play-with-docker.com` in browser.

---

## Key Concepts

### Container
- **Image** = blueprint (recipe + ingredients) — `nginx`, `postgres`
- **Container** = running box from image — `shop-web`
- **Dockerfile** = recipe to write image (week 4)
- **Registry** = blueprint warehouse — Docker Hub

### Must Commands
`docker run -p outside:inside -d --name name image`, `docker ps`, `logs`, `stop`, `rm`, `exec -it`.

---

## Beginner Friendly Explanation

### Analogy

- **Image = container blueprint**: picture + list.
- **Container = real container**: 1 blueprint can be 5 running containers.
- **Port `-p` = warehouse door**: outside 8080, inside 80.

---

## Experiments

- **Green:** `docker run -p 8081:80 -d nginx` second on 8081 → 2 shops together?
- **Yellow:** `docker ps -a` see dead, `docker rm` delete.
- **Red:** Forget `-p` → `localhost:8080` fails, need `-p`.

---

## Challenge

**Shop Box:** `docker run --name db -e POSTGRES_PASSWORD=secret -p 5432:5432 -d postgres` → check `docker logs db` → `docker ps`. Stop & remove after.

---

## Mini Glossary

- **Image/Container**: blueprint/box
- **Port**: door
- **Registry**: blueprint warehouse

---

## Summary

Week 1: **Container** — app runs anywhere. Next: **Image & Registry** — fetch & store blueprints.
