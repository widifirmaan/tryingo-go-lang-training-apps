# Anchors (`<a>` Tag)

The anchor element `<a>` creates hyperlinks, the foundation of the web.

```html
<a href="https://example.com">Visit Example</a>
```

## The `href` Attribute

Specifies the destination URL.

### Types of URLs

| Type | Example | Use Case |
|------|---------|----------|
| Absolute URL | `https://example.com/page` | External links |
| Relative URL | `/about` or `about.html` | Internal navigation |
| Fragment | `#section-2` | Bookmark within a page |
| Email | `mailto:hello@example.com` | Opens email client |
| Phone | `tel:+1234567890` | Opens dialer on mobile |
| JavaScript | `javascript:void(0)` | Avoid — use event handlers |

## The `target` Attribute

Controls where the linked page opens.

```html
<a href="https://example.com" target="_blank">Open in new tab</a>
```

| Value | Behavior |
|-------|----------|
| `_self` | Opens in same tab (default) |
| `_blank` | Opens in new tab or window |
| `_parent` | Opens in parent frame |
| `_top` | Opens in full body of window |

## The `rel` Attribute

Describes the relationship between current page and linked page.

```html
<a href="https://example.com" target="_blank" rel="noopener noreferrer">
  External link
</a>
```

| Value | Purpose |
|-------|---------|
| `noopener` | Security — prevents new tab from accessing `window.opener` |
| `noreferrer` | Privacy — hides referrer information |
| `nofollow` | SEO — tells search engines not to pass authority |
| `external` | Indicates external link |

**Always use `rel="noopener noreferrer"` with `target="_blank"`** to prevent tab-napping attacks.

## Internal Links

Links between pages on the same site.

```html
<nav>
  <a href="/">Home</a>
  <a href="/about">About</a>
  <a href="/blog">Blog</a>
  <a href="/contact">Contact</a>
</nav>
```

## Bookmark Links

Link to a specific section within the same page using `id` attributes.

```html
<!-- Table of Contents -->
<nav>
  <a href="#introduction">Introduction</a>
  <a href="#features">Features</a>
  <a href="#pricing">Pricing</a>
</nav>

<!-- Target sections -->
<section id="introduction">
  <h2>Introduction</h2>
</section>

<section id="features">
  <h2>Features</h2>
</section>

<section id="pricing">
  <h2>Pricing</h2>
</section>
```

## Link Best Practices

```html
<!-- Descriptive link text -->
<a href="/products">View our product catalog</a>

<!-- Avoid vague text -->
<a href="/products">Click here</a>
```

| Do | Don't |
|----|-------|
| Use descriptive link text | Use "click here", "read more" |
| Open external links with `target="_blank"` + `rel="noopener"` | Forget to warn users about new tabs |
| Use relative URLs for internal links | Use full URLs for same-site links |
| Add `aria-label` when link text alone is unclear | Link the same URL twice on one page |

## Practice

1. Build a navigation menu with at least 4 internal links
2. Create a long page with a table of contents using bookmark links
3. Add an external link that opens in a new tab with security attributes
4. Add a `mailto:` and a `tel:` link
