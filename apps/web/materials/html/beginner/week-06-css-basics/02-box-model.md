# The Box Model

Every element in CSS is a rectangular box. The box model describes how the size of an element is calculated.

## Box Model Components

```
┌─────────────────────────────────────┐
│              Margin                 │
│  ┌───────────────────────────────┐  │
│  │           Border              │  │
│  │  ┌─────────────────────────┐  │  │
│  │  │        Padding          │  │  │
│  │  │  ┌───────────────────┐  │  │  │
│  │  │  │     Content       │  │  │  │
│  │  │  │                   │  │  │  │
│  │  │  └───────────────────┘  │  │  │
│  │  └─────────────────────────┘  │  │
│  └───────────────────────────────┘  │
└─────────────────────────────────────┘
```

| Layer | Description |
|-------|-------------|
| Content | The actual content (text, image, etc.) |
| Padding | Space between content and border |
| Border | Line around the padding |
| Margin | Space outside the border (invisible) |

## CSS Box Model Properties

```css
.box {
  /* Content */
  width: 300px;
  height: 200px;

  /* Padding */
  padding-top: 10px;
  padding-right: 15px;
  padding-bottom: 10px;
  padding-left: 15px;

  /* Shorthand: top right bottom left */
  padding: 10px 15px 10px 15px;
  /* Two values: top/bottom left/right */
  padding: 10px 15px;
  /* One value: all sides */
  padding: 10px;

  /* Border */
  border-width: 2px;
  border-style: solid;
  border-color: #333;
  /* Shorthand */
  border: 2px solid #333;

  /* Individual sides */
  border-top: 1px dashed red;
  border-bottom: 2px dotted blue;

  /* Border radius */
  border-radius: 8px;
  border-radius: 50%; /* circle */

  /* Margin */
  margin-top: 20px;
  margin-right: auto;
  margin-bottom: 20px;
  margin-left: auto;
  /* Shorthand */
  margin: 20px auto;
}
```

### Margin Collapsing

Vertical margins collapse — the larger margin wins.

```html
<div style="margin-bottom: 30px;">Box A</div>
<div style="margin-top: 20px;">Box B</div>
<!-- Gap between them is 30px, not 50px -->
```

## `box-sizing`

Controls whether `width`/`height` includes padding and border.

```css
/* Default — width excludes padding and border */
.box {
  box-sizing: content-box;
  width: 300px;
  padding: 20px;
  border: 5px solid black;
  /* Total width: 300 + 40 + 10 = 350px */
}

/* Width includes padding and border */
.box {
  box-sizing: border-box;
  width: 300px;
  padding: 20px;
  border: 5px solid black;
  /* Total width: 300px (content shrinks to 250px) */
}
```

### Best Practice — Universal `border-box`

```css
*, *::before, *::after {
  box-sizing: border-box;
}
```

## Box Model in Action

```css
.card {
  width: 300px;
  padding: 1.5rem;
  border: 2px solid #e0e0e0;
  border-radius: 12px;
  margin: 1rem auto;
  background: white;
}
```

```css
.button {
  display: inline-block;
  padding: 0.75rem 1.5rem;
  border: none;
  border-radius: 6px;
  margin: 0.5rem;
  background: #007bff;
  color: white;
  font-size: 1rem;
  cursor: pointer;
}
```

## Using DevTools

In browser DevTools (F12), the Elements > Computed panel shows the box model visually.
- Hover over an element to see its box model overlay
- Green = content, blue = padding, yellow = border, orange = margin

## Practice

1. Create a card component with padding, border, and margin
2. Set `box-sizing: border-box` on an element and compare its rendered width with `content-box`
3. Experiment with margin collapsing between two adjacent elements
4. Use DevTools to inspect the box model of elements on any website
