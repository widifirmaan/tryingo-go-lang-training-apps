# Constraint Validation API

## Overview

The Constraint Validation API provides programmatic access to form validation states and methods.

### Validation Properties

```js
const input = document.getElementById('email');
const validity = input.validity;

// Check specific states
validity.valueMissing    // Required field is empty
validity.typeMismatch    // Wrong type (email, url, etc.)
validity.patternMismatch // Doesn't match pattern
validity.tooLong         // Exceeds maxlength
validity.tooShort        // Below minlength
validity.rangeUnderflow  // Below min
validity.rangeOverflow   // Above max
validity.stepMismatch    // Doesn't match step
validity.badInput        // Unparseable input
validity.customError     // Custom error set via setCustomValidity
validity.valid           // True if passes all constraints

// Other useful properties
input.validationMessage  // Error message string
input.willValidate       // True if element will be validated
```

### Validation Methods

```js
// Check validity (returns boolean)
const isValid = input.checkValidity();

// Check and show validation UI
const isValidWithUI = input.reportValidity();

// Set custom error
input.setCustomValidity('This field has a custom error');
input.setCustomValidity(''); // Clear custom error
```

## Building a Validation System

```js
class FormValidator {
  constructor(form) {
    this.form = form;
    this.fields = new Map();
    this.init();
  }

  init() {
    // Register all form controls
    const elements = this.form.querySelectorAll(
      'input, select, textarea'
    );

    elements.forEach(el => {
      if (el.willValidate) {
        this.fields.set(el, {
          errorElement: this.createErrorElement(el),
          validators: []
        });

        // Real-time validation
        el.addEventListener('input', () => this.validateField(el));
        el.addEventListener('blur', () => this.validateField(el));
        el.addEventListener('change', () => this.validateField(el));
      }
    });

    // Form submit
    this.form.addEventListener('submit', (e) => {
      if (!this.validateAll()) {
        e.preventDefault();
        this.focusFirstInvalid();
      }
    });
  }

  createErrorElement(input) {
    // Look for existing error element
    let error = input.parentElement.querySelector('.validation-error');
    if (!error) {
      error = document.createElement('span');
      error.className = 'validation-error';
      error.setAttribute('role', 'alert');
      error.setAttribute('aria-live', 'polite');
      input.parentElement.appendChild(error);
    }
    return error;
  }

  validateField(input) {
    const field = this.fields.get(input);
    if (!field) return true;

    // Run custom validators first
    for (const validator of field.validators) {
      const result = validator(input);
      if (result !== true) {
        this.showError(input, result);
        return false;
      }
    }

    // Check native validation
    if (!input.checkValidity()) {
      this.showError(input, input.validationMessage);
      return false;
    }

    this.clearError(input);
    input.setCustomValidity('');
    return true;
  }

  validateAll() {
    let isValid = true;
    for (const [input] of this.fields) {
      if (!this.validateField(input)) {
        isValid = false;
      }
    }
    return isValid;
  }

  showError(input, message) {
    const field = this.fields.get(input);
    if (field) {
      field.errorElement.textContent = message;
      input.setAttribute('aria-invalid', 'true');
      input.classList.add('is-invalid');
    }
  }

  clearError(input) {
    const field = this.fields.get(input);
    if (field) {
      field.errorElement.textContent = '';
      input.removeAttribute('aria-invalid');
      input.classList.remove('is-invalid');
      input.classList.add('is-valid');
    }
  }

  focusFirstInvalid() {
    const firstInvalid = this.form.querySelector('[aria-invalid="true"]');
    if (firstInvalid) {
      firstInvalid.focus();
    }
  }

  // Add custom validator
  addValidator(input, validatorFn) {
    const field = this.fields.get(input);
    if (field) {
      field.validators.push(validatorFn);
    }
  }

  // Add validator by field name
  addValidatorByName(name, validatorFn) {
    const input = this.form.querySelector(`[name="${name}"]`);
    if (input) this.addValidator(input, validatorFn);
  }
}

// Usage
const form = document.getElementById('registrationForm');
const validator = new FormValidator(form);

// Add custom validators
validator.addValidatorByName('password', (input) => {
  if (input.value.length < 8) {
    return 'Password must be at least 8 characters';
  }
  if (!/[A-Z]/.test(input.value)) {
    return 'Password must contain an uppercase letter';
  }
  if (!/[a-z]/.test(input.value)) {
    return 'Password must contain a lowercase letter';
  }
  if (!/[0-9]/.test(input.value)) {
    return 'Password must contain a number';
  }
  return true;
});

validator.addValidatorByName('confirmPassword', (input) => {
  const password = document.querySelector('[name="password"]');
  if (input.value !== password.value) {
    return 'Passwords must match';
  }
  return true;
});

validator.addValidatorByName('username', (input) => {
  if (input.value.length < 3) {
    return 'Username must be at least 3 characters';
  }
  if (!/^[a-zA-Z0-9_]+$/.test(input.value)) {
    return 'Username can only contain letters, numbers, and underscores';
  }
  return true;
});
```

```css
.is-valid {
  border-color: #2ecc71;
}

.is-invalid {
  border-color: #e74c3c;
}

.validation-error {
  display: block;
  color: #e74c3c;
  font-size: 0.85em;
  margin-top: 4px;
  min-height: 1.2em;
}

input:focus.is-valid {
  box-shadow: 0 0 0 3px rgba(46, 204, 113, 0.2);
}

input:focus.is-invalid {
  box-shadow: 0 0 0 3px rgba(231, 76, 60, 0.2);
}
```

## Practice

1. Build a complete validation system for a registration form with username, email, password, confirm password, and terms checkbox.
2. Add async validation that checks username availability via API when the user stops typing.
3. Create a credit card validator that validates the number format (Luhn algorithm), expiry date, and CVV.
4. Build a password strength meter that updates in real-time using the validation API.
