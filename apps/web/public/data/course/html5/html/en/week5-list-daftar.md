# Lists — Shelf of Lists

> **Kategori:** HTML5 | **Level:** Complete HTML5 | **Minggu 5:** List & Daftar

## Learning Objectives

- `ul` unordered (bullets), `ol` ordered (1,2,3), `li` items, `dl/dt/dd` dictionary

---

## Why This Matters (Non-IT)

Product lists, cooking steps, FAQ — all lists. Without `ul/ol`, writing ` - Rice<br> - Spinach` gets messy.

---

## Program: Shop Lists

```html
<h2>Products</h2>
<ul>
  <li>Rice 5kg — Rp 62,000</li>
  <li>Spinach — Rp 5,000</li>
</ul>

<h2>Order Steps</h2>
<ol>
  <li>Pick products</li>
  <li>WA 0812</li>
  <li>Pay COD</li>
</ol>

<h2>Glossary</h2>
<dl>
  <dt>Rice</dt><dd>Daily staple</dd>
  <dt>Spinach</dt><dd>Green vegetable</dd>
</dl>
```

**Zag `ul` vs `ol`:** `ul` bullets, `ol` numbers. `ol start="5"` starts at 5, `reversed`.

---

## Key Concepts

### `ul` / `ol` / `li`
`ul` bullets (products), `ol` numbers (steps), `li` each item — never bare text in list.

### `dl` / `dt` / `dd`
Dictionary: `dt` term, `dd` definition (glossary, FAQ).

---

## Beginner Friendly Explanation

### Analogy: Shelf Rows
- **`ul` = shelf of goods** (order free), **`ol` = recipe steps** (order matters), **`dl` = dictionary**.

### Step 0 — Prepare Device
- VS Code + browser, `lists.html`, add 3 lists, see bullets vs numbers.

### How the Computer Reads It
1. `<ul><li>Rice</li></ul>` → bullet + "Rice".
2. `<ol start="5">` → numbering starts at 5.

### 3 Must-Know Terms
1. **ul/ol/li**: bullets/numbers/items

---

## Experiments

- **Green:** Add 1 `li` → new bullet appears?
- **Yellow:** `ol start="5"` → starts at 5?
- **Red:** Text directly in `ul` without `li` → invalid? Wrap it.

---

## Challenge

**Shop Lists:** `ul` 5 products + `ol` 4 order steps + `dl` 3 terms + `start` on one list.

---

## Mini Glossary

- **ul/ol/li/dl**: bullets/numbers/items/dictionary

---

## Summary

Week 5 of 14: **Lists** — `ul/ol` shelf of lists. Next: **Tables**.
