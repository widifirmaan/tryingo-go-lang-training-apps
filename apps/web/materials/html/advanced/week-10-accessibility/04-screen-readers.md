# Screen Readers

## Overview

Screen readers convert digital text to synthesized speech or braille. The most popular screen readers are:

- **NVDA** (Windows, free)
- **JAWS** (Windows, commercial)
- **VoiceOver** (macOS/iOS, built-in)
- **TalkBack** (Android, built-in)
- **Narrator** (Windows, built-in)

## How Screen Readers Work

Screen readers navigate pages by:
1. Reading content in DOM order
2. Announcing element roles, states, and properties
3. Allowing navigation via landmarks, headings, links, etc.
4. Reading alternative text for images

## Testing with Screen Readers

### VoiceOver (macOS)

```txt
// Turn on: Cmd + F5
// Navigate: Ctrl + Option + Arrow keys
// Read next: Ctrl + Option + Right
// Read previous: Ctrl + Option + Left
// Rotor: Ctrl + Option + U
// Click: Ctrl + Option + Space
// Navigate headings: Rotor → Headings
// Navigate links: Rotor → Links
// Navigate landmarks: Rotor → Landmarks
```

### NVDA (Windows)

```txt
// Turn on: Ctrl + Alt + N
// Read next: Down arrow
// Read previous: Up arrow
// Navigate: NVDA + F7 (elements list)
// Click: Enter
// Navigate headings: H key (next), Shift + H (prev)
// Navigate landmarks: D key
// Navigate links: K key
// Navigate form fields: Tab
```

## Common Screen Reader Behaviors

```html
<!-- Screen reader announces: "button, Subscribe" -->
<button>Subscribe</button>

<!-- Screen reader announces: "link, Read more about accessibility" -->
<a href="/a11y">Read more about accessibility</a>

<!-- Screen reader announces: "heading level 2, Introduction" -->
<h2>Introduction</h2>

<!-- Screen reader announces: "image, Company logo" -->
<img src="logo.png" alt="Company logo">

<!-- Screen reader announces: "text input, Email address, required" -->
<label for="email">Email address</label>
<input type="email" id="email" required>
```

## Landmark Navigation

Screen reader users navigate by landmarks. Every page should have:

```html
<body>
  <header role="banner">
    <nav role="navigation" aria-label="Main">...</nav>
  </header>

  <main role="main">
    <article role="article">
      <h1>Page Title</h1>
      <section aria-labelledby="s1">
        <h2 id="s1">Section</h2>
      </section>
    </article>

    <aside role="complementary" aria-label="Sidebar">...</aside>
  </main>

  <footer role="contentinfo">
    <nav role="navigation" aria-label="Footer">...</nav>
  </footer>
</body>
```

## Heading Structure

Headings are the primary navigation method for screen reader users.

```html
<!-- Correct: logical hierarchy -->
<h1>Site Name</h1>
  <h2>Main Section</h2>
    <h3>Sub Section</h3>
  <h2>Another Section</h2>
    <h3>Sub Section</h3>
      <h4>Detail</h4>

<!-- Incorrect: skipped levels -->
<h1>Title</h1>
  <h3>Direct Sub</h3>  <!-- h2 is missing -->

<!-- Incorrect: multiple h1s on single page -->
<h1>Section 1</h1>
<h1>Section 2</h1>   <!-- should be h2 -->
```

## Link Text Best Practices

```html
<!-- Bad: "click here", "read more", "link" -->
<a href="/products">Click here</a> for products.
<a href="/about">Read more</a>
<a href="/pdf/report.pdf">link</a>

<!-- Screen reader reads link text only when navigating by links
     Don't use "click here" - it's meaningless out of context -->

<!-- Good: descriptive, unique -->
<a href="/products">View our product catalog</a>
<a href="/about">Learn about our company history</a>
<a href="/pdf/report.pdf">Download annual report (PDF)</a>

<!-- If visual design requires "Read more", use aria-label -->
<article>
  <h2>Article Title</h2>
  <p>Preview text...</p>
  <a href="/article/1" aria-label="Read more about Article Title">
    Read more
  </a>
</article>
```

## Image Alternatives

