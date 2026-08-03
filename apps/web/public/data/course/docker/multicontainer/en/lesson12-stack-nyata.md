# A Real Stack: Web + API + DB + Redis

> Docker | Multi-Container | Lesson 12

## Learning Objectives

- Use healthcheck + depends_on: service_healthy
- Run a 4-service stack with one command
- Read logs of a specific service
- Scale a service horizontally

---

## Program: A Real Stack: Web + API + DB + Redis

```docker
# Stack shop: web, api, redis, db - lihat definisinya
docker compose -f compose/shop/docker-compose.yml config

# Naikkan stack dengan healthcheck
docker compose -f compose/shop/docker-compose.yml up -d
docker ps
docker compose -f compose/shop/docker-compose.yml ps

# Log tiap service
docker compose -f compose/shop/docker-compose.yml logs api

# Skala horizontal: 2 replika API
docker compose -f compose/shop/docker-compose.yml up -d --scale api=2
docker compose -f compose/shop/docker-compose.yml ps

# Matikan semuanya
docker compose -f compose/shop/docker-compose.yml down
```

---

## Explanation

## The Modern App Pattern
Real web apps are rarely a single service: a web server (frontend/nginx), a backend API, a database (Postgres), a cache (Redis). Each gets its own official image and its own configuration. Compose unifies them in one file - the stack's lifecycle is one command.
## healthcheck: Real Readiness
depends_on: db alone is not enough (lesson 11). Modern Compose supports depends_on: db: condition: service_healthy. healthcheck defines a probe command (e.g. pg_isready or wget to /health). Compose waits until the service is healthy BEFORE starting its dependents. This is the difference between "the app crashed for 3 seconds then worked" and "the app starts when the DB is actually ready".
## Reading and Filtering Logs
compose logs shows logs from all services; compose logs api shows only API logs. Structured logs (JSON, key=value) are far easier to search than freeform text. This is also what production observability platforms consume.
## Horizontal Scaling with --scale
--scale api=2 creates 2 replicas of the same service (named api_1, api_2...). For a stateless API, this is the cheap way to add capacity. Note: Postgres must NOT be scaled - a database with state cannot simply be duplicated. "Stateless containers scale; stateful ones get respect."

---

## Experiments

1. **The Modern App Pattern**
2. **healthcheck: Real Readiness**
3. **Reading and Filtering Logs**
4. **Horizontal Scaling with --scale**

---

## Challenge

Modify: add a healthcheck to api in compose/shop/docker-compose.yml (not web), then watch the startup order in docker ps during up. Scale api up to 3 replicas, inspect with compose ps, then scale back to 1. Write down what you learned about orchestration.

---

## Summary

A real stack = web + api + db + redis in one file. healthcheck + service_healthy = true readiness. Stateless scales; stateful does not. Next: Dockerfile best practices.
