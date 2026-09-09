# HTML APIs — Advanced Features Without Heavy JavaScript

> **Kategori:** HTML5 | **Level:** Complete HTML5 | **Minggu 11:** HTML APIs
> **Prerequisites:** Week 10 — **Multimedia**.

## Learning Objectives

- `details` + `summary` pure-HTML open/close FAQ (source: MDN details)
- `dialog` + `showModal()` popup + `form method="dialog"` close (source: MDN dialog)
- `progress`/`meter` bars, `datalist` input suggestions

---

## Why This Matters (Non-IT)

FAQ with 10 questions without `details` = 10x JS toggles + 50 lines. With `details`, 0 JS. Promo popup without `dialog` = div + JS + manual z-index. With `showModal()`, auto focus + ESC close + backdrop.

---

## Program: Pure-HTML FAQ & Popup

```html
<h2>Shop FAQ</h2>
<details>
  <summary>Free delivery?</summary>
  <p>Yes, for orders &gt;Rp 100,000 (RW 01-03).</p>
</details>
<details>
  <summary>Opening hours?</summary>
  <p>07.00 — 20.00 daily.</p>
</details>

<dialog id="promo">
  <h3>10% Promo Today!</h3>
  <p>Code: <code>SHOP10</code></p>
  <form method="dialog"><button>Close</button></form>
</dialog>
<button onclick="promo.showModal()">See Promo</button>

<label>Stock sold:</label>
<progress value="70" max="100">70%</progress>
<input list="items" placeholder="Search products">
<datalist id="items">
  <option value="Rice"></option>
  <option value="Spinach"></option>
</datalist>
```

---

## Key Concepts

### `details` + `summary` = Folding FAQ
Click `summary` → open/close. `open` attribute for default open.

### `dialog` + `showModal()` = Official Popup
`showModal()` modal (focus locked + ESC + `::backdrop`), `show()` plain. `form method="dialog"` closes without JS.

### `progress`/`meter`/`datalist` = Small but Mighty
`progress` progress, `datalist` typing suggestions.

---

## Beginner Friendly Explanation

### Analogy: Folded Flyer & Glass Display
- **details = folded brochure**: unfold to read.
- **dialog = glass display**: pops in front, ESC closes.

### Step 0 — Prepare Device
- VS Code + modern browser (`dialog` Baseline 2022 — Chrome 37+, Firefox 98+, Safari 15.4+).

### How the Computer Reads It
1. Click `summary` → browser toggles `open` → shows content.
2. `showModal()` → modal layer + focus into dialog.

### 3 Must-Know Terms
1. **details/summary**: fold/fold-title
2. **dialog/showModal**: popup/open-modal

---

## Experiments

- **Green:** Add `open` to `details` → open by default?
- **Yellow:** Bare `dialog` without `showModal` → not shown? (Must call it!)
- **Red:** Plain `form` (no `method="dialog"`) in dialog → page reloads? Switch to `dialog`.

---

## Challenge

**Pure Interactive Shop:** 5 FAQ `details` + 1 promo `dialog` (`showModal` + `method="dialog"`) + stock `progress` + `datalist` 6 products. 0 JS except 1 `onclick` line.
- **Link-up (Week 10 — Multimedia):** plug this challenge's result into that flow; make sure it runs end-to-end.

---
## Mini Glossary

- **details/dialog/progress**: fold/popup/bar
- **showModal/backdrop**: open-modal/background

---

## Summary

Week 11 of 14: **Pure-HTML Advanced Features** (Level: Complete). No heavy JS. Next: **Accessibility**.
