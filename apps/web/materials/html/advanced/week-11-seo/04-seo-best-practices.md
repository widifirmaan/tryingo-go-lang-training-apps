# SEO Best Practices

## Technical SEO

### Semantic HTML

```html
<!-- Good: semantic structure helps search engines -->
<article>
  <h1>How to Bake Sourdough Bread</h1>
  <p class="meta">
    Published: <time datetime="2026-07-01">July 1, 2026</time>
    by <span class="author">Chef Maria</span>
  </p>
  <section>
    <h2>Ingredients</h2>
    <ul>...</ul>
  </section>
  <section>
    <h2>Instructions</h2>
    <ol>...</ol>
  </section>
</article>
```

### URL Structure

```txt
# Good: descriptive, hierarchical
/products/electronics/headphones/soundpro-x2
/blog/how-to-bake-sourdough
/tutorials/2026/seo-best-practices

# Bad: meaningless, dynamic
/page?id=123&cat=456
/item?product=789x0
/index.php?article=how-to-bake-sourdough
```

### Canonical URLs

```html
<!-- Prevent duplicate content issues -->
<link rel="canonical" href="https://example.com/products/headphones">

<!-- Multiple URLs pointing to same content -->
<!-- https://example.com/products?id=123 -->
<!-- https://example.com/products/headphones -->
<!-- https://www.example.com/products/headphones -->
<!-- All should have same canonical -->
```

### Pagination

```html
<head>
  <link rel="prev" href="https://example.com/blog/page/2">
  <link rel="next" href="https://example.com/blog/page/4">
  <link rel="canonical" href="https://example.com/blog/page/3">
</head>
```

## Core Web Vitals

### Largest Contentful Paint (LCP)

```html
<!-- Optimize LCP: load hero image early -->
<head>
  <link rel="preload" href="images/hero.webp" as="image">
</head>
<body>
  <div class="hero">
    <img src="images/hero.webp" alt="Hero banner"
         width="1200" height="600" fetchpriority="high">
  </div>
</body>
```

### First Input Delay (FID) / Interaction to Next Paint (INP)

```html
<!-- Defer non-critical JavaScript -->
<script src="analytics.js" defer></script>
<script src="chat-widget.js" async></script>

<!-- Keep main thread responsive -->
<!-- Break long tasks into smaller chunks -->
```

### Cumulative Layout Shift (CLS)

```html
<!-- Always set dimensions on images -->
<img src="photo.jpg" alt="Description" width="800" height="600">

<!-- Use aspect-ratio CSS -->
<img src="photo.jpg" alt="Description" style="aspect-ratio: 16/9;">

<!-- Reserve space for dynamic elements -->
<div style="min-height: 60px;">
  <div id="ad-slot"></div>
</div>

<!-- Use font-display: swap -->
<style>
  @font-face {
    font-family: 'MyFont';
    src: url('myfont.woff2');
    font-display: swap;
  }
</style>
```

## Mobile SEO

```html
<!-- Responsive viewport -->
<meta name="viewport" content="width=device-width, initial-scale=1.0">

<!-- Mobile-friendly navigation -->
<nav class="mobile-nav" role="navigation" aria-label="Mobile">
  <button class="hamburger" aria-expanded="false">
    <span class="sr-only">Menu</span>
  </button>
  <ul class="nav-links" hidden>
    <li><a href="/">Home</a></li>
    <li><a href="/products">Products</a></li>
  </ul>
</nav>
```

```css
/* Ensure touch targets are at least 48px */
.nav-links a,
button,
input[type="submit"] {
  min-height: 48px;
  min-width: 48px;
  padding: 12px;
}
```

## Content SEO

### Heading Structure

```html
<!-- One h1 per page, descriptive -->
<h1>Complete Guide to HTML5 Forms</h1>
  <h2>Form Validation</h2>
    <h3>Constraint Validation API</h3>
    <h3>Custom Validation Messages</h3>
  <h2>Form Attributes</h2>
    <h3>Autocomplete</h3>
    <h3>Input Types</h3>
```

### Internal Linking

```html
<!-- Use descriptive anchor text -->
<p>
  Learn more about
  <a href="/guides/html5-forms">HTML5 form validation</a>
  and
  <a href="/guides/css-grid">modern CSS layout techniques</a>.
</p>

<!-- Breadcrumb navigation -->
<nav aria-label="Breadcrumb">
  <ol>
    <li><a href="/">Home</a></li>
    <li><a href="/guides">Guides</a></li>
    <li aria-current="page">HTML5 Forms</li>
  </ol>
</nav>
```

### Image SEO

