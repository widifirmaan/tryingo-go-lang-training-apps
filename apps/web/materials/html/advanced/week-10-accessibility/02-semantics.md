# Semantic HTML

## Why Semantic HTML?

Semantic HTML elements provide meaning and structure. They improve:
- **Accessibility** — Screen readers understand page structure
- **SEO** — Search engines rank content better
- **Maintainability** — Code is self-documenting

## Semantic Elements Overview

### Document Structure

```html
<!-- Bad: div soup -->
<div class="header">
  <div class="nav">
    <div class="nav-item">Home</div>
  </div>
</div>
<div class="main">
  <div class="article">
    <div class="section">
      <div class="heading">Title</div>
    </div>
  </div>
</div>
<div class="footer">
  <div class="copyright">...</div>
</div>

<!-- Good: semantic structure -->
<header>
  <nav aria-label="Main">
    <ul>
      <li><a href="/">Home</a></li>
    </ul>
  </nav>
</header>

<main>
  <article>
    <header>
      <h1>Article Title</h1>
      <time datetime="2026-07-21">July 21, 2026</time>
    </header>
    <section aria-labelledby="intro-heading">
      <h2 id="intro-heading">Introduction</h2>
      <p>Content...</p>
    </section>
  </article>

  <aside>
    <h2>Related Links</h2>
    <ul>
      <li><a href="/related">Related Article</a></li>
    </ul>
  </aside>
</main>

<footer>
  <small>&copy; 2026 My Company</small>
</footer>
```

### Content Sectioning

| Element | Purpose |
|---------|---------|
| `<header>` | Introductory content or navigation |
| `<nav>` | Navigation links |
| `<main>` | Primary content (one per page) |
| `<article>` | Self-contained composition |
| `<section>` | Thematic grouping of content |
| `<aside>` | Indirectly related content |
| `<footer>` | Footer for section or page |

### Heading Hierarchy

```html
<!-- Proper heading hierarchy -->
<h1>Page Title</h1>
  <h2>Section Title</h2>
    <h3>Sub-section Title</h3>
  <h2>Another Section</h2>

<!-- Bad: skipping levels -->
<h1>Title</h1>
  <h3>Sub-section</h3> <!-- Skipped h2 -->
```

### Text Semantics

```html
<p>
  The <abbr title="World Wide Web Consortium">W3C</abbr> defines
  <dfn>accessibility</dfn> as the practice of making websites
  usable by people of all abilities.
</p>

<p>
  Press <kbd>Ctrl</kbd> + <kbd>S</kbd> to save.
  The <samp>File saved</samp> message appears.
</p>

<p>
  The <var>x</var> variable equals <data value="42">42</data>.
  The chemical formula for water is H<sub>2</sub>O.
  E = mc<sup>2</sup>
</p>

<p>
  The <del>old price</del> is replaced
  with <ins>new lower price</ins>.
  The word <mark>important</mark> is highlighted.
</p>

<!-- Small for fine print -->
<small>Terms and conditions apply.</small>

<!-- Time element -->
<time datetime="2026-07-21T14:00:00Z">
  July 21, 2026 at 2:00 PM UTC
</time>
```

### Lists

```html
<!-- Unordered list -->
<ul>
  <li>Apples</li>
  <li>Oranges</li>
  <li>Bananas</li>
</ul>

<!-- Ordered list with custom start -->
<ol start="5" type="I">
  <li>Login</li>
  <li>Authorize</li>
  <li>Confirm</li>
</ol>

<!-- Description list -->
<dl>
  <dt>HTML</dt>
  <dd>HyperText Markup Language</dd>
  <dt>CSS</dt>
  <dd>Cascading Style Sheets</dd>
</dl>
```

### Tables

