# Core Web Vitals

## Overview

Core Web Vitals are Google's metrics for user experience: Largest Contentful Paint (LCP), Interaction to Next Paint (INP), and Cumulative Layout Shift (CLS).

## The Three Metrics

| Metric | Good | Needs Work | Poor |
|--------|------|------------|------|
| **LCP** (loading) | ≤ 2.5s | 2.5s - 4.0s | > 4.0s |
| **INP** (interactivity) | ≤ 200ms | 200ms - 500ms | > 500ms |
| **CLS** (visual stability) | ≤ 0.1 | 0.1 - 0.25 | > 0.25 |

## Measuring Web Vitals

### Using the Web Vitals Library

```html
<script src="https://unpkg.com/web-vitals@3/dist/web-vitals.iife.js"></script>
<script>
  webVitals.onCLS(console.log);
  webVitals.onFCP(console.log);
  webVitals.onFID(console.log);    // Legacy, replaced by INP
  webVitals.onINP(console.log);
  webVitals.onLCP(console.log);
  webVitals.onTTFB(console.log);

  // Send to analytics
  function sendToAnalytics(metric) {
    const body = JSON.stringify(metric);
    navigator.sendBeacon('/analytics', body);
  }

  webVitals.onLCP(sendToAnalytics);
  webVitals.onINP(sendToAnalytics);
  webVitals.onCLS(sendToAnalytics);
</script>
```

### Using Performance API

```js
// Observe LCP
const lcpObserver = new PerformanceObserver((list) => {
  const entries = list.getEntries();
  const lastEntry = entries[entries.length - 1];
  console.log('LCP:', lastEntry.startTime, 'ms -', lastEntry.element);
});
lcpObserver.observe({ type: 'largest-contentful-paint', buffered: true });

// Observe Layout Shifts
const clsObserver = new PerformanceObserver((list) => {
  let clsValue = 0;
  list.getEntries().forEach((entry) => {
    if (!entry.hadRecentInput) {
      clsValue += entry.value;
    }
  });
  console.log('CLS:', clsValue);
});
clsObserver.observe({ type: 'layout-shift', buffered: true });

// Observe First Input (INP)
const inpObserver = new PerformanceObserver((list) => {
  list.getEntries().forEach((entry) => {
    console.log('INP:', entry.duration, 'ms -', entry.name);
  });
});
inpObserver.observe({ type: 'first-input', buffered: true });

// Observe Long Tasks that affect INP
const longTaskObserver = new PerformanceObserver((list) => {
  list.getEntries().forEach((entry) => {
    console.log('Long task:', entry.duration, 'ms');
  });
});
longTaskObserver.observe({ type: 'longtask', buffered: true });
```

## Optimizing LCP

### Largest Contentful Paint Optimization

```html
<!-- 1. Preload hero image -->
<head>
  <link rel="preload" href="hero.webp" as="image" fetchpriority="high">
</head>

<!-- 2. Optimize image format and size -->
<img src="hero.webp" alt="Hero"
     width="1200" height="600"
     fetchpriority="high"
     decoding="async">

<!-- 3. Use responsive images -->
<picture>
  <source srcset="hero-1600.webp" media="(min-width: 1200px)">
  <source srcset="hero-800.webp" media="(min-width: 768px)">
  <img src="hero-800.webp" alt="Hero" width="800" height="400"
       fetchpriority="high">
</picture>

<!-- 4. Server push for critical resources -->
<!-- HTTP/2: Link header -->
```

```css
/* 5. Critical CSS inlined (avoid render-blocking) */
/* Already covered in 02-critical-css.md */

/* 6. Avoid lazy loading above-fold images */
/* ❌ Don't do this: */
img.hero { loading: lazy; } /* Above-fold, should be eager */

/* 7. Font optimization */
@font-face {
  font-family: 'Inter';
  src: url('fonts/inter-var.woff2') format('woff2');
  font-display: swap; /* Show text immediately with fallback font */
}
```

```js
// 8. Minimize render-blocking scripts
// Use async or defer
<script src="analytics.js" async></script>
<script src="app.js" defer></script>
```

### LCP Checklist

```txt
- [ ] Hero image is preloaded with fetchpriority="high"
- [ ] Hero image uses modern format (webp/avif)
- [ ] Dimensions are set on LCP element
- [ ] Critical CSS is inlined
- [ ] Render-blocking resources are minimized
- [ ] Server response time (TTFB) is < 800ms
- [ ] No lazy loading on above-fold content
```

## Optimizing INP

### Interaction to Next Paint

