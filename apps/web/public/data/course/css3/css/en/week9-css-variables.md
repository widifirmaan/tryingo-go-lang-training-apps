# CSS Variables — One-Change Shop Palette (MDN)

> **Kategori:** CSS3 | **Level:** Complete CSS3 | **Minggu 9:** CSS Variables
> **Prerequisites:** Week 8 — **Animation & Transitions**.

## Learning Objectives

- `:root { --green: #2E5B44; }` palette at root, `var(--green)` use anywhere, `var(--green, #000)` fallback if missing (source: MDN Using custom properties)
- `@property --green { syntax: "<color>"; initial-value: #2E5B44; inherits: false; }` for type + `initial-value` fallback

---

## Why This Matters (Non-IT)

Shop rethemes from green to blue — without variables, manually change 30 `background: #2E5B44` files. With `--green` in `:root`, change 1 line → all buttons, cards follow.

---

## Program: One-Change Palette (MDN)

```html
<!DOCTYPE html><html lang="en"><head><meta charset="UTF-8"><title>Shop Palette</title>
<style>
  :root {
    --green: #2E5B44;
    --cream: #EFECE6;
    --radius: 12px;
  }
  /* @property for type + initial (MDN) */
  @property --green {
    syntax: "<color>";
    inherits: false;
    initial-value: #2E5B44;
  }

  .btn { background: var(--green); color: white; padding: 12px; border-radius: var(--radius); border: none; }
  .btn:hover { background: var(--green, #1a3326); } /* fallback if --green invalid */
  .card { background: var(--cream); padding: 16px; border-radius: var(--radius); border: 1px solid var(--green); }
  /* Retheme: change :root only */
</style></head>
<body>
  <button class="btn">Buy</button>
  <div class="card">Rice 5kg — Rp 62,000</div>
</body></html>
```

**Source:** MDN `var(--green, fallback)` and `@property syntax`.

---

## Key Concepts

### `--green` in `:root` + `var(--green)`
`--green: #2E5B44` in `:root` inherits everywhere, `var(--green)` uses it, `var(--green, #000)` fallback if missing.

### `@property` = Type Registry
`@property --green { syntax: "<color>"; initial-value: #2E5B44; }` stops `var(--green)` becoming `16px` (invalid).

---

## Beginner Friendly Explanation

### Analogy: Store Paint Palette

- **`--green` = green paint can**: stored in `:root` warehouse, all workers take `var(--green)`.
- **`var(--green, #000)` = spare paint**: if the can is gone, use black.

### Step 0 — Prepare Device

VS Code + browser, create `palette.html`, open, change `--green` in `:root` → all follow.

### How the Computer Reads It

1. `:root { --green: #2E5B44 }` → stored at root.
2. `.btn { background: var(--green) }` → takes `#2E5B44`.

### 3 Must-Know Terms

1. **--var**: custom property
2. **var()**: use + fallback
3. **@property**: type registry

---

## Experiments

- **Green:** Change `--green: #2E5B44` to `#1572B6` (blue) → all buttons blue?
- **Yellow:** Delete `--green` → `var(--green, #000)` becomes black?
- **Red:** `var(--green, red, blue)` → fallback `red, blue`?

---

## Challenge

**2-Theme Shop:** `:root { --green: #2E5B44 }` + `Change Theme` button running `document.documentElement.style.setProperty('--green', '#E34F26')` (JS) → click switches green→orange.
- **Link-up (Week 8 — Animation & Transitions):** plug this challenge's result into that flow; make sure it runs end-to-end.

---
## Mini Glossary

- **--var/var()/@property**: variable/use/registry

---

## Summary

Week 9 of 12: **One-Change Palette** (Level: Complete). Retheme in 1 line. Next: **Architecture** — BEM.
