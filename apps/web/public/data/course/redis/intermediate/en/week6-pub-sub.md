# Pub/Sub — Redis Shop Loudspeaker

> **Kategori:** Redis | **Level:** Intermediate | **Minggu 6:** Pub/Sub & Streams

## Learning Objectives

- `SUBSCRIBE stock` listens to a channel, `PUBLISH stock "empty"` broadcasts (source: redis.io/docs/data-types/pubsub)
- `XADD`/`XREAD` streams (durable queue, unlike pub/sub which is lost when unheard)

---

## Why This Matters (Non-IT)

Empty stock → 3 cashiers + warehouse must know NOW. Without pub/sub, every cashier polls the DB every second (wasteful). With `PUBLISH`, 1 broadcast → all hear. Streams for orders (must not be lost even when workers die).

---

## Program: Shop Broadcast & Durable Queue

```bash
# Terminal 1 (listens):
SUBSCRIBE stock
# Terminal 2 (broadcasts):
PUBLISH stock "Rice empty!"
# → Terminal 1 receives instantly!

# Streams (durable queue, has IDs):
XADD orders * name "Budi" total 62000
XADD orders * name "Siti" total 5000
XREAD COUNT 2 STREAMS orders 0
XREAD BLOCK 5000 STREAMS orders $
```

---

## Key Concepts

### Pub/Sub = Loudspeaker (Lost When Unheard)
`SUBSCRIBE` first, then `PUBLISH` arrives. Late listeners miss out.

### Streams = Durable Queue Book
`XADD` stores + time ID, `XREAD` reads (can start from old IDs). Dead worker → resumes from last ID.

---

## Beginner Friendly Explanation

### Analogy: Loudspeaker & Cashier Book
- **Pub/Sub = mosque loudspeaker**: broadcasts now, absentees miss out.
- **Streams = numbered queue book**: tear a number, recalls possible.

### Step 0 — Prepare Device
- 2 `redis-cli` terminals (or `try.redis.io` 2 tabs).

### How the Computer Reads It
1. `SUBSCRIBE stock` → connection becomes a listener.
2. `PUBLISH stock "x"` → server forwards to all listeners of that channel.

### 3 Must-Know Terms
1. **Publish/subscribe**: broadcast/listen
2. **Streams/XADD**: book/write

---

## Experiments

- **Green:** Broadcast with no listener → lost? (Yes! Unlike streams.)
- **Yellow:** 2 listeners → both receive?
- **Red:** `XREAD` from `0` vs `$` → old vs new?

---

## Challenge

**Broadcast Shop:** `SUBSCRIBE` 2 terminals + `PUBLISH` 3 messages + `XADD` 2 orders + `XREAD` re-read.

---

## Mini Glossary

- **Pub/Sub/Streams**: broadcast/queue

---

## Summary

Week 6 of 10: **Broadcast** (Level: Intermediate). Loud + durable. Next: **Lua**.
