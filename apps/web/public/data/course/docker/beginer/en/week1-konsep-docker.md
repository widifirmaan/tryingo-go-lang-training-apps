# Docker Concepts

> **Kategori:** Docker | **Level:** Beginner | **Minggu 1:** Docker Concepts

## Learning Objectives

- Understand Docker concepts: images, containers, registries
- Docker installation: Docker Desktop, Docker Engine
- Docker architecture: Client, Daemon, Containerd, runc
- Basic commands: run, ps, images, pull, exec
- Common flags: -d, --name, -p, -v, -e, --rm

---

## Quick Start Guide: Setup & Project Initialization

Before exploring the lesson theory and code examples below, set up your local development environment with these step-by-step instructions:

### 1. VS Code Setup & Recommended Extensions
Use [Visual Studio Code](https://code.visualstudio.com/) as your primary code editor. Install these essential extensions:
- **Docker for VS Code** (`ms-azuretools.vscode-docker`): Manage containers, images, volumes, and get Dockerfile intellisense

Or install all recommended extensions at once via terminal:
```bash
code --install-extension ms-azuretools.vscode-docker
```

---

### 2. Runtime & Dependency Installation (Docker Engine / Docker Desktop)
Make sure the required runtime or SDK is installed on your machine:

**Windows (PowerShell):**
```powershell
winget install Docker.DockerDesktop
```

**macOS (Terminal / Homebrew):**
```bash
brew install --cask docker
```

**Linux (Ubuntu/Debian / bash):**
```bash
curl -fsSL https://get.docker.com | sh && sudo usermod -aG docker $USER
```

**Verify Installation:**
Run this command in your terminal to ensure tools are properly configured:
```bash
docker --version && docker compose version
```

Expected output:
```output
Docker version 26.x.x
Docker Compose version v2.x.x
```

> 💡 **Prerequisite Note:** Ensure WSL 2 is enabled on Windows prior to running Docker Desktop.

---

### 3. Initializing a Blank Project (Scaffolding)
Generate a brand-new project workspace using the official CLI command:

```bash
mkdir my-docker-app && cd my-docker-app
touch compose.yaml
```
- **Details:** Sets up a modern declarative multi-container compose.yaml file.
- **Navigate to the project directory:**
```bash
cd my-docker-app
```

---

### 4. Running the Local Dev Server & First Entry File
Start your local development server:

```bash
docker compose up -d
```
Open in browser or terminal: `http://localhost:80`

> ℹ️ Containers spin up in background detached mode.

**Initial Entry File (`compose.yaml`):**
```dockerfile
services:
  web:
    image: nginx:alpine
    ports:
      - "8080:80"
    restart: always

  database:
    image: postgres:16-alpine
    environment:
      POSTGRES_USER: devuser
      POSTGRES_PASSWORD: secretpassword
      POSTGRES_DB: appdb
    ports:
      - "5432:5432"
    volumes:
      - pgdata:/var/lib/postgresql/data

volumes:
  pgdata:
```
Complete compose.yaml definition with NGINX reverse proxy and persistent PostgreSQL.

---

### 5. New Project Directory Structure
Standard directory layout and file anatomy created by the scaffolder:

```text
my-docker-app/
├── compose.yaml         # Orkestrasi multi-kontainer
├── Dockerfile           # Instruksi pembuatan image aplikasi
├── .dockerignore        # File yang diabaikan saat build
└── app/                 # Source code aplikasi
```
Clean separation between image recipes (Dockerfile) and runtime topology (compose.yaml).

---

### 6. Beginner Tips & Best Practices
- Run `docker compose ps` to inspect running service statuses.
- Use `docker compose logs -f` to tail real-time output streams from all running containers.

---

## Program: Hello, Docker!

```bash
# ─────────────────────────────────────────────────────────
# DOCKER CONCEPTS — Fundamental Commands
# ─────────────────────────────────────────────────────────

# Check Docker installation
docker --version
docker info

# Hello World — verifikasi Docker berjalan
docker run hello-world

# Docker Architecture:
# Docker Client → Docker Daemon → Containerd → runc → Container

# Image vs Container:
# Image = template/blueprint (read-only)
# Container = running instance dari image

# Basic Commands
docker ps                    # List running containers
docker ps -a                 # List all containers (including stopped)
docker images                # List downloaded images
docker pull nginx            # Download image tanpa run
docker search ubuntu         # Cari image di Docker Hub

# Run container sederhana
docker run hello-world

# Run container dengan options
docker run -d --name my-nginx -p 8080:80 nginx

# Flags:
# -d        : detached mode (background)
# --name    : nama container
# -p        : port mapping (host:container)
# -v        : volume mount
# -e        : environment variable
# --rm      : auto-remove saat stop

# Lihat logs container
docker logs my-nginx
docker logs -f my-nginx      # Follow logs

# Execute command di container yang berjalan
docker exec -it my-nginx bash

# Stop dan remove container
docker stop my-nginx
docker rm my-nginx

# Remove image
docker rmi nginx
```

---

## Key Concepts

### Docker
Platform for developing, shipping, and running applications in containers.

### Images vs Containers
Images are read-only templates. Containers are running instances.

### Registries
Docker Hub for public images. Private registries for enterprise.

### Architecture
CLI → Daemon → Containerd → runc → Container.

### Basic Workflow
Pull image → Run container → Manage lifecycle.

---

## Experiments

- Pull various images and run containers
- Experiment with different flags
- Try exec bash in ubuntu container
- Run containers with different port mappings
- Experiment with environment variables

---

## Challenge

Set up web server: pull nginx image, run container, access in browser, customize page.

---

## Summary

Week 1 of 12: **Docker Concepts** (Level: Beginner). Containerization fundamentals. Next week: **Images & Registries**.
