# Keyboard Accessibility

## Why Keyboard Accessibility?

Many users rely on keyboards or keyboard-like devices:
- Users with motor disabilities
- Screen reader users
- Power users who prefer keyboard shortcuts
- Users with temporary impairments

## Focus Management

### Visible Focus Indicators

```css
/* Always show focus for keyboard users */
:focus-visible {
  outline: 3px solid #4a90d9;
  outline-offset: 2px;
  border-radius: 2px;
}

/* Remove focus for mouse users while keeping keyboard focus */
:focus:not(:focus-visible) {
  outline: none;
}

/* Custom focus styling */
button:focus-visible {
  box-shadow: 0 0 0 3px rgba(74, 144, 217, 0.5);
}

a:focus-visible {
  text-decoration: underline;
  color: #1a5a99;
}
```

### Tab Order

```html
<!-- Natural tab order (recommended) -->
<nav>
  <a href="/">Home</a>
  <a href="/about">About</a>
  <a href="/contact">Contact</a>
</nav>

<!-- Do NOT use positive tabindex values -->
<!-- Bad: creates confusing order -->
<button tabindex="3">Save</button>
<button tabindex="1">Cancel</button>
<button tabindex="2">Delete</button>

<!-- Use tabindex="0" or tabindex="-1" only -->
<div tabindex="0">Focusable div</div>       <!-- tabindex="0": natural order -->
<div tabindex="-1">Programmatically focusable</div> <!-- tabindex="-1": script only -->
```

### Skip Links

```html
<head>
  <style>
    .skip-link {
      position: absolute;
      top: -100%;
      left: 0;
      background: #4a90d9;
      color: #fff;
      padding: 8px 16px;
      z-index: 10000;
      text-decoration: none;
    }

    .skip-link:focus {
      top: 0;
    }
  </style>
</head>
<body>
  <!-- Skip link is first focusable element -->
  <a href="#main-content" class="skip-link">
    Skip to main content
  </a>
  <a href="#nav" class="skip-link">
    Skip to navigation
  </a>

  <header>...</header>
  <nav id="nav">...</nav>

  <main id="main-content" tabindex="-1">
    <h1>Main Content</h1>
  </main>
</body>
```

## Keyboard Interaction Patterns

### Button

```html
<!-- Buttons are natively keyboard accessible -->
<button onclick="action()">Submit</button>

<!-- Custom div button needs keyboard handling -->
<div role="button" tabindex="0"
     onclick="action()"
     onkeydown="if(event.key===' '||event.key==='Enter')action()">
  Custom Button
</div>
```

### Tabs

```html
<div class="tabs" role="tablist" aria-label="Settings">
  <button role="tab" aria-selected="true"
          aria-controls="general-panel"
          id="general-tab">General</button>
  <button role="tab" aria-selected="false"
          aria-controls="advanced-panel"
          id="advanced-tab">Advanced</button>
</div>

<div role="tabpanel" id="general-panel"
     aria-labelledby="general-tab">
  General settings...
</div>

<div role="tabpanel" id="advanced-panel"
     aria-labelledby="advanced-tab" hidden>
  Advanced settings...
</div>
```

```js
document.querySelector('.tabs').addEventListener('keydown', (e) => {
  const tabs = Array.from(e.currentTarget.querySelectorAll('[role="tab"]'));
  const currentIndex = tabs.indexOf(document.activeElement);

  switch (e.key) {
    case 'ArrowRight':
      e.preventDefault();
      const next = (currentIndex + 1) % tabs.length;
      tabs[next].focus();
      break;
    case 'ArrowLeft':
      e.preventDefault();
      const prev = (currentIndex - 1 + tabs.length) % tabs.length;
      tabs[prev].focus();
      break;
    case 'Home':
      e.preventDefault();
      tabs[0].focus();
      break;
    case 'End':
      e.preventDefault();
      tabs[tabs.length - 1].focus();
      break;
  }
});
```

### Menu / Navigation

