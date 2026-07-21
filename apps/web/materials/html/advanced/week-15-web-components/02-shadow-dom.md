# Shadow DOM

## Overview

Shadow DOM provides encapsulation for DOM trees and CSS. It's the foundation of component isolation in Web Components.

### Basic Shadow DOM

```js
class ShadowComponent extends HTMLElement {
  constructor() {
    super();
    // Attach shadow root in 'open' mode (accessible via element.shadowRoot)
    this.attachShadow({ mode: 'open' });
    // 'closed' mode: element.shadowRoot returns null
  }

  connectedCallback() {
    this.render();
  }

  render() {
    this.shadowRoot.innerHTML = `
      <style>
        :host {
          display: block;
          padding: 16px;
          border: 2px solid #3498db;
          border-radius: 8px;
        }

        :host(.important) {
          border-color: #e74c3c;
          background: #fdf0ef;
        }

        :host-context(.dark-mode) {
          background: #2c3e50;
          color: #ecf0f1;
        }

        h2 {
          margin: 0 0 8px;
          color: #2c3e50;
        }

        ::slotted(p) {
          color: #666;
          line-height: 1.5;
        }

        .content {
          margin-top: 12px;
        }
      </style>

      <div class="wrapper">
        <h2>Shadow Component</h2>
        <div class="content">
          <slot></slot>
        </div>
        <div class="named-slots">
          <slot name="footer"></slot>
        </div>
      </div>
    `;
  }
}

customElements.define('shadow-component', ShadowComponent);
```

```html
<shadow-component class="important">
  <p>This content is projected into the shadow DOM via slot.</p>
  <p slot="footer">This goes to the named "footer" slot.</p>
</shadow-component>
```

## Styling Shadow DOM

```css
/* Style the host element from outside */
shadow-component {
  margin: 16px 0;
  display: block;
}

/* Style slotted content from outside (some properties pass through) */
shadow-component p {
  color: #333; /* Won't work - slotted content inherits */
}

/* Inheritable properties DO pass through */
shadow-component {
  font-family: 'Arial', sans-serif; /* Inherited by shadow content */
}
```

### CSS Custom Properties in Shadow DOM

```js
class ThemedButton extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
  }

  connectedCallback() {
    this.shadowRoot.innerHTML = `
      <style>
        :host {
          --btn-bg: #3498db;
          --btn-color: #fff;
          --btn-radius: 6px;
          --btn-padding: 10px 20px;
        }

        button {
          background: var(--btn-bg);
          color: var(--btn-color);
          border: none;
          border-radius: var(--btn-radius);
          padding: var(--btn-padding);
          font-size: 1em;
          cursor: pointer;
          transition: opacity 0.3s;
        }

        button:hover {
          opacity: 0.9;
        }

        button:disabled {
          opacity: 0.5;
          cursor: not-allowed;
        }
      </style>
      <button><slot></slot></button>
    `;
  }
}

customElements.define('themed-button', ThemedButton);
```

```css
/* Override shadow DOM CSS custom properties */
themed-button {
  --btn-bg: #2ecc71;
  --btn-radius: 20px;
  --btn-padding: 12px 32px;
}

themed-button.danger {
  --btn-bg: #e74c3c;
}
```

## Part and Theme

```js
class CustomCard extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
  }

  connectedCallback() {
    this.shadowRoot.innerHTML = `
      <style>
        .card {
          border: 1px solid var(--card-border, #ddd);
          border-radius: 8px;
          overflow: hidden;
        }

        .header {
          background: var(--card-header-bg, #f5f5f5);
          padding: 12px 16px;
          font-weight: bold;
        }

        .body {
          padding: 16px;
        }
      </style>
      <div class="card" part="card">
        <div class="header" part="header">
          <slot name="title">Default Title</slot>
        </div>
        <div class="body" part="body">
          <slot></slot>
        </div>
      </div>
    `;
  }
}

customElements.define('custom-card', CustomCard);
```

```css
/* Style using ::part() */
custom-card::part(card) {
  border-color: #3498db;
  box-shadow: 0 4px 12px rgba(52, 152, 219, 0.2);
}

custom-card::part(header) {
  background: #3498db;
  color: #fff;
}

custom-card::part(body) {
  padding: 24px;
}
```

## Composing Components

```html
<user-profile user-id="42">
  <img slot="avatar" src="avatar.jpg" alt="User avatar">
  <span slot="name">Alice Johnson</span>
  <p>Senior Web Developer with 10 years of experience.</p>
</user-profile>
```

```js
class UserProfile extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
  }

  static get observedAttributes() {
    return ['user-id'];
  }

  connectedCallback() {
    this.render();
  }

  render() {
    this.shadowRoot.innerHTML = `
      <style>
        :host {
          display: flex;
          gap: 16px;
          padding: 16px;
          border: 1px solid #e0e0e0;
          border-radius: 12px;
          background: #fff;
        }

        .avatar {
          width: 64px;
          height: 64px;
          border-radius: 50%;
          overflow: hidden;
          flex-shrink: 0;
        }

        ::slotted(img) {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }

        .info {
          flex: 1;
        }

        .name {
          font-size: 1.2em;
          font-weight: bold;
          margin: 0 0 4px;
        }

        .bio {
          color: #666;
          margin: 0;
          line-height: 1.5;
        }
      </style>

      <div class="avatar">
        <slot name="avatar">
          <div style="width:100%;height:100%;background:#ddd;
                      display:flex;align-items:center;justify-content:center;
                      color:#999;font-size:24px;">👤</div>
        </slot>
      </div>
      <div class="info">
        <div class="name"><slot name="name">Unknown User</slot></div>
        <div class="bio"><slot></slot></div>
      </div>
    `;
  }
}

customElements.define('user-profile', UserProfile);
```

## Practice

1. Create a `<modal-dialog>` component with Shadow DOM that has slots for title, content, and actions. Style via CSS custom properties.
2. Build a `<custom-tabs>` component using Shadow DOM with named slots for tab labels and content panels.
3. Create a `<data-table>` component that uses Shadow DOM for style encapsulation and accepts columns and rows as attributes.
4. Build a `<file-upload>` component with drag-and-drop support, preview, and progress indication, all style-isolated via Shadow DOM.
