# Animations & Transitions

> **Kategori:** CSS3 | **Level:** Complete CSS3 | **Minggu 8:** Animations & Transitions

## Learning Objectives

- Transition: property, duration, timing-function, delay
- Transform: rotate, scale, translate, skew
- Keyframes: @keyframes for complex animations
- Animation: name, duration, timing, delay, iteration, direction
- Staggered animation with animation-delay

---

## Program: Animated UI

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

## Key Concepts

### Transition
`transition: all 0.3s ease` — animate on state change. Property, duration, timing-function, delay.

### Transform
`rotate(45deg)`, `scale(1.3)`, `translate(x,y)`, `skew(x,y)` — visual manipulation.

### Keyframes
`@keyframes name { 0% {...} 50% {...} 100% {...} }` — animation definition.

### Animation Shorthand
`animation: name 1s ease-in-out 0.5s infinite alternate`.

### Staggered
Different `animation-delay` for sequential effect.

---

## Experiments

- Create loading spinner with keyframes
- Try cubic-bezier custom timing function
- Experiment 3D transform: perspective, rotateX
- Create page transition animation
- Try animation-fill-mode: forwards

---

## Challenge

Create a page with: animated button, loading spinner, staggered card entrance, and hover effects.

---

## Summary

Week 8 of 12: **Animations & Transitions** (Level: Complete CSS3). Bring UI to life. Next week: **CSS Variables**.
