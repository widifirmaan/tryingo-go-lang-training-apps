# Implementation

## Setting Up the Foundation

### HTML Shell

```html
<!DOCTYPE html>
<html lang="en" data-theme="light">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta name="description" content="Portfolio of Jane Developer - Full Stack Web Developer">
  <title>Jane Developer | Full Stack Portfolio</title>

  <!-- Preload critical resources -->
  <link rel="preload" href="/fonts/inter-var.woff2" as="font" crossorigin>
  <link rel="preload" href="/css/critical.css" as="style">

  <!-- Critical CSS (inlined) -->
  <style>
    /* Critical above-fold styles */
    * { box-sizing: border-box; margin: 0; padding: 0; }
    body { font-family: 'Inter', system-ui, sans-serif; color: var(--color-text); background: var(--color-bg); }
    .skip-link { position: absolute; top: -100%; left: 0; z-index: 10000; }
    .skip-link:focus { top: 0; }
    /* ... more critical styles */
  </style>

  <!-- Full stylesheet (async) -->
  <link rel="preload" href="/css/styles.css" as="style"
        onload="this.onload=null;this.rel='stylesheet'">
  <noscript><link rel="stylesheet" href="/css/styles.css"></noscript>

  <!-- SEO Meta Tags -->
  <meta property="og:title" content="Jane Developer | Portfolio">
  <meta property="og:description" content="Full Stack Web Developer specializing in modern HTML5, CSS, and JavaScript.">
  <meta property="og:image" content="https://jane.dev/assets/og-image.jpg">
  <meta name="twitter:card" content="summary_large_image">
  <link rel="canonical" href="https://jane.dev">

  <!-- PWA -->
  <link rel="manifest" href="/manifest.json">
  <meta name="theme-color" content="#3498db">
  <link rel="apple-touch-icon" href="/assets/icons/icon-192.png">

  <!-- Preconnect -->
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>

  <!-- Structured Data -->
  <script type="application/ld+json">
  {
    "@context": "https://schema.org",
    "@type": "Person",
    "name": "Jane Developer",
    "url": "https://jane.dev",
    "jobTitle": "Full Stack Developer",
    "sameAs": [
      "https://github.com/jane",
      "https://linkedin.com/in/jane"
    ]
  }
  </script>
</head>
<body>
  <!-- Skip link -->
  <a href="#main-content" class="skip-link">Skip to main content</a>

  <!-- App Shell -->
  <portfolio-header></portfolio-header>

  <main id="main-content" role="main">
    <div id="app-root">
      <!-- Dynamic content loaded by router -->
    </div>
  </main>

  <portfolio-footer></portfolio-footer>

  <!-- Scripts -->
  <script src="/js/router.js" defer></script>
  <script src="/js/app.js" defer></script>
  <script src="/js/pwa.js" defer></script>
</body>
</html>
```

## Core Components

### Header Component

```js
class PortfolioHeader extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
  }

  connectedCallback() {
    this.render();
    this.setupListeners();
  }

  render() {
    this.shadowRoot.innerHTML = `
      <style>
        :host { display: block; }
        header {
          position: sticky; top: 0; z-index: 100;
          background: var(--header-bg, rgba(255,255,255,0.95));
          backdrop-filter: blur(8px);
          border-bottom: 1px solid var(--color-border);
        }
        .nav-container {
          max-width: 1200px; margin: 0 auto;
          padding: 0 24px;
          display: flex; align-items: center;
          justify-content: space-between; height: 64px;
        }
        .logo { font-size: 1.5em; font-weight: bold; text-decoration: none; color: var(--color-text); }
        .logo span { color: var(--color-primary); }
        .nav-links { display: flex; gap: 32px; list-style: none; align-items: center; }
        .nav-links a { color: var(--color-text-secondary); text-decoration: none; transition: color 0.2s; }
        .nav-links a:hover, .nav-links a[aria-current="page"] { color: var(--color-primary); }
        .theme-btn { background: none; border: 1px solid var(--color-border); border-radius: 8px; padding: 8px; cursor: pointer; font-size: 1.2em; }
        .mobile-toggle { display: none; background: none; border: none; font-size: 1.5em; cursor: pointer; }
        @media (max-width: 768px) {
          .nav-links { display: none; flex-direction: column; position: absolute; top: 64px; left: 0; right: 0; background: var(--color-bg); padding: 16px; border-bottom: 1px solid var(--color-border); }
          .nav-links.open { display: flex; }
          .mobile-toggle { display: block; }
        }
      </style>
      <header role="banner">
        <div class="nav-container">
          <a href="/" class="logo" aria-label="Home">Jane<span>.dev</span></a>
          <nav aria-label="Main navigation">
            <button class="mobile-toggle" aria-expanded="false" aria-label="Toggle menu">☰</button>
            <ul class="nav-links" role="list">
              <li><a href="/" data-link aria-current="page">Home</a></li>
              <li><a href="/projects" data-link>Projects</a></li>
              <li><a href="/blog" data-link>Blog</a></li>
              <li><a href="/about" data-link>About</a></li>
              <li><a href="/contact" data-link>Contact</a></li>
              <li><button class="theme-btn" id="themeToggle" aria-label="Toggle theme">🌙</button></li>
            </ul>
          </nav>
        </div>
      </header>
    `;
  }

  setupListeners() {
    this.shadowRoot.querySelector('.mobile-toggle')?.addEventListener('click', () => {
      const links = this.shadowRoot.querySelector('.nav-links');
      const expanded = links.classList.toggle('open');
      this.shadowRoot.querySelector('.mobile-toggle').setAttribute('aria-expanded', expanded);
    });

    this.shadowRoot.getElementById('themeToggle')?.addEventListener('click', () => {
      const current = document.documentElement.getAttribute('data-theme');
      const next = current === 'dark' ? 'light' : 'dark';
      document.documentElement.setAttribute('data-theme', next);
      localStorage.setItem('theme', next);
      this.shadowRoot.getElementById('themeToggle').textContent = next === 'dark' ? '☀️' : '🌙';
    });

    // Update active link on navigation
    this.shadowRoot.querySelectorAll('[data-link]').forEach(link => {
      link.addEventListener('click', () => {
        this.shadowRoot.querySelectorAll('[data-link]').forEach(l => l.removeAttribute('aria-current'));
        link.setAttribute('aria-current', 'page');
        this.shadowRoot.querySelector('.nav-links')?.classList.remove('open');
      });
    });
  }
}
customElements.define('portfolio-header', PortfolioHeader);
```

