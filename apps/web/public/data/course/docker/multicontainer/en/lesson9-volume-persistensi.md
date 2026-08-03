# Volumes: Data That Survives

> Docker | Multi-Container | Lesson 9

## Learning Objectives

- Explain why container data does not survive
- Create and use a named volume with -v
- Prove data survives container deletion
- Manage the volume lifecycle

---

## Program: Volumes: Data That Survives

```docker
# Buat volume bernama
docker volume create pgdata
docker volume ls

# Jalankan Postgres dengan volume
docker run -d --name db -e POSTGRES_PASSWORD=rahasia123 -v pgdata:/var/lib/postgresql/data postgres:16-alpine
docker exec db cat /var/lib/postgresql/data/PG_VERSION

# Hapus container - data AMAN di volume
docker stop db
docker rm db

# Jalankan lagi dengan volume yang sama - data masih ada!
docker run -d --name db2 -e POSTGRES_PASSWORD=rahasia123 -v pgdata:/var/lib/postgresql/data postgres:16-alpine
docker exec db2 cat /var/lib/postgresql/data/PG_VERSION

# Bersihkan
docker stop db2
docker rm db2
docker volume rm pgdata
```

---

## Explanation

## The Problem: Containers Are Ephemeral
A container's writable layer is deleted with the container. A database without a volume means losing all data whenever the container restarts or is deleted. The solution: volumes - storage that lives outside the container lifecycle. The Dockerfile stores the "recipe"; volumes store the "data".
## Named Volumes
-v pgdata:/var/lib/postgresql/data mounts the pgdata volume to Postgres's data directory inside the container. The name (pgdata) makes it reusable: a second container, e.g. db2, mounts the same volume and sees the same data. Note in the script: PG_VERSION (written by Postgres during init) is still readable after the first container is deleted.
## Why the Directory Name Matters
Mount the path the app ACTUALLY uses to store its data. Postgres: /var/lib/postgresql/data. Nginx: /usr/share/nginx/html. Redis: /data. A wrong mount = the app runs but data never lands in the volume (and is lost). Check official image docs for the canonical paths.
## Volume Lifecycle
docker volume ls lists volumes, docker volume rm deletes them. Important: deleting a container does NOT delete its volume. Orphaned volumes (not used by any container) eat disk - watch them with docker volume ls. Bind mounts (lesson 12) are the alternative for specific host directories, but for production, named volumes are more portable.

---

## Experiments

1. **The Problem: Containers Are Ephemeral**
2. **Named Volumes**
3. **Why the Directory Name Matters**
4. **Volume Lifecycle**

---

## Challenge

Run the script. Then prove it yourself: after writing data to the volume (create a file with docker exec db2 sh -c "echo hi > /var/lib/postgresql/data/test.txt"), delete the container, run a new container with the same volume, and read that file. Why does this matter for databases?

---

## Summary

Containers are ephemeral, volumes survive. Named volumes mount with -v name:path. Mount the path the app really uses. Volumes are not deleted with their container. Next: networking between containers.
