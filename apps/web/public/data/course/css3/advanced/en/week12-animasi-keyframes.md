# Keyframe Animations

> **Category:** CSS3 | **Level:** CSS Systems, Animation & Final Project | **Week 12:** Keyframe Animations
> ⏱️ **Estimated Study:** 45 Minutes | 🔗 **Pace:** Structured (Step-by-step)

## Learning Objectives

- Understand @keyframes declaration structure using milestone percentages (0% to 100%)
- Master animation rules: name, duration, timing-function, delay, iteration-count, direction
- Deploy animation-iteration-count: infinite for looping UI indicators
- Retain final state poses with animation-fill-mode: forwards
- Construct production UI components: circular spinner, pulse badge, and slide-in alert

---

## 1. Anatomy of @keyframes

Unlike transitions requiring user event triggers (like `:hover`), CSS animations can auto-play continuously through multi-stage timelines:

```css
/* 1. Keyframe Timeline Definition */
@keyframes fullSpin {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}

/* 2. Binding to Target Element */
.spinner {
  animation: fullSpin 1s linear infinite;
}
```

---

## 2. Animation Control Properties

- **`animation-name`**: References the `@keyframes` rule.
- **`animation-duration`**: Completion duration for a single cycle (e.g. `2s`).
- **`animation-timing-function`**: Velocity profile (`ease`, `linear`, `ease-in-out`).
- **`animation-iteration-count`**: Frequency counter (finite integer or `infinite`).
- **`animation-direction`**: Traversal direction (`normal`, `reverse`, `alternate`).
- **`animation-fill-mode`**: Governs styling posture before and after execution:
  - `forwards`: Persists 100% end-frame styles after termination.

---

## 3. Shorthand Syntax

```css
/* animation: name duration timing-function delay iteration-count direction fill-mode; */
.toast-alert {
  animation: slideIn 0.4s ease-out 0.2s 1 normal forwards;
}
```

---

## Program: Production UI Animations: Circular Spinner, Signal Pulse, and Slide-In Toast

```html
<!DOCTYPE html>
<html lang="id">
<head>
  <meta charset="UTF-8">
  <title>Animasi Keyframes</title>
  <style>
    * {
      margin: 0;
      padding: 0;
      box-sizing: border-box;
    }

    body {
      font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
      background-color: #F8FAF9;
      color: #2D3748;
      padding: 40px 20px;
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 32px;
      min-height: 100vh;
    }

    .demo-box {
      background: #FFFFFF;
      border: 1px solid #E2E8F0;
      border-radius: 12px;
      padding: 24px;
      width: 100%;
      max-width: 440px;
      display: flex;
      align-items: center;
      justify-content: space-between;
    }

    /* ── 1. ANIMASI SPINNER BERPUTAR ── */
    @keyframes spinCircle {
      0% { transform: rotate(0deg); }
      100% { transform: rotate(360deg); }
    }

    .loading-spinner {
      width: 32px;
      height: 32px;
      border: 3px solid #E2E8F0;
      border-top-color: #2E5B44;
      border-radius: 50%;
      animation: spinCircle 0.8s linear infinite;
    }

    /* ── 2. ANIMASI DENYUT SINYAL (PULSE) ── */
    @keyframes pulseLive {
      0% {
        transform: scale(0.95);
        box-shadow: 0 0 0 0 rgba(46, 91, 68, 0.7);
      }
      70% {
        transform: scale(1);
        box-shadow: 0 0 0 10px rgba(46, 91, 68, 0);
      }
      100% {
        transform: scale(0.95);
        box-shadow: 0 0 0 0 rgba(46, 91, 68, 0);
      }
    }

    .status-badge {
      display: flex;
      align-items: center;
      gap: 10px;
      font-size: 14px;
      font-weight: 600;
      color: #2E5B44;
    }

    .pulse-dot {
      width: 12px;
      height: 12px;
      background-color: #2E5B44;
      border-radius: 50%;
      animation: pulseLive 1.8s infinite;
    }

    /* ── 3. ANIMASI MELUNCUR MASUK (SLIDE-IN) ── */
    @keyframes slideInUp {
      0% {
        opacity: 0;
        transform: translateY(20px);
      }
      100% {
        opacity: 1;
        transform: translateY(0);
      }
    }

    .toast-notification {
      background-color: #2E5B44;
      color: #FFFFFF;
      border-radius: 8px;
      padding: 14px 20px;
      font-size: 14px;
      font-weight: 500;
      box-shadow: 0 10px 15px -3px rgba(46, 91, 68, 0.2);
      animation: slideInUp 0.5s ease-out forwards;
    }
  </style>
</head>
<body>

  <!-- Demo 1: Spinner -->
  <div class="demo-box">
    <div>
      <h4 style="margin-bottom: 4px;">Indikator Loading</h4>
      <p style="font-size: 13px; color: #718096;">Putaran linear berulang terus-menerus</p>
    </div>
    <div class="loading-spinner"></div>
  </div>

  <!-- Demo 2: Pulse Signal -->
  <div class="demo-box">
    <div>
      <h4 style="margin-bottom: 4px;">Status Koneksi Sistem</h4>
      <p style="font-size: 13px; color: #718096;">Efek denyut box-shadow dinamis</p>
    </div>
    <div class="status-badge">
      <span class="pulse-dot"></span>
      Online
    </div>
  </div>

  <!-- Demo 3: Slide-in Notification -->
  <div class="toast-notification">
    ✓ Data sinkronisasi berhasil disimpan ke server.
  </div>

</body>
</html>
```

---

## Detailed Code Breakdown

- `@keyframes spinCircle`: Rotates the circular element 360 degrees steadily using GPU-accelerated rotation.
- `.loading-spinner`: Employs a circular 3-sided border with a distinct forest green leading edge.
- `@keyframes pulseLive`: Orchestrates micro-scaling with radiating alpha box-shadow rings emulating live telemetry.
- `@keyframes slideInUp`: Coordinates opacity fade with upward vertical translation from 20px.
- `animation-fill-mode: forwards`: Freezes final pose at 100% completion preventing sudden disappearance.

---

## Playground Experiments

1. Adjust colors, padding, or margin parameters inside the Playground editor and observe live rendering changes instantly.
2. Introduce new rules or properties to extend component visual features.
3. Resize preview viewport dimensions to evaluate layout responsiveness across diverse screen sizes.

---

## Practical Challenge

Apply Week 12 styling fundamentals to your project's styles.css file. Avoid !important hacks, maintain disciplined selector specificity, and leverage rem units for scalable hierarchy.

---

## Common Pitfalls & Debugging

- Omitting animation-duration: With default 0s duration, animations never render.
- Missing animation-fill-mode: forwards: Completed animations abruptly revert to pre-animation frame 0 states.
- Animation fatigue: Excessive concurrent motion confuses users and drains mobile batteries.
- Ignoring prefers-reduced-motion: Users sensitive to motion sickness require media queries to damp visual translations.

---

## Summary

- Week 12 (Keyframe Animations) delivers hands-on structural visual styling competencies.
- All CSS code complies with W3C standards, ready for immediate exploration and modification in the browser and CodePlayground.
- In subsequent modules, we progressively expand layout capabilities toward a complete responsive website.
