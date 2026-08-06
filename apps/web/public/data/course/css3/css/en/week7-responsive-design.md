# Responsive Design

> **Kategori:** CSS3 | **Level:** Complete CSS3 | **Minggu 7:** Responsive Design

## Learning Objectives

- Viewport meta tag: width=device-width, initial-scale=1.0
- Mobile-first media queries: min-width breakpoints
- Fluid typography: clamp() for responsive font sizes
- Container queries: styling based on container size
- Dark mode: prefers-color-scheme media query

---

## Program: Responsive Layout

```html
<!DOCTYPE html>
<html lang="id">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Responsive Design</title>
    <style>
        * { box-sizing: border-box; margin: 0; padding: 0; }

        body { font-family: sans-serif; padding: 20px; }

        /* Mobile-first approach */
        .container {
            width: 100%;
            padding: 0 15px;
        }

        .card-grid {
            display: grid;
            gap: 15px;
            /* Mobile: 1 column */
            grid-template-columns: 1fr;
        }

        .card {
            background: white;
            border-radius: 8px;
            padding: 20px;
            box-shadow: 0 2px 4px rgba(0,0,0,0.1);
        }

        /* Tablet: 768px+ */
        @media (min-width: 768px) {
            .card-grid {
                grid-template-columns: repeat(2, 1fr);
            }
        }

        /* Desktop: 1024px+ */
        @media (min-width: 1024px) {
            .container { max-width: 1200px; margin: 0 auto; }
            .card-grid {
                grid-template-columns: repeat(3, 1fr);
            }
        }

        /* Fluid typography */
        h1 {
            font-size: clamp(1.5rem, 4vw, 3rem);
        }

        p {
            font-size: clamp(0.9rem, 2vw, 1.1rem);
        }

        /* Responsive image */
        .responsive-img {
            max-width: 100%;
            height: auto;
            border-radius: 8px;
        }

        /* Container queries */
        .card-container {
            container-type: inline-size;
        }

        @container (min-width: 400px) {
            .card {
                display: flex;
                gap: 15px;
                align-items: center;
            }
        }

        /* Dark mode */
        @media (prefers-color-scheme: dark) {
            body { background: #121417; color: #e0e0e0; }
            .card { background: #1e1e1e; }
        }
    </style>
</head>
<body>
    <div class="container">
        <h1>Responsive Design</h1>
        <p>Resize browser untuk melihat perubahan layout.</p>

        <div class="card-grid card-container">
            <div class="card">
                <img src="https://picsum.photos/100/100?random=1" alt="Card" class="responsive-img" style="width:80px;height:80px;border-radius:8px;">
                <div>
                    <h3>Card 1</h3>
                    <p>Layout berubah sesuai ukuran layar.</p>
                </div>
            </div>
            <div class="card">
                <img src="https://picsum.photos/100/100?random=2" alt="Card" class="responsive-img" style="width:80px;height:80px;border-radius:8px;">
                <div>
                    <h3>Card 2</h3>
                    <p>Mobile-first approach.</p>
                </div>
            </div>
            <div class="card">
                <img src="https://picsum.photos/100/100?random=3" alt="Card" class="responsive-img" style="width:80px;height:80px;border-radius:8px;">
                <div>
                    <h3>Card 3</h3>
                    <p>Fluid typography dengan clamp().</p>
                </div>
            </div>
        </div>
    </div>
</body>
</html>
```

---

## Key Concepts

### Viewport Meta
`<meta name="viewport" content="width=device-width, initial-scale=1.0">` — required for responsive.

### Mobile-First
Mobile first, then add complexity for larger screens. `min-width` breakpoints.

### Common Breakpoints
Mobile: <768px, Tablet: 768-1023px, Desktop: 1024px+.

### Fluid Typography
`clamp(1.5rem, 4vw, 3rem)` — min 1.5rem, preferred 4vw, max 3rem.

### Container Queries
`container-type: inline-size` + `@container (min-width: 400px)` — responsive based on container, not viewport.

---

## Experiments

- Change breakpoints and observe layout changes
- Try clamp() for various properties
- Experiment container queries with cards
- Create responsive navigation: hamburger on mobile
- Try prefers-reduced-motion

---

## Challenge

Create a fully responsive landing page: 1 column mobile, 2 columns tablet, 3 columns desktop, with fluid typography.

---

## Summary

Week 7 of 12: **Responsive Design** (Level: Complete CSS3). Mobile-first. Next week: **Animations & Transitions**.
