# Images (`<img>` Tag)

The `<img>` element embeds an image into the document. It is a void element (no closing tag).

```html
<img src="photo.jpg" alt="A scenic mountain landscape">
```

## Required Attributes

### `src`

The image URL (absolute or relative).

```html
<img src="images/logo.png" alt="Company logo">
<img src="https://example.com/banner.jpg" alt="Banner">
```

### `alt`

Alternative text describing the image. Used by screen readers and shown when the image fails to load.

```html
<!-- Good alt text -->
<img src="chart.png" alt="Bar chart showing Q3 revenue growth of 25%">

<!-- Decorative image — use empty alt -->
<img src="divider.svg" alt="">

<!-- Missing alt — accessibility failure -->
<img src="photo.jpg">
```

## Optional Attributes

### `width` and `height`

Specify intrinsic dimensions. Helps prevent layout shifts (Cumulative Layout Shift).

```html
<img src="photo.jpg" alt="Description" width="800" height="600">
```

Always use the image's actual dimensions. CSS can override for responsive behavior.

### `loading`

Controls lazy loading behavior.

```html
<img src="large-photo.jpg" alt="Description" loading="lazy">
```

| Value | Behavior |
|-------|----------|
| `eager` | Load immediately (default) |
| `lazy` | Loads when near the viewport |

### `fetchpriority`

Hints at importance for loading priority.

```html
<img src="hero.jpg" alt="Hero image" fetchpriority="high">
```

## Image File Formats

| Format | Use Case | Pros | Cons |
|--------|----------|------|------|
| JPEG/JPG | Photographs | Small file size, millions of colors | No transparency, lossy |
| PNG | Logos, screenshots | Lossless, transparent background | Larger than JPEG |
| GIF | Simple animations | Animation support | Limited to 256 colors |
| SVG | Icons, illustrations | Scalable, small for simple graphics | Not for photos |
| WebP | Modern replacement for JPEG/PNG | Smaller size, transparency, animation | Older browser support |
| AVIF | Next-gen format | Best compression | Limited browser support |

## Full Example

```html
<figure>
  <img
    src="landscape-800.jpg"
    alt="Sunset over a mountain lake with pine trees in the foreground"
    width="800"
    height="533"
    loading="lazy"
  >
  <figcaption>Sunset at Lake Tahoe, July 2026</figcaption>
</figure>
```

## Practice

1. Add 3 images to a page: one with a relative path, one with an absolute URL, and a decorative image
2. Test your page with images blocked in DevTools to verify `alt` text
3. Run a Lighthouse audit and fix any image accessibility issues
4. Convert a JPEG to WebP and compare file sizes
