# CI/CD Pipeline — Automatic Shop Factory

> **Kategori:** Docker | **Level:** Advanced | **Minggu 10:** CI/CD Pipeline

## Learning Objectives

- `.github/workflows/docker.yml` (`on: push`, `build`, `push` to GHCR) factory on every `git push` (source: docs.github.com/actions + docker/build-push-action)
- `trivy` scan in factory → fails on CRITICAL

---

## Why This Matters (Non-IT)

Without CI/CD, deploy = manual `build` + `push` + `ssh` + `pull` 15 minutes + forgotten tests. With a factory, `git push` → test → scan → push registry automatically in 3 minutes. Forgotten scan? Factory rejects.

---

## Program: Shop Docker Factory

```yaml
# .github/workflows/docker.yml — factory
name: Shop CI/CD
on:
  push:
    branches: [main]

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4

      - name: Build
        run: docker build -t ghcr.io/shop/app:${{ github.sha }} .

      - name: Scan (reject on CRITICAL!)
        uses: aquasecurity/trivy-action@master
        with:
          image-ref: ghcr.io/shop/app:${{ github.sha }}
          exit-code: "1"
          severity: "CRITICAL"

      - name: Push
        run: |
          echo ${{ secrets.GITHUB_TOKEN }} | docker login ghcr.io -u shop --password-stdin
          docker push ghcr.io/shop/app:${{ github.sha }}
```

`git push` → Actions tab green? → image in `ghcr.io`.

---

## Key Concepts

### `on: push` + `jobs` = Trigger + Machines
Push → `ubuntu` machine runs steps in order.

### `trivy exit-code: 1` = Reject Dangerous
CRITICAL → factory red, no push.

### GHCR = GitHub Warehouse
`ghcr.io/shop/app:sha` unique version per commit.

---

## Beginner Friendly Explanation

### Analogy: Automatic Bread Factory
- **push = order in**, **build = bake**, **trivy = QC**, **push registry = ship to store**.

### Step 0 — Prepare Device
- GitHub repo + Actions enabled (free) + `Dockerfile` present.

### How the Computer Reads It
1. `git push` → GitHub reads YAML → rents `ubuntu` → steps 1-2-3.
2. Trivy CRITICAL → `exit 1` → red, stop.

### 3 Must-Know Terms
1. **CI/CD/workflow**: factory/factory-recipe
2. **GHCR/secret**: warehouse/key

---

## Experiments

- **Green:** Push a README edit → Actions green?
- **Yellow:** Deliberately old base image → Trivy red? Update base.
- **Red:** Remove `exit-code` → CRITICAL slips through? (Don't! Keep it.)

---

## Challenge

**Running Factory:** Green pipeline + pushed image + Trivy gate proof screenshot. **Advanced Docker in progress!**

---

## Mini Glossary

- **CI/CD/GHCR**: factory/warehouse

---

## Summary

Week 10 of 12: **Auto Factory** (Level: Advanced). Push → scanned → shipped. Next: **Orchestration**.
