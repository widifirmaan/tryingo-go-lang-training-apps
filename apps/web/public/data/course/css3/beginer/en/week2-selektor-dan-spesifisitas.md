# Selectors and Specificity

> **Category:** CSS3 | **Level:** CSS Basics & Box Model | **Week 2:** Selectors and Specificity
> ⏱️ **Estimated Study:** 45 Minutes | 🔗 **Pace:** Structured (Step-by-step)

## Learning Objectives

- Master core selector types: element/tag, class (.), and ID (#)
- Understand combinator selectors: descendant (space) and direct child (>)
- Apply interactive pseudo-classes for user feedback (:hover, :focus, :active)
- Understand CSS specificity score calculation and cascade priority rules
- Eliminate reliance on !important by organizing structured selector specificity

---

## 1. CSS Selector Types

Selectors target the specific HTML elements to receive formatting rules.

### A. Core Selectors
- **Element Selector**: Selects by tag name (`p`, `button`, `h2`).
- **Class Selector (`.`)**: Targets elements bearing a given `class` attribute. Reusable across multiple tags.
- **ID Selector (`#`)**: Selects an element with a unique `id`. Must be singular per page.

### B. Combinators
- **Descendant (`A B`)**: Matches all `B` elements inside `A` regardless of nesting depth:
  ```css
  .nav a { color: #2E5B44; }
  ```
- **Direct Child (`A > B`)**: Targets `B` elements that are direct immediate children of `A`:
  ```css
  .menu-list > li { list-style: none; }
  ```

---

## 2. Interactive Pseudo-Classes

Pseudo-classes target temporary element states during user interaction:
- `:hover`: When the mouse pointer hovers over the element.
- `:focus`: When an input or link receives keyboard focus.
- `:active`: While the element is actively pressed down.

```css
.btn {
  background-color: #2E5B44;
  color: white;
}
.btn:hover {
  background-color: #234634;
}
.btn:active {
  background-color: #1A3427;
}
```

---

## 3. Specificity: How Browsers Resolve Conflicts

When competing declarations target the same element, browsers resolve precedence via specificity scores:

```text
Specificity Weight Hierarchy:
┌─────────────────┬───────────────────┬──────────────────┬─────────────────┐
│ Inline Style    │ ID Selector       │ Class & Pseudo   │ Element / Tag   │
│ (style="...")   │ (#header)         │ (.btn, :hover)   │ (button, p)     │
│ Score: 1,0,0,0  │ Score: 0,1,0,0    │ Score: 0,0,1,0   │ Score: 0,0,0,1  │
└─────────────────┴───────────────────┴──────────────────┴─────────────────┘
```

---

## Program: Applying Combinator Selectors and Interactive Buttons

```html
<!DOCTYPE html>
<html lang="id">
<head>
  <meta charset="UTF-8">
  <title>Selektor dan Spesifisitas</title>
  <style>
    * {
      margin: 0;
      padding: 0;
      box-sizing: border-box;
    }

    body {
      font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
      background-color: #F8FAF9;
      color: #2D3748;
      padding: 32px;
      line-height: 1.5;
    }

    /* 1. Class Selector untuk Kartu */
    .card {
      background: #FFFFFF;
      border: 1px solid #E2E8F0;
      border-radius: 12px;
      padding: 24px;
      max-width: 480px;
      margin: 0 auto 24px auto;
    }

    /* 2. Descendant Selector */
    .card h3 {
      color: #2E5B44;
      font-size: 20px;
      margin-bottom: 8px;
    }

    .card p {
      color: #718096;
      font-size: 14px;
      margin-bottom: 20px;
    }

    /* 3. Class Tombol Dasar */
    .btn {
      display: inline-block;
      padding: 10px 20px;
      font-size: 14px;
      font-weight: 600;
      border-radius: 6px;
      text-decoration: none;
      cursor: pointer;
      border: 1px solid transparent;
      transition: background-color 0.15s ease, transform 0.1s ease;
    }

    /* 4. Modifier Class: Tombol Primer */
    .btn-primer {
      background-color: #2E5B44;
      color: #FFFFFF;
    }

    .btn-primer:hover {
      background-color: #234634;
      transform: translateY(-1px);
    }

    .btn-primer:active {
      background-color: #1A3427;
      transform: translateY(1px);
    }

    /* 5. Modifier Class: Tombol Sekunder */
    .btn-sekunder {
      background-color: #EDF2F7;
      color: #4A5568;
      margin-left: 8px;
    }

    .btn-sekunder:hover {
      background-color: #E2E8F0;
      color: #2D3748;
    }
  </style>
</head>
<body>

  <div class="card">
    <h3>Pengaturan Notifikasi Akun</h3>
    <p>Pilih preferensi notifikasi Anda untuk menerima pembaruan berkala langsung ke email.</p>
    <div>
      <a href="#" class="btn btn-primer">Simpan Preferensi</a>
      <a href="#" class="btn btn-sekunder">Batal</a>
    </div>
  </div>

</body>
</html>
```

---

## Detailed Code Breakdown

- `.card`: Class selector isolating component styling within a clean bordered white container.
- `.card h3`: Descendant selector styling only `h3` headings that exist inside `.card`.
- `.btn`: Base component class providing baseline dimensions, padding, and pointer cursor.
- `.btn-primer` and `.btn-sekunder`: Modifier classes applying semantic forest green and light gray color schemes.
- `:hover` and `:active`: Pseudo-classes providing immediate feedback during user pointer hover and clicks.

---

## Playground Experiments

1. Adjust colors, padding, or margin parameters inside the Playground editor and observe live rendering changes instantly.
2. Introduce new rules or properties to extend component visual features.
3. Resize preview viewport dimensions to evaluate layout responsiveness across diverse screen sizes.

---

## Practical Challenge

Apply Week 2 styling fundamentals to your project's styles.css file. Avoid !important hacks, maintain disciplined selector specificity, and leverage rem units for scalable hierarchy.

---

## Common Pitfalls & Debugging

- Overreliance on !important: Bypassing cascade order causes severe selector collisions down the road.
- Using ID selectors for general styling: IDs carry excessive specificity (0,1,0,0) preventing class-based overrides.
- Over-nested selector chains: Writing body div.main ul li a creates fragile, tightly-coupled stylesheets.
- Omitting the leading dot for classes: Writing card instead of .card causes browsers to query for a custom <card> HTML tag.

---

## Summary

- Week 2 (Selectors and Specificity) delivers hands-on structural visual styling competencies.
- All CSS code complies with W3C standards, ready for immediate exploration and modification in the browser and CodePlayground.
- In subsequent modules, we progressively expand layout capabilities toward a complete responsive website.
