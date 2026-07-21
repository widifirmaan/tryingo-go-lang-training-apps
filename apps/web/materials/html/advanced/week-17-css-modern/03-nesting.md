# CSS Nesting

## Overview

Native CSS nesting allows you to write nested selectors within parent rules, similar to preprocessors like Sass.

### Basic Nesting

```css
/* Traditional CSS */
.card { border: 1px solid #ddd; }
.card .title { font-size: 1.2em; }
.card .body { padding: 16px; }
.card .body p { color: #666; }

/* With nesting */
.card {
  border: 1px solid #ddd;

  .title {
    font-size: 1.2em;
  }

  .body {
    padding: 16px;

    p {
      color: #666;
    }
  }
}
```

## The Nesting Selector `&`

```css
.button {
  background: #3498db;
  color: #fff;

  /* & refers to the parent selector */
  &:hover {
    background: #2980b9;
  }

  &:focus-visible {
    outline: 3px solid rgba(52, 152, 219, 0.5);
  }

  & .icon {
    margin-right: 8px;
  }
}

/* & can be used anywhere in the selector */
.card {
  /* Parent selector at the end */
  .dark-mode & {
    background: #2c3e50;
    color: #ecf0f1;
  }

  /* Adjacent sibling */
  & + & {
    margin-top: 16px;
  }

  /* Multiple levels */
  .wrapper & .content {
    padding: 24px;
  }
}
```

## Compound Selectors

```css
.button {
  /* Multiple classes on same element */
  &.primary {
    background: #3498db;
  }

  &.large {
    padding: 16px 32px;
    font-size: 1.2em;
  }

  &.icon-only {
    padding: 8px;
    border-radius: 50%;
  }
}
```

## Pseudo-Classes and Pseudo-Elements

```css
.input {
  border: 2px solid #ddd;

  &:focus {
    border-color: #3498db;
    outline: none;
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }

  &:user-invalid {
    border-color: #e74c3c;
  }

  &::placeholder {
    color: #999;
  }

  &::selection {
    background: #3498db;
    color: #fff;
  }
}
```

## Media Queries in Nesting

```css
.card {
  display: grid;
  grid-template-columns: 1fr;
  gap: 16px;

  /* Media query within nesting */
  @media (min-width: 768px) {
    grid-template-columns: 2fr 1fr;
  }

  @media (min-width: 1024px) {
    grid-template-columns: 3fr 1fr;
  }

  /* Container queries also work */
  @container (min-width: 400px) {
    flex-direction: row;
  }
}
```

## Complex Nesting Patterns

### BEM-like Structure

```css
.block {
  /* Block element */
  padding: 16px;

  &__title {
    font-size: 1.2em;
    font-weight: bold;
  }

  &__description {
    color: #666;
  }

  &__action {
    margin-top: 12px;
  }

  /* Block modifiers */
  &--highlighted {
    background: #fff3cd;
    border-color: #ffc107;
  }

  &--featured {
    border: 2px solid #3498db;
  }
}
```

### Component Patterns

```css
.tabs {
  display: flex;
  gap: 4px;

  .tab {
    padding: 8px 16px;
    cursor: pointer;
    border-bottom: 2px solid transparent;

    &:hover {
      border-bottom-color: #ddd;
    }

    &[aria-selected="true"] {
      border-bottom-color: #3498db;
      font-weight: 600;
    }
  }

  .tab-panel {
    display: none;
    padding: 16px;

    &[aria-hidden="false"] {
      display: block;
    }
  }
}
```

## @ Rules in Nesting

```css
.element {
  @layer components {
    /* Nested layer declaration */
  }

  @scope (.container) {
    /* Scoped styles */
  }

  @starting-style {
    /* Entry animation styles */
  }
}
```

## Complete Example

```css
.nav {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 16px 24px;
  background: #fff;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);

  & .logo {
    font-size: 1.5em;
    font-weight: bold;
    color: #2c3e50;
    text-decoration: none;
  }

  & .nav-links {
    display: flex;
    gap: 24px;
    list-style: none;
    margin: 0;

    & a {
      color: #555;
      text-decoration: none;
      position: relative;

      &:hover {
        color: #3498db;
      }

      &[aria-current="page"] {
        color: #3498db;
        font-weight: 600;

        &::after {
          content: '';
          position: absolute;
          bottom: -4px;
          left: 0;
          right: 0;
          height: 2px;
          background: #3498db;
        }
      }
    }
  }

  & .nav-toggle {
    display: none;
    background: none;
    border: none;
    cursor: pointer;
    padding: 8px;
  }

  @media (max-width: 768px) {
    & .nav-links {
      display: none;

      &.open {
        display: flex;
        flex-direction: column;
        position: absolute;
        top: 100%;
        left: 0;
        right: 0;
        background: #fff;
        padding: 16px;
        box-shadow: 0 4px 8px rgba(0,0,0,0.1);
      }
    }

    & .nav-toggle {
      display: block;
    }
  }
}
```

## Limitations

```css
/* What DOESN'T work in CSS nesting: */
.element {
  /* ❌ Can't nest element selectors without & */
  p { } /* Must be & p or .element p */

  /* ✅ These work: */
  & p { } /* OK with & */
  .child { } /* OK for class */
  [data-value] { } /* OK for attribute */
  :hover { } /* OK for pseudo-class */
  ::before { } /* OK for pseudo-element */
}
```

## Practice

1. Convert a Sass/SCSS file to native CSS nesting.
2. Build a complete navigation component using CSS nesting with hover states, active states, and responsive breakpoints.
3. Create a card component with nested media queries and pseudo-classes.
4. Write a form stylesheet using CSS nesting for all form elements, validation states, and responsive layout.
