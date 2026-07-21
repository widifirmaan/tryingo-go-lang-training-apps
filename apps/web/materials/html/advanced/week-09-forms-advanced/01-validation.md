# Form Validation

## Constraint Validation API

HTML5 provides built-in form validation through the **Constraint Validation API**.

### Basic Validation Attributes

```html
<form id="registerForm">
  <label for="email">Email (required):</label>
  <input type="email" id="email" name="email" required>

  <label for="age">Age (18-120):</label>
  <input type="number" id="age" name="age" min="18" max="120" required>

  <label for="url">Website:</label>
  <input type="url" id="url" name="url">

  <label for="password">Password (8+ chars, 1 number):</label>
  <input type="password" id="password" name="password"
         pattern="(?=.*\d).{8,}" required>

  <button type="submit">Submit</button>
</form>
```

### Custom Validation Messages

```js
const email = document.getElementById('email');
email.addEventListener('input', () => {
  if (email.validity.typeMismatch) {
    email.setCustomValidity('Please enter a valid email address');
  } else if (email.validity.valueMissing) {
    email.setCustomValidity('Email is required');
  } else {
    email.setCustomValidity('');
  }
});
```

### Validation Methods

| Method/Property | Description |
|----------------|-------------|
| `checkValidity()` | Returns true if element passes validation |
| `reportValidity()` | Checks and shows validation UI |
| `setCustomValidity(msg)` | Sets custom error message |
| `validity.valid` | True if element passes all constraints |
| `validationMessage` | Returns the error message |

### Real-Time Validation Example

```html
<form>
  <label for="username">Username:</label>
  <input type="text" id="username" name="username"
         minlength="3" maxlength="20"
         pattern="[a-zA-Z0-9_]+" required>
  <span id="usernameError" class="error"></span>

  <label for="confirm">Confirm Password:</label>
  <input type="password" id="confirm" name="confirm" required>
  <span id="confirmError" class="error"></span>

  <button type="submit">Register</button>
</form>
```

```js
const username = document.getElementById('username');
const confirm = document.getElementById('confirm');

username.addEventListener('input', () => {
  const error = document.getElementById('usernameError');
  if (username.validity.tooShort) {
    error.textContent = 'Minimum 3 characters';
  } else if (username.validity.patternMismatch) {
    error.textContent = 'Only letters, numbers, underscores';
  } else {
    error.textContent = '';
  }
});

confirm.addEventListener('input', () => {
  const error = document.getElementById('confirmError');
  const password = document.getElementById('password');
  if (confirm.value !== password.value) {
    confirm.setCustomValidity('Passwords must match');
    error.textContent = 'Passwords do not match';
  } else {
    confirm.setCustomValidity('');
    error.textContent = '';
  }
});
```

## Constraint Validation Properties

```js
const input = document.getElementById('email');
const validity = input.validity;

// Check all validity states
if (validity.valueMissing) { /* empty required field */ }
if (validity.typeMismatch) { /* wrong type format */ }
if (validity.patternMismatch) { /* doesn't match pattern */ }
if (validity.tooLong) { /* exceeds maxlength */ }
if (validity.tooShort) { /* under minlength */ }
if (validity.rangeUnderflow) { /* below min */ }
if (validity.rangeOverflow) { /* above max */ }
if (validity.stepMismatch) { /* not matching step */ }
if (validity.badInput) { /* unparseable input */ }
if (validity.customError) { /* custom validity set */ }
```

### Preventing Form Submission

```js
document.getElementById('registerForm').addEventListener('submit', (e) => {
  const form = e.target;
  if (!form.checkValidity()) {
    e.preventDefault();
    // Focus first invalid field
    const firstInvalid = form.querySelector(':invalid');
    if (firstInvalid) firstInvalid.focus();
  }
});
```

### Styling Validation States

```css
input:valid {
  border-color: green;
}

input:invalid {
  border-color: red;
}

input:focus:invalid {
  box-shadow: 0 0 5px rgba(255, 0, 0, 0.5);
}

.error {
  color: red;
  font-size: 0.875em;
  min-height: 1.2em;
}
```

## Practice

1. Create a form with email, phone, and zip code fields. Each should have real-time validation messages using the Constraint Validation API.
2. Add a password field with requirements: 8-20 chars, at least one uppercase, one lowercase, one number, one special char.
3. Style `:valid` and `:invalid` states with different border colors and icons.
4. Implement a "confirm email" field that must match the email field using `setCustomValidity`.
