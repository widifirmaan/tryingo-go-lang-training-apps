# Docker Concepts — Shipping Containers for Apps

> **Kategori:** Docker | **Level:** Beginner | **Minggu 1:** Konsep Docker

## Learning Objectives

- Understand Docker as **shipping containers**: app + dependencies 1 package, runs anywhere
- Distinguish `image` (blueprint) vs `container` (running box) vs `Dockerfile` (recipe)
- Install Docker Desktop, check `docker --version`, run `docker run hello-world` and `nginx`
- `docker ps`, `logs`, `stop`, `rm`

---

## Why This Matters (Non-IT)

Opening shop branches: without boxes, carry stove, gas, spices separately — something gets left behind. With Docker boxes, 1 box holds everything → opens anywhere and just runs. Friend's laptop, server, same.

---

## Program: First Box

```bash
# Check Docker installed
docker --version
docker run hello-world
# → Hello from Docker! (sample box)

# Run a demo store (nginx) — web server box
docker run --name shop-web -p 8080:80 -d nginx
# -p 8080:80 = outside door 8080 → inside 80, -d = runs behind
# Open http://localhost:8080 → see "Welcome to nginx!"

# See running boxes
docker ps
docker logs shop-web
docker stop shop-web
docker rm shop-web

# Interactive box (enter inside)
docker run -it --rm alpine sh
# -it = interactive, --rm = delete after exit
# Inside: ls, pwd, exit
```

**Install (once):** `docker.com` → Docker Desktop → Install → Restart → `docker --version` appears.

**No install (try):** `play-with-docker.com` in browser.

---

## Key Concepts

### Shipping Containers
- **Image** = blueprint (recipe + ingredients) — `nginx`, `postgres`
- **Container** = running box from image — `shop-web`
- **Dockerfile** = recipe writing images (week 4)
- **Registry** = blueprint warehouse — Docker Hub

### Mandatory Commands
`docker run -p outside:inside -d --name name image`, `docker ps`, `logs`, `stop`, `rm`, `exec -it`.

---

## Beginner Friendly Explanation

### Analogy

- **Image = box blueprint**: drawing + contents list.
- **Container = real box**: 1 blueprint becomes 5 running boxes.
- **Port `-p` = warehouse door**: outside 8080, inside 80.

### Step 0 — Prepare Device
- Docker Desktop installed + `docker --version` works, or `play-with-docker.com`.

### How the Computer Reads It
1. `docker run -p 8080:80 -d nginx` → pulls image → creates box → maps doors.
2. `docker ps` → lists running boxes.

### 3 Must-Know Terms
1. **Image/container/Dockerfile**: blueprint/box/recipe

---

## Experiments

- **Green:** Second `docker run -p 8081:80 -d nginx` on 8081 → 2 stores running together?
- **Yellow:** `docker ps -a` sees dead ones, `docker rm` removes.
- **Red:** Forget `-p` → `localhost:8080` unreachable, needs `-p`.

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

Week 1: **Shipping Containers** — apps run anywhere. Next: **Image & Registry** — fetch & store blueprints.