```html
<!-- Descriptive alt text, proper filename -->
<img src="chocolate-chip-cookies-recipe.jpg"
     alt="Freshly baked chocolate chip cookies on a cooling rack"
     width="800" height="600"
     loading="lazy"
     decoding="async">

<!-- Responsive images -->
<picture>
  <source srcset="hero-1600.webp" media="(min-width: 1200px)"
          type="image/webp">
  <source srcset="hero-800.webp" media="(min-width: 600px)"
          type="image/webp">
  <img src="hero-800.jpg" alt="Hero banner"
       width="800" height="400" loading="eager">
</picture>
```

## Performance & SEO

```html
<!-- Preconnect to third-party origins -->
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://cdn.example.com">
<link rel="dns-prefetch" href="https://api.example.com">

<!-- Preload critical resources -->
<link rel="preload" href="fonts/inter-var.woff2" as="font"
      type="font/woff2" crossorigin>

<!-- Prefetch next page -->
<link rel="prefetch" href="/products" as="document">

<!-- Prerender likely next page -->
<link rel="prerender" href="/next-page">

<!-- Lazy load non-critical images -->
<img src="gallery-photo.jpg" loading="lazy" alt="Gallery image">
```

## HTML Best Practices for SEO

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Complete SEO Guide | WebDev Pro</title>
  <meta name="description"
        content="Master SEO with our comprehensive guide covering meta tags, structured data, sitemaps, and technical best practices.">
  <link rel="canonical" href="https://example.com/guides/seo">

  <!-- Speed optimizations -->
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preload" href="css/critical.min.css" as="style">
  <link rel="stylesheet" href="css/critical.min.css">

  <!-- Deferred non-critical CSS -->
  <link rel="preload" href="css/full.min.css" as="style"
        onload="this.onload=null;this.rel='stylesheet'">
  <noscript><link rel="stylesheet" href="css/full.min.css"></noscript>

  <!-- Preload hero image -->
  <link rel="preload" href="images/hero.webp" as="image">
</head>
<body>
  <header role="banner">
    <a href="/" aria-label="WebDev Pro Home">
      <img src="logo.svg" alt="WebDev Pro" width="180" height="40">
    </a>
    <nav aria-label="Main" role="navigation">
      <ul>
        <li><a href="/guides">Guides</a></li>
        <li><a href="/tutorials">Tutorials</a></li>
        <li><a href="/tools">Tools</a></li>
      </ul>
    </nav>
  </header>

  <main role="main">
    <h1>Complete SEO Guide 2026</h1>

    <nav aria-label="Breadcrumb">
      <ol>
        <li><a href="/">Home</a></li>
        <li><a href="/guides">Guides</a></li>
        <li aria-current="page">SEO Guide</li>
      </ol>
    </nav>

    <article>
      <p>Welcome to our comprehensive SEO guide...</p>

      <section aria-labelledby="meta-tags">
        <h2 id="meta-tags">Meta Tags</h2>
        <p>Content about meta tags...</p>
      </section>

      <section aria-labelledby="structured-data">
        <h2 id="structured-data">Structured Data</h2>
        <p>Content about structured data...</p>
      </section>
    </article>

    <aside aria-label="Related guides">
      <h2>Related Guides</h2>
      <ul>
        <li><a href="/guides/accessibility">Web Accessibility Guide</a></li>
        <li><a href="/guides/performance">Performance Optimization</a></li>
      </ul>
    </aside>
  </main>

  <footer role="contentinfo">
    <small>&copy; 2026 WebDev Pro. All rights reserved.</small>
  </footer>
</body>
</html>
```

## SEO Audit Checklist

```txt
[ ] Page has unique, descriptive <title> (under 60 chars)
[ ] Meta description is compelling, 150-160 chars
[ ] Canonical URL is set
[ ] Open Graph and Twitter Card tags exist
[ ] Structured data is valid (test with Rich Results Test)
[ ] robots.txt is configured correctly
[ ] XML sitemap exists and is submitted to Search Console
[ ] Page loads in under 3 seconds
[ ] Mobile-friendly (responsive design)
[ ] No broken links (check with tools)
[ ] HTTPS is enabled
[ ] Proper heading hierarchy (one h1, no skipping)
[ ] Images have descriptive alt text
[ ] Internal links use descriptive anchor text
[ ] No duplicate content issues
[ ] Core Web Vitals pass (LCP < 2.5s, FID < 100ms, CLS < 0.1)
[ ] hreflang tags are correct if multilingual
[ ] 404 page exists and guides users
[ ] Redirects are properly implemented (301 vs 302)
```

## Practice

1. Perform an SEO audit on a website (any public site). Document at least 10 issues and suggest fixes.
2. Create an SEO-optimized blog post with proper heading hierarchy, internal links, and image optimization.
3. Implement Core Web Vitals optimizations on a sample page (LCP, CLS, INP).
4. Build a mobile-friendly navigation system that works for both users and search engine crawlers.
