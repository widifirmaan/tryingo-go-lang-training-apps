# CSS Custom Properties

## Overview

CSS Custom Properties (CSS variables) enable dynamic, reusable values throughout your stylesheets with runtime flexibility.

### Defining and Using

```css
:root {
  /* Colors */
  --color-primary: #3498db;
  --color-secondary: #2ecc71;
  --color-danger: #e74c3c;
  --color-warning: #f1c40f;
  --color-text: #2c3e50;
  --color-bg: #ffffff;
  --color-gray: #95a5a6;

  /* Typography */
  --font-sans: 'Inter', system-ui, sans-serif;
  --font-mono: 'JetBrains Mono', monospace;
  --font-size-sm: 0.875rem;
  --font-size-base: 1rem;
  --font-size-lg: 1.25rem;
  --font-size-xl: 1.5rem;
  --font-weight-normal: 400;
  --font-weight-bold: 700;

  /* Spacing */
  --space-xs: 4px;
  --space-sm: 8px;
  --space-md: 16px;
  --space-lg: 24px;
  --space-xl: 48px;
  --space-2xl: 96px;

  /* Borders */
  --radius-sm: 4px;
  --radius-md: 8px;
  --radius-lg: 16px;
  --radius-full: 9999px;

  /* Shadows */
  --shadow-sm: 0 1px 3px rgba(0,0,0,0.1);
  --shadow-md: 0 4px 12px rgba(0,0,0,0.1);
  --shadow-lg: 0 8px 24px rgba(0,0,0,0.15);

  /* Transitions */
  --transition-fast: 150ms ease;
  --transition-base: 300ms ease;
  --transition-slow: 500ms ease;
}

.element {
  color: var(--color-primary);
  background: var(--color-bg);
  padding: var(--space-md);
  border-radius: var(--radius-md);
  box-shadow: var(--shadow-sm);
  font-family: var(--font-sans);
}
```

## Theming

```css
/* Light theme (default) */
:root {
  --bg: #ffffff;
  --bg-secondary: #f8f9fa;
  --text: #2c3e50;
  --text-secondary: #7f8c8d;
  --border: #e0e0e0;
  --accent: #3498db;
  --accent-hover: #2980b9;
}

/* Dark theme */
[data-theme="dark"] {
  --bg: #1a1a2e;
  --bg-secondary: #16213e;
  --text: #ecf0f1;
  --text-secondary: #95a5a6;
  --border: #2c3e50;
  --accent: #5dade2;
  --accent-hover: #3498db;
}

/* High contrast theme */
[data-theme="high-contrast"] {
  --bg: #fff;
  --text: #000;
  --border: #000;
  --accent: #0044cc;
}

/* Usage */
body {
  background: var(--bg);
  color: var(--text);
  border-color: var(--border);
}

.card {
  background: var(--bg-secondary);
  border: 1px solid var(--border);
}

.button {
  background: var(--accent);
  color: #fff;
}

.button:hover {
  background: var(--accent-hover);
}
```

## Component-Scoped Properties

```css
.card {
  /* Default values */
  --card-padding: 16px;
  --card-radius: 8px;
  --card-bg: #fff;
  --card-shadow: 0 2px 4px rgba(0,0,0,0.1);

  padding: var(--card-padding);
  border-radius: var(--card-radius);
  background: var(--card-bg);
  box-shadow: var(--card-shadow);
}

/* Override per instance */
.card.featured {
  --card-padding: 24px;
  --card-shadow: 0 8px 24px rgba(0,0,0,0.15);
  --card-bg: #f8faff;
}

.card.compact {
  --card-padding: 8px;
  --card-radius: 4px;
  --card-shadow: 0 1px 2px rgba(0,0,0,0.05);
}
```

## Dynamic Updates with JavaScript

```js
// Toggle theme
function setTheme(theme) {
  document.documentElement.setAttribute('data-theme', theme);
  localStorage.setItem('theme', theme);
}

// Customize spacing
function setSpacing(multiplier) {
  document.documentElement.style.setProperty('--space-unit', `${16 * multiplier}px`);
}

// Read custom property value
function getCSSVar(name) {
  return getComputedStyle(document.documentElement)
    .getPropertyValue(name).trim();
}

const primary = getCSSVar('--color-primary');
console.log(primary); // #3498db

// Animate property change
function animateTheme() {
  document.documentElement.style.transition = '--bg 0.5s ease, --text 0.5s ease';
  document.documentElement.style.setProperty('--bg', '#2c3e50');
  document.documentElement.style.setProperty('--text', '#ecf0f1');
}

// Respond to user preference
const darkModeMedia = window.matchMedia('(prefers-color-scheme: dark)');
darkModeMedia.addEventListener('change', (e) => {
  document.documentElement.setAttribute('data-theme', e.matches ? 'dark' : 'light');
});
```

## Fallback Values

```css
.element {
  /* Fallback if variable is not defined */
  color: var(--undefined-var, #333);
  background: var(--bg, var(--fallback-bg, #fff));

  /* With calc */
  padding: calc(var(--space, 16px) * 2);
}

/* Check if variable is defined with @property */
@property --custom-color {
  syntax: '<color>';
  inherits: true;
  initial-value: #3498db;
}
```

## Responsive Design with Custom Properties

```css
:root {
  --grid-columns: 1;
  --font-size: 16px;
  --container-padding: 16px;
}

@media (min-width: 768px) {
  :root {
    --grid-columns: 2;
    --font-size: 18px;
    --container-padding: 24px;
  }
}

@media (min-width: 1024px) {
  :root {
    --grid-columns: 3;
    --font-size: 20px;
    --container-padding: 32px;
  }
}

.grid {
  display: grid;
  grid-template-columns: repeat(var(--grid-columns), 1fr);
  gap: var(--space-md);
  padding: var(--container-padding);
}

body {
  font-size: var(--font-size);
}
```

## Animation with Custom Properties

```css
@keyframes slide-in {
  from {
    transform: translateX(var(--slide-start, -100px));
    opacity: 0;
  }
  to {
    transform: translateX(0);
    opacity: 1;
  }
}

.animate-left {
  --slide-start: -100px;
  animation: slide-in 0.5s ease;
}

.animate-right {
  --slide-start: 100px;
  animation: slide-in 0.5s ease;
}

/* Dynamic animation delays */
.card:nth-child(1) { --i: 1; }
.card:nth-child(2) { --i: 2; }
.card:nth-child(3) { --i: 3; }

.card {
  animation-delay: calc(var(--i) * 100ms);
}
```

## Practice

1. Build a complete theme system with light, dark, high-contrast, and custom color themes using CSS custom properties.
2. Create a spacing scale using custom properties and build a component that adapts its padding based on a `--compact` or `--spacious` modifier.
3. Build a button component with custom properties for size (small, medium, large), variant (primary, secondary, danger), and state (hover, active, disabled).
4. Create a responsive grid system using custom properties that allow per-breakpoint column counts.
