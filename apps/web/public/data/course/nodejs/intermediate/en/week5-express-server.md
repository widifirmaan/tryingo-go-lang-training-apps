# Express Server — Online Node Shop

> **Kategori:** Node.js | **Level:** Intermediate | **Minggu 5:** Express Server
> **Prerequisites:** Week 4 — **Events & Async**.

## Learning Objectives

- `npm install express`, `app.get("/products", (req,res)=>res.json(list))`, `app.listen(3000)`

---

## Why This Matters (Non-IT)

Raw Node `http` is fussy. Express = **ready-to-use shop waiter**: 1-line `app.get` becomes an API.

---

## Program: Express Shop

```bash
npm install express
```

```javascript
// server.js
const express = require("express");
const app = express();
app.use(express.json());

let list = [{ id: 1, name: "Rice", price: 62000 }];

app.get("/products", (req, res) => res.json(list));
app.get("/products/:id", (req, res) => {
  const p = list.find(x => x.id == req.params.id);
  res.json(p || { error: "Missing" });
});
app.post("/products", (req, res) => {
  const fresh = { id: Date.now(), ...req.body };
  list.push(fresh);
  res.status(201).json(fresh);
});

app.listen(3000, () => console.log("Open http://localhost:3000/products"));
```

`node server.js` → `curl http://localhost:3000/products`.

---

## Key Concepts

### `app.get/post` = Doors
`app.get("/products", handler)` 1 line = 1 API door.

### `express.json()` = Envelope Opener
Parses JSON bodies into `req.body`.

---

## Beginner Friendly Explanation

### Analogy: Ready Waiter
- **Express = trained waiter**: shouts orders to kitchen, serves JSON.

### Step 0 — Prepare Device
- Node + `npm install express`, `node server.js`, `curl` each door.

### How the Computer Reads It
1. `GET /products` → matching handler → `res.json(list)`.
2. `POST` with JSON → `express.json()` fills `req.body`.

### 3 Must-Know Terms
1. **Express/route/status**: waiter/door/stamp

---

## Experiments

- **Green:** `curl /products` → JSON array?
- **Yellow:** `curl /products/99` → `{ error }`?
- **Red:** POST without `express.json()` → `req.body` undefined? Add middleware.

---

## Challenge

**Express Shop:** GET list + GET 1 + POST + `curl` all 3 + 201 status check.
- **Link-up (Week 4 — Events & Async):** plug this challenge's result into that flow; make sure it runs end-to-end.

---
## Mini Glossary

- **Express/json**: waiter/envelope

---

## Summary

Week 5: **Express** — `app.get/post` becomes API. Next: **REST** — full API.
