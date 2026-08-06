# CSS Grid

> **Kategori:** CSS3 | **Level:** CSS3 Lengkap | **Minggu 5:** CSS Grid

## Tujuan Pembelajaran

- display: grid — mengaktifkan grid pada container
- grid-template-columns dan grid-template-rows
- Grid areas: grid-template-areas untuk layout named
- auto-fit dan auto-fill untuk responsive grid
- grid-column, grid-row span untuk merge cell

---

## Program: Layout Grid

```html
<!DOCTYPE html>
<html lang="id">
<head>
    <meta charset="UTF-8">
    <title>CSS Grid</title>
    <style>
        body { font-family: sans-serif; padding: 20px; }

        /* Grid Container */
        .grid {
            display: grid;
            gap: 15px;
            padding: 15px;
            background: #e8f5e9;
            border-radius: 8px;
            margin-bottom: 20px;
        }

        .grid-item {
            background: #2E5B44;
            color: white;
            padding: 20px;
            border-radius: 6px;
            text-align: center;
        }

        /* Column templates */
        .grid-3col { grid-template-columns: repeat(3, 1fr); }
        .grid-12col { grid-template-columns: repeat(12, 1fr); }
        .grid-mixed { grid-template-columns: 200px 1fr 1fr; }

        /* Row templates */
        .grid-rows { grid-template-rows: 100px 200px 100px; }

        /* Grid areas */
        .grid-areas {
            grid-template-columns: 200px 1fr;
            grid-template-rows: 60px 1fr 40px;
            grid-template-areas:
                "header header"
                "sidebar main"
                "footer footer";
            min-height: 300px;
        }

        .ga-header { grid-area: header; background: #1b5e20; }
        .ga-sidebar { grid-area: sidebar; background: #388e3c; }
        .ga-main { grid-area: main; background: #4CAF50; }
        .ga-footer { grid-area: footer; background: #1b5e20; }

        /* Auto-fit responsive */
        .grid-auto {
            grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
        }

        /* Span */
        .span-2 { grid-column: span 2; }
        .span-row-2 { grid-row: span 2; }
    </style>
</head>
<body>
    <h1>CSS Grid</h1>

    <h2>3 Column Grid</h2>
    <div class="grid grid-3col">
        <div class="grid-item">1</div>
        <div class="grid-item">2</div>
        <div class="grid-item">3</div>
        <div class="grid-item">4</div>
        <div class="grid-item">5</div>
        <div class="grid-item">6</div>
    </div>

    <h2>Mixed Columns</h2>
    <div class="grid grid-mixed">
        <div class="grid-item">200px</div>
        <div class="grid-item">1fr</div>
        <div class="grid-item">1fr</div>
    </div>

    <h2>Grid Template Areas</h2>
    <div class="grid grid-areas">
        <div class="grid-item ga-header">Header</div>
        <div class="grid-item ga-sidebar">Sidebar</div>
        <div class="grid-item ga-main">Main Content</div>
        <div class="grid-item ga-footer">Footer</div>
    </div>

    <h2>Auto-fit Responsive</h2>
    <div class="grid grid-auto">
        <div class="grid-item">A</div>
        <div class="grid-item">B</div>
        <div class="grid-item">C</div>
        <div class="grid-item">D</div>
        <div class="grid-item">E</div>
    </div>

    <h2>Column Span</h2>
    <div class="grid grid-3col">
        <div class="grid-item span-2">Span 2 kolom</div>
        <div class="grid-item">Normal</div>
        <div class="grid-item">Normal</div>
        <div class="grid-item span-row-2">Span 2 baris</div>
        <div class="grid-item">Normal</div>
    </div>
</body>
</html>
```

---

## Konsep Kunci

### Grid Container
`display: grid` pada parent. `grid-template-columns: repeat(3, 1fr)` = 3 kolom sama lebar.

### fr Unit
`1fr` = 1 bagian dari space tersedia. `2fr` = 2x lebar 1fr.

### Grid Areas
`grid-template-areas` dengan string visual — sangat intuitive untuk layout.

### Auto-fit
`repeat(auto-fit, minmax(150px, 1fr))` — responsive tanpa media query!

### Span
`grid-column: span 2` = rentang 2 kolom.

---

## Eksperimen

- Buat layout magazine dengan grid areas
- Coba auto-fill vs auto-fit
- Eksperimen minmax dengan max-content
- Buat masonry-like layout dengan grid
- Coba grid dengan subgrid

---

## Tantangan

Buat layout dashboard lengkap: header, sidebar, main content dengan card grid, footer — semua dengan CSS Grid.

---

## Ringkasan

Minggu 5 dari 12: **CSS Grid** (Level: CSS3 Lengkap). Layout 2-dimensional. Minggu depan: **Positioning**.
