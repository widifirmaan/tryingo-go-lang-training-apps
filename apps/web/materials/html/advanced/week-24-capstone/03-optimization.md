# Optimization

## Performance Optimization

### Critical Rendering Path

```html
<!-- 1. Preload key resources -->
<link rel="preload" href="/fonts/inter-var.woff2" as="font" crossorigin>
<link rel="preload" href="/images/hero.webp" as="image" fetchpriority="high">
<link rel="preload" href="/css/critical.css" as="style">

<!-- 2. Inline critical CSS -->
<style>
  /* Above-the-fold styles only */
  body { font-family: 'Inter', system-ui, sans-serif; }
  .hero { min-height: 90vh; display: flex; align-items: center; background: linear-gradient(...); }
  .hero h1 { font-size: clamp(2rem, 6vw, 4rem); }
  .btn { padding: 12px 24px; border-radius: 8px; }
</style>

<!-- 3. Async full CSS -->
<link rel="preload" href="/css/styles.css" as="style"
      onload="this.onload=null;this.rel='stylesheet'">
<noscript><link rel="stylesheet" href="/css/styles.css"></noscript>

<!-- 4. Defer JavaScript -->
<script src="/js/app.js" defer></script>
<script src="/js/router.js" defer></script>
```

### Image Optimization

```html
<!-- Responsive images with WebP -->
<picture>
  <source srcset="
    /images/project-1-400.webp 400w,
    /images/project-1-800.webp 800w,
    /images/project-1-1200.webp 1200w
  " type="image/webp" sizes="(max-width: 600px) 400px, (max-width: 1000px) 800px, 1200px">
  <img src="/images/project-1-800.jpg" alt="Project screenshot"
       width="800" height="500" loading="lazy" decoding="async"
       class="project-image">
</picture>

<!-- Hero image eager loaded -->
<img src="/images/hero.webp" alt="Hero" width="1200" height="600"
     fetchpriority="high" class="hero-image">
```

### Lazy Loading Components

```js
// Intersection Observer for component loading
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const el = entry.target;
      if (el.dataset.component) {
        import(`/components/${el.dataset.component}.js`)
          .then(module => module.default(el))
          .catch(err => console.error('Failed to load component:', err));
      }
      observer.unobserve(el);
    }
  });
}, { rootMargin: '200px' });

// Observe all lazy components
document.querySelectorAll('[data-component]').forEach(el => observer.observe(el));
```

## Accessibility Optimization

### ARIA Audit

```html
<!-- Ensure complete ARIA coverage -->
<header role="banner">
  <nav role="navigation" aria-label="Main navigation">
    <ul role="list">
      <li><a href="/" aria-current="page">Home</a></li>
    </ul>
  </nav>
</header>

<main role="main" id="main-content">
  <h1>Page Title</h1>

  <article role="article" aria-labelledby="article-title">
    <h2 id="article-title">Article</h2>
  </article>

  <aside role="complementary" aria-label="Related content">
    <h2>Related</h2>
  </aside>
</main>

<footer role="contentinfo">
  <small>&copy; 2026 Jane Developer</small>
</footer>
```

### Keyboard Navigation

```css
/* Focus indicators */
:focus-visible {
  outline: 3px solid var(--color-primary);
  outline-offset: 2px;
}

:focus:not(:focus-visible) {
  outline: none;
}

/* Skip link */
.skip-link {
  position: absolute;
  top: -100%;
  left: 16px;
  padding: 8px 16px;
  background: var(--color-primary);
  color: #fff;
  z-index: 10000;
  border-radius: 0 0 8px 8px;
}

.skip-link:focus {
  top: 0;
}
```

### Reduced Motion

```css
@media (prefers-reduced-motion: reduce) {
  *,
  *::before,
  *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
    scroll-behavior: auto !important;
  }
}
```

## SEO Optimization

### Meta Tags

```html
<head>
  <title>Jane Developer | Full Stack Web Developer Portfolio</title>
  <meta name="description"
        content="Full stack web developer specializing in modern HTML5, CSS, JavaScript, React, and Node.js. View portfolio projects and blog.">
  <meta name="robots" content="index, follow">
  <link rel="canonical" href="https://jane.dev">

  <!-- Open Graph -->
  <meta property="og:title" content="Jane Developer | Portfolio">
  <meta property="og:description"
        content="Full stack web developer specializing in modern web technologies.">
  <meta property="og:image" content="https://jane.dev/assets/og-image.jpg">
  <meta property="og:url" content="https://jane.dev">
  <meta property="og:type" content="website">

  <!-- Twitter -->
  <meta name="twitter:card" content="summary_large_image">
  <meta name="twitter:title" content="Jane Developer | Portfolio">
  <meta name="twitter:description"
        content="Full stack web developer portfolio.">
  <meta name="twitter:image" content="https://jane.dev/assets/og-image.jpg">
</head>
```

