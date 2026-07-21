# Dialog Element

## Overview

The `<dialog>` element represents a dialog box or modal window, with built-in focus management and keyboard handling.

### Basic Dialog

```html
<dialog id="simpleDialog">
  <h2>Hello!</h2>
  <p>This is a dialog box.</p>
  <button id="closeDialog">Close</button>
</dialog>

<button id="openDialog">Open Dialog</button>
```

```js
const dialog = document.getElementById('simpleDialog');
document.getElementById('openDialog').addEventListener('click', () => {
  dialog.showModal(); // Opens as modal (blocks interaction with page)
});

document.getElementById('closeDialog').addEventListener('click', () => {
  dialog.close(); // Closes the dialog
});

// Close on Escape (built-in)
dialog.addEventListener('close', () => {
  console.log('Dialog was closed');
});
```

### Modal vs Non-modal

```js
// Modal: blocks interaction with rest of page
dialog.showModal();

// Non-modal: allows interaction with other elements
dialog.show();

// Close in both cases
dialog.close();
```

### Styling Dialog

```css
/* Dialog backdrop (modal only) */
dialog::backdrop {
  background: rgba(0, 0, 0, 0.5);
  backdrop-filter: blur(4px);
}

/* Dialog element */
dialog {
  padding: 0;
  border: none;
  border-radius: 12px;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
  max-width: 90vw;
  max-height: 90vh;
  overflow: hidden;
}

/* Remove default outer border */
dialog:focus {
  outline: none;
}

/* Animation */
dialog[open] {
  animation: slideIn 0.3s ease;
}

@keyframes slideIn {
  from {
    opacity: 0;
    transform: translateY(-30px) scale(0.95);
  }
  to {
    opacity: 1;
    transform: translateY(0) scale(1);
  }
}

dialog[open]::backdrop {
  animation: fadeIn 0.3s ease;
}

@keyframes fadeIn {
  from { opacity: 0; }
  to { opacity: 1; }
}
```

## Complete Modal Example

```html
<dialog id="modalDialog" class="modal-dialog">
  <div class="modal-header">
    <h2 id="modalTitle">Confirm Action</h2>
    <button class="modal-close" id="modalClose" aria-label="Close">✕</button>
  </div>
  <div class="modal-body">
    <p id="modalMessage">Are you sure you want to delete this item?</p>
  </div>
  <div class="modal-footer">
    <button class="btn btn-secondary" id="modalCancel">Cancel</button>
    <button class="btn btn-primary" id="modalConfirm">Confirm</button>
  </div>
</dialog>

<button id="showDeleteModal">Delete Item</button>
```

```css
.modal-dialog {
  width: 480px;
  padding: 0;
  border: none;
  border-radius: 12px;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
}

.modal-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 16px 24px;
  border-bottom: 1px solid #eee;
}

.modal-header h2 {
  margin: 0;
  font-size: 1.2em;
}

.modal-close {
  background: none;
  border: none;
  font-size: 1.2em;
  cursor: pointer;
  padding: 4px 8px;
  border-radius: 4px;
  color: #666;
}

.modal-close:hover { background: #f0f0f0; }

.modal-body {
  padding: 24px;
  line-height: 1.5;
}

.modal-footer {
  padding: 16px 24px;
  border-top: 1px solid #eee;
  display: flex;
  justify-content: flex-end;
  gap: 8px;
}

.btn {
  padding: 8px 16px;
  border-radius: 6px;
  border: 1px solid #ddd;
  cursor: pointer;
  font-size: 0.9em;
  transition: background 0.2s;
}

.btn-primary { background: #e74c3c; color: #fff; border-color: #e74c3c; }
.btn-primary:hover { background: #c0392b; }
.btn-secondary { background: #fff; }
.btn-secondary:hover { background: #f5f5f5; }
```

```js
const modal = document.getElementById('modalDialog');
const confirmBtn = document.getElementById('modalConfirm');
const cancelBtn = document.getElementById('modalCancel');
const closeBtn = document.getElementById('modalClose');

document.getElementById('showDeleteModal').addEventListener('click', () => {
  modal.showModal();
});

function closeModal() { modal.close(); }

confirmBtn.addEventListener('click', () => {
  // Perform action
  alert('Item deleted!');
  closeModal();
});

cancelBtn.addEventListener('click', closeModal);
closeBtn.addEventListener('click', closeModal);

// Prevent close on backdrop click by default
// To allow it:
modal.addEventListener('click', (e) => {
  if (e.target === modal) closeModal();
});
```

## Form in Dialog

```html
<dialog id="formDialog">
  <form method="dialog">
    <h2>Quick Feedback</h2>
    <label>
      Name:
      <input type="text" name="name" required>
    </label>
    <label>
      Rating:
      <select name="rating">
        <option value="5">Excellent</option>
        <option value="4">Good</option>
        <option value="3">Average</option>
        <option value="2">Poor</option>
        <option value="1">Terrible</option>
      </select>
    </label>
    <label>
      Comment:
      <textarea name="comment" rows="3"></textarea>
    </label>
    <div class="form-actions">
      <button type="submit" value="cancel" formnovalidate>Cancel</button>
      <button type="submit" value="submit">Submit</button>
    </div>
  </form>
</dialog>
```

```js
const formDialog = document.getElementById('formDialog');
const form = formDialog.querySelector('form');

form.addEventListener('submit', (e) => {
  // formmethod="dialog" means close returns the submitter's value
  const returnValue = formDialog.returnValue;

  if (returnValue === 'submit') {
    const formData = new FormData(form);
    console.log({
      name: formData.get('name'),
      rating: formData.get('rating'),
      comment: formData.get('comment')
    });
    alert('Thank you for your feedback!');
  }
  // 'cancel' just closes without action
});
```

## Focus Management

```js
// Dialog automatically focuses first focusable element
// Override focus behavior:
modal.addEventListener('open', () => {
  // Focus a specific element
  document.getElementById('modalCancel').focus();
});

// Trap focus within dialog (built-in for showModal)
// Return focus to trigger element on close
const triggerBtn = document.getElementById('showDeleteModal');

modal.addEventListener('close', () => {
  triggerBtn.focus();
});

// Custom focus trap for non-modal dialog
modal.addEventListener('keydown', (e) => {
  if (e.key === 'Tab') {
    const focusable = modal.querySelectorAll(
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
    );
    const first = focusable[0];
    const last = focusable[focusable.length - 1];

    if (e.shiftKey && document.activeElement === first) {
      e.preventDefault();
      last.focus();
    } else if (!e.shiftKey && document.activeElement === last) {
      e.preventDefault();
      first.focus();
    }
  }
});
```

## Practice

1. Create a sign-up modal with form fields, validation, and proper focus management.
2. Build a notification toast system that uses a non-modal `<dialog>` for each notification with auto-dismiss.
3. Create a lightbox gallery that opens an image in a dialog with next/previous navigation.
4. Build a confirmation dialog component with customizable title, message, and button labels.
