# Multimedia — Shop Photos, Audio, Video

> **Kategori:** HTML5 | **Level:** Complete HTML5 | **Minggu 10:** Multimedia & Audio Video

## Learning Objectives

- `audio controls src` + `video controls poster` + `source` multi-format, fallback text for `audio`

---

## Why This Matters (Non-IT)

Shops need cooking videos, testimonial audio — `controls` lets customers play/pause without JS.

---

## Program

```html
<audio controls src="testimonial.mp3">Browser doesn't support audio</audio>
<video controls poster="shop.jpg" width="320">
  <source src="cooking.mp4" type="video/mp4">
  <source src="cooking.webm" type="video/webm">
  Browser doesn't support video
</video>
```

`controls` mandatory, `poster` cover, `source` 2 formats for different browsers.

---

## Key Concepts

### `controls` / `poster` / `source`
`controls` play buttons, `poster` cover image, `source` format options (browser picks first supported).

---

## Beginner Friendly Explanation

### Analogy: TV + Radio in Shop
- **`video` = shop TV**, **`audio` = radio**, **`controls` = remote**.

### Step 0 — Prepare Device
- VS Code + browser + 1 mp3/mp4 file (or sample links).

### How the Computer Reads It
1. `<video controls>` → browser draws player + buttons.
2. `<source mp4>` fails → tries `webm`.

### 3 Must-Know Terms
1. **controls/poster/source**: remote/cover/options

---

## Experiments

- **Green:** Remove `controls` → no buttons, can't play? Restore.
- **Yellow:** Wrong `poster` → blank cover?
- **Red:** Only `webm` source in old browser → fallback text? Add mp4 first.

---

## Challenge

**Shop Media:** 1 `audio` testimonial + 1 `video` cooking with `poster` + 2 `source` formats + fallback text.

---

## Mini Glossary

- **audio/video/source**: radio/tv/options

---

## Summary

Week 10 of 14: **Multimedia** — `audio`/`video` + `controls`. Next: **HTML APIs**.
