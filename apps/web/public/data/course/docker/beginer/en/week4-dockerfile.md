# Dockerfile — Own Box Recipe

> **Kategori:** Docker | **Level:** Beginner | **Minggu 4:** Dockerfile
> **Prerequisites:** Week 3 — **Container Management**.

## Learning Objectives

- Write `Dockerfile` `FROM`, `COPY`, `RUN`, `CMD`, `docker build -t shop:1.0 .` makes your own blueprint

---

## Why This Matters (Non-IT)

Without Dockerfiles, you use someone else's `nginx`. With a Dockerfile, build a shop box with your own `index.html`.

---

## Program: Shop Recipe

```dockerfile
# Dockerfile — in shop/ folder
FROM nginx:alpine
COPY index.html /usr/share/nginx/html/index.html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
```

```html
<!-- index.html -->
<h1>Siti's Shop — Docker</h1><p>Open 07.00-20.00</p>
```

```bash
docker build -t shop:1.0 .
docker run -p 8080:80 -d shop:1.0
# Open http://localhost:8080 → "Siti's Shop"
docker push shop:1.0 # to Hub if wanted
```

---

## Key Concepts

### `FROM` / `COPY` / `RUN` / `CMD`
Base image / copy files / run at build / run at start.

---

## Beginner Friendly Explanation

### Analogy: Cake Recipe
- **`FROM` = ready mix**, **`COPY` = add own toppings**, **`RUN` = bake steps**, **`CMD` = serve instruction**.

### Step 0 — Prepare Device
- Folder with `Dockerfile` + `index.html`, `docker build`.

### How the Computer Reads It
1. `docker build` → executes lines top-to-bottom → layers → image.
2. `docker run` → box from your image serves your HTML.

### 3 Must-Know Terms
1. **FROM/COPY/CMD**: base/add/serve

---

## Experiments

- **Green:** Edit `index.html` → rebuild → new content?
- **Yellow:** Wrong `COPY` path → build error? Fix path.
- **Red:** No `EXPOSE` → still works with `-p`? (EXPOSE is documentation!)

---

## Challenge

**Own Box:** `Dockerfile` + custom `index.html` (name + hours + 1 image) + `build` + `run` + browser screenshot. **Beginner Docker DONE!**

---

## Mini Glossary

- **Dockerfile/build**: recipe/bake

---

### Bonus: HEALTHCHECK + .dockerignore (best practice, docs.docker.com!)

```dockerfile
# Add to Dockerfile — Docker checks the shop alive every 30s!
HEALTHCHECK --interval=30s --timeout=3s CMD wget -qO- http://localhost:80/ || exit 1
```

```
# .dockerignore — NEVER carry trash into images (beside Dockerfile)!
node_modules
.git
*.log
.env
```
- Without `.dockerignore`, `COPY . .` carries 500MB `node_modules` + LEAKED `.env` secrets into images! `docker build` also slows down.
- Health check: `docker ps` STATUS column → `healthy` (not just `Up`)!

---

## Summary

Week 4: **Box Recipe** — Dockerfile `FROM/COPY/RUN`. **Beginner Docker DONE!** Next: **Volumes** (Intermediate).
