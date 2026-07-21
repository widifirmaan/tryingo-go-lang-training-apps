# Colors & Typography

## Color Formats

### Named Colors

There are 148 named colors in CSS.

```css
color: red;
color: blue;
color: tomato;
color: rebeccapurple;
background-color: whitesmoke;
```

### Hex (#RRGGBB)

```css
color: #ff0000;   /* red */
color: #00ff00;   /* green */
color: #0000ff;   /* blue */
color: #333;      /* shorthand for #333333 */
color: #fff;      /* shorthand for #ffffff */
```

### Hex with Alpha (#RRGGBBAA)

```css
color: #ff000080; /* red at 50% opacity */
```

### RGB / RGBA

```css
color: rgb(255, 0, 0);          /* red */
color: rgba(255, 0, 0, 0.5);    /* red at 50% opacity */
background: rgba(0, 0, 0, 0.1); /* black at 10% opacity */
```

### HSL / HSLA

Hue (0-360), Saturation (0-100%), Lightness (0-100%).

```css
color: hsl(0, 100%, 50%);        /* red */
color: hsla(240, 100%, 50%, 0.3); /* blue at 30% opacity */
background: hsl(200, 80%, 90%);   /* light blue */
```

| Format | Example | Use Case |
|--------|---------|----------|
| Named | `red` | Quick prototyping |
| Hex | `#ff6600` | Most common, precise |
| RGBA | `rgba(0,0,0,0.5)` | When opacity is needed |
| HSL | `hsl(200, 80%, 50%)` | Intuitive color adjustment |

### `opacity` Property

Affects the entire element (including children).

```css
.faded {
  opacity: 0.5; /* 0 = invisible, 1 = fully visible */
}
```

## Typography Properties

### `font-family`

```css
body {
  font-family: 'Georgia', 'Times New Roman', serif;
}

body {
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
}
```

### `font-size`

```css
h1 { font-size: 2.5rem; }
p  { font-size: 1rem; }
small { font-size: 0.875rem; }
```

### `font-weight`

```css
.bold { font-weight: 700; }
.light { font-weight: 300; }
.normal { font-weight: 400; }
```

| Value | Name |
|-------|------|
| 100 | Thin |
| 300 | Light |
| 400 | Normal |
| 500 | Medium |
| 700 | Bold |
| 900 | Black |

### `font-style`

```css
em, .italic { font-style: italic; }
```

### `line-height`

```css
p {
  line-height: 1.6; /* unitless — relative to font-size */
}
```

### `text-align`

```css
.left { text-align: left; }
.center { text-align: center; }
.right { text-align: right; }
.justify { text-align: justify; }
```

### `text-decoration`

```css
.underline { text-decoration: underline; }
.line-through { text-decoration: line-through; }
a { text-decoration: none; }
a:hover { text-decoration: underline; }
```

### `text-transform`

```css
.upper { text-transform: uppercase; }
.lower { text-transform: lowercase; }
.capitalize { text-transform: capitalize; }
```

### `letter-spacing`

```css
.spaced {
  letter-spacing: 0.05em;
}
```

### Shorthand `font`

```css
p {
  font: italic 700 1.2rem/1.6 'Georgia', serif;
  /* style weight size/line-height family */
}
```

## Complete Typography Example

```css
body {
  font-family: 'Inter', -apple-system, sans-serif;
  font-size: 16px;
  line-height: 1.7;
  color: #333;
}

h1, h2, h3 {
  font-family: 'Merriweather', Georgia, serif;
  line-height: 1.2;
  color: #1a1a1a;
}

h1 { font-size: 2.5rem; font-weight: 900; }
h2 { font-size: 2rem; font-weight: 700; }
h3 { font-size: 1.5rem; font-weight: 600; }

p {
  margin-bottom: 1rem;
}

small, .text-muted {
  color: #666;
  font-size: 0.875rem;
}

a {
  color: #0066cc;
  text-decoration: underline;
}

a:hover {
  color: #004499;
}
```

## Practice

1. Style a page with at least 3 different color formats (hex, rgb, hsl)
2. Apply typography properties to headings and paragraphs
3. Use `opacity` on an element and compare with `rgba()` on background
4. Create a typography scale using `rem` units for h1-h6
5. Add a hover effect with `text-decoration`
