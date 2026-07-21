# Backgrounds

CSS provides several properties to style element backgrounds with colors, images, and gradients.

## `background-color`

```css
.bg-primary {
  background-color: #007bff;
}

.bg-light {
  background-color: #f8f9fa;
}

.bg-transparent {
  background-color: transparent;
}
```

## `background-image`

```css
.hero {
  background-image: url('hero.jpg');
}
```

## `background-repeat`

Controls how the background image repeats.

```css
.no-repeat {
  background-repeat: no-repeat;
}

.repeat-x {
  background-repeat: repeat-x; /* horizontal only */
}

.repeat-y {
  background-repeat: repeat-y; /* vertical only */
}
```

## `background-size`

```css
.cover {
  background-size: cover; /* scales to cover entire area */
}

.contain {
  background-size: contain; /* scales to fit entirely */
}

.custom {
  background-size: 200px 100px;
}

.half {
  background-size: 50% 50%;
}
```

## `background-position`

```css
.center {
  background-position: center center;
}

.top-right {
  background-position: top right;
}

.custom {
  background-position: 20% 80%;
}

.pixels {
  background-position: 50px 100px;
}
```

## `background-attachment`

```css
.fixed {
  background-attachment: fixed; /* stays fixed on scroll */
}

.scroll {
  background-attachment: scroll; /* scrolls with content (default) */
}

.local {
  background-attachment: local; /* scrolls with element content */
}
```

## Shorthand `background`

All background properties in one declaration:

```css
.hero {
  background: #333 url('hero.jpg') no-repeat center / cover fixed;
  /* color image repeat position/size attachment */
}
```

Full syntax:

```css
background: bg-color bg-image position/size bg-repeat bg-origin bg-clip bg-attachment initial|inherit;
```

## Gradients

### Linear Gradient

```css
.linear-grad {
  background: linear-gradient(to right, #ff7e5f, #feb47b);
}

.linear-angle {
  background: linear-gradient(45deg, #667eea, #764ba2);
}

.linear-multi {
  background: linear-gradient(to bottom, #ff0000, #ff8800, #ffff00);
}

.linear-stops {
  background: linear-gradient(to right, #00b4db 0%, #0083b0 50%, #005b7f 100%);
}
```

### Radial Gradient

```css
.radial-grad {
  background: radial-gradient(circle, #ff7e5f, #feb47b);
}

.radial-ellipse {
  background: radial-gradient(ellipse at center, #667eea, #764ba2);
}
```

### Conic Gradient

```css
.conic-grad {
  background: conic-gradient(from 0deg, red, yellow, lime, aqua, blue, magenta, red);
}
```

## Multiple Backgrounds

```css
.card {
  background:
    linear-gradient(rgba(0,0,0,0.5), rgba(0,0,0,0.5)),
    url('background.jpg') center / cover no-repeat;
}
```

## Background Examples

### Hero Section

```css
.hero {
  min-height: 100vh;
  background:
    linear-gradient(135deg, rgba(0,0,0,0.7), rgba(0,0,0,0.3)),
    url('hero-bg.jpg') center / cover no-repeat fixed;
  display: flex;
  align-items: center;
  justify-content: center;
}
```

### Gradient Button

```css
.btn-gradient {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  border: none;
  padding: 12px 24px;
  border-radius: 8px;
  cursor: pointer;
  transition: opacity 0.3s;
}

.btn-gradient:hover {
  opacity: 0.9;
}
```

### Card with Gradient Overlay

```css
.card-image {
  width: 300px;
  height: 200px;
  background:
    linear-gradient(to top, rgba(0,0,0,0.8), transparent 60%),
    url('card-image.jpg') center / cover no-repeat;
  border-radius: 12px;
}
```

## Comparison Table

| Property | Description | Example |
|----------|-------------|---------|
| `background-color` | Solid color | `#ff6600` |
| `background-image` | Image or gradient | `url('img.jpg')` |
| `background-repeat` | Tiling behavior | `no-repeat` |
| `background-size` | Image dimensions | `cover`, `contain` |
| `background-position` | Image placement | `center` |
| `background-attachment` | Scroll behavior | `fixed` |
| `background` (shorthand) | All in one | See above |

## Practice

1. Create a hero section with a full-bleed background image using `cover` and `fixed`
2. Add a linear gradient overlay on top of the image using multiple backgrounds
3. Build a gradient button with a hover effect
4. Use a radial gradient as a card background
5. Experiment with the shorthand `background` property
