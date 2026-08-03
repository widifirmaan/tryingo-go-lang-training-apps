# Docker & CI/CD

> NestJS | Production & Capstone | Lesson 15

## Learning Objectives

- Build a multi-stage Dockerfile for small images
- Compose a stack with docker-compose (api + db)
- Write a GitHub Actions workflow (CI)
- Explain the flow: build, test, push image, deploy

---

## Program: Docker & CI/CD

```ts
# Stage 1: build (toolchain lengkap)
FROM node:20-alpine AS build
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

# Stage 2: runtime - image minimal tanpa toolchain build
FROM node:20-alpine
WORKDIR /app
COPY --from=build /app/dist ./dist
COPY --from=build /app/node_modules ./node_modules
COPY --from=build /app/package.json ./
EXPOSE 3000
CMD ["node", "dist/main"]
```

---

## Explanation

## Multi-stage Builds: Small Image, Same Result
Stage 1 (build): node:20-alpine + the toolchain, npm ci, npm run build → dist/. Stage 2 (runtime): an EMPTY node:20-alpine, copying only dist + production node_modules. Result: an image without the TypeScript compiler and without sources - smaller and with a smaller attack surface. The same Docker rules from the Docker track apply: dependencies first (caching), sources later.
## docker-compose: One Command, One Stack
api (build .) + db (postgres:16-alpine) - automatic network, api reaches db by service name. depends_on + healthcheck (pg_isready) guarantee the database is READY before the api starts - not just the start order. The db-data volume keeps data alive when containers are destroyed. One docker compose up runs the whole application.
## GitHub Actions: The Automatic Gate
CI workflow: every push → checkout → setup-node → npm ci → npm run build → npm test. A broken build or a red test = the flow STOPS here, never reaching deploy. CI is a "tireless reviewer": it runs the exact same thing on every push, without forgetting and without tiring.
## From CI to Production
The full pattern: CI (build + test) → build the Docker image → push to a registry (Docker Hub/GHCR) → deploy to a platform (Render/Railway/Fly/ECS) with that image. The SAME code tested in CI runs in production - no more "it works on my laptop". This is also the standard flow from the Node.js track; Nest adds the nest build step.

---

## Experiments

1. **Multi-stage Builds: Small Image, Same Result**
2. **docker-compose: One Command, One Stack**
3. **GitHub Actions: The Automatic Gate**
4. **From CI to Production**

---

## Challenge

Strengthen the pipeline: (1) add a deploy stage to the workflow: push the image to GHCR (docker/build-push-action) when on main, (2) add npm caching (actions/cache) to speed up npm ci, (3) change the API healthcheck in compose: wget to /api/health with retries, (4) write down your release flow: commit → CI → image → deploy, and identify which step fails most often.

---

## Summary

Multi-stage = small images. Compose = one-command stacks. CI = the automatic gate. The same image to production. Next: capstone.
