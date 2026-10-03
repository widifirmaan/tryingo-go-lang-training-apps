# Browser Storage: LocalStorage, SessionStorage & JSON Persistence

> **Kategori:** JavaScript | **Level:** Asynchronous, Storage & Kanban Project | **Minggu 11:** Browser Storage: LocalStorage, SessionStorage & JSON Persistence
> ⏱️ **Estimated Time:** 45 Minutes (15m theory, 30m practice) | 🔗 **Pace:** Structured (Step-by-step)


## Learning Objectives

- Differentiate LocalStorage (persistent) from SessionStorage (session-bound)
- Understand Web Storage quotas (~5MB) and string-only data restrictions
- Master JSON.stringify() serialization and JSON.parse() deserialization
- Build a storage abstraction helper to eliminate key collision issues
- Safely handle quota exceeded errors with defensive try-catch blocks

---

## Program: Application State Persistence Engine with LocalStorage Encapsulation

```javascript
class StorageManager {
  static simpan(kunci, nilai) {
    try {
      localStorage.setItem(kunci, JSON.stringify(nilai));
      return true;
    } catch (e) {
      console.error("Gagal menyimpan ke storage:", e);
      return false;
    }
  }

  static ambil(kunci, fallback = null) {
    try {
      const data = localStorage.getItem(kunci);
      return data ? JSON.parse(data) : fallback;
    } catch (e) {
      return fallback;
    }
  }
}

// Uji Simpan dan Baca
StorageManager.simpan("preferensi_user", { tema: "dark", fontSize: 16 });
const saved = StorageManager.ambil("preferensi_user");
console.log("Tema tersimpan:", saved.tema);
```

---

## Key Concepts

### Web Storage & JSON Serialization
LocalStorage retains data across browser restarts. Because it accepts only raw string tokens, rich objects or arrays must be serialized with `JSON.stringify()` on save and deserialized with `JSON.parse()` on load.

---

---

## Beginner Friendly Explanation

### Analogy: Home Safe
LocalStorage is a home steel safe: important documents placed inside remain securely preserved even when the power is turned off.

## Experiments

- Open DevTools Application -> Local Storage to inspect persisted key-value pairs.
- Save an object without JSON.stringify to see the broken [object Object] string.
- Use localStorage.removeItem() to delete a specific key.
- Use localStorage.clear() to wipe all storage.

---

## Challenge

Build a simple cache helper that stores API results in LocalStorage with a 5-minute time-to-live (TTL) expiration.

---

## Syntax Cheatsheet & Quick Reference

| Syntax / Keyword | Purpose & Practical Pattern |
| :--- | :--- |
| **Declaration & Setup** | Initialize data structures, type constraints, and dependencies |
| **Core Processing** | Algorithm execution, control flow, and data transformation |
| **Defensive Validation** | Verify data invariants and handle errors explicitly |
| **Return / Output** | Deliver deterministic output ready for consumption |

---

## Common Pitfalls & Debugging Tips

### 1. Loose Equality Bugs (== vs ===)
- **Symptom / Issue:** Unintended type coercion leads to subtle logic bugs (e.g. `0 == ''` is true).
- **Root Cause:** Common mistaken assumptions during early development.
- **Fix / Best Practice:** Consistently use strict equality operators (`===` and `!==`).

### 2. Direct State & Array Mutation
- **Symptom / Issue:** Prevents reactive UI frameworks from detecting updates and causes hard-to-track bugs.
- **Root Cause:** Common mistaken assumptions during early development.
- **Fix / Best Practice:** Embrace immutable updates using spread syntax (`{ ...obj }`, `[...arr]`) or `.map()` and `.filter()`.

### 3. Unhandled Asynchronous Rejections
- **Symptom / Issue:** Uncaught promise failures crash backend processes or leave user interfaces frozen.
- **Root Cause:** Common mistaken assumptions during early development.
- **Fix / Best Practice:** Wrap `await` calls in explicit `try { ... } catch (err) { ... }` blocks.

---

## Summary

You have mastered persistent browser storage. Next week is the capstone project: building a full-featured interactive Kanban Board!
