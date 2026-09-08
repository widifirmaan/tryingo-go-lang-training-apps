# Capstone: Enterprise API — NestJS Shop Grand Opening

> **Kategori:** NestJS | **Level:** Advanced | **Minggu 12:** Capstone: Enterprise API

## Learning Objectives

- Combine W1-W11: `module` + `auth` + `TypeORM` + `WebSocket` + `test` + `Docker` into a real store (not `console.log`!)

---

## Why This Matters (Non-IT)

11 separate weeks — capstone proves the combination: list → login → order → live → tested → deployed. Your "production-ready NestJS" portfolio.

---

## Program: Grand Opening Store (Checklist)

```bash
nest new shop
npm install @nestjs/typeorm typeorm pg @nestjs/jwt @nestjs/websockets
```

Required features (check 1 by 1):
- [ ] `ProductsModule` CRUD + `ValidationPipe` + `Postgres` (W2-W4)
- [ ] `login` JWT + `@UseGuards` for `POST/DELETE` (W6)
- [ ] `Gateway` broadcasts `out-of-stock` (W10)
- [ ] 3 GREEN tests (`npm test`) (W9)
- [ ] `Dockerfile` + `docker build` + `docker run` (W4-Docker)

```bash
npm test          # GREEN?
npm run build && npm run start:prod  # runs?
curl localhost:3000/products  # JSON?
```

**Capstone task:** Repo + green tests + public URL (`Railway`) + 1-min video (list → login → add → live). **NestJS 0→Expert DONE!** 🎉

---

## Key Concepts

### Capstone = Combine 11 Weeks
Module + auth + DB + live + test + deploy = store.

---

## Beginner Friendly Explanation

### Analogy: Grand Opening
- **W1-W4 foundation** + **W6-W11 engine** = store. **W12 = open**.

### Step 0 — Prepare Device
- Nest CLI + test runner + deploy target ready.

### How the Computer Reads It
1. Checklist top-to-bottom → production NestJS store.
2. Public URL + video → portfolio done.

### 3 Must-Know Terms
1. **Capstone/deploy**: combine/open

---

## Experiments

- **Green:** `npm test` GREEN?
- **Yellow:** `curl` products → JSON array?
- **Red:** Guard-less delete → open hole? Add guard.

---

## Challenge

**Grand Opening:** All checklist + URL + video. **NestJS 0→Expert DONE!** 🎉

---

## Mini Glossary

- **Capstone/deploy**: combine/open

---

## Summary

Week 12 of 12: **Grand Opening** (Level: Advanced). **NestJS 0→Expert from zero DONE!** 🎉
