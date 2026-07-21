# Container Queries

## Overview

Container queries allow you to style elements based on their container's size, not the viewport.

### Container Query Basics

```css
/* Define a containment context */
.card-container {
  container-type: inline-size;
  container-name: card;
}

/* Or shorthand */
.card-wrapper {
  container: card / inline-size;
}

/* Query the container */
@container card (min-width: 400px) {
  .card {
    display: flex;
    flex-direction: row;
  }

  .card-image {
    width: 200px;
  }
}

@container card (max-width: 399px) {
  .card {
    display: flex;
    flex-direction: column;
  }

  .card-image {
    width: 100%;
  }
}
```

### Style Queries

```css
/* Query based on container style (future feature) */
@container card style(--theme: dark) {
  .card {
    background: #2c3e50;
    color: #ecf0f1;
  }
}
```

## Practical Examples

### Responsive Card Component

```html
<div class="grid">
  <div class="card-container">
    <div class="card">
      <img class="card-image" src="photo.jpg" alt="Photo">
      <div class="card-body">
        <h2>Card Title</h2>
        <p>Card description text that adapts based on container width.</p>
        <button>Read More</button>
      </div>
    </div>
  </div>

  <div class="card-container">
    <div class="card">
      <img class="card-image" src="photo2.jpg" alt="Photo">
      <div class="card-body">
        <h2>Another Card</h2>
        <p>This card will also respond to its container size.</p>
        <button>Read More</button>
      </div>
    </div>
  </div>
</div>
```

```css
.grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 16px;
}

.card-container {
  container-type: inline-size;
}

.card {
  border: 1px solid #ddd;
  border-radius: 12px;
  overflow: hidden;
  background: #fff;
}

.card-image {
  width: 100%;
  height: 200px;
  object-fit: cover;
}

.card-body {
  padding: 16px;
}

.card-body h2 {
  margin: 0 0 8px;
}

.card-body p {
  color: #666;
  line-height: 1.5;
  margin: 0 0 16px;
}

/* Wide container: horizontal layout */
@container (min-width: 400px) {
  .card {
    display: flex;
    flex-direction: row;
  }

  .card-image {
    width: 200px;
    height: auto;
    flex-shrink: 0;
  }

  .card-body {
    flex: 1;
  }
}

/* Narrow container: compact style */
@container (max-width: 300px) {
  .card {
    border-radius: 0;
  }

  .card-body {
    padding: 12px;
  }

  .card-body h2 {
    font-size: 1em;
  }

  .card-body p {
    font-size: 0.875em;
  }

  .card-body button {
    width: 100%;
  }
}
```

### Dashboard Widgets

```html
<div class="dashboard">
  <div class="widget-container widget-full">
    <div class="widget">
      <h3>Full Width Widget</h3>
      <div class="widget-content">
        <canvas id="chart1"></canvas>
      </div>
    </div>
  </div>

  <div class="widget-container widget-half">
    <div class="widget">
      <h3>Half Width</h3>
      <div class="widget-content">Content...</div>
    </div>
  </div>

  <div class="widget-container widget-half">
    <div class="widget">
      <h3>Half Width</h3>
      <div class="widget-content">Content...</div>
    </div>
  </div>

  <div class="widget-container widget-third">
    <div class="widget">
      <h3>Compact</h3>
      <div class="widget-content">Compact view...</div>
    </div>
  </div>
</div>
```

```css
.dashboard {
  display: grid;
  grid-template-columns: repeat(6, 1fr);
  gap: 16px;
}

.widget-container {
  container-type: inline-size;
  container-name: widget;
}

.widget-full { grid-column: span 6; }
.widget-half { grid-column: span 3; }
.widget-third { grid-column: span 2; }

.widget {
  background: #fff;
  border: 1px solid #e0e0e0;
  border-radius: 8px;
  padding: 16px;
}

.widget h3 {
  margin: 0 0 12px;
  font-size: 1em;
  color: #666;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

@container widget (max-width: 300px) {
  .widget h3 {
    font-size: 0.875em;
  }

  .widget-content {
    font-size: 0.875em;
  }
}

@container widget (min-width: 500px) {
  .widget-content {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 12px;
  }
}
```

### Navigation with Container Queries

```css
.nav-container {
  container-type: inline-size;
  container-name: nav;
}

.nav {
  display: flex;
  gap: 8px;
  align-items: center;
}

.nav-links {
  display: flex;
  gap: 16px;
  list-style: none;
  margin: 0;
  padding: 0;
}

.nav-toggle {
  display: none;
}

@container nav (max-width: 600px) {
  .nav-links {
    display: none;
  }

  .nav-toggle {
    display: block;
  }
}
```

## Practice

1. Create a product card that switches between grid and list layout based on its container width.
2. Build a responsive dashboard with 3 widget sizes (full, half, third) that show different content at each size.
3. Create an adaptive form that changes from single-column to multi-column based on container width.
4. Build a navigation component that switches between horizontal links and a hamburger menu based on container size.
