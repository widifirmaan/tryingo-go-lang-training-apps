# Decorators & Generators — Stamps and Queues

> **Kategori:** Python | **Level:** Intermediate | **Minggu 8:** Decorators & Generators
> **Prerequisites:** Week 7 — **File I/O**.

## Learning Objectives

- `decorator` = stamp on function — `@log` logs before/after
- `generator` `yield` = queue: give 1, wait, give again (saves RAM)

---

## Why This Matters (Non-IT)

Shops want `calcTotal` to auto log "start" and "done" without writing `print` in every function — one decorator stamp for all.

---

## Program

```python
# Decorator = stamp
def log(func):
    def wrapper(*args, **kwargs):
        print(f"Start {func.__name__}")
        result = func(*args, **kwargs)
        print(f"Done {func.__name__}: {result}")
        return result
    return wrapper

@log
def calc(a, b):
    return a + b

print(calc(2, 3))

# Generator = thrifty queue
def product_queue(items):
    for p in items:
        print(f"Prepare {p}")
        yield p  # give 1, pause, continue on next()

for item in product_queue(["Rice", "Spinach", "Eggs"]):
    print("Send:", item)

# Saves RAM: range(1_000_000) doesn't build a 1M list, but yields 1 by 1
```

---

## Key Concepts

### Decorator `@log`
Function wrapping another function — adds logging without changing content.

### Generator `yield`
`return` finishes once, `yield` gives 1, pauses, gives again — for 1M products thrifty.

---

## Beginner Friendly Explanation

### Analogy

- **Decorator = stamp**: stick `@log` on recipe, auto stamps "Start/Done".
- **Generator = shop queue**: call 1, serve 1, call again.

### Step 0 — Prepare Device
- Python terminal, paste decorator, apply to 2 functions.

### How the Computer Reads It
1. `@log` above `calc` → `calc = log(calc)` (wrapped).
2. `yield p` → pauses, resumes on next loop step.

### 3 Must-Know Terms
1. **decorator/yield**: stamp/queue

---

## Experiments

- **Green:** `@log` on another function → logs too?
- **Yellow:** Loop generator twice → second loop empty (exhausted)? Recreate.
- **Red:** `return` in generator → stops early? Use `yield`.

---

## Challenge

**Time Stamp:** Build `@timer` that `start = time.time()` before `func` and `print(time.time()-start)` after. Use on `calc(a,b)`.
- **Link-up (Week 7 — File I/O):** plug this challenge's result into that flow; make sure it runs end-to-end.

---
## Mini Glossary

- **decorator/generator**: stamp/queue

---

## Summary

Week 8: **Stamps & Queues** — decorators & generators. Intermediate Python DONE! Next week: **Libraries**.
