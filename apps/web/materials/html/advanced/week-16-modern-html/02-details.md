# Details and Summary

## Overview

The `<details>` and `<summary>` elements create a disclosure widget that can be expanded and collapsed without JavaScript.

### Basic Usage

```html
<details>
  <summary>Click to expand</summary>
  <p>This content is hidden until the summary is clicked.</p>
  <ul>
    <li>Item one</li>
    <li>Item two</li>
    <li>Item three</li>
  </ul>
</details>
```

## Attributes

```html
<!-- Open by default -->
<details open>
  <summary>FAQ Section</summary>
  <p>This content is visible on page load.</p>
</details>

<!-- With name attribute (accordion group) -->
<details name="faq">
  <summary>What is HTML?</summary>
  <p>HTML is HyperText Markup Language.</p>
</details>
<details name="faq">
  <summary>What is CSS?</summary>
  <p>CSS is Cascading Style Sheets.</p>
</details>
<details name="faq">
  <summary>What is JavaScript?</summary>
  <p>JavaScript is a programming language.</p>
</details>
```

## Styling

```css
details {
  border: 1px solid #ddd;
  border-radius: 8px;
  margin-bottom: 8px;
  overflow: hidden;
  transition: border-color 0.3s;
}

details[open] {
  border-color: #3498db;
}

summary {
  padding: 12px 16px;
  background: #f8f9fa;
  cursor: pointer;
  font-weight: 600;
  user-select: none;
  display: flex;
  align-items: center;
  gap: 8px;
  list-style: none; /* Remove default triangle */
}

summary::-webkit-details-marker {
  display: none; /* Remove triangle in WebKit */
}

summary::before {
  content: '▶';
  font-size: 0.8em;
  transition: transform 0.3s;
  color: #3498db;
}

details[open] summary::before {
  content: '▼';
}

summary:hover {
  background: #f0f0f0;
}

details > :not(summary) {
  padding: 16px;
  line-height: 1.6;
}

/* Animation for open/close */
details[open] > :not(summary) {
  animation: expandIn 0.3s ease;
}

@keyframes expandIn {
  from {
    opacity: 0;
    transform: translateY(-8px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
```

## Events

```js
document.querySelectorAll('details').forEach(details => {
  details.addEventListener('toggle', (e) => {
    if (details.open) {
      console.log('Opened:', details.querySelector('summary').textContent);
    } else {
      console.log('Closed:', details.querySelector('summary').textContent);
    }
  });
});
```

## Advanced Patterns

### Accordion (Single Open)

```html
<div class="accordion">
  <details name="acc" class="accordion-item">
    <summary>Section 1</summary>
    <p>Content for section 1</p>
  </details>
  <details name="acc" class="accordion-item">
    <summary>Section 2</summary>
    <p>Content for section 2</p>
  </details>
  <details name="acc" class="accordion-item">
    <summary>Section 3</summary>
    <p>Content for section 3</p>
  </details>
</div>
```

### Custom Toggle Icon

```css
.custom-details {
  border: none;
  border-bottom: 1px solid #eee;
  border-radius: 0;
}

.custom-details summary {
  background: none;
  padding: 16px 40px 16px 0;
  position: relative;
}

.custom-details summary::before {
  content: none;
}

.custom-details summary::after {
  content: '+';
  position: absolute;
  right: 0;
  top: 50%;
  transform: translateY(-50%);
  font-size: 1.5em;
  font-weight: 300;
  color: #999;
  transition: transform 0.3s;
}

.custom-details[open] summary::after {
  content: '−';
}
```

### Nested Details

```html
<details>
  <summary>Category: Programming</summary>
  <details>
    <summary>Frontend</summary>
    <ul>
      <li>HTML</li>
      <li>CSS</li>
      <li>JavaScript</li>
    </ul>
  </details>
  <details>
    <summary>Backend</summary>
    <ul>
      <li>Node.js</li>
      <li>Python</li>
      <li>Go</li>
    </ul>
  </details>
</details>
```

### Filter/Search Integration

```html
<input type="text" id="filterInput" placeholder="Filter FAQs...">

<details name="faq-filter">
  <summary>What is HTML5?</summary>
  <p>HTML5 is the latest version of HTML.</p>
</details>
<details name="faq-filter">
  <summary>What is CSS Grid?</summary>
  <p>CSS Grid is a 2D layout system.</p>
</details>
<details name="faq-filter">
  <summary>What is Flexbox?</summary>
  <p>Flexbox is a 1D layout system.</p>
</details>
```

```js
const filterInput = document.getElementById('filterInput');
const detailsElements = document.querySelectorAll('[name="faq-filter"]');

filterInput.addEventListener('input', () => {
  const query = filterInput.value.toLowerCase();

  detailsElements.forEach(details => {
    const text = details.textContent.toLowerCase();
    const match = text.includes(query);

    details.style.display = match ? '' : 'none';

    // Auto-open if matches filter
    if (match && query.length > 0) {
      details.open = true;
    } else if (!match) {
      details.open = false;
    }
  });
});
```

## Custom JavaScript Implementation

```js
class CustomDisclosure {
  constructor(element) {
    this.details = element;
    this.summary = element.querySelector('summary');
    this.content = Array.from(element.children).filter(
      child => child !== this.summary
    );

    this.init();
  }

  init() {
    this.summary.addEventListener('click', (e) => {
      e.preventDefault();
      this.toggle();
    });

    this.summary.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        this.toggle();
      }
    });
  }

  toggle() {
    const isOpen = this.details.hasAttribute('open');

    if (isOpen) {
      this.close();
    } else {
      this.open();
    }
  }

  open() {
    this.details.setAttribute('open', '');
    this.dispatchEvent('open');
  }

  close() {
    this.details.removeAttribute('open');
    this.dispatchEvent('close');
  }

  dispatchEvent(type) {
    this.details.dispatchEvent(new CustomEvent(type, {
      bubbles: true,
      detail: { disclosure: this }
    }));
  }
}

document.querySelectorAll('details').forEach(el => new CustomDisclosure(el));
```

## Practice

1. Build an FAQ page with 10+ questions using `<details>`. Style with custom icons and animations.
2. Create a collapsible sidebar navigation using `<details>` with nested sections.
3. Build a "Read More" component that truncates text after 3 lines and uses `<details>` to expand.
4. Create a settings panel with grouped options using `<details name="...">` for mutually exclusive sections.
