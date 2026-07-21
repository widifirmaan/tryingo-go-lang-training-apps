# New Form Attributes

## Overview

HTML5 introduced several new attributes for forms and input elements that give developers more control without JavaScript.

## Form-Level Attributes

### `novalidate`

Disables validation on form submission.

```html
<form novalidate>
  <input type="email" required>
  <button type="submit">Submit (no validation)</button>
</form>
```

### `autocomplete` on Forms

Sets autocomplete behavior for all fields (can be overridden per field).

```html
<form autocomplete="off">
  <label>Sensitive Field: <input type="text" name="secret"></label>
  <!-- This field re-enables autocomplete -->
  <label>Public Field: <input type="text" name="public" autocomplete="on"></label>
</form>
```

### `target` on Forms

Controls where the response is displayed.

```html
<!-- Open result in new tab -->
<form action="/submit" target="_blank">
  <input type="text" name="data" required>
  <button type="submit">Submit (new tab)</button>
</form>

<!-- Open in iframe -->
<form action="/submit" target="resultFrame">
  <input type="text" name="data" required>
  <button type="submit">Submit in iframe</button>
</form>
<iframe name="resultFrame"></iframe>
```

### `rel` on Forms

Specifies relationship between current and linked documents.

```html
<form action="/search" method="get" rel="nofollow noopener">
  <input type="search" name="q">
  <button type="submit">Search</button>
</form>
```

## Input-Level Attributes

### `placeholder`

Provides hint text inside the input.

```html
<input type="text" placeholder="e.g. John Doe">
<input type="email" placeholder="you@example.com">
<input type="search" placeholder="Search products...">
```

### `autofocus`

Automatically focuses an input when the page loads.

```html
<input type="text" name="username" autofocus>
```

### `multiple`

Allows multiple values in file inputs and email inputs.

```html
<label for="files">Upload files:</label>
<input type="file" id="files" name="files" multiple>

<label for="recipients">Send to:</label>
<input type="email" id="recipients" name="recipients"
       multiple placeholder="Separate emails with commas">
```

### `pattern`

Validates input against a regular expression.

```html
<label for="zip">ZIP Code (5 digits):</label>
<input type="text" id="zip" name="zip"
       pattern="[0-9]{5}" title="5-digit ZIP code">

<label for="phone">Phone (XXX-XXX-XXXX):</label>
<input type="tel" id="phone" name="phone"
       pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}"
       title="Format: 123-456-7890">
```

### `min`, `max`, and `step`

Controls for numeric and date inputs.

```html
<label for="qty">Quantity (1-100, multiples of 5):</label>
<input type="number" id="qty" name="qty"
       min="0" max="100" step="5" value="10">

<label for="appt">Appointment (business hours):</label>
<input type="time" id="appt" name="appt" min="09:00" max="17:00" step="900">

<label for="birthdate">Birthdate:</label>
<input type="date" id="birthdate" name="birthdate"
       min="1900-01-01" max="2010-12-31">
```

### `readonly` vs `disabled`

```html
<input type="text" value="Cannot edit but submits" readonly>
<input type="text" value="Cannot edit and won't submit" disabled>
```

### `spellcheck`

Controls spellchecking behavior.

```html
<input type="text" spellcheck="true">
<textarea spellcheck="false">Code editor area</textarea>
```

### `inputmode`

Controls virtual keyboard type on mobile devices.

```html
<label for="numeric">Numeric input:</label>
<input type="text" id="numeric" name="numeric" inputmode="numeric">

<label for="decimal">Decimal input:</label>
<input type="text" id="decimal" name="decimal" inputmode="decimal">

<label for="url2">URL:</label>
<input type="text" id="url2" name="url2" inputmode="url">

<label for="email2">Email:</label>
<input type="text" id="email2" name="email2" inputmode="email">

<label for="search2">Search:</label>
<input type="text" id="search2" name="search2" inputmode="search">
```

### `enterkeyhint`

Customizes the enter key label on mobile keyboards.

```html
<form>
  <input type="text" enterkeyhint="next" placeholder="First name">
  <input type="text" enterkeyhint="next" placeholder="Last name">
  <input type="email" enterkeyhint="done" placeholder="Email">
  <button type="submit" enterkeyhint="send">Submit</button>
</form>
```

### `form` Attribute

Associates an input with a form outside the form element.

```html
<form id="mainForm" action="/submit" method="post">
  <input type="text" name="field1" placeholder="Inside form">
  <button type="submit">Submit</button>
</form>

<!-- This input is outside the form but associated with it -->
<input type="text" name="field2" form="mainForm"
       placeholder="Outside form, but submitted">
```

### `formenctype`, `formmethod`, `formtarget`, `formnovalidate`

Override form-level attributes per submit button.

```html
<form action="/submit" method="get" novalidate>
  <input type="text" name="data" required>

  <!-- Override: submit as POST -->
  <button type="submit" formmethod="post">Save (POST)</button>

  <!-- Override: open in new tab with multipart -->
  <button type="submit" formtarget="_blank"
          formenctype="multipart/form-data">Export</button>

  <!-- Override: force validation for this button -->
  <button type="submit" formnovalidate="false">Submit with validation</button>
</form>
```

### `dirname`

Submits the text direction along with the field value.

```html
<form action="/feedback" method="post">
  <label for="comment">Comment:</label>
  <textarea id="comment" name="comment" dirname="comment.dir"></textarea>
  <button type="submit">Submit</button>
</form>
<!-- Submits: comment=value&comment.dir=ltr|rtl -->
```

## Complete Example

```html
<form action="/register" method="post"
      autocomplete="on" novalidate id="signup">
  <fieldset>
    <legend>Account Info</legend>

    <input type="text" name="username" placeholder="Username"
           pattern="[a-z0-9_]+" minlength="3" maxlength="20"
           autofocus required>

    <input type="email" name="email" placeholder="Email"
           autocomplete="email" multiple required
           inputmode="email">

    <input type="password" name="password" placeholder="Password"
           autocomplete="new-password" minlength="8" required
           pattern="(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}">
  </fieldset>

  <fieldset>
    <legend>Profile</legend>

    <input type="url" name="website" placeholder="https://"
           inputmode="url" enterkeyhint="done">

    <input type="number" name="age" placeholder="Age"
           min="13" max="120" step="1" inputmode="numeric">

    <input type="text" name="country" placeholder="Country"
           list="countries" autocomplete="country-name">
  </fieldset>

  <button type="submit" formaction="/register/quick"
          formmethod="post">Quick Register</button>
  <button type="submit">Full Register</button>
</form>
```

## Practice

1. Create a checkout form that uses the `form` attribute to associate a "coupon code" input that is visually placed at the bottom of the page but submits with the main form.
2. Build a form with two submit buttons: one for "Save Draft" (no validation, GET) and one for "Publish" (with validation, POST).
3. Create a mobile-friendly login form with appropriate `inputmode` and `enterkeyhint` values.
4. Use `pattern` with proper `title` attributes to create a credit card field that accepts Visa, Mastercard, and Amex formats.
