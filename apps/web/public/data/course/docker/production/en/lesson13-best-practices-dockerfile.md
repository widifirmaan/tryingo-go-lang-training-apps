# Dockerfile Best Practices

> Docker | Production | Lesson 13

## Learning Objectives

- Apply cache-friendly instruction ordering
- Compare single-stage vs multi-stage images
- Explain the role of .dockerignore
- Use descriptive, non-floating tags

---

## Program: Dockerfile Best Practices

```docker
# Build "single" (satu stage) vs "web" (multi-stage)
docker build -t tryngo/single:1.0 single
docker build -t tryngo/shop-web:2.0 web

# Bandingkan ukuran image
docker images

# Build ulang = cache layer dipakai (perhatikan output)
docker build -t tryngo/shop-web:2.1 web

# .dockerignore: build context tetap kecil
docker build -t tryngo/shop-web:2.2 web
```

---

## Explanation

## Order Instructions from Least-Changing
Layer caching works per instruction: a layer rebuilds only if its instruction changed OR something below it changed. So copy dependencies first (package.json / requirements.txt / go.mod), RUN install, then COPY source. One changed code line = only the last layer rebuilds. Copy source first, install later = every commit rebuilds expensive dependencies.
## One Purpose per Layer vs Skinny Layers
Old advice: "one RUN per tool". Now: combine related commands in one RUN (apt-get update && install) and clean caches in the same RUN. Skinny layers = small, safe images (no leftover artifacts). Two practical rules: (1) combine install + cleanup, (2) separate things with different change frequencies.
## Multi-stage: Toolchain vs Runtime
The comparison in the script shows the point: single carries the whole build toolchain (large), web (multi-stage) copies only the build result into a minimal base. The runtime image size drives: pull speed, supply-chain attack surface, registry storage cost. Production plan: build stage (node/rust/go), runtime stage (alpine/scratch).
## .dockerignore and a Clean Context
COPY . copies the build context - everything not excluded by .dockerignore. node_modules, .git, dist, env files ending up in images? .dockerignore (patterned after .gitignore) keeps the context small and keeps local secrets out of the image.

---

## Experiments

1. **Order Instructions from Least-Changing**
2. **One Purpose per Layer vs Skinny Layers**
3. **Multi-stage: Toolchain vs Runtime**
4. **.dockerignore and a Clean Context**

---

## Challenge

Calculate it yourself: what is the size difference between tryngo/single:1.0 and tryngo/shop-web:2.0? Why? Then copy the single project to a new folder, add a .dockerignore excluding README.md, rebuild, and compare image sizes. Write down the results.

---

## Summary

Dependencies first, source last (cache). Skinny layers with install+cleanup. Multi-stage: toolchain in build, result in runtime. .dockerignore = clean context. Next: production images.
