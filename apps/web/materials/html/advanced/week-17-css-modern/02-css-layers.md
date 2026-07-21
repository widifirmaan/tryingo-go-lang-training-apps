# CSS Layers (@layer)

## Overview

`@layer` allows you to control the cascade order explicitly, preventing specificity wars and making stylesheets more predictable.

### Basic Layer Declaration

```css
/* Define layers in order (lowest to highest priority) */
@layer reset, base, components, utilities, overrides;

/* Or define with styles */
@layer reset {
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }
}

@layer base {
  body {
    font-family: system-ui, sans-serif;
    line-height: 1.5;
    color: #333;
  }

  h1, h2, h3 {
    line-height: 1.2;
  }
}

@layer components {
  .card {
    border: 1px solid #ddd;
    border-radius: 8px;
    padding: 16px;
    background: #fff;
  }

  .button {
    display: inline-flex;
    align-items: center;
    padding: 8px 16px;
    border-radius: 6px;
    border: none;
    cursor: pointer;
    background: #3498db;
    color: #fff;
  }
}

@layer utilities {
  .text-center { text-align: center; }
  .mt-4 { margin-top: 16px; }
  .hidden { display: none; }
}
```

## Layer Import

```css
/* Import stylesheets into layers */
@import url('reset.css') layer(reset);
@import url('typography.css') layer(base);
@import url('buttons.css') layer(components);
@import url('grid.css') layer(layout);
```

## Nested Layers

```css
@layer components {
  @layer buttons {
    .btn { /* ... */ }
    .btn-primary { /* ... */ }
    .btn-large { /* ... */ }
  }

  @layer cards {
    .card { /* ... */ }
    .card-header { /* ... */ }
  }

  @layer forms {
    .input { /* ... */ }
    .select { /* ... */ }
  }
}

/* Reference nested layers */
@layer components.buttons {
  .btn-danger {
    background: #e74c3c;
  }
}
```

## Layer Order and Cascade

```css
/* Later layers override earlier layers regardless of specificity */

@layer reset {
  button {
    background: none;
    border: none;
    padding: 0;
  }
}

@layer components {
  /* This wins even though specificity is the same */
  button {
    background: #3498db;
    border: 2px solid #2980b9;
    padding: 8px 16px;
  }
}

/* Unlayered styles win over layered styles */
.btn-special {
  background: #2ecc71; /* Wins over all layered button styles */
}

/* Re-arrange layer order */
@layer reset, components, utilities;

/* Add styles to already-defined layers */
@layer utilities {
  .sr-only { /* ... */ }
}
```

## Practical Examples

### Complete Layer Setup

```css
/* 1. Define layer order */
@layer reset, base, layout, components, utilities;

/* 2. Reset layer */
@layer reset {
  *, *::before, *::after {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
  }

  img, picture, video, canvas, svg {
    display: block;
    max-width: 100%;
  }

  input, button, textarea, select {
    font: inherit;
  }

  p, h1, h2, h3, h4, h5, h6 {
    overflow-wrap: break-word;
  }
}

/* 3. Base layer */
@layer base {
  :root {
    --color-primary: #3498db;
    --color-secondary: #2ecc71;
    --color-danger: #e74c3c;
    --color-text: #333;
    --color-bg: #fff;
    --space-xs: 4px;
    --space-sm: 8px;
    --space-md: 16px;
    --space-lg: 24px;
    --space-xl: 48px;
  }

  body {
    font-family: 'Inter', system-ui, sans-serif;
    line-height: 1.6;
    color: var(--color-text);
    background: var(--color-bg);
    padding: var(--space-lg);
  }

  h1 { font-size: 2rem; }
  h2 { font-size: 1.5rem; }
  h3 { font-size: 1.25rem; }

  a {
    color: var(--color-primary);
    text-decoration: none;
  }

  a:hover {
    text-decoration: underline;
  }
}

/* 4. Layout layer */
@layer layout {
  .container {
    max-width: 1200px;
    margin: 0 auto;
    padding: 0 var(--space-md);
  }

  .grid {
    display: grid;
    gap: var(--space-md);
  }

  .grid-2 { grid-template-columns: repeat(2, 1fr); }
  .grid-3 { grid-template-columns: repeat(3, 1fr); }
  .grid-4 { grid-template-columns: repeat(4, 1fr); }

  @media (max-width: 768px) {
    .grid-2, .grid-3, .grid-4 {
      grid-template-columns: 1fr;
    }
  }
}

/* 5. Components layer */
@layer components {
  @layer buttons {
    .btn {
      display: inline-flex;
      align-items: center;
      gap: var(--space-sm);
      padding: var(--space-sm) var(--space-md);
      border: 2px solid transparent;
      border-radius: 6px;
      cursor: pointer;
      font-weight: 500;
      transition: all 0.2s;
      text-decoration: none;
    }

    .btn-primary {
      background: var(--color-primary);
      color: #fff;
    }

    .btn-primary:hover {
      background: #2980b9;
    }

    .btn-secondary {
      background: transparent;
      border-color: var(--color-primary);
      color: var(--color-primary);
    }

    .btn-danger {
      background: var(--color-danger);
      color: #fff;
    }
  }

  @layer cards {
    .card {
      background: #fff;
      border: 1px solid #e0e0e0;
      border-radius: 8px;
      padding: var(--space-md);
      box-shadow: 0 2px 4px rgba(0,0,0,0.05);
    }

    .card-header {
      padding-bottom: var(--space-sm);
      margin-bottom: var(--space-sm);
      border-bottom: 1px solid #eee;
      font-weight: 600;
    }
  }
}

/* 6. Utilities layer */
@layer utilities {
  .text-center { text-align: center; }
  .text-right { text-align: right; }
  .fw-bold { font-weight: 700; }
  .mt-auto { margin-top: auto; }
  .sr-only {
    position: absolute;
    width: 1px;
    height: 1px;
    overflow: hidden;
    clip: rect(0,0,0,0);
    border: 0;
  }
}
```

### Overriding Third-Party CSS

```css
/* Third-party CSS gets lowest priority */
@import url('bootstrap.min.css') layer(bootstrap);

/* Your overrides have higher priority */
@layer bootstrap {
  /* Override Bootstrap's button */
  .btn-primary {
    background: var(--color-primary);
    border-color: var(--color-primary);
  }
}

/* Or restructure layer order */
@layer reset, bootstrap, base, components, overrides;

@layer overrides {
  .btn-primary {
    background: #9b59b6; /* Wins over bootstrap and base layers */
  }
}
```

## Debugging Layers

```css
/* Check layer order in DevTools > Elements > Computed > Cascade layers */
/* Firefox shows layer information in the Rules panel */

/* Temporary debug: add a layer at the end */
@layer debug {
  * {
    outline: 1px solid red;
  }
}
```

## Practice

1. Organize a project's CSS into layers: reset, base, typography, layout, components, utilities. Move all existing styles into appropriate layers.
2. Integrate a CSS framework (like Bootstrap) into a layer and override button, card, and form styles.
3. Create a component library with nested layers for buttons, forms, cards, and navigation.
4. Demonstrate how layers solve specificity issues by showing a before/after example of competing selectors.
