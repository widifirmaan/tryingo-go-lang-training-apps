# Performance — Node Shop Stays Fast

> **Kategori:** Node.js | **Level:** Advanced | **Minggu 10:** Performance
> **Prerequisites:** Week 9 — **Testing**.

## Learning Objectives

- `pm2` keeps the shop alive, `cluster` 4 cashiers, `caching` drawer

---

## Why This Matters (Non-IT)

100 req/second without `pm2` cluster = 1 core works, 7 idle + dead stays dead. With `pm2 -i max`, all cores + dead revives.

---

## Program

```bash
npm install -g pm2
pm2 start server.js -i 4 # 4 cashiers
pm2 logs
pm2 restart server
```

```javascript
// simple caching
const cache = new Map();
app.get("/products", (req,res)=>{
  if(cache.has("products")) return res.json(cache.get("products"));
  const data = [{ id: 1, name: "Rice" }];
  cache.set("products", data);
  res.json(data);
});
```


---

## Beginner Friendly Explanation

### Analogy: 8-Cashier Shop
- **1 process = 1 cashier**: 7 cores idle + dead stays dead!
- **`pm2 -i max` = cashier per core** + revives. `Map` cache = cheat sheet, no recount!

### Step 0 — Prepare Device
- Same as Node W1 + this week's package (`vitest`/`pm2`/`vercel`).

### How the Computer Reads It
- `pm2 start -i max` 1 process per core; `pm2 logs` peeks; `pm2 restart` refreshes.

### 3 Must-Know Terms
- 1. **pm2/cluster**: foreman/many-cashiers

---

## Mini Glossary

- See Must-Know Terms above.

## Summary

Week 10: **Fast** — `pm2` + `cache`. Next: **Deploy**.
