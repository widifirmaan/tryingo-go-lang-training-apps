# CI/CD Pipeline

> **Kategori:** Docker | **Level:** Lanjutan | **Minggu 10:** CI/CD Pipeline

## Tujuan Pembelajaran

- GitHub Actions workflow untuk Docker CI/CD
- Build, test, push, deploy pipeline
- Multi-stage pipeline dengan dependencies
- Registry: GHCR, Docker Hub, ECR
- GitLab CI dan Jenkins pipeline

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

## Konsep Kunci

### CI/CD Pipeline
Automate build, test, dan deploy dengan Docker.

### GitHub Actions
Workflow file di .github/workflows/. Trigger pada push/PR.

### Pipeline Stages
1. Test: run unit/integration tests
2. Build: build Docker image
3. Push: push ke registry
4. Deploy: deploy ke server

### Registry
- GHCR: GitHub Container Registry
- Docker Hub: public registry
- ECR: AWS Elastic Container Registry

### Best Practices
- Cache layers untuk build cepat
- Scan image untuk vulnerabilities
- Sign image untuk integrity

---

## Eksperimen

- Buat GitHub Actions workflow untuk project sendiri
- Eksperimen dengan multi-stage pipeline
- Coba build dan push ke GHCR
- Buat pipeline dengan matrix build
- Eksperimen dengan deployment strategies

---

## Tantangan

Buat CI/CD pipeline lengkap: test → build → scan → push → deploy. Pilih platform: GitHub Actions atau GitLab CI.

---

## Ringkasan

Minggu 10 dari 12: **CI/CD Pipeline** (Level: Lanjutan). Automation untuk Docker. Minggu depan: **Orchestration**.
