# Auth — KTP Node

> **Kategori:** Node.js | **Level:** Menengah | **Minggu 7:** Auth

## Tujuan Pembelajaran

- `jsonwebtoken` KTP: `jwt.sign({id}, "rahasia")`, `jwt.verify`, `middleware` cek `Authorization` header

---

## Program

```javascript
const jwt = require("jsonwebtoken");
const express = require("express");
const app = express();
app.use(express.json());

const SECRET = "rahasia-warung";

app.post("/login", (req,res)=>{
  const { username } = req.body;
  const token = jwt.sign({ username }, SECRET, { expiresIn: "1h" });
  res.json({ token });
});

function cek(req,res,next){
  const token = req.headers.authorization?.split(" ")[1];
  try{ req.user = jwt.verify(token, SECRET); next(); }
  catch{ res.status(401).json({ error: "Belum login" }); }
}

app.get("/admin", cek, (req,res)=>res.json({ pesan: `Halo ${req.user.username}` }));
app.listen(3000);
```

Test: `curl -X POST -H "Content-Type: application/json" -d '{"username":"admin"}' http://localhost:3000/login` → token → `curl -H "Authorization: Bearer TOKEN" http://localhost:3000/admin`.

---

## Ringkasan

Minggu 7: **KTP Node** — JWT + middleware.
