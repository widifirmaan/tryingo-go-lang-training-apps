# Orchestration & Capstone: Compose to Swarm, K8s

> Docker | Production | Lesson 16

## Learning Objectives

- Explain the difference between Compose, Swarm, and Kubernetes
- Initialize a swarm and list nodes
- Create services with replicas and scaling
- Complete the capstone: deploy a real stack

---

## Program: Orchestration & Capstone: Compose to Swarm, K8s

```docker
# Capstone: seluruh stack shop dari satu server
docker compose -f compose/shop/docker-compose.yml up -d
docker compose -f compose/shop/docker-compose.yml ps

# Inisialisasi swarm mode
docker swarm init
docker node ls

# Service: unit orkestrasi (bukan container tunggal)
docker service create --name web --replicas 2 -p 8080:80 nginx:alpine
docker service ls

# Skala service
docker service scale web=4
docker service ls

# Hentikan service, tinggalkan swarm
docker service rm web
docker swarm leave --force

# Capstone selesai: turunkan stack
docker compose -f compose/shop/docker-compose.yml down
```

---

## Explanation

## Compose vs Swarm vs Kubernetes
Compose = a stack definition for ONE host (YAML file, container lifecycle). Swarm = Docker's built-in multi-host orchestration (services + replicas + load balancing). Kubernetes = the industry standard (pods, deployments, services, ingress - far more powerful and complex). The decision curve: 1 host = Compose; several hosts without an SRE team = Swarm; enterprise needs (auto-scaling, self-healing, multi-cloud) = Kubernetes.
## Swarm Mode
docker swarm init turns a machine into a manager node; docker node ls lists the cluster. Swarm's unit of work is a SERVICE: declarative (want 2 replicas of web - Swarm keeps them at 2 forever, including automatic restarts if a replica dies). docker service scale changes the count dynamically. There is no "run container" command - everything is declarative.
## Capstone: From Zero to Production
Your capstone: use everything you learned - build the shop stack images (docker build), run with Compose + healthcheck (up -d), scale the API (--scale), watch the logs, then imagine a second server joining the swarm. You have walked the path from "works on my machine" to a production mental model: immutable images + declarative orchestration.
## After This Course
The tryngo repo holds further challenges: add a monitoring service to the stack, write multi-stage Dockerfiles for other languages, or build a CI/CD pipeline on GitHub Actions. Document your decisions - like this curriculum: from zero to production-ready.

---

## Experiments

1. **Compose vs Swarm vs Kubernetes**
2. **Swarm Mode**
3. **Capstone: From Zero to Production**
4. **After This Course**

---

## Challenge

Final capstone: deploy the full shop stack with a production scenario - scale api to 3, change one config line, up again, and verify with ps and logs that the new service is healthy before replacing the old one. Then initialize a swarm, create a service tryngo/web:2.0 with 3 replicas, and tear everything down cleanly. Document the whole process as a runbook (command list + comments).

---

## Summary

Compose = 1 host, Swarm = declarative multi-host, K8s = the enterprise standard. Services keep replicas alive. Capstone: from zero to a production stack. You are Docker-ready. Congratulations!
