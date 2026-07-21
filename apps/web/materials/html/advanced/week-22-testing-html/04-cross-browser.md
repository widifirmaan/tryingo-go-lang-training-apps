# Cross-Browser Testing

## Overview

Cross-browser testing ensures your HTML works consistently across different browsers, devices, and versions.

### Browser Matrix

```txt
Modern browsers to test:
- Chrome (latest + previous major)
- Firefox (latest + ESR)
- Safari (latest + previous major)
- Edge (latest + previous major)
- Samsung Internet (latest)
- Opera (latest)

Mobile:
- iOS Safari (latest + previous)
- Android Chrome (latest)
- Samsung Internet

Legacy (if needed):
- Internet Explorer 11 (if required)
- Older Safari versions
```

## Feature Detection

### Using @supports

```css
/* Check CSS feature support */
@supports (display: grid) {
  .grid { display: grid; }
}

@supports not (display: grid) {
  .grid { display: flex; flex-wrap: wrap; }
}

@supports (container-type: inline-size) {
  .card { container-type: inline-size; }
}

@supports (selector(:has(p))) {
  .parent:has(.child) { background: blue; }
}
```

### Using Modernizr

```html
<script src="https://cdnjs.cloudflare.com/ajax/libs/modernizr/3.12.0/modernizr.min.js"></script>
```

```js
// Check feature support
if (Modernizr.flexbox) {
  console.log('Flexbox is supported');
}

if (Modernizr.csstransforms3d) {
  document.body.classList.add('transforms3d');
}

// CSS classes are automatically added to html element
// <html class="flexbox flexboxlegacy no-flexboxtweener">
```

### Custom Feature Detection

```js
const featureDetect = {
  // CSS features
  grid: CSS.supports('display', 'grid'),
  flexbox: CSS.supports('display', 'flex'),
  containerQueries: CSS.supports('container-type', 'inline-size'),
  cssLayers: CSS.supports('@layer', ''),
  cssNesting: CSS.supports('selector(&.test)'),
  hasSelector: CSS.supports('selector(:has(p))'),
  subgrid: CSS.supports('grid-template-columns', 'subgrid'),

  // JS APIs
  webp: () => new Promise(resolve => {
    const img = new Image();
    img.onload = () => resolve(true);
    img.onerror = () => resolve(false);
    img.src = 'data:image/webp;base64,UklGRiQAAABXRUJQVlA4IBgAAAAwAQCdASoBAAEAAwA0JaQAA3AA/vuUAAA=';
  }),
  avif: () => new Promise(resolve => {
    const img = new Image();
    img.onload = () => resolve(true);
    img.onerror = () => resolve(false);
    img.src = 'data:image/avif;base64,AAAAIGZ0eXBhdmlmAAAAAGF2aWZtaWYxbWlhZk1BMUIAAADybWV0YQAAAAAAAAAoaGRscgAAAAAAAAAAcGljdAAAAAAAAAAAAAAAAGxpYmF2aWYAAAAADnBpdG0AAAAAAAEAAAAe';
  }),
  serviceWorker: 'serviceWorker' in navigator,
  webShare: 'share' in navigator,
  webBluetooth: 'bluetooth' in navigator,
  webUSB: 'usb' in navigator,
  webSerial: 'serial' in navigator,

  // HTML features
  dialog: 'HTMLDialogElement' in window,
  details: 'HTMLDetailsElement' in window,
  lazyLoading: 'loading' in HTMLImageElement.prototype,

  // Check all
  async all() {
    return {
      ...this,
      webp: await this.webp(),
      avif: await this.avif()
    };
  }
};

// Usage
const features = await featureDetect.all();
console.table(features);
```

## Polyfilling

```html
<!-- Polyfill for browsers that don't support features -->

<!-- Promise polyfill -->
<script src="https://cdn.jsdelivr.net/npm/promise-polyfill@8/dist/polyfill.min.js"></script>

<!-- Fetch polyfill -->
<script src="https://cdn.jsdelivr.net/npm/whatwg-fetch@3/dist/fetch.umd.min.js"></script>

<!-- Dialog polyfill -->
<script src="https://cdn.jsdelivr.net/npm/dialog-polyfill@0/dist/dialog-polyfill.min.js"></script>
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/dialog-polyfill@0/dist/dialog-polyfill.min.css">

<!-- Details/Summary polyfill -->
<script src="https://cdn.jsdelivr.net/npm/details-element-polyfill@2/dist/details-element-polyfill.js"></script>

<!-- Object-fit polyfill -->
<script src="https://cdn.jsdelivr.net/npm/object-fit-images@3/dist/ofi.min.js"></script>
```

```js
// Conditional polyfill loading
async function loadPolyfills() {
  const polyfills = [];

  if (!window.HTMLDialogElement) {
    polyfills.push(loadScript('https://cdn.example.com/dialog-polyfill.js'));
  }

  if (!('loading' in HTMLImageElement.prototype)) {
    polyfills.push(loadScript('https://cdn.example.com/lazysizes.min.js'));
  }

  if (!CSS.supports('display', 'grid')) {
    polyfills.push(loadScript('https://cdn.example.com/css-grid-polyfill.js'));
  }

  if (polyfills.length > 0) {
    await Promise.all(polyfills);
    console.log(`${polyfills.length} polyfills loaded`);
  }
}

function loadScript(src) {
  return new Promise((resolve, reject) => {
    const script = document.createElement('script');
    script.src = src;
    script.onload = resolve;
    script.onerror = reject;
    document.head.appendChild(script);
  });
}
```

## Testing Approaches

