# Colors, Text & Typography

> **Kategori:** CSS3 | **Level:** Complete CSS3 | **Minggu 3:** Colors, Text & Typography

## Learning Objectives

- Color formats: name, hex, rgb, rgba, hsl, hsla
- Backgrounds: color, image, gradient, linear-gradient, radial-gradient
- Typography: font-family, font-size, font-weight, line-height, letter-spacing
- Text styling: text-decoration, text-transform, text-shadow, text-overflow
- Font stacks and web-safe fonts

---

## Program: Typography Article

```html
<!DOCTYPE html>
<html lang="id">
<head>
    <meta charset="UTF-8">
    <title>Colors & Typography</title>
    <style>
        body {
            font-family: 'Georgia', serif;
            line-height: 1.8;
            color: #333;
            max-width: 800px;
            margin: 0 auto;
            padding: 20px;
        }

        /* Color formats */
        .color-name { color: tomato; }
        .color-hex { color: #2E5B44; }
        .color-rgb { color: rgb(46, 91, 68); }
        .color-rgba { color: rgba(46, 91, 68, 0.7); }
        .color-hsl { color: hsl(145, 35%, 30%); }

        /* Background */
        .bg-solid { background-color: #e8f5e9; padding: 10px; }
        .bg-gradient {
            background: linear-gradient(135deg, #2E5B44, #4CAF50);
            color: white;
            padding: 20px;
            border-radius: 8px;
        }

        /* Typography */
        h1 {
            font-size: 2.5rem;
            font-weight: 700;
            letter-spacing: -0.5px;
            margin-bottom: 0.5em;
        }

        h2 {
            font-size: 1.8rem;
            font-weight: 600;
            color: #2E5B44;
        }

        p {
            font-size: 1rem;
            margin-bottom: 1em;
            text-align: justify;
        }

        /* Text styling */
        .underline { text-decoration: underline wavy #e74c3c; }
        .uppercase { text-transform: uppercase; letter-spacing: 2px; }
        .shadow { text-shadow: 2px 2px 4px rgba(0,0,0,0.3); }
        .truncate {
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
            max-width: 200px;
        }

        /* Font stack */
        .font-system { font-family: system-ui, sans-serif; }
        .font-mono { font-family: 'Fira Code', monospace; }
    </style>
</head>
<body>
    <h1 class="shadow">Warna & Tipografi CSS</h1>

    <h2>Format Warna</h2>
    <p><span class="color-name">Nama warna</span> |
       <span class="color-hex">Hex</span> |
       <span class="color-rgb">RGB</span> |
       <span class="color-rgba">RGBA (dengan alpha)</span> |
       <span class="color-hsl">HSL</span></p>

    <h2>Background</h2>
    <div class="bg-solid">Background solid color</div>
    <div class="bg-gradient">Background gradient</div>

    <h2>Tipografi</h2>
    <p class="uppercase">Text transform uppercase</p>
    <p class="underline">Text decoration underline wavy</p>
    <p class="truncate">Ini teks panjang yang akan dipotong dengan ellipsis...</p>
    <p class="font-mono">Font monospace untuk kode</p>
</body>
</html>
```

---

## Key Concepts

### Color Formats
`name`, `#hex`, `rgb(r,g,b)`, `rgba(r,g,b,a)`, `hsl(h,s%,l%)`.

### Backgrounds
`background-color`, `background-image`, `linear-gradient(135deg, #a, #b)`.

### Typography
`font-family`, `font-size` (rem/em/px), `font-weight` (400 normal, 700 bold), `line-height`, `letter-spacing`.

### Text Styling
`text-decoration`, `text-transform`, `text-shadow: x y blur color`, `text-overflow: ellipsis`.

### Font Stack
`font-family: "Custom", fallback, generic` — always have fallback.

---

## Experiments

- Create gradient background with 3 colors
- Try multi-layer text-shadow
- Experiment font-size: rem vs em vs px
- Create multi-line truncate (line-clamp)
- Try font-weight from 100-900

---

## Challenge

Create a blog article page with professional typography: heading hierarchy, drop cap, blockquote styling.

---

## Summary

Week 3 of 12: **Colors, Text & Typography** (Level: Complete CSS3). Visual aesthetics. Next week: **Flexbox**.
