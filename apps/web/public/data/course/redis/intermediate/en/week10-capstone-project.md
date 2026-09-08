# Capstone: Real-time Analytics — Live Shop Dashboard

> **Kategori:** Redis | **Level:** Intermediate | **Minggu 10:** Capstone: Real-time Analytics

## Learning Objectives

- Combine W1-W9: `String` counters + `Hash` cards + `Sorted Set` rankings + `Streams` orders + `Pub/Sub` broadcasts + TTL into a live shop dashboard

---

## Why This Matters (Non-IT)

9 separate weeks — capstone proves the combination: rising visitors, live best-seller ranking, flowing orders, empty-stock broadcasts. Your "real-time Redis" portfolio.

---

## Program: Live Shop Dashboard (Checklist)

```bash
# 1. Visitor counter (W1 String + daily EXPIRE)
INCR visitors:2026-08-25

# 2. Product card (W2 Hash)
HSET product:1 name "Rice" price 62000 stock 10

# 3. Live ranking (W5 Sorted Set)
ZINCRBY best 1 "rice"
ZREVRANGE best 0 2 WITHSCORES  # top 3 live!

# 4. Order stream (W6 Streams)
XADD orders * name "Budi" total 62000
XREAD COUNT 10 STREAMS orders 0

# 5. Empty broadcast (W6 Pub/Sub)
PUBLISH stock "Rice empty!"  # cashiers SUBSCRIBE hear

# 6. List cache (W9 TTL)
SET list:json "..." EX 60
```

**Capstone task:** Script `dashboard.sh` running 1-6 in order + screenshot each result + `INFO stats` (uptime, memory). **Redis 0→Expert DONE!** 🎉

---

## Key Concepts

### Capstone = Combine 9 Weeks
String + Hash + List + Set + ZSet + Streams + Pub/Sub + TTL = live dashboard.

---

## Beginner Friendly Explanation

### Analogy: Live Dashboard
- **Counters tick, rankings shift, orders stream** — all from one RAM drawer.

### Step 0 — Prepare Device
- `redis-cli` + `dashboard.sh` script + phone to verify.

### How the Computer Reads It
1. Checklist 1-6 in order → live dashboard state built.
2. `INFO stats` → uptime + memory proof.

### 3 Must-Know Terms
1. **Capstone/live**: combine/live

---

## Experiments

- **Green:** `ZREVRANGE` after 3 sales → ranking shifts live?
- **Yellow:** `PUBLISH` while cashier listens → instant?
- **Red:** Skip TTL → stale list? Add `EX 60`.

---

## Challenge

**Grand Opening:** All checklist + `INFO` + 1-min order→ranking-shift-live video. **Redis 0→Expert DONE!** 🎉

---

## Mini Glossary

- **Capstone/live**: combine/live

---

## Summary

Week 10 of 10: **Live Dashboard** (Level: Intermediate). **Redis 0→Expert from zero DONE!** 🎉
