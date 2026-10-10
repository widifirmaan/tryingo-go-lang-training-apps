# CI/CD Pipelines

> **Kategori:** Docker | **Level:** Advanced | **Minggu 10:** CI/CD Pipelines

## Learning Objectives

- GitHub Actions workflows for Docker CI/CD
- Build, test, push, deploy pipelines
- Multi-stage pipelines with dependencies
- Registries: GHCR, Docker Hub, ECR
- GitLab CI and Jenkins pipelines

---

## Program: GitHub Actions

```bash
# ─────────────────────────────────────────────────────────
# DOCKER CI/CD — GitHub Actions Pipeline
# ─────────────────────────────────────────────────────────

# File: .github/workflows/docker.yml
cat << 'EOF' > docker-ci.yml
name: Docker CI/CD

on:
  push:
    branches: [main]
  pull_request:
    branches: [main]

env:
  REGISTRY: ghcr.io
  IMAGE_NAME: ${{ github.repository }}

jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4

      - name: Run tests
        run: |
          docker compose -f docker-compose.test.yml up --abort-on-container-exit

  build:
    needs: test
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4

      - name: Login to Registry
        uses: docker/login-action@v3
        with:
          registry: ${{ env.REGISTRY }}
          username: ${{ github.actor }}
          password: ${{ secrets.GITHUB_TOKEN }}

      - name: Build and push
        uses: docker/build-push-action@v5
        with:
          context: .
          push: true
          tags: |
            ${{ env.REGISTRY }}/${{ env.IMAGE_NAME }}:latest
            ${{ env.REGISTRY }}/${{ env.IMAGE_NAME }}:${{ github.sha }}

  deploy:
    needs: build
    runs-on: ubuntu-latest
    if: github.ref == 'refs/heads/main'
    steps:
      - name: Deploy to server
        run: |
          ssh user@server "docker pull ${{ env.REGISTRY }}/${{ env.IMAGE_NAME }}:latest && docker compose up -d"
EOF

# ─────────────────────────────────────────────────────────
# GitLab CI Example
# ─────────────────────────────────────────────────────────
# stages: [test, build, deploy]
# build:
#   stage: build
#   script:
#     - docker build -t $CI_REGISTRY_IMAGE:$CI_COMMIT_SHA .
#     - docker push $CI_REGISTRY_IMAGE:$CI_COMMIT_SHA

# ─────────────────────────────────────────────────────────
# Jenkins Pipeline
# ─────────────────────────────────────────────────────────
# pipeline {
#   agent any
#   stages {
#     stage('Build') {
#       steps { sh 'docker build -t myapp .' }
#     }
#     stage('Test') {
#       steps { sh 'docker run myapp npm test' }
#     }
#     stage('Push') {
#       steps { sh 'docker push myapp:latest' }
#     }
#   }
# }
```

---

## Key Concepts

### CI/CD Pipelines
Automate build, test, and deploy with Docker.

### GitHub Actions
Workflow files triggered by push/PR events.

### Pipeline Stages
Test → Build → Push → Deploy.

### Registries
GHCR, Docker Hub, ECR for different needs.

### Best Practices
Layer caching, vulnerability scanning, image signing.

---

## Experiments

- Create GitHub Actions workflow for your project
- Experiment with multi-stage pipelines
- Try building and pushing to GHCR
- Create pipeline with matrix builds
- Experiment with deployment strategies

---

## Challenge

Build a complete CI/CD pipeline: test → build → scan → push → deploy. Choose platform: GitHub Actions or GitLab CI.

---

## Summary

Week 10 of 12: **CI/CD Pipelines** (Level: Advanced). Docker automation. Next week: **Orchestration**.
