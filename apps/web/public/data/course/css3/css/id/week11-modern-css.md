# Modern CSS

> **Kategori:** CSS3 | **Level:** CSS3 Lengkap | **Minggu 11:** Modern CSS

## Tujuan Pembelajaran

- :has() selector — parent selector akhirnya ada di CSS
- Native CSS nesting — tidak perlu preprocessor
- aspect-ratio untuk rasio proporsional otomatis
- Scroll snap untuk carousel native
- Logical properties: padding-inline, margin-inline, border-inline

---

## Program: Fitur CSS Modern

```html
<!DOCTYPE html>
<html lang="id">
<head>
    <meta charset="UTF-8">
    <title>Modern CSS</title>
    <style>
        body { font-family: sans-serif; padding: 20px; }

        /* :has() selector */
        .card:has(img) {
            border: 2px solid #4CAF50;
        }

        .card:has(.badge--urgent) {
            border-color: #e74c3c;
            background: #ffebee;
        }

        /* Nesting (native CSS) */
        .card {
            background: white;
            border-radius: 8px;
            padding: 20px;
            box-shadow: 0 2px 8px rgba(0,0,0,0.1);

            & .card-title {
                color: #2E5B44;
                margin: 0 0 10px;
            }

            & .card-text {
                color: #666;
                line-height: 1.6;
            }

            &:hover {
                box-shadow: 0 4px 16px rgba(0,0,0,0.15);
            }
        }

        /* Subgrid */
        .grid-parent {
            display: grid;
            grid-template-columns: repeat(3, 1fr);
            gap: 20px;
        }

        .grid-child {
            display: grid;
            grid-template-rows: subgrid;
            grid-row: span 3;
            background: #e3f2fd;
            padding: 15px;
            border-radius: 8px;
        }

        /* Aspect ratio */
        .aspect-box {
            aspect-ratio: 16 / 9;
            background: linear-gradient(135deg, #2E5B44, #4CAF50);
            display: flex;
            align-items: center;
            justify-content: center;
            color: white;
            font-size: 1.2rem;
            border-radius: 8px;
        }

        /* Scroll snap */
        .snap-container {
            display: flex;
            overflow-x: auto;
            scroll-snap-type: x mandatory;
            gap: 15px;
            padding: 10px 0;
        }

        .snap-item {
            scroll-snap-align: center;
            min-width: 200px;
            height: 150px;
            background: #f3e5f5;
            display: flex;
            align-items: center;
            justify-content: center;
            border-radius: 8px;
            font-size: 1.1rem;
        }

        /* Logical properties */
        .logical {
            padding-inline: 20px;
            padding-block: 10px;
            margin-inline: auto;
            border-inline-start: 4px solid #2E5B44;
            max-inline-size: 400px;
            background: #e8f5e9;
        }

        /* Color mix */
        .color-mix {
            background: color-mix(in srgb, #2E5B44 70%, white);
            color: white;
            padding: 15px;
            border-radius: 8px;
        }
    </style>
</head>
<body>
    <h1>Modern CSS Features</h1>

    <h2>:has() Selector</h2>
    <div class="card" style="margin-bottom:15px;">
        <h3 class="card-title">Card dengan gambar → border hijau</h3>
        <img src="https://picsum.photos/60/40" alt="" style="border-radius:4px;">
    </div>
    <div class="card">
        <h3 class="card-title">Card dengan badge urgent → border merah</h3>
        <span class="badge--urgent" style="background:#e74c3c;color:white;padding:2px 8px;border-radius:4px;font-size:12px;">Urgent</span>
    </div>

    <h2>Native Nesting</h2>
    <div class="card" style="margin:15px 0;">
        <h3 class="card-title">Nested CSS</h3>
        <p class="card-text">Tidak perlu preprocessor lagi!</p>
    </div>

    <h2>Aspect Ratio</h2>
    <div class="aspect-box">16:9 Aspect Ratio</div>

    <h2>Scroll Snap</h2>
    <div class="snap-container">
        <div class="snap-item">Snap 1</div>
        <div class="snap-item">Snap 2</div>
        <div class="snap-item">Snap 3</div>
        <div class="snap-item">Snap 4</div>
    </div>

    <h2>Logical Properties</h2>
    <div class="logical">padding-inline, margin-inline, border-inline-start</div>

    <h2>Color Mix</h2>
    <div class="color-mix">color-mix(in srgb, #2E5B44 70%, white)</div>
</body>
</html>
```

---

## Konsep Kunci

### :has()
`.card:has(img)` — style parent berdasarkan child. "Parent selector" yang lama ditunggu.

### Native Nesting
`& .child {}` — nesting langsung di CSS, tidak perlu Sass/Less.

### Aspect Ratio
`aspect-ratio: 16/9` — rasio otomatis tanpa padding hack.

### Scroll Snap
`scroll-snap-type: x mandatory` + `scroll-snap-align: center` — carousel native.

### Logical Properties
`padding-inline` (kiri/kanan), `padding-block` (atas/bawah) — RTL friendly.

### Color Mix
`color-mix(in srgb, #color1 70%, #color2)` — campur warna langsung di CSS.

---

## Eksperimen

- Buat form validation dengan :has(:invalid)
- Coba nesting 3 level dalam
- Eksperimen aspect-ratio dengan berbagai rasio
- Buat vertical scroll snap
- Coba logical properties dengan RTL direction

---

## Tantangan

Buat gallery dengan: :has() untuk hover effect, aspect-ratio untuk gambar, scroll snap untuk navigasi.

---

## Ringkasan

Minggu 11 dari 12: **Modern CSS** (Level: CSS3 Lengkap). CSS masa kini. Minggu depan: **Proyek Akhir**!
