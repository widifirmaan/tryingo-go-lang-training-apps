# Essential Commands: ps, start, stop, logs, exec

> Docker | Foundations | Lesson 4

## Learning Objectives

- Master the lifecycle: run, start, stop, restart, rm
- Read container logs with docker logs
- Run commands inside a container with docker exec
- Clean up resources with docker system prune

---

## Program: Essential Commands: ps, start, stop, logs, exec

```docker
# Semua container, termasuk yang sudah berhenti
docker ps -a

# Bangkitkan lagi container yang berhenti
docker start old-blog
docker ps

# Lihat log dan jalankan perintah di dalam container yang hidup
docker logs old-blog
docker exec old-blog echo "exec berjalan di dalam container yang hidup"

# Hentikan, lalu hapus
docker stop old-blog
docker rm old-blog
docker ps -a

# Bersihkan artefak yang tidak terpakai
docker system prune -f
docker images
```

---

## Explanation

## Stop Is Not Delete
docker stop halts the main process (SIGTERM, short wait, then SIGKILL). The container is stopped but STILL EXISTS - it can be restarted with docker start. docker rm deletes the container permanently. Think of turning off a laptop (data stays) vs throwing the laptop away.
## Logs: The Window Into a Container
Anything an app prints to stdout/stderr is captured by Docker. docker logs <name> shows it without entering the container. This is the first debugging source: read logs before anything else.
## Exec: Get In Without "Logging In"
Remember the lesson-2 mental model: we do not "log into" containers. But sometimes we need to run a single command inside one to inspect it - that is docker exec. docker exec <container> whoami runs whoami inside the live container. Short, throwaway, and it does not modify the container.
## System Prune: A Tidy House
Stopped containers, orphan images, build cache - they pile up silently. docker system prune -f deletes everything unused. Make it a habit; your disk will thank you.

---

## Experiments

1. **Stop Is Not Delete**
2. **Logs: The Window Into a Container**
3. **Exec: Get In Without "Logging In"**
4. **System Prune: A Tidy House**

---

## Challenge

Without re-reading the material: run docker ps -a, pick a stopped container, revive it with docker start, read its logs with docker logs, use docker exec to print your own message, then docker stop and docker rm. Write down the command sequence you used.

---

## Summary

Lifecycle: stop (halts, still exists) vs rm (deletes). Logs read app output; exec runs one command inside a container; prune tidies up. Next: docker run in depth.
