# Error Handling — No-Panic Shop Alarm

> **Kategori:** JavaScript | **Level:** Intermediate | **Minggu 10:** Error Handling

## Learning Objectives

- `try { ... } catch (err) { ... } finally { ... }` — try, catch on fail, finally close
- `throw new Error("out of stock")` make your own alarm
- `async try/catch` for `await fetch`

---

## Why This Matters (Non-IT)

Without `try/catch`, `JSON.parse` on broken data → shop crashes, white screen. With `try`, show "Broken data, try again" — no panic.

---

## Program: Crash-Proof Cashier

```javascript
function parseStock(json){
  try {
    const data = JSON.parse(json); // can fail if json broken
    if (!data.name) throw new Error("Name required");
    console.log("Success:", data);
    return data;
  } catch (err) {
    console.log("Failed:", err.message);
    return { name: "Unknown", stock: 0 };
  } finally {
    console.log("Check done");
  }
}

parseStock('{"name":"Rice","stock":10}');
parseStock('broken{');
parseStock('{"stock":10}'); // no name → throw

async function fetchIt(){
  try {
    const res = await fetch("https://api.shop.com/products");
    if (!res.ok) throw new Error("Fetch failed " + res.status);
    const data = await res.json();
    console.log(data);
  } catch (err){
    console.log("Fetch failed:", err.message);
  }
}
```

---

## Key Concepts

### `try/catch/finally`
`try` attempt, `catch` catches error, `finally` always runs (close the door).

### `throw`
Make your own error `throw new Error("out of stock")`.

### `async` + `try`
Failed `await` needs `try/catch`, not just `.catch`.

---

## Beginner Friendly Explanation

### Analogy: Fire Alarm
- **`try` = try cooking**, **`catch` = if stove explodes, extinguish**, **`finally` = turn off gas**.

### Step 0 — Prepare Device
- Node.js or browser console, feed valid + broken JSON, compare.

### How the Computer Reads It
1. `JSON.parse('broken{')` → throws → jumps to `catch`.
2. `finally` runs regardless — success or fail.

### 3 Must-Know Terms
1. **try/catch/throw**: attempt/catch/raise

---

## Experiments

- **Green:** Valid JSON → `Success` path?
- **Yellow:** Broken JSON → `catch` + fallback object?
- **Red:** Remove `try` → white-screen crash? Restore.

---

## Challenge

**Safe Shop:** `function calc(price,qty){ if(qty<=0) throw new Error("Bad qty"); return price*qty }` → `try { calc(62000,0)} catch(e){ console.log(e.message)}`.

---

## Mini Glossary

- **try/catch/finally**: attempt/catch/always

---

## Summary

Week 10: **No-Panic Alarm** — `try/catch` so the shop never crashes. Intermediate DONE → Advanced next.
