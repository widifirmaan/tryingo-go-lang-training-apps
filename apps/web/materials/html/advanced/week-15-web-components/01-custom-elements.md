# Custom Elements

## Overview

Custom Elements allow you to define your own HTML elements with custom behavior.

### Lifecycle Methods

```js
class MyElement extends HTMLElement {
  constructor() {
    super();
    // Init state, no DOM access yet
  }

  // Called when element is added to DOM
  connectedCallback() {
    this.render();
    this.setupListeners();
  }

  // Called when element is removed from DOM
  disconnectedCallback() {
    this.cleanup();
  }

  // Called when an observed attribute changes
  attributeChangedCallback(name, oldValue, newValue) {
    if (oldValue !== newValue) {
      this.render();
    }
  }

  // Called when element is adopted into a new document
  adoptedCallback() {
    console.log('Element adopted');
  }

  // Specify which attributes to observe
  static get observedAttributes() {
    return ['name', 'disabled', 'value'];
  }
}

customElements.define('my-element', MyElement);
```

## Basic Custom Element

```html
<custom-greeting name="World"></custom-greeting>
```

```js
class CustomGreeting extends HTMLElement {
  constructor() {
    super();
    this._name = 'Guest';
  }

  static get observedAttributes() {
    return ['name'];
  }

  attributeChangedCallback(name, oldValue, newValue) {
    if (name === 'name' && oldValue !== newValue) {
      this._name = newValue;
      this.updateDisplay();
    }
  }

  connectedCallback() {
    this._name = this.getAttribute('name') || 'Guest';
    this.render();
  }

  render() {
    this.innerHTML = `
      <div class="greeting">
        <h2>Hello, ${this._name}!</h2>
        <button class="greet-btn">Greet</button>
      </div>
    `;

    this.querySelector('.greet-btn')
      .addEventListener('click', () => alert(`Hi ${this._name}!`));
  }

  updateDisplay() {
    const h2 = this.querySelector('h2');
    if (h2) h2.textContent = `Hello, ${this._name}!`;
  }
}

customElements.define('custom-greeting', CustomGreeting);
```

## Interactive Component: Rating Stars

```html
<star-rating max="5" value="3" readonly></star-rating>
```

```js
class StarRating extends HTMLElement {
  constructor() {
    super();
    this._value = 0;
    this._max = 5;
    this._readonly = false;
  }

  static get observedAttributes() {
    return ['value', 'max', 'readonly'];
  }

  attributeChangedCallback(name, oldValue, newValue) {
    if (oldValue === newValue) return;

    switch (name) {
      case 'value':
        this._value = parseInt(newValue) || 0;
        break;
      case 'max':
        this._max = parseInt(newValue) || 5;
        break;
      case 'readonly':
        this._readonly = newValue !== null;
        break;
    }
    this.render();
  }

  connectedCallback() {
    this._value = parseInt(this.getAttribute('value')) || 0;
    this._max = parseInt(this.getAttribute('max')) || 5;
    this._readonly = this.hasAttribute('readonly');
    this.render();
  }

  render() {
    this.innerHTML = `
      <div class="star-rating" style="display: inline-flex; gap: 4px;">
        ${Array.from({ length: this._max }, (_, i) => `
          <span class="star" data-index="${i}"
                style="cursor: ${this._readonly ? 'default' : 'pointer'};
                       font-size: 1.5em;
                       color: ${i < this._value ? '#f1c40f' : '#ddd'};
                       transition: color 0.2s;">
            ★
          </span>
        `).join('')}
        <span class="rating-value" style="margin-left: 8px; font-size: 0.9em; color: #666;">
          ${this._value}/${this._max}
        </span>
      </div>
    `;

    if (!this._readonly) {
      this.querySelectorAll('.star').forEach(star => {
        star.addEventListener('click', () => {
          const value = parseInt(star.dataset.index) + 1;
          this.setAttribute('value', value);
          this.dispatchEvent(new CustomEvent('rating-change', {
            detail: { value },
            bubbles: true
          }));
        });

        star.addEventListener('mouseenter', () => {
          const hoverValue = parseInt(star.dataset.index) + 1;
          this.querySelectorAll('.star').forEach((s, i) => {
            s.style.color = i < hoverValue ? '#f1c40f' : '#ddd';
          });
        });

        star.addEventListener('mouseleave', () => {
          this.querySelectorAll('.star').forEach((s, i) => {
            s.style.color = i < this._value ? '#f1c40f' : '#ddd';
          });
        });
      });
    }
  }

  get value() { return this._value; }
  set value(v) {
    this.setAttribute('value', v);
  }
}

customElements.define('star-rating', StarRating);
```

### Usage with Event

```js
document.querySelector('star-rating').addEventListener('rating-change', (e) => {
  console.log('Rating:', e.detail.value);
});
```

## Form-Associated Custom Elements

```html
<form>
  <custom-input name="email" type="email" placeholder="Enter email"
                required></custom-input>
  <custom-input name="password" type="password" placeholder="Password"
                required minlength="8"></custom-input>
  <button type="submit">Submit</button>
</form>
```

```js
class CustomInput extends HTMLElement {
  static formAssociated = true;

  constructor() {
    super();
    this._internals = this.attachInternals();
    this._value = '';
  }

  static get observedAttributes() {
    return ['type', 'placeholder', 'required', 'minlength', 'disabled'];
  }

  connectedCallback() {
    this.render();
    this.setupValidation();
  }

  render() {
    this.innerHTML = `
      <div class="custom-input">
        <input type="${this.getAttribute('type') || 'text'}"
               placeholder="${this.getAttribute('placeholder') || ''}"
               ${this.hasAttribute('required') ? 'required' : ''}
               minlength="${this.getAttribute('minlength') || ''}"
               ${this.hasAttribute('disabled') ? 'disabled' : ''}>
        <span class="error-message" style="color: red; font-size: 0.8em;"></span>
      </div>
    `;

    const input = this.querySelector('input');
    input.addEventListener('input', () => {
      this._value = input.value;
      this._internals.setFormValue(this._value);
      this.validate();
    });
  }

  setupValidation() {
    const input = this.querySelector('input');
    input.addEventListener('invalid', (e) => {
      e.preventDefault();
      this.validate();
    });
  }

  validate() {
    const input = this.querySelector('input');
    const errorEl = this.querySelector('.error-message');

    if (input.validity.valueMissing) {
      errorEl.textContent = 'This field is required';
      this._internals.setValidity({ valueMissing: true }, 'Required', input);
    } else if (input.validity.typeMismatch) {
      errorEl.textContent = 'Please enter a valid value';
      this._internals.setValidity({ typeMismatch: true }, 'Invalid type', input);
    } else if (input.validity.tooShort) {
      errorEl.textContent = `Minimum ${input.minLength} characters`;
      this._internals.setValidity({ tooShort: true }, 'Too short', input);
    } else {
      errorEl.textContent = '';
      this._internals.setValidity({});
    }
  }

  get value() { return this._value; }
  set value(v) { this._value = v; this.render(); }
}

customElements.define('custom-input', CustomInput);
```

## Practice

1. Create a `<progress-bar>` custom element that accepts `value`, `max`, and `color` attributes and animates on change.
2. Build a `<tooltip-element>` that shows a tooltip on hover with customizable position (top, bottom, left, right).
3. Create a `<toggle-switch>` form-associated custom element that works with forms and submits its value.
4. Build a `<countdown-timer>` that counts down from a specified time and dispatches events when complete.
