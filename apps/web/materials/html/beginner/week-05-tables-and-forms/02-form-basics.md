# Form Basics

Forms collect user input and send it to a server for processing.

```html
<form action="/submit" method="post">
  <label for="name">Name:</label>
  <input type="text" id="name" name="name" required>
  <button type="submit">Submit</button>
</form>
```

## The `<form>` Element

### `action` Attribute

Specifies where to send the form data.

```html
<form action="/api/subscribe">
  <!-- form fields -->
</form>
```

| Value | Behavior |
|-------|----------|
| Relative URL | `/submit` — sends to same origin |
| Absolute URL | `https://api.example.com/submit` — sends to external endpoint |
| Empty | Submits to the current page URL |

### `method` Attribute

Defines the HTTP method for sending data.

```html
<form action="/search" method="get">
<form action="/signup" method="post">
```

### GET vs POST

| Aspect | GET | POST |
|--------|-----|------|
| Data location | URL query string | Request body |
| Visibility | Visible in URL | Not visible |
| Bookmarkable | Yes | No |
| Length limit | ~2048 characters | Much larger |
| Security | Not for sensitive data | More secure (over HTTPS) |
| Use case | Search, filtering | Login, registration, file upload |

```html
<!-- GET — data appears in URL -->
<form action="/search" method="get">
  <input type="text" name="q" placeholder="Search...">
  <button>Search</button>
</form>

<!-- POST — data in request body -->
<form action="/signup" method="post">
  <input type="text" name="username">
  <input type="password" name="password">
  <button>Sign Up</button>
</form>
```

### `enctype` Attribute

Specifies how form data should be encoded when using POST.

| Value | Use Case |
|-------|----------|
| `application/x-www-form-urlencoded` | Default — normal text fields |
| `multipart/form-data` | Required for file uploads |
| `text/plain` | Debugging only |

```html
<form action="/upload" method="post" enctype="multipart/form-data">
  <input type="file" name="document">
  <button>Upload</button>
</form>
```

### Other Form Attributes

| Attribute | Description |
|-----------|-------------|
| `novalidate` | Disables browser validation |
| `autocomplete` | `on` or `off` for autofill |
| `target` | Where to display response (`_self`, `_blank`) |
| `name` | Name of the form |

## Submit Buttons

```html
<button type="submit">Send</button>
<input type="submit" value="Send">
<input type="image" src="submit-btn.png" alt="Submit">
```

## Form Submission Flow

1. User fills in fields
2. Browser validates (if `required`, `type`, `pattern` attributes)
3. Data is encoded per `enctype`
4. Browser sends request to `action` URL using `method`
5. Server processes data and returns a response

## Practice

1. Create a search form using GET method
2. Create a signup form using POST method
3. Create a file upload form with `multipart/form-data`
4. Add `autocomplete` and `novalidate` attributes and observe the difference
