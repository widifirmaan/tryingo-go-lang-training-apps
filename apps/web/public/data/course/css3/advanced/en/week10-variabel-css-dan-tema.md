# CSS Variables and Theming Systems

> **Category:** CSS3 | **Level:** CSS Systems, Animation & Final Project | **Week 10:** CSS Variables and Theming Systems
> ⏱️ **Estimated Study:** 45 Minutes | 🔗 **Pace:** Structured (Step-by-step)

## Learning Objectives

- Understand CSS Custom Properties (Variables) declaration inside :root
- Retrieve and resolve variables using var() with fallback values
- Master variable scoping: global theme tokens vs local component overrides
- Construct Light and Dark Mode theming using data-theme attributes
- Deploy operating system preference detection with @media (prefers-color-scheme)

---

## 1. CSS Custom Properties Declaration & Usage

CSS Variables store reusable values across stylesheets:

```css
/* 1. Global Declaration in :root */
:root {
  --primary: #2E5B44;
  --bg-page: #F8FAF9;
  --text-main: #1A202C;
  --radius-md: 8px;
}

/* 2. Retrieval via var() */
.btn {
  background-color: var(--primary);
  border-radius: var(--radius-md);
  color: #FFFFFF;
}

/* 3. Fallbacks */
.text {
  color: var(--custom-color, #333333);
}
```

---

## 2. Global vs Local Scope

- **Global Scope (`:root`)**: Accessible everywhere across the document tree.
- **Local Scope**: Scoped overrides isolated to a specific component subtree:

```css
.alert-card {
  --primary: #C53030; /* Overrides --primary specifically for this container */
  border-color: var(--primary);
}
```

---

## 3. Theming Systems: Light & Dark Mode

CSS variables make theme switching instantaneous by merely swapping variable values:

```css
:root {
  --bg-body: #FFFFFF;
  --text-body: #1A202C;
  --card-bg: #F7FAFC;
}

[data-theme="dark"] {
  --bg-body: #121417;
  --text-body: #EDF2F7;
  --card-bg: #1A202C;
}

body {
  background-color: var(--bg-body);
  color: var(--text-body);
}
```

---

## Program: Light and Dark Theming System Powered by CSS Variables

```html
<!DOCTYPE html>
<html lang="id">
<head>
  <meta charset="UTF-8">
  <title>Variabel CSS dan Tema</title>
  <style>
    /* 1. Token Desain Tema Terang (Default) */
    :root {
      --bg-canvas: #F4F6F4;
      --bg-surface: #FFFFFF;
      --text-heading: #1A202C;
      --text-muted: #4A5568;
      --border-subtle: #E2E8F0;
      --brand-primary: #2E5B44;
      --brand-accent: #3D7A5B;
      --shadow-elevation: 0 4px 6px -1px rgba(0, 0, 0, 0.06);
    }

    /* 2. Token Desain Tema Gelap */
    [data-theme="dark"] {
      --bg-canvas: #121513;
      --bg-surface: #1E2320;
      --text-heading: #F7FAFC;
      --text-muted: #A0AEC0;
      --border-subtle: #2D3748;
      --brand-primary: #48BB78;
      --brand-accent: #68D391;
      --shadow-elevation: 0 4px 6px -1px rgba(0, 0, 0, 0.3);
    }

    * {
      margin: 0;
      padding: 0;
      box-sizing: border-box;
    }

    body {
      font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
      background-color: var(--bg-canvas);
      color: var(--text-heading);
      padding: 32px;
      min-height: 100vh;
      display: flex;
      justify-content: center;
      align-items: center;
      transition: background-color 0.25s ease, color 0.25s ease;
    }

    /* 3. Kartu yang Mengonsumsi Variabel */
    .theme-card {
      background-color: var(--bg-surface);
      border: 1px solid var(--border-subtle);
      border-radius: 14px;
      padding: 28px;
      max-width: 440px;
      box-shadow: var(--shadow-elevation);
      transition: background-color 0.25s ease, border-color 0.25s ease;
    }

    .theme-card h2 {
      font-size: 20px;
      color: var(--text-heading);
      margin-bottom: 8px;
    }

    .theme-card p {
      font-size: 14px;
      color: var(--text-muted);
      line-height: 1.6;
      margin-bottom: 24px;
    }

    /* 4. Tombol Aksi */
    .btn-toggle {
      background-color: var(--brand-primary);
      color: #FFFFFF;
      border: none;
      padding: 10px 18px;
      border-radius: 8px;
      font-size: 14px;
      font-weight: 600;
      cursor: pointer;
      transition: background-color 0.2s ease;
    }

    .btn-toggle:hover {
      background-color: var(--brand-accent);
    }
  </style>
</head>
<body>

  <div class="theme-card">
    <h2>Sistem Desain Token Mandiri</h2>
    <p>Seluruh warna antarmuka ini dikontrol oleh CSS Custom Properties. Klik tombol di bawah untuk menguji pergantian nilai token tema secara instan.</p>
    <button class="btn-toggle" onclick="toggleTheme()">Ganti Tema (Dark / Light)</button>
  </div>

  <script>
    function toggleTheme() {
      const html = document.documentElement;
      const current = html.getAttribute('data-theme');
      html.setAttribute('data-theme', current === 'dark' ? 'light' : 'dark');
    }
  </script>

</body>
</html>
```

---

## Detailed Code Breakdown

- `:root`: Central design token registry declaring baseline variables for universal consumption.
- `[data-theme="dark"]`: Swaps variable color values across dark mode without mutating component class declarations.
- `var(--bg-canvas)` and `var(--bg-surface)`: Binds surface backgrounds dynamically to active token definitions.
- `transition: ... 0.25s ease`: Implements smooth visual color fades during theme transitions.
- `onclick="toggleTheme()"`: Minimal demonstration script toggling data-theme attribute on the document root.

---

## Playground Experiments

1. Adjust colors, padding, or margin parameters inside the Playground editor and observe live rendering changes instantly.
2. Introduce new rules or properties to extend component visual features.
3. Resize preview viewport dimensions to evaluate layout responsiveness across diverse screen sizes.

---

## Practical Challenge

Apply Week 10 styling fundamentals to your project's styles.css file. Avoid !important hacks, maintain disciplined selector specificity, and leverage rem units for scalable hierarchy.

---

## Common Pitfalls & Debugging

- Omitting double dashes (--): CSS variables must begin with double hyphens (e.g. --primary).
- Case sensitivity pitfalls: --brandColor and --brandcolor represent two distinct, isolated variables.
- Omitting fallbacks inside var(): Unset variables without fallbacks revert properties to browser initial values.
- Scoping errors: Defining variables inside local containers renders them inaccessible to sibling or parent elements.

---

## Summary

- Week 10 (CSS Variables and Theming Systems) delivers hands-on structural visual styling competencies.
- All CSS code complies with W3C standards, ready for immediate exploration and modification in the browser and CodePlayground.
- In subsequent modules, we progressively expand layout capabilities toward a complete responsive website.
