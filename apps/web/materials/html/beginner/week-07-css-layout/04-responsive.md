# Responsive Design

Responsive design ensures your website works on all screen sizes — from mobile phones to large desktop monitors.

## Media Queries

Media queries apply CSS rules based on conditions like viewport width.

```css
@media (max-width: 768px) {
  .sidebar {
    display: none;
  }
}
```

### Syntax

```css
@media media-type and (condition) {
  /* CSS rules */
}
```

| Media Type | Description |
|------------|-------------|
| `all` | All devices (default) |
| `screen` | Computer screens, tablets, phones |
| `print` | Printers |

### Common Breakpoints

```css
/* Mobile: < 640px */
@media (max-width: 639px) { }

/* Tablet: 640px - 1023px */
@media (min-width: 640px) and (max-width: 1023px) { }

/* Desktop: >= 1024px */
@media (min-width: 1024px) { }
```

### Logical Operators

```css
/* AND */
@media (min-width: 640px) and (max-width: 1023px) { }

/* OR (comma separated) */
@media (max-width: 640px), (min-width: 1200px) { }

/* NOT */
@media not print { }
```

## Mobile-First Approach

Write base styles for mobile first, then add breakpoints for larger screens.

```css
/* Base (mobile) styles */
.container {
  padding: 1rem;
}

.grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: 1rem;
}

/* Tablet */
@media (min-width: 640px) {
  .grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

/* Desktop */
@media (min-width: 1024px) {
  .container {
    padding: 2rem;
    max-width: 1200px;
    margin: 0 auto;
  }

  .grid {
    grid-template-columns: repeat(3, 1fr);
  }
}
```

### Mobile-First vs Desktop-First

```css
/* Mobile-first (recommended) */
.element { font-size: 1rem; }

@media (min-width: 768px) {
  .element { font-size: 1.25rem; }
}

/* Desktop-first */
.element { font-size: 1.25rem; }

@media (max-width: 767px) {
  .element { font-size: 1rem; }
}
```

## Breakpoint Recommendations

| Breakpoint | Label | Target |
|------------|-------|--------|
| `640px` | `sm` | Large phones / small tablets |
| `768px` | `md` | Tablets |
| `1024px` | `lg` | Small desktops / laptops |
| `1280px` | `xl` | Large desktops |
| `1536px` | `2xl` | Extra large screens |

## Relative Units for Responsiveness

| Unit | Relative To | Best For |
|------|-------------|----------|
| `%` | Parent element | Widths, heights |
| `em` | Parent's font-size | Margins, padding (contextual) |
| `rem` | Root font-size (usually 16px) | Typography, spacing |
| `vw` | Viewport width (1vw = 1%) | Full-width elements |
| `vh` | Viewport height (1vh = 1%) | Full-screen sections |
| `clamp(min, preferred, max)` | Fluid value | Responsive font sizes |

### Examples

```css
/* Fluid typography */
h1 {
  font-size: clamp(1.75rem, 4vw, 3rem);
}

/* Responsive width */
.container {
  width: min(90%, 1200px);
  margin: 0 auto;
}

/* Viewport-based */
.hero {
  min-height: 100vh;
  padding: 5vw;
}

/* Responsive spacing */
.card {
  padding: 1.5rem;
}

@media (min-width: 768px) {
  .card {
    padding: 2rem;
  }
}
```

## Responsive Layout Examples

### Responsive Navigation

```css
/* Mobile */
.nav-links {
  display: none; /* hidden on mobile, shown via hamburger */
}

/* Desktop */
@media (min-width: 768px) {
  .nav-links {
    display: flex;
    gap: 1.5rem;
  }
}
```

### Responsive Grid

```css
.gallery {
  display: grid;
  gap: 1rem;
  grid-template-columns: 1fr;              /* mobile */
}

@media (min-width: 640px) {
  .gallery {
    grid-template-columns: repeat(2, 1fr); /* tablet */
  }
}

@media (min-width: 1024px) {
  .gallery {
    grid-template-columns: repeat(4, 1fr); /* desktop */
  }
}
```

### Responsive Images

```css
img {
  max-width: 100%;
  height: auto;
}
```

### Responsive Typography Scale

```css
h1 { font-size: clamp(1.75rem, 5vw, 3rem); }
h2 { font-size: clamp(1.5rem, 4vw, 2.25rem); }
h3 { font-size: clamp(1.25rem, 3vw, 1.75rem); }
p  { font-size: clamp(1rem, 2.5vw, 1.125rem); }
```

## Testing Responsiveness

1. Browser DevTools device emulation (Ctrl+Shift+M)
2. Resize browser window manually
3. Test on real devices
4. Use Chrome Lighthouse for mobile performance audit

## Practice

1. Build a mobile-first page with at least 3 breakpoints
2. Use `clamp()` for fluid typography
3. Create a responsive navigation that switches from hamburger (mobile) to horizontal links (desktop)
4. Use `min()` to create a container that is fluid but capped at a maximum width
5. Test your page at 320px, 768px, and 1440px widths
