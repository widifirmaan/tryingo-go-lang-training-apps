# Custom Validation Patterns

## Overview

Beyond basic HTML5 validation, custom patterns enable complex validation logic for real-world forms.

## Common Validation Patterns

### Email with Domain Verification

```js
function validateEmail(email) {
  // RFC 5322 simplified pattern
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return 'Please enter a valid email address';
  }

  // Check disposable email domains
  const domain = email.split('@')[1].toLowerCase();
  const disposableDomains = [
    'tempmail.com', 'throwaway.com', 'mailinator.com',
    'guerrillamail.com', 'yopmail.com', '10minutemail.com'
  ];

  if (disposableDomains.includes(domain)) {
    return 'Disposable email addresses are not allowed';
  }

  return true;
}
```

### Phone Number (International)

```js
function validatePhone(phone) {
  // Strip common formatting
  const cleaned = phone.replace(/[\s\-\(\)\.]/g, '');

  // E.164 format: +[country][number]
  const e164Regex = /^\+[1-9]\d{6,14}$/;
  if (e164Regex.test(cleaned)) return true;

  // US: (555) 123-4567 or 555-123-4567
  const usRegex = /^1?\d{10}$/;
  if (usRegex.test(cleaned)) return true;

  return 'Please enter a valid phone number with country code (e.g., +1 555-123-4567)';
}
```

### Password Strength

```js
function validatePasswordStrength(password) {
  const checks = {
    length: password.length >= 8,
    uppercase: /[A-Z]/.test(password),
    lowercase: /[a-z]/.test(password),
    number: /[0-9]/.test(password),
    special: /[!@#$%^&*(),.?":{}|<>]/.test(password)
  };

  const score = Object.values(checks).filter(Boolean).length;

  if (score < 3) {
    return 'Password is too weak. Include uppercase, lowercase, number, and special character.';
  }

  // Check common passwords
  const commonPasswords = ['password123', '12345678', 'qwerty123', 'admin123', 'letmein'];
  if (commonPasswords.includes(password.toLowerCase())) {
    return 'This password is too common. Please choose a more secure password.';
  }

  return true;
}

// Real-time strength indicator
function getPasswordStrength(password) {
  let score = 0;

  if (password.length >= 8) score++;
  if (password.length >= 12) score++;
  if (/[a-z]/.test(password)) score++;
  if (/[A-Z]/.test(password)) score++;
  if (/[0-9]/.test(password)) score++;
  if (/[^a-zA-Z0-9]/.test(password)) score++;

  if (score <= 2) return { level: 'weak', color: '#e74c3c', width: '25%' };
  if (score <= 4) return { level: 'medium', color: '#f39c12', width: '50%' };
  if (score <= 5) return { level: 'strong', color: '#2ecc71', width: '75%' };
  return { level: 'very strong', color: '#27ae60', width: '100%' };
}
```

```css
.password-strength {
  height: 4px;
  background: #e0e0e0;
  border-radius: 2px;
  margin-top: 4px;
  overflow: hidden;
}

.password-strength-bar {
  height: 100%;
  border-radius: 2px;
  transition: width 0.3s, background 0.3s;
}

.password-strength-text {
  font-size: 0.8em;
  margin-top: 2px;
  transition: color 0.3s;
}
```

### Date Validation

```js
function validateDateRange(dateStr, minDate, maxDate) {
  const date = new Date(dateStr);
  const min = new Date(minDate);
  const max = new Date(maxDate);

  if (isNaN(date.getTime())) {
    return 'Please enter a valid date';
  }

  if (date < min) {
    return `Date must be after ${min.toLocaleDateString()}`;
  }

  if (date > max) {
    return `Date must be before ${max.toLocaleDateString()}`;
  }

  // Check age (must be 18+)
  const today = new Date();
  const age = today.getFullYear() - date.getFullYear();
  const monthDiff = today.getMonth() - date.getMonth();
  if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < date.getDate())) {
    age--;
  }

  if (age < 18) {
    return 'You must be at least 18 years old';
  }

  return true;
}
```

