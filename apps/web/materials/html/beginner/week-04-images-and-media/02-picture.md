# The `<picture>` Element & Responsive Images

The `<picture>` element allows you to serve different image versions based on screen size, resolution, or format support.

## Basic Syntax

```html
<picture>
  <source media="(min-width: 1024px)" srcset="large.jpg">
  <source media="(min-width: 768px)" srcset="medium.jpg">
  <source media="(min-width: 480px)" srcset="small.jpg">
  <img src="fallback.jpg" alt="Description">
</picture>
```

Always include a fallback `<img>` as the last child.

## `srcset` Attribute

The `srcset` attribute on `<img>` lets the browser choose the best image from a set.

```html
<img
  src="small.jpg"
  srcset="small.jpg 480w, medium.jpg 768w, large.jpg 1200w"
  sizes="(max-width: 480px) 100vw, (max-width: 768px) 50vw, 33vw"
  alt="Description"
>
```

| Descriptor | Purpose | Example |
|------------|---------|---------|
| `w` | Width descriptor | `800w` means image is 800px wide |
| `x` | Pixel density descriptor | `2x` for Retina displays |

### Width Descriptor Example

```html
<img
  src="photo-800.jpg"
  srcset="photo-400.jpg 400w, photo-800.jpg 800w, photo-1200.jpg 1200w"
  sizes="(max-width: 600px) 100vw, 50vw"
  alt="Photo"
>
```

### Pixel Density Example

```html
<img
  src="icon.png"
  srcset="icon.png 1x, icon@2x.png 2x, icon@3x.png 3x"
  alt="Icon"
>
```

## The `<source>` Element

Each `<source>` can use:

| Attribute | Purpose |
|-----------|---------|
| `media` | Media query condition |
| `srcset` | One or more image URLs |
| `type` | MIME type for format selection |

### Format Selection

Serve modern formats with fallbacks.

```html
<picture>
  <source type="image/avif" srcset="photo.avif">
  <source type="image/webp" srcset="photo.webp">
  <img src="photo.jpg" alt="Photo">
</picture>
```

## Art Direction

Use `<picture>` to crop images differently at different screen sizes.

```html
<picture>
  <source media="(min-width: 768px)" srcset="landscape-crop.jpg">
  <source media="(max-width: 767px)" srcset="portrait-crop.jpg">
  <img src="landscape-crop.jpg" alt="Person standing on a mountain peak">
</picture>
```

## Complete Example

```html
<picture>
  <source type="image/avif" media="(min-width: 1024px)" srcset="hero-1200.avif">
  <source type="image/webp" media="(min-width: 1024px)" srcset="hero-1200.webp">
  <source type="image/avif" media="(min-width: 640px)" srcset="hero-800.avif">
  <source type="image/webp" media="(min-width: 640px)" srcset="hero-800.webp">
  <source type="image/avif" srcset="hero-400.avif">
  <source type="image/webp" srcset="hero-400.webp">
  <img
    src="hero-800.jpg"
    srcset="hero-400.jpg 400w, hero-800.jpg 800w, hero-1200.jpg 1200w"
    sizes="100vw"
    alt="Hero banner"
    width="1200"
    height="600"
    fetchpriority="high"
  >
</picture>
```

## Practice

1. Create a `<picture>` element with 3 breakpoints serving different crops
2. Add WebP and AVIF format support with JPEG fallback
3. Use `srcset` with width descriptors on a standard `<img>`
4. Test in Chrome DevTools device emulation to see which images load
