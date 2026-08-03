# CI/CD & Deployment

> Django | Production & Capstone | Lesson 17

## Learning Objectives

- Write a GitHub Actions workflow for Django
- Run tests against real PostgreSQL (services)
- Use manage.py check --deploy for auditing
- Build & push Docker images to a registry (GHCR)

---

## Program: CI/CD & Deployment

```python
name: CI

on: [push]

jobs:
  test:
    runs-on: ubuntu-latest
    services:
      postgres:
        image: postgres:16-alpine
        env:
          POSTGRES_DB: tryngo_test
          POSTGRES_USER: tryngo
          POSTGRES_PASSWORD: rahasia
        ports:
          - 5432:5432
        options: >-
          --health-cmd "pg_isready -U tryngo"
          --health-interval 10s
          --health-timeout 5s
          --health-retries 5
    env:
      DJANGO_SETTINGS_MODULE: myproject.settings.test
      POSTGRES_DB: tryngo_test
      POSTGRES_USER: tryngo
      POSTGRES_PASSWORD: rahasia
      POSTGRES_HOST: 127.0.0.1
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-python@v5
        with:
          python-version: "3.12"
          cache: pip
      - run: pip install -r requirements.txt
      - run: python manage.py migrate --noinput
      - run: python manage.py test
      - run: python manage.py check --deploy
      # Build image + push ke registry (CD dimulai dari sini)
      - uses: docker/setup-buildx-action@v3
      - uses: docker/login-action@v3
        with:
          registry: ghcr.io
          username: ${{ github.actor }}
          password: ${{ secrets.GITHUB_TOKEN }}
      - uses: docker/build-push-action@v6
        with:
          push: true
          tags: ghcr.io/${{ github.repository }}:latest
          cache-from: type=gha
          cache-to: type=gha,mode=max
```

---

## Explanation

## CI: The Reviewer That Never Tires
Every push to git → the workflow runs: pip install → migrate → test → check --deploy. A broken build or a red test = the flow stops, code never reaches production. This protects the team: mistakes surface in minutes, not after incidents. The same workflow you run locally runs in the exact same environment for everyone.
## Services: Testing Against a Real Database
The Django test default uses SQLite - different from production (PostgreSQL). GitHub Actions services: run postgres:16-alpine AS a sidecar container with a healthcheck - tests run against REAL PostgreSQL (settings/test.py with env). Bugs that only appear on PostgreSQL are caught BEFORE production. This is the 2026 practice: "test on what you ship on".
## check --deploy: One-Command Audit
python manage.py check --deploy inspects production settings: insecure SECRET_KEY, DEBUG=True, empty ALLOWED_HOSTS, disabled security headers - all detected with clear warnings. Put it in CI: an automatic audit on every push, not an easily-forgotten manual checklist. Combined with tests = two gates before deploying.
## CD: From Image to Production
After green tests: buildx build + push the image to GHCR (ghcr.io/<user>/<repo>:latest) with layer caching (type=gha). Production pulls the SAME image that was tested - no more "it works on my laptop". Deploy targets: PaaS (Render/Railway/Fly pulling images), a VPS (docker compose pull + up), or K8s. Images + tags = auditable, rollbackable artifacts.

---

## Experiments

1. **CI: The Reviewer That Never Tires**
2. **Services: Testing Against a Real Database**
3. **check --deploy: One-Command Audit**
4. **CD: From Image to Production**

---

## Challenge

Finish the pipeline: (1) add branch protection: the workflow runs only on pushes to main, (2) add a separate deploy job (needs: test) pulling the image on a VPS server via SSH (or write a Render/Railway deployment plan), (3) add pip caching to the workflow (actions/cache or setup-python cache) and measure the speedup, (4) write a short POST-MORTEM: introduce a deliberate bug (failing test), push, document the red → green flow.

---

## Summary

CI = test + audit on every push. Services = real DBs. check --deploy = automatic audit. CD = the same image to production. Next: capstone.
