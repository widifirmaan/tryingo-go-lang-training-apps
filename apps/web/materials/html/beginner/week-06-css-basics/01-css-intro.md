# CSS Introduction

CSS (Cascading Style Sheets) is the language used to style HTML documents.

## CSS Syntax

```css
selector {
  property: value;
}
```

```css
h1 {
  color: blue;
  font-size: 2rem;
}
```

## Three Ways to Include CSS

### 1. Inline (on the element)

```html
<p style="color: red; font-weight: bold;">This is red and bold.</p>
```

Avoid inline CSS — it mixes content with presentation and has the highest specificity.

### 2. Internal (in `<head>`)

```html
<head>
  <style>
    p {
      color: green;
    }
  </style>
</head>
```

Useful for single-page prototypes but not for multi-page sites.

### 3. External (separate file)

```html
<head>
  <link rel="stylesheet" href="styles.css">
</head>
```

```css
/* styles.css */
p {
  color: green;
}
```

Best practice — separation of concerns, caching, and reusability.

## Selectors

### Element Selector

```css
h2 {
  font-family: Arial, sans-serif;
}

p {
  line-height: 1.6;
}
```

### Class Selector

```css
.highlight {
  background-color: yellow;
}
```

```html
<p class="highlight">This text has a yellow background.</p>
```

### ID Selector

```css
#main-title {
  font-size: 2.5rem;
  color: #333;
}
```

```html
<h1 id="main-title">Page Title</h1>
```

Use IDs for unique elements only. Prefer classes for styling.

### Attribute Selector

```css
/* Exact match */
[type="text"] {
  border: 1px solid #ccc;
}

/* Contains */
a[href*="example.com"] {
  color: red;
}

/* Starts with */
[class^="btn-"] {
  font-weight: bold;
}

/* Ends with */
[href$=".pdf"]::after {
  content: " (PDF)";
}
```

### Grouping Selectors

```css
h1, h2, h3 {
  font-family: 'Georgia', serif;
}
```

### Descendant Selector

```css
article p {
  color: #555;
}
```

### Child Selector (direct child only)

```css
ul > li {
  list-style: none;
}
```

### Pseudo-classes

```css
a:hover {
  color: orange;
}

input:focus {
  border-color: blue;
}

li:first-child {
  font-weight: bold;
}

li:nth-child(odd) {
  background: #f5f5f5;
}
```

### Pseudo-elements

```css
p::first-line {
  font-weight: bold;
}

h2::before {
  content: "→ ";
}

h2::after {
  content: " ←";
}
```

## The Cascade

CSS stands for Cascading Style Sheets. When multiple rules apply, the cascade determines which wins.

### Cascade Order (simplified)

1. Importance (`!important`)
2. Specificity
3. Source order (last rule wins)

### Specificity Calculation

| Selector | Specificity |
|----------|-------------|
| `*` (universal) | 0,0,0,0 |
| Element / pseudo-element | 0,0,0,1 |
| Class / attribute / pseudo-class | 0,0,1,0 |
| ID | 0,1,0,0 |
| Inline style | 1,0,0,0 |
| `!important` | Breaks cascade |

```css
/* Specificity: 0,0,0,1 */
p { color: black; }

/* Specificity: 0,0,1,0 — wins over element */
.text { color: blue; }

/* Specificity: 0,1,0,0 — wins over class */
#special { color: green; }

/* Inline style — wins over ID */
```

```html
<p id="special" class="text" style="color: red;">What color am I?</p>
<!-- Red — inline wins -->
```

### Using `!important` (avoid when possible)

```css
p {
  color: red !important;
}
```

## Specificity Examples

```css
/* 0,0,1,1 */
div .highlight { color: blue; }

/* 0,1,0,1 */
div #header { color: red; }

/* 0,0,2,1 */
nav ul li { color: green; }

/* 0,1,1,0 */
#sidebar .widget { color: purple; }
```

## Practice

1. Create an HTML page with elements using classes and IDs
2. Write CSS using element, class, ID, and attribute selectors
3. Experiment with specificity — predict which styles will win
4. Use browser DevTools to inspect the computed styles and cascade
