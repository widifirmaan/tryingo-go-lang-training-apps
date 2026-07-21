# CSS Grid

CSS Grid is a two-dimensional layout system that can handle both columns and rows simultaneously.

```css
.container {
  display: grid;
}
```

## Grid Container Properties

### `grid-template-columns` and `grid-template-rows`

Define the size and number of tracks.

```css
.container {
  display: grid;
  grid-template-columns: 200px 1fr 200px; /* 3 columns */
  grid-template-rows: auto 1fr auto;       /* 3 rows */
}
```

| Unit | Description |
|------|-------------|
| `px` | Fixed size |
| `fr` | Fraction of available space |
| `%` | Percentage of container |
| `auto` | Content-based size |
| `minmax(min, max)` | Flexible range |
| `repeat(n, size)` | Repeat notation |

```css
/* Repeat notation */
.container {
  grid-template-columns: repeat(3, 1fr); /* 3 equal columns */
}

/* minmax */
.container {
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
}

/* Named grid lines */
.container {
  grid-template-columns: [start] 1fr [middle] 2fr [end];
}
```

### `gap`

Space between grid cells.

```css
.container {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1rem;        /* shorthand row-gap column-gap */
  row-gap: 1rem;
  column-gap: 2rem;
}
```

### `grid-template-areas`

Named layout areas for intuitive placement.

```css
.container {
  display: grid;
  grid-template-columns: 200px 1fr 200px;
  grid-template-rows: auto 1fr auto;
  grid-template-areas:
    "header  header  header"
    "sidebar content aside"
    "footer  footer  footer";
  gap: 1rem;
}

header { grid-area: header; }
nav    { grid-area: sidebar; }
main   { grid-area: content; }
aside  { grid-area: aside; }
footer { grid-area: footer; }
```

### `justify-items` and `align-items`

Align items within their grid cells.

```css
.container {
  justify-items: stretch; /* horizontal alignment */
  align-items: stretch;   /* vertical alignment */
  place-items: center;    /* shorthand for both */
}
```

### `justify-content` and `align-content`

Align the entire grid within the container.

```css
.container {
  justify-content: center;
  align-content: center;
  place-content: center; /* shorthand */
}
```

## Grid Item Properties

### `grid-column` and `grid-row`

Control item placement and spanning.

```css
.item {
  grid-column: 1 / 3;     /* span from column line 1 to 3 */
  grid-column: 1 / -1;    /* span full width */
  grid-column: span 2;    /* span 2 columns */
  grid-row: 1 / 3;
}
```

### `grid-area` (items)

Shorthand for placement.

```css
.item {
  grid-area: 1 / 1 / 3 / 3;
  /* grid-row-start / grid-column-start / grid-row-end / grid-column-end */
}
```

### `justify-self` and `align-self`

Override alignment for a single item.

```css
.item {
  justify-self: center;
  align-self: end;
}
```

## Auto-Fit vs Auto-Fill

```css
/* Creates as many tracks as fit, collapsing empty ones */
.container {
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
}

/* Creates as many tracks as fit, keeping empty ones */
.container {
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
}
```

## Common Layout Patterns

### Card Grid

```css
.card-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 1.5rem;
  padding: 2rem;
}
```

### Full Page Layout

```css
.page {
  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: auto 1fr auto;
  min-height: 100vh;
}
```

### Sidebar + Content

```css
.with-sidebar {
  display: grid;
  grid-template-columns: 250px 1fr;
  grid-template-rows: auto 1fr auto;
  grid-template-areas:
    "header header"
    "sidebar main"
    "footer footer";
  min-height: 100vh;
  gap: 0;
}
```

### Asymmetrical Grid

```css
.featured-grid {
  display: grid;
  grid-template-columns: 2fr 1fr;
  gap: 1rem;
}

.featured-grid .featured {
  grid-column: 1 / -1; /* full width */
}
```

## Flexbox vs Grid

| Aspect | Flexbox | Grid |
|--------|---------|------|
| Dimension | One-dimensional (row or column) | Two-dimensional (rows and columns) |
| Best for | Navigation, centering, small components | Page layouts, galleries, complex alignments |
| Item sizing | Based on content (`flex-basis`) | Based on tracks (`grid-template`) |
| Overlap | Not designed for it | Items can overlap easily |

## Practice

1. Create a gallery grid with `auto-fit` and `minmax(250px, 1fr)`
2. Build a full page layout with header, sidebar, main, and footer using `grid-template-areas`
3. Make a card that spans 2 columns
4. Create an asymmetrical grid with `span` values
5. Replace a Flexbox card row with an equivalent Grid layout
