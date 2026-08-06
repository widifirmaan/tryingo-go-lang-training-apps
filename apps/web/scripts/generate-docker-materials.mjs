import { BaseGenerator } from './lib/base-generator.mjs';

// ─────────────────────────────────────────────────────────────────────────────
// DOCKER CURRICULUM — pure research, zero framework influence
// Sources: Official Docker Docs, Docker Deep Dive (Nigel Poulton),
//          Docker Mastery (Bret Fisher), Katacoda, Play with Docker,
//          Dockerfile reference, Compose specification
// ─────────────────────────────────────────────────────────────────────────────
// Research consensus: 3 levels, 12 weeks total
//   Beginner (4w): concepts → images → containers → Dockerfile
//   Intermediate (4w): volumes → networking → compose → multi-stage
//   Advanced (4w): security → CI/CD → orchestration → project
// Total: 12 weeks
// ─────────────────────────────────────────────────────────────────────────────

const gen = new BaseGenerator('docker', 'Docker');

const LEVELS = [
  {
    levelId: 'beginer',
    nameId: 'Pemula',
    nameEn: 'Beginner',
    descId: 'Fundamental Docker: konsep, image, container, Dockerfile — urutan resmi Docker Docs.',
    descEn: 'Docker fundamentals: concepts, images, containers, Dockerfile — official Docker Docs order.',
  },
  {
    levelId: 'intermediate',
    nameId: 'Menengah',
    nameEn: 'Intermediate',
    descId: 'Docker workflows: volume, network, compose, multi-stage build — Docker Deep Dive pathway.',
    descEn: 'Docker workflows: volumes, networking, compose, multi-stage builds — Docker Deep Dive pathway.',
  },
  {
    levelId: 'advanced',
    nameId: 'Lanjutan',
    nameEn: 'Advanced',
    descId: 'Docker production: security, CI/CD, orchestration, Kubernetes, capstone project.',
    descEn: 'Production Docker: security, CI/CD, orchestration, Kubernetes, capstone project.',
  },
];