```html
<!-- Accessible table -->
<table>
  <caption>Monthly Sales Report 2026</caption>
  <thead>
    <tr>
      <th scope="col">Month</th>
      <th scope="col">Revenue</th>
      <th scope="col">Expenses</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th scope="row">January</th>
      <td>$50,000</td>
      <td>$30,000</td>
    </tr>
    <tr>
      <th scope="row">February</th>
      <td>$45,000</td>
      <td>$28,000</td>
    </tr>
  </tbody>
  <tfoot>
    <tr>
      <th scope="row">Total</th>
      <td>$95,000</td>
      <td>$58,000</td>
    </tr>
  </tfoot>
</table>
```

### Forms

```html
<form>
  <fieldset>
    <legend>Personal Information</legend>

    <label for="name">Full Name:</label>
    <input type="text" id="name" name="name" required
           autocomplete="name">

    <label for="email">Email:</label>
    <input type="email" id="email" name="email" required
           autocomplete="email">
  </fieldset>

  <fieldset>
    <legend>Preferences</legend>

    <label>
      <input type="checkbox" name="subscribe" checked>
      Subscribe to newsletter
    </label>

    <fieldset>
      <legend>Contact Method</legend>
      <label>
        <input type="radio" name="contact" value="email">
        Email
      </label>
      <label>
        <input type="radio" name="contact" value="phone">
        Phone
      </label>
    </fieldset>
  </fieldset>
</form>
```

### Media

```html
<!-- Image with alt text -->
<img src="chart.png" alt="Bar chart showing 40% increase in Q2 sales">

<!-- Decorative image -->
<img src="background.jpg" alt="" role="presentation">

<!-- Figure with caption -->
<figure>
  <img src="architecture.jpg" alt="Modern building with glass facade">
  <figcaption>Figure 1: Downtown office building</figcaption>
</figure>

<!-- Audio with transcript link -->
<audio controls>
  <source src="podcast.mp3" type="audio/mpeg">
  <a href="transcript.html">Listen to transcript</a>
</audio>

<!-- Video with captions -->
<video controls width="640" height="360">
  <source src="tutorial.mp4" type="video/mp4">
  <track src="subtitles.vtt" kind="subtitles"
         srclang="en" label="English">
  <track src="captions.vtt" kind="captions"
         srclang="en" label="English Captions">
  <p>Your browser doesn't support video.
     <a href="tutorial.mp4">Download the video</a>.</p>
</video>
```

## Common Accessibility Issues

### Non-Semantic Elements

```html
<!-- Bad: using div for interactive elements -->
<div class="button" onclick="submit()">Submit</div>

<!-- Good: using button -->
<button type="submit">Submit</button>

<!-- Bad: span as heading -->
<span class="heading-large">Section Title</span>

<!-- Good: actual heading -->
<h2>Section Title</h2>
```

### Missing Form Labels

```html
<!-- Bad: no label -->
<input type="text" placeholder="Search">

<!-- Bad: placeholder as label -->
<input type="text" placeholder="Email address">

<!-- Good: explicit label -->
<label for="search">Search:</label>
<input type="text" id="search" name="search">

<!-- Good: aria-label -->
<input type="text" aria-label="Search" placeholder="Search...">
```

### Link Text

```html
<!-- Bad: uninformative -->
<a href="/products/123">Click here</a> for details.

<!-- Good: descriptive -->
<a href="/products/123">View laptop specifications</a>

<!-- Bad: full URL -->
<a href="https://example.com/report.pdf">https://example.com/report.pdf</a>

<!-- Good: meaningful -->
<a href="https://example.com/report.pdf">Download annual report (PDF, 2.4 MB)</a>
```

## Practice

1. Convert a div-based layout into a semantically correct HTML5 structure using `<header>`, `<nav>`, `<main>`, `<article>`, `<section>`, `<aside>`, and `<footer>`.
2. Create an accessible product comparison table with `<caption>`, `<th scope="col">`, and `<th scope="row">`.
3. Build a recipe page using semantic HTML: ingredient list, step-by-step instructions, nutritional info, and user comments.
4. Write semantic markup for a news article with author, date, categories, tags, and related stories.
