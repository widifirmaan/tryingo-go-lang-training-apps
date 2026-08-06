# Animasi & Transisi

> **Kategori:** CSS3 | **Level:** CSS3 Lengkap | **Minggu 8:** Animasi & Transisi

## Tujuan Pembelajaran

- Transition: property, duration, timing-function, delay
- Transform: rotate, scale, translate, skew
- Keyframes: @keyframes untuk animasi kompleks
- Animation: name, duration, timing, delay, iteration, direction
- Staggered animation dengan animation-delay

---

## Program: UI Animasi

```html
<!DOCTYPE html>
<html lang="id">
<head>
    <meta charset="UTF-8">
    <title>CSS Animations</title>
    <style>
        body { font-family: sans-serif; padding: 20px; }

        /* Transition */
        .btn {
            padding: 12px 24px;
            background: #2E5B44;
            color: white;
            border: none;
            border-radius: 6px;
            cursor: pointer;
            font-size: 16px;
            transition: all 0.3s ease;
        }

        .btn:hover {
            background: #1b5e20;
            transform: translateY(-2px);
            box-shadow: 0 4px 12px rgba(46,91,68,0.4);
        }

        .btn:active {
            transform: translateY(0);
        }

        /* Transform */
        .transform-box {
            width: 100px;
            height: 100px;
            background: #4CAF50;
            margin: 20px;
            display: inline-flex;
            align-items: center;
            justify-content: center;
            color: white;
            border-radius: 8px;
            transition: transform 0.5s ease;
        }

        .rotate:hover { transform: rotate(45deg); }
        .scale:hover { transform: scale(1.3); }
        .translate:hover { transform: translate(30px, -10px); }
        .skew:hover { transform: skew(10deg, 5deg); }

        /* Keyframe Animation */
        @keyframes bounce {
            0%, 100% { transform: translateY(0); }
            50% { transform: translateY(-20px); }
        }

        .bounce {
            width: 60px;
            height: 60px;
            background: #e74c3c;
            border-radius: 50%;
            animation: bounce 1s ease-in-out infinite;
        }

        @keyframes spin {
            from { transform: rotate(0deg); }
            to { transform: rotate(360deg); }
        }

        .spin {
            width: 50px;
            height: 50px;
            border: 4px solid #e0e0e0;
            border-top-color: #2196F3;
            border-radius: 50%;
            animation: spin 1s linear infinite;
        }

        @keyframes fadeIn {
            from { opacity: 0; transform: translateY(20px); }
            to { opacity: 1; transform: translateY(0); }
        }

        .fade-in {
            animation: fadeIn 0.6s ease-out;
        }

        /* Staggered animation */
        .stagger-item {
            opacity: 0;
            animation: fadeIn 0.5s ease-out forwards;
        }
        .stagger-item:nth-child(1) { animation-delay: 0.1s; }
        .stagger-item:nth-child(2) { animation-delay: 0.2s; }
        .stagger-item:nth-child(3) { animation-delay: 0.3s; }
        .stagger-item:nth-child(4) { animation-delay: 0.4s; }
    </style>
</head>
<body>
    <h1>CSS Animations & Transitions</h1>

    <h2>Transition</h2>
    <button class="btn">Hover me!</button>

    <h2>Transform</h2>
        <div class="transform-box rotate">Rotate</div>
        <div class="transform-box scale">Scale</div>
        <div class="transform-box translate">Translate</div>
        <div class="transform-box skew">Skew</div>

    <h2>Keyframe Animations</h2>
    <div style="display:flex;gap:30px;align-items:center;">
        <div class="bounce"></div>
        <div class="spin"></div>
    </div>

    <h2>Staggered Fade In</h2>
    <div>
        <div class="stagger-item card" style="background:#e3f2fd;padding:15px;margin:5px;border-radius:6px;">Item 1</div>
        <div class="stagger-item card" style="background:#e8f5e9;padding:15px;margin:5px;border-radius:6px;">Item 2</div>
        <div class="stagger-item card" style="background:#fff3e0;padding:15px;margin:5px;border-radius:6px;">Item 3</div>
        <div class="stagger-item card" style="background:#f3e5f5;padding:15px;margin:5px;border-radius:6px;">Item 4</div>
    </div>
</body>
</html>
```

---

## Konsep Kunci

### Transition
`transition: all 0.3s ease` — animasi saat state berubah. Property, duration, timing-function, delay.

### Transform
`rotate(45deg)`, `scale(1.3)`, `translate(x,y)`, `skew(x,y)` — manipulasi visual.

### Keyframes
`@keyframes name { 0% {...} 50% {...} 100% {...} }` — definisi animasi.

### Animation Shorthand
`animation: name 1s ease-in-out 0.5s infinite alternate`.

### Staggered
`animation-delay` berbeda untuk efek berurutan.

---

## Eksperimen

- Buat loading spinner dengan keyframes
- Coba cubic-bezier custom timing function
- Eksperimen transform 3D: perspective, rotateX
- Buat page transition animation
- Coba animation-fill-mode: forwards

---

## Tantangan

Buat halaman dengan: animated button, loading spinner, staggered card entrance, dan hover effects.

---

## Ringkasan

Minggu 8 dari 12: **Animasi & Transisi** (Level: CSS3 Lengkap). Hidupkan UI. Minggu depan: **CSS Variables**.