### Visual Regression Testing

```js
// Using backstopjs or Percy for visual diffs
// backstop.json
{
  "id": "html_test",
  "viewports": [
    { "name": "mobile", "width": 375, "height": 812 },
    { "name": "tablet", "width": 768, "height": 1024 },
    { "name": "desktop", "width": 1280, "height": 800 }
  ],
  "scenarios": [
    { "label": "Homepage", "url": "http://localhost:3000/" },
    { "label": "About", "url": "http://localhost:3000/about" },
    { "label": "Contact Form", "url": "http://localhost:3000/contact" }
  ],
  "paths": {
    "bitmaps_reference": "backstop/reference",
    "bitmaps_test": "backstop/test",
    "html_report": "backstop/html_report"
  }
}
```

```bash
# BackstopJS commands
npx backstop reference  # Create reference screenshots
npx backstop test       # Compare current vs reference
npx backstop approve    # Approve changes as new baseline
```

### Automated Cross-Browser Testing

```js
// Using Playwright for cross-browser testing
const { chromium, firefox, webkit } = require('playwright');

async function testCrossBrowser(url) {
  const browsers = [
    { name: 'Chrome', launcher: chromium },
    { name: 'Firefox', launcher: firefox },
    { name: 'Safari', launcher: webkit }
  ];

  for (const { name, launcher } of browsers) {
    console.log(`Testing ${name}...`);

    const browser = await launcher.launch();
    const page = await browser.newPage({ viewport: { width: 1280, height: 800 } });

    await page.goto(url);

    // Take screenshot
    await page.screenshot({ path: `screenshots/${name.toLowerCase()}.png` });

    // Run tests
    const title = await page.title();
    const html = await page.content();
    const errors = await page.evaluate(() => {
      // Collect console errors
      const errors = [];
      window.addEventListener('error', (e) => errors.push(e.message));
      return errors;
    });

    console.log(`${name}: "${title}" - ${errors.length} errors`);

    await browser.close();
  }
}
```

### Responsive Testing

```js
class ResponsiveTester {
  constructor(url) {
    this.url = url;
    this.viewports = [
      { name: 'iPhone SE', width: 375, height: 667 },
      { name: 'iPhone 14', width: 390, height: 844 },
      { name: 'iPad Mini', width: 768, height: 1024 },
      { name: 'iPad Pro', width: 1024, height: 1366 },
      { name: 'Desktop HD', width: 1280, height: 800 },
      { name: 'Desktop Full HD', width: 1920, height: 1080 }
    ];
    this.issues = [];
  }

  async test() {
    for (const vp of this.viewports) {
      console.log(`Testing ${vp.name} (${vp.width}x${vp.height})...`);

      // Open in iframe to test
      const iframe = document.createElement('iframe');
      iframe.src = this.url;
      iframe.width = vp.width;
      iframe.height = vp.height;
      document.body.appendChild(iframe);

      await new Promise(resolve => {
        iframe.onload = () => {
          const issues = this.checkLayout(iframe, vp);
          this.issues.push({ viewport: vp.name, issues });
          document.body.removeChild(iframe);
          resolve();
        };
      });
    }

    return this.issues;
  }

  checkLayout(iframe, viewport) {
    const doc = iframe.contentDocument;
    const issues = [];

    // Check for horizontal scroll
    if (doc.body.scrollWidth > viewport.width) {
      issues.push('Horizontal scrollbar present');
    }

    // Check text overflow
    doc.querySelectorAll('p, h1, h2, h3, li, a, button').forEach(el => {
      if (el.scrollWidth > el.clientWidth) {
        issues.push(`Text overflow in: ${el.tagName} "${el.textContent.slice(0, 30)}..."`);
      }
    });

    // Check overlapping elements
    // (simplified - real test needs intersection calculation)

    return issues;
  }
}
```

## Compatibility Table

```html
<table class="compat-table">
  <thead>
    <tr>
      <th>Feature</th>
      <th>Chrome</th>
      <th>Firefox</th>
      <th>Safari</th>
      <th>Edge</th>
      <th>IE11</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>Container Queries</td>
      <td class="yes">✓</td>
      <td class="yes">✓</td>
      <td class="partial">16+</td>
      <td class="yes">✓</td>
      <td class="no">✗</td>
    </tr>
    <tr>
      <td>CSS Nesting</td>
      <td class="yes">✓</td>
      <td class="yes">✓</td>
      <td class="yes">✓</td>
      <td class="yes">✓</td>
      <td class="no">✗</td>
    </tr>
    <tr>
      <td>Dialog Element</td>
      <td class="yes">✓</td>
      <td class="yes">✓</td>
      <td class="yes">✓</td>
      <td class="yes">✓</td>
      <td class="no">✗</td>
    </tr>
  </tbody>
</table>
```

```css
.compat-table { border-collapse: collapse; width: 100%; }
.compat-table th, .compat-table td { padding: 8px 12px; text-align: center; border: 1px solid #ddd; }
.compat-table th { background: #f5f5f5; }
.compat-table td:first-child { text-align: left; }
.yes { background: #d4edda; color: #155724; }
.partial { background: #fff3cd; color: #856404; }
.no { background: #f8d7da; color: #721c24; }
```

## Practice

1. Build a feature detection library that checks for 20+ HTML/CSS/JS features and displays the results.
2. Create a responsive testing tool that loads a URL in different viewports and reports layout issues.
3. Set up a cross-browser testing pipeline with Playwright that tests in Chrome, Firefox, and WebKit.
4. Build a polyfill loader that conditionally loads polyfills based on feature detection results.
