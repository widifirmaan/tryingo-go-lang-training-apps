# CSS Variables

> **Kategori:** CSS3 | **Level:** CSS3 Lengkap | **Minggu 9:** CSS Variables

## Tujuan Pembelajaran

- Definisi variabel: --name: value di :root
- Penggunaan: var(--name) dengan fallback var(--name, fallback)
- Theming: dark mode dengan mengubah variabel
- Scope variabel: global (:root) vs local (element)
- Kombinasi dengan calc() untuk perhitungan dinamis

---

## Program: Theming dengan Variables

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

## Konsep Kunci

### Definisi & Penggunaan
`--primary: #2E5B44` di `:root`. Pakai: `color: var(--primary)`.

### Fallback
`var(--undefined, #ff9800)` — gunakan #ff9800 jika variabel tidak ada.

### Theming
Ubah variabel di `[data-theme="dark"]` — semua elemen otomatis berubah.

### Scope
Variabel di :root = global. Variabel di .card = hanya untuk .card dan children.

### Calc
`calc(100% - var(--spacing) * 2)` — kombinasi variabel dan perhitungan.

---

## Eksperimen

- Buat theme switcher dengan 3 tema berbeda
- Coba variabel lokal di dalam komponen
- Eksperimen calc() dengan unit berbeda
- Buat spacing system dengan variables
- Coba variabel untuk font-size scale

---

## Tantangan

Buat design system sederhana: warna, spacing, typography, shadows — semua dengan CSS variables + dark mode toggle.

---

## Ringkasan

Minggu 9 dari 12: **CSS Variables** (Level: CSS3 Lengkap). Maintainable styling. Minggu depan: **Arsitektur CSS**.
