# Input Types

HTML5 provides many input types for collecting different kinds of data, each with built-in validation and optimized mobile keyboards.

## Text Inputs

```html
<!-- Single line text -->
<input type="text" name="username" maxlength="20" placeholder="Enter username">

<!-- Email — validates email format -->
<input type="email" name="email" placeholder="user@example.com" multiple>

<!-- Password — masks input -->
<input type="password" name="password" minlength="8">

<!-- URL — validates URL format -->
<input type="url" name="website" placeholder="https://example.com">

<!-- Telephone — shows numeric keypad on mobile -->
<input type="tel" name="phone" pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}">

<!-- Search — styled differently in some browsers -->
<input type="search" name="query" placeholder="Search...">
```

## Numeric Inputs

```html
<!-- Number with min, max, step -->
<input type="number" name="age" min="0" max="150" step="1" value="18">

<!-- Range slider -->
<input type="range" name="volume" min="0" max="100" value="50">
```

## Date & Time Inputs

```html
<!-- Date picker -->
<input type="date" name="birthday" min="1900-01-01" max="2026-12-31">

<!-- Time picker -->
<input type="time" name="appointment">

<!-- Datetime-local -->
<input type="datetime-local" name="event">

<!-- Month -->
<input type="month" name="billing">

<!-- Week -->
<input type="week" name="schedule">
```

## Choice Inputs

```html
<!-- Checkbox — multiple selection -->
<label>
  <input type="checkbox" name="interests" value="sports"> Sports
</label>
<label>
  <input type="checkbox" name="interests" value="music"> Music
</label>
<label>
  <input type="checkbox" name="interests" value="tech"> Technology
</label>

<!-- Radio — single selection (same name) -->
<label>
  <input type="radio" name="plan" value="basic" checked> Basic
</label>
<label>
  <input type="radio" name="plan" value="pro"> Pro
</label>
<label>
  <input type="radio" name="plan" value="enterprise"> Enterprise
</label>
```

## File Input

```html
<input type="file" name="avatar" accept="image/png,image/jpeg" multiple>
```

| Attribute | Purpose |
|-----------|---------|
| `accept` | Accepted MIME types |
| `multiple` | Allow multiple file selection |
| `capture` | Capture from camera/mic (`environment`, `user`) |

## Color Input

```html
<input type="color" name="theme-color" value="#ff5733">
```

## Hidden Input

Not visible to the user. Used to send data that the server needs.

```html
<input type="hidden" name="csrf_token" value="abc123xyz">
<input type="hidden" name="user_id" value="42">
```

## Submit & Reset

```html
<input type="submit" value="Sign Up">
<input type="reset" value="Clear Form">
<button type="submit">Submit</button>
<button type="reset">Reset</button>
```

## Common Attributes Summary

| Attribute | Applies To | Description |
|-----------|-----------|-------------|
| `placeholder` | text, email, url, tel, search | Hint text inside the field |
| `required` | Most types | Field must be filled |
| `readonly` | Most types | Cannot edit, but value is submitted |
| `disabled` | Most types | Cannot interact, value not submitted |
| `minlength` / `maxlength` | text, password, search | Character limits |
| `min` / `max` | number, date, range, datetime-local | Value range |
| `step` | number, date, range | Increment step |
| `pattern` | text, tel, email, url | Regex validation |
| `autocomplete` | Most types | Browser autofill behavior |
| `autofocus` | One field per form | Auto-focus on page load |

## Complete Example

```html
<form action="/signup" method="post">
  <label>
    Full Name:
    <input type="text" name="name" required minlength="2">
  </label>

  <label>
    Email:
    <input type="email" name="email" required>
  </label>

  <label>
    Password:
    <input type="password" name="password" required minlength="8">
  </label>

  <label>
    Age:
    <input type="number" name="age" min="13" max="120">
  </label>

  <label>
    Birthday:
    <input type="date" name="birthday">
  </label>

  <fieldset>
    <legend>Subscription Plan</legend>
    <label><input type="radio" name="plan" value="free" checked> Free</label>
    <label><input type="radio" name="plan" value="pro"> Pro</label>
  </fieldset>

  <label>
    <input type="checkbox" name="terms" required>
    I agree to the terms and conditions
  </label>

  <label>
    Profile picture:
    <input type="file" name="avatar" accept="image/*">
  </label>

  <input type="hidden" name="referrer" value="website">
  <button type="submit">Create Account</button>
</form>
```

## Practice

1. Create a form with at least 8 different input types
2. Add validation attributes (`required`, `minlength`, `pattern`, `min`/`max`)
3. Test browser-native validation by submitting invalid data
4. Add a color picker and a range slider
5. Implement file upload with specific accepted types