```html
<!-- 1. Break up long tasks -->
<script>
  function doHeavyWork() {
    // Break into chunks using setTimeout
    const tasks = getTasks();
    let index = 0;

    function processChunk() {
      const end = Math.min(index + 50, tasks.length);
      for (let i = index; i < end; i++) {
        processTask(tasks[i]);
      }
      index = end;

      if (index < tasks.length) {
        setTimeout(processChunk, 0);
      }
    }

    processChunk();
  }
</script>
```

```js
// 2. Use requestAnimationFrame for visual updates
function updateUI(data) {
  requestAnimationFrame(() => {
    // DOM updates here
    element.textContent = data;
  });
}

// 3. Use isInputPending for better responsiveness
document.addEventListener('input', (e) => {
  if (navigator.scheduling?.isInputPending) {
    // Browser has pending input, yield
    setTimeout(() => processInput(e), 0);
  } else {
    processInput(e);
  }
});

// 4. Use scheduler.yield (Chrome 115+)
async function processLargeArray(items) {
  for (const item of items) {
    await scheduler.yield();
    processItem(item);
  }
}

// 5. Debounce expensive handlers
function debounce(fn, delay = 100) {
  let timer;
  return (...args) => {
    clearTimeout(timer);
    timer = setTimeout(() => fn(...args), delay);
  };
}

const handleScroll = debounce(() => {
  // Expensive scroll handler
}, 16);
```

### INP Checklist

```txt
- [ ] No long tasks (> 50ms) during critical interaction paths
- [ ] Event handlers are debounced/throttled
- [ ] Heavy computation uses Web Workers or idle callbacks
- [ ] Third-party scripts are loaded async or deferred
- [ ] No layout thrashing (avoid forced reflows)
- [ ] Use passive event listeners for touch/scroll
```

## Optimizing CLS

### Cumulative Layout Shift

```html
<!-- 1. Set explicit dimensions on all images -->
<img src="photo.jpg" alt="Photo" width="800" height="600">

<!-- 2. Use aspect-ratio for responsive embeds -->
<div class="video-wrapper" style="aspect-ratio: 16/9;">
  <iframe src="video.mp4" width="100%" height="100%"></iframe>
</div>

<!-- 3. Reserve space for dynamic content -->
<div class="ad-slot" style="min-height: 250px;">
  <!-- Ad loads here -->
</div>

<!-- 4. Reserve space for fonts -->
<head>
  <style>
    @font-face {
      font-family: 'Inter';
      src: url('fonts/inter-var.woff2') format('woff2');
      font-display: swap;
      size-adjust: 100%; /* Mitigate layout shift */
    }

    /* Use font-size-adjust to reduce shift */
    body {
      font-family: 'Inter', system-ui, sans-serif;
      font-size-adjust: 0.5;
    }
  </style>
</head>
```

```css
/* 5. Set min-height for loading states */
.skeleton-loader {
  min-height: 400px;
  background: linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%);
  background-size: 200% 100%;
  animation: shimmer 1.5s infinite;
}

/* 6. Avoid inserting content above existing content */
/* Bad: inserting banner at top of page shifts everything */
/* Good: insert at bottom or use transform */
```

### CLS Checklist

```txt
- [ ] Images have explicit width/height attributes
- [ ] Embeds (iframes/videos) have aspect-ratio
- [ ] Ads have reserved space (min-height)
- [ ] Fonts use font-display: swap
- [ ] Dynamic content has placeholder space
- [ ] No unexpected DOM insertions above user content
- [ ] Animations only use transform and opacity
```

## Web Vitals Reporting

```html
<script>
  // Comprehensive web vitals reporting
  (function() {
    function reportMetric(metric) {
      const data = {
        name: metric.name,
        value: metric.value,
        rating: metric.rating,
        delta: metric.delta,
        id: metric.id,
        navigationType: metric.navigationType,
        url: window.location.href,
        timestamp: Date.now()
      };

      // Send to analytics
      fetch('/api/vitals', {
        method: 'POST',
        body: JSON.stringify(data),
        headers: { 'Content-Type': 'application/json' },
        keepalive: true
      });

      // Log to console
      console.log(`[Web Vitals] ${metric.name}: ${metric.value} (${metric.rating})`);
    }
  })();
</script>
```

## Practice

1. Implement web vitals monitoring on a page and identify the LCP element, CLS sources, and INP bottlenecks.
2. Optimize a page's LCP by preloading the hero image, inlining critical CSS, and using proper image formats.
3. Fix CLS issues on a page by adding dimensions to images, reserving space for ads, and optimizing fonts.
4. Improve INP by breaking up long tasks, debouncing event handlers, and using Web Workers for heavy computation.
