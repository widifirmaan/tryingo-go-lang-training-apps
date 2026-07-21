# ARIA

## What is ARIA?

**Accessible Rich Internet Applications (ARIA)** is a set of attributes that supplement HTML to improve accessibility when native semantics are insufficient.

### First Rule of ARIA

> Don't use ARIA if you can use a native HTML element.

```html
<!-- Bad: reinventing a button -->
<div role="button" tabindex="0" onclick="submit()">Submit</div>

<!-- Good: native button -->
<button type="submit">Submit</button>
```

## ARIA Roles

### Landmark Roles

```html
<header role="banner">
  <h1>Site Title</h1>
  <nav role="navigation" aria-label="Main navigation">
    <ul>
      <li><a href="/">Home</a></li>
      <li><a href="/about">About</a></li>
    </ul>
  </nav>
</header>

<main role="main">
  <article role="article">
    <h2>Blog Post Title</h2>
    <p>Content...</p>
  </article>

  <aside role="complementary" aria-label="Related articles">
    <h3>Related Posts</h3>
    <ul>
      <li><a href="/post1">Post 1</a></li>
    </ul>
  </aside>
</main>

<footer role="contentinfo">
  <p>&copy; 2026 My Site</p>
</footer>
```

> Note: Modern HTML5 elements like `<header>`, `<nav>`, `<main>`, `<aside>`, `<footer>` have implicit landmark roles. Use them directly.

### Widget Roles

```html
<!-- Tab interface -->
<div role="tablist" aria-label="Product info">
  <button role="tab" aria-selected="true" aria-controls="desc-panel" id="desc-tab">
    Description
  </button>
  <button role="tab" aria-selected="false" aria-controls="reviews-panel" id="reviews-tab">
    Reviews
  </button>
</div>

<div role="tabpanel" id="desc-panel" aria-labelledby="desc-tab">
  Product description content...
</div>

<div role="tabpanel" id="reviews-panel" aria-labelledby="reviews-tab" hidden>
  Reviews content...
</div>

<!-- Alert dialog -->
<div role="alertdialog" aria-labelledby="dialog-title" aria-describedby="dialog-desc">
  <h2 id="dialog-title">Confirm Delete</h2>
  <p id="dialog-desc">Are you sure you want to delete this item?</p>
  <button>Cancel</button>
  <button>Delete</button>
</div>

<!-- Progress bar -->
<div role="progressbar" aria-valuenow="60" aria-valuemin="0" aria-valuemax="100">
  60%
</div>
```

## ARIA States and Properties

### Live Regions

```html
<!-- Announce dynamic content changes -->
<div aria-live="polite" aria-atomic="true" id="notifications">
  <!-- Screen reader announces content changes here -->
</div>

<div aria-live="assertive" aria-atomic="true" id="alerts">
  <!-- Urgent messages: interrupts current announcement -->
</div>

<!-- Button that triggers a live region update -->
<button onclick="showNotification()">Add to Cart</button>
```

```js
function showNotification() {
  const region = document.getElementById('notifications');
  region.textContent = 'Item added to your cart. You have 3 items.';
}
```

### aria-expanded and aria-controls

```html
<button aria-expanded="false" aria-controls="menu"
        onclick="toggleMenu(this)">
  Menu
</button>

<ul id="menu" hidden>
  <li><a href="/">Home</a></li>
  <li><a href="/shop">Shop</a></li>
</ul>
```

```js
function toggleMenu(btn) {
  const expanded = btn.getAttribute('aria-expanded') === 'true';
  btn.setAttribute('aria-expanded', !expanded);
  document.getElementById('menu').hidden = expanded;
}
```

### aria-label and aria-labelledby

```html
<!-- aria-label for elements without visible text -->
<button aria-label="Close dialog" onclick="close()">×</button>
<nav aria-label="Breadcrumb">
  <ol>
    <li><a href="/">Home</a></li>
    <li><a href="/products">Products</a></li>
    <li aria-current="page">Laptops</li>
  </ol>
</nav>

<!-- aria-labelledby to reference existing text -->
<section aria-labelledby="section-title">
  <h2 id="section-title">Latest News</h2>
  <article>...</article>
</section>

<!-- Multiple references -->
<input type="text" aria-labelledby="label1 label2" aria-describedby="hint">
<span id="label1">Username:</span>
<span id="label2">(required)</span>
<span id="hint">Must be at least 3 characters</span>
```

### aria-describedby

```html
<label for="password">Password:</label>
<input type="password" id="password"
       aria-describedby="pw-hint pw-error">
<span id="pw-hint">8+ characters with a number</span>
<span id="pw-error" role="alert"></span>
```

### aria-hidden

```html
<!-- Hide decorative icons from screen readers -->
<button>
  <span aria-hidden="true">★</span>
  Add to Favorites
</button>

<!-- Hide off-screen content -->
<div aria-hidden="true" class="off-screen">
  Decorative background animation
</div>
```

### aria-current

```html
<nav aria-label="Pagination">
  <a href="?page=1">1</a>
  <a href="?page=2" aria-current="page">2</a>
  <a href="?page=3">3</a>
</nav>
```

## ARIA Design Patterns

### Accordion

```html
<div class="accordion">
  <h3>
    <button aria-expanded="false" aria-controls="section1"
            id="accordion1-btn">
      Section 1
    </button>
  </h3>
  <div id="section1" role="region"
       aria-labelledby="accordion1-btn" hidden>
    <p>Content for section 1...</p>
  </div>
</div>
```

### Modal Dialog

```html
<div role="dialog" aria-modal="true"
     aria-labelledby="modal-title"
     id="myModal" hidden>
  <div class="modal-content">
    <h2 id="modal-title">Confirm Action</h2>
    <p>Are you sure?</p>
    <button onclick="closeModal()">Cancel</button>
    <button onclick="confirm()">Confirm</button>
  </div>
</div>
```

```css
[aria-modal="true"] {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0,0,0,0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
}

[aria-modal="true"] .modal-content {
  background: #fff;
  padding: 24px;
  border-radius: 8px;
  max-width: 500px;
}
```

## Practice

1. Create a custom carousel/slider with proper ARIA roles (`tabpanel`, `tablist`), live regions for slide changes, and keyboard navigation.
2. Build a form that uses `aria-describedby` for help text, `aria-invalid` for error states, and `aria-live` for submission status.
3. Implement an accordion component using ARIA design patterns (`aria-expanded`, `aria-controls`, `role="region"`).
4. Audit a simple web page and add appropriate ARIA landmarks, labels, and descriptions where needed.