### Structured Data

```html
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "Person",
  "name": "Jane Developer",
  "url": "https://jane.dev",
  "image": "https://jane.dev/assets/avatar.jpg",
  "jobTitle": "Full Stack Developer",
  "description": "Full stack web developer with 5+ years experience",
  "knowsAbout": ["HTML", "CSS", "JavaScript", "React", "Node.js"],
  "sameAs": [
    "https://github.com/jane",
    "https://linkedin.com/in/jane",
    "https://twitter.com/jane"
  ]
}
</script>
```

### XML Sitemap

```xml
<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>https://jane.dev/</loc>
    <lastmod>2026-07-21</lastmod>
    <changefreq>weekly</changefreq>
    <priority>1.0</priority>
  </url>
  <url>
    <loc>https://jane.dev/projects</loc>
    <lastmod>2026-07-20</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.9</priority>
  </url>
  <url>
    <loc>https://jane.dev/blog</loc>
    <lastmod>2026-07-21</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.8</priority>
  </url>
  <url>
    <loc>https://jane.dev/about</loc>
    <lastmod>2026-06-01</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.7</priority>
  </url>
  <url>
    <loc>https://jane.dev/contact</loc>
    <lastmod>2026-01-01</lastmod>
    <changefreq>yearly</changefreq>
    <priority>0.6</priority>
  </url>
</urlset>
```

## PWA Optimization

### Service Worker

```js
// sw.js - Production service worker
const CACHE = 'portfolio-v1';
const STATIC_ASSETS = [
  '/', '/offline.html',
  '/css/styles.css', '/js/app.js',
  '/assets/icons/icon-192.png', '/assets/icons/icon-512.png',
  '/fonts/inter-var.woff2'
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE).then(cache => cache.addAll(STATIC_ASSETS)).then(self.skipWaiting())
  );
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then(keys => Promise.all(keys.filter(k => k !== CACHE).map(k => caches.delete(k))))
    .then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request).then(cached => {
      return cached || fetch(event.request).catch(() => {
        if (event.request.mode === 'navigate') return caches.match('/offline.html');
      });
    })
  );
});
```

## Security Hardening

### Security Headers

```js
// Production security headers (Express example)
app.use((req, res, next) => {
  // HSTS
  res.setHeader('Strict-Transport-Security', 'max-age=31536000; includeSubDomains; preload');
  // CSP
  res.setHeader('Content-Security-Policy',
    "default-src 'self'; " +
    "script-src 'self' 'unsafe-inline'; " +
    "style-src 'self' 'unsafe-inline'; " +
    "img-src 'self' https: data:; " +
    "font-src 'self' https://fonts.gstatic.com; " +
    "connect-src 'self' https://api.example.com; " +
    "frame-src 'none'; " +
    "object-src 'none'; " +
    "base-uri 'self'; " +
    "form-action 'self'"
  );
  // Other security headers
  res.setHeader('X-Content-Type-Options', 'nosniff');
  res.setHeader('X-Frame-Options', 'DENY');
  res.setHeader('X-XSS-Protection', '1; mode=block');
  res.setHeader('Referrer-Policy', 'strict-origin-when-cross-origin');
  res.setHeader('Permissions-Policy', 'camera=(), microphone=(), geolocation=()');
  next();
});
```

## Performance Budget

```json
{
  "budgets": [
    {
      "resourceType": "total",
      "budget": 500000
    },
    {
      "resourceType": "document",
      "budget": 30000
    },
    {
      "resourceType": "script",
      "budget": 100000
    },
    {
      "resourceType": "stylesheet",
      "budget": 50000
    },
    {
      "resourceType": "image",
      "budget": 200000
    },
    {
      "resourceType": "font",
      "budget": 50000
    }
  ],
  "timings": [
    {
      "metric": "first-contentful-paint",
      "budget": 1500
    },
    {
      "metric": "largest-contentful-paint",
      "budget": 2500
    },
    {
      "metric": "cumulative-layout-shift",
      "budget": 0.1
    },
    {
      "metric": "total-blocking-time",
      "budget": 200
    },
    {
      "metric": "interaction-to-next-paint",
      "budget": 200
    }
  ]
}
```

## Lighthouse Score Targets

```txt
Performance:    ≥ 95
Accessibility:  ≥ 95
Best Practices: ≥ 95
SEO:           ≥ 95
PWA:           ✓ (all checks passing)
```

## Practice

1. Run Lighthouse on the portfolio and optimize each category to achieve ≥ 95 scores.
2. Implement lazy loading for all images and below-fold components using Intersection Observer.
3. Add full ARIA support: landmarks, labels, descriptions, live regions, and keyboard handlers.
4. Set up the complete SEO package: meta tags, structured data, sitemap, robots.txt, and canonical URLs.
