# Positioning

The `position` property controls how an element is placed in the document flow.

```css
.element {
  position: static;    /* default */
  position: relative;
  position: absolute;
  position: fixed;
  position: sticky;
}
```

## `position: static`

Default flow. Element is positioned according to normal document flow. `top`, `right`, `bottom`, `left`, and `z-index` have no effect.

```css
.box {
  position: static; /* default — no positioning needed */
}
```

## `position: relative`

Positioned relative to its normal position in flow. The element still occupies its original space.

```css
.box {
  position: relative;
  top: 10px;    /* moved down 10px from original position */
  left: 20px;   /* moved right 20px from original position */
}
```

### Use Cases

- Fine-tuning element position without affecting layout
- Creating a positioning anchor for absolute children

## `position: absolute`

Removed from normal document flow. Positioned relative to the nearest positioned ancestor (non-static). If none exists, uses the initial containing block (`<html>`).

```css
.container {
  position: relative; /* anchor */
}

.child {
  position: absolute;
  top: 0;
  right: 0; /* places child in top-right corner of container */
}
```

### Examples

```css
/* Badge in top-right corner */
.card {
  position: relative;
}

.badge {
  position: absolute;
  top: -10px;
  right: -10px;
  background: red;
  color: white;
  padding: 4px 8px;
  border-radius: 50%;
}

/* Overlay */
.overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
}

/* Centering with absolute */
.center-absolute {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}
```

## `position: fixed`

Removed from normal flow. Positioned relative to the viewport. Stays in place during scrolling.

```css
.header {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  z-index: 1000;
}

.back-to-top {
  position: fixed;
  bottom: 2rem;
  right: 2rem;
}

.modal-backdrop {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
}
```

### Common Fixed Elements

- Fixed navigation bars
- Back-to-top buttons
- Cookie consent banners
- Floating action buttons
- Modal backdrops

## `position: sticky`

Hybrid of `relative` and `fixed`. Behaves as `relative` until the scroll threshold is met, then becomes `fixed`.

```css
.nav {
  position: sticky;
  top: 0; /* threshold — sticks when scrolled to top of viewport */
  z-index: 100;
}

.section-header {
  position: sticky;
  top: 60px; /* below a fixed header */
  background: white;
}
```

### Requirements for Sticky to Work

1. A `top`, `right`, `bottom`, or `left` value must be set
2. The element must have a defined overflow ancestor (overflow not `hidden`)
3. The element must be inside a container with a defined height

## `z-index`

Controls stacking order of positioned elements. Higher value = closer to viewer.

```css
.modal {
  position: fixed;
  z-index: 1000;
}

.tooltip {
  position: absolute;
  z-index: 500;
}

.overlay {
  position: fixed;
  z-index: 999;
}
```

### Stacking Context

`z-index` only works on positioned elements. A stacking context is created by:

- Root element (`<html>`)
- Positioned elements with `z-index` values
- Elements with `opacity` < 1
- Elements with `transform`, `filter`, `perspective`, etc.

```css
/* Creates a new stacking context */
.context {
  position: relative;
  z-index: 1;
}
```

## Positioning Comparison

| Value | Flow | Offset Reference | Scroll Behavior |
|-------|------|-----------------|-----------------|
| `static` | Normal | N/A | Scrolls |
| `relative` | Normal (offset visually) | Self | Scrolls |
| `absolute` | Removed | Nearest positioned ancestor | Scrolls |
| `fixed` | Removed | Viewport | Fixed |
| `sticky` | Normal then fixed | Scroll container | Sticks at threshold |

## Practice

1. Create a card with a badge positioned in the top-right corner
2. Add a fixed navigation bar that stays at the top on scroll
3. Build a sticky sidebar that stops at the footer
4. Make a modal overlay with centered content using absolute positioning
5. Add a back-to-top button using `position: fixed`
