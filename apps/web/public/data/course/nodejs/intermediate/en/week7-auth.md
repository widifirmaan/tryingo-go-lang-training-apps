# Auth — Node ID

> **Kategori:** Node.js | **Level:** Intermediate | **Minggu 7:** Auth
> **Prerequisites:** Week 6 — **REST API**.

## Learning Objectives

- `jsonwebtoken` ID: `jwt.sign({id}, "secret")`, `jwt.verify`, `middleware` checks `Authorization` header

---

## Why This Matters (Non-IT)

Without JWT, anyone opens `/admin`. With `sign` + `verify` + middleware, 10 lines guard all doors.

---

## Program

```javascript
const jwt = require("jsonwebtoken");
const express = require("express");
const app = express();
app.use(express.json());

const SECRET = "shop-secret";

app.post("/login", (req,res)=>{
  const { username } = req.body;
  const token = jwt.sign({ username }, SECRET, { expiresIn: "1h" });
  res.json({ token });
});

function check(req,res,next){
  const token = req.headers.authorization?.split(" ")[1];
  try{ req.user = jwt.verify(token, SECRET); next(); }
  catch{ res.status(401).json({ error: "Not logged in" }); }
}

app.get("/admin", check, (req,res)=>res.json({ msg: `Hello ${req.user.username}` }));
app.listen(3000);
```

Test: `curl -X POST -H "Content-Type: application/json" -d '{"username":"admin"}' http://localhost:3000/login` → token → `curl -H "Authorization: Bearer TOKEN" http://localhost:3000/admin`.


---

## Beginner Friendly Explanation

### Analogy: Node Concert Wristband
- **`jwt.sign` = print wristband**: correct login gets a 1-hour token; `verify` checks every VIP door.
- **Middleware `check` = stick-on guard**: 10 lines guard ALL doors!

### Step 0 — Prepare Device
- Same as Node W1: `node -v` + `npm install express` (+ `jsonwebtoken`/`prisma` per week).

### How the Computer Reads It
- `jwt.sign` makes the wristband; middleware checks `Authorization: Bearer` at every guarded door.

### 3 Must-Know Terms
- 1. **JWT/middleware**: wristband/guard

---

## Challenge

**Auth in Your Shop:** use `/login`, `/admin`, `check` until it truly runs, then do these three levels.
- **Green:** Run this week's Program as-is; note the output.
- **Yellow:** Change 1 value in `/login`, `/admin`, `check`; predict the output BEFORE running, then compare.
- **Red:** Combine with **REST API** (Week 6): plug the result into that flow, end-to-end must work.

## Mini Glossary

- See Must-Know Terms above.

## Summary

Week 7: **Node ID** — JWT + middleware. Next: **Database**.
