# Docker Architecture & the Linux VM

> Docker | Foundations | Lesson 3

## Learning Objectives

- Understand the Docker architecture: client, daemon, containerd, runtime
- Explain why Docker Desktop runs a Linux VM on Mac/Windows
- Pull images from a registry with docker pull
- Run a real service (Redis) in a container

---

## Program: Docker Architecture & the Linux VM

```docker
# Arsitektur: client -> daemon -> containerd
docker version

# Di balik layar Docker Desktop: Linux VM kecil
docker info

# Ambil image dari registry
docker images
docker pull redis:7-alpine

# Jalankan Redis sebagai cache
docker run -d --name cache -p 6379:6379 redis:7-alpine
docker ps
docker stop cache
docker rm cache
```

---

## Explanation

## Client, Daemon, and Containerd
Typing docker <command> runs the CLI client. The client talks to the Docker daemon (dockerd) over an API. The daemon does not run containers itself: it asks containerd (the runtime) to run containers as processes. This split matters: modern Kubernetes does not talk to dockerd - it talks to containerd/CRI-O directly.
## Why a Linux VM on Mac and Windows
Containers depend on Linux kernel features (namespaces, cgroups). macOS/Windows kernels lack them. The fix: Docker Desktop runs a small Linux VM in the background, and all containers live inside that VM. That is why docker info says OSType: linux even on a Windows/Mac laptop.
## The Registry: Docker Hub
docker pull redis:7-alpine fetches the image from Docker Hub (the largest public registry). Note that we asked for a specific version (7-alpine), not latest - a habit that becomes the theme of lesson 6. Images already present locally are not re-downloaded; Docker uses the local cache.
## Size: Real VM vs Real Container
The redis:7-alpine image is just 43MB and the container is usable in seconds - compare with a Linux VM that needs hundreds of MB and minutes to boot. This is why modern apps ship as containers, not VM images.

---

## Experiments

1. **Client, Daemon, and Containerd**
2. **Why a Linux VM on Mac and Windows**
3. **The Registry: Docker Hub**
4. **Size: Real VM vs Real Container**

---

## Challenge

Run the script, then pull another image: docker pull python:3.12-slim and run docker run -d --name py python:3.12-slim (no port mapping - observe the difference in docker ps). Explain in one sentence: why is the PORTS column empty for the py container?

---

## Summary

Client, daemon, containerd: layered processes. On Mac/Windows containers live inside a Linux VM (Docker Desktop). The registry is the image source; pull specific versions. Next: essential Docker commands.
