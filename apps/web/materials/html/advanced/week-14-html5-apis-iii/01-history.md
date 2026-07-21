# History API

## Overview

The History API allows manipulation of the browser session history, enabling SPA routing and navigation control.

### Basic Methods

```js
// Move through history
window.history.back();     // Go back one page
window.history.forward();  // Go forward one page
window.history.go(-2);     // Go back two pages
window.history.go(1);      // Go forward one page

// Get number of entries
console.log(window.history.length);

// Current page state
console.log(window.history.state);
```

## pushState and replaceState

```js
// Add new entry to history
const state = { page: 'about', scrollPosition: 0 };
const title = 'About Us';
const url = '/about';

window.history.pushState(state, title, url);

// Replace current entry (doesn't add new entry)
window.history.replaceState(
  { page: 'home', scrollPosition: window.scrollY },
  'Home',
  '/'
);
```

## popstate Event

```js
window.addEventListener('popstate', (event) => {
  // event.state contains the state object from pushState/replaceState
  if (event.state) {
    console.log('Navigated to:', event.state.page);
    renderPage(event.state.page);
    window.scrollTo(0, event.state.scrollPosition || 0);
  }
});
```

## SPA Router Example

```html
<nav>
  <a href="/" data-link>Home</a>
  <a href="/about" data-link>About</a>
  <a href="/products" data-link>Products</a>
  <a href="/contact" data-link>Contact</a>
</nav>

<div id="app">
  <div id="page-content"></div>
</div>
```

```js
// Router
class Router {
  constructor(routes) {
    this.routes = routes;
    this.init();
  }

  init() {
    // Handle browser back/forward
    window.addEventListener('popstate', (e) => {
      const path = window.location.pathname;
      this.navigate(path, false);
    });

    // Intercept link clicks
    document.addEventListener('click', (e) => {
      const link = e.target.closest('[data-link]');
      if (link) {
        e.preventDefault();
        this.navigate(link.getAttribute('href'));
      }
    });

    // Initial route
    this.navigate(window.location.pathname, false);
  }

  navigate(path, addToHistory = true) {
    const route = this.routes.find(r => r.path === path)
      || this.routes.find(r => r.path === '/404')
      || this.routes.find(r => r.path === '/');

    // Update history
    if (addToHistory) {
      window.history.pushState({ path }, '', path);
    }

    // Render page
    document.title = route.title;
    document.getElementById('page-content').innerHTML = route.template();

    // Update active nav
    document.querySelectorAll('[data-link]').forEach(link => {
      link.classList.toggle('active', link.getAttribute('href') === path);
    });
  }
}

// Routes
const routes = [
  {
    path: '/',
    title: 'Home',
    template: () => `<h1>Home Page</h1><p>Welcome to our site!</p>`
  },
  {
    path: '/about',
    title: 'About',
    template: () => `<h1>About Us</h1><p>Learn about our company.</p>`
  },
  {
    path: '/products',
    title: 'Products',
    template: () => `<h1>Products</h1><ul><li>Product A</li><li>Product B</li></ul>`
  },
  {
    path: '/contact',
    title: 'Contact',
    template: () => `<h1>Contact</h1><form>...</form>`
  },
  {
    path: '/404',
    title: 'Not Found',
    template: () => `<h1>404</h1><p>Page not found.</p>`
  }
];

const router = new Router(routes);
```

## Scroll Restoration

```js
// Save scroll positions
const scrollPositions = {};

document.querySelectorAll('[data-link]').forEach(link => {
  link.addEventListener('click', () => {
    const currentPath = window.location.pathname;
    scrollPositions[currentPath] = window.scrollY;
  });
});

window.addEventListener('popstate', (e) => {
  const path = e.state?.path || '/';
  // Restore scroll after rendering
  requestAnimationFrame(() => {
    window.scrollTo(0, scrollPositions[path] || 0);
  });
});
```

## Practice

1. Build a multi-page SPA with three sections (Home, Gallery, Settings) using the History API.
2. Implement a tabbed interface where each tab creates a history entry and is navigable via back/forward.
3. Create a modal gallery where opening a modal changes the URL and closing restores it.
4. Build a wizard/form stepper that tracks each step in browser history.
