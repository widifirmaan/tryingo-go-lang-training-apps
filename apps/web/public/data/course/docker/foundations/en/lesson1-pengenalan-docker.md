# Docker Intro: The "Works on My Machine" Problem

> Docker | Foundations | Lesson 1

## Learning Objectives

- Understand the root of the "works on my machine" problem and why containers solve it
- Distinguish images, containers, and registries
- Run your first container with docker run
- Know the basic commands: version, info, images, ps

---

## Program: Docker Intro: The "Works on My Machine" Problem

```docker
# 1) Cek lingkungan Docker Anda
docker version
docker info

# 2) Image yang tersedia (blueprint aplikasi)
docker images

# 3) Container yang sedang berjalan
docker ps

# 4) Container pertama Anda
docker run hello-world
docker ps -a
```

---

## Explanation

## The "Works on My Machine" Problem
Every developer has been there: the app runs flawlessly on our laptop, but breaks on a teammate's laptop, on staging, or in production. It is not bad luck - it is environment drift: different language versions, mismatched dependencies, different OS config. Docker's answer is one sentence: ship the application together with its entire environment.
## Image vs Container vs Registry
An image is a read-only blueprint: app + runtime + configuration in one package. A container is a running instance of an image. A registry is an image warehouse (Docker Hub is the biggest). Analogy: image = class/recipe, container = object/dish cooked from that recipe, registry = the world's cookbook.
## Why Containers Matter in 2026
Research shows roughly 92% of IT organizations use containers and Docker adoption sits near 71% among developers. It is not a trend - containers are the de facto standard for packaging and distributing software, from a dev laptop to production clusters.
## What You Will Master
This track has 16 lessons: container mental model, images and Dockerfile, data and networking, Compose and orchestration. Every lesson ships a script you can run right away in the simulator playground on the right - no Docker installation needed.

---

## Experiments

1. **The "Works on My Machine" Problem**
2. **Image vs Container vs Registry**
3. **Why Containers Matter in 2026**
4. **What You Will Master**

---

## Challenge

Run the script in the playground and observe the output. Then type manually: docker images, docker ps, and docker run hello-world once more. Question: why does docker run hello-world finish immediately (instead of running forever)? Write a one-sentence answer - it is the foundation of lesson 2.

---

## Summary

The "works on my machine" problem comes from environment drift; Docker packages app + environment together. Image = blueprint, container = instance, registry = warehouse. Next: the container-as-process mental model.
