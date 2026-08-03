# Images & Layers: What Images Are Made Of

> Docker | Images & Containers | Lesson 6

## Learning Objectives

- Understand an image as a stack of read-only layers
- Read layer history with docker history
- Name image versions with docker tag
- Explain the risk of :latest tags and why version pinning matters

---

## Program: Images & Layers: What Images Are Made Of

```docker
# Pull image = unduh lapisan demi lapisan
docker pull nginx:alpine

# Setiap image = tumpukan layer
docker history nginx:alpine

# Tag = nama dan versi image
docker tag nginx:alpine nginx:myweb
docker images

# Jangan pakai :latest di produksi - pin versi!
docker pull node:20-alpine
docker images

# Hapus image
docker rmi nginx:myweb
docker images
```

---

## Explanation

## An Image Is a Stack of Layers
An image is not one giant file - it is a stack of read-only layers. When a container starts, Docker adds one thin writable layer on top. Every change inside the container lives in that writable layer; delete the container and that layer is gone. Images never change - they are immutable. A change means a new image (new layers).
## Docker History: Reading the Archive
docker history nginx:alpine shows layer after layer: the base OS, then each subsequent build instruction. This is forensic tooling: why is this image big? Which layer contributes the size? It is also what makes Dockerfiles scientifically debuggable (lesson 8).
## Layers and Cache
Because layers are cached, rebuilding an image does not redo everything: only changed layers (and those after them) are rebuilt. The practical consequence: order Dockerfile instructions from least-changing to most-changing (dependencies first, source last). This is the key to fast builds - covered in lesson 13.
## Tags and Pinning
A tag is a version name (nginx:alpine, node:20-alpine). The :latest tag is "floating": today it holds version A, next month version B - your builds can break with zero code changes. In production, pin specific versions (even sha256 digests for maximum supply-chain safety).

---

## Experiments

1. **An Image Is a Stack of Layers**
2. **Docker History: Reading the Archive**
3. **Layers and Cache**
4. **Tags and Pinning**

---

## Challenge

Run the script. Then compare two Node images: docker history node:20-alpine and docker history node:20-slim (pull them first if needed). Which image has more layers? Why? Write a short paragraph.

---

## Summary

An image = read-only layers plus a writable layer at runtime. history reads the layer archive; tag names versions; :latest floats and is risky - pin versions. Next: writing a Dockerfile.
