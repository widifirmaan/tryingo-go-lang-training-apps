# Docker Concepts

> **Kategori:** Docker | **Level:** Beginner | **Minggu 1:** Docker Concepts

## Why This Matters

Docker answers the classic "works on my machine" problem by packaging apps with their entire environment. It is the backbone of modern deployment - CI/CD, Kubernetes, clouds - everything starts here.

Practice program: *"Hello, Docker!"*. Run the code in the Playground to examine how it works.


## Learning Objectives

- Understand Docker concepts: images, containers, registries
- Docker installation: Docker Desktop, Docker Engine
- Docker architecture: Client, Daemon, Containerd, runc
- Basic commands: run, ps, images, pull, exec
- Common flags: -d, --name, -p, -v, -e, --rm


## Foundations: Before Writing Code

This section is for readers who are **completely new** to programming. The concepts are identical across every language - learn them once, use them forever.

- **Files & folders = where programs live.** A program is plain text saved in a file (e.g. `lesson.md`). Files have **extensions** that indicate the language: `.md`, `.go`, `.py`, `.html`. A folder holding all of a program's files is called a **project**.
- **Terminal / command line.** A text window where you type commands: `cd folder` (change folder), `ls` / `dir` (list contents), `go run main.go` (run a program). Programs run from the folder containing their files.
- **Compiled vs interpreted.** **Compiled** languages (Go, Rust, C#) translate the whole program into machine instructions before running - fast, but require a build step. **Interpreted** languages (Python, PHP, JavaScript) execute line by line directly - great for learning and quick prototypes. The playgrounds on this site execute code **inside your browser**, so no installation is needed.
- **Statically typed vs dynamically typed.** **Statically typed** languages (Go, Rust, TypeScript) check data types (numbers, text) while you write - errors surface early. **Dynamically typed** languages (Python, PHP, JavaScript) check types while the program runs - more lenient, but errors appear at runtime.
- **How to read error messages.** Read the last line first: the error type plus a short explanation, then locate the **line number** it mentions. Errors are not tragedies - they are the computer telling you what to fix.
- **REPL / playground.** A REPL (Read-Eval-Print Loop) is a code "calculator": type one line, see the result instantly. Every code block on this site has a **Try in Playground** button letting you tweak and run the code live - the fastest way to learn: change a little, run, observe the difference.

> **Important note:** the browser playground has limitations - it cannot receive interactive keyboard input (stdin). If a challenge asks for "user input", simply write the value directly into a variable (e.g. `let name = "Budi"`; `rupiah = 250000`) and run.

---

---

## Quick Start Guide: Setup & Project Initialization

> **Try it directly in the browser without local setup.** All code blocks can run directly in the Playground.

Before exploring the lesson theory and code examples below, set up your local development environment with these step-by-step instructions:

### 1. Runtime & Dependency Installation (Docker Engine / Docker Desktop)
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

> **Prerequisite Note:** Ensure WSL 2 is enabled on Windows prior to running Docker Desktop.

---

### 2. Initializing a Blank Project (Scaffolding)
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

### 3. Running the Local Dev Server & First Entry File
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

### 4. New Project Directory Structure
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

### 5. Beginner Tips & Best Practices
- Run `docker compose ps` to inspect running service statuses.
- Use `docker compose logs -f` to tail real-time output streams from all running containers.

---

## Program: Hello, Docker!

```bash
# ----------------------------─
# DOCKER CONCEPTS - Fundamental Commands
# ----------------------------─

# Check Docker installation
docker --version
docker info

# Hello World - verifikasi Docker berjalan
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
