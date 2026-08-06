# CSS Variables

> **Kategori:** CSS3 | **Level:** Complete CSS3 | **Minggu 9:** CSS Variables

## Learning Objectives

- Define variables: --name: value in :root
- Usage: var(--name) with fallback var(--name, fallback)
- Theming: dark mode by changing variables
- Variable scope: global (:root) vs local (element)
- Combine with calc() for dynamic calculations

---

## Program: Theming with Variables

```html
<!DOCTYPE html>
<html lang="id">
<head>
    <meta charset="UTF-8">
    <title>CSS Variables</title>
    <style>
        /* Define variables */
        :root {
            --primary: #2E5B44;
            --primary-light: #4CAF50;
            --secondary: #e74c3c;
            --bg: #ffffff;
            --bg-card: #f5f5f5;
            --text: #333333;
            --text-light: #666666;
            --radius: 8px;
            --shadow: 0 2px 8px rgba(0,0,0,0.1);
            --spacing-sm: 8px;
            --spacing-md: 16px;
            --spacing-lg: 32px;
            --font-main: 'Segoe UI', sans-serif;
        }

        /* Dark theme */
        [data-theme="dark"] {
            --bg: #121417;
            --bg-card: #1e1e1e;
            --text: #e0e0e0;
            --text-light: #aaaaaa;
            --shadow: 0 2px 8px rgba(0,0,0,0.4);
        }

        body {
            font-family: var(--font-main);
            background: var(--bg);
            color: var(--text);
            padding: var(--spacing-lg);
            transition: background 0.3s, color 0.3s;
        }

        .card {
            background: var(--bg-card);
            border-radius: var(--radius);
            padding: var(--spacing-md);
            box-shadow: var(--shadow);
            margin-bottom: var(--spacing-md);
        }

        .btn {
            padding: var(--spacing-sm) var(--spacing-md);
            background: var(--primary);
            color: white;
            border: none;
            border-radius: var(--radius);
            cursor: pointer;
            font-family: var(--font-main);
        }

        .btn-secondary {
            background: var(--secondary);
        }

        .btn-outline {
            background: transparent;
            border: 2px solid var(--primary);
            color: var(--primary);
        }

        /* Variable with fallback */
        .fallback {
            color: var(--undefined-var, #ff9800);
        }

        /* Computed with calc() */
        .fluid-width {
            width: calc(100% - var(--spacing-lg) * 2);
            background: var(--primary-light);
            color: white;
            padding: var(--spacing-md);
            border-radius: var(--radius);
        }
    </style>
</head>
<body>
    <h1>CSS Variables (Custom Properties)</h1>

    <button class="btn" onclick="toggleTheme()">Toggle Dark Mode</button>

    <div class="card">
        <h2>Theming dengan Variables</h2>
        <p>Ubah semua warna dengan mengubah variabel di :root.</p>
        <p class="fallback">Fallback: <code>var(--undefined, #ff9800)</code></p>
    </div>

    <div class="card">
        <h2>Spacing System</h2>
        <p>Spacing konsisten dengan variables: sm, md, lg.</p>
        <button class="btn">Primary</button>
        <button class="btn btn-secondary">Secondary</button>
        <button class="btn btn-outline">Outline</button>
    </div>

    <div class="fluid-width">
        Width calculated: calc(100% - 32px * 2)
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

## Key Concepts

### Definition & Usage
`--primary: #2E5B44` in `:root`. Use: `color: var(--primary)`.

### Fallback
`var(--undefined, #ff9800)` — use #ff9800 if variable doesn't exist.

### Theming
Change variables in `[data-theme="dark"]` — all elements update automatically.

### Scope
Variables in :root = global. Variables in .card = only for .card and children.

### Calc
`calc(100% - var(--spacing) * 2)` — combine variables and calculations.

---

## Experiments

- Create theme switcher with 3 different themes
- Try local variables inside components
- Experiment calc() with different units
- Create spacing system with variables
- Try variables for font-size scale

---

## Challenge

Create a simple design system: colors, spacing, typography, shadows — all with CSS variables + dark mode toggle.

---

## Summary

Week 9 of 12: **CSS Variables** (Level: Complete CSS3). Maintainable styling. Next week: **CSS Architecture**.
