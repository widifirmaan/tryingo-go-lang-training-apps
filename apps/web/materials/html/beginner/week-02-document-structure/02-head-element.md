# The `<head>` Element

The `<head>` element contains machine-readable metadata about the document. Content inside `<head>` is not displayed in the browser window.

```html
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>My Page Title</title>
  <link rel="stylesheet" href="styles.css">
</head>
```

## Meta Tags

### Character Encoding (`charset`)

```html
<meta charset="UTF-8">
```

Must be the first `<meta>` tag. UTF-8 supports virtually every character from every language.

### Viewport Meta Tag

Essential for responsive design on mobile devices.

```html
<meta name="viewport" content="width=device-width, initial-scale=1.0">
```

| Value | Meaning |
|-------|---------|
| `width=device-width` | Sets page width to device screen width |
| `initial-scale=1.0` | Sets initial zoom level |

### Description

```html
<meta name="description" content="Learn HTML5 from scratch — tutorials, examples, and projects.">
```

Used by search engines in search result snippets.

### Keywords (largely ignored by modern search engines)

```html
<meta name="keywords" content="HTML, CSS, web development, tutorial">
```

### Author

```html
<meta name="author" content="Your Name">
```

## Open Graph (OG) Tags

OG tags control how your page appears when shared on social media (Facebook, LinkedIn, Discord, etc.).

```html
<meta property="og:title" content="HTML5 Course">
<meta property="og:description" content="Master HTML5 with hands-on projects">
<meta property="og:image" content="https://example.com/thumbnail.jpg">
<meta property="og:url" content="https://example.com">
<meta property="og:type" content="website">
```

| Property | Purpose |
|----------|---------|
| `og:title` | Title shown in social card |
| `og:description` | Description shown in social card |
| `og:image` | Thumbnail image URL |
| `og:url` | Canonical URL of the page |
| `og:type` | Content type (`website`, `article`, etc.) |

## `<title>`

```html
<title>Home | HTML5 Course</title>
```

- Displayed in the browser tab
- Used by search engines as the primary link headline
- Critical for SEO

## `<link>`

Used to link external resources, most commonly stylesheets.

```html
<link rel="stylesheet" href="styles.css">
<link rel="icon" href="favicon.ico" type="image/x-icon">
```

| Attribute | Description |
|-----------|-------------|
| `rel` | Relationship (stylesheet, icon, preload, etc.) |
| `href` | URL of the linked resource |
| `type` | MIME type of the resource |

## `<script>`

```html
<script src="app.js" defer></script>
```

- Placed in `<head>` with `defer` to load after HTML parsing
- Without `defer` or `async`, scripts block rendering

## Practice

Create a `<head>` section that includes:
1. UTF-8 charset
2. Viewport meta tag
3. Title
4. Description and OG tags for social sharing
5. Link to a CSS file
6. A script tag with `defer`
