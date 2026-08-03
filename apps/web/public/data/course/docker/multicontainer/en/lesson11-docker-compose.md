# Docker Compose: Infrastructure as Code

> Docker | Multi-Container | Lesson 11

## Learning Objectives

- Read service definitions in docker-compose.yml
- Bring up an entire stack with compose up
- View logs of all services with compose logs
- Explain the difference between up, down, and stop

---

## Program: Docker Compose: Infrastructure as Code

```docker
# Lihat definisi stack (vote: web + redis + db)
docker compose -f compose/vote/docker-compose.yml config

# Jalankan seluruh stack sekali jalan
docker compose -f compose/vote/docker-compose.yml up -d
docker ps

# Log semua service
docker compose -f compose/vote/docker-compose.yml logs

# Perbesar skala worker
docker compose -f compose/vote/docker-compose.yml up -d --scale worker=3
docker ps

# Matikan stack, network & volume ikut dibersihkan
docker compose -f compose/vote/docker-compose.yml down
```

---

## Explanation

## From 5 Commands to 1 File
Running a multi-container stack without Compose means memorizing a sequence of 5+ commands: create a network, run web with -p and -v flags, run db with env, etc. Compose replaces all of it with ONE YAML file: which services, what images, which ports, env, volumes, networks. Infrastructure becomes code: version-controlled, reviewable, reproducible.
## docker-compose.yml Anatomy
services: a list of services, each with image (or build), ports, environment, volumes, networks, depends_on. Compose automatically creates a network for the stack, and services are addressed by name (web, db, redis) - the same internal DNS from lesson 10.
## up, down, stop - Not the Same
compose up = build and start everything (idempotent: running ones are left alone, changed ones are updated). compose down = STOP EVERYTHING + delete containers, network, and (with -v) volumes. compose stop = stop containers but delete nothing. down -v is rarely used in good practice - data volumes are left alive.
## depends_on: Order Is Not Readiness
depends_on only guarantees the START ORDER, not that a service is READY. A fresh Postgres takes seconds to initialize; an app starting sooner will fail to connect. The modern solution: healthcheck + condition: service_healthy (lesson 12).

---

## Experiments

1. **From 5 Commands to 1 File**
2. **docker-compose.yml Anatomy**
3. **up, down, stop - Not the Same**
4. **depends_on: Order Is Not Readiness**

---

## Challenge

Run the script and watch the order in which containers appear. Then try: docker compose -f compose/vote/docker-compose.yml ps before up - what happens? After up, edit docker-compose.yml (e.g., the web port) and up again - what changes? Write down your observations.

---

## Summary

Compose = one YAML file replacing a command chain. up creates, down removes everything, stop only halts. depends_on = order, not readiness. Next: a real stack with healthchecks.
