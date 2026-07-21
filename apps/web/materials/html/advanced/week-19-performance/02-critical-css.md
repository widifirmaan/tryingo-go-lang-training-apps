# Critical CSS

## Overview

Critical CSS extracts the styles needed for above-the-fold content and inlines them in the `<head>`, while loading the full stylesheet asynchronously.

### Basic Setup

```html
<head>
  <!-- Inlined critical CSS -->
  <style>
    /* Critical above-the-fold styles */
    body { margin: 0; font-family: system-ui, sans-serif; }
    header { display: flex; padding: 16px; background: #fff; }
    .hero { min-height: 80vh; display: flex; align-items: center; }
    .hero h1 { font-size: clamp(2rem, 5vw, 4rem); }
    /* ... only what's visible on first render */
  </style>

  <!-- Load full CSS asynchronously -->
  <link rel="preload" href="styles.css" as="style"
        onload="this.onload=null;this.rel='stylesheet'">
  <noscript>
    <link rel="stylesheet" href="styles.css">
  </noscript>
</head>
```

## Extracting Critical CSS

### Manual Method

```css
/* Identify above-the-fold elements and extract their styles */
/* Above-fold: header, nav, hero section, hero title, CTA button */

/* Critical CSS (inline) */
* { box-sizing: border-box; margin: 0; }

body {
  font-family: 'Inter', system-ui, sans-serif;
  color: #333;
  background: #fff;
}

header {
  position: fixed;
  top: 0;
  width: 100%;
  padding: 16px 24px;
  background: rgba(255,255,255,0.95);
  backdrop-filter: blur(8px);
  z-index: 100;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.hero {
  min-height: 90vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 24px;
  text-align: center;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: #fff;
}

.hero h1 {
  font-size: clamp(2rem, 6vw, 4.5rem);
  margin-bottom: 16px;
  line-height: 1.1;
}

.hero p {
  font-size: clamp(1rem, 2vw, 1.25rem);
  max-width: 600px;
  margin-bottom: 32px;
  opacity: 0.9;
}

.btn-primary {
  display: inline-block;
  padding: 16px 32px;
  background: #fff;
  color: #764ba2;
  border-radius: 50px;
  font-weight: 600;
  text-decoration: none;
  transition: transform 0.2s, box-shadow 0.2s;
}

.btn-primary:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 24px rgba(0,0,0,0.2);
}
```

### Using Critical CLI Tools

```bash
# Install Critical
npm install -g critical

# Generate critical CSS for a page
critical https://example.com --base . --inline
critical index.html --width 1300 --height 900 --inline

# CSS Critical (PostCSS plugin)
npm install postcss-critical-css
```

```js
// Gulp/Node.js example
const critical = require('critical');

critical.generate({
  inline: true,
  base: 'dist/',
  src: 'index.html',
  target: 'index-critical.html',
  width: 1300,
  height: 900,
  minify: true,
  extract: true
});
```

## Async CSS Loading Patterns

### LoadCSS Method

```html
<script>
  // LoadCSS: https://github.com/filamentgroup/loadCSS
  !function(e) {
    var t = e.createElement('link');
    t.rel = 'stylesheet';
    t.href = 'full.css';
    t.media = 'print'; // Prevent FOUC
    t.onload = function() { t.media = 'all'; };
    e.head.appendChild(t);
  }(document);
</script>

<!-- Or using preload -->
<link rel="preload" href="full.css" as="style"
      onload="this.onload=null;this.rel='stylesheet'">
<noscript><link rel="stylesheet" href="full.css"></noscript>
```

### Media-Based Loading

```html
<!-- Load non-critical CSS based on media query -->
<style>
  /* Critical CSS inlined here */
</style>

<link rel="stylesheet" href="print.css" media="print">
<link rel="stylesheet" href="mobile.css" media="(max-width: 768px)">
<link rel="stylesheet" href="desktop.css" media="(min-width: 769px)">

<!-- All styles for browsers without media query support -->
<noscript>
  <link rel="stylesheet" href="full.css">
</noscript>
```

## Pattern: Critical CSS in Build Process

```js
// build.js - Simplified critical CSS extraction
const fs = require('fs');

function extractCriticalCSS(html, css) {
  // 1. Parse HTML to find above-fold elements
  // 2. Match selectors in CSS
  // 3. Extract matching rules
  // 4. Optionally inline via <style> tag

  // Simplified example
  const aboveFoldSelectors = [
    'header', '.nav', '.hero', '.hero h1',
    '.hero p', '.btn-primary', 'body'
  ];

  const criticalRules = [];
  const rules = css.match(/[^{]+\{[^}]+\}/g) || [];

  rules.forEach(rule => {
    const selector = rule.split('{')[0].trim();
    if (aboveFoldSelectors.some(s => selector.includes(s))) {
      criticalRules.push(rule);
    }
  });

  return criticalRules.join('\n');
}
```

## Measuring Impact

```html
<!-- Measure when full CSS loads -->
<script>
  performance.mark('css-start');

  const link = document.querySelector('link[rel="stylesheet"]');
  link.addEventListener('load', () => {
    performance.mark('css-end');
    performance.measure('css-load-time', 'css-start', 'css-end');
    console.log('CSS loaded in',
      performance.getEntriesByName('css-load-time')[0].duration, 'ms');
  });
</script>
```

## Practice

1. Analyze a web page and manually extract critical CSS for above-the-fold content.
2. Implement async CSS loading using the preload pattern with a `<noscript>` fallback.
3. Build a build script that extracts critical CSS from a full stylesheet for a given URL.
4. Measure the performance improvement (LCP, FCP) before and after implementing critical CSS.