### URL Validation

```js
function validateURL(url) {
  try {
    new URL(url);
  } catch {
    return 'Please enter a valid URL (https://example.com)';
  }

  // Check protocol
  const parsed = new URL(url);
  if (!['http:', 'https:'].includes(parsed.protocol)) {
    return 'URL must start with http:// or https://';
  }

  return true;
}
```

## Conditional Validation

```js
class ConditionalValidator {
  constructor(form) {
    this.form = form;
    this.conditions = new Map();
    this.init();
  }

  addCondition(fieldName, conditionFn, dependentFields) {
    this.conditions.set(fieldName, { conditionFn, dependentFields });

    const field = this.form.querySelector(`[name="${fieldName}"]`);
    if (field) {
      field.addEventListener('change', () => this.updateDependents(fieldName));
    }
  }

  updateDependents(fieldName) {
    const condition = this.conditions.get(fieldName);
    if (!condition) return;

    const shouldShow = condition.conditionFn();

    condition.dependentFields.forEach(depName => {
      const depField = this.form.querySelector(`[name="${depName}"]`);
      if (!depField) return;

      // Find wrapper
      const wrapper = depField.closest('.form-group') || depField.parentElement;

      if (shouldShow) {
        wrapper.style.display = '';
        depField.required = true;
        depField.disabled = false;
      } else {
        wrapper.style.display = 'none';
        depField.required = false;
        depField.disabled = true;
        depField.value = '';
      }
    });
  }

  init() {
    // Run all conditions on load
    for (const [fieldName] of this.conditions) {
      this.updateDependents(fieldName);
    }
  }
}

// Usage
const form = document.getElementById('checkoutForm');
const conditionalValidator = new ConditionalValidator(form);

// Show billing address only when "different billing address" is checked
conditionalValidator.addCondition(
  'differentBilling',
  () => document.querySelector('[name="differentBilling"]').checked,
  ['billing_street', 'billing_city', 'billing_zip', 'billing_country']
);

// Show company field only when "Business" account type is selected
conditionalValidator.addCondition(
  'accountType',
  () => document.querySelector('[name="accountType"]:checked')?.value === 'business',
  ['companyName', 'companyVAT', 'companyWebsite']
);
```

## Async Validation

```js
class AsyncValidator {
  constructor() {
    this.pendingValidations = new Map();
  }

  async validate(input, asyncCheckFn) {
    const value = input.value;

    // Cancel previous validation for this input
    if (this.pendingValidations.has(input)) {
      clearTimeout(this.pendingValidations.get(input).timer);
    }

    return new Promise((resolve) => {
      const timer = setTimeout(async () => {
        try {
          const result = await asyncCheckFn(value);
          resolve(result);
        } catch (err) {
          resolve(err.message || 'Validation failed');
        } finally {
          this.pendingValidations.delete(input);
        }
      }, 300); // Debounce

      this.pendingValidations.set(input, { timer });
    });
  }
}

// Usage
const asyncValidator = new AsyncValidator();

usernameInput.addEventListener('input', async () => {
  const result = await asyncValidator.validate(usernameInput, async (value) => {
    if (value.length < 3) return 'Username too short';

    const response = await fetch(`/api/check-username?q=${encodeURIComponent(value)}`);
    const data = await response.json();

    if (data.available) return true;
    return 'Username is already taken';
  });

  if (result === true) {
    usernameInput.setCustomValidity('');
  } else {
    usernameInput.setCustomValidity(result);
  }
});
```

## Practice

1. Build a form with conditional fields: "Shipping same as billing" checkbox and a "Referral source" radio that shows different fields per option.
2. Create an async email validator that checks domain MX records via API and shows suggestions for typos (gmail.com vs gnail.com).
3. Implement an address autocomplete and validator that uses a geocoding API to verify real addresses.
4. Build a multi-step form wizard where each step has its own validation and progress tracking.