```html
<!-- Informative image: describe content -->
<img src="chart-q2-sales.png"
     alt="Bar chart showing Q2 sales increased 40% year-over-year">

<!-- Decorative image: empty alt -->
<img src="background-divider.svg" alt="" role="presentation">

<!-- Icon with text: hide from screen reader -->
<button>
  <svg aria-hidden="true" width="16" height="16">
    <use href="#search-icon"/>
  </svg>
  Search
</button>

<!-- Complex image: long description -->
<figure>
  <img src="org-chart.png"
       alt="Organization chart showing CEO at top with 3 VPs"
       aria-describedby="org-desc">
  <figcaption id="org-desc">
    CEO Jane Smith leads three departments:
    Engineering (VP Bob Chen), Marketing (VP Alice Lee),
    and Operations (VP James Brown).
  </figcaption>
</figure>
```

## Form Accessibility for Screen Readers

```html
<form>
  <!-- Clear label association -->
  <label for="name">Full Name:</label>
  <input type="text" id="name" name="name">

  <!-- Required fields -->
  <label for="email">Email: <span aria-hidden="true">*</span></label>
  <input type="email" id="email" name="email" required
         aria-required="true">

  <!-- Error announcement -->
  <label for="password">Password:</label>
  <input type="password" id="password" name="password"
         aria-invalid="true"
         aria-describedby="pw-error">
  <span id="pw-error" role="alert">
    Password must be at least 8 characters
  </span>

  <!-- Grouped options -->
  <fieldset>
    <legend>Shipping Method</legend>
    <label>
      <input type="radio" name="shipping" value="standard">
      Standard (5-7 days)
    </label>
    <label>
      <input type="radio" name="shipping" value="express">
      Express (2-3 days)
    </label>
  </fieldset>

  <!-- Status updates -->
  <div aria-live="polite" aria-atomic="true">
    <span id="formStatus"></span>
  </div>
</form>
```

```js
// Live region for form submission
document.getElementById('myForm').addEventListener('submit', async (e) => {
  e.preventDefault();
  const status = document.getElementById('formStatus');
  status.textContent = 'Submitting your request...';

  try {
    await submitForm();
    status.textContent = 'Form submitted successfully!';
  } catch (err) {
    status.textContent = 'Error submitting form. Please try again.';
  }
});
```

## Announcements and Notifications

```html
<!-- Polite: doesn't interrupt current task -->
<div aria-live="polite" id="cart-notification">
  <!-- "Item added to cart" - announced when user is idle -->
</div>

<!-- Assertive: interrupts current task (use sparingly) -->
<div aria-live="assertive" id="critical-alert">
  <!-- "Your session will expire in 60 seconds" - immediate -->
</div>

<!-- Status role: polite live region -->
<div role="status" id="search-results">
  <!-- "Showing 12 results for 'laptops'" -->
</div>

<!-- Alert role: assertive live region -->
<div role="alert" id="error-message">
  <!-- "Connection lost. Please check your internet." -->
</div>
```

## Testing Checklist

```txt
- [ ] Page has one <h1> that describes the page
- [ ] No heading levels are skipped
- [ ] All images have appropriate alt text
- [ ] All form controls have associated labels
- [ ] Error messages are announced via aria-live
- [ ] Custom controls have correct ARIA roles
- [ ] Tab order follows visual order
- [ ] All interactive elements are keyboard accessible
- [ ] Focus indicator is clearly visible
- [ ] Landmarks are properly defined
- [ ] Link text is descriptive out of context
- [ ] Color is not the only way information is conveyed
- [ ] Text has sufficient color contrast (4.5:1 for normal)
- [ ] Page is navigable by heading structure
- [ ] Dynamic content changes are announced
```

## Tools for Testing

```bash
# axe-core (browser extension)
# WAVE (browser extension)
# Lighthouse (built into Chrome DevTools)
# Accessibility Insights (Windows)
# Pa11y CLI
npm install -g pa11y
pa11y https://example.com

# axe-core CLI
npm install -g @axe-core/cli
axe https://example.com

# HTML Validator
npm install -g html-validate
html-validate index.html
```

## Practice

1. Navigate your favorite website using only VoiceOver or NVDA for 10 minutes. Document any barriers you encounter.
2. Use a screen reader to fill out a complex form. Write down what works well and what is confusing.
3. Create a hidden "skip link" and verify it works with a screen reader.
4. Build a page with a live search that announces results via `aria-live="polite"`. Test that updates are announced.
5. Run axe-core or Lighthouse accessibility audit on a page and fix all issues found.
