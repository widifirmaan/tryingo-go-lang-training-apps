# Flexbox

Flexbox is a one-dimensional layout system for distributing space and aligning items within a container.

```css
.container {
  display: flex;
}
```

## Flex Container Properties

### `flex-direction`

Defines the main axis direction.

```css
.container {
  display: flex;
  flex-direction: row;           /* default — left to right */
  flex-direction: row-reverse;   /* right to left */
  flex-direction: column;        /* top to bottom */
  flex-direction: column-reverse; /* bottom to top */
}
```

| Value | Main Axis | Cross Axis |
|-------|-----------|------------|
| `row` | Horizontal (→) | Vertical (↓) |
| `column` | Vertical (↓) | Horizontal (→) |
| `row-reverse` | Horizontal (←) | Vertical (↓) |
| `column-reverse` | Vertical (↑) | Horizontal (→) |

### `flex-wrap`

Controls whether items wrap to the next line.

```css
.container {
  flex-wrap: nowrap;   /* default — all on one line */
  flex-wrap: wrap;     /* wrap to next line */
  flex-wrap: wrap-reverse; /* wrap to previous line */
}
```

### `justify-content`

Aligns items along the main axis.

```css
.container {
  justify-content: flex-start;    /* default */
  justify-content: flex-end;
  justify-content: center;
  justify-content: space-between;
  justify-content: space-around;
  justify-content: space-evenly;
}
```

| Value | Effect |
|-------|--------|
| `flex-start` | Items at start |
| `center` | Items centered |
| `space-between` | Equal space between items |
| `space-around` | Equal space around items |
| `space-evenly` | Equal space everywhere |

### `align-items`

Aligns items along the cross axis.

```css
.container {
  align-items: stretch;    /* default — fill container */
  align-items: flex-start;
  align-items: flex-end;
  align-items: center;
  align-items: baseline;
}
```

### `align-content`

Aligns wrapped lines (multi-line only).

```css
.container {
  align-content: flex-start;
  align-content: center;
  align-content: space-between;
}
```

### Shorthand: `flex-flow`

```css
.container {
  flex-flow: row wrap; /* flex-direction + flex-wrap */
}
```

## Flex Item Properties

### `flex-grow`

Controls how much an item can grow relative to siblings.

```css
.item {
  flex-grow: 1; /* all items grow equally */
}

.sidebar {
  flex-grow: 0; /* does not grow */
}

.main {
  flex-grow: 2; /* grows twice as much as items with flex-grow: 1 */
}
```

### `flex-shrink`

Controls how much an item can shrink.

```css
.item {
  flex-shrink: 1; /* default — can shrink */
  flex-shrink: 0; /* cannot shrink below min-content */
}
```

### `flex-basis`

Initial size before growing or shrinking.

```css
.item {
  flex-basis: 200px; /* starting size */
  flex-basis: 50%;
  flex-basis: auto;  /* default — based on content */
}
```

### Shorthand: `flex`

```css
.item {
  flex: 1;               /* flex-grow: 1, flex-shrink: 1, flex-basis: 0 */
  flex: 1 0 200px;       /* grow, shrink, basis */
  flex: 0 0 auto;        /* no grow, no shrink, auto basis */
}
```

### `align-self`

Overrides `align-items` for a single item.

```css
.item {
  align-self: center;
  align-self: flex-end;
  align-self: stretch;
}
```

### `order`

Changes the visual order of items.

```css
.item:first-child {
  order: 2;
}

.item:last-child {
  order: 1;
}
```

## Common Layout Patterns

### Navigation Bar

```css
.nav {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1rem 2rem;
  background: #333;
  color: white;
}

.nav-links {
  display: flex;
  gap: 1.5rem;
  list-style: none;
}
```

### Centering

```css
.center {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
}
```

### Card Row

```css
.card-row {
  display: flex;
  gap: 1.5rem;
  flex-wrap: wrap;
}

.card-row > * {
  flex: 1 1 250px; /* grow, shrink, minimum width */
}
```

### Holy Grail Layout

```css
.layout {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}

.layout main {
  display: flex;
  flex: 1;
}

.layout main > nav,
.layout main > aside {
  flex: 0 0 200px;
}

.layout main > article {
  flex: 1;
}
```

## Practice

1. Create a horizontal navigation bar using Flexbox
2. Build a card layout where cards wrap responsively
3. Center a div both horizontally and vertically using Flexbox
4. Create a three-column layout with a flexible middle column
5. Use `order` to reorder items visually