### Project Card Component

```js
class ProjectCard extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
  }

  static get observedAttributes() {
    return ['project'];
  }

  attributeChangedCallback(name, oldValue, newValue) {
    if (name === 'project' && oldValue !== newValue) {
      this._project = JSON.parse(newValue);
      this.render();
    }
  }

  render() {
    if (!this._project) return;

    const p = this._project;
    this.shadowRoot.innerHTML = `
      <style>
        .card { border: 1px solid var(--color-border); border-radius: 12px; overflow: hidden; background: var(--color-bg); transition: transform 0.3s, box-shadow 0.3s; }
        .card:hover { transform: translateY(-4px); box-shadow: 0 12px 24px rgba(0,0,0,0.1); }
        .image { width: 100%; height: 200px; object-fit: cover; }
        .body { padding: 20px; }
        .title { font-size: 1.25em; margin: 0 0 8px; }
        .desc { color: var(--color-text-secondary); line-height: 1.5; margin: 0 0 16px; font-size: 0.9em; }
        .tags { display: flex; flex-wrap: wrap; gap: 6px; margin-bottom: 16px; }
        .tag { padding: 4px 10px; background: var(--color-bg-secondary); border-radius: 20px; font-size: 0.8em; color: var(--color-text-secondary); }
        .links { display: flex; gap: 12px; }
        .link { padding: 8px 16px; border-radius: 6px; text-decoration: none; font-size: 0.875em; transition: background 0.2s; }
        .link-primary { background: var(--color-primary); color: #fff; }
        .link-primary:hover { background: var(--color-primary-dark); }
        .link-secondary { border: 1px solid var(--color-border); color: var(--color-text); }
        .link-secondary:hover { background: var(--color-bg-secondary); }
        @media (prefers-reduced-motion: reduce) { .card { transition: none; } }
      </style>
      <article class="card">
        <img class="image" src="${p.image}" alt="${p.title}"
             loading="lazy" width="400" height="200">
        <div class="body">
          <h3 class="title">${this.escape(p.title)}</h3>
          <p class="desc">${this.escape(p.description)}</p>
          <div class="tags">${p.technologies.map(t => `<span class="tag">${this.escape(t)}</span>`).join('')}</div>
          <div class="links">
            ${p.url ? `<a href="${p.url}" class="link link-primary" target="_blank" rel="noopener noreferrer">Live Demo</a>` : ''}
            ${p.github ? `<a href="${p.github}" class="link link-secondary" target="_blank" rel="noopener noreferrer">Source</a>` : ''}
          </div>
        </div>
      </article>
    `;
  }

  escape(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
  }
}
customElements.define('project-card', ProjectCard);
```

## SPA Router

```js
class Router {
  constructor(routes) {
    this.routes = routes;
    this.init();
  }

  init() {
    window.addEventListener('popstate', () => this.resolve());
    document.addEventListener('click', (e) => {
      const link = e.target.closest('[data-link]');
      if (link) {
        e.preventDefault();
        this.navigate(link.getAttribute('href'));
      }
    });
    this.resolve();
  }

  navigate(path) {
    history.pushState(null, '', path);
    this.resolve();
  }

  resolve() {
    const path = location.pathname;
    const route = this.routes.find(r => r.path === path) ||
                  this.routes.find(r => r.path === '/404') ||
                  this.routes.find(r => r.path === '/');

    document.title = route.title;
    document.getElementById('app-root').innerHTML = route.render();
    this.updateActiveLink(path);
  }

  updateActiveLink(path) {
    document.querySelectorAll('[data-link]').forEach(link => {
      link.toggleAttribute('aria-current', link.getAttribute('href') === path);
    });
  }
}

// Routes
const routes = [
  { path: '/', title: 'Home | Jane Developer', render: () => renderHome() },
  { path: '/projects', title: 'Projects | Jane Developer', render: () => renderProjects() },
  { path: '/blog', title: 'Blog | Jane Developer', render: () => renderBlog() },
  { path: '/about', title: 'About | Jane Developer', render: () => renderAbout() },
  { path: '/contact', title: 'Contact | Jane Developer', render: () => renderContact() },
  { path: '/404', title: 'Not Found', render: () => '<h1>404 - Page Not Found</h1><a href="/" data-link>Go home</a>' }
];

const router = new Router(routes);
```

## Contact Form with Validation

```html
<!-- Contact form markup (rendered by router) -->
<section aria-labelledby="contact-heading">
  <h1 id="contact-heading">Get in Touch</h1>
  <p>Have a project in mind? Let's talk about it.</p>

  <form id="contactForm" novalidate>
    <div class="form-group">
      <label for="name">Name *</label>
      <input type="text" id="name" name="name" required minlength="2"
             autocomplete="name" aria-describedby="name-error">
      <span id="name-error" class="error-message" role="alert"></span>
    </div>

    <div class="form-group">
      <label for="email">Email *</label>
      <input type="email" id="email" name="email" required
             autocomplete="email" aria-describedby="email-error">
      <span id="email-error" class="error-message" role="alert"></span>
    </div>

    <div class="form-group">
      <label for="subject">Subject</label>
      <input type="text" id="subject" name="subject"
             list="subjects" autocomplete="off">
      <datalist id="subjects">
        <option value="Project Inquiry">
        <option value="Job Opportunity">
        <option value="Collaboration">
        <option value="General Question">
      </datalist>
    </div>

    <div class="form-group">
      <label for="message">Message *</label>
      <textarea id="message" name="message" required minlength="10"
                rows="6" aria-describedby="message-error"></textarea>
      <span id="message-error" class="error-message" role="alert"></span>
    </div>

    <div class="form-status" aria-live="polite" id="formStatus"></div>

    <button type="submit" class="btn btn-primary">Send Message</button>
  </form>
</section>
```

```js
// Contact form validation and submission
document.getElementById('contactForm').addEventListener('submit', async (e) => {
  e.preventDefault();

  const status = document.getElementById('formStatus');
  const form = e.target;

  // Validate all fields
  const errors = validateForm(form);
  if (Object.keys(errors).length > 0) {
    showErrors(errors);
    status.textContent = 'Please fix the errors above.';
    status.className = 'form-status error';
    return;
  }

  // Submit
  status.textContent = 'Sending...';
  status.className = 'form-status';

  try {
    const formData = new FormData(form);
    const response = await fetch('/api/contact', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(Object.fromEntries(formData))
    });

    if (response.ok) {
      status.textContent = 'Message sent successfully! I\'ll get back to you soon.';
      status.className = 'form-status success';
      form.reset();
    } else {
      throw new Error('Server error');
    }
  } catch (err) {
    status.textContent = 'Failed to send message. Please try again or email me directly.';
    status.className = 'form-status error';
  }
});

function validateForm(form) {
  const errors = {};
  const name = form.querySelector('#name');
  const email = form.querySelector('#email');
  const message = form.querySelector('#message');

  if (!name.value.trim() || name.value.length < 2) {
    errors.name = 'Name must be at least 2 characters';
  }

  if (!email.value.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.value)) {
    errors.email = 'Please enter a valid email address';
  }

  if (!message.value.trim() || message.value.length < 10) {
    errors.message = 'Message must be at least 10 characters';
  }

  return errors;
}

function showErrors(errors) {
  document.querySelectorAll('.error-message').forEach(el => el.textContent = '');
  Object.entries(errors).forEach(([field, msg]) => {
    const errorEl = document.getElementById(`${field}-error`);
    const input = document.getElementById(field);
    if (errorEl) errorEl.textContent = msg;
    if (input) input.setAttribute('aria-invalid', 'true');
  });
}
```

## Practice

1. Implement the complete header component with mobile menu, theme toggle, and active link tracking.
2. Build the project showcase page with filtering by technology and category.
3. Implement the contact form with client-side validation, error display, and API submission.
4. Create the blog page with dynamic post loading from JSON data and pagination.
