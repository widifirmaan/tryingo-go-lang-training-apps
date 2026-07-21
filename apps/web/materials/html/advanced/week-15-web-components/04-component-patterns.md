# Component Design Patterns

## Overview

Building robust Web Components requires consistent patterns for state management, communication, reusability, and testing.

## State Management

### Attribute-Based State

```js
class Counter extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
  }

  static get observedAttributes() {
    return ['count', 'min', 'max', 'step'];
  }

  get count() { return parseInt(this.getAttribute('count')) || 0; }
  set count(val) { this.setAttribute('count', val); }

  get min() { return parseInt(this.getAttribute('min')) || -Infinity; }
  get max() { return parseInt(this.getAttribute('max')) || Infinity; }
  get step() { return parseInt(this.getAttribute('step')) || 1; }

  connectedCallback() {
    this.render();
  }

  attributeChangedCallback() {
    if (this.shadowRoot) this.render();
  }

  render() {
    this.shadowRoot.innerHTML = `
      <style>
        :host { display: inline-flex; align-items: center; gap: 8px; }
        button {
          width: 32px; height: 32px;
          border: 1px solid #ddd;
          border-radius: 50%;
          background: #fff;
          cursor: pointer;
          font-size: 1.2em;
          display: flex; align-items: center; justify-content: center;
        }
        button:disabled { opacity: 0.3; cursor: not-allowed; }
        button:not(:disabled):hover { background: #f0f0f0; }
        .value {
          font-size: 1.2em;
          font-weight: bold;
          min-width: 40px;
          text-align: center;
        }
      </style>
      <button class="decrement" ?disabled=${this.count <= this.min}>−</button>
      <span class="value">${this.count}</span>
      <button class="increment" ?disabled=${this.count >= this.max}>+</button>
    `;

    this.shadowRoot.querySelector('.decrement')
      .addEventListener('click', () => this.decrement());
    this.shadowRoot.querySelector('.increment')
      .addEventListener('click', () => this.increment());
  }

  increment() {
    const newVal = Math.min(this.count + this.step, this.max);
    this.count = newVal;
    this.emitChange();
  }

  decrement() {
    const newVal = Math.max(this.count - this.step, this.min);
    this.count = newVal;
    this.emitChange();
  }

  emitChange() {
    this.dispatchEvent(new CustomEvent('count-change', {
      detail: { count: this.count },
      bubbles: true
    }));
  }
}

customElements.define('x-counter', Counter);
```

### Property-Based State

```js
class DataGrid extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    this._data = [];
    this._columns = [];
  }

  set data(data) {
    this._data = data;
    this.render();
  }

  get data() { return this._data; }

  set columns(cols) {
    this._columns = cols;
    this.render();
  }

  get columns() { return this._columns; }

  render() {
    if (!this._columns.length) return;

    this.shadowRoot.innerHTML = `
      <style>
        table { width: 100%; border-collapse: collapse; }
        th { background: #f5f5f5; padding: 10px 12px; text-align: left;
             border-bottom: 2px solid #ddd; font-weight: 600; }
        td { padding: 10px 12px; border-bottom: 1px solid #eee; }
        tr:hover td { background: #f8faff; }
      </style>
      <table>
        <thead>
          <tr>${this._columns.map(c => `<th>${c.label}</th>`).join('')}</tr>
        </thead>
        <tbody>
          ${this._data.map(row => `
            <tr>${this._columns.map(c => `<td>${row[c.field] ?? ''}</td>`).join('')}</tr>
          `).join('')}
        </tbody>
      </table>
    `;
  }
}

customElements.define('data-grid', DataGrid);
```

```js
// Usage
const grid = document.getElementById('myGrid');
grid.columns = [
  { field: 'name', label: 'Name' },
  { field: 'age', label: 'Age' },
  { field: 'email', label: 'Email' }
];
grid.data = [
  { name: 'Alice', age: 30, email: 'alice@example.com' },
  { name: 'Bob', age: 25, email: 'bob@example.com' }
];
```

## Communication Patterns

### Events (Child → Parent)

```js
// Component dispatches events
class ActionButton extends HTMLElement {
  connectedCallback() {
    this.addEventListener('click', () => {
      this.dispatchEvent(new CustomEvent('action', {
        detail: { action: this.getAttribute('action') },
        bubbles: true,
        composed: true // Crosses shadow boundary
      }));
    });
  }
}

// Parent listens
document.querySelector('action-button').addEventListener('action', (e) => {
  console.log('Action:', e.detail.action);
});
```

### Methods (Parent → Child)

```js
class ExpandableSection extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    this._expanded = false;
  }

  // Public API
  expand() { this._expanded = true; this.updateUI(); }
  collapse() { this._expanded = false; this.updateUI(); }
  toggle() { this._expanded ? this.collapse() : this.expand(); }
  isExpanded() { return this._expanded; }

  updateUI() {
    const content = this.shadowRoot.querySelector('.content');
    if (content) {
      content.style.display = this._expanded ? 'block' : 'none';
    }
  }
}

// Usage
const section = document.querySelector('expandable-section');
section.expand();
section.collapse();
```

## Render Patterns

### Declarative Rendering

```js
class ProductCard extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
  }

  static get observedAttributes() {
    return ['product-id'];
  }

  async attributeChangedCallback(name) {
    if (name === 'product-id') {
      await this.load();
    }
  }

  async load() {
    const id = this.getAttribute('product-id');
    const product = await fetch(`/api/products/${id}`).then(r => r.json());
    this.render(product);
  }

  render(product) {
    this.shadowRoot.innerHTML = `
      <style>
        .card { border: 1px solid #ddd; border-radius: 8px; overflow: hidden;
                background: #fff; }
        .image { width: 100%; height: 200px; object-fit: cover; }
        .body { padding: 16px; }
        .title { font-size: 1.1em; margin: 0 0 8px; }
        .price { font-size: 1.3em; color: #2ecc71; font-weight: bold; }
        .desc { color: #666; font-size: 0.9em; line-height: 1.4; }
        button { margin-top: 12px; padding: 8px 16px; background: #3498db;
                 color: #fff; border: none; border-radius: 4px; cursor: pointer; }
      </style>
      <div class="card">
        <img class="image" src="${product.image}" alt="${product.name}">
        <div class="body">
          <h3 class="title">${product.name}</h3>
          <div class="price">$${product.price}</div>
          <p class="desc">${product.description}</p>
          <button>Add to Cart</button>
        </div>
      </div>
    `;
  }
}

customElements.define('product-card', ProductCard);
```

## Mixin Pattern

```js
// Shared behavior mixins
const Clickable = (superClass) => class extends superClass {
  constructor() {
    super();
    this.addEventListener('click', this._handleClick);
  }

  _handleClick(e) {
    // Common click behavior
  }
};

const Focusable = (superClass) => class extends superClass {
  constructor() {
    super();
    this.setAttribute('tabindex', '0');
  }

  focus() {
    super.focus();
    // Custom focus behavior
  }
};

// Composed component
class AdvancedButton extends Focusable(Clickable(HTMLElement)) {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
  }

  connectedCallback() {
    this.shadowRoot.innerHTML = `<button><slot></slot></button>`;
  }
}

customElements.define('advanced-button', AdvancedButton);
```

## Lazy Loading Components

```js
// Define without registering immediately
class LazyComponent extends HTMLElement {
  // ...
}

// Register when needed
if ('IntersectionObserver' in window) {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        if (!customElements.get('lazy-component')) {
          customElements.define('lazy-component', LazyComponent);
        }
        observer.unobserve(entry.target);
      }
    });
  });
}
```

## Practice

1. Build a `<data-table>` component with sorting, filtering, and pagination as public methods.
2. Create a `<form-builder>` component that accepts a JSON schema and renders a complete form with validation.
3. Implement a `<notification-center>` that collects events from child components and displays them.
4. Build a `<media-gallery>` that lazy-loads images as they scroll into view and exposes `next()`, `prev()`, and `goTo(index)` methods.
