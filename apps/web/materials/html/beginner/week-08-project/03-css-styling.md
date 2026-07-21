# CSS Styling for the Project

This page guides you through styling your project using CSS custom properties, Flexbox, Grid, typography, and colors.

## CSS Variables (Custom Properties)

Define design tokens at the root level.

```css
:root {
  --color-primary: #2563eb;
  --color-primary-dark: #1d4ed8;
  --color-secondary: #475569;
  --color-accent: #f59e0b;
  --color-bg: #ffffff;
  --color-bg-alt: #f8fafc;
  --color-text: #1e293b;
  --color-text-light: #64748b;
  --color-border: #e2e8f0;

  --font-heading: 'Poppins', 'Segoe UI', sans-serif;
  --font-body: 'Inter', 'Segoe UI', sans-serif;

  --fs-h1: 2.5rem;
  --fs-h2: 1.75rem;
  --fs-h3: 1.25rem;
  --fs-body: 1rem;

  --spacing-xs: 0.25rem;
  --spacing-sm: 0.5rem;
  --spacing-md: 1rem;
  --spacing-lg: 2rem;
  --spacing-xl: 4rem;

  --max-width: 1200px;
  --border-radius: 8px;
  --shadow-sm: 0 1px 3px rgba(0, 0, 0, 0.1);
  --shadow-md: 0 4px 6px rgba(0, 0, 0, 0.1);

  --transition: 0.3s ease;
}
```

## Base Reset

```css
*, *::before, *::after {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

img {
  max-width: 100%;
  height: auto;
  display: block;
}

a {
  color: inherit;
  text-decoration: none;
}

ul, ol {
  list-style: none;
}
```

## Typography

```css
body {
  font-family: var(--font-body);
  font-size: var(--fs-body);
  line-height: 1.7;
  color: var(--color-text);
  background-color: var(--color-bg);
}

h1, h2, h3, h4, h5, h6 {
  font-family: var(--font-heading);
  line-height: 1.2;
  color: var(--color-text);
}

h1 { font-size: var(--fs-h1); margin-bottom: var(--spacing-md); }
h2 { font-size: var(--fs-h2); margin-bottom: var(--spacing-sm); }
h3 { font-size: var(--fs-h3); margin-bottom: var(--spacing-xs); }
```

## Layout

### Navigation

```css
header {
  background: var(--color-bg);
  border-bottom: 1px solid var(--color-border);
  position: sticky;
  top: 0;
  z-index: 100;
}

nav {
  max-width: var(--max-width);
  margin: 0 auto;
  padding: var(--spacing-md) var(--spacing-lg);
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.nav-links {
  display: flex;
  gap: var(--spacing-lg);
}

.nav-links a {
  font-weight: 500;
  transition: color var(--transition);
}

.nav-links a:hover,
.nav-links a.active {
  color: var(--color-primary);
}

.logo {
  display: flex;
  align-items: center;
  gap: var(--spacing-sm);
  font-weight: 700;
  font-size: 1.25rem;
}
```

### Main Content

```css
main {
  max-width: var(--max-width);
  margin: 0 auto;
  padding: var(--spacing-xl) var(--spacing-lg);
}

section {
  margin-bottom: var(--spacing-xl);
}
```

### Hero Section

```css
#hero {
  text-align: center;
  padding: var(--spacing-xl) 0;
}

#hero h1 {
  font-size: clamp(2rem, 5vw, 3.5rem);
  margin-bottom: var(--spacing-md);
}

#hero p {
  font-size: 1.125rem;
  color: var(--color-text-light);
  max-width: 600px;
  margin: 0 auto var(--spacing-lg);
}

.btn {
  display: inline-block;
  padding: 0.75rem 1.5rem;
  background: var(--color-primary);
  color: white;
  border-radius: var(--border-radius);
  font-weight: 600;
  transition: background var(--transition);
}

.btn:hover {
  background: var(--color-primary-dark);
}
```

### Card Grid

```css
.project-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: var(--spacing-lg);
}

.card {
  border: 1px solid var(--color-border);
  border-radius: var(--border-radius);
  overflow: hidden;
  box-shadow: var(--shadow-sm);
  transition: box-shadow var(--transition);
}

.card:hover {
  box-shadow: var(--shadow-md);
}

.card img {
  width: 100%;
  height: 200px;
  object-fit: cover;
}

.card h3 {
  padding: var(--spacing-md) var(--spacing-md) 0;
}

.card p {
  padding: var(--spacing-sm) var(--spacing-md);
  color: var(--color-text-light);
}

.card a {
  display: block;
  padding: var(--spacing-md);
  color: var(--color-primary);
  font-weight: 500;
}
```

### Table

```css
table {
  width: 100%;
  border-collapse: collapse;
  margin: var(--spacing-lg) 0;
}

caption {
  font-weight: 700;
  font-size: 1.125rem;
  margin-bottom: var(--spacing-sm);
  text-align: left;
}

th, td {
  padding: var(--spacing-sm) var(--spacing-md);
  text-align: left;
  border-bottom: 1px solid var(--color-border);
}

th {
  background: var(--color-bg-alt);
  font-weight: 600;
}

tr:hover {
  background: var(--color-bg-alt);
}
```

### Form

```css
form {
  max-width: 600px;
}

fieldset {
  border: 1px solid var(--color-border);
  border-radius: var(--border-radius);
  padding: var(--spacing-lg);
  margin-bottom: var(--spacing-lg);
}

legend {
  font-weight: 600;
  padding: 0 var(--spacing-sm);
}

label {
  display: block;
  margin-bottom: var(--spacing-xs);
  font-weight: 500;
}

input,
select,
textarea {
  width: 100%;
  padding: 0.625rem 0.75rem;
  border: 1px solid var(--color-border);
  border-radius: var(--border-radius);
  font-family: var(--font-body);
  font-size: var(--fs-body);
  margin-bottom: var(--spacing-md);
  transition: border-color var(--transition);
}

input:focus,
select:focus,
textarea:focus {
  outline: none;
  border-color: var(--color-primary);
  box-shadow: 0 0 0 3px rgba(37, 99, 235, 0.1);
}

input[type="checkbox"],
input[type="radio"] {
  width: auto;
  margin-right: var(--spacing-sm);
}

button {
  padding: 0.75rem 1.5rem;
  background: var(--color-primary);
  color: white;
  border: none;
  border-radius: var(--border-radius);
  font-size: var(--fs-body);
  font-weight: 600;
  cursor: pointer;
  transition: background var(--transition);
}

button:hover {
  background: var(--color-primary-dark);
}
```

### Footer

```css
footer {
  background: var(--color-bg-alt);
  border-top: 1px solid var(--color-border);
  padding: var(--spacing-xl) var(--spacing-lg);
  text-align: center;
}

footer nav {
  justify-content: center;
  margin-top: var(--spacing-md);
}

footer nav a {
  color: var(--color-text-light);
  transition: color var(--transition);
}

footer nav a:hover {
  color: var(--color-primary);
}
```

## Responsive Adjustments

```css
@media (max-width: 768px) {
  nav {
    flex-direction: column;
    gap: var(--spacing-md);
  }

  .nav-links {
    flex-wrap: wrap;
    justify-content: center;
  }

  .project-grid {
    grid-template-columns: 1fr;
  }

  #hero h1 {
    font-size: 2rem;
  }
}
```

## Practice

1. Add all CSS from this page to `css/style.css`
2. Customize the colors, fonts, and spacing variables
3. Ensure the layout works on mobile, tablet, and desktop
4. Add at least one hover animation
5. Verify all interactive elements have hover and focus states
