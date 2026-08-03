# Dockerfiles: Building Your Own Images

> Docker | Images & Containers | Lesson 7

## Learning Objectives

- Write a Dockerfile with FROM, WORKDIR, COPY, RUN, EXPOSE, CMD
- Build an image with docker build
- Distinguish CMD and ENTRYPOINT
- Recognize the multi-stage pattern early

---

## Program: Dockerfiles: Building Your Own Images

```docker
# Bangun image dari Dockerfile (proyek web: multi-stage)
docker build -t tryngo/shop-web:1.0 web

# Image baru muncul di daftar
docker images

# Jalankan hasil build
docker run -d --name shop-web -p 8080:80 tryngo/shop-web:1.0
docker ps
docker exec shop-web ls /usr/share/nginx/html

# CMD bisa di-override saat run
docker run --rm tryngo/shop-web:1.0 echo "CMD diganti saat run!"

# Bersihkan
docker stop shop-web
docker rm shop-web
```

---

## Explanation

## Dockerfile Anatomy
A Dockerfile is a build recipe, executed line by line top to bottom; each line becomes one layer. FROM = base image (do not start from scratch unless you know why). WORKDIR = working directory (do not skip it - COPY and RUN are relative to it). COPY = copy files from the build context. RUN = execute build commands (install dependencies, compile).
## Expose vs Publish
EXPOSE 80 in a Dockerfile is documentation only: "this app listens on port 80". It publishes nothing. Publishing happens at run time with -p, or in Compose with ports. Do not confuse them - a classic DevOps interview question.
## CMD vs ENTRYPOINT
CMD = the default command, overridable at run time: docker run image echo "hi" replaces CMD. ENTRYPOINT = the fixed command, not overridable (its arguments can be appended). Common pattern: ENTRYPOINT for the app executable, CMD for default arguments. In the script you see CMD nginx being replaced at run time.
## Multi-stage at a Glance
Two FROMs in one Dockerfile: the first stage builds (full toolchain), the second only copies the artifacts into a minimal base (nginx:alpine). The result: a small, safe image without build toolchain. Full details in lessons 13-14.

---

## Experiments

1. **Dockerfile Anatomy**
2. **Expose vs Publish**
3. **CMD vs ENTRYPOINT**
4. **Multi-stage at a Glance**

---

## Challenge

Run the script and watch the build output: how many steps, what happens at each. Then docker run --rm tryngo/shop-web:1.0 ls / - compare with docker exec shop-web ls /usr/share/nginx/html (run the container first). How does the build image filesystem differ from the runtime one?

---

## Summary

A Dockerfile is a layer-by-layer recipe. EXPOSE is documentation; -p publishes. CMD is overridable, ENTRYPOINT is fixed. Multi-stage = small build, small runtime. Next: debugging builds with layer thinking.
