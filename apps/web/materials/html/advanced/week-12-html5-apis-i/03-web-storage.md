# Web Storage

## Overview

Web Storage provides two client-side storage mechanisms: `localStorage` (persistent) and `sessionStorage` (session-only).

### Storage Comparison

| Feature | localStorage | sessionStorage | Cookies |
|---------|-------------|----------------|---------|
| Capacity | ~5-10 MB | ~5-10 MB | ~4 KB |
| Persistence | Until cleared | Until tab closes | Configurable |
| Sent to server | No | No | Yes |
| API | Simple key-value | Simple key-value | Complex |
| Scope | Origin + protocol | Origin + tab | Origin + path |

## Basic API

```js
// Set values
localStorage.setItem('theme', 'dark');
localStorage.setItem('fontSize', '16');
localStorage.setItem('user', JSON.stringify({ name: 'Alice', id: 42 }));

// Get values
const theme = localStorage.getItem('theme'); // 'dark'
const fontSize = localStorage.getItem('fontSize'); // '16'
const user = JSON.parse(localStorage.getItem('user')); // { name: 'Alice', id: 42 }

// Check if key exists
if (localStorage.getItem('visited') !== null) {
  console.log('Returning visitor');
}

// Get number of items
console.log(`Storage has ${localStorage.length} items`);

// Get key by index
const firstKey = localStorage.key(0);

// Remove item
localStorage.removeItem('fontSize');

// Clear all
localStorage.clear();

// Property-style access (works but not recommended)
localStorage.myCustomKey = 'value';
console.log(localStorage.myCustomKey);
```

## Practical Examples

### Theme Persistence

```html
<div class="theme-demo">
  <h2>Theme Switcher</h2>
  <button data-theme="light">Light</button>
  <button data-theme="dark">Dark</button>
  <button data-theme="auto">Auto</button>
</div>

<div class="content">
  <p>This content changes with the theme.</p>
</div>
```

```css
body {
  transition: background 0.3s, color 0.3s;
}

body.dark {
  background: #1a1a2e;
  color: #e0e0e0;
}

body.light {
  background: #ffffff;
  color: #333;
}

body.auto {
  background: #f0f4f8;
  color: #2c3e50;
}
```

```js
// Apply saved theme on load
const savedTheme = localStorage.getItem('theme') || 'light';
document.body.className = savedTheme;

// Theme switcher
document.querySelectorAll('[data-theme]').forEach(btn => {
  btn.addEventListener('click', () => {
    const theme = btn.dataset.theme;
    document.body.className = theme;
    localStorage.setItem('theme', theme);
  });
});
```

### Session-Based Form Data

```js
const form = document.querySelector('form');
const formFields = form.querySelectorAll('input, textarea, select');

// Save form progress on input
formFields.forEach(field => {
  field.addEventListener('input', () => {
    sessionStorage.setItem('formData_' + field.name, field.value);
  });
});

// Restore on page load
formFields.forEach(field => {
  const saved = sessionStorage.getItem('formData_' + field.name);
  if (saved !== null) {
    field.value = saved;
  }
});

// Clear on successful submit
form.addEventListener('submit', (e) => {
  e.preventDefault();
  // Submit logic...
  formFields.forEach(field => {
    sessionStorage.removeItem('formData_' + field.name);
  });
  form.reset();
});
```

### Cart System

```js
class ShoppingCart {
  constructor() {
    this.items = this.load();
  }

  load() {
    try {
      const data = localStorage.getItem('cart');
      return data ? JSON.parse(data) : [];
    } catch {
      return [];
    }
  }

  save() {
    localStorage.setItem('cart', JSON.stringify(this.items));
  }

  add(product) {
    const existing = this.items.find(item => item.id === product.id);
    if (existing) {
      existing.quantity += product.quantity || 1;
    } else {
      this.items.push({ ...product, quantity: product.quantity || 1 });
    }
    this.save();
    this.updateUI();
  }

  remove(productId) {
    this.items = this.items.filter(item => item.id !== productId);
    this.save();
    this.updateUI();
  }

  updateQuantity(productId, quantity) {
    const item = this.items.find(item => item.id === productId);
    if (item) {
      item.quantity = Math.max(0, quantity);
      if (item.quantity === 0) this.remove(productId);
      else this.save();
    }
    this.updateUI();
  }

  clear() {
    this.items = [];
    this.save();
    this.updateUI();
  }

  getTotal() {
    return this.items.reduce((sum, item) =>
      sum + item.price * item.quantity, 0
    ).toFixed(2);
  }

  getCount() {
    return this.items.reduce((sum, item) => sum + item.quantity, 0);
  }

  updateUI() {
    const cartEl = document.getElementById('cart');
    if (!cartEl) return;

    cartEl.innerHTML = this.items.map(item => `
      <div class="cart-item">
        <span>${item.name}</span>
        <span>$${item.price} × ${item.quantity}</span>
        <button onclick="cart.remove(${item.id})">✕</button>
      </div>
    `).join('');

    document.getElementById('cartTotal').textContent = `$${this.getTotal()}`;
    document.getElementById('cartCount').textContent = this.getCount();
  }
}

const cart = new ShoppingCart();

// Usage
cart.add({ id: 1, name: 'Widget', price: 9.99, quantity: 2 });
cart.add({ id: 2, name: 'Gadget', price: 14.99 });
console.log(cart.getTotal()); // $34.97
```

## Storage Events

Listen for storage changes across tabs:

```js
// Listen for changes (fires in OTHER tabs/windows)
window.addEventListener('storage', (e) => {
  console.log(`Key "${e.key}" changed from "${e.oldValue}" to "${e.newValue}"`);
  console.log(`Origin: ${e.url}`);
  console.log(`Storage area: ${e.storageArea === localStorage ? 'local' : 'session'}`);

  // Sync UI across tabs
  if (e.key === 'theme') {
    document.body.className = e.newValue;
  }
  if (e.key === 'cart') {
    updateCartDisplay();
  }
});

// Trigger from current tab (manually dispatch)
function notifyOtherTabs(key, value) {
  // The storage event only fires in OTHER tabs
  // To sync current tab, update directly
  localStorage.setItem(key, value);
}
```

## Storage Limits and Error Handling

```js
function safeSetItem(key, value) {
  try {
    localStorage.setItem(key, value);
    return true;
  } catch (e) {
    if (e.name === 'QuotaExceededError' || e.code === 22) {
      console.warn('Storage quota exceeded');
      // Free up space: remove old items
      cleanupOldData();
      return false;
    }
    console.error('Storage error:', e);
    return false;
  }
}

// Check storage usage
function getStorageUsage() {
  let total = 0;
  for (let key in localStorage) {
    if (localStorage.hasOwnProperty(key)) {
      total += localStorage[key].length * 2; // UTF-16
    }
  }
  return (total / 1024 / 1024).toFixed(2) + ' MB';
}
```

## Practice

1. Build a note-taking app that saves notes to localStorage with title, content, and timestamp. Display all saved notes in a list.
2. Create a theme switcher that persists the user's preferred theme (dark/light/auto) and syncs across browser tabs.
3. Implement a "Recently Viewed Products" section that stores the last 10 product IDs in localStorage and displays them.
4. Build a multi-step form wizard that uses sessionStorage to save progress and restore it if the user refreshes.
