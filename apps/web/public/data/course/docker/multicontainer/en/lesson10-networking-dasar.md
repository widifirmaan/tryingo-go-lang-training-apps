# Networking: Containers Talking to Each Other

> Docker | Multi-Container | Lesson 10

## Learning Objectives

- Create your own network with docker network create
- Explain internal DNS: containers are addressed by name
- Inspect network members with docker network inspect
- Understand why --link is deprecated

---

## Program: Networking: Containers Talking to Each Other

```docker
# Buat network khusus
docker network create mynet
docker network ls

# Jalankan dua container di network yang sama
docker run -d --name web --network mynet -p 8080:80 nginx:alpine
docker run -d --name db --network mynet -e POSTGRES_PASSWORD=rahasia123 postgres:16-alpine

# DNS internal: web bisa "ping db" cuma dengan namanya
docker exec web ping db

# Network inspect: lihat anggota
docker network inspect mynet

# Hapus network
docker network rm mynet
```

---

## Explanation

## The Dead End: Localhost Never Reaches
"localhost" inside a container is that container itself. An app calling http://localhost:5432 will NEVER reach a database in another container. Both containers must be on the same network, and the app calls the container name: http://db:5432.
## Internal DNS: Name = Address
On a custom network, Docker provides DNS: containers are addressable by NAME. web can ping db without knowing its IP. This solves a big problem: container IPs change on every restart, names do not. Configure apps with names, not IPs.
## Why a Custom Network
Why not put every container on the default network? Isolation and security: a network limits who can talk to whom. The DB only connects to web, not to every random container on the machine. The production networking principle: segments, not one big cable.
## --link and History
There used to be docker run --link web:web to connect containers. It is legacy and not recommended - network DNS replaced it. A good interview answer: "--link writes a static /etc/hosts entry; networks provide dynamic DNS that follows the container wherever its IP moves."

---

## Experiments

1. **The Dead End: Localhost Never Reaches**
2. **Internal DNS: Name = Address**
3. **Why a Custom Network**
4. **--link and History**

---

## Challenge

Run the script. Then experiment: remove db from the network with docker network disconnect mynet db, then ping db from web again. What happens? Reconnect with docker network connect mynet db and ping again. Write down the results.

---

## Summary

Containers on the same network talk via NAME (internal DNS), not IP. Create custom networks for isolation. localhost never reaches another container. Next: Docker Compose.
