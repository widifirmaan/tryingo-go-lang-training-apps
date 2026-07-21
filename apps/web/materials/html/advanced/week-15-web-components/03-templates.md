# HTML Templates and Slots

## Overview

The `<template>` element holds HTML that isn't rendered until cloned with JavaScript. Combined with `<slot>`, it enables flexible content projection in Web Components.

## Basic Template

```html
<template id="card-template">
  <style>
    .card {
      border: 1px solid #ddd;
      border-radius: 8px;
      padding: 16px;
      background: #fff;
    }
    .card h3 { margin: 0 0 8px; }
    .card p { color: #666; margin: 0; }
  </style>
  <div class="card">
    <h3></h3>
    <p></p>
  </div>
</template>
```

```js
function createCard(title, content) {
  const template = document.getElementById('card-template');
  const clone = template.content.cloneNode(true);

  clone.querySelector('h3').textContent = title;
  clone.querySelector('p').textContent = content;

  return clone;
}

document.getElementById('container').appendChild(createCard('Card 1', 'Content here'));
document.getElementById('container').appendChild(createCard('Card 2', 'More content'));
```

## Templates in Custom Elements

```html
<template id="accordion-template">
  <style>
    :host { display: block; }
    .accordion-item {
      border: 1px solid #ddd;
      border-radius: 6px;
      margin-bottom: 4px;
      overflow: hidden;
    }
    .accordion-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 12px 16px;
      background: #f5f5f5;
      cursor: pointer;
      user-select: none;
    }
    .accordion-header:hover {
      background: #e8e8e8;
    }
    .accordion-content {
      padding: 0 16px;
      max-height: 0;
      overflow: hidden;
      transition: max-height 0.3s ease, padding 0.3s ease;
    }
    .accordion-item.open .accordion-content {
      max-height: 500px;
      padding: 16px;
    }
    .arrow {
      transition: transform 0.3s;
    }
    .accordion-item.open .arrow {
      transform: rotate(180deg);
    }
  </style>
  <div class="accordion-item">
    <div class="accordion-header" part="header">
      <slot name="title">Accordion Title</slot>
      <span class="arrow">▼</span>
    </div>
    <div class="accordion-content" part="content">
      <slot></slot>
    </div>
  </div>
</template>
```

```js
class AccordionItem extends HTMLElement {
  constructor() {
    super();
    const template = document.getElementById('accordion-template');
    this.attachShadow({ mode: 'open' });
    this.shadowRoot.appendChild(template.content.cloneNode(true));
  }

  connectedCallback() {
    const header = this.shadowRoot.querySelector('.accordion-header');
    header.addEventListener('click', () => this.toggle());

    if (this.hasAttribute('open')) {
      this.shadowRoot.querySelector('.accordion-item').classList.add('open');
    }
  }

  toggle() {
    const item = this.shadowRoot.querySelector('.accordion-item');
    item.classList.toggle('open');
    this.dispatchEvent(new CustomEvent('toggle', {
      detail: { open: item.classList.contains('open') },
      bubbles: true
    }));
  }
}

customElements.define('accordion-item', AccordionItem);
```

```html
<accordion-item open>
  <span slot="title">Section 1</span>
  <p>Content for section 1 goes here.</p>
</accordion-item>

<accordion-item>
  <span slot="title">Section 2</span>
  <p>Content for section 2 goes here.</p>
</accordion-item>
```

## Slot Change Events

```js
class SlotWatcher extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
  }

  connectedCallback() {
    this.shadowRoot.innerHTML = `
      <style>
        .container { padding: 16px; border: 2px dashed #3498db; }
        .empty-state { color: #999; font-style: italic; }
      </style>
      <div class="container">
        <slot id="mainSlot">
          <p class="empty-state">No content provided</p>
        </slot>
        <p>Slotted elements: <span id="count">0</span></p>
      </div>
    `;

    const slot = this.shadowRoot.getElementById('mainSlot');
    slot.addEventListener('slotchange', (e) => {
      const assigned = slot.assignedNodes({ flatten: true });
      const textNodes = assigned.filter(n => n.nodeType === Node.TEXT_NODE && n.textContent.trim());
      const elements = assigned.filter(n => n.nodeType === Node.ELEMENT_NODE);

      this.shadowRoot.getElementById('count').textContent = elements.length;

      // Show empty state if no content
      const empty = this.shadowRoot.querySelector('.empty-state');
      if (empty) {
        empty.style.display = elements.length === 0 ? 'block' : 'none';
      }

      console.log('Slot changed:', { assigned, elements, textNodes });
    });
  }
}

customElements.define('slot-watcher', SlotWatcher);
```

## Advanced Slot Patterns

```html
<template id="list-template">
  <style>
    .list-container { border: 1px solid #e0e0e0; border-radius: 8px; }
    .list-header {
      padding: 12px 16px;
      background: #f8f9fa;
      border-bottom: 1px solid #e0e0e0;
      font-weight: bold;
    }
    .list-items { padding: 8px; }
    .list-footer {
      padding: 12px 16px;
      background: #f8f9fa;
      border-top: 1px solid #e0e0e0;
      font-size: 0.9em;
      color: #666;
    }
  </style>
  <div class="list-container">
    <div class="list-header">
      <slot name="header">List</slot>
    </div>
    <div class="list-items">
      <slot></slot>
    </div>
    <div class="list-footer">
      <slot name="footer"></slot>
    </div>
  </div>
</template>
```

```html
<custom-list>
  <span slot="header">Shopping List</span>
  <ul>
    <li>Apples</li>
    <li>Bread</li>
    <li>Milk</li>
  </ul>
  <span slot="footer">3 items</span>
</custom-list>
```

```js
class CustomList extends HTMLElement {
  constructor() {
    super();
    const template = document.getElementById('list-template');
    this.attachShadow({ mode: 'open' });
    this.shadowRoot.appendChild(template.content.cloneNode(true));
  }
}

customElements.define('custom-list', CustomList);
```

## Practice

1. Create an `<icon-button>` component that uses templates and slots for button text and allows an icon to be slotted before or after the text.
2. Build a `<step-wizard>` component using templates with slots for each step's content and a footer slot for navigation buttons.
3. Create a `<toast-notification>` template-based component with slots for icon, message, and action button.
4. Build a `<card-grid>` component that uses templates to render a grid of cards from an array of data with slot-based customization.
