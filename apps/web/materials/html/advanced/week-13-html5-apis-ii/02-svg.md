# SVG (Scalable Vector Graphics)

## Overview

SVG is an XML-based format for vector graphics that scales infinitely without loss of quality.

### Basic SVG

```html
<svg width="400" height="300" viewBox="0 0 400 300"
     xmlns="http://www.w3.org/2000/svg">
  <!-- Shapes here -->
</svg>
```

## Basic Shapes

```html
<svg width="500" height="400" viewBox="0 0 500 400">
  <!-- Rectangle -->
  <rect x="20" y="20" width="100" height="80"
        fill="#3498db" stroke="#2c3e50" stroke-width="2"
        rx="8" ry="8"/>

  <!-- Circle -->
  <circle cx="200" cy="60" r="40"
          fill="#e74c3c" stroke="#c0392b" stroke-width="2"/>

  <!-- Ellipse -->
  <ellipse cx="340" cy="60" rx="60" ry="30"
           fill="#2ecc71" stroke="#27ae60" stroke-width="2"/>

  <!-- Line -->
  <line x1="20" y1="150" x2="180" y2="150"
        stroke="#9b59b6" stroke-width="4" stroke-linecap="round"/>

  <!-- Polyline -->
  <polyline points="20,200 80,170 140,210 200,180"
            fill="none" stroke="#e67e22" stroke-width="3"/>

  <!-- Polygon -->
  <polygon points="260,200 340,140 420,200 380,280 300,280"
           fill="#1abc9c" stroke="#16a085" stroke-width="2"/>

  <!-- Path -->
  <path d="M 20 300 Q 100 250 180 300 T 340 300"
        fill="none" stroke="#34495e" stroke-width="3"/>
</svg>
```

## SVG Text

```html
<svg width="500" height="200">
  <text x="250" y="60" text-anchor="middle"
        font-family="Arial" font-size="36"
        font-weight="bold" fill="#2c3e50">
    Scalable Vector Graphics
  </text>

  <text x="250" y="100" text-anchor="middle"
        font-family="Georgia" font-size="18"
        fill="italic" fill="#7f8c8d">
    Resolution Independent Graphics for the Web
  </text>

  <!-- Text on path -->
  <defs>
    <path id="textPath" d="M 50 150 Q 250 50 450 150"/>
  </defs>
  <text font-size="16" fill="#3498db">
    <textPath href="#textPath">
      Text following a curved path using SVG textPath
    </textPath>
  </text>
</svg>
```

## Gradients and Patterns

```html
<svg width="500" height="300">
  <defs>
    <!-- Linear gradient -->
    <linearGradient id="linearGrad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#3498db"/>
      <stop offset="50%" stop-color="#9b59b6"/>
      <stop offset="100%" stop-color="#e74c3c"/>
    </linearGradient>

    <!-- Radial gradient -->
    <radialGradient id="radialGrad" cx="40%" cy="40%" r="50%">
      <stop offset="0%" stop-color="#f1c40f"/>
      <stop offset="100%" stop-color="#e67e22"/>
    </radialGradient>

    <!-- Pattern -->
    <pattern id="checkers" patternUnits="userSpaceOnUse"
             width="20" height="20">
      <rect width="20" height="20" fill="#fff"/>
      <rect width="10" height="10" fill="#ddd"/>
      <rect x="10" y="10" width="10" height="10" fill="#ddd"/>
    </pattern>
  </defs>

  <rect x="20" y="20" width="200" height="120" rx="8"
        fill="url(#linearGrad)"/>
  <circle cx="360" cy="80" r="60" fill="url(#radialGrad)"/>
  <rect x="20" y="160" width="460" height="120" rx="8"
        fill="url(#checkers)"/>
</svg>
```

## SVG as Interactive Components

```html
<div class="icon-card">
  <svg viewBox="0 0 100 100" width="64" height="64" class="interactive-icon">
    <circle cx="50" cy="50" r="45" fill="#e8f0fe" stroke="#4a90d9" stroke-width="2"/>
    <path d="M 30 50 L 45 65 L 70 35" fill="none" stroke="#4a90d9" stroke-width="4"
          stroke-linecap="round" stroke-linejoin="round"/>
  </svg>
  <span>Completed</span>
</div>
```

```css
.interactive-icon {
  transition: transform 0.3s;
  cursor: pointer;
}

.interactive-icon:hover {
  transform: scale(1.2);
}

.interactive-icon circle,
.interactive-icon path {
  transition: all 0.3s;
}

.interactive-icon:hover circle {
  fill: #4a90d9;
}

.interactive-icon:hover path {
  stroke: #fff;
}
```

## Inline SVG vs img

```html
<!-- As inline SVG (stylable, interactive) -->
<svg viewBox="0 0 24 24" width="24" height="24">
  <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"
        fill="none" stroke="currentColor" stroke-width="2"/>
</svg>

<!-- As img (not stylable) -->
<img src="icon.svg" alt="Icon" width="24" height="24">

<!-- As background-image -->
<div style="background: url('icon.svg') no-repeat; width: 24px; height: 24px;"></div>

<!-- As object (stylable via SVG's own CSS) -->
<object data="icon.svg" type="image/svg+xml" width="24" height="24"></object>
```

## Animated SVG

```html
<svg viewBox="0 0 200 200" width="300" height="300">
  <circle cx="100" cy="100" r="40" fill="#3498db">
    <animate attributeName="r" values="40;50;40" dur="2s" repeatCount="indefinite"/>
    <animate attributeName="fill" values="#3498db;#e74c3c;#3498db" dur="4s" repeatCount="indefinite"/>
  </circle>

  <circle cx="100" cy="100" r="60" fill="none" stroke="#3498db" stroke-width="2">
    <animate attributeName="r" values="60;70;60" dur="2s" repeatCount="indefinite"/>
    <animate attributeName="opacity" values="1;0.3;1" dur="2s" repeatCount="indefinite"/>
  </circle>

  <text x="100" y="105" text-anchor="middle" fill="#fff" font-size="14">
    Loading
    <animate attributeName="opacity" values="1;0;1" dur="1.5s" repeatCount="indefinite"/>
  </text>
</svg>
```

## Practice

1. Create an SVG logo for a fictional company with shapes, text, and gradients.
2. Build a simple bar chart using SVG rectangles with labeled axes.
3. Create an interactive SVG map with clickable regions that change color on hover.
4. Animate an SVG gear icon that rotates continuously and stops on hover.
