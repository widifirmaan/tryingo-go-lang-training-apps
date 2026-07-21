# HTML Validation

## Overview

HTML validation checks your code against W3C standards, catching errors and ensuring compatibility.

### W3C Validator

```html
<!-- Online: https://validator.w3.org/ -->
<!-- Can validate by URL, file upload, or direct input -->
```

### Using the Validator API

```js
// Validate HTML via W3C API
async function validateHTML(html) {
  const formData = new FormData();
  formData.append('content', html);
  formData.append('output', 'json');

  try {
    const response = await fetch(
      'https://validator.w3.org/nu/?out=json',
      {
        method: 'POST',
        body: formData
      }
    );

    const result = await response.json();
    return parseValidationResults(result);
  } catch (err) {
    console.error('Validation failed:', err);
  }
}

function parseValidationResults(result) {
  const messages = result.messages || [];
  const errors = messages.filter(m => m.type === 'error');
  const warnings = messages.filter(m => m.type === 'info');

  return {
    valid: errors.length === 0,
    total: messages.length,
    errors: errors.map(m => ({
      line: m.lastLine,
      column: m.lastColumn,
      message: m.message,
      extract: m.extract
    })),
    warnings: warnings.map(m => ({
      message: m.message,
      extract: m.extract
    }))
  };
}

// Usage
const html = document.documentElement.outerHTML;
validateHTML(html).then(result => {
  if (result.valid) {
    console.log('HTML is valid!');
  } else {
    console.error(`${result.errors.length} errors found:`);
    result.errors.forEach(e => {
      console.error(`Line ${e.line}: ${e.message}`);
    });
  }
});
```

## Common Validation Errors

```html
<!-- ❌ DOCTYPE missing -->
<html>
<head>...</head>
</html>

<!-- ✅ Correct -->
<!DOCTYPE html>
<html>
<head>...</head>
</html>

<!-- ❌ Unclosed element -->
<p>Some text
<div>Content</div>

<!-- ✅ Correct -->
<p>Some text</p>
<div>Content</div>

<!-- ❌ Duplicate IDs -->
<div id="main">...</div>
<div id="main">...</div>

<!-- ✅ Correct: use class or unique IDs -->
<div class="main">...</div>
<div id="secondary">...</div>

<!-- ❌ Bad nesting -->
<ul>
  <div>Wrong parent</div>
  <li>Item</li>
</ul>

<!-- ✅ Correct -->
<ul>
  <li>Item</li>
</ul>

<!-- ❌ Missing alt on img -->
<img src="photo.jpg">

<!-- ✅ Correct -->
<img src="photo.jpg" alt="Description">

<!-- ❌ Invalid attribute -->
<div ng-app="myApp">...</div>

<!-- ✅ Custom data attributes -->
<div data-app="myApp">...</div>

<!-- ❌ Wrong attribute values -->
<input type="email" maxlength="abc">

<!-- ✅ Correct -->
<input type="email" maxlength="50">

<!-- ❌ Deprecated elements -->
<center>Centered text</center>
<font color="red">Text</font>

<!-- ✅ Modern alternatives -->
<div style="text-align: center;">Centered text</div>
<span style="color: red;">Text</span>
```

## Local Validation Tools

```bash
# vnu.jar (Nu HTML Checker)
java -jar vnu.jar index.html
java -jar vnu.jar --format json index.html

# html-validate (Node.js)
npm install -g html-validate
html-validate index.html
html-validate "src/**/*.html" --formatter json

# html-validate config (.htmlvalidate.json)
```

```json
{
  "extends": [
    "html-validate:recommended"
  ],
  "rules": {
    "void-style": ["error", {"style": "omit"}],
    "heading-level": ["error", {"minInitialRank": "h1"}],
    "no-inline-style": "off",
    "prefer-native-element": ["error", {
      "exclude": ["div"]
    }],
    "element-permitted-content": "error",
    "no-dup-class": "error",
    "no-redundant-role": ["error", {
      "checkAria": true
    }]
  }
}
```

## Git Hooks for Validation

```bash
# pre-commit hook (pre-commit)
npm install -g pre-commit
npm install html-validate --save-dev
```

```json
{
  "scripts": {
    "validate": "html-validate src/**/*.html"
  },
  "pre-commit": ["validate"]
}
```

```yaml
# .pre-commit-config.yaml
repos:
  - repo: local
    hooks:
      - id: html-validate
        name: HTML Validate
        entry: npx html-validate
        language: node
        files: \.(html)$
```

## Practice

1. Validate your project's HTML files using the W3C validator and fix all errors and warnings.
2. Set up html-validate in a project with custom rules for void elements, heading levels, and ARIA attributes.
3. Create a pre-commit hook that validates HTML before commits.
4. Build a validation report page that fetches results from the W3C API and displays them in a readable format.
