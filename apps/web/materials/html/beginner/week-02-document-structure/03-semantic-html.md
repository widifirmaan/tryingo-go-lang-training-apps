# Semantic HTML

Semantic HTML elements clearly describe their meaning to both the browser and the developer. They improve accessibility, SEO, and code readability.

## Non-Semantic vs Semantic

| Non-Semantic | Semantic |
|--------------|----------|
| `<div>` | `<header>`, `<nav>`, `<main>`, `<section>` |
| `<span>` | `<strong>`, `<em>`, `<mark>` |
| No meaning | Describes purpose |

## Semantic Elements

### `<header>`

Represents introductory content or navigational aids.

```html
<header>
  <h1>My Website</h1>
  <nav>
    <ul>
      <li><a href="/">Home</a></li>
      <li><a href="/about">About</a></li>
    </ul>
  </nav>
</header>
```

### `<nav>`

Contains navigation links. Not every group of links needs `<nav>` — only major navigation blocks.

```html
<nav>
  <ol>
    <li><a href="/blog">Blog</a></li>
    <li><a href="/projects">Projects</a></li>
    <li><a href="/contact">Contact</a></li>
  </ol>
</nav>
```

### `<main>`

Represents the dominant content of the `<body>`. Use only once per page.

```html
<main>
  <h1>Welcome</h1>
  <p>This is the main content area.</p>
</main>
```

### `<section>`

A thematic grouping of content, typically with a heading.

```html
<section>
  <h2>Our Services</h2>
  <p>We offer web design, development, and consulting.</p>
</section>
```

### `<article>`

A self-contained composition intended for independent distribution or reuse.

```html
<article>
  <h2>How to Learn HTML5</h2>
  <p>Published on July 20, 2026</p>
  <p>HTML5 is the foundation of the modern web...</p>
</article>
```

### `<aside>`

Content indirectly related to the main content — sidebars, pull quotes, or related links.

```html
<aside>
  <h3>Related Articles</h3>
  <ul>
    <li><a href="#">CSS Grid Guide</a></li>
    <li><a href="#">Flexbox Basics</a></li>
  </ul>
</aside>
```

### `<footer>`

Contains footer information: author, copyright, contact info, sitemap links.

```html
<footer>
  <p>&copy; 2026 HTML5 Course. All rights reserved.</p>
  <address>contact@example.com</address>
</footer>
```

### `<figure>` & `<figcaption>`

Self-contained content like images, diagrams, or code snippets with an optional caption.

```html
<figure>
  <img src="diagram.png" alt="HTML document structure diagram">
  <figcaption>Figure 1: Structure of an HTML5 document</figcaption>
</figure>
```

## Complete Semantic Layout

```html
<body>
  <header>
    <nav>...</nav>
  </header>
  <main>
    <section>
      <article>...</article>
      <aside>...</aside>
    </section>
  </main>
  <footer>...</footer>
</body>
```

## Practice

Write a semantic HTML document for a personal blog homepage that includes:
- A `<header>` with a `<nav>`
- A `<main>` with at least two `<article>` elements
- An `<aside>` with related links
- A `<footer>` with copyright information
- A `<figure>` with an image and caption
