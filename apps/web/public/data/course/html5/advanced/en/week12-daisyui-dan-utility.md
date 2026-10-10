# DaisyUI: Utility Components

> **Category:** HTML5 | **Level:** UI Frameworks | **Week 12:** DaisyUI: Utility Components
> ⏱️ **Estimated Study:** 45 Minutes | 🔗 **Pace:** Structured (Step-by-step)

## Learning Objectives

- Understand utility-driven component architectures (DaisyUI and the Tailwind ecosystem)
- Install DaisyUI via CDN script inside an HTML document
- Deploy semantic component classes: .btn, .card, .badge, and .navbar
- Leverage built-in themes (data-theme="dark", data-theme="emerald")
- Compare when to choose Bootstrap, Bulma, Pico CSS, or DaisyUI for production projects

---

## 1. Utility Architecture and DaisyUI

Web UI development often balances two paradigms:
1. **Component Classes (Bootstrap):** Using `.btn .btn-primary`. Fast prototyping, but visually homogeneous.
2. **Utility Classes (Tailwind):** Using `px-4 py-2 bg-blue-500 rounded`. Highly customizable, but litters HTML markup with lengthy utility tokens.

**DaisyUI** merges both paradigms:
- Delivers **clean, semantic component class names** (`.btn`, `.card`, `.badge`) powered by Tailwind CSS.
- Supplies pre-styled components without cluttered markup.

### Installing via CDN:
```html
<link href="https://cdn.jsdelivr.net/npm/daisyui@4.12.10/dist/full.min.css" rel="stylesheet">
<script src="https://cdn.tailwindcss.com"></script>
```

---

## 2. Built-in Theming Engine
DaisyUI includes dozens of production themes activated via the `data-theme` attribute on the root `<html>` element:
```html
<html data-theme="emerald">
```
Popular themes: `light`, `dark`, `emerald`, `synthwave`, `forest`.

---

## 3. UI Framework Selection Matrix:
| Project Requirements | Ideal Framework Choice |
|---|---|
| Enterprise, extensive pre-built interactive JS widgets | **Bootstrap 5** |
| Pure CSS Flexbox without JavaScript dependencies | **Bulma** |
| Minimalist documents, blogs, zero class tokens | **Pico CSS** |
| Modern styling, extensible theme switching, Tailwind engine | **DaisyUI** |

---

## Program: DaisyUI Navbar, Cards, and Badges with Theme Engine

```html
<!DOCTYPE html>
<html lang="id" data-theme="forest">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Portofolio DaisyUI — Alex Pratama</title>
  <!-- DaisyUI CSS & Tailwind CDN -->
  <link href="https://cdn.jsdelivr.net/npm/daisyui@4.12.10/dist/full.min.css" rel="stylesheet">
  <script src="https://cdn.tailwindcss.com"></script>
</head>
<body class="min-h-screen p-4 max-w-2xl mx-auto">

  <!-- NAVBAR DAISYUI -->
  <div class="navbar bg-base-200 rounded-box mb-6">
    <div class="flex-1">
      <a class="btn btn-ghost text-xl">Alex.dev</a>
    </div>
    <div class="flex-none">
      <span class="badge badge-primary">Tema: Forest</span>
    </div>
  </div>

  <!-- HERO CARD -->
  <div class="card bg-base-200 shadow-xl mb-6">
    <div class="card-body">
      <h1 class="card-title text-2xl">Studio Web Alex Pratama</h1>
      <p class="text-base-content/80">
        Menggabungkan kekuatan HTML semantik dengan komponen antarmuka DaisyUI.
      </p>
      <div class="card-actions justify-end mt-4">
        <button class="btn btn-primary">Konsultasi</button>
      </div>
    </div>
  </div>

  <!-- BADGES & LIST -->
  <div class="card bg-base-200 shadow-xl">
    <div class="card-body">
      <h2 class="card-title text-lg">Keahlian Teknologi</h2>
      <div class="flex flex-wrap gap-2 mt-2">
        <div class="badge badge-outline">HTML5 Semantik</div>
        <div class="badge badge-outline">CSS Flexbox</div>
        <div class="badge badge-outline">Bootstrap 5</div>
        <div class="badge badge-outline">DaisyUI</div>
      </div>
    </div>
  </div>

  <footer class="footer footer-center p-4 text-base-content mt-8">
    <aside>
      <p>&copy; 2026 Alex Pratama. Ditenagai oleh DaisyUI.</p>
    </aside>
  </footer>

</body>
</html>
```

---

## Detailed Code Breakdown

- Line 2: `data-theme="forest"` instantly applies an emerald forest palette across all children.
- Line 7-8: Imports DaisyUI styles and the Tailwind CDN runtime.
- Line 13-20: `.navbar` component styled with `.bg-base-200` background tokens.
- Line 23-33: `.card` component paired with `.card-body` and `.card-actions`.

---

## Playground Experiments

1. Modify text or values inside the Playground editor and observe instant live preview updates.
2. Add new complementary elements relevant to your own page structure.
3. Test the layout across different viewport sizes to evaluate fluid responsiveness.

---

## Practical Challenge

Apply the core concepts of Week 12 directly inside your own project files. Verify tag pairs, attribute correctness, and consistent naming conventions.

---

## Common Pitfalls & Debugging

- Omitting the Tailwind CSS CDN runtime when importing DaisyUI via CDN.
- Misspelling the `data-theme` attribute value, falling back to the default palette.
- Overriding DaisyUI styles with conflicting custom CSS rules without proper specificity.

---

## Summary

- Week 12 (DaisyUI: Utility Components) delivers hands-on structural skills.
- All code adheres strictly to standard valid HTML, running immediately in browser viewports and the Playground.
- In the next module, we continue our progressive project development journey.
