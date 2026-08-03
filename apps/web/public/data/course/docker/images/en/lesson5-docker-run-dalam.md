# docker run Deep Dive: Ports, Env, Interactive

> Docker | Images & Containers | Lesson 5

## Learning Objectives

- Map container ports to the host with -p
- Pass configuration via environment variables (-e)
- Understand --rm for throwaway containers
- Use -it for interactive sessions

---

## Program: docker run Deep Dive: Ports, Env, Interactive

```docker
# Port mapping: host 8080 -> container 80
docker run -d --name web -p 8080:80 nginx:alpine
docker ps
# Buka http://localhost:8080 di browser Anda!

# Environment variables: -e
docker run -d --name db -e POSTGRES_PASSWORD=rahasia123 postgres:16-alpine
docker exec db env

# --rm: otomatis hapus saat berhenti
docker run --rm hello-world
docker ps -a

# -it: interaktif (stdin tetap terbuka)
docker run -it --name shell alpine sh
docker stop shell
docker rm shell
```

---

## Explanation

## Port Mapping: -p HOST:CONTAINER
The app inside a container listens on its own port (nginx on 80, Postgres on 5432). That port is not automatically open on your laptop. -p 8080:80 means: accept traffic on host port 8080, forward it to port 80 inside the container. Without mapping the container still runs - you just cannot reach it from outside. Remember: EXPOSE in a Dockerfile is only documentation; -p is what actually publishes.
## Configuration Without Hardcoding: -e
Official images (postgres, redis, mysql) are configured via environment variables: POSTGRES_PASSWORD, POSTGRES_DB, etc. Values are given at run time with -e NAME=value and read by the app inside. This is the "config from outside the image" pattern - the image stays identical while configuration differs per environment (dev/staging/prod).
## --rm: Single Use
Containers used for one short task (tests, experiments) should run with --rm: as soon as the process finishes, the container is deleted automatically. No junk piles up. Note in docker ps -a: there is no trace of it.
## -it: Interactive
-it combines -i (keep stdin open) and -t (pseudo-TTY). It is used when we want to drop into a container shell - e.g., quick exploration. But remember the mental model: occasional exploration, not "living inside".

---

## Experiments

1. **Port Mapping: -p HOST:CONTAINER**
2. **Configuration Without Hardcoding: -e**
3. **--rm: Single Use**
4. **-it: Interactive**

---

## Challenge

Run the script. Then build on your own: a second nginx container named web2 mapping host port 9090, with env var APP_ENV=production. Check with docker ps and docker exec web2 env. Remove all containers you created. Write down the commands.

---

## Summary

-p publishes ports; -e feeds config from outside; --rm for single-use; -it for interactive sessions. The image stays the same while config varies per environment. Next: images and layers.
