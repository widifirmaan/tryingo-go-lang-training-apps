# REST API — Complete Online Node Shop

> **Kategori:** Node.js | **Level:** Intermediate | **Minggu 6:** REST API
> **Prerequisites:** Week 5 — **Express Server**.

## Learning Objectives

- `GET /products`, `POST /products` `req.body`, `PUT /products/:id`, `DELETE` — CRUD API, `status 201/404`

---

## Why This Matters (Non-IT)

Phones need list-`GET` + add-`POST` + delete-`DELETE`. Without correct `status` (201/404), phones can't tell success/failure. Express does APIs in 10 lines.

---

## Program: Shop API

```javascript
const express = require("express");
const app = express();
app.use(express.json());
let products = [{ id: 1, name: "Rice", price: 62000 }];

app.get("/products", (req,res)=>res.json(products));
app.get("/products/:id", (req,res)=>{
  const p = products.find(x=>x.id==req.params.id);
  if(!p) return res.status(404).json({ error: "Missing" });
  res.json(p);
});
app.post("/products", (req,res)=>{
  const fresh = { id: Date.now(), ...req.body };
  products.push(fresh);
  res.status(201).json(fresh);
});
app.delete("/products/:id", (req,res)=>{
  products = products.filter(x=>x.id != req.params.id);
  res.json({ ok: true });
});
app.listen(3000, ()=>console.log("http://localhost:3000/products"));
```

Test: `curl http://localhost:3000/products` and `curl -X POST -H "Content-Type: application/json" -d '{"name":"Sugar","price":15000}' http://localhost:3000/products`


---

## Beginner Friendly Explanation

### Analogy: JSON Drive-Thru Node
- **Express = ready waiter**: 1 line 1 door + automatic JSON.
- **`res.status(201/404)` = stamps**: phones know success vs missing!

### Step 0 — Prepare Device
- Same as Node W1: `node -v` + `npm install express` (+ `jsonwebtoken`/`prisma` per week).

### How the Computer Reads It
- `app.get/post/delete` lists doors; `express.json()` opens envelopes; `res.status(201)` stamps success.

### 3 Must-Know Terms
- 1. **Express/status**: waiter/stamp

---

## Experiments

- **Green:** Open `/products` → what shows? Try `/products/:id` → what differs?
- **Yellow:** Change the case of `express` and `app` → still runs or error?
- **Red:** Mistype 1 letter in `express` → what error message? Fix it.

## Challenge

**REST API in Your Shop:** use `/products`, `/products/:id` until it truly runs, then do these three levels.
- **Green:** Run this week's Program as-is; note the output.
- **Yellow:** Change 1 value in `/products`, `/products/:id`; predict the output BEFORE running, then compare.
- **Red:** Combine with **Express Server** (Week 5): plug the result into that flow, end-to-end must work.

## Mini Glossary

- See Must-Know Terms above.

## Summary

Week 6: **Shop REST** — `GET/POST/DELETE` JSON. Next: **Auth**.
