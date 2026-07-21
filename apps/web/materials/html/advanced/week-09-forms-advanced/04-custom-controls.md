# Custom Form Controls

## Why Custom Controls?

Native form controls can be inconsistent across browsers. Custom controls provide:
- Consistent appearance across platforms
- Enhanced functionality
- Better integration with design systems

## Custom Select

```html
<div class="custom-select" role="combobox"
     aria-haspopup="listbox" aria-expanded="false"
     tabindex="0">
  <div class="custom-select-trigger" aria-autocomplete="none">
    <span class="custom-select-value">Select an option</span>
    <span class="custom-select-arrow">▼</span>
  </div>
  <ul class="custom-select-options" role="listbox"
      aria-hidden="true">
    <li role="option" data-value="option1" aria-selected="false">
      <img src="icon1.svg" alt=""> Option 1
    </li>
    <li role="option" data-value="option2" aria-selected="false">
      <img src="icon2.svg" alt=""> Option 2
    </li>
    <li role="option" data-value="option3" aria-selected="false" disabled>
      Option 3 (disabled)
    </li>
  </ul>
  <input type="hidden" name="customSelect" id="customSelectInput">
</div>
```

```css
.custom-select {
  position: relative;
  display: inline-block;
  width: 100%;
  cursor: pointer;
  user-select: none;
}

.custom-select-trigger {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 10px 14px;
  border: 2px solid #ddd;
  border-radius: 6px;
  background: #fff;
  min-height: 44px;
}

.custom-select[aria-expanded="true"] .custom-select-trigger {
  border-color: #4a90d9;
  border-radius: 6px 6px 0 0;
}

.custom-select-arrow {
  transition: transform 0.2s;
}

.custom-select[aria-expanded="true"] .custom-select-arrow {
  transform: rotate(180deg);
}

.custom-select-options {
  position: absolute;
  top: 100%;
  left: 0;
  right: 0;
  margin: 0;
  padding: 0;
  list-style: none;
  border: 2px solid #4a90d9;
  border-top: none;
  border-radius: 0 0 6px 6px;
  background: #fff;
  max-height: 200px;
  overflow-y: auto;
  z-index: 100;
  display: none;
}

.custom-select[aria-expanded="true"] .custom-select-options {
  display: block;
}

.custom-select-options li {
  padding: 10px 14px;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 8px;
}

.custom-select-options li:hover,
.custom-select-options li[aria-selected="true"] {
  background: #e8f0fe;
}

.custom-select-options li[disabled] {
  color: #999;
  cursor: not-allowed;
}
```

```js
class CustomSelect {
  constructor(element) {
    this.container = element;
    this.trigger = element.querySelector('.custom-select-trigger');
    this.valueSpan = element.querySelector('.custom-select-value');
    this.optionsList = element.querySelector('.custom-select-options');
    this.hiddenInput = element.querySelector('input[type="hidden"]');
    this.options = Array.from(element.querySelectorAll('[role="option"]'));
    this.selectedIndex = -1;
    this.isOpen = false;

    this.init();
  }

  init() {
    this.trigger.addEventListener('click', () => this.toggle());
    this.container.addEventListener('keydown', (e) => this.handleKeydown(e));

    this.options.forEach((option, index) => {
      option.addEventListener('click', () => this.select(index));

      option.addEventListener('mousedown', (e) => {
        e.preventDefault();
        this.select(index);
      });
    });

    document.addEventListener('click', (e) => {
      if (!this.container.contains(e.target)) {
        this.close();
      }
    });
  }

  toggle() {
    this.isOpen ? this.close() : this.open();
  }

  open() {
    if (this.isOpen) return;
    this.isOpen = true;
    this.container.setAttribute('aria-expanded', 'true');
    this.optionsList.setAttribute('aria-hidden', 'false');

    // Focus selected option or first
    const target = this.selectedIndex >= 0
      ? this.options[this.selectedIndex]
      : this.options[0];
    target?.focus();
  }

  close() {
    if (!this.isOpen) return;
    this.isOpen = false;
    this.container.setAttribute('aria-expanded', 'false');
    this.optionsList.setAttribute('aria-hidden', 'true');
    this.trigger.focus();
  }

  select(index) {
    const option = this.options[index];
    if (!option || option.hasAttribute('disabled')) return;

    // Deselect previous
    if (this.selectedIndex >= 0) {
      this.options[this.selectedIndex]
        .setAttribute('aria-selected', 'false');
    }

    this.selectedIndex = index;
    option.setAttribute('aria-selected', 'true');
    this.valueSpan.textContent = option.textContent.trim();
    this.hiddenInput.value = option.dataset.value;
    this.close();
  }

  handleKeydown(e) {
    switch (e.key) {
      case 'Enter':
      case ' ':
        e.preventDefault();
        if (this.isOpen && this.selectedIndex >= 0) {
          this.select(this.selectedIndex);
        } else {
          this.toggle();
        }
        break;
      case 'ArrowDown':
        e.preventDefault();
        if (this.isOpen) {
          const next = Math.min(this.selectedIndex + 1, this.options.length - 1);
          this.options[next]?.focus();
        } else {
          this.open();
        }
        break;
      case 'ArrowUp':
        e.preventDefault();
        if (this.isOpen) {
          const prev = Math.max(this.selectedIndex - 1, 0);
          this.options[prev]?.focus();
        }
        break;
      case 'Escape':
        e.preventDefault();
        this.close();
        break;
      case 'Tab':
        this.close();
        break;
    }
  }
}

// Initialize
document.querySelectorAll('.custom-select').forEach(el => new CustomSelect(el));
```

