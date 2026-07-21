# Resource Hints

## Overview

Resource hints tell the browser about upcoming resources, allowing it to prepare connections and fetch content before it's needed.

## Resource Hint Types

### dns-prefetch

```html
<!-- Resolve DNS for third-party domains early -->
<head>
  <link rel="dns-prefetch" href="https://fonts.googleapis.com">
  <link rel="dns-prefetch" href="https://cdn.example.com">
  <link rel="dns-prefetch" href="https://api.example.com">
  <link rel="dns-prefetch" href="https://analytics.google.com">
</head>
```

### preconnect

```html
<!-- DNS + TCP + TLS handshake (more aggressive than dns-prefetch) -->
<head>
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link rel="preconnect" href="https://api.example.com">
</head>
```

### preload

```html
<!-- Load critical resources as early as possible -->
<head>
  <!-- Fonts -->
  <link rel="preload" href="fonts/inter-var.woff2" as="font"
        type="font/woff2" crossorigin>

  <!-- Images -->
  <link rel="preload" href="images/hero.webp" as="image"
        fetchpriority="high">

  <!-- Styles (promoted to stylesheet on load) -->
  <link rel="preload" href="critical.css" as="style"
        onload="this.onload=null;this.rel='stylesheet'">

  <!-- Scripts -->
  <link rel="preload" href="app.js" as="script">

  <!-- Videos -->
  <link rel="preload" href="intro.mp4" as="video" type="video/mp4">

  <!-- Documents -->
  <link rel="preload" href="data.json" as="fetch" crossorigin>
</head>
```

### prefetch

```html
<!-- Fetch resources likely needed for future navigation -->
<head>
  <link rel="prefetch" href="/products" as="document">
  <link rel="prefetch" href="/styles/product.css" as="style">
  <link rel="prefetch" href="/scripts/product.js" as="script">
  <link rel="prefetch" href="/images/product-hero.webp" as="image">
</head>
```

### prerender

```html
<!-- Prerender entire page (use sparingly) -->
<head>
  <link rel="prerender" href="/most-likely-next-page">
</head>
```

## Modulepreload

```html
<!-- Preload JavaScript modules -->
<head>
  <link rel="modulepreload" href="/scripts/app.js">
  <link rel="modulepreload" href="/scripts/utils.js">
</head>
```

## Priority Hints

```html
<!-- Explicitly set fetch priority -->
<head>
  <!-- High priority: hero image -->
  <img src="hero.webp" alt="Hero" fetchpriority="high">

  <!-- Low priority: below-fold images -->
  <img src="footer-bg.webp" alt="Footer" fetchpriority="low">

  <!-- Default priority for most resources -->
  <img src="content.jpg" alt="Content">

  <!-- Preload with high priority -->
  <link rel="preload" href="critical-font.woff2" as="font"
        crossorigin fetchpriority="high">
</head>
```

## Complete Resource Hint Strategy

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Resource Hints Demo</title>

  <!-- Step 1: DNS resolve third-party origins -->
  <link rel="dns-prefetch" href="https://fonts.googleapis.com">
  <link rel="dns-prefetch" href="https://www.googletagmanager.com">

  <!-- Step 2: Preconnect to critical third-parties -->
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>

  <!-- Step 3: Preload critical first-party resources -->
  <link rel="preload" href="fonts/inter-var.woff2" as="font" crossorigin>
  <link rel="preload" href="css/critical.css" as="style">
  <link rel="preload" href="images/hero.webp" as="image" fetchpriority="high">
  <link rel="preload" href="js/priority.js" as="script">

  <!-- Step 4: Critical CSS (inline) -->
  <style>
    /* Critical above-fold styles */
  </style>

  <!-- Step 5: Async full CSS -->
  <link rel="preload" href="css/full.css" as="style"
        onload="this.onload=null;this.rel='stylesheet'">
  <noscript><link rel="stylesheet" href="css/full.css"></noscript>

  <!-- Step 6: Prefetch likely next page resources -->
  <link rel="prefetch" href="/products">
  <link rel="prefetch" href="css/products.css" as="style">
</head>
```

## JavaScript Resource Hints

```js
// Dynamic preconnect
function preconnect(url) {
  const link = document.createElement('link');
  link.rel = 'preconnect';
  link.href = url;
  document.head.appendChild(link);
}

// Dynamic preload
function preload(url, as = 'image') {
  const link = document.createElement('link');
  link.rel = 'preload';
  link.href = url;
  link.as = as;
  if (as === 'font') link.crossOrigin = 'anonymous';
  document.head.appendChild(link);
}

// Dynamic prefetch
function prefetch(url) {
  const link = document.createElement('link');
  link.rel = 'prefetch';
  link.href = url;
  document.head.appendChild(link);
}

// Prefetch on hover/Interaction
document.querySelectorAll('.product-link').forEach(link => {
  link.addEventListener('mouseenter', () => {
    prefetch(link.href);
  }, { once: true });
});

// Preconnect on user interaction
document.addEventListener('click', () => {
  preconnect('https://api.example.com');
}, { once: true });

// Load CSS on-demand
function loadCSS(href) {
  return new Promise((resolve) => {
    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = href;
    link.addEventListener('load', resolve);
    document.head.appendChild(link);
  });
}
```

## Performance Impact

```js
// Measure resource hint effectiveness
performance.mark('hint-start');

// Load a resource that was hinted
const img = new Image();
img.src = 'preloaded-image.jpg';
img.addEventListener('load', () => {
  performance.mark('hint-end');
  performance.measure('hint-to-load', 'hint-start', 'hint-end');
  const duration = performance.getEntriesByName('hint-to-load')[0].duration;
  console.log('Resource loaded in', duration, 'ms');
});

// Compare with non-hinted (usually 20-50% faster with preconnect)
```

## Best Practices

```txt
- Use dns-prefetch for all third-party origins
- Use preconnect for critical third-party origins (max 3)
- Preload above-the-fold critical resources (hero image, fonts)
- Prefetch resources for next page/user intent
- Use fetchpriority="high" on most important image
- Don't preload too many resources (competes for bandwidth)
- Test with DevTools Network panel to verify preloading
- Monitor impact on Core Web Vitals (LCP, FCP)
```

## Practice

1. Implement a complete resource hint strategy for an e-commerce product page including fonts, hero image, and API endpoints.
2. Build a link prefetching system that prefetches product pages when the user hovers over product links.
3. Measure the impact of preconnect on third-party font loading time using Performance API.
4. Create a resource hint dashboard that shows which resources are being preloaded/prefetched.
