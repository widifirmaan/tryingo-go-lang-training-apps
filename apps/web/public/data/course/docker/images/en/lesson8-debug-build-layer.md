# Debugging Builds with Layer Thinking

> Docker | Images & Containers | Lesson 8

## Learning Objectives

- Analyze build errors with layer thinking
- Fix a broken Dockerfile systematically
- Debug by shelling into the last successful layer
- Apply the apt-get update && install pattern in one RUN

---

## Program: Debugging Builds with Layer Thinking

```docker
# Build yang GAGAL - perhatikan layer mana yang error
docker build -t tryngo/broken:latest broken

# Fix: apt-get update dulu, satu RUN, bersihkan cache
docker build -t tryngo/fixed:latest fixed
docker images

# Debug layer: jalankan shell di layer terakhir yang sukses
docker run -it --entrypoint sh ubuntu:24.04
```

---

## Explanation

## Every Dockerfile Line Is One Layer
This is the key to debugging builds: Docker executes instructions one by one, each becoming a layer. When a build fails at layer N, all previous layers are already built - and still cached. The right question is not "why did it fail?" but "WHICH layer failed?".
## Reading Build Errors
The broken build fails at RUN apt-get install -y curl: "Unable to locate package curl". The cause is classic: a fresh ubuntu:24.04 base has no package lists yet - you must apt-get update BEFORE installing. The fix combines both in one RUN: apt-get update && apt-get install -y --no-install-recommends curl.
## Debug in the Last Successful Layer
Do not Google first. Shell into the last successful layer: docker run -it --entrypoint sh ubuntu:24.04, then manually run the failing command inside it. You see the real error in the exact same environment as the build. This skill separates engineers who understand from those who copy Stack Overflow.
## Cache Busting and Cleanliness
apt-get update && apt-get install in ONE RUN ensures fresh package lists each time the layer rebuilds (an isolated update in its own layer would be cached and go stale). Clean the apt cache in the same RUN (rm -rf /var/lib/apt/lists/*) so the layer carries no junk. The same pattern applies to npm/pip.

---

## Experiments

1. **Every Dockerfile Line Is One Layer**
2. **Reading Build Errors**
3. **Debug in the Last Successful Layer**
4. **Cache Busting and Cleanliness**

---

## Challenge

The bootcamp-trainer exercise: write a Dockerfile with 4 deliberate bugs - (1) RUN install without update, (2) a wrong COPY path, (3) EXPOSE that does not match the app port, (4) a CMD referencing a missing file. Build, find the failing layer, fix them one by one. Write down the bugs you found and their fixes.

---

## Summary

Layer thinking: find the failing layer, not the error message. Debug by shelling into the last successful layer. apt-get update && install in one RUN, then clean the cache. Next: volumes and data persistence.