## Custom Range Slider

```html
<div class="custom-range" role="slider"
     aria-valuemin="0" aria-valuemax="100"
     aria-valuenow="50" aria-label="Volume"
     tabindex="0">
  <div class="range-track">
    <div class="range-fill" style="width: 50%"></div>
    <div class="range-thumb" style="left: 50%"></div>
  </div>
  <div class="range-value">50%</div>
  <input type="hidden" name="volume" value="50">
</div>
```

```css
.custom-range {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 8px 0;
  cursor: pointer;
  touch-action: none;
}

.range-track {
  position: relative;
  width: 200px;
  height: 8px;
  background: #e0e0e0;
  border-radius: 4px;
}

.range-fill {
  position: absolute;
  top: 0;
  left: 0;
  height: 100%;
  background: #4a90d9;
  border-radius: 4px;
  pointer-events: none;
}

.range-thumb {
  position: absolute;
  top: 50%;
  width: 24px;
  height: 24px;
  background: #fff;
  border: 2px solid #4a90d9;
  border-radius: 50%;
  transform: translate(-50%, -50%);
  pointer-events: none;
  box-shadow: 0 2px 4px rgba(0,0,0,0.2);
}

.range-value {
  min-width: 40px;
  font-weight: bold;
  font-family: monospace;
}
```

```js
class CustomRange {
  constructor(element) {
    this.container = element;
    this.track = element.querySelector('.range-track');
    this.fill = element.querySelector('.range-fill');
    this.thumb = element.querySelector('.range-thumb');
    this.valueDisplay = element.querySelector('.range-value');
    this.hiddenInput = element.querySelector('input[type="hidden"]');
    this.min = parseInt(element.getAttribute('aria-valuemin'));
    this.max = parseInt(element.getAttribute('aria-valuemax'));
    this.value = parseInt(element.getAttribute('aria-valuenow'));
    this.dragging = false;

    this.init();
  }

  init() {
    this.updateUI();

    this.track.addEventListener('mousedown', (e) => this.startDrag(e));
    this.track.addEventListener('touchstart', (e) => this.startDrag(e), { passive: false });
    document.addEventListener('mousemove', (e) => this.drag(e));
    document.addEventListener('touchmove', (e) => this.drag(e), { passive: false });
    document.addEventListener('mouseup', () => this.stopDrag());
    document.addEventListener('touchend', () => this.stopDrag());

    this.container.addEventListener('keydown', (e) => {
      switch (e.key) {
        case 'ArrowRight':
        case 'ArrowUp':
          e.preventDefault();
          this.setValue(Math.min(this.value + 5, this.max));
          break;
        case 'ArrowLeft':
        case 'ArrowDown':
          e.preventDefault();
          this.setValue(Math.max(this.value - 5, this.min));
          break;
        case 'Home':
          e.preventDefault();
          this.setValue(this.min);
          break;
        case 'End':
          e.preventDefault();
          this.setValue(this.max);
          break;
      }
    });
  }

  startDrag(e) {
    this.dragging = true;
    this.container.focus();
    this.updateFromEvent(e);
  }

  drag(e) {
    if (!this.dragging) return;
    e.preventDefault();
    this.updateFromEvent(e);
  }

  stopDrag() {
    this.dragging = false;
  }

  updateFromEvent(e) {
    const rect = this.track.getBoundingClientRect();
    const clientX = e.touches ? e.touches[0].clientX : e.clientX;
    const percent = Math.max(0, Math.min(1, (clientX - rect.left) / rect.width));
    const value = Math.round(this.min + percent * (this.max - this.min));
    this.setValue(value);
  }

  setValue(value) {
    this.value = Math.max(this.min, Math.min(this.max, value));
    this.container.setAttribute('aria-valuenow', this.value);
    this.updateUI();
  }

  updateUI() {
    const percent = ((this.value - this.min) / (this.max - this.min)) * 100;
    this.fill.style.width = `${percent}%`;
    this.thumb.style.left = `${percent}%`;
    this.valueDisplay.textContent = `${this.value}%`;
    this.hiddenInput.value = this.value;
  }
}

document.querySelectorAll('.custom-range').forEach(el => new CustomRange(el));
```

