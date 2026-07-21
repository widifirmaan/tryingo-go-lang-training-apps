# Organizing Body Content

The `<body>` element contains all visible content on the page. Structuring it well ensures maintainability, accessibility, and good SEO.

## The `<div>` Element

`<div>` is a generic container with no semantic meaning. Use it only when no semantic element fits.

```html
<div class="container">
  <div class="card">
    <h2>Card Title</h2>
    <p>Card content goes here.</p>
  </div>
</div>
```

### When to Use `<div>`

- Styling hooks (CSS classes)
- Layout wrappers
- JavaScript manipulation targets

When a semantic element exists, prefer it over `<div>`.

## Semantic vs `<div>` Decision Guide

| Content Type | Use Semantic | Avoid `<div>` |
|---|---|---|
| Page header | `<header>` | `<div class="header">` |
| Navigation | `<nav>` | `<div class="nav">` |
| Main content | `<main>` | `<div class="main">` |
| Article | `<article>` | `<div class="article">` |
| Sidebar | `<aside>` | `<div class="sidebar">` |
| Footer | `<footer>` | `<div class="footer">` |

## HTML Comments

Comments are not displayed in the browser. Use them to leave notes for yourself and other developers.

```html
<!-- This is an HTML comment -->

<!-- Header Section -->
<header>
  <h1>Site Title</h1>
</header>
<!-- End Header -->

<!-- 
  Multi-line comment
  can span several lines
-->
```

### Best Practices

- Comment complex or non-obvious sections
- Do not comment the obvious (`<!-- this is a paragraph -->`)
- Avoid leaving commented-out code in production

## Structural Organization Patterns

### Page Layout Skeleton

```html
<body>
  <header>
    <nav>
      <ul>
        <li><a href="/">Home</a></li>
        <li><a href="/about">About</a></li>
      </ul>
    </nav>
  </header>

  <main>
    <section>
      <h1>Page Heading</h1>
      <p>Content...</p>
    </section>
  </main>

  <footer>
    <p>&copy; 2026 Your Name</p>
  </footer>
</body>
```

### Content Grouping Pattern

```html
<body>
  <header role="banner">...</header>

  <main role="main">
    <section aria-labelledby="section-heading">
      <h2 id="section-heading">Section Title</h2>
      <article>
        <h3>Article Title</h3>
        <p>Article content...</p>
      </article>
    </section>
  </main>

  <footer role="contentinfo">...</footer>
</body>
```

## Practice

1. Create a fully structured HTML page with proper body organization.
2. Use HTML comments to label each major section.
3. Replace at least three `<div>` elements with appropriate semantic elements.
4. Validate your page using the W3C HTML Validator.