const MODULES = [
  // ── BEGINNER (weeks 1-4) ──────────────────────────────────────────────────
  {
    week: 1, level: 'beginer', topicId: 'konsep-docker',
    titleId: 'Konsep Docker', titleEn: 'Docker Concepts',
    programId: 'Halo, Docker!', programEn: 'Hello, Docker!',
    levelNameId: 'Pemula', levelNameEn: 'Beginner',
    language: 'bash',
    code: `# ─────────────────────────────────────────────────────────
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
docker rmi nginx`,
    objectivesId: [
      'Memahami konsep Docker: image, container, registry',
      'Instalasi Docker: Docker Desktop, Docker Engine',
      'Docker architecture: Client, Daemon, Containerd, runc',
      'Perintah dasar: run, ps, images, pull, exec',
      'Flags umum: -d, --name, -p, -v, -e, --rm',
    ],
    objectivesEn: [
      'Understand Docker concepts: images, containers, registries',
      'Docker installation: Docker Desktop, Docker Engine',
      'Docker architecture: Client, Daemon, Containerd, runc',
      'Basic commands: run, ps, images, pull, exec',
      'Common flags: -d, --name, -p, -v, -e, --rm',
    ],
    explanationId: '### Docker\nPlatform untuk develop, ship, dan run application dalam container.\n\n### Image vs Container\nImage = template read-only. Container = running instance dari image.\n\n### Registry\nDocker Hub = public registry. Private registry untuk enterprise.\n\n### Architecture\n- Docker CLI: user interface\n- Docker Daemon: manage containers\n- Containerd: container runtime management\n- runc: low-level runtime\n\n### Basic Workflow\n1. Pull image: `docker pull nginx`\n2. Run container: `docker run -d nginx`\n3. Manage: `docker ps`, `docker stop`, `docker rm`',
    explanationEn: '### Docker\nPlatform for developing, shipping, and running applications in containers.\n\n### Images vs Containers\nImages are read-only templates. Containers are running instances.\n\n### Registries\nDocker Hub for public images. Private registries for enterprise.\n\n### Architecture\nCLI → Daemon → Containerd → runc → Container.\n\n### Basic Workflow\nPull image → Run container → Manage lifecycle.',
    experimentsId: [
      'Pull berbagai image dan run container',
      'Eksperimen dengan flags berbeda',
      'Coba exec bash di container ubuntu',
      'Run container dengan port mapping berbeda',
      'Eksperimen dengan environment variable',
    ],
    experimentsEn: [
      'Pull various images and run containers',
      'Experiment with different flags',
      'Try exec bash in ubuntu container',
      'Run containers with different port mappings',
      'Experiment with environment variables',
    ],
    challengeId: 'Setup web server: pull nginx image, run container, akses di browser, customize halaman.',
    challengeEn: 'Set up web server: pull nginx image, run container, access in browser, customize page.',
    summaryId: 'Minggu 1 dari 12: **Konsep Docker** (Level: Pemula). Containerization fundamentals. Minggu depan: **Image & Registry**.',
    summaryEn: 'Week 1 of 12: **Docker Concepts** (Level: Beginner). Containerization fundamentals. Next week: **Images & Registries**.',
  },
  {
    week: 2, level: 'beginer', topicId: 'image-registry',
    titleId: 'Image & Registry', titleEn: 'Images & Registries',
    programId: 'Build & Push Image', programEn: 'Build & Push Images',
    levelNameId: 'Pemula', levelNameEn: 'Beginner',
    language: 'bash',
    code: `# ─────────────────────────────────────────────────────────
# DOCKER IMAGES & REGISTRIES
# ─────────────────────────────────────────────────────────

# Lihat semua image lokal
docker images
docker image ls

# Pull image dari Docker Hub
docker pull nginx:1.25
docker pull ubuntu:22.04
docker pull node:20-alpine

# Image layers — setiap command di Dockerfile adalah layer
docker history nginx

# Inspect image
docker inspect nginx

# Tag image
docker tag nginx:1.25 my-nginx:v1.0

# Push ke Docker Hub (login dulu)
docker login
docker tag my-nginx:v1.0 username/my-nginx:v1.0
docker push username/my-nginx:v1.0

# Search image
docker search mysql
docker search --filter=stars=1000 nginx

# Remove image
docker rmi nginx
docker image prune       # Remove unused images
docker image prune -a    # Remove ALL unused images

# Save dan load image (offline transfer)
docker save -o nginx.tar nginx:1.25
docker load -i nginx.tar

# Import dan export container
docker export my-container > container.tar
docker import container.tar my-image:v1

# Multi-architecture images
docker buildx ls
docker buildx build --platform linux/amd64,linux/arm64 -t myapp .

# Image best practices:
# 1. Gunakan official image
# 2. Pilih small base image (alpine, distroless)
# 3. Pin version tag (hindari :latest)
# 4. Gabung RUN commands untuk minimize layers
# 5. Gunakan .dockerignore`,
    objectivesId: [
      'Image layers: setiap command adalah layer',
      'Pull, tag, push image ke registry',
      'Docker Hub: search, pull, push image',
      'Save/load image untuk offline transfer',
      'Best practices: small image, pin version, minimize layers',
    ],
    objectivesEn: [
      'Image layers: each command is a layer',
      'Pull, tag, push images to registries',
      'Docker Hub: search, pull, push images',
      'Save/load images for offline transfer',
      'Best practices: small images, pin versions, minimize layers',
    ],
    explanationId: '### Image Layers\nSetiap instruction di Dockerfile membuat layer. Layer di-cache untuk build lebih cepat.\n\n### Registry\nDocker Hub = default registry. Bisa buat private registry.\n\n### Tag\n`docker tag source target` — rename/reversion image.\n\n### Push Flow\n1. `docker login`\n2. `docker tag image username/repo:tag`\n3. `docker push username/repo:tag`\n\n### Best Practices\n- Gunakan alpine/distroless untuk image kecil\n- Pin version (hindari :latest)\n- Gabung RUN: `RUN apt update && apt install -y ...`',
    explanationEn: '### Image Layers\nEach Dockerfile instruction creates a cached layer.\n\n### Registries\nDocker Hub is the default. Private registries for enterprise.\n\n### Tagging\nRename and version images with docker tag.\n\n### Push Flow\nLogin → Tag → Push to registry.\n\n### Best Practices\nUse small base images, pin versions, minimize layers.',
    experimentsId: [
      'Pull berbagai image dan lihat layers',
      'Eksperimen dengan image tagging',
      'Coba save dan load image',
      'Buat akun Docker Hub dan push image',
      'Eksperimen dengan multi-arch build',
    ],
    experimentsEn: [
      'Pull various images and observe layers',
      'Experiment with image tagging',
      'Try saving and loading images',
      'Create Docker Hub account and push image',
      'Experiment with multi-arch builds',
    ],
    challengeId: 'Buat image custom: pull ubuntu, install nginx, buat halaman custom, push ke Docker Hub.',
    challengeEn: 'Create custom image: pull ubuntu, install nginx, make custom page, push to Docker Hub.',
    summaryId: 'Minggu 2 dari 12: **Image & Registry** (Level: Pemula). Manajemen image Docker. Minggu depan: **Container Management**.',
    summaryEn: 'Week 2 of 12: **Images & Registries** (Level: Beginner). Docker image management. Next week: **Container Management**.',
  },
  {
    week: 3, level: 'beginer', topicId: 'container-management',
    titleId: 'Container Management', titleEn: 'Container Management',
    programId: 'Lifecycle & Exec', programEn: 'Lifecycle & Exec',
    levelNameId: 'Pemula', levelNameEn: 'Beginner',
    language: 'bash',
    code: `# ─────────────────────────────────────────────────────────
# CONTAINER MANAGEMENT — Lifecycle & Operations
# ─────────────────────────────────────────────────────────

# Run container dengan berbagai options
docker run -d \\
  --name my-app \\
  -p 3000:3000 \\
  -v /data:/app/data \\
  -e NODE_ENV=production \\
  --restart unless-stopped \\
  --memory 512m \\
  --cpus 1.0 \\
  node:20-alpine

# Container lifecycle
docker start my-app          # Start stopped container
docker stop my-app           # Graceful stop (SIGTERM)
docker kill my-app           # Force stop (SIGKILL)
docker restart my-app        # Restart container
docker pause my-app          # Pause (freeze)
docker unpause my-app        # Unpause

# Auto-restart policies:
# no           : tidak auto-restart
# on-failure   : restart jika exit code != 0
# always       : selalu restart
# unless-stopped: restart kecuali di-stop manual

# Lihat container
docker ps                    # Running containers
docker ps -a                 # All containers
docker ps -q                 # Only container IDs
docker ps --format "table {{.ID}}\\t{{.Names}}\\t{{.Status}}"

# Container stats
docker stats                 # Real-time resource usage
docker stats my-app          # Stats satu container

# Logs
docker logs my-app           # Semua logs
docker logs -f my-app        # Follow logs (tail -f)
docker logs --tail 100 my-app # 100 baris terakhir
docker logs -t my-app        # Dengan timestamp

# Execute command di container
docker exec my-app ls /app            # Single command
docker exec -it my-app bash           # Interactive shell
docker exec -u root my-app bash       # Sebagai root
docker exec -w /tmp my-app pwd        # Set working directory

# Copy file ke/dari container
docker cp local-file my-app:/app/
docker cp my-app:/app/log.txt ./

# Inspect container
docker inspect my-app
docker inspect --format='{{.State.Status}}' my-app

# Remove container
docker rm my-app             # Remove stopped container
docker rm -f my-app          # Force remove (running)
docker container prune       # Remove all stopped containers`,
    objectivesId: [
      'Container lifecycle: create, start, stop, restart, remove',
      'Auto-restart policies: no, on-failure, always, unless-stopped',
      'Resource limits: --memory, --cpus',
      'Logs dan stats: monitoring container',
      'exec dan copy: akses container yang berjalan',
    ],
    objectivesEn: [
      'Container lifecycle: create, start, stop, restart, remove',
      'Auto-restart policies: no, on-failure, always, unless-stopped',
      'Resource limits: --memory, --cpus',
      'Logs and stats: monitoring containers',
      'exec and copy: accessing running containers',
    ],
    explanationId: '### Lifecycle\nCreate → Start → Run → Stop → Remove. Container bersifat ephemeral.\n\n### Restart Policies\n- no: default, tidak restart\n- on-failure: restart jika error\n- always: selalu restart\n- unless-stopped: restart kecuali di-stop manual\n\n### Resource Limits\n`--memory 512m` limit RAM. `--cpus 1.0` limit CPU.\n\n### Logs\n`docker logs -f` untuk real-time. `--tail` untuk limit output.\n\n### Exec\n`docker exec -it` untuk interactive shell di container.',
    explanationEn: '### Lifecycle\nCreate → Start → Run → Stop → Remove. Containers are ephemeral.\n\n### Restart Policies\nControl when containers automatically restart.\n\n### Resource Limits\nLimit memory and CPU usage per container.\n\n### Logs\nMonitor container output with docker logs.\n\n### Exec\nAccess running containers with interactive shell.',
    experimentsId: [
      'Run container dengan resource limits',
      'Eksperimen dengan restart policies',
      'Coba exec di berbagai container',
      'Copy file antara host dan container',
      'Monitor stats container',
    ],
    experimentsEn: [
      'Run containers with resource limits',
      'Experiment with restart policies',
      'Try exec in different containers',
      'Copy files between host and container',
      'Monitor container stats',
    ],
    challengeId: 'Setup development environment: run Node.js container dengan volume mount, akses shell, install dependencies.',
    challengeEn: 'Set up development environment: run Node.js container with volume mount, access shell, install dependencies.',
    summaryId: 'Minggu 3 dari 12: **Container Management** (Level: Pemula). Operasional container sehari-hari. Minggu depan: **Dockerfile**.',
    summaryEn: 'Week 3 of 12: **Container Management** (Level: Beginner). Daily container operations. Next week: **Dockerfiles**.',
  },
  {
    week: 4, level: 'beginer', topicId: 'dockerfile',
    titleId: 'Dockerfile', titleEn: 'Dockerfile',
    programId: 'Build Custom Image', programEn: 'Building Custom Images',
    levelNameId: 'Pemula', levelNameEn: 'Beginner',
    language: 'dockerfile',
    code: `# ─────────────────────────────────────────────────────────
# DOCKERFILE — Build Custom Image
# ─────────────────────────────────────────────────────────

# File: Dockerfile
FROM node:20-alpine

# Metadata
LABEL maintainer="developer@example.com"
LABEL version="1.0"
LABEL description="Node.js App"

# Environment variable
ENV NODE_ENV=production
ENV PORT=3000

# Working directory
WORKDIR /app

# Copy dependency files (layer caching)
COPY package.json package-lock.json ./

# Install dependencies
RUN npm ci --only=production

# Copy application code
COPY . .

# Create non-root user
RUN addgroup -S appgroup && adduser -S appuser -G appgroup
USER appuser

# Expose port (dokumentasi, tidak publish)
EXPOSE 3000

# Health check
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \\
  CMD wget --no-verbose --tries=1 --spider http://localhost:3000/health || exit 1

# Start command
CMD ["node", "server.js"]

# ─────────────────────────────────────────────────────────
# Build & Run
# ─────────────────────────────────────────────────────────

# Build image
# docker build -t my-node-app:1.0 .
# docker build -t my-node-app:1.0 -f Dockerfile.prod .

# Run container dari image
# docker run -d -p 3000:3000 --name app my-node-app:1.0

# ─────────────────────────────────────────────────────────
# Dockerfile Instructions:
# ─────────────────────────────────────────────────────────
# FROM      : base image
# RUN       : execute command saat build
# COPY      : copy file dari host ke image
# ADD       : seperti COPY, support URL dan tar
# WORKDIR   : set working directory
# ENV       : environment variable
# ARG       : build-time variable
# EXPOSE    : dokumentasi port
# CMD       : default command saat container start
# ENTRYPOINT: command yang selalu dijalankan
# USER      : switch user
# LABEL     : metadata
# HEALTHCHECK: health check
# VOLUME    : mount point

# ─────────────────────────────────────────────────────────
# .dockerignore
# ─────────────────────────────────────────────────────────
# node_modules
# .git
# .env
# *.log
# Dockerfile
# .dockerignore`,
    objectivesId: [
      'Dockerfile instructions: FROM, RUN, COPY, WORKDIR, CMD',
      'Layer caching: urutan instruction mempengaruhi cache',
      'Environment variables: ENV vs ARG',
      'EXPOSE dan HEALTHCHECK',
      '.dockerignore untuk exclude file',
    ],
    objectivesEn: [
      'Dockerfile instructions: FROM, RUN, COPY, WORKDIR, CMD',
      'Layer caching: instruction order affects cache',
      'Environment variables: ENV vs ARG',
      'EXPOSE and HEALTHCHECK',
      '.dockerignore to exclude files',
    ],
    explanationId: '### Dockerfile\nBlueprint untuk build image. Setiap instruction = satu layer.\n\n### Layer Cache\nJika instruction tidak berubah, Docker pakai cache. Urutan penting: taruh yang jarang berubah di atas.\n\n### COPY vs ADD\nCOPY lebih disederhana. ADD support URL dan auto-extract tar.\n\n### CMD vs ENTRYPOINT\nCMD bisa override. ENTRYPOINT selalu dijalankan. Bisa kombinasi.\n\n### HEALTHCHECK\nDocker cek health container. Unhealthy container bisa di-restart.\n\n### .dockerignore\nExclude file dari build context. Mengurangi build time dan image size.',
    explanationEn: '### Dockerfile\nBlueprint for building images. Each instruction creates a layer.\n\n### Layer Caching\nDocker caches unchanged layers. Order instructions strategically.\n\n### COPY vs ADD\nCOPY for simple file copying. ADD for URLs and tar extraction.\n\n### CMD vs ENTRYPOINT\nCMD can be overridden. ENTRYPOINT always runs.\n\n### HEALTHCHECK\nDocker monitors container health.\n\n### .dockerignore\nExclude files from build context.',
    experimentsId: [
      'Buat Dockerfile untuk aplikasi Python',
      'Eksperimen dengan layer caching',
      'Coba HEALTHCHECK dengan berbagai interval',
      'Buat .dockerignore dan lihat perbedaan build',
      'Eksperimen dengan CMD vs ENTRYPOINT',
    ],
    experimentsEn: [
      'Create Dockerfile for Python application',
      'Experiment with layer caching',
      'Try HEALTHCHECK with different intervals',
      'Create .dockerignore and observe build differences',
      'Experiment with CMD vs ENTRYPOINT',
    ],
    challengeId: 'Buat Dockerfile untuk web app: multi-stage build, non-root user, health check, optimized layers.',
    challengeEn: 'Create Dockerfile for web app: multi-stage build, non-root user, health check, optimized layers.',
    summaryId: 'Minggu 4 dari 12: **Dockerfile** (Level: Pemula). Selesai fase Beginner! Minggu depan: **Volume & Data** (Intermediate).',
    summaryEn: 'Week 4 of 12: **Dockerfile** (Level: Beginner). Beginner phase complete! Next week: **Volumes & Data** (Intermediate).',
  },
  // ── INTERMEDIATE (weeks 5-8) ──────────────────────────────────────────────
  {
    week: 5, level: 'intermediate', topicId: 'volume-data',
    titleId: 'Volume & Data Persistence', titleEn: 'Volumes & Data Persistence',
    programId: 'Persistent Storage', programEn: 'Persistent Storage',
    levelNameId: 'Menengah', levelNameEn: 'Intermediate',
    language: 'bash',
    code: `# ─────────────────────────────────────────────────────────
# DOCKER VOLUMES — Data Persistence
# ─────────────────────────────────────────────────────────

# Volume types:
# 1. Named Volume — dikelola Docker
# 2. Bind Mount — path di host
# 3. tmpfs Mount — in-memory (Linux)

# Named Volume
docker volume create my-data
docker volume ls
docker volume inspect my-data
docker volume rm my-data
docker volume prune       # Remove unused volumes

# Run dengan named volume
docker run -d \\
  --name postgres-db \\
  -v pgdata:/var/lib/postgresql/data \\
  -e POSTGRES_PASSWORD=secret \\
  postgres:16

# Bind Mount
docker run -d \\
  --name dev-app \\
  -v $(pwd):/app \\
  -v /app/node_modules \\
  node:20-alpine

# Bind mount dengan read-only
docker run -v $(pwd)/config:/etc/config:ro nginx

# Volume di docker-compose
# volumes:
#   pgdata:
#   redis-data:

# Backup volume
docker run --rm \\
  -v pgdata:/data \\
  -v $(pwd):/backup \\
  alpine tar czf /backup/backup.tar.gz -C /data .

# Restore volume
docker run --rm \\
  -v pgdata:/data \\
  -v $(pwd):/backup \\
  alpine tar xzf /backup/backup.tar.gz -C /data

# Volume drivers (plugin)
# docker volume create --driver vieux/sshfs \\
#   -o sshcmd=user@host:/path \\
#   -o password=secret \\
#   sshvolume

# Inspect volume mount
docker inspect -f '{{ .Mounts }}' postgres-db

# Data-only container (legacy)
# docker create -v /data --name data-store alpine
# docker run --volumes-from data-store app`,
    objectivesId: [
      'Volume types: named volume, bind mount, tmpfs',
      'Named volume: dikelola Docker, portable',
      'Bind mount: path di host, untuk development',
      'Backup dan restore volume',
      'Volume drivers untuk storage backend',
    ],
    objectivesEn: [
      'Volume types: named volumes, bind mounts, tmpfs',
      'Named volumes: Docker-managed, portable',
      'Bind mounts: host paths, for development',
      'Backup and restore volumes',
      'Volume drivers for storage backends',
    ],
    explanationId: '### Volume Types\n- Named Volume: dikelola Docker, path di /var/lib/docker/volumes\n- Bind Mount: path spesifik di host\n- tmpfs: in-memory, hilang saat container stop\n\n### Named Volume\nPortable, bisa share antar container. Docker handle lifecycle.\n\n\n### Bind Mount\nDevelopment: mount source code ke container. Perubahan langsung terlihat.\n\n### Backup\nGunakan container sederhana untuk tar/zip volume data.\n\n### Volume Drivers\nPlugin untuk NFS, SSH, cloud storage, dll.',
    explanationEn: '### Volume Types\nNamed volumes, bind mounts, and tmpfs for different use cases.\n\n### Named Volumes\nDocker-managed, portable across containers.\n\n### Bind Mounts\nHost paths for development workflows.\n\n### Backup\nUse temporary containers to archive volume data.\n\n### Volume Drivers\nPlugins for various storage backends.',
    experimentsId: [
      'Buat named volume dan mount ke container',
      'Eksperimen dengan bind mount untuk development',
      'Backup dan restore volume database',
      'Coba volume di docker-compose',
      'Eksperimen dengan read-only mount',
    ],
    experimentsEn: [
      'Create named volume and mount to container',
      'Experiment with bind mounts for development',
      'Backup and restore database volume',
      'Try volumes in docker-compose',
      'Experiment with read-only mounts',
    ],
    challengeId: 'Setup PostgreSQL dengan persistent volume: create volume, run container, verify data persists setelah restart.',
    challengeEn: 'Set up PostgreSQL with persistent volume: create volume, run container, verify data persists after restart.',
    summaryId: 'Minggu 5 dari 12: **Volume & Data Persistence** (Level: Menengah). Data yang bertahan. Minggu depan: **Networking**.',
    summaryEn: 'Week 5 of 12: **Volumes & Data Persistence** (Level: Intermediate). Persistent data. Next week: **Networking**.',
  },
  {
    week: 6, level: 'intermediate', topicId: 'networking',
    titleId: 'Networking', titleEn: 'Networking',
    programId: 'Multi-Container Network', programEn: 'Multi-Container Networks',
    levelNameId: 'Menengah', levelNameEn: 'Intermediate',
    language: 'bash',
    code: `# ─────────────────────────────────────────────────────────
# DOCKER NETWORKING
# ─────────────────────────────────────────────────────────

# Network types:
# 1. Bridge — default, internal network
# 2. Host — share host network stack
# 3. None — no network
# 4. Overlay — multi-host (Swarm)
# 5. Macvlan — assign MAC address

# Lihat networks
docker network ls
docker network inspect bridge

# Create custom network
docker network create my-network
docker network create --driver bridge --subnet 172.20.0.0/16 my-net

# Run container di network tertentu
docker run -d --name web --network my-network nginx
docker run -d --name api --network my-network node:20-alpine

# Container bisa pakai nama sebagai hostname
# curl http://api:3000 dari container web

# Connect/disconnect network
docker network connect my-network my-container
docker network disconnect my-network my-container

# Port publishing
docker run -p 8080:80 nginx           # host:container
docker run -p 127.0.0.1:8080:80 nginx # bind ke localhost saja
docker run -P nginx                   # publish semua exposed ports

# DNS resolution
# Container di network yang sama bisa resolve nama container

# Network aliases
docker run --network my-network --network-alias backend nginx

# Inspect network
docker network inspect my-network

# Remove network
docker network rm my-network
docker network prune

# Host network (Linux only)
docker run --network host nginx

# None network
docker run --network none alpine

# Multi-network container
docker run -d --name app \\
  --network frontend \\
  --network backend \\
  my-app`,
    objectivesId: [
      'Network types: bridge, host, none, overlay, macvlan',
      'Custom network: create, connect, disconnect',
      'DNS resolution antar container',
      'Port publishing: -p host:container',
      'Network aliases dan multi-network',
    ],
    objectivesEn: [
      'Network types: bridge, host, none, overlay, macvlan',
      'Custom networks: create, connect, disconnect',
      'DNS resolution between containers',
      'Port publishing: -p host:container',
      'Network aliases and multi-network',
    ],
    explanationId: '### Network Types\n- Bridge: default, internal network antar container\n- Host: share host network (Linux only)\n- None: isolated, no network\n- Overlay: multi-host networking (Swarm)\n\n### Custom Network\nContainer di network yang sama bisa communicate via container name (DNS).\n\n### Port Publishing\n`-p 8080:80` — port 8080 di host forward ke port 80 di container.\n\n### DNS\nDocker embedded DNS server. Container resolve nama container lain di network yang sama.\n\n### Aliases\n`--network-alias` — nama tambahan untuk resolve.',
    explanationEn: '### Network Types\nBridge, host, none, overlay, and macvlan for different scenarios.\n\n### Custom Networks\nContainers on the same network communicate via DNS names.\n\n### Port Publishing\nMap host ports to container ports.\n\n### DNS\nDocker provides automatic DNS resolution between containers.\n\n### Aliases\nAdditional DNS names for containers.',
    experimentsId: [
      'Buat custom network dan connect 2 container',
      'Test DNS resolution antar container',
      'Eksperimen dengan port publishing',
      'Coba host network mode',
      'Buat multi-network setup',
    ],
    experimentsEn: [
      'Create custom network and connect 2 containers',
      'Test DNS resolution between containers',
      'Experiment with port publishing',
      'Try host network mode',
      'Create multi-network setup',
    ],
    challengeId: 'Setup multi-container app: web + api + database di network yang sama. Test communication.',
    challengeEn: 'Set up multi-container app: web + api + database on the same network. Test communication.',
    summaryId: 'Minggu 6 dari 12: **Networking** (Level: Menengah). Komunikasi antar container. Minggu depan: **Docker Compose**.',
    summaryEn: 'Week 6 of 12: **Networking** (Level: Intermediate). Inter-container communication. Next week: **Docker Compose**.',
  },
  {
    week: 7, level: 'intermediate', topicId: 'docker-compose',
    titleId: 'Docker Compose', titleEn: 'Docker Compose',
    programId: 'Multi-Container App', programEn: 'Multi-Container Apps',
    levelNameId: 'Menengah', levelNameEn: 'Intermediate',
    language: 'bash',
    code: `# ─────────────────────────────────────────────────────────
# DOCKER COMPOSE — Multi-Container Orchestration
# ─────────────────────────────────────────────────────────

# File: docker-compose.yml
cat << 'EOF' > docker-compose.yml
version: "3.8"

services:
  web:
    build: ./web
    ports:
      - "80:80"
    depends_on:
      - api
    networks:
      - frontend

  api:
    build: ./api
    ports:
      - "3000:3000"
    environment:
      - DATABASE_URL=postgres://user:pass@db:5432/mydb
      - REDIS_URL=redis://redis:6379
    depends_on:
      db:
        condition: service_healthy
      redis:
        condition: service_started
    networks:
      - frontend
      - backend

  db:
    image: postgres:16
    environment:
      POSTGRES_DB: mydb
      POSTGRES_USER: user
      POSTGRES_PASSWORD: pass
    volumes:
      - pgdata:/var/lib/postgresql/data
    healthcheck:
      test: ["CMD-SHELL", "pg_isready -U user -d mydb"]
      interval: 10s
      timeout: 5s
      retries: 5
    networks:
      - backend

  redis:
    image: redis:7-alpine
    volumes:
      - redis-data:/data
    networks:
      - backend

volumes:
  pgdata:
  redis-data:

networks:
  frontend:
  backend:
EOF

# Compose Commands
docker-compose up -d              # Start semua services
docker-compose up -d --build      # Build dan start
docker-compose down               # Stop dan remove
docker-compose down -v            # Stop + remove volumes
docker-compose logs -f            # Follow logs
docker-compose logs -f api        # Logs satu service
docker-compose ps                 # List services
docker-compose exec api bash      # Exec di service
docker-compose restart api        # Restart service
docker-compose scale api=3        # Scale service (v2)
docker-compose up -d --scale api=3 # Scale (v3)

# Compose profiles
# docker-compose --profile debug up`,
    objectivesId: [
      'docker-compose.yml: services, volumes, networks',
      'depends_on dengan health check condition',
      'Environment variables dan build context',
      'Compose commands: up, down, logs, exec, scale',
      'Profiles untuk environment berbeda',
    ],
    objectivesEn: [
      'docker-compose.yml: services, volumes, networks',
      'depends_on with health check conditions',
      'Environment variables and build contexts',
      'Compose commands: up, down, logs, exec, scale',
      'Profiles for different environments',
    ],
    explanationId: '### Docker Compose\nTool untuk define dan run multi-container applications.\n\n### Services\nSetiap service = satu container. Bisa build dari Dockerfile atau pakai image.\n\n### depends_on\n`condition: service_healthy` — tunggu health check passed.\n\n### Volumes & Networks\nDefine di top-level. Shared antar services.\n\n### Commands\n- `up -d`: start di background\n- `down`: stop dan remove\n- `logs -f`: follow logs\n- `exec`: jalankan command di container\n\n### Scale\n`--scale api=3` — jalankan 3 instance api.',
    explanationEn: '### Docker Compose\nDefine and run multi-container applications.\n\n### Services\nEach service maps to one container.\n\n### depends_on\nWait for dependencies to be healthy.\n\n### Volumes & Networks\nShared across services.\n\n### Commands\nStart, stop, view logs, execute commands.\n\n### Scaling\nRun multiple instances of a service.',
    experimentsId: [
      'Buat compose file dengan 3+ services',
      'Eksperimen dengan depends_on condition',
      'Coba scale service',
      'Buat compose dengan profiles',
      'Eksperimen dengan env_file',
    ],
    experimentsEn: [
      'Create compose file with 3+ services',
      'Experiment with depends_on conditions',
      'Try scaling services',
      'Create compose with profiles',
      'Experiment with env_file',
    ],
    challengeId: 'Buat full-stack app dengan compose: frontend, backend, database, cache. Health checks, volumes, networks.',
    challengeEn: 'Build full-stack app with compose: frontend, backend, database, cache. Health checks, volumes, networks.',
    summaryId: 'Minggu 7 dari 12: **Docker Compose** (Level: Menengah). Orchestration sederhana. Minggu depan: **Multi-Stage Build**.',
    summaryEn: 'Week 7 of 12: **Docker Compose** (Level: Intermediate). Simple orchestration. Next week: **Multi-Stage Builds**.',
  },
  {
    week: 8, level: 'intermediate', topicId: 'multi-stage-build',
    titleId: 'Multi-Stage Build', titleEn: 'Multi-Stage Builds',
    programId: 'Optimized Image', programEn: 'Optimized Images',
    levelNameId: 'Menengah', levelNameEn: 'Intermediate',
    language: 'dockerfile',
    code: `# ─────────────────────────────────────────────────────────
# MULTI-STAGE BUILD — Optimized Production Image
# ─────────────────────────────────────────────────────────

# File: Dockerfile (Node.js App)
# Stage 1: Build
FROM node:20-alpine AS builder
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm ci
COPY . .
RUN npm run build

# Stage 2: Production
FROM node:20-alpine AS production
WORKDIR /app
ENV NODE_ENV=production

# Copy hanya yang perlu dari builder
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/package.json ./
RUN npm ci --only=production && npm cache clean --force

# Non-root user
RUN addgroup -S appgroup && adduser -S appuser -G appgroup
USER appuser

EXPOSE 3000
HEALTHCHECK --interval=30s CMD wget --spider http://localhost:3000/health || exit 1
CMD ["node", "dist/server.js"]

# ─────────────────────────────────────────────────────────
# File: Dockerfile (Go App)
# ─────────────────────────────────────────────────────────
# Stage 1: Build
FROM golang:1.22-alpine AS builder
WORKDIR /app
COPY go.mod go.sum ./
RUN go mod download
COPY . .
RUN CGO_ENABLED=0 GOOS=linux go build -o /app/server .

# Stage 2: Production (distroless)
FROM gcr.io/distroless/static-debian12 AS production
COPY --from=builder /app/server /server
EXPOSE 8080
USER nonroot:nonroot
ENTRYPOINT ["/server"]

# ─────────────────────────────────────────────────────────
# File: Dockerfile (Python App)
# ─────────────────────────────────────────────────────────
# Stage 1: Build
FROM python:3.12-slim AS builder
WORKDIR /app
COPY requirements.txt .
RUN pip install --user --no-cache-dir -r requirements.txt

# Stage 2: Production
FROM python:3.12-slim AS production
WORKDIR /app
COPY --from=builder /root/.local /root/.local
COPY . .
ENV PATH=/root/.local/bin:$PATH
RUN adduser --disabled-password appuser
USER appuser
EXPOSE 8000
CMD ["python", "app.py"]

# ─────────────────────────────────────────────────────────
# Build & Compare
# ─────────────────────────────────────────────────────────
# docker build -t myapp:single -f Dockerfile.single .
# docker build -t myapp:multi -f Dockerfile .
# docker images | grep myapp
# Single stage: ~1GB
# Multi-stage: ~50MB`,
    objectivesId: [
      'Multi-stage build: multiple FROM dalam satu Dockerfile',
      'Build stage: compile, test, build artifacts',
      'Production stage: copy hanya artifacts, bukan tools',
      'Distroless base image untuk minimal attack surface',
      'Perbandingan image size: single vs multi-stage',
    ],
    objectivesEn: [
      'Multi-stage builds: multiple FROM in one Dockerfile',
      'Build stage: compile, test, build artifacts',
      'Production stage: copy only artifacts, not tools',
      'Distroless base images for minimal attack surface',
      'Image size comparison: single vs multi-stage',
    ],
    explanationId: '### Multi-Stage Build\nMultiple FROM dalam satu Dockerfile. Setiap FROM = stage baru.\n\n### Build Stage\nInstall dependencies, compile code, run tests. Bisa pakai image besar.\n\n### Production Stage\nCopy hanya artifacts dari build stage. Image kecil dan aman.\n\n### Distroless\nImage tanpa shell, package manager. Minimal attack surface.\n\n### Benefits\n- Image lebih kecil (1GB → 50MB)\n- Lebih aman (no build tools)\n- Build cache per stage',
    explanationEn: '### Multi-Stage Builds\nMultiple FROM instructions for different build phases.\n\n### Build Stage\nCompile and test with full toolchain.\n\n### Production Stage\nCopy only necessary artifacts.\n\n### Distroless\nMinimal images without shells or package managers.\n\n### Benefits\nSmaller images, better security, cached builds.',
    experimentsId: [
      'Buat multi-stage build untuk aplikasi sendiri',
      'Bandingkan image size single vs multi-stage',
      'Coba distroless base image',
      'Eksperimen dengan named stages',
      'Buat build dengan test stage',
    ],
    experimentsEn: [
      'Create multi-stage build for your application',
      'Compare single vs multi-stage image sizes',
      'Try distroless base images',
      'Experiment with named stages',
      'Create build with test stage',
    ],
    challengeId: 'Buat multi-stage build untuk aplikasi pilihan: build stage + production stage. Bandingkan ukuran image.',
    challengeEn: 'Create multi-stage build for your application: build stage + production stage. Compare image sizes.',
    summaryId: 'Minggu 8 dari 12: **Multi-Stage Build** (Level: Menengah). Selesai fase Intermediate! Minggu depan: **Security** (Advanced).',
    summaryEn: 'Week 8 of 12: **Multi-Stage Builds** (Level: Intermediate). Intermediate phase complete! Next week: **Security** (Advanced).',
  },
  // ── ADVANCED (weeks 9-12) ────────────────────────────────────────────────
  {
    week: 9, level: 'advanced', topicId: 'security',
    titleId: 'Security', titleEn: 'Security',
    programId: 'Secure Container', programEn: 'Secure Containers',
    levelNameId: 'Lanjutan', levelNameEn: 'Advanced',
    language: 'bash',
    code: `# ─────────────────────────────────────────────────────────
# DOCKER SECURITY — Best Practices
# ─────────────────────────────────────────────────────────

# 1. Non-root user
# Dockerfile:
# RUN addgroup -S appgroup && adduser -S appuser -G appgroup
# USER appuser

# 2. Read-only filesystem
docker run --read-only --tmpfs /tmp myapp

# 3. Drop capabilities
docker run --cap-drop=ALL --cap-add=NET_BIND_SERVICE myapp

# 4. No new privileges
docker run --security-opt=no-new-privileges myapp

# 5. Resource limits
docker run --memory 512m --cpus 1.0 --pids-limit 100 myapp

# 6. Image scanning
docker scout cves myapp:latest
trivy image myapp:latest
snyk docker test myapp:latest

# 7. Content trust
export DOCKER_CONTENT_TRUST=1
docker push myapp:latest

# 8. Seccomp profile
docker run --security-opt seccomp=profile.json myapp

# 9. AppArmor profile
docker run --security-opt apparmor=my-profile myapp

# 10. Health check
# HEALTHCHECK --interval=30s CMD curl -f http://localhost/ || exit 1

# Dockerfile Security Best Practices:
# FROM specific:version          # Pin version
# RUN apt update && apt install  # Gabung commands
# USER nonroot                   # Non-root user
# COPY --chown=user:group        # Set ownership
# HEALTHCHECK                    # Health check
# Multi-stage build              # Minimal image

# docker-compose security:
# services:
#   web:
#     read_only: true
#     user: "1000:1000"
#     cap_drop:
#       - ALL
#     security_opt:
#       - no-new-privileges:true
#     deploy:
#       resources:
#         limits:
#           memory: 512M
#           cpus: '1.0'`,
    objectivesId: [
      'Non-root user di container',
      'Read-only filesystem dan drop capabilities',
      'Image scanning: Trivy, Docker Scout, Snyk',
      'Content trust dan security profiles',
      'Resource limits dan security options',
    ],
    objectivesEn: [
      'Non-root users in containers',
      'Read-only filesystems and capability dropping',
      'Image scanning: Trivy, Docker Scout, Snyk',
      'Content trust and security profiles',
      'Resource limits and security options',
    ],
    explanationId: '### Non-root User\nJalankan container sebagai non-root. Tambah user di Dockerfile.\n\n### Read-only\n`--read-only` — filesystem read-only. Gunakan `--tmpfs` untuk direktori yang perlu write.\n\n### Capabilities\nLinux capabilities. Drop semua, tambah hanya yang perlu.\n\n### Image Scanning\nScan image untuk CVE/vulnerabilities. Trivy, Scout, Snyk.\n\n### Content Trust\nSign image dengan Docker Content Trust. Verify saat pull.\n\n### Security Profiles\nSeccomp dan AppArmor untuk restrict system calls.',
    explanationEn: '### Non-root Users\nRun containers as non-root for security.\n\n### Read-only\nPrevent filesystem modifications.\n\n### Capabilities\nDrop unnecessary Linux capabilities.\n\n### Image Scanning\nDetect vulnerabilities in images.\n\n### Content Trust\nSign and verify image integrity.\n\n### Security Profiles\nRestrict system calls with Seccomp and AppArmor.',
    experimentsId: [
      'Scan image dengan Trivy',
      'Eksperimen dengan read-only container',
      'Coba drop capabilities',
      'Buat seccomp profile',
      'Eksperimen dengan AppArmor',
    ],
    experimentsEn: [
      'Scan images with Trivy',
      'Experiment with read-only containers',
      'Try dropping capabilities',
      'Create seccomp profiles',
      'Experiment with AppArmor',
    ],
    challengeId: 'Audit existing Dockerfile: tambah non-root user, read-only fs, resource limits, image scanning.',
    challengeEn: 'Audit existing Dockerfile: add non-root user, read-only fs, resource limits, image scanning.',
    summaryId: 'Minggu 9 dari 12: **Security** (Level: Lanjutan). Keamanan container. Minggu depan: **CI/CD**.',
    summaryEn: 'Week 9 of 12: **Security** (Level: Advanced). Container security. Next week: **CI/CD**.',
  },
  {
    week: 10, level: 'advanced', topicId: 'cicd',
    titleId: 'CI/CD Pipeline', titleEn: 'CI/CD Pipelines',
    programId: 'GitHub Actions', programEn: 'GitHub Actions',
    levelNameId: 'Lanjutan', levelNameEn: 'Advanced',
    language: 'bash',
    code: `# ─────────────────────────────────────────────────────────
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
  IMAGE_NAME: \${{ github.repository }}

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
          registry: \${{ env.REGISTRY }}
          username: \${{ github.actor }}
          password: \${{ secrets.GITHUB_TOKEN }}

      - name: Build and push
        uses: docker/build-push-action@v5
        with:
          context: .
          push: true
          tags: |
            \${{ env.REGISTRY }}/\${{ env.IMAGE_NAME }}:latest
            \${{ env.REGISTRY }}/\${{ env.IMAGE_NAME }}:\${{ github.sha }}

  deploy:
    needs: build
    runs-on: ubuntu-latest
    if: github.ref == 'refs/heads/main'
    steps:
      - name: Deploy to server
        run: |
          ssh user@server "docker pull \${{ env.REGISTRY }}/\${{ env.IMAGE_NAME }}:latest && docker compose up -d"
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
# }`,
    objectivesId: [
      'GitHub Actions workflow untuk Docker CI/CD',
      'Build, test, push, deploy pipeline',
      'Multi-stage pipeline dengan dependencies',
      'Registry: GHCR, Docker Hub, ECR',
      'GitLab CI dan Jenkins pipeline',
    ],
    objectivesEn: [
      'GitHub Actions workflows for Docker CI/CD',
      'Build, test, push, deploy pipelines',
      'Multi-stage pipelines with dependencies',
      'Registries: GHCR, Docker Hub, ECR',
      'GitLab CI and Jenkins pipelines',
    ],
    explanationId: '### CI/CD Pipeline\nAutomate build, test, dan deploy dengan Docker.\n\n### GitHub Actions\nWorkflow file di .github/workflows/. Trigger pada push/PR.\n\n### Pipeline Stages\n1. Test: run unit/integration tests\n2. Build: build Docker image\n3. Push: push ke registry\n4. Deploy: deploy ke server\n\n### Registry\n- GHCR: GitHub Container Registry\n- Docker Hub: public registry\n- ECR: AWS Elastic Container Registry\n\n### Best Practices\n- Cache layers untuk build cepat\n- Scan image untuk vulnerabilities\n- Sign image untuk integrity',
    explanationEn: '### CI/CD Pipelines\nAutomate build, test, and deploy with Docker.\n\n### GitHub Actions\nWorkflow files triggered by push/PR events.\n\n### Pipeline Stages\nTest → Build → Push → Deploy.\n\n### Registries\nGHCR, Docker Hub, ECR for different needs.\n\n### Best Practices\nLayer caching, vulnerability scanning, image signing.',
    experimentsId: [
      'Buat GitHub Actions workflow untuk project sendiri',
      'Eksperimen dengan multi-stage pipeline',
      'Coba build dan push ke GHCR',
      'Buat pipeline dengan matrix build',
      'Eksperimen dengan deployment strategies',
    ],
    experimentsEn: [
      'Create GitHub Actions workflow for your project',
      'Experiment with multi-stage pipelines',
      'Try building and pushing to GHCR',
      'Create pipeline with matrix builds',
      'Experiment with deployment strategies',
    ],
    challengeId: 'Buat CI/CD pipeline lengkap: test → build → scan → push → deploy. Pilih platform: GitHub Actions atau GitLab CI.',
    challengeEn: 'Build a complete CI/CD pipeline: test → build → scan → push → deploy. Choose platform: GitHub Actions or GitLab CI.',
    summaryId: 'Minggu 10 dari 12: **CI/CD Pipeline** (Level: Lanjutan). Automation untuk Docker. Minggu depan: **Orchestration**.',
    summaryEn: 'Week 10 of 12: **CI/CD Pipelines** (Level: Advanced). Docker automation. Next week: **Orchestration**.',
  },
  {
    week: 11, level: 'advanced', topicId: 'orchestration',
    titleId: 'Orchestration', titleEn: 'Orchestration',
    programId: 'Kubernetes Basics', programEn: 'Kubernetes Basics',
    levelNameId: 'Lanjutan', levelNameEn: 'Advanced',
    language: 'bash',
    code: `# ─────────────────────────────────────────────────────────
# KUBERNETES ORCHESTRATION — Basics
# ─────────────────────────────────────────────────────────

# Kubernetes Concepts:
# Pod = smallest unit (1+ containers)
# Deployment = manage Pod replicas
# Service = network endpoint
# Namespace = logical grouping
# ConfigMap/Secret = configuration

# kubectl basics
kubectl version
kubectl cluster-info
kubectl get nodes
kubectl get pods
kubectl get services
kubectl get deployments

# File: deployment.yml
cat << 'EOF' > deployment.yml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: my-app
  labels:
    app: my-app
spec:
  replicas: 3
  selector:
    matchLabels:
      app: my-app
  template:
    metadata:
      labels:
        app: my-app
    spec:
      containers:
      - name: my-app
        image: myapp:1.0
        ports:
        - containerPort: 3000
        resources:
          requests:
            memory: "128Mi"
            cpu: "250m"
          limits:
            memory: "256Mi"
            cpu: "500m"
        livenessProbe:
          httpGet:
            path: /health
            port: 3000
          initialDelaySeconds: 10
          periodSeconds: 30
        readinessProbe:
          httpGet:
            path: /ready
            port: 3000
---
apiVersion: v1
kind: Service
metadata:
  name: my-app-service
spec:
  selector:
    app: my-app
  ports:
  - port: 80
    targetPort: 3000
  type: LoadBalancer
EOF

# Apply dan manage
kubectl apply -f deployment.yml
kubectl get pods -w                    # Watch pods
kubectl logs my-app-xxx               # Pod logs
kubectl exec -it my-app-xxx -- bash    # Exec di pod
kubectl scale deployment my-app --replicas=5
kubectl rollout status deployment/my-app
kubectl rollout undo deployment/my-app

# Docker Swarm (alternative)
docker swarm init
docker service create --name web --replicas 3 -p 80:80 nginx
docker service ls
docker service scale web=5
docker stack deploy -c docker-compose.yml myapp`,
    objectivesId: [
      'Kubernetes concepts: Pod, Deployment, Service',
      'kubectl: get, apply, logs, exec, scale',
      'Deployment YAML: replicas, resources, probes',
      'Service: ClusterIP, NodePort, LoadBalancer',
      'Docker Swarm sebagai alternatif ringan',
    ],
    objectivesEn: [
      'Kubernetes concepts: Pods, Deployments, Services',
      'kubectl: get, apply, logs, exec, scale',
      'Deployment YAML: replicas, resources, probes',
      'Services: ClusterIP, NodePort, LoadBalancer',
      'Docker Swarm as lightweight alternative',
    ],
    explanationId: '### Kubernetes\nContainer orchestration platform. Manage deployment, scaling, dan operations.\n\n### Pod\nSmallest deployable unit. Bisa berisi 1+ container.\n\n### Deployment\nManage Pod replicas. Rolling update, rollback.\n\n### Service\nNetwork endpoint untuk akses Pod. Types: ClusterIP, NodePort, LoadBalancer.\n\n### Probes\n- Liveness: restart jika unhealthy\n- Readiness: mulai terima traffic jika ready\n\n### Docker Swarm\nLighter alternative. Built into Docker. Less features dari K8s.',
    explanationEn: '### Kubernetes\nContainer orchestration for deployment, scaling, and operations.\n\n### Pods\nSmallest deployable units containing one or more containers.\n\n### Deployments\nManage Pod replicas with rolling updates.\n\n### Services\nNetwork endpoints for Pod access.\n\n### Probes\nHealth checks for liveness and readiness.\n\n### Docker Swarm\nLightweight alternative built into Docker.',
    experimentsId: [
      'Deploy app ke Minikube atau kind',
      'Eksperimen dengan scaling',
      'Coba rolling update',
      'Buat Service dengan LoadBalancer',
      'Eksperimen dengan ConfigMap',
    ],
    experimentsEn: [
      'Deploy app to Minikube or kind',
      'Experiment with scaling',
      'Try rolling updates',
      'Create Service with LoadBalancer',
      'Experiment with ConfigMap',
    ],
    challengeId: 'Deploy multi-service app ke Kubernetes: frontend, backend, database. Gunakan Deployment dan Service.',
    challengeEn: 'Deploy multi-service app to Kubernetes: frontend, backend, database. Use Deployments and Services.',
    summaryId: 'Minggu 11 dari 12: **Orchestration** (Level: Lanjutan). Kubernetes dan Swarm. Minggu depan: **Capstone Project**!',
    summaryEn: 'Week 11 of 12: **Orchestration** (Level: Advanced). Kubernetes and Swarm. Next week: **Capstone Project**!',
  },
  {
    week: 12, level: 'advanced', topicId: 'capstone',
    titleId: 'Capstone: Production Pipeline', titleEn: 'Capstone: Production Pipeline',
    programId: 'Full DevOps Pipeline', programEn: 'Full DevOps Pipeline',
    levelNameId: 'Lanjutan', levelNameEn: 'Advanced',
    language: 'bash',
    code: `# ─────────────────────────────────────────────────────────
# CAPSTONE: Full Docker Production Pipeline
# ─────────────────────────────────────────────────────────

# Project Structure:
# my-project/
# ├── .github/workflows/ci.yml
# ├── docker-compose.yml
# ├── docker-compose.prod.yml
# ├── Dockerfile
# ├── Dockerfile.prod
# ├── k8s/
# │   ├── deployment.yml
# │   ├── service.yml
# │   └── ingress.yml
# └── scripts/
#     ├── deploy.sh
#     └── backup.sh

# ─────────────────────────────────────────────────────────
# 1. Multi-Stage Dockerfile
# ─────────────────────────────────────────────────────────
cat << 'DOCKERFILE' > Dockerfile.prod
FROM node:20-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

FROM node:20-alpine AS production
WORKDIR /app
ENV NODE_ENV=production
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/package.json ./
RUN npm ci --only=production
RUN addgroup -S app && adduser -S app -G app
USER app
EXPOSE 3000
HEALTHCHECK --interval=30s CMD wget --spider http://localhost:3000/health || exit 1
CMD ["node", "dist/server.js"]
DOCKERFILE

# ─────────────────────────────────────────────────────────
# 2. Docker Compose Production
# ─────────────────────────────────────────────────────────
cat << 'COMPOSE' > docker-compose.prod.yml
version: "3.8"
services:
  app:
    build:
      context: .
      dockerfile: Dockerfile.prod
    environment:
      - DATABASE_URL=postgres://user:pass@db:5432/mydb
    depends_on:
      db:
        condition: service_healthy
    deploy:
      replicas: 3
      resources:
        limits:
          memory: 512M
          cpus: '0.5'
    healthcheck:
      test: ["CMD", "wget", "--spider", "http://localhost:3000/health"]
      interval: 30s
      timeout: 10s
      retries: 3

  db:
    image: postgres:16-alpine
    environment:
      POSTGRES_DB: mydb
      POSTGRES_USER: user
      POSTGRES_PASSWORD: pass
    volumes:
      - pgdata:/var/lib/postgresql/data
    healthcheck:
      test: ["CMD-SHELL", "pg_isready -U user"]
      interval: 10s
      timeout: 5s
      retries: 5

  nginx:
    image: nginx:alpine
    ports:
      - "80:80"
      - "443:443"
    volumes:
      - ./nginx.conf:/etc/nginx/nginx.conf
    depends_on:
      - app

volumes:
  pgdata:
COMPOSE

# ─────────────────────────────────────────────────────────
# 3. Deploy Script
# ─────────────────────────────────────────────────────────
cat << 'SCRIPT' > scripts/deploy.sh
#!/bin/bash
set -e

echo "Building image..."
docker build -f Dockerfile.prod -t myapp:latest .

echo "Running tests..."
docker run --rm myapp:latest npm test

echo "Pushing to registry..."
docker tag myapp:latest registry.example.com/myapp:latest
docker push registry.example.com/myapp:latest

echo "Deploying..."
docker compose -f docker-compose.prod.yml up -d

echo "Verifying..."
docker compose -f docker-compose.prod.yml ps
echo "Deployment complete!"
SCRIPT

# Capstone Checklist:
# ✅ Multi-stage Dockerfile
# ✅ Non-root user
# ✅ Health checks
# ✅ Resource limits
# ✅ Persistent volumes
# ✅ CI/CD pipeline
# ✅ Image scanning
# ✅ Production compose
# ✅ Monitoring
# ✅ Backup strategy`,
    objectivesId: [
      'Full production pipeline: build → test → scan → deploy',
      'Multi-stage Dockerfile dengan security best practices',
      'Docker Compose production dengan replicas dan limits',
      'CI/CD integration dengan GitHub Actions',
      'Monitoring, backup, dan disaster recovery',
    ],
    objectivesEn: [
      'Full production pipeline: build → test → scan → deploy',
      'Multi-stage Dockerfile with security best practices',
      'Docker Compose production with replicas and limits',
      'CI/CD integration with GitHub Actions',
      'Monitoring, backup, and disaster recovery',
    ],
    explanationId: '### Capstone\nFull production pipeline yang menggabungkan semua konsep Docker.\n\n### Pipeline\nBuild → Test → Scan → Push → Deploy → Monitor.\n\n### Security\nNon-root user, read-only fs, image scanning, content trust.\n\n### Production\nReplicas, resource limits, health checks, persistent volumes.\n\n### CI/CD\nAutomated pipeline dengan GitHub Actions atau GitLab CI.\n\n### Monitoring\nHealth checks, logs, metrics, alerting.',
    explanationEn: '### Capstone\nFull production pipeline combining all Docker concepts.\n\n### Pipeline\nBuild → Test → Scan → Push → Deploy → Monitor.\n\n### Security\nNon-root users, read-only filesystems, image scanning.\n\n### Production\nReplicas, resource limits, health checks.\n\n### CI/CD\nAutomated pipelines with GitHub Actions.\n\n### Monitoring\nHealth checks, logs, and metrics.',
    experimentsId: [
      'Buat full pipeline untuk aplikasi sendiri',
      'Eksperimen dengan blue-green deployment',
      'Coba canary deployment strategy',
      'Buat monitoring dengan Prometheus + Grafana',
      'Eksperimen dengan disaster recovery',
    ],
    experimentsEn: [
      'Create full pipeline for your application',
      'Experiment with blue-green deployment',
      'Try canary deployment strategy',
      'Create monitoring with Prometheus + Grafana',
      'Experiment with disaster recovery',
    ],
    challengeId: 'Buat full production pipeline: Dockerfile → CI/CD → Docker Compose → Monitoring → Backup. Domain: E-Commerce atau Blog.',
    challengeEn: 'Build a full production pipeline: Dockerfile → CI/CD → Docker Compose → Monitoring → Backup. Domain: E-Commerce or Blog.',
    summaryId: 'Minggu 12 dari 12: **Capstone: Production Pipeline** (Level: Lanjutan). Selesai! 🎉 Anda sudah menguasai Docker dari nol hingga production-ready.',
    summaryEn: 'Week 12 of 12: **Capstone: Production Pipeline** (Level: Advanced). Complete! 🎉 You\'ve mastered Docker from scratch to production-ready.',
  },
];

// Add weeks to levels
for (const level of LEVELS) {
  level.weeks = MODULES.filter(m => m.level === level.levelId).map(m => ({
    week: m.week,
    topicId: m.topicId,
    titleId: m.titleId,
    titleEn: m.titleEn,
  }));
}

gen.writeFiles(MODULES, LEVELS);