## Custom Toggle Switch

```html
<label class="toggle-switch" role="switch"
       aria-checked="false" tabindex="0">
  <span class="toggle-track">
    <span class="toggle-thumb"></span>
  </span>
  <span class="toggle-label">Dark Mode</span>
  <input type="checkbox" hidden aria-hidden="true">
</label>
```

```css
.toggle-switch {
  display: inline-flex;
  align-items: center;
  gap: 12px;
  cursor: pointer;
  user-select: none;
}

.toggle-track {
  display: inline-block;
  width: 50px;
  height: 26px;
  background: #ccc;
  border-radius: 13px;
  position: relative;
  transition: background 0.3s;
}

.toggle-thumb {
  position: absolute;
  top: 3px;
  left: 3px;
  width: 20px;
  height: 20px;
  background: #fff;
  border-radius: 50%;
  transition: transform 0.3s;
  box-shadow: 0 1px 3px rgba(0,0,0,0.3);
}

.toggle-switch[aria-checked="true"] .toggle-track {
  background: #4a90d9;
}

.toggle-switch[aria-checked="true"] .toggle-thumb {
  transform: translateX(24px);
}

.toggle-switch:focus-visible .toggle-track {
  outline: 2px solid #4a90d9;
  outline-offset: 2px;
}
```

```js
document.querySelectorAll('.toggle-switch').forEach(el => {
  const checkbox = el.querySelector('input[type="checkbox"]');
  const handleToggle = () => {
    const checked = el.getAttribute('aria-checked') === 'true';
    el.setAttribute('aria-checked', !checked);
    checkbox.checked = !checked;
  };

  el.addEventListener('click', handleToggle);
  el.addEventListener('keydown', (e) => {
    if (e.key === ' ' || e.key === 'Enter') {
      e.preventDefault();
      handleToggle();
    }
  });
});
```

## Form Data Integration

```js
// Collect custom control values on form submit
document.getElementById('myForm').addEventListener('submit', (e) => {
  const formData = new FormData(e.target);

  // Custom select value comes from hidden input automatically
  // Custom range value comes from hidden input automatically
  // Custom toggle comes from hidden input (if added)

  // Alternatively, build FormData manually
  const customData = {
    customSelect: document.getElementById('customSelectInput').value,
    volume: document.querySelector('input[name="volume"]').value
  };

  console.log('Form submitted with:', Object.fromEntries(formData));
  console.log('Custom data:', customData);
});
```

## Practice

1. Build a custom file upload button that shows the selected filename, file size, and a preview thumbnail for images.
2. Create a custom multi-select component with chips/tags that are removable.
3. Implement a custom color picker that shows a 5x5 grid of preset colors with a custom hex input.
4. Build a custom star rating widget (1-5 stars) with proper keyboard accessibility and aria attributes.
