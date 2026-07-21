# FormData API

## Overview

The FormData API provides a way to construct key/value pairs representing form fields and their values.

### Basic Usage

```html
<form id="userForm">
  <input type="text" name="username" value="john_doe">
  <input type="email" name="email" value="john@example.com">
  <input type="checkbox" name="subscribe" checked>
  <select name="country">
    <option value="US">United States</option>
    <option value="CA" selected>Canada</option>
  </select>
  <button type="submit">Submit</button>
</form>
```

```js
document.getElementById('userForm').addEventListener('submit', (e) => {
  e.preventDefault();

  const formData = new FormData(e.target);

  // Iterate entries
  for (const [key, value] of formData) {
    console.log(`${key}: ${value}`);
  }

  // Convert to object
  const data = Object.fromEntries(formData);
  console.log(data);

  // Send as JSON
  fetch('/api/users', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data)
  });

  // Send as multipart/form-data
  fetch('/api/users', {
    method: 'POST',
    body: formData
  });
});
```

## FormData Methods

```js
const formData = new FormData();

// Append values
formData.append('name', 'Alice');
formData.append('age', '30');
formData.append('hobbies', 'reading');
formData.append('hobbies', 'hiking'); // Multiple values
formData.append('avatar', fileInput.files[0]); // File

// Set (replaces existing)
formData.set('name', 'Bob'); // Removes 'Alice', sets 'Bob'
formData.set('hobbies', 'swimming'); // Replaces all 'hobbies'

// Get values
formData.get('name');      // 'Bob'
formData.getAll('hobbies'); // ['swimming'] (was ['reading', 'hiking'])

// Check
formData.has('avatar');    // true
formData.has('email');     // false

// Delete
formData.delete('age');

// Get all keys and values
for (const key of formData.keys()) { console.log(key); }
for (const value of formData.values()) { console.log(value); }

// Entries (key, value pairs)
for (const [key, value] of formData.entries()) {
  console.log(key, value);
}
```

## Building FormData Programmatically

```js
// Without a form element
const formData = new FormData();

formData.append('name', 'Product Name');
formData.append('price', '29.99');
formData.append('category', 'electronics');
formData.append('inStock', 'true');
formData.append('tags[]', 'new');
formData.append('tags[]', 'featured');

// File from input
const fileField = document.querySelector('input[type="file"]');
formData.append('document', fileField.files[0]);

// File from blob
const blob = new Blob(['Hello World'], { type: 'text/plain' });
formData.append('readme', blob, 'readme.txt');

// File from canvas
canvas.toBlob((blob) => {
  formData.append('signature', blob, 'signature.png');
});

// Send
fetch('/api/products', {
  method: 'POST',
  body: formData
  // Don't set Content-Type header - browser sets with boundary
});
```

## JSON vs FormData

```js
// JSON (no files)
async function submitJSON(url, data) {
  const response = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  });
  return response.json();
}

// FormData (supports files)
async function submitFormData(url, formData) {
  const response = await fetch(url, {
    method: 'POST',
    body: formData
    // Content-Type automatically set to multipart/form-data
  });
  return response.json();
}

// Auto-detect based on content
async function submitForm(url, data) {
  const hasFiles = Object.values(data).some(v =>
    v instanceof File || v instanceof Blob
  );

  if (hasFiles) {
    const formData = new FormData();
    for (const [key, value] of Object.entries(data)) {
      formData.append(key, value);
    }
    return submitFormData(url, formData);
  } else {
    return submitJSON(url, data);
  }
}
```

## Serialize Form to Object

```js
class FormSerializer {
  static toObject(form) {
    const formData = new FormData(form);
    const object = {};

    for (const [key, value] of formData) {
      // Handle array keys like tags[]
      if (key.endsWith('[]')) {
        const arrayKey = key.slice(0, -2);
        if (!object[arrayKey]) object[arrayKey] = [];
        object[arrayKey].push(value);
      }
      // Handle nested keys like address[street]
      else if (key.includes('[')) {
        const [parent, child] = key.split(/\[|\]/).filter(Boolean);
        if (!object[parent]) object[parent] = {};
        object[parent][child] = value;
      }
      // Normal key
      else {
        // Boolean conversion
        if (value === 'true') object[key] = true;
        else if (value === 'false') object[key] = false;
        else object[key] = value;
      }
    }

    return object;
  }

  static toJSON(form) {
    return JSON.stringify(this.toObject(form), null, 2);
  }

  static toQueryString(form) {
    const formData = new FormData(form);
    const params = new URLSearchParams();
    for (const [key, value] of formData) {
      params.append(key, value);
    }
    return params.toString();
  }
}

// Usage
const data = FormSerializer.toObject(document.getElementById('myForm'));
console.log(FormSerializer.toJSON(document.getElementById('myForm')));
```

## Practice

1. Build a form that collects user data and sends it as JSON (no files) and as FormData (with files).
2. Create a FormData serializer that handles nested keys (like `address[street]`, `address[city]`).
3. Implement a form that dynamically adds and removes fields, collecting all values via FormData on submit.
4. Build a CSV import tool that parses a CSV file and creates FormData entries for each row.