```html
<nav aria-label="Main navigation">
  <ul class="nav-list">
    <li><a href="/">Home</a></li>
    <li class="has-submenu">
      <button aria-expanded="false" aria-haspopup="true">
        Products ▾
      </button>
      <ul class="submenu" role="menu">
        <li role="none">
          <a href="/products/laptops" role="menuitem">Laptops</a>
        </li>
        <li role="none">
          <a href="/products/phones" role="menuitem">Phones</a>
        </li>
      </ul>
    </li>
    <li><a href="/contact">Contact</a></li>
  </ul>
</nav>
```

```js
document.querySelectorAll('.has-submenu > button').forEach(btn => {
  btn.addEventListener('click', () => {
    const expanded = btn.getAttribute('aria-expanded') === 'true';
    btn.setAttribute('aria-expanded', !expanded);
  });

  btn.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      const firstItem = btn.nextElementSibling.querySelector('a');
      firstItem?.focus();
    }
  });
});
```

### Modal Dialog

```html
<div id="dialog" role="dialog" aria-modal="true"
     aria-labelledby="dialog-title" hidden>
  <h2 id="dialog-title">Confirm Deletion</h2>
  <button onclick="closeDialog()">Cancel</button>
  <button onclick="confirmDelete()" id="confirmBtn">Delete</button>
</div>
<div id="overlay" class="overlay" hidden></div>
```

```js
function openDialog() {
  document.getElementById('dialog').hidden = false;
  document.getElementById('overlay').hidden = false;
  // Focus the first focusable element
  document.getElementById('confirmBtn').focus();
  // Prevent focus from leaving the dialog
  document.addEventListener('keydown', trapFocus);
}

function closeDialog() {
  document.getElementById('dialog').hidden = true;
  document.getElementById('overlay').hidden = true;
  document.removeEventListener('keydown', trapFocus);
  // Return focus to trigger element
  document.getElementById('openBtn').focus();
}

function trapFocus(e) {
  const dialog = document.getElementById('dialog');
  const focusable = dialog.querySelectorAll(
    'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
  );
  const first = focusable[0];
  const last = focusable[focusable.length - 1];

  if (e.key === 'Tab') {
    if (e.shiftKey && document.activeElement === first) {
      e.preventDefault();
      last.focus();
    } else if (!e.shiftKey && document.activeElement === last) {
      e.preventDefault();
      first.focus();
    }
  }

  if (e.key === 'Escape') {
    closeDialog();
  }
}
```

## Disabled Elements

```html
<!-- Disabled buttons should not receive focus -->
<button disabled>Not available</button>

<!-- But still want to show tooltip? Use aria-disabled instead -->
<button aria-disabled="true" tabindex="0"
        onclick="showTooltip()">
  Coming Soon
</button>
```

```css
[aria-disabled="true"] {
  opacity: 0.5;
  cursor: not-allowed;
}
```

## Focus Management Best Practices

```js
// After dynamic content updates
function loadNewContent() {
  const container = document.getElementById('new-content');
  container.innerHTML = '<h2>New Section</h2><p>Content...</p>';
  container.tabIndex = -1;
  container.focus();
}

// After route changes (SPA)
function navigate(hash) {
  history.pushState(null, '', hash);
  const main = document.querySelector('main');
  main.innerHTML = getContentForRoute(hash);
  main.tabIndex = -1;
  main.focus();
  main.addEventListener('blur', () => main.removeAttribute('tabindex'), { once: true });
}

// Notify screen readers of dynamic changes
function announce(message) {
  const announcer = document.getElementById('announcer') || (() => {
    const el = document.createElement('div');
    el.id = 'announcer';
    el.setAttribute('aria-live', 'polite');
    el.setAttribute('aria-atomic', 'true');
    el.className = 'sr-only';
    document.body.appendChild(el);
    return el;
  })();
  announcer.textContent = '';
  requestAnimationFrame(() => {
    announcer.textContent = message;
  });
}
```

```css
/* Visually hidden but available to screen readers */
.sr-only {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border: 0;
}
```

## Practice

1. Build a custom dropdown menu that is fully keyboard accessible with arrow keys, Enter to expand/collapse, and Escape to close.
2. Create a modal dialog with complete focus trapping, ESC to close, and focus return on close.
3. Implement a tab panel with full keyboard navigation (arrow keys, Home, End).
4. Add a skip link to a page with a complex layout (header nav, sidebar, main content, footer) that skips directly to main content.
