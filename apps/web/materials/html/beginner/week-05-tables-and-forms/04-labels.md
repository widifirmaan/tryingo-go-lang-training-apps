# Labels & Accessibility

Labels make forms accessible by associating text with form controls. Screen readers announce the label when a control receives focus.

## The `<label>` Element

### Implicit Association (wrapping)

```html
<label>
  Full Name
  <input type="text" name="name">
</label>
```

### Explicit Association (`for` attribute)

```html
<label for="email">Email Address</label>
<input type="email" id="email" name="email">
```

The `for` attribute must match the `id` of the input.

| Method | Pros | Cons |
|--------|------|------|
| Implicit (wrapping) | Less code | Cannot separate label from control in layout |
| Explicit (`for`/`id`) | Flexible positioning | Requires matching IDs |

### Click Target

Clicking a label focuses/activates its associated input — especially useful for checkboxes and radio buttons.

```html
<label for="agree">
  <input type="checkbox" id="agree" name="agree">
  I accept the terms
</label>
```

## `<fieldset>` and `<legend>`

Group related form controls together.

```html
<fieldset>
  <legend>Contact Information</legend>

  <label for="first-name">First Name:</label>
  <input type="text" id="first-name" name="first_name">

  <label for="last-name">Last Name:</label>
  <input type="text" id="last-name" name="last_name">

  <label for="phone">Phone:</label>
  <input type="tel" id="phone" name="phone">
</fieldset>
```

### Radio Button Groups

Always use `<fieldset>` with `<legend>` for radio groups.

```html
<fieldset>
  <legend>Shipping Method</legend>

  <label>
    <input type="radio" name="shipping" value="standard" checked>
    Standard (5-7 days)
  </label>

  <label>
    <input type="radio" name="shipping" value="express">
    Express (2-3 days)
  </label>

  <label>
    <input type="radio" name="shipping" value="overnight">
    Overnight
  </label>
</fieldset>
```

### Checkbox Groups

```html
<fieldset>
  <legend>Topics of Interest</legend>

  <label>
    <input type="checkbox" name="topics" value="html">
    HTML
  </label>

  <label>
    <input type="checkbox" name="topics" value="css">
    CSS
  </label>

  <label>
    <input type="checkbox" name="topics" value="js">
    JavaScript
  </label>
</fieldset>
```

## ARIA for Forms

Use ARIA attributes when semantic HTML is insufficient.

```html
<label for="username">Username</label>
<input
  type="text"
  id="username"
  name="username"
  aria-required="true"
  aria-describedby="username-hint"
>
<span id="username-hint">Must be at least 3 characters, letters only</span>
```

| Attribute | Purpose |
|-----------|---------|
| `aria-label` | Direct label when visible label is not possible |
| `aria-labelledby` | References another element as label |
| `aria-describedby` | References help text or error message |
| `aria-required` | Indicates required field |
| `aria-invalid` | Indicates validation error |
| `role="alert"` | Announces error messages |

### Error Messages

```html
<label for="email">Email</label>
<input
  type="email"
  id="email"
  name="email"
  aria-describedby="email-error"
  aria-invalid="true"
>
<span id="email-error" role="alert">Please enter a valid email address.</span>
```

## Accessible Form Example

```html
<form action="/register" method="post" novalidate>
  <fieldset>
    <legend>Account Details</legend>

    <label for="username">Username <span aria-hidden="true">*</span></label>
    <input
      type="text"
      id="username"
      name="username"
      required
      minlength="3"
      aria-required="true"
      aria-describedby="username-hint"
    >
    <span id="username-hint" class="hint">3+ characters, letters and numbers only</span>

    <label for="password">Password <span aria-hidden="true">*</span></label>
    <input
      type="password"
      id="password"
      name="password"
      required
      minlength="8"
      aria-required="true"
    >
  </fieldset>

  <fieldset>
    <legend>Newsletter Preferences</legend>
    <label>
      <input type="checkbox" name="newsletter" value="weekly" checked>
      Weekly newsletter
    </label>
    <label>
      <input type="checkbox" name="newsletter" value="product">
      Product updates
    </label>
  </fieldset>

  <button type="submit">Register</button>
</form>
```

## Common Mistakes

| Mistake | Why It's Wrong | Fix |
|---------|----------------|-----|
| Missing label | Screen readers cannot identify the control | Add `<label>` with `for` |
| Using `placeholder` as label | Placeholder disappears on input | Use a real `<label>` |
| No `<fieldset>` for radio groups | Screen readers lose group context | Wrap radios in `<fieldset>` with `<legend>` |
| Duplicate `id` values | `for` matches wrong input | Ensure unique `id`s per page |

## Practice

1. Create a form where every input has an explicit `<label>` with `for`
2. Group related fields with `<fieldset>` and `<legend>`
3. Add `aria-describedby` hints to 2 fields
4. Use a screen reader (VoiceOver, NVDA, or ChromeVox) to navigate your form
5. Validate your form with the W3C HTML Validator
